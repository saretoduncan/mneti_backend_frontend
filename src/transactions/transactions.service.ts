import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ETransactionType, Transaction } from './transactions.entity';
import { Repository } from 'typeorm';

import { UserProfile } from 'src/users/userProfile.entity';
import { MpesaService } from 'src/mpesa/mpesa.service';
import { TransactionConfigService } from 'src/transaction-config/transaction-config.service';
import { ETransactionConfigEnum } from 'src/transaction-config/transactionConfig.entity';
import Redis from 'ioredis';
import {
  IRedisBalance,
  IRedisTransactionMpesaMessage,
} from 'src/common/interfaces/IRedisInterface';
import { RedisService } from 'src/redis/redis.service';
import { formatPhoneNumber } from 'src/common/methods/index.methods';
import {
  IMpesaAccountBalanceCallback,
  IMpesaSTKCallback,
} from 'src/dtos/mpesa.dto';
import { nanoid } from 'nanoid';
import { WalletService } from 'src/wallet/wallet.service';
import { json } from 'stream/consumers';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(UserProfile)
    private readonly userRepo: Repository<UserProfile>,
    private readonly mpesaService: MpesaService,
    private readonly txconfigService: TransactionConfigService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private readonly redisService: RedisService,
    private readonly walletService: WalletService,
  ) {}

  async initiateSubscription(userProfileId: string, phone_number: string) {
    console.log(phone_number);
    const user = await this.userRepo.findOne({
      where: {
        id: userProfileId,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.isSubscribed) {
      throw new BadRequestException('User already subscribed');
    }
    const subscriptionCost = await this.txconfigService.findTxtByName(
      ETransactionConfigEnum.SUBSCRIPTION_COST,
    );

    const phoneNumber = formatPhoneNumber(phone_number);
    const resp = await this.mpesaService.sendStkPush(
      phoneNumber,
      subscriptionCost.amount,
    );

    const toRedis: IRedisTransactionMpesaMessage = {
      mpesaTxId: resp.CheckoutRequestID,
      amount: subscriptionCost.amount,
      status: 'pending',
      message: '',
      userProfileId: user.id,
      phone: phoneNumber,
      referrerId: user.referrerId,
    };
    await this.redisService.set(
      resp.CheckoutRequestID,
      JSON.stringify(toRedis),
      120000,
    );
    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => {
        reject(
          new BadRequestException('Payment callback did not arrive in time'),
        );
      }, 60000);
      const subscriber = this.redisClient.duplicate();
      await subscriber.subscribe('mpesa');
      subscriber.on('message', async (channel, message) => {
        const data: IRedisTransactionMpesaMessage = JSON.parse(message);
        if (data.mpesaTxId === resp.CheckoutRequestID) {
          clearTimeout(timer);
          if (data.status === 'failed') {
            subscriber.unsubscribe();
            subscriber.quit();
            reject(new BadRequestException(data.message));
            return;
          }
          resolve({ message: 'Payment successful' });
          subscriber.unsubscribe();
          subscriber.quit();
        }
      });
    });
  }
  async requestMpesaBalance() {
    const initiateBalacnce = await this.mpesaService.checkBalance();
    const toRedis: IRedisBalance = {
      mpesaTxId: initiateBalacnce.ConversationID,
      status: 'pending',
      message: '',
    };
    await this.redisService.set(
      initiateBalacnce.ConversationID,
      JSON.stringify(toRedis),
      120000,
    );
    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => {}, 60000);
      const subscriber = this.redisClient.duplicate();
      await subscriber.subscribe('mpesa');
      subscriber.on('message', (channel, message) => {
        const data: IRedisBalance = JSON.parse(message);
        if (data.mpesaTxId === initiateBalacnce.ConversationID) {
          clearTimeout(timer);
          if (data.status === 'failed') {
            subscriber.unsubscribe();
            subscriber.quit();
            console.error('balance error:', data.message);
            reject(
              new InternalServerErrorException(
                'some thing went wrong, please try again later',
              ),
            );
            return;
          }
          console.log(data.balance);
          const acc = data.balance?.split('&').map((item) => {
            const [
              name,
              currency,
              ledgerBalance,
              availableBalance,
              reserved1,
              reserved2,
            ] = item.split('|');
            return {
              name,
              currency,
              ledgerBalance,
              availableBalance,
              reserved1,
              reserved2,
            };
          });
          console.log(acc);
          resolve(acc);
          subscriber.unsubscribe();
          subscriber.quit();
        }
      });
    });
  }

  async handleMpesaBalanceCallback(data: IMpesaAccountBalanceCallback) {
    const fromRedisString = await this.redisService.get(
      data.Result.ConversationID,
    );
    if (!fromRedisString) return;
    const fromRedis: IRedisBalance = JSON.parse(fromRedisString);
    if (fromRedis.mpesaTxId === data.Result.ConversationID) {
      if (data.Result.ResultCode !== 0) {
        fromRedis.status = 'failed';
        fromRedis.message = data.Result.ResultDesc;
        await this.redisClient.publish('mpesa', JSON.stringify(fromRedis));
        return;
      }
      fromRedis.status = 'success';
      fromRedis.message = 'success';
      fromRedis.balance = data.Result.ResultParameters?.ResultParameter.find(
        (val) => val.Key === 'AccountBalance',
      )?.Value.toString();
      await this.redisClient.publish('mpesa', JSON.stringify(fromRedis));
      return;
    }
    return;
  }
  async saveSubscriptionTransaction(subData: IMpesaSTKCallback) {
    console.log('call back response', subData);
    const fromRedisString = await this.redisService.get(
      subData.Body.stkCallback.CheckoutRequestID,
    );
    if (!fromRedisString) return;
    const fromRedis: IRedisTransactionMpesaMessage =
      JSON.parse(fromRedisString);

    if (
      subData.Body.stkCallback.ResultCode !== 0 &&
      fromRedis.mpesaTxId === subData.Body.stkCallback.CheckoutRequestID
    ) {
      fromRedis.status = 'failed';
      fromRedis.message = subData.Body.stkCallback.ResultDesc;
      await this.redisClient.publish('mpesa', JSON.stringify(fromRedis));
      return;
    }
    if (fromRedis.mpesaTxId === subData.Body.stkCallback.CheckoutRequestID) {
      fromRedis.status = 'success';
      fromRedis.message = subData.Body.stkCallback.ResultDesc;
      await this.redisClient.publish('mpesa', JSON.stringify(fromRedis));
      const [user, referredBy] = await Promise.all([
        this.userRepo.findOne({
          where: {
            id: fromRedis.userProfileId,
          },
          relations: {
            user: true,
          },
        }),
        this.userRepo.findOne({
          where: {
            id: fromRedis.referrerId,
          },
          relations: {
            wallet: true,
          },
        }),
      ]);
      if (!user) {
        console.error('transaction:', 'user not found!');
        return;
      }
      user.isSubscribed = true;
      user.user.referralCode = nanoid(12);
      await this.userRepo.save(user);
      if (referredBy) {
        const commission =
          (await this.txconfigService.findTxtByName(
            ETransactionConfigEnum.REFERAL_COMMISSION,
          )) ?? 0;

        if (referredBy.wallet) {
          referredBy.wallet.balance =
            referredBy.wallet.balance + commission.amount;
          await this.userRepo.save(referredBy);
        } else {
          await this.walletService.createWallet(referredBy.id);

          await this.walletService.updateWalletBalance(
            referredBy.id,
            commission.amount,
          );
        }
      }
      const mpesaTransactionId =
        subData.Body.stkCallback.CallbackMetadata.Item.find(
          (item) => item.Name === 'MpesaReceiptNumber',
        )!!.Value.toString();
      const newTransaction = this.transactionRepo.create({
        mpesaTransactionId: mpesaTransactionId,
        amount: fromRedis.amount,
        phone_number: fromRedis.phone,
        transaction_type: ETransactionType.SUBSCRIPTION,
        userProfileId: user.id,
      });
      await this.transactionRepo.save(newTransaction);
      return;
    }
    return;
  }
  async saveTransaction(
    userProfileId: number,
    amount: number,
    mpesa_transaction_id: string,
    phone_number: string,
    transaction_type: ETransactionType,
  ) {}
  //get transaction by id
  async getTransactionById(id: string): Promise<Transaction> {
    const getTransaction = await this.transactionRepo.findOne({
      where: {
        id,
      },
      relations: {
        userProfile: true,
      },
    });
    if (!getTransaction) {
      throw new BadRequestException('Transaction not found');
    }
    return getTransaction;
  }
  //bet transaction by user profile id
  async getTransactionByUserProfileId(
    userProfileId: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionRepo.findOne({
      relations: { userProfile: true },
      where: {
        userProfileId: userProfileId,
      },
    });
    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }
    return transaction;
  }
  //get transactionby mpesa transaction id
  async getTransactionByMpesaTransactionId(
    mpesaTransactionId: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionRepo.findOne({
      where: {
        mpesaTransactionId: mpesaTransactionId,
      },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }
  //get all transaction
  async getAllTransactions(): Promise<Transaction[]> {
    const transactions = await this.transactionRepo.find({
      relations: {
        userProfile: true,
      },
    });
    return transactions;
  }
  //get all Deposit transactions
  async getAllSubscriptionTransactions(): Promise<Transaction[]> {
    return await this.transactionRepo.find({
      where: {
        transaction_type: ETransactionType.SUBSCRIPTION,
      },
      relations: {
        userProfile: true,
      },
    });
  }
  //get all withdrawal transactions
  async getAllCommissionTransactions(): Promise<Transaction[]> {
    return await this.transactionRepo.find({
      where: {
        transaction_type: ETransactionType.COMMISSION,
      },
      relations: {
        userProfile: true,
      },
    });
  }
}
