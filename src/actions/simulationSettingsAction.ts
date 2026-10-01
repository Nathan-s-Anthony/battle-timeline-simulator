import { instance } from "../lib/axios";
import { SimulationConfigSettingConditions } from "../types/simulation/simulationConfig";

export async function sendSimuationSettings({
  mode,
  speed,
  conditions,
}: {
  mode: string;
  speed: number;
  conditions: SimulationConfigSettingConditions[];
}) {
  try {
    const resp = await instance.post("/message", {
      mode: mode,
      speed: speed,
      conditions: conditions,
    });
    if (resp.data) {
      console.log("data got");
    }
  } catch (error) {
    console.error(error);
  }
}
