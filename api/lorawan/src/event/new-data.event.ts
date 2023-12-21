import { NewReadingDataEvent } from './new-reading';

export class NewLorawanDataEvent {
  constructor(
    public readonly devEUI: string,
    public readonly data: NewReadingDataEvent,
  ) {}
}
