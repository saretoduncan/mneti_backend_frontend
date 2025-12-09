import { nanoid } from 'nanoid';
import { UserProfile } from 'src/users/userProfile.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ default: 0 })
  balance: number;
  @Column({ unique: true })
  userProfileId: string;
  @OneToOne(() => UserProfile, (profile) => profile.wallet, {onUpdate:"CASCADE"})
  @JoinColumn({ name: 'userProfileId' })
  userProfile: UserProfile;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
