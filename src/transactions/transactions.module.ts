import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { TransactionsService } from './transactions.service';
import { UserProfile } from 'src/users/userProfile.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Transaction, UserProfile])],
  providers: [TransactionsService],
  exports:[TransactionsService]
})
export class TransactionsModule {}
