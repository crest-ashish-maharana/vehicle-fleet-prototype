'use client';

import { AggregatedStats } from '@/lib/types';
import { calculatePercentageChange, formatNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface YearComparisonProps {
  currentYear: number;
  previousYear: number;
  currentStats: AggregatedStats;
  previousStats: AggregatedStats;
}

export default function YearComparison({
  currentYear,
  previousYear,
  currentStats,
  previousStats,
}: YearComparisonProps) {
  const totalChange = calculatePercentageChange(
    currentStats.totalVehicles,
    previousStats.totalVehicles
  );

  const compareCategory = (
    current: Record<string, number>,
    previous: Record<string, number>,
    categoryName: string
  ) => {
    const allKeys = new Set([...Object.keys(current), ...Object.keys(previous)]);
    const comparisons = Array.from(allKeys).map((key) => {
      const currentValue = current[key] || 0;
      const previousValue = previous[key] || 0;
      const change = calculatePercentageChange(currentValue, previousValue);
      return { name: key, current: currentValue, previous: previousValue, change };
    });

    return comparisons
      .sort((a, b) => b.current - a.current)
      .slice(0, 5)
      .map((item) => (
        <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors duration-200">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {previousYear}: {formatNumber(item.previous)}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {currentYear}: {formatNumber(item.current)}
              </span>
            </div>
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            item.change > 0 ? 'text-green-600 dark:text-green-400' : item.change < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {item.change > 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : item.change < 0 ? (
              <TrendingDown className="w-4 h-4" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
            {Math.abs(item.change).toFixed(1)}%
          </div>
        </div>
      ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 h-full flex flex-col card-hover transition-colors duration-200">
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
          <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 to-blue-500 rounded-full shadow-lg"></span>
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Year-over-Year Comparison
          </span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Vehicles</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(currentStats.totalVehicles)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">({currentYear})</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {formatNumber(previousStats.totalVehicles)} ({previousYear})
            </p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            totalChange >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
          }`}>
            {totalChange >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
            <span className={`text-lg font-bold ${
              totalChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Top Makes</h3>
            <div className="space-y-1">
              {compareCategory(currentStats.byMake, previousStats.byMake, 'Make')}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Top Segments</h3>
            <div className="space-y-1">
              {compareCategory(currentStats.bySegment, previousStats.bySegment, 'Segment')}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Fuel Types</h3>
            <div className="space-y-1">
              {compareCategory(currentStats.byFuelType, previousStats.byFuelType, 'Fuel Type')}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Age Groups</h3>
            <div className="space-y-1">
              {compareCategory(currentStats.byAgeGroup, previousStats.byAgeGroup, 'Age Group')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

