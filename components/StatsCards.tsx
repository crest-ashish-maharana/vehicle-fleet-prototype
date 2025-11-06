'use client';

import { AggregatedStats } from '@/lib/types';
import { formatNumber, calculatePercentageChange } from '@/lib/utils';
import { TrendingUp, TrendingDown, Car, Fuel, Calendar, MapPin } from 'lucide-react';

interface StatsCardsProps {
  currentStats: AggregatedStats;
  previousStats?: AggregatedStats;
  year: number;
  previousYear?: number;
}

export default function StatsCards({
  currentStats,
  previousStats,
  year,
  previousYear,
}: StatsCardsProps) {
  const topMake = Object.entries(currentStats.byMake)
    .sort(([, a], [, b]) => b - a)[0] || ['N/A', 0];
  
  const topSegment = Object.entries(currentStats.bySegment)
    .sort(([, a], [, b]) => b - a)[0] || ['N/A', 0];

  const topFuelType = Object.entries(currentStats.byFuelType)
    .sort(([, a], [, b]) => b - a)[0] || ['N/A', 0];

  const totalChange = previousStats
    ? calculatePercentageChange(currentStats.totalVehicles, previousStats.totalVehicles)
    : 0;

  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    change,
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: any;
    change?: number;
  }) => {
    const isPositive = change !== undefined ? change >= 0 : true;
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 card-hover relative overflow-hidden group transition-colors duration-200">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Icon className="w-6 h-6 text-white" />
            </div>
            {change !== undefined && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${
                isPositive 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(change).toFixed(1)}%
              </div>
            )}
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{value}</h3>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{title}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{subtitle}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
      <StatCard
        title="Total Vehicles"
        value={formatNumber(currentStats.totalVehicles)}
        subtitle={`${year} Fleet Data`}
        icon={Car}
        change={totalChange}
      />
      <StatCard
        title="Top Make"
        value={topMake[0]}
        subtitle={`${formatNumber(topMake[1] as number)} vehicles`}
        icon={Car}
      />
      <StatCard
        title="Top Segment"
        value={topSegment[0]}
        subtitle={`${formatNumber(topSegment[1] as number)} vehicles`}
        icon={Car}
      />
      <StatCard
        title="Top Fuel Type"
        value={topFuelType[0]}
        subtitle={`${formatNumber(topFuelType[1] as number)} vehicles`}
        icon={Fuel}
      />
    </div>
  );
}

