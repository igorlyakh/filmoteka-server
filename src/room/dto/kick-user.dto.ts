import { IsNumber } from 'class-validator';

export class KickUserDto {
  @IsNumber()
  id: number;
}
