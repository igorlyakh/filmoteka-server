import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) {}

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

  async getUsersRoom(id: number) {
    const rooms = await this.prisma.room.findMany({
      where: {
        users: {
          some: {
            id,
          },
        },
      },
      include: {
        users: true,
        movies: true,
      },
    });

    return rooms;
  }

  async addUserToRoom(dto: AddUserToRoomDto, roomId: number) {
    const user = await this.userService.findUserByEmail(dto.email);

    const updatedRoom = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        users: true,
        movies: true,
      },
    });
    return updatedRoom;
  }

  async findRoomById(id: number) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        users: true,
        movies: true,
      },
    });
  }
}
