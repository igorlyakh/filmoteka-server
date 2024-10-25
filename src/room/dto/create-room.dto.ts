import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString({ message: 'Поле должно быть строкой!' })
  @IsNotEmpty({ message: 'Поле не может быть пустым!' })
  name: string;
}
