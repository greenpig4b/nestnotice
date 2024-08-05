import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repository/user.repository';
import { UserAuthorityRepository } from './repository/user-authority.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, UserAuthorityRepository]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '300s' },
    }),
    PassportModule,
  ],
  exports: [TypeOrmModule],
  providers: [AuthService, JwtStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
