// src/map/battleMap.tsx
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { setWorkerUrl } from "maplibre-gl";

// package.json
var package_default = {
  name: "battle-timeline-simulator",
  version: "0.1.0",
  private: true,
  type: "module",
  main: "./dist/index.js",
  files: [
    "dist"
  ],
  scripts: {
    "build:css": "tailwindcss -i ./src/globals.css -o ./dist/output.css",
    "build:js": "tsup",
    build: "npm run build:css && npm run build:js",
    dev: "tsup --watch"
  },
  exports: {
    ".": {
      import: "./dist/index.js"
    },
    "./output.css": "./dist/output.css"
  },
  peerDependencies: {
    react: "19.2.8",
    "react-dom": "19.2.8"
  },
  dependencies: {
    "@tailwindcss/cli": "^4.3.3",
    "@turf/turf": "^7.4.0",
    "maplibre-gl": "^6.11.1",
    "react-map-gl": "^8.1.3",
    tailwindcss: "^4.3.3",
    zustand: "^5.0.15"
  },
  devDependencies: {
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.1",
    tsup: "^8.5.1",
    typescript: "^7.0.2"
  }
};

// src/types/version.ts
var BATTLE_TIMELINE_SIMULATOR_VERSION = package_default.version;

// src/map/battleMap.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function BattleMap({
  API_KEY,
  workerUrl,
  classes
}) {
  if (workerUrl) {
    setWorkerUrl(workerUrl);
  }
  return /* @__PURE__ */ jsx("div", { className: "w-full h-full  bg-white absolute overflow-hidden inset-0 flex justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "h-180 w-full max-w-350", children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex", children: [
    /* @__PURE__ */ jsx("div", { className: "w-100 bg-[#141D20]", children: /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsx("span", { children: "Historical Battle Timeline" }),
      /* @__PURE__ */ jsx("h1", { className: classes.classHeading, style: { lineHeight: 1 }, children: "Cassino" }),
      /* @__PURE__ */ jsx("p", { className: classes.classPara, children: BATTLE_TIMELINE_SIMULATOR_VERSION }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: " p-2 border border-secondary ", children: "Historical Mode" }),
        /* @__PURE__ */ jsx("div", { className: "p-2border border-secondary ", children: "Experimental Mode" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full h-full ", children: /* @__PURE__ */ jsx(
      Map,
      {
        initialViewState: {
          longitude: 13.81,
          latitude: 41.49,
          zoom: 10
        },
        style: {
          width: "100%",
          height: "100%"
        },
        mapStyle: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`
      }
    ) })
  ] }) }) });
}
export {
  BattleMap
};
//# sourceMappingURL=index.js.map