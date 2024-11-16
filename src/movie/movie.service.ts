import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
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
    const isUserInRoom = await this.roomService.isUserInRoom(roomId, user.email);
    if (!isUserInRoom) {
      throw new ForbiddenException('Нет доступа!');
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

  async getAllMovieByRoom(roomId: number, user: User) {
    const isUserInRoom = await this.roomService.isUserInRoom(roomId, user.email);
    if (!isUserInRoom) {
      throw new ForbiddenException('Нет доступа!');
    }
    const movies = await this.prism.movie.findMany({
      where: {
        roomId,
      },
    });
    return movies;
  }

  async movieInRoom(roomId: number, movieId: number) {
    const movie = await this.prism.movie.findFirst({
      where: {
        id: movieId,
        roomId,
      },
    });
    if (!movie) {
      return false;
    }
    return true;
  }

  async deleteMovieById(roomId: number, movieId: number, user: User) {
    const isUserInRoom = await this.roomService.isUserInRoom(roomId, user.email);
    const isMovieInRoom = await this.movieInRoom(roomId, movieId);
    const isMovie = await this.prism.movie.findFirst({ where: { id: movieId } });
    if (!isMovie) {
      throw new BadRequestException('Фильма с таким id не существует!');
    }
    if (!isUserInRoom) {
      throw new ForbiddenException('Нет доступа!');
    }
    if (!isMovieInRoom) {
      throw new BadRequestException('Такого фильма нет в комнате!');
    }
    return await this.prism.movie.delete({ where: { id: movieId } });
  }
}
