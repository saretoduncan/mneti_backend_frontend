import { Role } from 'src/roles/roles.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProfile } from './userProfile.entity';
import { Transaction } from 'src/transactions/transactions.entity';
import { nanoid } from 'nanoid';

@Entity({ name: 'users' })
export class Users {
 @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ unique: true, nullable: true })
  referralCode: string;
  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  profile?: UserProfile;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable()
  roles: Role[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
