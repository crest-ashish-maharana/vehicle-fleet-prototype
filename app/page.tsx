'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), {
  ssr: false,
});

const Charts = dynamic(() => import('@/components/Charts'), {
  ssr: false,
});

import Filters from '@/components/Filters';
import MapViewWrapper from '@/components/MapViewWrapper';
import StatsCards from '@/components/StatsCards';
import YearComparison from '@/components/YearComparison';
import { FilterState, FleetRecord, Postcode, AggregatedStats } from '@/lib/types';
import { filterFleetData, aggregateStats } from '@/lib/utils';
import postcodesData from '@/data/postcodes.json';
import makesData from '@/data/makes.json';
import modelsData from '@/data/models.json';
import segmentsData from '@/data/segments.json';
import fuelTypesData from '@/data/fuelTypes.json';
import ageGroupsData from '@/data/ageGroups.json';
import fleetData2019 from '@/data/fleetData2019.json';
import fleetData2020 from '@/data/fleetData2020.json';
import fleetData2021 from '@/data/fleetData2021.json';
import fleetData2022 from '@/data/fleetData2022.json';
import fleetData2023 from '@/data/fleetData2023.json';
import fleetData2024 from '@/data/fleetData2024.json';

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterState>({
    postcodes: [],
    makes: [],
    models: [],
    segments: [],
    subsegments: [],
    fuelTypes: [],
    ageGroups: [],
    year: 2024,
  });

  const [selectedPostcodes, setSelectedPostcodes] = useState<string[]>([]);

  // Get data for all years
  const yearDataMap: Record<number, FleetRecord[]> = {
    2019: fleetData2019 as FleetRecord[],
    2020: fleetData2020 as FleetRecord[],
    2021: fleetData2021 as FleetRecord[],
    2022: fleetData2022 as FleetRecord[],
    2023: fleetData2023 as FleetRecord[],
    2024: fleetData2024 as FleetRecord[],
  };

  // Get current and previous year data
  const currentYearData = yearDataMap[filters.year] || fleetData2024;
  const previousYear = filters.year > 2019 ? filters.year - 1 : 2019;
  const previousYearData = yearDataMap[previousYear] || fleetData2023;

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return filterFleetData(currentYearData as FleetRecord[], filters);
  }, [currentYearData, filters]);

  const previousFilteredData = useMemo(() => {
    return filterFleetData(previousYearData as FleetRecord[], filters);
  }, [previousYearData, filters]);

  // Aggregate statistics
  const currentStats = useMemo(() => {
    return aggregateStats(filteredData);
  }, [filteredData]);

  const previousStats = useMemo(() => {
    return aggregateStats(previousFilteredData);
  }, [previousFilteredData]);

  // Get available options for filters
  const availableOptions = useMemo(() => {
    const allModels = Object.values(modelsData).flat();
    const allSubsegments = segmentsData.flatMap((s) => s.subsegments);

    return {
      postcodes: postcodesData as Postcode[],
      makes: makesData as string[],
      models: allModels as string[],
      segments: segmentsData.map((s) => s.name),
      subsegments: allSubsegments,
      fuelTypes: fuelTypesData as string[],
      ageGroups: ageGroupsData as string[],
    };
  }, []);

  // Postcode data for map
  const postcodeData = useMemo(() => {
    const data: Record<string, number> = {};
    filteredData.forEach((record: FleetRecord) => {
      data[record.postcode] = (data[record.postcode] || 0) + record.count;
    });
    return data;
  }, [filteredData]);

  const handlePostcodeClick = (postcode: string) => {
    setSelectedPostcodes((prev) => {
      if (prev.includes(postcode)) {
        return prev.filter((p) => p !== postcode);
      }
      return [...prev, postcode];
    });
  };

  // Update filters when postcode is selected
  useEffect(() => {
    if (selectedPostcodes.length > 0) {
      setFilters((prev: FilterState) => ({
        ...prev,
        postcodes: selectedPostcodes,
      }));
    }
  }, [selectedPostcodes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="glass-effect dark:bg-gray-800/95 dark:border-gray-700 shadow-lg border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-md transition-colors duration-200">
        <div className="w-full px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Australian Vehicle Fleet Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
                Geospatial analysis of vehicle fleet data across Australia
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pb-6 rounded-xl">
              <Filters
                filters={filters}
                onFiltersChange={setFilters}
                availableOptions={availableOptions}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            {/* Stats Cards */}
            <StatsCards
              currentStats={currentStats}
              previousStats={previousStats}
              year={filters.year}
              previousYear={previousYear}
            />

            {/* Map and Year Comparison Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Map - Takes 2 columns */}
              <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 h-[600px] flex flex-col card-hover transition-colors duration-200">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3 flex-shrink-0">
                  <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 to-blue-500 rounded-full shadow-lg"></span>
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Australian Postcode Map
                  </span>
                </h2>
                <div className="flex-1 min-h-0 relative">
                  <MapViewWrapper
                    postcodes={postcodesData as Postcode[]}
                    postcodeData={postcodeData}
                    selectedPostcodes={filters.postcodes}
                    onPostcodeClick={handlePostcodeClick}
                  />
                </div>
              </div>

              {/* Year Comparison - Takes 1 column */}
              <div className="xl:col-span-1 h-[600px]">
                <YearComparison
                  currentYear={filters.year}
                  previousYear={previousYear}
                  currentStats={currentStats}
                  previousStats={previousStats}
                />
              </div>
            </div>

            {/* Charts */}
            <Charts stats={currentStats} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-6 transition-colors duration-200">
        <div className="w-full px-6 py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            © 2024 Australian Vehicle Fleet Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

