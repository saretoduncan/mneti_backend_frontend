import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  minLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';
import { Role } from 'src/roles/roles.entity';
import { Users } from 'src/users/user.entity';
import { UserProfile } from 'src/users/userProfile.entity';

export class LoginRequestDto {
  @ApiProperty({
    example: 'john_doe or johndoe@example.com',
    description: 'User username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123', description: 'your password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

//register user dto
export class RegisterUserRequestDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Valid user email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '254712345678',
    description: 'User phone number',
  })
  @IsString()
  @MinLength(10, { message: 'Please enter a valid number' })
  @MaxLength(12, { message: 'Please enter a valid number' })
  @Matches(/^\d+$/, { message: 'Phone number must contain numbers only' })
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    example: '1998-05-21',
    description: 'User date of birth',
    type: String,
  })
  @IsNotEmpty()
  date_of_birth: Date;

  @ApiProperty({
    example: 'ABC123EF',
    description: 'Referral code from another user',
    required: false,
  })
  @IsString()
  referredByCode: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password chosen by the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password confirmation',
  })
  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'Confirm password does not match password' })
  confirmPassword: string;
}

export class UserResponseDto extends OmitType(Users, ['password'] as const) {
  @ApiProperty({ example: 'djfkeri384fijoearf', description: 'Unique user ID' })
  id: string;

  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  username: string;

  @ApiProperty({
    type: () => UserProfile,
    required: false,
    description: 'User profile details',
  })
  profile?: UserProfile;

  @ApiProperty({
    type: () => [Role],
    description: 'Roles assigned to the user',
  })
  roles: Role[];

  @ApiProperty({
    example: '2025-01-25T14:48:00.000Z',
    description: 'Date when user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-01-26T14:48:00.000Z',
    description: 'Date when user was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token for authentication',
  })
  accessToken: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token for authentication',
  })
  accessToken: string;
}
