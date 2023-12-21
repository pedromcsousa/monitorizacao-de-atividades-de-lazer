export interface INewReadingDataEvent {
  longitude: number;
  latitude: number;
  altitude: number;
  battery?: number;
}

export class NewReadingDataEvent implements INewReadingDataEvent {
  constructor(
    public readonly devEUI: string,
    public readonly longitude: number,
    public readonly latitude: number,
    public readonly altitude: number,
    public readonly battery?: number,
  ) {}
}
