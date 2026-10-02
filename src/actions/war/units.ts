import { instance } from "../../lib/axios";

export async function getUnits() {
  try {
    const resp = await instance.get(`/world/data/units`);
    console.log("getting units for campaign....", resp.status);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
