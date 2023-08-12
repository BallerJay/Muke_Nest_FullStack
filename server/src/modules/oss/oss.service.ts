import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as OSS from 'ali-oss';

import { OSSType } from './dto/oss.type';

@Injectable()
export class OSSService {
  async getSignature(): Promise<OSSType> {
    const config = {
      accessKeyId: 'LTAI5t8BpUZFrUAuau8dPyKs',
      accessKeySecret: 'rHtqRaSf7JKPzBExp3r6W5OKTY9sd9',
      bucket: 'muke-nest',
      dir: 'static/',
    };
    const client = new OSS(config);

    const date = new Date();
    date.setDate(date.getDate() + 1);
    const policy = {
      expiration: date.toISOString(), // 请求有效期
      conditions: [
        ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
      ],
    };

    //签名
    const formData = await client.calculatePostSignature(policy);
    //bucket域名
    const host = `https://${config.bucket}.${
      (await client.getBucketLocation()).location
    }.aliyuncs.com`.toString();
    //返回参数
    const params = {
      expire: dayjs().add(1, 'days').unix().toString(),
      policy: formData.policy,
      signature: formData.Signature,
      accessId: formData.OSSAccessKeyId,
      host,
    };

    return params;
  }
}
