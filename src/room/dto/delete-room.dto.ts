import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteRoomDto {
  @IsNotEmpty({ message: 'Это обязательное поле!' })
  @IsNumber({}, { message: 'Значение должно быть числом!' })
  roomId: number;
}
