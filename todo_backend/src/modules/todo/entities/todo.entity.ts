import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TODO_ENTITY_OPTIONS } from '../../../settings';
import { User } from '../../user/entities/user.entity';
import { ITodo } from '../todo.interface';

@Entity()
export class Todo implements ITodo {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  text: string;

  @Column()
  @ApiProperty({ default: false })
  done: boolean;

  @CreateDateColumn()
  @ApiProperty({ default: '2022-08-21T13:12:27.697Z' })
  createdAt: number;

  @UpdateDateColumn()
  @ApiProperty({ default: '2022-08-21T13:12:27.697Z' })
  updatedAt: number;

  @Exclude()
  @ManyToOne(() => User, (user) => user.todos, TODO_ENTITY_OPTIONS)
  user: User;

  constructor(todoInfo: Partial<Todo>) {
    Object.assign(this, todoInfo);
  }
}
