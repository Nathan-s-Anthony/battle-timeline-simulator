import Map from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
import { setWorkerUrl } from "maplibre-gl";
import { BATTLE_TIMELINE_SIMULATOR_VERSION } from "../types/version";
import "../output.css";
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
  if (workerUrl) {
    setWorkerUrl(workerUrl);
  }
  return (
    <div className="w-full h-full  bg-white absolute overflow-hidden inset-0 flex justify-center items-center">
      <div className="h-180 w-full max-w-350">
        <div className="w-full h-full flex">
          <div className="w-100 bg-[#141D20]">
            <div className="">
              <span>Historical Battle Timeline</span>
              <h1 className={classes.classHeading} style={{ lineHeight: 1 }}>
                Cassino
              </h1>
              <p className={classes.classPara}>
                {BATTLE_TIMELINE_SIMULATOR_VERSION}
              </p>
              <div className="w-full flex items-center justify-between">
                <div className=" p-2 border border-secondary ">
                  Historical Mode
                </div>
                <div className="p-2border border-secondary ">
                  Experimental Mode
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full ">
            <Map
              initialViewState={{
                longitude: 13.81,
                latitude: 41.49,
                zoom: 10,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
              mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
