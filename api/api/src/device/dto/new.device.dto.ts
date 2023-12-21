import { IsDefined, IsIn, IsMongoId, IsOptional } from 'class-validator';
import { DeviceTypes } from '../schema/device.schema';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export default class NewDeviceDTO {
  @IsDefined()
  tag: string;

  @IsDefined()
  @IsIn(['lorawan'])
  type: DeviceTypes;

  @IsOptional()
  @IsMongoId()
  user?: string;
}
