import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoomModule } from 'src/room/room.module';
import { MovieController } from './movie.controller';
import { MovieGateway } from './movie.gateway';
import { MovieService } from './movie.service';

@Module({
  providers: [MovieGateway, MovieService],
  imports: [JwtModule, RoomModule],
  controllers: [MovieController],
})
export class MovieModule {}
