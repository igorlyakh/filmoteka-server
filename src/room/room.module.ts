import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { RoomController } from './room.controller';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomGateway],
  imports: [UserModule, JwtModule],
})
export class RoomModule {}
