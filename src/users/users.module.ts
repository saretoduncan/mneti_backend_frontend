import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Users } from './user.entity';
import { UserProfile } from './userProfile.entity';
import { UsersService } from './users.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Users, UserProfile])],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
