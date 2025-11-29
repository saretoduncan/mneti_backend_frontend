import { Module } from '@nestjs/common';
import { TransactionConfigService } from './transaction-config.service';
import { TransactionConfig } from './transactionConfig.entity';

@Module({
  imports: [TransactionConfig],
  providers: [TransactionConfigService],
})
export class TransactionConfigModule {}
