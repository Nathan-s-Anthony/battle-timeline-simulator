import { SimulationSettingTypes } from "./simulationSettings";

export type SimulationTypes={
    mode:"historical" | "experimental",
    simulationContext_AI:string,
    simulationDefaultConfig:SimulationSettingTypes,
    simulationSetting:SimulationSettingTypes,
    
}

