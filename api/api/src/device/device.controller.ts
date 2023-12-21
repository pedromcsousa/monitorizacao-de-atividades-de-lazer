import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import NewDeviceDTO from './dto/new.device.dto';
import { Device } from './schema/device.schema';
import { EventPattern } from '@nestjs/microservices';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @EventPattern('get_all_devices')
  handleGetAllDevices() {
    return this.deviceService.getAll();
  }

  @Get()
  findAll(): Promise<Array<Device>> {
    return this.deviceService.getAll();
  }

  @Post()
  add(@Body() newDevice: NewDeviceDTO): Promise<Device> {
    return this.deviceService.add(
      newDevice.tag,
      newDevice.type,
      newDevice.user,
    );
  }
}
