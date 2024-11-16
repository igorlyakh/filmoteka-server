import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomService } from 'src/room/room.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly prism: PrismaService,
    private readonly roomService: RoomService
  ) {}

  async createMovie(dto: CreateMovieDto, roomId: number, user: User) {
    const isUserInRoom = this.roomService.isUserInRoom(roomId, user.email);
    if (!isUserInRoom) {
      throw new BadRequestException('Нет доступа!');
    }
    const movieList = await this.prism.movie.create({
      data: {
        title: dto.title,
        userId: user.id,
        roomId,
      },
    });
    return movieList;
  }

  findAll() {
    return `This action returns all movie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
