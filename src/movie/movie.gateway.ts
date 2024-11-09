import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@WebSocketGateway()
export class MovieGateway {
  constructor(private readonly movieService: MovieService) {}

  @SubscribeMessage('createMovie')
  create(@MessageBody() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @SubscribeMessage('findAllMovie')
  findAll() {
    return this.movieService.findAll();
  }

  @SubscribeMessage('findOneMovie')
  findOne(@MessageBody() id: number) {
    return this.movieService.findOne(id);
  }

  @SubscribeMessage('updateMovie')
  update(@MessageBody() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(updateMovieDto.id, updateMovieDto);
  }

  @SubscribeMessage('removeMovie')
  remove(@MessageBody() id: number) {
    return this.movieService.remove(id);
  }
}
