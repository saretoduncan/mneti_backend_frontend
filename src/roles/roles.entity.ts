import { Users } from 'src/users/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: RolesEnum;

  @ManyToMany(() => Users, (user) => user.roles)
  users: Users[];
}

export enum RolesEnum {
  ADMIN,
  USER,
}
