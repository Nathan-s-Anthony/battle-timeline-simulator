import { Unit } from "../types/units/unitTypes";

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

export function unitsToGeoJSON(units: Unit[]) {
  return {
    type: "FeatureCollection" as const,
    features: units.map((unit) => ({
      type: "Feature" as const,
      properties: {
        id: unit.id,
        name: unit.name,
        designation: unit.designation,
        type: unit.type,
        role: unit.role,
        faction: unit.faction,
        armyId: unit.armyId,
        parentId: unit.parentId,
      },
      geometry: {
        type: "Point" as const,
        coordinates: unit.coordinates,
      },
    })),
  };
}
