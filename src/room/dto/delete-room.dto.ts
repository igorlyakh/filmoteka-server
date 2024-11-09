import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteRoomDto {
  @ApiProperty({
    description: 'ID комнаты.',
    required: true,
    example: 2,
  })
  @IsNotEmpty({ message: 'Это обязательное поле!' })
  @IsNumber({}, { message: 'Значение должно быть числом!' })
  roomId: number;
}
