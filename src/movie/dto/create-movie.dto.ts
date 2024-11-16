import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Название фильма.',
    required: true,
    example: 'Бойцовский клуб',
  })
  @IsString({ message: 'Значение должно быть строкой!' })
  @IsNotEmpty({ message: 'Это обязательное значение!' })
  title: string;
}
