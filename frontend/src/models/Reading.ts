import { IDevice } from "./Device";
import { ILocation } from "./Location";

export interface IReading extends ILocation {
  _id: string;
  device: IDevice;
  battery?: number;
  createdAt: Date;
}
