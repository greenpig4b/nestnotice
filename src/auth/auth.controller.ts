import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { UserloginDTO } from './dto/userlogin.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: 'register Success',
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
    description: 'login Success',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async login(
    @Body() userDTO: UserloginDTO,
    @Res() res: Response,
  ): Promise<any> {
    const jwt = await this.authService.vaildateUser(userDTO);
    res.setHeader('Authorization', 'Bearer' + jwt.accessToken);
    return res.json(jwt);
  }
}
