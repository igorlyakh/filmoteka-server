import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(dto: CreateRoomDto, id: number) {
    const room = await this.prisma.room.create({
      data: {
        ...dto,
        users: {
          connect: { id },
        },
      },
      include: {
        users: true,
        movies: true,
      },
    });

    return room;
  }
}
