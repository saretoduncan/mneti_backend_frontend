import { Injectable } from '@nestjs/common';
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
}
