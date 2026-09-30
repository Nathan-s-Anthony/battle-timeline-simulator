import { useRef, useState } from "react";
import {
  SimulationConfig,
  SimulationConfigSettingConditions,
} from "../types/simulation/simulationConfig";
import { BattleConfigs } from "../types/battle/battle";
import InfoPanel from "./panel/info";
import SettingsPanel from "./panel/settings";
import Results from "./results";

export default function Panel({
  simConfig,
  battlesData,
}: {
  simConfig: SimulationConfig;
  battlesData: BattleConfigs[];
}) {
  if (!simConfig) return;
  const [conditions, setConditions] = useState<
    SimulationConfigSettingConditions[]
  >(simConfig.simulationConfigSetting.conditions);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [runSimulator, setRunSimulator] = useState<boolean>(false);
  const handleButtonToggle = (conditionName: string) => {
    setConditions((current) => ({
      ...current,
    }));
  };
  const simulationRef = useRef<HTMLDivElement>(null);

  const handleRunSimulator = () => {
    setRunSimulator(true);
    console.log("Simulator running...");
  };
  return (
    <div
      ref={simulationRef}
      className=" bg-background flex  absolute left-0 top-10    flex-col z-60 justify-between  w-12/12 h-fit lg:w-3/12 p-10"
      id="simulation"
    >
      <div className="flex flex-col justify-evenly gap-4">
        <InfoPanel
          name={battlesData[0].data.name}
          desc={battlesData[0].data.desc}
          subHeading={battlesData[0].data.subHeading}
        />
        <div className="border-b border-primary"></div>
        <SettingsPanel settings={simConfig.simulationConfigSetting} />
      </div>
    </div>
  );
}
