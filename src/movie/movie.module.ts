import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieGateway } from './movie.gateway';

@Module({
  providers: [MovieGateway, MovieService],
})
export class MovieModule {}
