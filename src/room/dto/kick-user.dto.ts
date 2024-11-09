import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class KickUserDto {
  @ApiProperty({
    description: 'ID пользователя.',
    required: true,
    example: 1,
  })
  @IsNotEmpty({ message: 'Это обязательное поле!' })
  @IsNumber({}, { message: 'Значение должно быть числом!' })
  id: number;
}
