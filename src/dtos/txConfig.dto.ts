import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ETransactionConfigEnum } from 'src/transaction-config/transactionConfig.entity';

export class TxConfigRequestDto {
  @ApiProperty({
    description: 'The amount for the transaction configuration',
    example: 100,
    minimum: 0,
  })
  @Min(0, { message: 'Amount must be at least 0' })
  @IsPositive()
  amount: number;
}

export class TxConfigResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the transaction configuration',
    example: 'c56a4180-65aa-42ec-a945-5fd21dec0538',
  })
  @IsOptional() // optional for creation, required for updates
  id?: string;

  @ApiProperty({
    description: 'The type of transaction configuration',
    enum: ETransactionConfigEnum,
    example: ETransactionConfigEnum.SUBSCRIPTION_COST,
  })
  @IsEnum(ETransactionConfigEnum, {
    message: 'Invalid transaction config type',
  })
  name: ETransactionConfigEnum;

  @ApiProperty({
    description: 'The amount for this transaction configuration',
    example: 100,
    minimum: 0,
  })
  @IsNumber()
  @Min(0, { message: 'Amount must be at least 0' })
  amount: number;

  @ApiPropertyOptional({
    description: 'Creation timestamp',
    example: '2025-12-08T12:34:56.789Z',
  })
  @IsOptional()
  createdAt?: Date;

  @ApiPropertyOptional({
    description: 'Last update timestamp',
    example: '2025-12-08T12:34:56.789Z',
  })
  @IsOptional()
  updatedAt?: Date;
}
