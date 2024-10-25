import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Название комнаты.',
    required: true,
    example: 'Комната друзей',
  })
  @IsString({ message: 'Поле должно быть строкой!' })
  @IsNotEmpty({ message: 'Поле не может быть пустым!' })
  name: string;
}
