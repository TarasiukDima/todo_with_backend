import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
  HttpCode,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { Request } from 'express';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  VERSION_UUID,
  DOC_MESSAGES,
  unauthorizedResponse,
  notFoundResponse,
  badResponse,
  todoSchema,
} from '../../settings';
import { Todo } from './entities/todo.entity';
import { IPaginationParams } from './todo.interface';

@Controller('todo')
@ApiTags('Todo')
@ApiSecurity('JWT-AUTHORIZATION')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiCreatedResponse({ description: DOC_MESSAGES.todoCreated, type: Todo })
  @ApiUnauthorizedResponse({
    description: DOC_MESSAGES.unauthorized,
    schema: unauthorizedResponse,
  })
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    const tokenFromHead = req.headers.authorization;

    return await this.todoService.create(createTodoDto, tokenFromHead);
  }

  @Get()
  @ApiOkResponse({
    description: DOC_MESSAGES.getTodo,
    schema: todoSchema,
  })
  @ApiUnauthorizedResponse({
    description: DOC_MESSAGES.unauthorized,
    schema: unauthorizedResponse,
  })
  @HttpCode(StatusCodes.OK)
  async findAll(
    @Req() req: Request,
    @Query() { offset, limit }: IPaginationParams,
  ) {
    return await this.todoService.findAllTodosToUser(
      req.headers.authorization,
      offset,
      limit,
    );
  }

  @Patch(':id')
  @ApiOkResponse({ description: DOC_MESSAGES.update, type: Todo })
  @ApiNotFoundResponse({
    description: DOC_MESSAGES.todoNotFound,
    schema: notFoundResponse,
  })
  @ApiBadRequestResponse({
    description: DOC_MESSAGES.todoBad,
    schema: badResponse,
  })
  @ApiUnauthorizedResponse({
    description: DOC_MESSAGES.unauthorized,
    schema: unauthorizedResponse,
  })
  @HttpCode(StatusCodes.OK)
  async update(
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: Request,
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    const tokenFromHead = req.headers.authorization;

    return await this.todoService.update(id, updateTodoDto, tokenFromHead);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: DOC_MESSAGES.todoDeleted })
  @ApiNotFoundResponse({
    description: DOC_MESSAGES.todoNotFound,
    schema: notFoundResponse,
  })
  @ApiBadRequestResponse({
    description: DOC_MESSAGES.todoBad,
    schema: badResponse,
  })
  @ApiUnauthorizedResponse({
    description: DOC_MESSAGES.unauthorized,
    schema: unauthorizedResponse,
  })
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(
    @Req() req: Request,
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    const tokenFromHead = req.headers.authorization;

    return await this.todoService.remove(id, tokenFromHead);
  }
}
