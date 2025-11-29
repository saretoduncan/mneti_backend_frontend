import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commission } from './commission.entity';
import { CommissionService } from './commission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Commission])],
  providers: [CommissionService],
})
export class CommissionModule {
    
}
