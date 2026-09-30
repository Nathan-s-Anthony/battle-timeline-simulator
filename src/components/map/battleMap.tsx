import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Layer, Source } from "react-map-gl/maplibre";
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
  const [initializeSimulator, setInitializeSimulator] =
    useState<boolean>(false);
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

  const startSimulator = () => {
    console.log("starting simulator....");
    setSimulationDefaultConfig(simulationConfig);
    if (!simulationDefaultConfig) return;
    console.log(simulationDefaultConfig, "New data....");
  };
  useEffect(() => {
    if (!simulationConfig) return;
    setInitializeSimulator(true);
    if (!initializeSimulator) return;
    startSimulator();
  }, [
    initializeSimulator,
    simulationConfig,
    cassinoSimulation,
    normandySimulation,
  ]);

  return (
    <div className="flex relative">
      <Panel simConfig={simulationDefaultConfig} battlesData={battleConfigs} />
      <Map
        initialViewState={{
          longitude: 13.81,
          latitude: 41.49,
          zoom: 10,
        }}
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
