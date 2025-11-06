'use client';

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AggregatedStats } from '@/lib/types';
import { useTheme } from '@/contexts/ThemeContext';

interface ChartsProps {
  stats: AggregatedStats;
}

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#84cc16',
];

export default function Charts({ stats }: ChartsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const textColor = isDark ? '#e5e7eb' : '#374151';
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  
  // Default colors if theme not available
  const defaultTextColor = '#374151';
  const defaultGridColor = '#e5e7eb';
  
  const makeData = Object.entries(stats.byMake)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }));

  const segmentData = Object.entries(stats.bySegment).map(([name, value]) => ({
    name,
    value,
  }));

  const fuelTypeData = Object.entries(stats.byFuelType).map(([name, value]) => ({
    name,
    value,
  }));

  const ageGroupData = Object.entries(stats.byAgeGroup)
    .sort(([a], [b]) => {
      const ageA = parseInt(a.split('-')[0]);
      const ageB = parseInt(b.split('-')[0]);
      return ageA - ageB;
    })
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-shrink-0">
      {/* Top Makes Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 card-hover transition-colors duration-200">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
          <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 to-blue-500 rounded-full shadow-lg"></span>
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Top 10 Makes
          </span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={makeData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor || defaultGridColor} />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12, fill: textColor || defaultTextColor }}
            />
            <YAxis tick={{ fontSize: 12, fill: textColor || defaultTextColor }} />
            <Tooltip
              formatter={(value: number) => value.toLocaleString()}
              labelStyle={{ color: textColor || defaultTextColor }}
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Segments Pie Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 card-hover transition-colors duration-200">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
          <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 to-blue-500 rounded-full shadow-lg"></span>
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            By Segment
          </span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={segmentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {segmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => value.toLocaleString()}
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                borderRadius: '8px',
                color: textColor,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Fuel Types Pie Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 card-hover transition-colors duration-200">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
          <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 to-blue-500 rounded-full shadow-lg"></span>
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            By Fuel Type
          </span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={fuelTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {fuelTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => value.toLocaleString()}
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                borderRadius: '8px',
                color: textColor,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Age Groups Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 card-hover transition-colors duration-200">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
          <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 to-blue-500 rounded-full shadow-lg"></span>
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            By Age Group
          </span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageGroupData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor || defaultGridColor} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: textColor || defaultTextColor }} />
            <YAxis tick={{ fontSize: 12, fill: textColor || defaultTextColor }} />
            <Tooltip
              formatter={(value: number) => value.toLocaleString()}
              labelStyle={{ color: textColor || defaultTextColor }}
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

