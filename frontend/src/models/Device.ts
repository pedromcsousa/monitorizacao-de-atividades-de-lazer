import { ILocation } from "./Location";

export type DeviceTypes = "lorawan";

export interface IDevice {
  _id: string;
  type: DeviceTypes;
  tag: string;
  user?: string;
  lastLocation?: ILocation;
  updatedAt: Date;
  createdAt: Date;
}
