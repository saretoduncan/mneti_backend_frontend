import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CommissionModule } from './commission/commission.module';

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
    CommissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
