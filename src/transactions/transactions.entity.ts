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
  @Column()
  mpesa_transaction_id: string;
  @Column()
  phone_number: string;
  @Column({ unique: true })
  userId: string;
  @ManyToOne(() => UserProfile, (profile) => profile.allTransactions)
  @JoinColumn({ name: 'userId' })
  user: UserProfile;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
