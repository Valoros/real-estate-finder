import { Direction, FilterParams, Region } from '../types/types';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface PropertyFilterRef {
  resetFilters: () => void;
}

interface SearchQueries {
  complexName: string;
  district: string;
}

interface PropertyFilterProps {
  filters: FilterParams;
  setFilters: (filters: FilterParams) => void;
  resetFilters: () => void;
}

const regions: { id: Region; label: string }[] = [
  { id: 'MSK', label: 'МСК' },
  { id: 'MO', label: 'МО' },
  { id: 'NMSK', label: 'НМСК' },
  { id: 'SPB', label: 'СПБ' },
  { id: 'LO', label: 'ЛО' },
  { id: 'UFA', label: 'УФА' }
];

const directions: { id: Direction; label: string; arrow: string }[] = [
  { id: 'N', label: 'С', arrow: '↑' },
  { id: 'NE', label: 'СВ', arrow: '⬈' },
  { id: 'E', label: 'В', arrow: '→' },
  { id: 'SE', label: 'ЮВ', arrow: '⬊' },
  { id: 'S', label: 'Ю', arrow: '↓' },
  { id: 'SW', label: 'ЮЗ', arrow: '⬋' },
  { id: 'W', label: 'З', arrow: '←' },
  { id: 'NW', label: 'СЗ', arrow: '⬉' }
];

const BasePropertyFilter: React.FC<PropertyFilterProps> = ({ filters, setFilters, resetFilters }) => {
  const handleDirectionClick = (dir: Direction) => {
    const newDirections = filters.direction.includes(dir)
      ? filters.direction.filter(d => d !== dir)
      : [...filters.direction, dir];
    
    setFilters({
      ...filters,
      direction: newDirections
    });
  };

  const handleCompletionYearChange = (value: number | null) => {
    setFilters({
      ...filters,
      completionYear: value
    });
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
      {/* Регионы */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {regions.map(region => (
          <button
            key={region.id}
            onClick={() => setFilters({ ...filters, region: region.id })}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              filters.region === region.id
                ? 'bg-blue-600 text-white'
                : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
            }`}
          >
            {region.label}
          </button>
        ))}
      </div>

      {/* Ценовой диапазон */}
      <div className="mb-8">
        <h3 className="text-white text-lg font-medium mb-4">Цена, млн ₽</h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={filters.minPrice / 1000000}
            onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) * 1000000 })}
            className="w-32 px-3 py-2 rounded-md bg-[#2a2a2a] text-white"
            placeholder="От"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            value={filters.maxPrice / 1000000}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) * 1000000 })}
            className="w-32 px-3 py-2 rounded-md bg-[#2a2a2a] text-white"
            placeholder="До"
          />
        </div>
      </div>

      {/* Площадь */}
      <div className="mb-8">
        <h3 className="text-white text-lg font-medium mb-4">Площадь, м²</h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={filters.minArea}
            onChange={(e) => setFilters({ ...filters, minArea: Number(e.target.value) })}
            className="w-32 px-3 py-2 rounded-md bg-[#2a2a2a] text-white"
            placeholder="От"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            value={filters.maxArea}
            onChange={(e) => setFilters({ ...filters, maxArea: Number(e.target.value) })}
            className="w-32 px-3 py-2 rounded-md bg-[#2a2a2a] text-white"
            placeholder="До"
          />
        </div>
      </div>

      {/* Срок сдачи */}
      <div className="mb-8">
        <h3 className="text-white text-lg font-medium mb-4">Срок сдачи</h3>
        <div className="flex flex-wrap gap-2">
          {[2024, 2025, 2026, 2027].map(year => (
            <button
              key={year}
              onClick={() => handleCompletionYearChange(year)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                filters.completionYear === year
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
              }`}
            >
              {year}
            </button>
          ))}
          <button
            onClick={() => handleCompletionYearChange(null)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              filters.completionYear === null
                ? 'bg-blue-600 text-white'
                : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
            }`}
          >
            Любой
          </button>
        </div>
      </div>

      {/* Роза направлений */}
      <div className="relative w-[240px] h-[240px] mx-auto mb-8">
        <div className="absolute inset-0 bg-[#2a2a2a] rounded-full opacity-20"></div>
        {directions.map(({ id, arrow }) => {
          const angle = directions.findIndex(d => d.id === id) * 45;
          const radius = 80;
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

          return (
            <button
              key={id}
              onClick={() => handleDirectionClick(id)}
              className="absolute left-1/2 top-1/2 w-12 h-12 -ml-6 -mt-6 flex items-center justify-center"
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              <span className={`text-2xl ${
                filters.direction.includes(id) 
                  ? 'text-blue-400' 
                  : 'text-gray-400'
              }`}>
                {arrow}
              </span>
            </button>
          );
        })}
      </div>

      {/* Комнаты */}
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map(room => (
          <button
            key={room}
            onClick={() => {
              const newRooms = filters.rooms.includes(room)
                ? filters.rooms.filter(r => r !== room)
                : [...filters.rooms, room];
              setFilters({ ...filters, rooms: newRooms });
            }}
            className={`w-12 h-12 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-110 ${
              filters.rooms.includes(room)
                ? 'bg-blue-600 text-white'
                : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
            }`}
          >
            {room}
          </button>
        ))}
      </div>

      <button
        onClick={resetFilters}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
      >
        Сбросить фильтры
      </button>
    </div>
  );
};

export const PropertyFilter = forwardRef<PropertyFilterRef, PropertyFilterProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    resetFilters: () => {
      const defaultFilters: FilterParams = {
        minPrice: 0,
        maxPrice: 100000000,
        minArea: 0,
        maxArea: 200,
        minPricePerMeter: 0,
        maxPricePerMeter: 500000,
        direction: [],
        rooms: [],
        region: null,
        completionYear: null
      };
      props.setFilters(defaultFilters);
      props.resetFilters();
    }
  }));

  return <BasePropertyFilter {...props} />;
});