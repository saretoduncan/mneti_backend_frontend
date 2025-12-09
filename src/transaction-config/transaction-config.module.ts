import { Global, Module } from '@nestjs/common';
import { TransactionConfigService } from './transaction-config.service';
import { TransactionConfig } from './transactionConfig.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from 'src/users/userProfile.entity';
import { TransactionConfigController } from './transaction-config.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TransactionConfig])],
  providers: [TransactionConfigService],
  exports: [TransactionConfigService],
  controllers: [TransactionConfigController],
})
export class TransactionConfigModule {}
