import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private readonly walletRepo: Repository<Wallet>,
    private readonly userProfileService: UsersService,
  ) {}

  //create wallet
  async createWallet(userProfileId: number): Promise<Wallet> {
    const wallet = await this.walletRepo.findOne({
      where: {
        userProfileId: userProfileId,
      },
      relations: {
        userProfile: true,
      },
    });
    if (wallet) {
      throw new BadRequestException('wallet is already created');
    }
    const newWallet = this.walletRepo.create({
      balance: 0,
    });
    return await this.walletRepo.save(newWallet);
  }
  //get wallet by id
  async getWalletById(id: number): Promise<Wallet> {
    const wallet = await this.walletRepo.findOne({
      where: {
        id,
      },
      relations: {
        userProfile: true,
      },
    });
    if (!wallet) {
      throw new NotFoundException('Wallet not found ');
    }
    return wallet;
  }
  //get wallet by user profile id
  async getWalletByUserProfileId(userProfileId: number): Promise<Wallet> {
    const profile =
      await this.userProfileService.getUserByProfileId(userProfileId);
    const wallet = await this.walletRepo.findOne({
      where: {
        userProfileId: profile.id,
      },
      relations: {
        userProfile: true,
      },
    });
    if (!wallet) {
      throw new NotFoundException('Wallet not found ');
    }
    return wallet;
  }
  //get all wallets
  async getAllWallets(): Promise<Wallet[]> {
    return await this.walletRepo.find();
  }
  //update balance
  async updateWalletBalance(
    userProfileId: number,
    amount: number,
  ): Promise<Wallet> {
    const wallet = await this.getWalletByUserProfileId(userProfileId);
    wallet.balance = amount;
    return await this.walletRepo.save(wallet);
  }
}
