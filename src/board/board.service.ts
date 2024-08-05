import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entity/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async create(boardType: string, createBoardDto: CreateBoardDto) {
    const board = this.boardsRepository.create({
      ...createBoardDto,
      boardType,
    });
    return this.boardsRepository.save(board);
  }

  async findAll(boardType: string) {
    return this.boardsRepository.find({ where: { boardType } });
  }

  async findOne(boardType: string, id: number) {
    return this.boardsRepository.findOne({ where: { id, boardType } });
  }

  async update(boardType: string, id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.findOne(boardType, id);
    if (!board) {
      throw new ForbiddenException('Post not found');
    }
    Object.assign(board, updateBoardDto);
    return this.boardsRepository.save(board);
  }

  async remove(boardType: string, id: number) {
    const board = await this.findOne(boardType, id);
    if (!board) {
      throw new ForbiddenException('Post not found');
    }
    return this.boardsRepository.remove(board);
  }
}
