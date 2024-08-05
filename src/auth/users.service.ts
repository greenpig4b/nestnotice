import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entity/users.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UserDTO } from 'src/auth/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 더미 유저 생성
  async createUser(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
    });
    return this.usersRepository.save(user);
  }

  // 모든 유저
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // 유저 찾기
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // 이메일 중복 체크
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // 회원가입
  async create(userDTO: UserDTO): Promise<UserDTO> {
    // 이메일 중복 체크
    const existingUser = await this.findOneByEmail(userDTO.email);
    if (existingUser) {
      throw new Error('이미 사용 중인 이메일입니다.');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    const user = this.usersRepository.create({
      ...userDTO,
      password: hashedPassword,
    });

    // 유저 저장
    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  // 탈퇴하기
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByFields(options: FindOneOptions<User>): Promise<User | undefined> {
    return await this.usersRepository.findOne(options);
  }
}
