import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ETransactionConfigEnum,
  TransactionConfig,
} from './transactionConfig.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionConfigService {
  constructor(
    @InjectRepository(TransactionConfig)
    private readonly transactionConfigRepo: Repository<TransactionConfig>,
  ) {}
  async createTxConfig(
    configName: ETransactionConfigEnum,
    amount: number,
  ): Promise<TransactionConfig> {
    const tx = await this.transactionConfigRepo.findOne({
      where: {
        name: configName,
      },
    });
    if (tx) {
      throw new BadRequestException('transaction config is already created');
    }
    const newTx = this.transactionConfigRepo.create({
      name: configName,
      amount:amount
    });
    return await this.transactionConfigRepo.save(newTx);
  }

  async createSubscriptionConfig(amount: number): Promise<TransactionConfig> {
    const tx = await this.createTxConfig(
      ETransactionConfigEnum.SUBSCRIPTION_COST,
      amount,
    );

    return tx;
  }

  async createReferalCommissionConfig(
    amount: number,
  ): Promise<TransactionConfig> {
    const tx = await this.createTxConfig(
      ETransactionConfigEnum.REFERAL_COMMISSION,
      amount,
    );
    return tx;
  }
  async createMinimumWalletConfig(amount: number): Promise<TransactionConfig> {
    const tx = await this.createTxConfig(
      ETransactionConfigEnum.MINIMUM_WALLET_WITHRAWAL,
      amount,
    );
    return tx;
  }
  async findTxById(id: number): Promise<TransactionConfig> {
    const tx = await this.transactionConfigRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!tx) throw new NotFoundException('Transaction config not found');
    return tx;
  }
  async findTxtByName(
    name: ETransactionConfigEnum,
  ): Promise<TransactionConfig> {
    const tx = await this.transactionConfigRepo.findOne({
      where: {
        name: name,
      },
    });
    if (!tx) throw new NotFoundException('Transaction config not found');
    return tx;
  }
  async findAllTx(): Promise<TransactionConfig[]> {
    return await this.transactionConfigRepo.find();
  }

  async updateTxConfigAmount(
    id: number,
    amount: number,
  ): Promise<TransactionConfig> {
    const tx = await this.findTxById(id);
    tx.amount = amount;
    return await this.transactionConfigRepo.save(tx);
  }
}
