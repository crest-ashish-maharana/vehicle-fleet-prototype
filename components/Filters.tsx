'use client';

import { FilterState } from '@/lib/types';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableOptions: {
    postcodes: Array<{ code: string; name: string }>;
    makes: string[];
    models: string[];
    segments: string[];
    subsegments: string[];
    fuelTypes: string[];
    ageGroups: string[];
  };
}

export default function Filters({ filters, onFiltersChange, availableOptions }: FiltersProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const filterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openFilter) {
        const filterElement = filterRefs.current[openFilter];
        if (filterElement && !filterElement.contains(event.target as Node)) {
          setOpenFilter(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openFilter]);

  const toggleFilter = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const toggleOption = (filterType: keyof FilterState, value: string) => {
    const currentValues = filters[filterType] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({
      ...filters,
      [filterType]: newValues,
    });
  };

  const clearFilter = (filterType: keyof FilterState) => {
    onFiltersChange({
      ...filters,
      [filterType]: [],
    });
  };

  const FilterDropdown = ({
    title,
    filterKey,
    options,
    displayKey,
    valueKey,
  }: {
    title: string;
    filterKey: keyof FilterState;
    options: any[];
    displayKey: string;
    valueKey: string;
  }) => {
    const isOpen = openFilter === filterKey;
    const selectedCount = (filters[filterKey] as string[]).length;

    return (
      <div 
        className="relative"
        ref={(el) => {
          filterRefs.current[filterKey] = el;
        }}
      >
        <button
          onClick={() => toggleFilter(filterKey)}
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white dark:hover:from-blue-900/20 dark:hover:to-gray-700 flex items-center justify-between text-left transition-all duration-200 group"
        >
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate flex-1 text-left">
            {title}
            {selectedCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs whitespace-nowrap">
                {selectedCount}
              </span>
            )}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto min-w-[200px] transition-colors duration-200">
            <div className="p-2">
              {selectedCount > 0 && (
                <button
                  onClick={() => clearFilter(filterKey)}
                  className="w-full mb-2 px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors duration-200"
                >
                  Clear all
                </button>
              )}
              {options.map((option) => {
                const value = option[valueKey];
                const display = option[displayKey];
                const isSelected = (filters[filterKey] as string[]).includes(value);
                
                return (
                  <label
                    key={value}
                    className="flex items-center px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded transition-colors duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOption(filterKey, value)}
                      className="w-4 h-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">{display}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 pb-6 transition-colors duration-200">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
        <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 to-blue-500 rounded-full shadow-lg"></span>
        <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Filters
        </span>
      </h2>
      <div className="flex flex-col gap-3">
        <FilterDropdown
          title="Postcode"
          filterKey="postcodes"
          options={availableOptions.postcodes}
          displayKey="name"
          valueKey="code"
        />
        <FilterDropdown
          title="Make"
          filterKey="makes"
          options={availableOptions.makes.map((m) => ({ name: m, code: m }))}
          displayKey="name"
          valueKey="code"
        />
        <FilterDropdown
          title="Model"
          filterKey="models"
          options={availableOptions.models.map((m) => ({ name: m, code: m }))}
          displayKey="name"
          valueKey="code"
        />
        <FilterDropdown
          title="Segment"
          filterKey="segments"
          options={availableOptions.segments.map((s) => ({ name: s, code: s }))}
          displayKey="name"
          valueKey="code"
        />
        <FilterDropdown
          title="Subsegment"
          filterKey="subsegments"
          options={availableOptions.subsegments.map((s) => ({ name: s, code: s }))}
          displayKey="name"
          valueKey="code"
        />
        <FilterDropdown
          title="Fuel Type"
          filterKey="fuelTypes"
          options={availableOptions.fuelTypes.map((f) => ({ name: f, code: f }))}
          displayKey="name"
          valueKey="code"
        />
        <FilterDropdown
          title="Age Group"
          filterKey="ageGroups"
          options={availableOptions.ageGroups.map((a) => ({ name: a, code: a }))}
          displayKey="name"
          valueKey="code"
        />
      </div>
      <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Year</span>
          <div className="grid grid-cols-3 gap-2">
            {[2019, 2020, 2021, 2022, 2023, 2024].map((year) => (
              <button
                key={year}
                onClick={() => onFiltersChange({ ...filters, year })}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  filters.year === year
                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md border border-gray-200 dark:border-gray-600'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

