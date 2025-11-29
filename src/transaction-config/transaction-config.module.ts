import { Global, Module } from '@nestjs/common';
import { TransactionConfigService } from './transaction-config.service';
import { TransactionConfig } from './transactionConfig.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from 'src/users/userProfile.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TransactionConfig])],
  providers: [TransactionConfigService],
  exports:[TransactionConfigService]
})
export class TransactionConfigModule {}
