import { Module, forwardRef } from '@nestjs/common';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reading, ReadingSchema } from './schema/reading.schema';
import { DeviceModule } from '../device.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reading.name, schema: ReadingSchema }]),
    forwardRef(() => DeviceModule),
    SocketModule,
  ],
  controllers: [ReadingController],
  providers: [ReadingService],
})
export class ReadingModule {}
