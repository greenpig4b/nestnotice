import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //모든 유저
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //유저 찾기
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // 이메일 중복체크
  async findOneUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // 회원가입
  async create(user: User): Promise<void> {
    // 이메일 중복 체크
    const existingUser = await this.findOneUserByEmail(user.email);
    if (existingUser) {
      throw new Error('이미 사용중인 이메일입니다.');
    }

    // 비밀번호 해싱
    user.password = await bcrypt.hash(user.password, 10);

    // 유저 저장
    await this.usersRepository.save(user);
  }

  // 탈퇴하기
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  //유저 생성
  //   async create(email: string, password: string, name: string): Promise<User> {
  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const newUser: User = {
  //       id: this.users.length + 1,
  //       email,
  //       password: hashedPassword,
  //       name,
  //     };

  //     this.users.push(newUser);
  //     return newUser;
  //   }

  // 유저 탈퇴
  //   async delete(email: string): Promise<boolean> {
  //     const index = this.users.findIndex((user) => user.email === email);

  //     if (index !== 1) {
  //       this.users.splice(index, 1);
  //       return true;
  //     }

  //     return false;
  //  }
}
