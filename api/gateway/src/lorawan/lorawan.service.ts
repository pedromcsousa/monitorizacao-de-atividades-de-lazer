import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NewLoRaWANDataDTO } from './dto/new-data.dto';

@Injectable()
export class LorawanService {
  constructor(@Inject('LORAWAN') private readonly lorawanClient: ClientProxy) {
    console.log(lorawanClient);
  }

  newData(newData: NewLoRaWANDataDTO) {
    return this.lorawanClient.emit('new_lwn_data', newData);
  }
}
