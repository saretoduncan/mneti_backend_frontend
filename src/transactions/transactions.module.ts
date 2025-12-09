import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { TransactionsService } from './transactions.service';
import { UserProfile } from 'src/users/userProfile.entity';
import { TransactionsController } from './transactions.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Transaction, UserProfile])],
  providers: [TransactionsService],
  exports:[TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
