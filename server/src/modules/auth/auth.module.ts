import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ConsoleLogger, AuthService, AuthResolver, UserService],
  exports: [],
})
export class AuthModule {}
