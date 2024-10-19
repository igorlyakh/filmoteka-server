import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async registration(dto: RegistrationDto) {
    const candidate = await this.userService.findUserByEmail(dto.email);
    if (candidate) {
      throw new ConflictException('Пользователь с таким email уже существует!');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });

    const accessToken = await this.generateToken(user.id, user.email);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (user) {
      return {
        accessToken: await this.generateToken(user.id, user.email),
      };
    }
  }

  private async generateToken(id: number, email: string) {
    const payload = { id, email };
    return this.jwt.sign(payload);
  }

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
