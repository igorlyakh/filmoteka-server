import { IsNotEmpty, IsNumber } from 'class-validator';

export class KickUserDto {
  @IsNotEmpty({ message: 'Это обязательное поле!' })
  @IsNumber({}, { message: 'Значение должно быть числом!' })
  id: number;
}
