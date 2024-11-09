import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { RoomController } from './room.controller';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomGateway],
  imports: [UserModule],
})
export class RoomModule {}
