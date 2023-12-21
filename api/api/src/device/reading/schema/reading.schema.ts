import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Device } from 'src/device/schema/device.schema';
import { Location } from 'src/device/schema/location.schema';

export type ReadingDocument = HydratedDocument<Reading>;

export type ReadingTypes = 'lorawan';

@Schema({ timestamps: true })
export class Reading extends Location {
  _id: string;

  @Prop({
    type: Types.ObjectId,
    ref: Device.name,
  })
  device: Types.ObjectId;

  @Prop()
  battery?: number;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);
