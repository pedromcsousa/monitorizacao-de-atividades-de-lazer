import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Location } from './location.schema';

export type DeviceDocument = HydratedDocument<Device>;

export type DeviceTypes = 'lorawan' | 'mqtt';

@Schema({ timestamps: true })
export class Device {
  _id: string;

  @Prop({ default: 'lorawan' })
  type: DeviceTypes;

  /**
   * Eg.: DevEUI
   */
  @Prop({ required: true })
  tag: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  user?: Types.ObjectId;

  @Prop({ type: Location })
  lastLocation?: Location;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
