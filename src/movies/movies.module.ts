import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesGateway } from './movies.gateway';

@Module({
  providers: [MoviesGateway, MoviesService],
})
export class MoviesModule {}
