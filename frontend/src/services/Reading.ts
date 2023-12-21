import axios from "axios";
import { IReading } from "../models/Reading";

export async function getHistoryFromDevice(
  tag: string
): Promise<Array<IReading>> {
  const res = await axios.get(
    import.meta.env.VITE_API_GATEWAY + "device/" + tag + "/reading"
  );
  return res.data;
}
