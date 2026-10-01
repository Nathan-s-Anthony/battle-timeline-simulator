import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Layer, MapRef, Source } from "react-map-gl/maplibre";
import { setWorkerUrl } from "maplibre-gl";
import { BATTLE_TIMELINE_SIMULATOR_VERSION } from "../../types/version";
import "../../output.css";
import { useEffect, useRef, useState } from "react";
import { cassinoSimulation } from "../../data/simulations/battles/ww2/cassino/cassinoSimulation";
import Panel from "../panel";
import Results from "../results";
import { SimulationConfig } from "../../types/simulation/simulationConfig";
import { simulationConfig } from "../../data/simulations/config/simulationConfig";
import { normandySimulation } from "../../data/simulations/battles/ww2/normandy/normandySimulation";
import { battleConfigs } from "../../data/simulations/battles/ww2";
import { startSimulation } from "../../actions/startSimulation";
import { stopSimulation } from "../../actions/endSimulation";
import { initializeSimulation } from "../../actions/initializeSimulation";

export function BattleMap({
  API_KEY,
  workerUrl,
  classes,
}: {
  API_KEY: string;
  workerUrl?: string;
  classes: {
    classHeading: string;
    classPara: string;
    classSimlulatorMenu: {
      classConfigure: string;
    };
  };
}) {
  const [simulationDefaultConfig, setSimulationDefaultConfig] =
    useState<SimulationConfig>(simulationConfig);

  const [mode, setMode] = useState(
    simulationDefaultConfig.simulationConfigSetting.mode,
  );
  const [conditions, setConditions] = useState(
    simulationDefaultConfig.simulationConfigSetting.conditions,
  );
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [runSimulator, setRunSimulator] = useState<boolean>(false);
  const [initialMapZoom, setInitialMapZoom] = useState();
  const [stop, setStop] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState({
    longitude: 12.5,
    latitude: 42.5,
    zoom: 8,
  });
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [initializeSimulator, setinitializeSimulator] = useState(false);
  if (workerUrl) {
    setWorkerUrl(workerUrl);
  }
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [13.81, 41.49] },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  const resetMap = (long: number, lat: number, zoom: number) => {
    mapRef.current?.flyTo({
      center: [long, lat],
      zoom: zoom,
      duration: 1000,
      essential: true,
    });
  };

  useEffect(() => {
    if (!mapReady) return;
    const bootEngine = async () => {
      // 1. Initialize engine
      const initEngine = await initializeSimulation();
      console.log(initEngine, "engine initialized");
      // 2. Reset / prepare simulation
      if (initEngine?.data?.initialView) {
        const initInitialView = initEngine?.data?.initialView;
        console.log(initInitialView, "init initial view");
        resetMap(
          initInitialView.longitude,
          initInitialView.latitude,
          initInitialView.zoom,
        );
      }
    };
    bootEngine();
  }, [mapReady]);
  useEffect(() => {
    if (!runSimulator) return;

    const startEngine = async () => {
      try {
        const resp = await startSimulation(mode, simSpeed, conditions);
        if (resp) {
          const initInitialView = resp?.data?.initialView;
          console.log(initInitialView, "start initial view");
          resetMap(
            initInitialView.longitude,
            initInitialView.latitude,
            initInitialView.zoom,
          );
        }
      } catch (error) {
        console.error("Failed to start simulation:", error);
        throw error;
      }
    };

    startEngine();
  }, [runSimulator]);

  const stopEngine = async () => {
    try {
      const resp = await stopSimulation(1);
      if (resp) {
        const initInitialView = resp?.data?.initialView;
        console.log(initInitialView, "end");
        resetMap(
          initInitialView.longitude,
          initInitialView.latitude,
          initInitialView.zoom,
        );
      }
    } catch (error) {
      console.error("Failed to stop simulation:", error);
      throw error;
    }
  };

  const initialViewState = initialMapZoom && initialMapZoom.data.initialView;
  console.log(initialViewState, "initial data");
  return (
    <div className="flex relative">
      <Panel
        setStop={stopEngine}
        simConfig={simulationDefaultConfig}
        runSimulator={runSimulator}
        setRunSimulator={setRunSimulator}
        setMode={setMode}
        setConditions={setConditions}
        setSimSpeed={setSimSpeed}
        mode={mode}
        speed={simSpeed}
        conditions={conditions}
        battlesData={battleConfigs}
      />
      <Map
        // onMove={(evt) => setViewState(evt.viewState)}
        ref={mapRef}
        onLoad={() => setMapReady(true)}
        style={{
          width: "100%",
          height: "100vh",
        }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
      <Results />
    </div>
  );
}
