import {
  Module,
  NestModule,
  MiddlewareConsumer,
  OnModuleInit,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './auth/middleware/logger.middleware';
import { UsersService } from './auth/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

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

    for (const user of dummyUsers) {
      await this.usersService.createUser(user.email, user.password, user.name);
    }
  }
}
