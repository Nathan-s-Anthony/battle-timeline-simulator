import "./App.css";
import { BattleMap } from "battleforge";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
function App() {
  return (
    <BattleMap
      API_KEY={import.meta.env.VITE_MAPTILER_KEY}
      workerUrl={workerUrl}
      classes={{
        classHeading: "text-4xl",
        classPara: "text-sm",
        classSimlulatorMenu: {
          classConfigure: "",
        },
      }}
    />
  );
}

export default App;
