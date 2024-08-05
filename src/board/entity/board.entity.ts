import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @Column()
  boardType: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
