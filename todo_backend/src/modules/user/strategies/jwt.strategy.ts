import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { AUTH_MESSAGES, JWT_SECRET_KEY } from '../../../settings';
import { IJWTToken } from '../user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate({ id, login }: IJWTToken) {
    const userExist = await this.userService.findOneBy('login', login);

    if (!userExist || userExist.id !== id) {
      throw new UnauthorizedException(AUTH_MESSAGES.notFoundUserToken);
    }

    return { id, login };
  }
}
