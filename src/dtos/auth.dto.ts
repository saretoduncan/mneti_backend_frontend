import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
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

export class UserResponseDto extends OmitType(Users,['password'] as const) {
  @ApiProperty({ example: 1, description: 'Unique user ID' })
  id: number;

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
