import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MovieGateway } from './movie.gateway';
import { MovieService } from './movie.service';

@Module({
  providers: [MovieGateway, MovieService],
  imports: [JwtModule],
})
export class MovieModule {}
