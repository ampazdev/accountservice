import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, UserDto, UserForRegistration } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { use } from 'passport';
import { IAuthService } from './iauth.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async createUser(dto: UserForRegistration) {
    const password = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password: password,
        },
      });

      console.log('user:' + user.password);
      const token = await this.signToken(user.id, user.email);
      const userToReturn: UserDto = {
        email: user.email,
        token: token,
        username: user.username,
        bio: user.bio,
        image: user.image,
      };

      return userToReturn;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        console.log('email is taken');
        if (e.code === 'P2002') throw new BadRequestException('email is taken');
      } else {
        console.log('error '+e);
      }
    }
  }

  async verifyUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new NotFoundException('user does not exist');
    const matches = await argon.verify(user.password, dto.password);

    // const hashedInputPassword = await argon.hash(dto.password);
    // console.log('login with: ' + hashedInputPassword + ' vs ' + user.password);
    // if (hashedInputPassword!==user.password)
    
    if (!matches)
      throw new UnauthorizedException('password and email do not match');
    const token = await this.signToken(user.id, user.email);
    const userReturned: UserDto = {
      email: user.email,
      token: token,
      username: user.username,
      bio: user.bio,
      image: user.image,
    };
    return userReturned;
  }

  async signToken(userId: string, email: string): Promise<string> {
    const data = {
      sub: userId,
      email: email,
    };
    const SECRET = this.config.get('SECRET');
    const token = await this.jwt.signAsync(data, {
      secret: SECRET,
      expiresIn: '5h',
    });
    return token;
  }
}
