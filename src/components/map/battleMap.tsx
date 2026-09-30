import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Layer, Source } from "react-map-gl/maplibre";
import { setWorkerUrl } from "maplibre-gl";
import { BATTLE_TIMELINE_SIMULATOR_VERSION } from "../../types/version";
import "../../output.css";
import { useEffect, useRef, useState } from "react";
import { cassinoSimulationDefaultSetting } from "../../data/simulations/battles/ww2/cassino/cassinoSimulation";
import { SimulationTypes } from "../../types/simulation/simulation";
import Panel from "../panel";
import Results from "../results";

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
  const [simulationSettingsDefault, setSimulationSettingsDefault] = useState<
    SimulationTypes[]
  >(cassinoSimulationDefaultSetting);
  const [defaultSettings, setDefaultSettings] = useState({});
  if (workerUrl) {
    setWorkerUrl(workerUrl);
  }
  useEffect(() => {
    setDefaultSettings({
      simulation: {
        ...simulationSettingsDefault,
      },
    });
    if (!defaultSettings) return;
    console.log(defaultSettings);
  }, [simulationSettingsDefault]);

  console.log(simulationSettingsDefault, "settings coming thru");

  //
  const defaultMode = simulationSettingsDefault[0].mode;
  const defaultDates =
    simulationSettingsDefault[0].simulationDefaultConfig.simulationDate;
  const defaultSpeeds =
    simulationSettingsDefault[0].simulationDefaultConfig.simulationSpeed;
  const defaultExtras =
    simulationSettingsDefault[0].simulationDefaultConfig.simulationExtras;

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

  return (
    <div className="flex relative">
      <Panel
        defaultConfig={simulationSettingsDefault[0]}
        additionalConfigs={[]}
      />
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
