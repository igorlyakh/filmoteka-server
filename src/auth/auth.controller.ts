import { Body, Controller, HttpCode, Post, Response, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response as ResponseType } from 'express';
import { JwtGuard } from 'src/guards/jwt.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { UserResponse } from './dto/userResponse.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Авторизация', summary: 'вход в свой профиль' })
  @ApiResponse({ status: 200, description: 'Успешный вход.', type: UserResponse })
  @ApiResponse({ status: 401, description: 'Вход не удался.' })
  @ApiBody({ type: LoginDto, description: 'Модель для авторизации:' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto, @Response({ passthrough: true }) res: ResponseType) {
    return this.authService.login(dto, res);
  }

  @ApiOperation({ description: 'Регистрация', summary: 'регистрация профиля' })
  @ApiResponse({
    status: 201,
    description: 'Успешная регистрация.',
    type: UserResponse,
  })
  @ApiResponse({ status: 401, description: 'Регистрация не удалась.' })
  @ApiBody({ type: RegistrationDto, description: 'Модель для регистрации:' })
  @HttpCode(201)
  @Post('registration')
  async registration(
    @Body() dto: RegistrationDto,
    @Response({ passthrough: true }) res: ResponseType
  ) {
    return this.authService.registration(dto, res);
  }

  @ApiOperation({
    description: 'Выход из аккаунта',
    summary: 'выход из аккаунта',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Успешный выход из аккаунта.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Post('logout')
  async logout(@Response({ passthrough: true }) res: ResponseType) {
    res.cookie('refreshToken', '');
  }
}
