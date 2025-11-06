export interface Postcode {
  code: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
}

export interface FleetRecord {
  postcode: string;
  make: string;
  model: string;
  segment: string;
  subsegment: string;
  fuelType: string;
  ageGroup: string;
  count: number;
}

export interface FilterState {
  postcodes: string[];
  makes: string[];
  models: string[];
  segments: string[];
  subsegments: string[];
  fuelTypes: string[];
  ageGroups: string[];
  year: number;
}

export interface AggregatedStats {
  totalVehicles: number;
  byMake: Record<string, number>;
  bySegment: Record<string, number>;
  byFuelType: Record<string, number>;
  byAgeGroup: Record<string, number>;
  byPostcode: Record<string, number>;
}

export interface YearComparison {
  year: number;
  total: number;
  change: number;
  changePercent: number;
}

