import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  AUTH_MESSAGES,
  CRYPT_SALT,
  TOKEN_REFRESH_EXPIRE_TIME,
} from '../../settings';
import { IJWTData, IJWTToken, ITokenAnswer } from './user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { getTokenFromHeadersString } from '../../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private addHashPassword = async (password: string) => {
    return hash(password, CRYPT_SALT);
  };

  private generateToken = async (
    data: IJWTToken,
    options?: JwtSignOptions,
  ): Promise<string> => {
    const token = this.jwtService.sign(data, options);

    return token;
  };

  private getTokens = async ({
    id,
    login,
  }: IJWTToken): Promise<ITokenAnswer> => {
    const user = { id, login };

    return {
      accessToken: await this.generateToken(user),
      refreshToken: await this.generateToken(
        { ...user, isRefresh: true },
        { expiresIn: TOKEN_REFRESH_EXPIRE_TIME },
      ),
    };
  };

  private validateUser = async (
    login: string,
    password: string,
  ): Promise<User | null> => {
    const user = await this.userRepository.findOneBy({ login });

    if (!user) {
      return null;
    }

    const samePassword = await compare(password, user.password);

    return samePassword ? user : null;
  };

  decodeTokenData = async (
    tokenFromHead: string,
    time = TOKEN_REFRESH_EXPIRE_TIME,
  ): Promise<IJWTData | false> => {
    try {
      const tokenStr = await getTokenFromHeadersString(tokenFromHead);
      const jwtData: IJWTData = await this.jwtService.verifyAsync(tokenStr, {
        maxAge: time,
      });

      return jwtData;
    } catch (e) {
      return false;
    }
  };

  create = async ({ login, password, username }: CreateUserDto) => {
    const userExist = await this.userRepository.findOneBy({ login });

    if (userExist) {
      throw new NotFoundException(AUTH_MESSAGES.userExist);
    }

    const user = this.userRepository.create({
      username,
      login,
      password: await this.addHashPassword(password),
    });

    return await this.userRepository.save(user);
  };

  login = async ({ login, password }: LoginUserDto) => {
    const user = await this.validateUser(login, password);

    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.badLoginData);
    }

    return await this.getTokens({ id: user.id, login: user.login });
  };

  refresh = async (refreshToken: string): Promise<ITokenAnswer | null> => {
    const tokenObj = await this.decodeTokenData(refreshToken);

    if (!tokenObj) {
      throw new UnauthorizedException(AUTH_MESSAGES.notAuthorization);
    }

    const { id, login, isRefresh = false } = tokenObj as IJWTData;

    if (!isRefresh) {
      throw new BadRequestException(AUTH_MESSAGES.invalidRefreshToken);
    }

    const user = await this.userRepository.findOneBy({ login });

    if (!user || user.id !== id) {
      throw new NotFoundException(AUTH_MESSAGES.notFoundUser);
    }

    return await this.getTokens({ id: user.id, login: user.login });
  };

  findOneBy = async (key: keyof User, value: User[keyof User]) => {
    const user = await this.userRepository.findOneBy({ [key]: value });

    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.notFoundUser);
    }

    return user;
  };

  remove = async (id: string) => {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.notFoundUser);
    }

    return await this.userRepository.delete({ id });
  };
}
