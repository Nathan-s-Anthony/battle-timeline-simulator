import { BattleConfigs } from "../../../../types/battle/battle";
import { cassinoSimulation } from "./cassino/cassinoSimulation";
import { normandySimulation } from "./normandy/normandySimulation";

export const battleConfigs:BattleConfigs[] =[
  {
    name:"Cassino",
    data:cassinoSimulation,
  },
    {
    name:"Normandy",
    data:normandySimulation,
  }
]