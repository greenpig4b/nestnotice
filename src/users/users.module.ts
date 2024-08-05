import { Module } from '@nestjs/common';
import { UsersService } from '../auth/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, TypeOrmModule], // UsersService를 내보내기 추가
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
