import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, RolesEnum } from 'src/roles/roles.entity';
import {
  ETransactionConfigEnum,
  TransactionConfig,
} from 'src/transaction-config/transactionConfig.entity';
import { Users } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { UserProfile } from 'src/users/userProfile.entity';
@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);
  constructor(
    @InjectRepository(Users) private readonly usersRepo: Repository<Users>,
    @InjectRepository(UserProfile)
    private readonly profileRepo: Repository<UserProfile>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(TransactionConfig)
    private readonly transactionConfigRepo: Repository<TransactionConfig>,
  ) {}
  async seed() {
    this.logger.log('Starting database seeding...');
    await this.seedAll();
    this.logger.log('Database seeding complete!');
  }

  private async seedAll() {
    await this.seedRoles();
    await this.seedAdminUser();
    await this.seedTxConfig();
  }
  private async seedRoles() {
    const adminRole = await this.roleRepo.findOne({
      where: {
        name: RolesEnum.ADMIN,
      },
    });
    const userRole = await this.roleRepo.findOne({
      where: {
        name: RolesEnum.USER,
      },
    });
    if (!adminRole) {
      const newAdminRole = this.roleRepo.create({
        name: RolesEnum.ADMIN,
      });
      await this.roleRepo.save(newAdminRole);
      this.logger.log('ADMIN role created successfully');
    }
    if (!userRole) {
      const newUserRole = this.roleRepo.create({
        name: RolesEnum.USER,
      });
      await this.roleRepo.save(newUserRole);
    }
    return;
  }
  private async seedAdminUser() {
    const admin = await this.usersRepo.findOne({
      where: {
        username: 'Admin',
      },
    });

    const AdminRole = await this.roleRepo.findOne({
      where: {
        name: RolesEnum.ADMIN,
      },
    });
    if (!AdminRole) {
      this.logger.log('Admin role is not found');
      return;
    }

    if (!admin) {
      const password = process.env.ADMIN_PASSWORD!!;
      const hashedPassword = await bcypt.hash(password, 10);
      const referralCode = nanoid(12);
      const email = 'techguymoi@gmail.com';
      const newAdmin = this.usersRepo.create({
        username: email,
        password: hashedPassword,
        referralCode: referralCode,
        roles: [AdminRole],
      });
      const newAdminProfile = this.profileRepo.create({
        firstName: 'tech',
        lastName: 'guy',
        email: email,
        date_of_birth: new Date('1997-1-1'),
        phone_number: '254715691186',
        isSubscribed:true
      });
      newAdmin.profile = newAdminProfile;
      await this.usersRepo.save(newAdmin);
      this.logger.log('successfully created Admin User');
    }
    return;
  }

  private async seedTxConfig() {
    const txConfig = await this.transactionConfigRepo.find();
    const isSubscriptionMissing = !txConfig.some(
      (item) => item.name === ETransactionConfigEnum.SUBSCRIPTION_COST,
    );
    const isCommissionMissing = !txConfig.some(
      (item) => item.name === ETransactionConfigEnum.REFERAL_COMMISSION,
    );
    const isMinimalWalletMissing = !txConfig.some(
      (item) => item.name === ETransactionConfigEnum.MINIMUM_WALLET_WITHRAWAL,
    );
    if (isSubscriptionMissing) {
      const newSub = this.transactionConfigRepo.create({
        name: ETransactionConfigEnum.SUBSCRIPTION_COST,
        amount: 0,
      });
      await this.transactionConfigRepo.save(newSub);
      this.logger.log(
        `${ETransactionConfigEnum.SUBSCRIPTION_COST} tx config has been created`,
      );
    }
    if (isCommissionMissing) {
      const newCommission = this.transactionConfigRepo.create({
        name: ETransactionConfigEnum.REFERAL_COMMISSION,
        amount: 0,
      });
      await this.transactionConfigRepo.save(newCommission);
      this.logger.log(
        `${ETransactionConfigEnum.REFERAL_COMMISSION} tx config has been created`,
      );
    }
    if (isMinimalWalletMissing) {
      const newMin = this.transactionConfigRepo.create({
        name: ETransactionConfigEnum.MINIMUM_WALLET_WITHRAWAL,
        amount: 0,
      });
      await this.transactionConfigRepo.save(newMin);
      this.logger.log(
        `${ETransactionConfigEnum.MINIMUM_WALLET_WITHRAWAL} tx config has been created`,
      );
    }
    return;
  }
}
