import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ETransactionType, Transaction } from './transactions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
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
        user: true,
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
      relations: { user: true },
      where: {
        userId: userProfileId,
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
        user: true,
      },
    });
    return transactions;
  }
  //get all Deposit transactions
  async getAllDepositTransactions(): Promise<Transaction[]> {
    return await this.transactionRepo.find({
      where: {
        transaction_type: ETransactionType.DEPOSIT,
      },
      relations: {
        user: true,
      },
    });
  }
  //get all withdrawal transactions
  async getAllWithdrawalTransactions(): Promise<Transaction[]> {
    return await this.transactionRepo.find({
      where: {
        transaction_type: ETransactionType.WITHDRAWAL,
      },
      relations: {
        user: true,
      },
    });
  }
}
