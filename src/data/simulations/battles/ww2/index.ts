import { cassinoSimulationDefaultSetting } from "./cassino/cassinoSimulation";
import { normandySimulationDefaultSetting } from "./normandy/normandySimulation";

export const configs = [
   {
     casino:cassinoSimulationDefaultSetting,
     name:"Cassino"
   },
   {
     normandy:normandySimulationDefaultSetting,
     name:"Normandy"
   }
]