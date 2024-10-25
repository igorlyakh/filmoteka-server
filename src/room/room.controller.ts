import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
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
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@ApiTags('Комнаты')
@UseGuards(JwtAccessGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

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
}
