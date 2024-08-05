import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  Inject,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './users/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/users.entity';
import { UsersService } from './users/users.service';
import { UserAuthority } from './users/entity/user-authority.entity';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [User, UserAuthority],
      synchronize: true, // 개발모드에서만 설정
      logging: true,
    }),
    AuthModule,
    UsersModule,
    NoticeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly usersService: UsersService) {} // UsersService 의존성 주입

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  async onModuleInit() {
    await this.createDummyData();
  }

  private async createDummyData() {
    const dummyUsers = [
      { email: 'ssar@nate.com', password: '1234', name: '최민욱' },
      { email: 'cos@nate.com', password: '1234', name: '김지훈' },
      { email: 'love@nate.com', password: '1234', name: '장유진' },
    ];
    const dummyNotice = [];
    //
    for (const user of dummyUsers) {
      await this.usersService.createUser(user.email, user.password, user.name);
    }
  }
}
