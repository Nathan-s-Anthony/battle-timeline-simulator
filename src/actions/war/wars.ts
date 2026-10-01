import { instance } from "../../lib/axios";

export async function getWars() {
  try {
    const resp = await instance.get("/world/data/war");
    console.log("getting war....", resp.status);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
