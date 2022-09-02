import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { UserService } from '../user/user.service';
import { AUTH_MESSAGES, TODO_MESSAGES } from '../../settings';
import { clearTypingData } from '../../utils';
import { IJWTData } from '../user/user.interface';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  private getAndCheckUserFromTokenData = async (tokenFromHead: string) => {
    const userTokenInfo = await this.userService.decodeTokenData(tokenFromHead);

    if (!userTokenInfo) {
      throw new NotFoundException(AUTH_MESSAGES.notFoundUser);
    }

    const { login, id } = userTokenInfo as IJWTData;

    const user = await this.userService.findOneBy('id', id);

    if (!user || user.id !== id || user.login !== login) {
      throw new NotFoundException(AUTH_MESSAGES.notFoundUser);
    }

    return user;
  };

  create = async (createTodoDto: CreateTodoDto, tokenFromHead: string) => {
    const user = await this.getAndCheckUserFromTokenData(tokenFromHead);
    const todo = await this.todoRepository.create({
      title: clearTypingData(createTodoDto.title),
      text: clearTypingData(createTodoDto.text),
      done: false,
      user: user,
    });

    return await this.todoRepository.save(todo);
  };

  findAllTodosToUser = async (
    tokenFromHead: string,
    offset = 0,
    limit = 10,
  ) => {
    const user = await this.getAndCheckUserFromTokenData(tokenFromHead);
    const [items, count] = await this.todoRepository.findAndCount({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: user.id,
        },
      },
      order: {
        title: 'ASC',
      },
      skip: offset,
      take: limit,
    });

    return {
      items,
      count,
    };
  };

  findOne = async (id: string) => {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException(TODO_MESSAGES.notFoundTodo);
    }

    return todo;
  };

  update = async (
    id: string,
    updateTodoDto: UpdateTodoDto,
    tokenFromHead: string,
  ) => {
    await this.getAndCheckUserFromTokenData(tokenFromHead);

    const todo = await this.findOne(id);

    if (!todo) {
      throw new NotFoundException(TODO_MESSAGES.notFoundTodo);
    }

    await this.todoRepository.update({ id }, updateTodoDto);

    return await this.todoRepository.findOneBy({ id });
  };

  remove = async (todoId: string, tokenFromHead: string) => {
    await this.getAndCheckUserFromTokenData(tokenFromHead);

    const todo = await this.todoRepository.findOneBy({ id: todoId });

    if (!todo) {
      throw new NotFoundException(TODO_MESSAGES.notFoundTodo);
    }

    await this.todoRepository.delete({ id: todoId });
    return TODO_MESSAGES.removedTodo;
  };
}
