export interface SimulationClock {
  year: number;
  month: number;
  day: number;

  hour: number;
  minute: number;
  second: number;

  paused: boolean;
  speed: number;
}
