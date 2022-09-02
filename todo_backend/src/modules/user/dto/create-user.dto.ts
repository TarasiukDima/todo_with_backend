import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import {
  MAX_LENGTH_LOGIN,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_LOGIN,
  MIN_LENGTH_PASSWORD,
} from 'src/settings';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    minLength: MIN_LENGTH_LOGIN,
    maxLength: MAX_LENGTH_LOGIN,
  })
  @IsString()
  @MinLength(MIN_LENGTH_LOGIN)
  @MaxLength(MAX_LENGTH_LOGIN)
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    minLength: MIN_LENGTH_PASSWORD,
    maxLength: MAX_LENGTH_PASSWORD,
  })
  @IsString()
  @MinLength(MIN_LENGTH_PASSWORD)
  @MaxLength(MAX_LENGTH_PASSWORD)
  @IsNotEmpty()
  password: string;
}
