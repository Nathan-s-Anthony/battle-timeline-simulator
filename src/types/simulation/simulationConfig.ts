export type  SimulationConfig ={
era:string,
simulationConfigSetting:SimulationConfigSettings,
}
export type SimulationConfigSettings={
buttons:ButtonsConfigSettings[],
speeds:SimulationConfigSettingSpeeds[],
conditions:SimulationConfigSettingConditions[],
mode:"historical" |"experimental";
}
type SimulationConfigSettingSpeeds={
default?:number,
label:string;
value:number;
}
type ButtonsConfigSettings={
default?:number;
mode:"historical" |"experimental",
}
export type SimulationConfigSettingConditions={
name:string;
toggleLabel :"ON" | "OFF",
toggleEnabled?:number;
enabled?:boolean;
}