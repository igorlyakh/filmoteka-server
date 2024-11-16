import { IsNotEmpty } from 'class-validator';

export class DeleteMovieDto {
  @IsNotEmpty()
  movieId: number;
}
