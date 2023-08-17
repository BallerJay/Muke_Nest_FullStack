import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Dysmsapi from '@alicloud/dysmsapi20170525';
import Util, * as Utils from '@alicloud/tea-util';
import { getRandomCode } from 'src/shared/utils';

import { SIGN_NAME, TEMPLATE_CODE } from 'src/common/constants/aliyun';
import { UserService } from '../user/user.service';
import { msgClient } from 'src/shared/utils/msg';
import * as dayjs from 'dayjs';
import { CommonResult } from '@/common/dto/result.type';
import {
  CODE_NOT_EXPIRE,
  SUCCESS,
  UPDATE_ERROR,
} from 'src/common/constants/code';

@Injectable()
export class AuthService {
  constructor(private readonly UserService: UserService) {}

  // 查找
  async sendCodeMsg(tel: string): Promise<CommonResult> {
    const userInfo = await this.UserService.findCodeByMobile(tel);
    if (userInfo) {
      const diffTime = dayjs().diff(dayjs(userInfo.codeCreateTSAt));
      if (diffTime < 60 * 1000) {
        return {
          code: CODE_NOT_EXPIRE,
          message: 'code 尚未过期',
        };
      }
    }
    const code = getRandomCode();
    let sendSmsRequest = new Dysmsapi.SendSmsRequest({
      signName: SIGN_NAME,
      templateCode: TEMPLATE_CODE,
      phoneNumbers: tel,
      templateParam: `{"code": "${code}"}`,
    });
    let runtime = new Utils.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      const res = await msgClient.sendSmsWithOptions(sendSmsRequest, runtime);
      const userInfo = await this.UserService.findCodeByMobile(tel);
      if (userInfo) {
        const updateResult = await this.UserService.updateCodeById(
          userInfo.id,
          code,
        );
        if (updateResult) {
          return {
            code: SUCCESS,
            message: 'ok',
          };
        } else {
          return {
            code: UPDATE_ERROR,
            message: '更新code 失败',
          };
        }
      }

      const createResult = await this.UserService.create({
        tel,
        code,
        codeCreateTSAt: new Date(),
      });
      if (createResult) {
        return {
          code: SUCCESS,
          message: 'ok',
        };
      } else {
        return {
          code: UPDATE_ERROR,
          message: '新建账号失败',
        };
      }
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }
  }
}
