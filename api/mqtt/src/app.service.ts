import { Injectable } from '@nestjs/common';
import { INewReadingDataEvent } from './event/new-reading';
import { HttpService } from '@nestjs/axios';
import { stringify } from 'qs';
import { NewMqttVegaPayload } from './event/new-mqtt';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async newDataVega(devId: string, data: NewMqttVegaPayload) {
    const newData: INewReadingDataEvent = {
      latitude: data.modbus[0].d,
      longitude: data.modbus[1].d,
      altitude: data.modbus[2].d,
    };
    try {
      const result = await this.httpService.axiosRef.post(
        process.env.API + `/device/${devId}/reading`,
        stringify({
          ...newData,
          origin: 'mqtt',
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
    } catch (e) {
      console.log(e);
    }
  }
}
