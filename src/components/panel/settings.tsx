import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  SimulationConfig,
  SimulationConfigSettingConditions,
  SimulationConfigSettings,
} from "../../types/simulation/simulationConfig";
import { sendSimuationSettings } from "../../actions/simulationSettingsAction";
import { startSimulation } from "../../actions/startSimulation";
import { stopSimulation } from "../../actions/endSimulation";

export default function SettingsPanel({
  mode,
  setStop,
  conditions,
  settings,
  simSpeed,
  setMode,
  setSimSpeed,
  setConditions,
  runSimulator,
  setRunSimulator,
}: {
  mode: string;
  setStop: () => Promise<void>;
  setMode: Dispatch<SetStateAction<"historical" | "experimental">>;
  setSimSpeed: Dispatch<SetStateAction<number>>;
  setConditions: Dispatch<SetStateAction<SimulationConfigSettingConditions>>;
  simSpeed: number;
  settings: SimulationConfigSettings;
  conditions: SimulationConfigSettingConditions[];
  runSimulator: boolean;
  setRunSimulator: Dispatch<SetStateAction<boolean>>;
}) {
  // const [toggleSimulation, setToggleSimuation] = useState<boolean>(false);

  // // const handleSpeedChange = (speed: number) => {
  // //   setSimSpeed(speed);
  // // };
  // const [disableSettings, setDisableSettings] = useState<boolean>(false);
  // // const handleChangeConditions = (conditionName: string) => {
  // //   setConditions((currentConditions) =>
  // //     currentConditions.map((condition) =>
  // //       condition.name === conditionName
  // //         ? {
  // //             ...condition,
  // //             enabled: !condition.enabled,
  // //           }
  // //         : condition,
  // //     ),
  // //   );
  // // };
  const handleSimulationStartEnd = async () => {
    if (!runSimulator) {
      // Start simulation
      setRunSimulator(true);
      console.log("simulation engine settings set...");
      return;
    }
    // Stop simulation
    await setStop();
    setRunSimulator(false);

    console.log("simulation stopped...");
  };
  // useEffect(() => {
  //   if (toggleSimulation) {
  //     setDisableSettings(true);
  //   } else {
  //     setDisableSettings(false);
  //   }
  // }, [toggleSimulation]);

  return (
    <div className="flex flex-col justify-evenly gap-4">
      <div className="flex gap-2">
        {settings.buttons.map((button) => {
          const active = mode === button.mode;
          return (
            <div
              key={`simulation-btn-${button.mode}`}
              onClick={() => setMode(button.mode)}
              className="w-full simulation-buttons"
            >
              <button
                disabled={runSimulator}
                type="button"
                className={`uppercase border flex items-center gap-2 text-sm px-6 py-4 w-full cursor-pointer simulation-mode text-shadow-xl ${
                  active
                    ? "bg-secondary text-foreground border-secondary active"
                    : "text-primary bg-none border-primary"
                }`}
              >
                {button.mode}
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex">
        {settings.speeds.map((speed) => {
          return (
            <button
              disabled={runSimulator}
              key={`simulation-speed-${speed.label}`}
              onClick={() => setSimSpeed(speed.value)}
              className={`${simSpeed === speed.value ? "active" : ""} text-shadow-xl cursor-pointer simulation-speed text-primary w-full text-center px-4 py-2 border border-primary`}
            >
              {speed.label}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col justify-center">
        {settings.conditions.map((condition) => {
          const active = condition.toggleEnabled;
          return (
            <div
              key={condition.name}
              className="simulation-extras uppercase flex gap-4 border-b border-primary justify-between py-2"
            >
              <span className="text-primary text-xs text-shadow-2xl">
                {condition.name}
              </span>
              <button
                // onClick={() => handleChangeConditions(condition.name)}
                disabled={runSimulator}
                type="button"
                className={`text-secondary  cursor-pointer simulation-extra-toggles text-xs uppercase ${
                  active ? "active" : "inactive"
                }`}
              >
                {active ? "ON" : "OFF"}
              </button>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleSimulationStartEnd}
        className={` ${runSimulator ? "active" : ""} simulation-button transition-all mt-4 duration-300  bg-secondary cursor-pointer text-foreground px-4 py-6 w-full`}
      >
        <div className="flex gap-4 w-full justify-center">
          {runSimulator ? (
            <svg
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
                d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
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
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
          )}
          <span className="">{!runSimulator ? "Run" : "Stop"} Simulation</span>
        </div>
      </button>
    </div>
  );
}
