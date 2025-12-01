import { nanoid } from 'nanoid';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transaction_config')
export class TransactionConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: ETransactionConfigEnum;
  @Column()
  amount: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export enum ETransactionConfigEnum {
  SUBSCRIPTION_COST = 'SUBSCRIPTION_COST',
  REFERAL_COMMISSION = 'REFERAL_COMMISSION',
  MINIMUM_WALLET_WITHRAWAL = 'MINIMUM_WALLET_WITHRAWAL',
}
