import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commission } from './commission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission)
    private readonly commissionRepo: Repository<Commission>,
  ) {}

  async createCommission(amount: number) {
    const isCommissionCreated = await this.commissionRepo.find();
    if (isCommissionCreated.length > 0) {
      throw new BadRequestException('Commisison already created');
    }
    const newCommission = this.commissionRepo.create({
      amount: amount,
    });
    await this.commissionRepo.save(newCommission);
    return newCommission;
  }

  async getCommission() {
    const commission = await this.commissionRepo.find();
    if (commission.length === 0) {4
      throw new NotFoundException(
        'Commission not found or it has not been created yet',
      );
    }
    return commission[0];
  }

  async updateCommission(amount: number, id: number) {
    const commission = await this.commissionRepo.findOne({ where: { id } });
    if (!commission) {
      throw new NotFoundException(
        'commission not found or it has not been created yet',
      );
    }
    commission.amount = amount;
    return await this.commissionRepo.save(commission);
  }

  
}
