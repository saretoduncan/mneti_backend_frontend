import { Role } from 'src/roles/roles.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfile } from './userProfile.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;

  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  profile?: UserProfile;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable()
  roles: Role[];
}

