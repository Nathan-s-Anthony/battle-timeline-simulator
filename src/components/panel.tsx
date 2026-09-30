import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SimulationTypes } from "../types/simulation/simulation";
import { configs } from "../data/simulations/battles/ww2";
import Results from "./results";
import Modal from "./modal";

export default function Panel({
  defaultConfig,
  additionalConfigs,
}: {
  defaultConfig: SimulationTypes;
  additionalConfigs: [];
}) {
  const simulationRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(defaultConfig.mode);
  const [speed, setSpeed] = useState(
    defaultConfig.simulationDefaultConfig.simulationSpeed || "",
  );
  const [extras, setExtras] = useState(
    defaultConfig.simulationDefaultConfig.simulationExtras,
  );
  const [date, setDate] = useState(
    defaultConfig.simulationDefaultConfig.simulationDate,
  );
  const [toggleSimulation, setToggleSimulation] = useState<boolean | undefined>(
    false,
  );
  const [simulationSpeed, setSimulationSpeed] = useState<string | undefined>(
    "",
  );

  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [simulationMode, setSimulationMode] = useState(defaultConfig.mode);
  const [simulationFinalSettings, setSimulationFinalSettings] = useState({
    mode: mode,
    speed: simulationSpeed,
    extras: {},
  });

  useEffect(() => {
    if (!simulationRef) return;
    const simulation = simulationRef.current?.querySelector("#simulation");
    const modesElement =
      simulationRef.current?.querySelectorAll(".simulation-mode");
    const speedsElement =
      simulationRef.current?.querySelectorAll(".simulation-speed");
    const extrasElement =
      simulationRef.current?.querySelectorAll(".simulation-extras");
    const datesElement =
      simulationRef.current?.querySelector(".simulation-date");

    if (!modesElement || !speedsElement || !datesElement || !extrasElement)
      return;

    const defaults = [...speed, ...extras, date].filter((item) => item.default);
    if (!defaults) return;

    speedsElement.forEach((speed) => {
      if (speed.attributes.getNamedItem("simulation-default")?.value)
        speed.classList.add("active");
    });
    const btn = simulationRef.current?.querySelector(".simulation-button");
    if (!btn) return;
    if (toggleSimulation) {
      btn.classList.add("active");
    } else if (!toggleSimulation) {
      btn.classList.remove("active");
    }
  }, [toggleModal, toggleSimulation, simulationSpeed]);
  const defaultSpeed = defaultConfig.simulationDefaultConfig.simulationSpeed;
  const defaultDate = defaultConfig.simulationDefaultConfig.simulationDate;
  const defaultExtras = defaultConfig.simulationDefaultConfig.simulationExtras;

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = simulationRef.current?.querySelector(".simulation-button");
    if (!btn) return;
    if (defaultConfig) {
      btn.classList.toggle("active");
    }

    // setSimulationFinalSettings({
    //   mode: mode,
    //   speed: speed,
    //   extras: extras,
    // });
    // const constructFinalSimData = {
    //   mode: mode,
    //   speed: speed,
    //   extras: extras,
    // };
    console.log(simulationFinalSettings, "final data ");
  };
  const speeds = simulationRef.current?.querySelectorAll(".simulation-speed");

  const handleSpeedChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!speeds) return;
    speeds.forEach((speed) => {
      speed.classList.remove("active");
      if (speed.attributes.getNamedItem("simulation-default")) {
        speed.attributes.removeNamedItem("simulation-default");
      } else {
        e.currentTarget.classList.add("active");
        setSimulationSpeed(
          e.currentTarget.attributes.getNamedItem("simulation-speed")?.value,
        );
      }
    });
  };

  const handleExtrasChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const extras =
      simulationRef.current?.querySelectorAll(".simulation-extras");
    extras?.forEach((extra) => {
      extra.attrib;
    });

    // e.currentTarget.classList.add("active");
  };
  const configPanel = simulationRef.current?.querySelector(".config-panel");
  const toggleOpenConfigMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!configPanel) return;
    configPanel.classList.toggle("active");
  };

  return (
    <div
      ref={simulationRef}
      className=" bg-background flex  absolute left-0 top-10    flex-col z-60 justify-between  w-12/12 h-fit lg:w-3/12 p-10"
      id="simulation"
    >
      <div className="flex h-full flex-col ">
        <div className=" flex flex-col  justify-evenly gap-4">
          <span className="text-secondary text-shadow-xl">
            BATTLE TIMELINE SIMULATION
          </span>

          <div className="flex flex-col gap-4 ">
            <h1 className="text-6xl font-sans text-primary text-shadow-xl">
              Cassino
            </h1>
            <span className="text-primary/40  text-xs text-shadow-xl">
              Monte Cassino · Italy · 1944
            </span>
          </div>

          <div className="flex justify-between gap-4  ">
            <div className={` w-2/4`}>
              <button
                id="historical"
                onClick={(e) => setMode("historical")}
                className={` flex items-center gap-2 text-sm px-6 py-4 w-full ${mode === "historical" ? "bg-secondary text-foreground border-secondary" : "text-primary border border-primary"} cursor-pointer simulation-mode   text-shadow-xl`}
              >
                <span className="relative flex size-3 ">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
                </span>
                <span>HISTORICAL</span>
              </button>
            </div>
            <div className="w-2/4 ">
              <button
                disabled={toggleSimulation}
                onClick={(e) => setMode("experimental")}
                id="experimental"
                className={` flex items-center gap-2 text-sm ${mode === "experimental" ? "bg-secondary text-foreground border-secondary" : "text-primary border border-primary"}  px-6 py-4 w-full cursor-pointer simulation-mode  text-primary text-shadow-xl`}
              >
                <span className="relative flex size-3 ">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
                </span>
                <span>EXPERIMENTAL</span>
              </button>
            </div>
          </div>
        </div>
        <div className=" border-t border-primary/60 flex flex-col relative justify-start mt-8  flex-1  gap-8 h-full ">
          <div className="flex justify-between flex-col gap-4 relative mt-4">
            <h4 className="text-secondary uppercase text-shadow-xl">
              Simulation Settings
            </h4>
            <div className="flex justify ">
              {defaultSpeed.map((speed, id) => {
                return (
                  <div
                    simulation-speed={speed.value}
                    onClick={(e) => handleSpeedChange(e)}
                    simulation-default={speed.default}
                    className="text-shadow-xl cursor-pointer simulation-speed text-primary w-full text-center px-4 py-2 border border-primary"
                    key={`${speed.label}-${speed.value}-${id}`}
                  >
                    <span>{speed.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between w-full flex-col gap-2 text-primary text-sm">
              {defaultExtras.map((extra) => {
                return (
                  <div
                    simulation-default={extra.default}
                    simulation-extra-label={extra.label}
                    simulation-extra-value={`extra-${extra.enabled}`}
                    key={extra.label}
                    simulation-label-switch={`${extra.labelSwitch}`}
                    className="simulation-extras  uppercase  flex gap-4 border-b border-primary justify-between py-2 "
                  >
                    <span>{extra.label}</span>
                    <button
                      onClick={(e) => handleExtrasChange(e)}
                      className="text-secondary  cursor-pointer  simulation-extra-toggles  uppercase"
                    >
                      <span
                        className={`flex justify-between text-xs ${extra.labelSwitch === "ON" ? "active" : "inactive"}`}
                      >
                        {extra.labelSwitch}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <button
              onClick={(e) => handleButtonClick(e)}
              className="simulation-button transition-all mt-4 duration-300  bg-secondary cursor-pointer text-foreground px-4 py-6 w-full"
            >
              <div className="flex gap-4 w-full justify-center">
                {toggleSimulation ? (
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
                <span className="">
                  {!toggleSimulation ? "Run" : "Stop"} Simulation
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* <Modal
        setToggleModal={setToggleModal}
        setToggleSimulation={setToggleSimulation}
        toggleSimulation={toggleSimulation}
        toggleModal={toggleModal}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h4 className="text-primary">Confirm Settings:</h4>
          <div className="text-2xl flex flex-col">
            <span className="text-primary">Mode:{mode}</span>
            <span className="text-primary">Speed:{simulationSpeed}</span>
            <span className="text-primary">Extras:{extras.labelSwitch}</span>
          </div>
        </div>
      </Modal> */}
      <div className="fixed  z-60 w-full  right-0 p-4 mt-4 top-0  flex items-center justify-end  ">
        <div className="flex gap-4 items-center bg-secondary w-50 p-2">
          <span className="relative flex size-3 ">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-background"></span>
          </span>
          <span className="text-sm">
            {toggleSimulation ? "Commading forces" : "Awaiting Command"}
          </span>
        </div>
      </div>
    </div>
  );
}
