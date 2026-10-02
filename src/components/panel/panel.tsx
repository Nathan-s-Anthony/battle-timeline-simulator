import {
  addTransitionType,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import InfoPanel from "./info";
import SettingsPanel from "./settings";
import { CampaignTypes } from "../../types/war/warTypes";
import { BATTLE_TIMELINE_SIMULATOR_VERSION } from "../../types/version";

export default function Panel({
  simConfig,
  setStop,
  setWar,
  mode,
  speed,
  conditions,
  setMode,
  setSimSpeed,
  setConditions,
  runSimulator,
  setRunSimulator,
  data,
  setActiveCampaign,
  campaigns,
  activeCampaign,
}: {
  setWar: Dispatch<SetStateAction<[]>>;
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
  data: any;
  setActiveCampaign: Dispatch<SetStateAction<CampaignTypes | null>>;
  campaigns: CampaignTypes[];
  activeCampaign: CampaignTypes | null;
}) {
  const [toggleSidePanel, setToggleSidePanel] = useState<boolean>(false);
  const simulationRef = useRef<HTMLDivElement>(null);
  const [toggleCampaignMenu, setToggleCampaignMenu] = useState<boolean>(false);
  const handleMenu = () => {
    setToggleSidePanel(!toggleSidePanel);
  };
  const handleSelectCampaign = (campaign: CampaignTypes | null) => {
    setToggleCampaignMenu(false);
    setActiveCampaign(campaign);
  };
  return (
    <div
      ref={simulationRef}
      className={`bg-background flex absolute transition-all duration-300 left-0 top-30   w-6/12 lg:w-3/12  flex-col z-60 justify-between  ${toggleSidePanel ? "-translate-x-full" : "translate-x-0"}  p-10`}
      id="simulation"
    >
      <span className="absolute text-primary/60 left-10 top-2 text-xs ">
        {BATTLE_TIMELINE_SIMULATOR_VERSION}
      </span>

      <div className="absolute  text-primary right-5 top-5">
        <svg
          onClick={() => setToggleCampaignMenu(!toggleCampaignMenu)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
      <div
        className={`text-primary campaign-menu ${toggleCampaignMenu ? "translate-y-5" : "translate-y-0 opacity-0"} bg-[#030213] p-4 absolute w-50 right-6  z-60 top-12  `}
      >
        <div className="flex flex-col gap-2">
          {activeCampaign &&
            campaigns
              ?.filter((campaign) => campaign.id !== activeCampaign.id)
              .map((campaign) => (
                <button
                  key={campaign.id}
                  className="bg-primary px-2 py-1 rounded-md text-foreground cursor-pointer"
                  onClick={() => handleSelectCampaign(campaign)}
                >
                  {campaign.name}
                </button>
              ))}
        </div>
      </div>
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
        {activeCampaign && (
          <InfoPanel
            name={activeCampaign.name}
            desc={activeCampaign.description}
            subHeading={activeCampaign.name}
          />
        )}
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
