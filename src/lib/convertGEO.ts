export const locationsToGeoJSON = (locations: any[]) => ({
  type: "FeatureCollection",
  features: locations.map((location) => ({
    type: "Feature",
    properties: {
      id: location.id,
      name: location.name,
      type: location.type,
      elevation: location.elevation,
      description: location.description,
    },
    geometry: {
      type: "Point",
      coordinates: location.coordinates,
    },
  })),
});
