import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<null | User> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { movie: true, rooms: true },
    });
  }

  async findUserById(id: number): Promise<null | User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { movie: true, rooms: true },
    });
  }
}
