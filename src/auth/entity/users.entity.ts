import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuthority } from './user-authority.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany((type) => UserAuthority, (userAuthority) => userAuthority.user, {
    eager: true,
  })
  authorities?: UserAuthority[];
}
