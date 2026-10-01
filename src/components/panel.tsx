import {
  addTransitionType,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SimulationConfig,
  SimulationConfigSettingConditions,
} from "../types/simulation/simulationConfig";
import { BattleConfigs } from "../types/battle/battle";
import InfoPanel from "./panel/info";
import SettingsPanel from "./panel/settings";
import axios from "axios";
import { instance } from "../lib/axios";
import { sendSimuationSettings } from "../actions/simulationSettingsAction";

export default function Panel({
  simConfig,
  setStop,
  mode,
  speed,
  conditions,
  setMode,
  setSimSpeed,
  setConditions,
  runSimulator,
  setRunSimulator,
  battlesData,
}: {
  setStop: () => Promise<void>;
  simConfig: SimulationConfig;
  mode: string;
  speed: number;
  conditions: SimulationConfigSettingConditions[];
  setMode: Dispatch<SetStateAction<"historical" | "experimental">>;
  setSimSpeed: Dispatch<SetStateAction<number>>;
  setConditions: Dispatch<SetStateAction<SimulationConfigSettingConditions[]>>;
  runSimulator: boolean;
  setRunSimulator: Dispatch<SetStateAction<boolean>>;
  battlesData: BattleConfigs[];
}) {
  const [toggleSidePanel, setToggleSidePanel] = useState<boolean>(false);

  const simulationRef = useRef<HTMLDivElement>(null);

  const handleRunSimulator = () => {
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
        <SettingsPanel
          setStop={setStop}
          setRunSimulator={setRunSimulator}
          runSimulator={runSimulator}
          mode={mode}
          simSpeed={speed}
          setMode={setMode}
          setConditions={setConditions}
          setSimSpeed={setSimSpeed}
          conditions={conditions}
          settings={simConfig.simulationConfigSetting}
        />
      </div>
    </div>
  );
}
