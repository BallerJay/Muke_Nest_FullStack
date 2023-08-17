import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as dayjs from 'dayjs';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CommonResult } from '@/common/dto/result.type';
import {
  ACCOUNT_NOT_EXIST,
  CODE_EXPIRE,
  CODE_NOT_EXIST,
  LOGIN_FAIL,
  SUCCESS,
} from '@/common/constants/code';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => CommonResult, { description: '发送短信验证码' })
  async sendCodeMsg(@Args('tel') tel: string): Promise<CommonResult> {
    return await this.authService.sendCodeMsg(tel);
  }

  @Mutation(() => CommonResult, { description: '登录' })
  async login(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<CommonResult> {
    const user = await this.userService.findCodeByMobile(tel);
    if (!user) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '账号不存在',
      };
    }
    if (!user.codeCreateTSAt || !user.code) {
      return {
        code: CODE_NOT_EXIST,
        message: '验证码不存在',
      };
    }
    if (dayjs().diff(dayjs(user.codeCreateTSAt)) > 60 * 1000) {
      return {
        code: CODE_EXPIRE,
        message: '验证码过期',
      };
    }
    if (user.code === code) {
      return {
        code: SUCCESS,
        message: 'ok',
      };
    }

    return {
      code: LOGIN_FAIL,
      message: '登录失败，手机号或验证码不对',
    };
  }
}
