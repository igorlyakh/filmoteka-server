import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Авторизация', summary: 'вход в свой профиль' })
  @ApiResponse({ status: 200, description: 'Успешный вход.', type: LoginDto })
  @ApiResponse({ status: 401, description: 'Вход не удался.' })
  @ApiBody({ type: LoginDto, description: 'Модель для авторизации:' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ description: 'Регистрация', summary: 'регистрация профиля' })
  @ApiResponse({
    status: 201,
    description: 'Успешная регистрация.',
    type: RegistrationDto,
  })
  @ApiResponse({ status: 401, description: 'Регистрация не удалась.' })
  @ApiBody({ type: RegistrationDto, description: 'Модель для регистрации:' })
  @HttpCode(201)
  @Post('registration')
  async registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }
}
