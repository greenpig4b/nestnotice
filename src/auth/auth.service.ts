import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDTO } from './dto/user.dto';
import { UserloginDTO } from './dto/userlogin.dto';
import * as bcrypt from 'bcryptjs';
import { Payload } from './security/payload.interface';
import { User } from 'src/users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 회원가입
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

    return await this.userService.create(newUser);
  }

  // 로그인
  async vaildateUser(
    userDTO: UserloginDTO,
  ): Promise<{ accessToken: string } | undefined> {
    let userFind: User = await this.userService.findByFields({
      where: { email: userDTO.email },
    });

    // bycript 비교
    const validatePassword = await bcrypt.compare(
      userDTO.password,
      userFind.password,
    );
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }

    const payload: Payload = {
      id: userFind.id,
      email: userFind.email,
      authorities: userFind.authorities,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async tokenValidateUser(payload: Payload): Promise<User | undefined> {
    return await this.userService.findByFields({
      where: { id: payload.id },
    });
  }
}
