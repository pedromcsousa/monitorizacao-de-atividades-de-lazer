import {
  IsBase64,
  IsDateString,
  IsDefined,
  IsHexadecimal,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export interface INewReadingDataEvent {
  longitude: number;
  latitude: number;
  altitude: number;
  battery?: number;
}

//Baseado em https://www.thethingsindustries.com/docs/the-things-stack/concepts/data-formats/

class EndDeviceIdsDTO {
  @IsString()
  device_id: string; // Device ID

  application_ids: {
    application_id: string; // Application ID
  };

  @IsHexadecimal()
  dev_eui: string; // DevEUI of the end device

  @IsHexadecimal()
  join_eui: string; // JoinEUI of the end device (also known as AppEUI in LoRaWAN versions below 1.1)

  @IsHexadecimal()
  dev_addr: string; // Device address known by the Network Server
}

class UplinkMessageDTO {
  @IsString()
  session_key_id: string; // Join Server issued identifier for the session keys used by this uplink

  @IsNumber()
  f_cnt: number; // Frame counter

  @IsNumber()
  f_port: number; // Frame port
  
  @IsBase64()
  frm_payload: string; // Frame payload (Base64)

  @ValidateNested()
  decoded_payload: INewReadingDataEvent; // Decoded payload object, decoded by the device payload formatter
  rx_metadata: [
    {
      // A list of metadata for each antenna of each gateway that received this message
      gateway_ids: {
        gateway_id: string; // Gateway ID
        eui: string; // Gateway EUI
      };
      time: Date; // ISO 8601 UTC timestamp at which the uplink has been received by the gateway
      timestamp: number; // Timestamp of the gateway concentrator when the message has been received
      rssi: number; // Received signal strength indicator (dBm)
      channel_rssi: number; // Received signal strength indicator of the channel (dBm)
      snr: number; // Signal-to-noise ratio (dB)
      uplink_token: string; // Uplink token injected by gateway, Gateway Server or fNS
      channel_index: number; // Index of the gateway channel that received the message
      location: {
        // Gateway location metadata (only for gateways with location set to public)
        latitude: number; // Location latitude
        longitude: number; // Location longitude
        altitude: number; // Location altitude
        source: string; // Location source. SOURCE_REGISTRY is the location from the Identity Server.
      };
    },
  ];

  settings: {
    // Settings for the transmission
    data_rate: {
      // Data rate settings
      lora: {
        // LoRa modulation settings
        bandwidth: number; // Bandwidth (Hz)
        spreading_factor: number; // Spreading factor
      };
    };
    coding_rate: number; // LoRa coding rate
    frequency: number; // Frequency (Hz)
  };

  @IsDateString()
  received_at: Date; // ISO 8601 UTC timestamp at which the uplink has been received by the Network Server

  consumed_airtime: string; // Time-on-air, calculated by the Network Server using payload size and transmission settings

  locations: {
    // End device location metadata
    user: {
      latitude: number; // Location latitude
      longitude: number; // Location longitude
      altitude: number; // Location altitude
      source: string; // Location source. SOURCE_REGISTRY is the location from the Identity Server.
    };
  };

  version_ids: {
    // End device version information
    brand_id: string; // Device brand
    model_id: string; // Device model
    hardware_version: string; // Device hardware version
    firmware_version: string; // Device firmware version
    band_id: string; // Supported band ID
  };

  network_ids: {
    // Network information
    net_id: string; // Network ID
    tenant_id: string; // Tenant ID
    cluster_id: string; // Cluster ID
  };
}

export class NewLoRaWANDataDTO {
  @ValidateNested()
  end_device_ids: EndDeviceIdsDTO;

  correlation_ids: Array<string>; // Correlation identifiers of the message

  @IsDateString()
  received_at: Date; // ISO 8601 UTC timestamp at which the message has been received by the Application Server

  uplink_message: UplinkMessageDTO;

  simulated: boolean; // Signals if the message is coming from the Network Server or is simulated.
}
