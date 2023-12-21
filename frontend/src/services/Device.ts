import axios from "axios";
import { IDevice } from "../models/Device";

export async function getAllDevices(): Promise<Array<IDevice>> {
  const res = await axios.get(import.meta.env.VITE_API_GATEWAY + "device");
  return res.data;
}
