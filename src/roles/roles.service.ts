import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, RolesEnum } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}
  //create role
  async createRole(name: RolesEnum) {
    const getRole = await this.roleRepo.findOne({
      where: {
        name: name,
      },
    });
    if (getRole) {
      throw new BadRequestException('Role already exists');
    }
    const newRole = this.roleRepo.create({
      name: name,
    });
    return await this.roleRepo.save(newRole);
  }
  
  //getRoleByName
  async getRoleByName(name: RolesEnum) {
    const role = await this.roleRepo.findOne({
      where: {
        name: name,
      },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
  
  //get all roles
  async getAllRoles() {
    const roles = await this.roleRepo.find();
    if (roles.length === 0) {
      throw new BadRequestException('No roles found');
    }
    return roles;
  }
  //get role by id
  async rolesById(id: string) {
    const role = await this.roleRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
  //update role
  async updateRole(role: RolesEnum, id: string) {
    const getRoleById = await this.roleRepo.findOne({
      where: {
        id,
      },
    });
    if (!getRoleById) {
      throw new BadRequestException('Role not found');
    }

    const getRole = await this.roleRepo.findOne({
      where: {
        name: role,
      },
    });
    if (getRole) {
      throw new BadRequestException(`Role with ${Role} already exists`);
    }
    getRoleById.name = role;
    return await this.roleRepo.save(getRoleById);
  }
}
