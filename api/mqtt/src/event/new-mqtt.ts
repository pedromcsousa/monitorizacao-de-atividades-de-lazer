export class NewMqttData {
  topic: string;
  payload: string;
}

export class NewMqttVegaPayload {
  'reason': 'time';
  'UTC': number;
  'supply': number;
  'temp': number;
  's_alarm1': 1 | 0;
  's_alarm2': 1 | 0;
  's_magnet': 1 | 0;
  's_outpwr': 1 | 0;
  'onewire': Array<number>;
  'modbus': {
    '0': {
      f: 3; //Modbus mode
      a: 30; //Modbus register
      d: number; //latitude
    };
    '1': {
      f: 3; //Modbus mode
      a: 31; //Modbus register
      d: number; //longitude
    };
    '2': {
      f: 3; //Modbus mode
      a: 32; //Modbus register
      d: number; //altitude
    };
  };
}
