import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Todo } from '../../todo/entities/todo.entity';
import { USER_ENTITY_OPTIONS } from '../../../settings';
import { IUser } from '../user.interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  login: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: number;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user, USER_ENTITY_OPTIONS)
  todos: Todo[];

  constructor(userInfo: Partial<User>) {
    Object.assign(this, userInfo);
  }
}
