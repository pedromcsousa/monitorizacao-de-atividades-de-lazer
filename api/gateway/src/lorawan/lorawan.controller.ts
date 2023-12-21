import { Body, Controller, Post } from '@nestjs/common';
import { LorawanService } from './lorawan.service';
import { NewLoRaWANDataDTO } from './dto/new-data.dto';

@Controller()
export class LorawanController {
  constructor(private readonly lorawanService: LorawanService) {}

  @Post()
  newData(@Body() newLorawanData: NewLoRaWANDataDTO) {
    return this.lorawanService.newData(newLorawanData);
  }
}