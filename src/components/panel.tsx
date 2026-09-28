import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SimulationTypes } from "../types/simulation/simulation";
import { configs } from "../data/simulations/battles/ww2";
import Results from "./results";
import Modal from "./modal";

export default function Panel({
  defaultConfig,
  additionalConfigs,
  children,
}: {
  defaultConfig: SimulationTypes;
  additionalConfigs: [];
  children: React.ReactNode;
}) {
  const simulationRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(defaultConfig.mode);
  const [speed, setSpeed] = useState(
    defaultConfig.simulationDefaultConfig.simulationSpeed,
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
  const [speedSimulation, setSimulationSpeed] = useState<string | undefined>(
    "",
  );
  const [toggleModal, setToggleModal] = useState<boolean>(false);
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
  }, [toggleModal, toggleSimulation, speedSimulation]);
  const defaultSpeed = defaultConfig.simulationDefaultConfig.simulationSpeed;
  const defaultDate = defaultConfig.simulationDefaultConfig.simulationDate;
  const defaultExtras = defaultConfig.simulationDefaultConfig.simulationExtras;

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = simulationRef.current?.querySelector(".simulation-button");
    if (!btn) return;
    // if (defaultConfig) {
    //   btn.classList.toggle("active");
    // }
    if (defaultConfig && !toggleSimulation) {
      setToggleModal(true);
    } else {
      setToggleSimulation(false);
    }

    // const constructFinalSimData = {
    //   mode: mode,
    //   speed: speed,
    //   extras: extras,
    // };
    // console.log(constructFinalSimData, "final data ");
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
      extra.toggleAttribute("");
    });
    e.currentTarget.classList.add("active");
  };
  const configPanel = simulationRef.current?.querySelector(".config-panel");
  const toggleOpenConfigMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!configPanel) return;
    configPanel.classList.toggle("active");
  };

  return (
    <div
      ref={simulationRef}
      className="flex lg:flex-nowrap flex-wrap"
      id="simulation"
    >
      <div className=" bg-background flex  relative flex-col justify-between w-12/12 z-60 lg:w-4/12 px-8">
        <div className="absolute top-5 left-5 items-center rounded-md right-5 text-secondary cursor-pointer flex justify-end gap-5">
          <div className="absolute  z-50 right-0 top-8 w-50 h-50 hidden config-panel bg-secondary">
            {configs.map((config) => {
              return (
                <div
                  className="text-foreground flex justify-between p-2"
                  key={`${config.name}-list`}
                >
                  <span className="">{config.name}</span>
                  <button className="border border-primary bg-primary px-3 py-1">
                    Load
                  </button>
                </div>
              );
            })}
          </div>
          <svg
            onClick={(e) => toggleOpenConfigMenu(e)}
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
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        <div className=" flex flex-col  justify-evenly h-2/4 border-b border-primary/60 ">
          <div className="text-inherit ">
            <span className="text-secondary text-shadow-xl">
              BATTLE TIMELINE SIMULATION
            </span>
            <div className="flex flex-col  gap-2">
              <h1 className="text-6xl font-sans text-primary text-shadow-xl">
                Cassino
              </h1>
              <span className="text-primary/40 text-sm text-shadow-xl">
                Monte Cassino · Italy · 1944
              </span>
              <p className="text-primary/40 text-sm text-shadow-xl">
                Relive the battle timeline from the Cassino Battle.
              </p>
            </div>
          </div>
          <div className="flex   justify-between gap-4 ">
            <div className={`w-2/4`}>
              <button
                id="historical"
                onClick={(e) => setMode("historical")}
                className={`px-6 py-4 w-full ${mode === "historical" ? "bg-secondary text-foreground border-secondary" : "text-primary border border-primary"} cursor-pointer simulation-mode   text-shadow-xl`}
              >
                HISTORICAL
              </button>
            </div>
            <div className="w-2/4">
              <button
                disabled={toggleSimulation}
                onClick={(e) => setMode("experimental")}
                id="experimental"
                className={`${mode === "experimental" ? "bg-secondary text-foreground border-secondary" : "text-primary border border-primary"}  px-6 py-4 w-full cursor-pointer simulation-mode  text-primary text-shadow-xl`}
              >
                EXPERIMENTAL
              </button>
            </div>
          </div>
        </div>
        <div className=" flex flex-col relative justify-evenly h-4/4  ">
          <h4 className="text-secondary  uppercase text-shadow-xl">
            Simulation Settings
          </h4>
          <div
            className={`absolute bg-background/80 flex justify-center items-center bottom-30 left-0 right-0 h-8/12 simulation-running-screen duration-300 transition-all ${toggleSimulation ? "block" : "hidden"}`}
          >
            <span className="text-xs z-60 text-primary">
              Settings disabled while simulation is running
            </span>
          </div>
          <select className="simulation-date border border-secondary text-shadow-xl px-2 bg-none text-primary font-mono-alt text-lg w-full  py-4">
            <option value={`${defaultDate.start}-${defaultDate.end}`}>
              {defaultDate.start} - {defaultDate.end}
            </option>
          </select>
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
                  onClick={(e) => handleExtrasChange(e)}
                  simulation-default={extra.default}
                  simulation-extra-label={extra.label}
                  simulation-extra-value={`setting-${extra.enabled}`}
                  key={extra.label}
                  className="simulation-extras  uppercase cursor-pointer flex gap-4 border-b border-primary justify-between py-2 "
                >
                  <span>{extra.label}</span>
                  <button className="text-secondary uppercase">
                    <div className={`w-20 flex justify-between `}>
                      <span className={`${extra.enabled ? "on-extra" : ""}`}>
                        ON
                      </span>
                      <span className={`${!extra.enabled ? "off-extra" : ""}`}>
                        OFF
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
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
      <div className="w-12/12">{children}</div>
      <Modal
        setToggleModal={setToggleModal}
        setToggleSimulation={setToggleSimulation}
        toggleSimulation={toggleSimulation}
        toggleModal={toggleModal}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h4 className="text-primary">Confirm Settings:</h4>
          <div className="text-2xl">
            <span className="text-primary">Mode:{mode}</span>
            <span className="text-primary">Speed:{speedSimulation}</span>
          </div>
        </div>
      </Modal>
      <div className="absolute p-2 top-0 left-3/12 ml-4 z-10">
        <div className="flex gap-4 items-center bg-secondary p-2">
          <span className="relative flex size-3 ">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-background"></span>
          </span>
          <span>
            {toggleSimulation ? "Commading forces" : "Awaiting Command"}
          </span>
        </div>
      </div>
      <Results />
    </div>
  );
}
