import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import {
  ICreateUserInterface,
  IRequestWithJwtPayload,
  TUsersWithNoPassword,
} from 'src/common/interfaces/IUserInterface';
import { RolesEnum } from 'src/roles/roles.entity';
import { Response } from 'express';
import { RefreshTokenResponseDto, UserResponseDto } from 'src/dtos/auth.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  ) {}

  //sign jwt token
  private async signJwtToken(
    username: string,
    id: string,
    roles: RolesEnum[],
    secret: string,
    expiry: string,
  ) {
    return await this.jwtService.signAsync(
      { username: username, sub: id, roles: roles },
      {
        secret: secret,
        expiresIn: Number(expiry),
      },
    );
  }
  //sign access token
  private async signAccessToken(
    username: string,
    id: string,
    roles: RolesEnum[],
  ) {
    return await this.signJwtToken(
      username,
      id,
      roles,
      process.env.ACCESS_TOKEN_SECRET!!,
      process.env.ACCESS_TOKEN_EXPIRY!!,
    );
  }
  //sign refresh token
  private async signRefreshToken(
    username: string,
    id: string,
    roles: RolesEnum[],
  ) {
    return await this.signJwtToken(
      username,
      id,
      roles,
      process.env.REFRESH_TOKEN_SECRET!!,
      process.env.REFRESH_TOKEN_EXPIRY!!,
    );
  }
  //set cookie
  private setCookie(res: Response, refresherToken: string) {
    res.cookie(process.env.REFRESH_TOKEN_KEY!!, refresherToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY!!) * 1000,
      path: '/',
    });
  }

  //register user
  //validate user
  async validateUser(
    username: string,
    password: string,
  ): Promise<TUsersWithNoPassword | void> {
    const user = await this.userRepo.findOne({
      where: {
        username,
      },
      relations: {
        roles: true,
        profile: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User is not registered yet!');
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return;
    }

    return user;
  }
  //remove password
  private omitPassword(user: Users) {
    const { password, ...rest } = user;
    return rest;
  }
  //login user
  async login(
    user: TUsersWithNoPassword,
    res: Response,
  ): Promise<UserResponseDto> {
    const accessToken = await this.signAccessToken(
      user.username,
      user.id,
      user.roles.map((role) => role.name),
    );
    const refresherToken = await this.signRefreshToken(
      user.username,
      user.id,
      user.roles.map((role) => role.name),
    );
    this.setCookie(res, refresherToken);

    return { ...this.omitPassword(user), accessToken };
  }
  //register user
  async registerUser(
    user: ICreateUserInterface,
    res: Response,
  ): Promise<UserResponseDto> {
    const newUser = await this.userService.createUserWithProfile(user);
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(
        newUser.username,
        newUser.id,
        newUser.roles.map((role) => role.name),
      ),
      this.signRefreshToken(
        newUser.username,
        newUser.id,
        newUser.roles.map((role) => role.name),
      ),
    ]);
    this.setCookie(res, refreshToken);
    return { ...this.omitPassword(newUser), accessToken };
  }
  //refresh token
  async refreshToken(
    user: IRequestWithJwtPayload,
  ): Promise<RefreshTokenResponseDto> {
    const token = await this.signAccessToken(
      user.user.username,
      user.user.sub,
      user.user.roles,
    );
    return { accessToken: token };
  }

  //forgot password

  //logout
  async logout(res: Response) {
    res.clearCookie(process.env.REFRESH_TOKEN_KEY!!);
    return
  }
}
