import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { KickUserDto } from './dto/kick-user.dto';
import { RoomGateway } from './room.gateway';

@Injectable()
export class RoomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly roomGateway: RoomGateway
  ) {}

  // ------------------------ { Создание комнаты } --------------------

  async createRoom(dto: CreateRoomDto, id: number) {
    const room = await this.prisma.room.create({
      data: {
        ...dto,
        ownerId: id,
        users: {
          connect: { id },
        },
      },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
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
        users: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
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
        users: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        movies: true,
      },
    });
    this.roomGateway.addUserToNewRoom(String(user.id), updatedRoom);

    return {
      id: user.id,
      name: user.name,
    };
  }

  // --------------------- { Поиск комнаты по id } ----------------------

  async findRoomById(id: number) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
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

  async deleteRoomById(roomId: number, userEmail: string, userId: number) {
    const isRoom = await this.prisma.room.findFirst({ where: { id: roomId } });
    const isUserInRoom = await this.isUserInRoom(roomId, userEmail);
    if (!isUserInRoom) {
      throw new BadRequestException('Вы не находитесь в этой комнате!');
    }
    if (!isRoom) {
      throw new BadRequestException('Комнаты с таким id не существует!');
    }
    if (isRoom.ownerId !== userId) {
      throw new ForbiddenException('Вы не являетесь владельцем этой комнаты!');
    }
    return await this.prisma.room.delete({
      where: {
        id: roomId,
      },
    });
  }

  // --------------------------- { Удаление пользователя из комнаты } -----------------------------

  async kickUserFromRoom(roomId: number, dto: KickUserDto) {
    const user = await this.userService.findUserById(dto.id);
    if (!user) {
      throw new BadRequestException('Такого пользователя не существует!');
    }
    const isUser = await this.isUserInRoom(roomId, user.email);

    if (!isUser) {
      throw new BadRequestException('Пользователь не находится в данной комнате!');
    }

    this.roomGateway.kickUserFromRoom(String(user.id), roomId);

    return await this.prisma.room.update({
      where: { id: roomId },
      data: {
        users: {
          disconnect: {
            id: user.id,
          },
        },
      },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        movies: true,
      },
    });
  }
}
