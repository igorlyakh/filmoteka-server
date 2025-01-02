import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User as UserType } from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { JwtAccessGuard } from 'src/guards/jwt-access.guard';
import { UserService } from 'src/user/user.service';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { DeleteRoomDto } from './dto/delete-room.dto';
import { KickUserDto } from './dto/kick-user.dto';
import { RoomService } from './room.service';

@ApiTags('Комнаты')
@UseGuards(JwtAccessGuard)
@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService
  ) {}

  // --------------------------- { Создание комнаты } ----------------------------------

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

  // --------------------------- { Получение комнат пользователя } ----------------------------------

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
    return rooms;
  }

  // ----------------------------- { Добавление пользователя в комнату } -------------------------------

  @ApiOperation({
    description: 'Добавление пользователя в существующую комнату',
    summary: 'добавление пользователя',
  })
  @ApiParam({
    name: 'roomId',
    description: 'id комнаты в которую будет добавлен пользователь',
    example: 3,
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Пользователь успешно добавлен.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @ApiResponse({
    status: 400,
    description:
      'Неверно переданные данные либо пользователь уже находится в данной комнате.',
  })
  @ApiBearerAuth()
  @Patch(':roomId')
  async addUserToRoom(@Body() dto: AddUserToRoomDto, @Param('roomId') roomId: number) {
    const user = await this.userService.findUserByEmail(dto.email);
    const room = await this.roomService.findRoomById(roomId);
    if (!user) {
      throw new BadRequestException('Пользователя с таким email не существует.');
    }

    if (!room) {
      throw new BadRequestException('Такой комнаты не существует.');
    }

    const checkUser = await this.roomService.isUserInRoom(roomId, user.email);
    if (checkUser) {
      throw new BadRequestException('Пользователь уже находится в данной комнате.');
    }

    return this.roomService.addUserToRoom(dto, roomId);
  }

  // ---------------------------- { Удаление комнаты } --------------------------

  @ApiOperation({
    description: 'Удаление комнаты по id',
    summary: 'удаление комнаты',
  })
  @ApiResponse({ status: 204, description: 'Комната успешно удалена.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @ApiResponse({
    status: 400,
    description: 'Неверно переданные данные.',
  })
  @ApiBody({ type: DeleteRoomDto, description: 'Модель для создание комнаты:' })
  @ApiBearerAuth()
  @HttpCode(204)
  @Delete()
  async deleteRoomById(@Body() dto: DeleteRoomDto, @User() user: UserType) {
    return await this.roomService.deleteRoomById(dto.roomId, user.email);
  }

  // --------------------------- { Удаление пользователя из комнаты } -----------------------------

  @ApiOperation({
    description: 'Исключение пользователя из комнаты',
    summary: 'исключение пользователя',
  })
  @ApiParam({
    name: 'roomId',
    description: 'id комнаты из которой будет исключен пользователь',
    example: 3,
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Пользователь успешно исключен.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @ApiResponse({
    status: 400,
    description: 'Неверно переданные данные либо пользователя нет в данной комнате.',
  })
  @ApiBody({ type: KickUserDto, description: 'Модель для создание комнаты:' })
  @ApiBearerAuth()
  @HttpCode(200)
  @Patch('/kick/:roomId')
  async kickUserFromRoom(
    @Param('roomId') roomId: number,
    @Body() dto: KickUserDto,
    @User() user: UserType
  ) {
    if (dto.id === user.id)
      throw new BadRequestException('Невозможно исключить самого себя!');
    return this.roomService.kickUserFromRoom(roomId, dto);
  }

  // --------------------------- { Получение всех пользователей комнаты } -----------------------------
  @ApiOperation({
    description: 'Получение всех пользователей комнаты',
    summary: 'получение пользователей комнаты',
  })
  @ApiParam({
    name: 'roomId',
    description: 'id комнаты из которой будет получен список пользователей',
    example: 3,
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Список пользователей успешно получен.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @ApiResponse({
    status: 400,
    description: 'Неверно переданные данные либо комнаты не существует.',
  })
  @ApiBearerAuth()
  @HttpCode(200)
  @Get('/users/:roomId')
  async getUsersInRoom(@Param('roomId') roomId: number) {
    return this.roomService.findRoomById(roomId);
  }
}
