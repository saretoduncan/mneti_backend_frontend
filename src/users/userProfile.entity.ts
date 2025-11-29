import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Transaction } from 'src/transactions/transactions.entity';

@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email?: string;
  @Column()
  phone_number: string;
  @Column({ type: Date })
  date_of_birth: Date;
  @Column({ unique: true })
  userId: number;
  @OneToOne(() => Users, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  allTransactions: Transaction[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
