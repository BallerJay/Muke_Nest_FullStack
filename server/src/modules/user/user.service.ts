import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './models/user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}
  // 新增
  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  }

  // 删除
  async del(id: string): Promise<boolean> {
    const res = await this.UserRepository.delete(id);
    if (res && res.affected > 0) {
      return true;
    } else {
      return false;
    }
  }

  // 更新
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(id, entity);
    if (res && res.affected > 0) {
      return true;
    } else {
      return false;
    }
  }

  // 查找
  async find(id: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  // 通过手机号查询验证码
  async findCodeByMobile(tel: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        tel,
      },
    });
    return res;
  }

  // 更新某个用户的验证码
  async updateCodeById(id: string, code: string): Promise<boolean> {
    const res = await this.UserRepository.update(id, {
      code,
      codeCreateTSAt: new Date(),
    });
    if (res && res.affected > 0) {
      return true;
    } else {
      return false;
    }
  }
}
