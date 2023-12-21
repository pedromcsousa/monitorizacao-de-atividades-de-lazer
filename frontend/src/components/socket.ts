import { io } from "socket.io-client";
import { ILocation } from "../models/Location";

export enum SocketEvents {
  reading = "new_reading",
}

export interface INewReadingSocket {
  deviceId: string;
  location: ILocation;
  battery?: number;
}

export const socket = io(import.meta.env.VITE_SOCKET);
