import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Phone number of the user (Kenyan format)',
    example: '254712345678',
  })
  @Matches(/^(?:\+254|254|0)/, {
    message: 'Phone number must be a valid Kenyan number (e.g., 2547xxxxxxxx)',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'User profile identifier',
    example: 'f3c1b4e8-9d2c-4bd9-a6ed-723f1d89c1bb',
  })
  @IsString()
  userProfileId: string;
}