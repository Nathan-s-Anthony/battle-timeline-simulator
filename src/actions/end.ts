import { instance } from "../lib/axios";
import { SimulationConfigSettingConditions } from "../types/simulation/simulationConfig";

export async function stopSimulation(stop: number) {
  try {
    const resp = await instance.post("/stop_engine", {
      stop,
    });
    console.log("stopping ending....", resp.status);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
