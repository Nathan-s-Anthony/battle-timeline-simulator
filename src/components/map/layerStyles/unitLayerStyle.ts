export const unitLayerStyle = {
  id: "units",
  type: "circle" as const,
  paint: {
    "circle-radius": 8,
    "circle-color": [
      "match",
      ["get", "faction"],
      "allied",
      "#2563eb",
      "axis",
      "#dc2626",
      "#888888",
    ],
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
  },
};
