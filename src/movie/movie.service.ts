import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import axiosInstance from 'src/api';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomService } from 'src/room/room.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieGateway } from './movie.gateway';

@Injectable()
export class MovieService {
  constructor(
    private readonly prism: PrismaService,
    private readonly roomService: RoomService,
    private readonly movieGateWay: MovieGateway,
    private readonly configService: ConfigService
  ) {}

  async notifyUsers(roomId: number) {
    const { users } = await this.roomService.findRoomById(roomId);
    const resultArr = [];
    users.forEach(user => resultArr.push(user.id.toString()));
    return resultArr;
  }

  async createMovie(dto: CreateMovieDto, roomId: number, user: User) {
    const isUserInRoom = await this.roomService.isUserInRoom(roomId, user.email);
    const filmInList = await this.isMovieInList(roomId, dto.title);
    const users = await this.notifyUsers(roomId);
    if (!isUserInRoom) {
      throw new ForbiddenException('Нет доступа!');
    }
    if (filmInList) {
      throw new BadRequestException('Фильм уже находится в списке!');
    }
    const { poster } = await this.getImageByTitle(dto.title);
    const movieList = await this.prism.movie.create({
      data: {
        title: dto.title,
        userId: user.id,
        roomId,
        poster,
      },
    });
    this.movieGateWay.onAddMovie(users, movieList);
    return movieList;
  }

  async isMovieInList(roomId: number, title: string) {
    const movieList = await this.prism.movie.findMany({ where: { roomId } });

    return movieList.some(item => item.title.toLowerCase() === title.toLowerCase());
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
    const users = await this.notifyUsers(roomId);
    if (!isMovie) {
      throw new BadRequestException('Фильма с таким id не существует!');
    }
    if (!isUserInRoom) {
      throw new ForbiddenException('Нет доступа!');
    }
    if (!isMovieInRoom) {
      throw new BadRequestException('Такого фильма нет в комнате!');
    }
    this.movieGateWay.onDeleteMovie(users, movieId);
    return await this.prism.movie.delete({ where: { id: movieId } });
  }

  private async getImageByTitle(title: string) {
    try {
      const res = await axiosInstance.get('/search/movie', {
        params: {
          query: title,
        },
      });
      return {
        poster: `${this.configService.getOrThrow('TMDB_IMAGE_URL')}${res.data.results[0].poster_path}`,
      };
    } catch (error) {
      return {
        poster: 'https://www.themoviedb.org/t/p/original/7rhzEufov6yV81d7Zwv8ZsFZl8J.jpg',
      };
    }
  }
}
