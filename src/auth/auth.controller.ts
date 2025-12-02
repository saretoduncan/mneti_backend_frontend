import {
  Controller,
  Post,
  UseGuards,

  Res,
  HttpCode,
  HttpStatus,
  Body,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { localGuard } from './guards/index.guards';
import { AuthService } from './auth.service';
import type { IRequestWithUser } from '../common/interfaces/IUserInterface';
import type { Response, Request } from 'express';
import {
  LoginRequestDto,
  RegisterUserRequestDto,
  UserResponseDto,
} from 'src/dtos/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //login
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    type: LoginRequestDto,
    description: 'User login credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful login. Returns user data with access token.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid username or password',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(localGuard)
  @Post('login')
  async login(
    @Req() req: IRequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserResponseDto> {
    return await this.authService.login(req.user, res);
  }

  //register user

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: RegisterUserRequestDto,
    description: 'User registration data',
  })
  @ApiResponse({
    status: 201,
    description:
      'User successfully registered. Returns user data with access token.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid registration data',
  })
  @Post('register')
  async registerUser(
    @Body() body: RegisterUserRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserResponseDto> {
    return await this.authService.registerUser(body, res);
  }

  //logout
  @Post('logout')
  logout( @Req() request:Request ,@Res({ passthrough: true }) res: Response) {
   
    return this.authService.logout(res);
  }
}
