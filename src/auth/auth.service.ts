import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  //   constructor(private readonly userService: UsersService) {}
  //   async register(email: string, password: string, name: string) {
  //     const existingUser = await this.userService.findOneUser(email);
  //     if (existingUser) {
  //       throw new Error('중복된 이메일 입니다.');
  //     }
  //     return this.userService.create(email, password, name);
  //   }
}
