import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { UserloginDTO } from './dto/userlogin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '성공',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async register(@Body() newUser: UserDTO): Promise<any> {
    return this.authService.register(newUser);
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 201,
    description: '성공',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async login(@Body() userDTO: UserloginDTO): Promise<any> {
    return await this.authService.vaildateUser(userDTO);
  }
}
