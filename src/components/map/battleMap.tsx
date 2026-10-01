import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Layer, MapRef, Source } from "react-map-gl/maplibre";
import { setWorkerUrl } from "maplibre-gl";
import { BATTLE_TIMELINE_SIMULATOR_VERSION } from "../../types/version";
import "../../output.css";
import { useEffect, useRef, useState } from "react";
import { cassinoSimulation } from "../../data/simulations/battles/ww2/cassino/cassinoSimulation";
import Panel from "../panel/panel";
import Results from "../results";
import { SimulationConfig } from "../../types/simulation/simulationConfig";
import { simulationConfig } from "../../data/simulations/config/simulationConfig";
import { normandySimulation } from "../../data/simulations/battles/ww2/normandy/normandySimulation";
import { battleConfigs } from "../../data/simulations/battles/ww2";
import { startSimulation } from "../../actions/startSimulation";
import { stopSimulation } from "../../actions/endSimulation";
import { initializeSimulation } from "../../actions/initializeSimulation";
import { locationsToGeoJSON } from "../../lib/convertGEO";
import { locationLayerStyle } from "./layerStyles/locationLayerStyle";
import { CampaignTypes, WarTypes } from "../../types/war/warTypes";
import { getCampaign } from "../../actions/war/campaign";
import { getWar, getWars } from "../../actions/war/wars";

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
  const [war, setWar] = useState([]);
  const [campaigns, setCampaigns] = useState<CampaignTypes[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<CampaignTypes[]>([]);

  if (workerUrl) {
    setWorkerUrl(workerUrl);
  }
  // const geojson = {
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       type: "Feature",
  //       geometry: { type: "Point", coordinates: [13.81, 41.49] },
  //     },
  //   ],
  // };

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  const setMap = (long: number, lat: number, zoom: number) => {
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
        setMap(
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
          setMap(
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

  useEffect(() => {
    if (!mapReady) return;
    const initWar = async () => {
      try {
        const resp = await getWars();
        if (resp) {
          setWar(resp?.wars);
          setCampaigns(resp?.wars[0]?.campaigns);
          setActiveCampaign(resp?.wars[0]?.campaigns[0]);
          console.log("wars set..");
        }
      } catch (error) {
        console.error("Failed to get war:", error);
      }
    };
    initWar();
  }, [mapReady]);

  const stopEngine = async () => {
    try {
      const resp = await stopSimulation(1);
      if (resp) {
        const initInitialView = resp?.data?.initialView;
        console.log(initInitialView, "end");
        setMap(
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
  // useEffect(() => {
  //   if (!activeCampaign) return;
  //   const getActiveCampaign = async () => {
  //     try {
  //       const resp = await getCampaign(activeCampaign.id);
  //       if (resp) {
  //         console.log(resp, "got active campaign");
  //         setActiveCampaign(resp?.data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to get war:", error);
  //     }
  //   };
  //   getActiveCampaign();
  // }, []);

  const cassinoLocations = [
    {
      id: "cassino",
      name: "Cassino",
      type: "town",
      coordinates: [13.83, 41.4917],
      description:
        "The town of Cassino, a major urban battlefield during the battles of 1944.",
    },

    {
      id: "monte-cassino-abbey",
      name: "Monte Cassino Abbey",
      type: "abbey",
      coordinates: [13.8145, 41.4903],
      elevation: 516,
      description:
        "The Benedictine monastery dominating the Cassino battlefield.",
    },

    {
      id: "castle-hill",
      name: "Castle Hill",
      type: "hill",
      coordinates: [13.8175, 41.4925],
      description:
        "High ground immediately above Cassino and an important tactical position.",
    },

    {
      id: "hill-593",
      name: "Hill 593",
      type: "hill",
      coordinates: [13.79, 41.492],
      elevation: 593,
      description:
        "A key position on the ridge west of Cassino and Monte Cassino.",
    },

    {
      id: "sant-angelo",
      name: "Sant'Angelo in Theodice",
      type: "village",
      coordinates: [13.8315, 41.4469],
      description:
        "Village south-east of Cassino near the Rapido/Gari River sector.",
    },

    {
      id: "cassino-station",
      name: "Cassino Railway Station",
      type: "railway",
      coordinates: [13.83233, 41.48439],
      description:
        "Railway station that became an important objective during the fighting.",
    },

    {
      id: "rapido-river",
      name: "Rapido / Gari River",
      type: "river",
      coordinates: [13.842, 41.46],
      description: "Major river obstacle east and south-east of Cassino.",
    },
  ];

  const geojson = locationsToGeoJSON(cassinoLocations);
  console.log(campaigns, "campaigns");
  return (
    <div className="flex relative">
      <Results data={war} />
      <Panel
        setActiveCampaign={setActiveCampaign}
        setWar={setWar}
        data={war}
        campaigns={campaigns}
        activeCampaign={activeCampaign}
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
      />

      <Map
        // onMove={(evt) => setViewState(evt.viewState)}
        ref={mapRef}
        onLoad={() => setMapReady(true)}
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
        }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...locationLayerStyle} />
        </Source>
      </Map>
    </div>
  );
}
