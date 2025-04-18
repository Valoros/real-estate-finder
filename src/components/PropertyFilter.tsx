import React, { useMemo } from 'react';
import { FilterParams, Region, Direction, districts, finishingOptions } from '../types/types';
import { mockProperties } from '../data/mockProperties';

const regions: { id: Region; label: string }[] = [
  { id: 'MSK', label: 'МСК' },
  { id: 'MO', label: 'МО' },
  { id: 'NMSK', label: 'НМСК' },
  { id: 'SPB', label: 'СПБ' },
  { id: 'LO', label: 'ЛО' },
  { id: 'UFA', label: 'УФА' }
];

const directions: { id: Direction; label: string; angle: number }[] = [
  { id: 'N', label: 'С', angle: 0 },
  { id: 'NE', label: 'СВ', angle: 45 },
  { id: 'E', label: 'В', angle: 90 },
  { id: 'SE', label: 'ЮВ', angle: 135 },
  { id: 'S', label: 'Ю', angle: 180 },
  { id: 'SW', label: 'ЮЗ', angle: 225 },
  { id: 'W', label: 'З', angle: 270 },
  { id: 'NW', label: 'СЗ', angle: 315 }
];

const roomOptions = [1, 2, 3, 4];

interface PropertyFilterProps {
  filters: FilterParams;
  setFilters: (filters: FilterParams) => void;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({ filters, setFilters }) => {
  const availableDistricts = useMemo(() => {
    // Получаем все уникальные районы из существующих ЖК
    const existingDistricts = new Set(mockProperties.map(p => p.district));
    
    // Фильтруем районы по выбранным регионам и наличию ЖК
    const filteredDistricts = districts.filter(d => {
      const isInSelectedRegions = filters.regions.length === 0 || filters.regions.includes(d.region);
      const hasProperties = existingDistricts.has(d.id);
      return isInSelectedRegions && hasProperties;
    });

    return filteredDistricts;
  }, [filters.regions]);

  const handleRegionClick = (region: Region) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region];
    
    // Очищаем районы, которые больше не относятся к выбранным регионам
    const newDistricts = filters.districts.filter(d => {
      const district = districts.find(dist => dist.id === d);
      return district && newRegions.includes(district.region);
    });

    setFilters({ ...filters, regions: newRegions, districts: newDistricts });
  };

  const handleDirectionClick = (direction: Direction) => {
    const newDirections = filters.direction.includes(direction)
      ? filters.direction.filter(d => d !== direction)
      : [...filters.direction, direction];
    setFilters({ ...filters, direction: newDirections });
  };

  const handleRoomClick = (room: number) => {
    const newRooms = filters.rooms.includes(room)
      ? filters.rooms.filter(r => r !== room)
      : [...filters.rooms, room];
    setFilters({ ...filters, rooms: newRooms });
  };

  const handleDistrictClick = (districtId: string) => {
    const newDistricts = filters.districts.includes(districtId)
      ? filters.districts.filter(d => d !== districtId)
      : [...filters.districts, districtId];
    setFilters({ ...filters, districts: newDistricts });
  };

  const handleFinishingClick = (finishingId: string) => {
    const newFinishing = filters.finishing.includes(finishingId as any)
      ? filters.finishing.filter(f => f !== finishingId)
      : [...filters.finishing, finishingId as any];
    setFilters({ ...filters, finishing: newFinishing });
  };

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start">
      {/* Левая колонка - Отделка */}
      <div className="space-y-2 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
        <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Отделка</div>
        <div className="flex flex-col gap-2">
          {finishingOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleFinishingClick(option.id)}
              className={`px-4 py-2 text-sm transition-colors rounded text-left ${
                filters.finishing.includes(option.id as any)
                  ? 'bg-teal-600 text-white'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Центральная колонка - Основные фильтры */}
      <div className="space-y-12 p-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
        {/* Регионы */}
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-2">
            {regions.map(region => (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region.id)}
                className={`px-4 py-2 text-sm transition-colors rounded ${
                  filters.regions.includes(region.id)
                    ? 'bg-teal-600 text-white'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>

        {/* Роза направлений */}
        <div className="flex flex-col items-center">
          <div className="relative w-[240px] h-[240px]">
            <div className="absolute inset-0 rounded border border-neutral-300 dark:border-neutral-700" />
            {directions.map(({ id, angle }) => {
              const radius = 80;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

              return (
                <button
                  key={id}
                  onClick={() => handleDirectionClick(id)}
                  className={`absolute left-1/2 top-1/2 w-10 h-10 -ml-5 -mt-5 flex items-center justify-center 
                    transition-colors rounded ${
                      filters.direction.includes(id)
                        ? 'bg-teal-600 text-white'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-6 h-6"
                    style={{ transform: `rotate(${angle}deg)` }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19V5M12 5l-7 7M12 5l7 7" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        {/* Количество комнат */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-2">
            {roomOptions.map(room => (
              <button
                key={room}
                onClick={() => handleRoomClick(room)}
                className={`w-12 h-12 text-lg font-medium transition-colors rounded ${
                  filters.rooms.includes(room)
                    ? 'bg-teal-600 text-white'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {room}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Правая колонка - Районы */}
      <div className="space-y-2 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
        <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Район</div>
        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-400 dark:scrollbar-thumb-neutral-600 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
          {availableDistricts.map(district => (
            <button
              key={district.id}
              onClick={() => handleDistrictClick(district.id)}
              className={`px-4 py-2 text-sm transition-colors rounded text-left ${
                filters.districts.includes(district.id)
                  ? 'bg-teal-600 text-white'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {district.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};