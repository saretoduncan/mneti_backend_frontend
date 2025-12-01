import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { RolesEnum } from 'src/roles/roles.entity';
import * as bcrypt from 'bcrypt';
import { UserProfile } from './userProfile.entity';
import {
  ICreateUserInterface,
  IUpdateUserProfileInterface,
} from 'src/interfaces/IUserInterface';
import { formatPhoneNumber } from 'src/common/methods/index.methods';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
    private roleService: RolesService,
    @InjectRepository(UserProfile)
    private readonly userProfileRepo: Repository<UserProfile>,
  ) {}

  //create user
  async createUser(username: string, password: string) {
    const getUser = await this.userRepo.findOne({
      where: {
        username,
      },
    });
    if (getUser) {
      throw new BadRequestException('User already exists');
    }
    const role = await this.roleService.getRoleByName(RolesEnum.USER);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepo.create({
      username: username,
      password: hashedPassword,
      roles: [role],
    });
    const savedUser = await this.userRepo.save(newUser);
    return await this.getUserById(savedUser.id);
  }

  //create with profile
  async createUserWithProfile(userInfo: ICreateUserInterface): Promise<Users> {
    const referredByUser = await this.userRepo.findOne({
      where: {
        referralCode: userInfo.referredByCode,
      },
      relations: {
        profile: true,
      },
    });

    if (!referredByUser) {
      throw new BadRequestException('Please use a valid Referral code');
    }
    const phoneNumber = formatPhoneNumber(userInfo.phone_number);

    const isNumberTaken = await this.userProfileRepo.findAndCount({
      where: {
        phone_number: phoneNumber,
      },
    });
    console.log;
    if (isNumberTaken[1] > 0) {
      throw new BadRequestException('Phone number already in use');
    }
    const user = await this.createUser(userInfo.email, userInfo.password);

    const userProfile = this.userProfileRepo.create({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phone_number: userInfo.phone_number,
      date_of_birth: userInfo.date_of_birth,
      referredBy: referredByUser.profile,
      user: user,
    });
    await this.userProfileRepo.save(userProfile);
    return await this.getUserById(user.id);
  }
  //get user by username
  async getUserByUsername(username: string): Promise<Users> {
    const user = await this.userRepo.findOne({
      where: {
        username,
      },
      relations: {
        profile: true,
        roles: true,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
  //get user by id
  async getUserById(userId: string) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        profile: {
          referrals: true,
          referredBy: true,
        },
        roles: true,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
  //get user by profileId
  async getUserByProfileId(profileId: string) {
    const user = await this.userProfileRepo.findOne({
      where: {
        id: profileId,
      },
      relations: {
        referrals: true,
        referredBy: true,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
  //get all users
  async getAllUsers() {
    const users = await this.userProfileRepo.find({
      relations: {
        referrals: true,
        referredBy: true,
      },
    });
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return;
  }
  //update user profile
  async updateUserProfile(
    userInfo: IUpdateUserProfileInterface,
    userId: string,
  ) {
    const user = await this.getUserById(userId);
    if (!user.profile) {
      throw new BadRequestException('User profile not found');
    }
    const profile = user.profile;
    if (userInfo.email !== undefined) {
      user.username = userInfo.email;
      profile.email = userInfo.email;
    }
    if (userInfo.firstName !== undefined) {
      profile.firstName = userInfo.firstName;
    }
    if (userInfo.lastName !== undefined) {
      profile.lastName = userInfo.lastName;
    }
    if (userInfo.phone_number !== undefined) {
      profile.phone_number = userInfo.phone_number;
    }
    if (userInfo.date_of_birth !== undefined) {
      profile.date_of_birth = userInfo.date_of_birth;
    }
    await this.userRepo.save(user);
    return await this.userProfileRepo.save(profile);
  }
  //update password
  async updatePassword(password: string, userId: string) {
    const user = await this.getUserById(userId);
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await this.userRepo.save(user);
    return;
  }
  //user subscribe
  async setIsSubscribed(userProfileId: string) {
    const user = await this.userProfileRepo.findOne({
      where: {
        id: userProfileId,
      },
      relations: {
        allTransactions: true,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
  }
}
