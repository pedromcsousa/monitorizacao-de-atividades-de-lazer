import { Module } from '@nestjs/common';
import { LorawanController } from './lorawan.controller';
import { LorawanService } from './lorawan.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from 'src/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LORAWAN',
        transport: Transport.TCP,
        options: {
          host: config.MS_LORAWAN_HOST,
          port: config.MS_LORAWAN_PORT
        }
      },
    ]),
  ],
  controllers: [LorawanController],
  providers: [LorawanService],
})
export class LorawanModule {}
