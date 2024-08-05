import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entity/users.entity';
import { UserAuthority } from './entity/user-authority.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAuthority]), // UserAuthority 등록
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // AuthService에서 사용할 수 있도록 export
})
export class UsersModule {}
