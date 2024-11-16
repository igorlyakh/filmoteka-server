import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
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
import { CreateMovieDto } from './dto/create-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';
import { MovieService } from './movie.service';

@ApiTags('Фильмы')
@UseGuards(JwtAccessGuard)
@Controller(':roomId/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // ------------------------ [ Добавление фильма в комнату ] -----------------

  @ApiOperation({
    description: 'Добавление фильма в комнату',
    summary: 'добавление фильма',
  })
  @ApiResponse({ status: 201, description: 'Фильм успешно добавлен.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @ApiResponse({
    status: 400,
    description: 'Отправлены не корректные данные для добавления фильма.',
  })
  @ApiBody({ type: CreateMovieDto, description: 'Модель для добавления фильма:' })
  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  async addMovie(
    @Body() dto: CreateMovieDto,
    @Param('roomId') roomId: number,
    @User() user: UserType
  ) {
    return await this.movieService.createMovie(dto, roomId, user);
  }

  // ---------------------- [ Получение фильмов определенной комнаты ] ----------------------------

  @Get()
  async getRoomsMovie(@Param('roomId') roomId: number, @User() user: UserType) {
    return await this.movieService.getAllMovieByRoom(roomId, user);
  }

  // ------------------------- [ Удаление фильма по id ] ---------------------------------

  @HttpCode(204)
  @Delete()
  async deleteMovie(
    @Body() dto: DeleteMovieDto,
    @Param('roomId') roomId: number,
    @User() user: UserType
  ) {
    return await this.movieService.deleteMovieById(roomId, dto.movieId, user);
  }
}
