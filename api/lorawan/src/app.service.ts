import { Injectable } from '@nestjs/common';
import { INewReadingDataEvent } from './event/new-reading';
import { HttpService } from '@nestjs/axios';
import { NewLoRaWANDataDTO } from './dto/new-data.dto';
import axios from 'axios';
import { stringify } from 'qs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async newData(data: NewLoRaWANDataDTO) {
    const newData: INewReadingDataEvent = data.uplink_message.decoded_payload;
    const result = await this.httpService.axiosRef.post(
      process.env.API + `/device/${data.end_device_ids.dev_eui}/reading`,
      stringify({
        ...newData,
        origin: "lorawan"
      }),
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
    return result;
  }
}
