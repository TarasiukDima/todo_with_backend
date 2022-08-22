import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  badResponse,
  DOC_MESSAGES,
  notFoundResponse,
  tokensSchema,
  unauthorizedResponse,
  VERSION_UUID,
} from '../../settings';
import { Public } from '../../decorators';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  @ApiCreatedResponse({ description: DOC_MESSAGES.userCreated, type: User })
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Public()
  @Post('signin')
  @ApiCreatedResponse({
    description: DOC_MESSAGES.userSignIn,
    schema: tokensSchema,
  })
  @ApiBadRequestResponse({
    description: DOC_MESSAGES.userBad,
    schema: badResponse,
  })
  @HttpCode(StatusCodes.OK)
  async signin(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @ApiSecurity('JWT-AUTHORIZATION')
  @Get('refresh')
  @ApiCreatedResponse({
    description: DOC_MESSAGES.userRefresh,
    schema: tokensSchema,
  })
  @ApiBadRequestResponse({
    description: DOC_MESSAGES.userBad,
    schema: badResponse,
  })
  @ApiUnauthorizedResponse({
    description: DOC_MESSAGES.unauthorized,
    schema: unauthorizedResponse,
  })
  @HttpCode(StatusCodes.OK)
  async refresh(@Req() req: Request) {
    return await this.userService.refresh(req.headers.authorization);
  }

  @ApiSecurity('JWT-AUTHORIZATION')
  @Get(':id')
  @ApiCreatedResponse({
    description: DOC_MESSAGES.userGet,
    type: User,
  })
  @ApiBadRequestResponse({
    description: DOC_MESSAGES.userBad,
    schema: badResponse,
  })
  @ApiUnauthorizedResponse({
    description: DOC_MESSAGES.unauthorized,
    schema: unauthorizedResponse,
  })
  @HttpCode(StatusCodes.OK)
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    return await this.userService.findOneBy('id', id);
  }

  @ApiSecurity('JWT-AUTHORIZATION')
  @Delete(':id')
  @ApiNoContentResponse({ description: DOC_MESSAGES.userDeleted })
  @ApiNotFoundResponse({
    description: DOC_MESSAGES.userNotFound,
    schema: notFoundResponse,
  })
  @ApiBadRequestResponse({
    description: DOC_MESSAGES.userBad,
    schema: badResponse,
  })
  @ApiUnauthorizedResponse({
    description: DOC_MESSAGES.unauthorized,
    schema: unauthorizedResponse,
  })
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    return await this.userService.remove(id);
  }
}
