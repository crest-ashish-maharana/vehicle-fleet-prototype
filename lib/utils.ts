import { FleetRecord, FilterState, AggregatedStats } from './types';

export function filterFleetData(
  data: FleetRecord[],
  filters: FilterState
): FleetRecord[] {
  return data.filter((record) => {
    if (filters.postcodes.length > 0 && !filters.postcodes.includes(record.postcode)) {
      return false;
    }
    if (filters.makes.length > 0 && !filters.makes.includes(record.make)) {
      return false;
    }
    if (filters.models.length > 0 && !filters.models.includes(record.model)) {
      return false;
    }
    if (filters.segments.length > 0 && !filters.segments.includes(record.segment)) {
      return false;
    }
    if (filters.subsegments.length > 0 && !filters.subsegments.includes(record.subsegment)) {
      return false;
    }
    if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(record.fuelType)) {
      return false;
    }
    if (filters.ageGroups.length > 0 && !filters.ageGroups.includes(record.ageGroup)) {
      return false;
    }
    return true;
  });
}

export function aggregateStats(data: FleetRecord[]): AggregatedStats {
  const stats: AggregatedStats = {
    totalVehicles: 0,
    byMake: {},
    bySegment: {},
    byFuelType: {},
    byAgeGroup: {},
    byPostcode: {},
  };

  data.forEach((record) => {
    stats.totalVehicles += record.count;
    
    stats.byMake[record.make] = (stats.byMake[record.make] || 0) + record.count;
    stats.bySegment[record.segment] = (stats.bySegment[record.segment] || 0) + record.count;
    stats.byFuelType[record.fuelType] = (stats.byFuelType[record.fuelType] || 0) + record.count;
    stats.byAgeGroup[record.ageGroup] = (stats.byAgeGroup[record.ageGroup] || 0) + record.count;
    stats.byPostcode[record.postcode] = (stats.byPostcode[record.postcode] || 0) + record.count;
  });

  return stats;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

