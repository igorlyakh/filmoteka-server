import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteMovieDto {
  @ApiProperty({
    description: 'id фильма.',
    required: true,
    example: 71,
  })
  @IsNumber({}, { message: 'Данное значение должно быть числом!' })
  @IsNotEmpty({ message: 'Это обязательное значение!' })
  movieId: number;
}
