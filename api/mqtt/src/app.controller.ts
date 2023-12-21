import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import * as mqtt from 'mqtt';
import { NewMqttVegaPayload } from './event/new-mqtt';

@Controller()
export class AppController {
  private client;

  constructor(private readonly appService: AppService) {
    const host = process.env.MQTT_HOST;
    const port = process.env.MQTT_PORT;
    const clientId = `mqtt_microservice_${Math.random().toString(16).slice(3)}`;

    const connectUrl = `mqtt://${host}:${port}`;
    const topic = '#';

    this.client = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
      //username: '',
      //password: '',
    });

    this.client.on('connect', () => {
      console.log('Connected');
      this.client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
      });
    });

    this.client.on('error', console.log);

    this.client.on('message', async (topic, payload) => {
      switch (topic) {
        case '/vega':
          const data = JSON.parse(payload.toString());
          if (data.Message && data.Message.dev && data.Telemetry) {
            const telemetry = data.Telemetry as NewMqttVegaPayload;
            await this.appService.newDataVega(data.Message.dev, telemetry);
          }
          break;
        default:
          break;
      }
    });
  }
}
