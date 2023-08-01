import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { faker } from "@faker-js/faker/locale/zh_CN";

const typeDefs = `#graphql
type UserType {
  id: String!

  """昵称"""
  name: String!

  """简介"""
  desc: String!

  """电话"""
  tel: String!

  """头像"""
  account: String
}

type Query {
  """使用 ID 查找用户"""
  find(id: String!): UserType!
}

type Mutation {
  """新增用户"""
  create(params: UserInput!): Boolean!

  """更新用户"""
  update(id: String!, params: UserInput!): Boolean!

  """删除用户"""
  del(id: String!): Boolean!
}

input UserInput {
  """昵称"""
  name: String!

  """简介"""
  desc: String!

  """账号"""
  account: String!
}
`;

const resolvers = {
  UserType: {
    name: () => faker.person.fullName(),
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "hello",
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true,
  }),
});

startStandaloneServer(server, { listen: { port: 8888 } });

console.log(`🚀 Server listening at:`);
