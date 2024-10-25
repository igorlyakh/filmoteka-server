import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User as UserType } from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { JwtAccessGuard } from 'src/guards/jwt-access.guard';
import { UserService } from 'src/user/user.service';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@ApiTags('Комнаты')
@UseGuards(JwtAccessGuard)
@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService
  ) {}

  //! --------------------------- { Создание комнаты } ----------------------------------

  @ApiOperation({ description: 'Создание новой комнаты', summary: 'создание комнаты' })
  @ApiResponse({ status: 201, description: 'Комната успешно создана.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @ApiResponse({
    status: 400,
    description: 'Отправлены не корректные данные для создание комнаты.',
  })
  @ApiBody({ type: CreateRoomDto, description: 'Модель для создание комнаты:' })
  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  async createRoom(@Body() dto: CreateRoomDto, @User() user: UserType) {
    return this.roomService.createRoom(dto, user.id);
  }

  //! --------------------------- { Получение комнат пользователя } ----------------------------------

  @ApiOperation({
    description: 'Получение всех комнат пользователя',
    summary: 'получение комнат',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешное получение всех комнат.',
  })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @ApiBearerAuth()
  @HttpCode(200)
  @Get()
  async getUserRooms(@User() user: UserType) {
    const rooms = await this.roomService.getUsersRoom(user.id);
    if (rooms.length >= 1) {
      return rooms;
    }
    return {
      message: 'У пользователя ещё нет ни одной комнаты.',
    };
  }

  //! ----------------------------- { Добавление пользователя в комнату } -------------------------------

  @Patch(':roomId')
  async addUserToRoom(@Body() dto: AddUserToRoomDto, @Param('roomId') roomId: number) {
    const user = await this.userService.findUserByEmail(dto.email);
    const room = await this.roomService.findRoomById(roomId);
    if (!user) {
      throw new BadRequestException('Пользователя с таким email не существует.');
    }

    if (!room) {
      throw new BadRequestException('Пользователя с таким email не существует.');
    }

    const checkUser = await this.roomService.isUserInRoom(roomId, user.email);
    if (checkUser) {
      throw new BadRequestException('Пользователь уже находится в данной комнате.');
    }

    return this.roomService.addUserToRoom(dto, roomId);
  }
}
