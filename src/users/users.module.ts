import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Users } from './user.entity';
import { UserProfile } from './userProfile.entity';
import { UsersService } from './users.service';
import { Role } from 'src/roles/roles.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Users, UserProfile, Role])],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
