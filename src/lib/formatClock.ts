import { SimulationClock } from "../types/clock/clockType";

export function formatSimulationDate(clock: SimulationClock) {
  const date = new Date(clock.year, clock.month - 1, clock.day);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
export function formatSimulationTime(clock: SimulationClock) {
  return [clock.hour, clock.minute, clock.second]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}
