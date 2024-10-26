import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService
  ) {}

  //! Регистрация

  async registration(dto: RegistrationDto, res: Response) {
    const candidate = await this.userService.findUserByEmail(dto.email);
    if (candidate) {
      throw new ConflictException('Пользователь с таким email уже существует!');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.createUser(
      { email: dto.email, name: dto.name },
      hashedPassword
    );

    const { accessToken, refreshToken } = await this.generateToken(user.id, user.email);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      signed: true,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    };
  }

  //! Авторизация

  async login(dto: LoginDto, res: Response) {
    const user = await this.validateUser(dto.email, dto.password);
    if (user) {
      const { accessToken, refreshToken } = await this.generateToken(user.id, user.email);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        signed: true,
      });
      return {
        accessToken,
      };
    }
  }

  //! Обновление токена

  async refreshTokens(user: User, res: Response) {
    const { accessToken, refreshToken } = await this.generateToken(user.id, user.email);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      signed: true,
    });
    return { accessToken };
  }

  //! Создание токена

  private async generateToken(id: number, email: string) {
    const payload = { id, email };

    const accessToken = this.jwt.sign(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  //! Валидация пользователя

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('Неверный логин или пароль!', 401);
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new HttpException('Неверный логин или пароль!', 401);
    }
    return user;
  }
}
