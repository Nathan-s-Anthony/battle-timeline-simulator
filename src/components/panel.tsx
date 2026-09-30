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
  const [toggleSidePanel, setToggleSidePanel] = useState<boolean>(false);
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

  const handleMenu = () => {
    setToggleSidePanel(!toggleSidePanel);
  };
  return (
    <div
      ref={simulationRef}
      className={`bg-background flex absolute transition-all duration-300 left-0 top-10  h-fit w-12/12 lg:w-3/12  flex-col z-60 justify-between  ${toggleSidePanel ? "-translate-x-full" : "translate-x-0"}  p-10`}
      id="simulation"
    >
      <div
        onClick={() => handleMenu()}
        className="absolute  hover-group -right-5  top-60 h-30 bg-secondary flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 hover-group:translate-x-1 transition-all duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

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
