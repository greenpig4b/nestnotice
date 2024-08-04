import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    example: 'ssar@nate.com',
    description: '유저 이메일',
  })
  email: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호',
  })
  password: string;

  @ApiProperty({
    example: '차무식',
    description: '이름',
  })
  name: string;
}
