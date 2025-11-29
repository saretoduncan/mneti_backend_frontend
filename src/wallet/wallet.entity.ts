import { UserProfile } from 'src/users/userProfile.entity';
import {
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
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 0 })
  balance: number;
  @Column({ unique: true })
  userProfileId: number;
  @OneToOne(() => UserProfile, (profile) => profile.wallet)
  @JoinColumn({ name: 'userProfileId' })
  userProfile: UserProfile;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
