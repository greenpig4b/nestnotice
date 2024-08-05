import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { UserloginDTO } from './dto/userlogin.dto';
import { Request, Response } from 'express';
import { JWTAuthGuard } from './security/jwt.auth.guard';

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

  @Get('/authenticate')
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '인증 확인' })
  @ApiResponse({
    status: 200,
    description: 'Authenticated',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  isAuthenicated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
}
