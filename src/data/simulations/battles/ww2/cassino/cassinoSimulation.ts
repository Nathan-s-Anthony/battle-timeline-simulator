import { SimulationTypes } from "../../../../../types/simulation/simulation";

const date = new Date();
export const cassinoSimulationDefaultSetting: SimulationTypes[] = [
    {
        mode: "historical",
        simulationContext_AI:
            "The battle of Cassino that took place between 1943 and 1944",
            simulationSetting:{
              simulationSpeed:[],
            simulationDate:{
               start:"13 January 1943",
                end:"14 Feb 1944",
                
            },
            simulationExtras:[]
            },
            simulationDefaultConfig:{
                 
              simulationSpeed:[
               {
                     default:1,
                     label:"1x",
                    value:1,
               },
                 {
                     label:"2x",
                    value:2,
               },
                 {
                     label:"3x",
                    value:3,
               },
                 {
                     label:"4x",
                    value:4,
               },
                 {
                     label:"5x",
                    value:5,
               },
               
              ],
            simulationDate:{
               start:"13 January 1943",
                end:"14 Feb 1944",
                
            },
              simulationExtras:[
              {
                default:1,
            label:" fog",
   
                enabled:true,
        },
        {
            label:" morale",

                enabled:true,
        },
        {
                     label:"supply",

                enabled:false,
        },
        {
                    label:" weather",
  
                enabled:true,
        },
        {
                    label:" terrain",

                enabled:false,
        }
              ]
            }
    }
];

