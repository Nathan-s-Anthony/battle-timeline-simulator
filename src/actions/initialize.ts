import { instance } from "../lib/axios";

export async function initializeSimulation() {
  try {
    const resp = await instance.post("/init_engine");
    console.log("getting engine status....", resp.status);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
