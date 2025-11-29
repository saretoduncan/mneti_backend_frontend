import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionConfigModule } from './transaction-config/transaction-config.module';
import { WalletModule } from './wallet/wallet.module';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mysql',
          url: process.env.DATABASE_URL,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    UsersModule,
    RolesModule,
    TransactionsModule,
    TransactionConfigModule,
    WalletModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
