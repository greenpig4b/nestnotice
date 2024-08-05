import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

import { RoleType } from 'src/auth/security/enum/role-type';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/security/role.guard';
import { JWTAuthGuard } from 'src/auth/security/jwt.auth.guard';
import { UpdateBoardDto } from './dto/update-board';

@Controller('board')
@UseGuards(JWTAuthGuard, RolesGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post(':boardType')
  @Roles(RoleType.USER, RoleType.ADMIN)
  create(
    @Param('boardType') boardType: string,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return this.boardService.create(boardType, createBoardDto);
  }

  @Get(':boardType')
  findAll(@Param('boardType') boardType: string) {
    return this.boardService.findAll(boardType);
  }

  @Get(':boardType/:id')
  findOne(@Param('boardType') boardType: string, @Param('id') id: string) {
    return this.boardService.findOne(boardType, +id);
  }

  @Patch(':boardType/:id')
  @Roles(RoleType.USER, RoleType.ADMIN)
  update(
    @Param('boardType') boardType: string,
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(boardType, +id, updateBoardDto);
  }

  @Delete(':boardType/:id')
  @Roles(RoleType.ADMIN)
  remove(@Param('boardType') boardType: string, @Param('id') id: string) {
    return this.boardService.remove(boardType, +id);
  }
}
