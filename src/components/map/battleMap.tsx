import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Layer, MapRef, Source } from "react-map-gl/maplibre";
import { Point, setWorkerUrl } from "maplibre-gl";
import "../../output.css";
import { useEffect, useRef, useState } from "react";
import Panel from "../panel/panel";
import Results from "../results";
import { simulationConfig } from "../../data/simulations/config/simulationConfig";
import { locationsToGeoJSON, unitsToGeoJSON } from "../../lib/convertGEO";
import { locationLayerStyle } from "./layerStyles/locationLayerStyle";
import { CampaignTypes } from "../../types/war/warTypes";
import { getWars } from "../../actions/war/wars";
import { getUnits } from "../../actions/war/units";
import { Unit } from "../../types/units/unitTypes";
import { unitLayerStyle } from "./layerStyles/unitLayerStyle";
import { stopSimulation } from "../../actions/end";
import { initializeSimulation } from "../../actions/initialize";
import { startSimulation } from "../../actions/start";
import Clock from "./clock/clock";
import { getClock } from "../../actions/clock/clock";

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
    useState(simulationConfig);

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
  const [units, setUnits] = useState<Unit[]>();
  const [clock, setClock] = useState<any>();
  if (workerUrl) {
    setWorkerUrl(workerUrl);
  }

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
        setMap(viewState.longitude, viewState.latitude, viewState.zoom);
      }
    } catch (error) {
      console.error("Failed to stop simulation:", error);
      throw error;
    }
  };
  const cassinoLocations = [
    {
      id: "cassino",
      name: "Cassino",
      type: "town",
      coordinates: [13.83, 20],
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

  useEffect(() => {
    if (!mapReady) return;
    const units = async () => {
      try {
        const resp = await getUnits();
        if (resp) {
          setUnits(resp?.units);
          console.log(resp, "getting units");
        }
      } catch (error) {
        console.error("failed to get all units", error);
        throw error;
      }
    };
    units();
  }, [mapReady]);
  const geojson = locationsToGeoJSON(cassinoLocations);
  const unitsGeojson = unitsToGeoJSON(units || []);
  console.log(unitsGeojson, "units geojson");
  console.log(campaigns, "campaigns");

  useEffect(() => {
    if (!mapReady) return;
    const clock = async () => {
      try {
        const resp = await getClock();
        if (resp) {
          setClock(resp?.clock);
          console.log(resp, "getting clock");
        }
      } catch (error) {
        console.error("failed to get clock", error);
        throw error;
      }
    };
    clock();
  }, [mapReady]);
  return (
    <div className="relative">
      <Clock clock={clock} />
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
        <Source id="my-data" type="geojson" data={unitsGeojson}>
          <Layer {...unitLayerStyle} />
        </Source>
      </Map>
    </div>
  );
}
