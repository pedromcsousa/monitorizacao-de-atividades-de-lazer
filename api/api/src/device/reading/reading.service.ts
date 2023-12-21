import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reading, ReadingTypes } from './schema/reading.schema';
import { DeviceService } from '../device.service';
import { SocketService } from 'src/socket/socket.service';
import { DeviceTypes } from '../schema/device.schema';
import IErrrorMessage from 'src/utils/error.scheam';

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(Reading.name) private readingModel: Model<Reading>,
    private readonly deviceService: DeviceService,
    private readonly socketService: SocketService,
  ) {}

  /*async getAll(): Promise<Array<Reading>> {
    return this.readingModel.find().populate('device');
  }*/

  async getFromDevice(
    deviceTag: string,
  ): Promise<Array<Reading> | IErrrorMessage> {
    let device = await this.deviceService.getByTag(deviceTag);
    if (!device)
      return {
        error: true,
        message: '',
      };
    return this.readingModel
      .find({
        device: device._id,
      })
      .populate('device')
      .sort("-createdAt")
  }

  async add(
    deviceTag: string,
    latitude: number,
    longitude: number,
    origin: DeviceTypes,
    altitude?: number,
    battery?: number,
  ): Promise<Reading | null> {
    const newReading = new this.readingModel();
    let device = await this.deviceService.getByTag(deviceTag);
    if (!device) device = await this.deviceService.add(deviceTag, origin);
    const updLastLocationRes = await this.deviceService.updLastLocation(
      device._id,
      {
        latitude,
        longitude,
        altitude,
      },
    );
    if (!updLastLocationRes) return null;
    
    await this.socketService.newReading(
      device._id,
      { latitude, longitude, altitude },
      battery,
    );

    newReading.latitude = latitude;
    newReading.longitude = longitude;
    newReading.altitude = altitude || 0;
    newReading.device = new Types.ObjectId(device!!._id);
    newReading.battery = battery;
    return newReading.save();
  }
}
