import {  Controller, Post, UseGuards, Request, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { localGuard } from './guards/index.guards';
import { AuthService } from './auth.service';
import type { IRequestWithUser } from '../interfaces/IUserInterface';
import type {Response} from 'express'
import { LoginRequestDto, UserResponseDto } from 'src/dtos/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
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
 async login(@Request() req:IRequestWithUser,@Res({passthrough:true}) res:Response ):Promise<UserResponseDto> {
    return await this.authService.login(req.user, res)
  }
}
