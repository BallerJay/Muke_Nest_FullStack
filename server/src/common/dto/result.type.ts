import { ClassType } from 'type-graphql';
import { Page } from './page.type';
import { ObjectType, Field, Int } from '@nestjs/graphql';

interface IResult<T> {
  code: number;
  message: string;
  data?: T;
}

interface IResults<T> {
  code: number;
  message: string;
  data?: T[];
  page?: Page;
}

export function createResult<T>(ItemType: ClassType<T>): ClassType<IResult<T>> {
  @ObjectType()
  class Result implements IResult<T> {
    @Field(() => Int)
    code: number;
    @Field(() => String)
    message: string;
    @Field(() => ItemType, { nullable: true })
    data?: T;
  }

  return Result;
}

export function createResults<T>(
  ItemTypes: ClassType<T>,
): ClassType<IResults<T>> {
  @ObjectType()
  class Results implements IResults<T> {
    @Field(() => Int)
    code: number;
    @Field(() => String)
    message: string;
    @Field(() => ItemTypes, { nullable: true })
    data?: T[];
    @Field(() => Page, { nullable: true })
    page?: Page;
  }

  return Results;
}

@ObjectType()
export class CommonResult {
  @Field(() => Int)
  code: number;
  @Field(() => String, { nullable: true })
  message?: string;
}
