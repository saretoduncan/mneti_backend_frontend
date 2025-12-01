import { nanoid } from 'nanoid';
import { Users } from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: RolesEnum;

  @ManyToMany(() => Users, (user) => user.roles)
  users: Users[];
}

export enum RolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
