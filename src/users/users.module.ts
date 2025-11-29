import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Users } from './user.entity';
import { UserProfile } from './userProfile.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UserProfile])],
  providers: [UsersService],
})
export class UsersModule {}
