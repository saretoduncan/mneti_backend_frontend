import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Users } from './user.entity';
import { UserProfile } from './userProfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UserProfile])],
})
export class UsersModule {}
