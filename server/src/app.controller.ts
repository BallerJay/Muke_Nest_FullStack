import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/models/user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: '超级管理员',
      desc: '管理员',
      tel: '123456',
      password: '123456',
      account: 'admin',
    });
  }

  @Get('/del')
  async del(): Promise<boolean> {
    return await this.userService.del('2f40546f-6773-40a0-bf0e-dce85c9562e8');
  }

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      '4fc75020-25bb-4d68-9111-018b0f9426e1',
      {
        name: 'Summer',
      },
    );
  }

  @Get('/find')
  async find(): Promise<User> {
    return await this.userService.find('4fc75020-25bb-4d68-9111-018b0f9426e1');
  }

  // constructor(private readonly appService: AppService) {}
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
