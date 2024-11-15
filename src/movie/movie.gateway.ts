import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';

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

  @SubscribeMessage('removeMovie')
  remove(@MessageBody() id: number) {
    return this.movieService.remove(id);
  }
}
