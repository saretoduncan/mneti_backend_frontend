import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/roles.entity';
import { RolesModule } from 'src/roles/roles.module';
import { TransactionConfigModule } from 'src/transaction-config/transaction-config.module';
import { TransactionConfig } from 'src/transaction-config/transactionConfig.entity';
import { Users } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { SeederService } from './seeder.service';
import { UserProfile } from 'src/users/userProfile.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Users, Role, TransactionConfig, UserProfile]),
        UsersModule,
        RolesModule,
        TransactionConfigModule
    ],
    providers: [SeederService]
})
export class SeederModule {}
