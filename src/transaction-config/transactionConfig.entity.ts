import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transaction_config')
export class TransactionConfig {
  @PrimaryGeneratedColumn()
  id: number;
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
  SUBSCRIPTION_COST,
  REFERAL_COMMISSION,
  MINIMUM_WALLET_WITHRAWAL,
}
