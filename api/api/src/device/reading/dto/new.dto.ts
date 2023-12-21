import { Transform } from 'class-transformer';
import { IsDefined, IsIn, IsNumber, IsOptional } from 'class-validator';
import { DeviceTypes } from 'src/device/schema/device.schema';

export default class NewReadingDTO {
  @IsDefined()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  latitude: number;

  @IsDefined()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  longitude: number;

  @IsDefined()
  @IsIn(['lorawan', 'mqtt'])
  origin: DeviceTypes;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  altitude?: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  battery?: number;
}
