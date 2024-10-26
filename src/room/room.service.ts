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

  // ------------------------ { Создание комнаты } --------------------

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

  // ------------------- { Получение комнат пользователя } -----------------

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

  // ---------------------- { Добавление пользователя в комнату } -------------------

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

  // --------------------- { Поиск комнаты по id } ----------------------

  async findRoomById(id: number) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        users: true,
        movies: true,
      },
    });
  }

  // ---------------------- { Проверка нахождение пользователя в комнате } --------------------------

  async isUserInRoom(roomId: number, email: string) {
    const user = await this.prisma.room.findFirst({
      where: {
        id: roomId,
        users: {
          some: {
            email,
          },
        },
      },
    });

    if (user) {
      return true;
    }

    return false;
  }

  // ------------------------ { Удаление комнаты по id } ----------------------------

  async deleteRoomById(roomId: number) {
    return await this.prisma.room.delete({
      where: {
        id: roomId,
      },
    });
  }
}
