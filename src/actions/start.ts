import { instance } from "../lib/axios";
import { SimulationConfigSettingConditions } from "../types/simulation/simulationConfig";

export async function startSimulation(
  mode: "historical" | "experimental",
  speed: number,
  conditions: SimulationConfigSettingConditions[],
) {
  try {
    const resp = await instance.post("/start_engine", {
      mode,
      speed,
      conditions,
    });
    console.log("getting engine status....", resp.status);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
