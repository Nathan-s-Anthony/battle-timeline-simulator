
export type SimulationSettingTypes={
simulationDate:SimulationDateTypes,
simulationSpeed:SimulationSpeedTypes[],
simulationExtras:SimulationExtrasTypes[],
}
export type SimulationDefaultSettingTypes={
simulation:[
simulationDate:SimulationDateTypes,
simulationSpeed:SimulationSpeedTypes[],
simulationExtras:SimulationExtrasTypes[],
]

}

 type SimulationDateTypes={
    start:string
    end:string,
}
export type SimulationSpeedTypes={
default?:number;
label:string;
value:number
}
// type SimulationSpeedTypes = Record<"1x" | "2x" | "3x" | "4x" | "5x", number>;



type SimulationExtrasTypes={
default?:number;
label:string;
labelSwitch :"ON" | "OFF",
enabled:boolean;
}

