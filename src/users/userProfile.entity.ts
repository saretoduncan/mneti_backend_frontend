import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";

@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ type: Date })
  date_of_birth: Date;
  @Column({ unique: true })
  userId: number;
  @OneToOne(() => Users, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: Users;
}
