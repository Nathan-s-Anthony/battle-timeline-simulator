import { instance } from "../../lib/axios";

export async function getClock() {
  try {
    const resp = await instance.get(`/world/data/clock`);
    console.log("getting clock....", resp.status);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
