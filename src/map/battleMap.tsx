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
    <div className="w-full h-200 flex ">
      <div className="w-4/12  bg-red-500 h-full">
        <div className="text-inherit">
          <span>BATTLE TIMELINE SIMULATION</span>
          <h4>Cassino</h4>
          <span>Monte Cassino · Italy · 1944</span>
        </div>
      </div>

      <div className=" w-full bg-blue-500 h-full ">
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

    // <div className="w-screen">
    //   <div className=" flex w-full justify-between ">
    //     <div className="w-full bg-[#141D20]">
    //       <div className="w-100">
    //         <span>Historical Battle Timeline</span>
    //         <h1 className={classes.classHeading}>Cassino</h1>
    //         <p className={classes.classPara}>
    //           {BATTLE_TIMELINE_SIMULATOR_VERSION}
    //         </p>
    //         <div className="w-full flex items-center justify-between">
    //           <div className="p-2 border border-secondary ">
    //             Historical Mode
    //           </div>
    //           <div className="p-2 border border-secondary ">
    //             Experimental Mode
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-full h-full">
    //       <Map
    //         initialViewState={{
    //           longitude: 13.81,
    //           latitude: 41.49,
    //           zoom: 10,
    //         }}
    //         style={{
    //           width: 900,
    //           height: 600,
    //         }}
    //         mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}
