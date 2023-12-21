import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { NewLoRaWANDataDTO } from './dto/new-data.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('new_lwn_data')
  handleNewData(data: NewLoRaWANDataDTO) {
    return this.appService.newData(data);
  }
}
