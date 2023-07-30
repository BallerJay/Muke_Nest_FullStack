import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id?: string;
  @Field({ description: '昵称' })
  name?: string;
  @Field({ description: '简介' })
  desc: string;
  @Field({ description: '电话' })
  tel: string;
  @Field({ description: '头像', nullable: true })
  account?: string;
}
