import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Transaction } from 'src/transactions/transactions.entity';
import { Wallet } from 'src/wallet/wallet.entity';

@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  phone_number: string;

  @Column({ type: Date })
  date_of_birth: Date;

  @Column({ default: false })
  isSubscribed: boolean;

  @Column({ unique: true })
  userId: number;

  @OneToOne(() => Users, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @OneToOne(() => Wallet, (wallet) => wallet.userProfile)
  wallet: Wallet;

  @OneToMany(() => UserProfile, (profile) => profile.referredBy)
  referrals: UserProfile[];

  @ManyToOne(() => UserProfile, (profile) => profile.referrals)
  @JoinColumn({ name: 'referrerId' })
  referredBy?: UserProfile;

  @Column({ nullable: true })
  referrerId?: number;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  allTransactions: Transaction[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
