import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ETransactionType, Transaction } from './transactions.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/user.entity';
import { UserProfile } from 'src/users/userProfile.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(UserProfile)
    private readonly userRepo: Repository<UserProfile>,
  ) {}

  async saveTransaction(
    userProfileId: number,
    amount: number,
    mpesa_transaction_id: string,
    phone_number: string,
    transaction_type: ETransactionType,
  ) {}
  //get transaction by id
  async getTransactionById(id: number): Promise<Transaction> {
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
        mpesa_transaction_id: mpesaTransactionId,
      },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }
  //gett all transaction
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
  async getUserCommissionBalance(userProfileId: number) {}
}
