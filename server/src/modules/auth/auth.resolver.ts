import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Boolean, { description: '发送短信验证码' })
  async sendCodeMsg(@Args('tel') tel: string): Promise<boolean> {
    return await this.authService.sendCodeMsg(tel);
  }
  @Mutation(() => Boolean, { description: '登录' })
  async login(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<boolean> {
    const user = await this.userService.findCodeByMobile(tel);
    if (!user) {
      return false;
    }
    if (!user.codeCreateTSAt || !user.code) {
      return false;
    }
    if (dayjs().diff(dayjs(user.codeCreateTSAt)) > 60 * 1000) {
      return false;
    }
    if (user.code === code) {
      return true;
    }

    return false;
  }
}