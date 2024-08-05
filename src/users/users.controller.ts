import { Controller } from '@nestjs/common';
import { UsersService } from '../auth/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
}
