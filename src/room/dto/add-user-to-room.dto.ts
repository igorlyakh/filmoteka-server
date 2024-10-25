import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddUserToRoomDto {
  @IsString({ message: 'Поле должно быть строкой!' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым!' })
  @IsEmail({}, { message: 'Введите корректный email!' })
  email: string;
}
