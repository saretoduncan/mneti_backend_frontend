import { Users } from 'src/users/user.entity';
import { UserProfile } from 'src/users/userProfile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  @Column({ unique: true })
  mpesa_transaction_id: string;
  @Column()
  phone_number: string;
  @Column()
  transaction_type: ETransactionType;
  @Column({ unique: true })
  userProfileId: string;
  @ManyToOne(() => UserProfile, (profile) => profile.allTransactions)
  @JoinColumn({ name: 'userProfileId' })
  userProfile: UserProfile;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export enum ETransactionType {
  SUBSCRIPTION,
  COMMISSION,
}
