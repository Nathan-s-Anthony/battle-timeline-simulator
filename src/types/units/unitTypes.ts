import { UnitRole } from "./unitRole";
import { UnitType } from "./unitType";

export interface Unit {
  id: string;
  name: string;
  designation: string;
  type: UnitType;
  role: UnitRole;
  faction: "allied" | "axis";
  armyId?: string;
  coordinates: [number, number];
  parentId?: string;
}
