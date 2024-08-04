import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDTO } from './dto/user.dto';
import { User } from 'src/users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async register(newUser: UserDTO): Promise<UserDTO> {
    let userEmailFind: UserDTO = await this.userService.findOneByEmail(
      newUser.email,
    );

    if (userEmailFind) {
      throw new HttpException(
        'Useremail already used!',
        HttpStatus.BAD_REQUEST,
      );
    }

    // DTO 유저로 변환
    const user: User = new User();
    user.email = newUser.email;
    user.password = newUser.password;
    user.name = newUser.name;

    await this.userService.create(user);

    return newUser;
  }
}
