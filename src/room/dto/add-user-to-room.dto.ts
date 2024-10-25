import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddUserToRoomDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
