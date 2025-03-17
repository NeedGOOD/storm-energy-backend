export interface BodyHandleData {
  userId: number;
  systemId: number;
  currentPower: number;
};

export interface BodyFluxQueryRealTime {
  typeProject: string;  // Example: solar_panel, accumulator
};

// export interface BodyFluxQuery {
//   startTime: string; // Example: 0, -15m, -1h, -1d, -1w
//   typeProject: string;  // Example: solar_panel, accumulator
//   userId: number;
//   systemId: number;
// };
