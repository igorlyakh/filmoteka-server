import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { User as UserType } from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { JwtAccessGuard } from 'src/guards/jwt-access.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@UseGuards(JwtAccessGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @HttpCode(201)
  @Post()
  async createRoom(@Body() dto: CreateRoomDto, @User() user: UserType) {
    return this.roomService.createRoom(dto, user.id);
  }
}
