import React, { useMemo, useState } from 'react';
import { FilterParams, Region, Direction, districts, finishingOptions, Finishing } from '../types/types';
import { usePropertyContext } from '../context/PropertyContext';

// Приоритетные застройщики в нужном порядке
const priorityDevelopers = ['Самолёт', 'Гранель', 'ПИК', 'А101'];

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
  setFilters: (filters: Partial<FilterParams>) => void;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({ filters, setFilters }) => {
  const { properties } = usePropertyContext();
  const [districtSearch, setDistrictSearch] = useState('');
  const [developerSearch, setDeveloperSearch] = useState('');
  const [complexSearch, setComplexSearch] = useState('');

  // Получаем отфильтрованные объекты без учета застройщиков
  const filteredPropertiesWithoutDevelopers = useMemo(() => {
    return properties.filter(property => {
      if (property.price < filters.minPrice || property.price > filters.maxPrice) return false;
      if (property.totalArea < filters.minArea || property.totalArea > filters.maxArea) return false;
      if (property.pricePerMeter < filters.minPricePerMeter || property.pricePerMeter > filters.maxPricePerMeter) return false;
      if (filters.rooms.length > 0 && !filters.rooms.includes(property.rooms)) return false;
      if (filters.regions.length > 0 && !filters.regions.includes(property.region)) return false;
      if (filters.direction.length > 0 && !filters.direction.includes(property.direction)) return false;
      if (filters.finishing.length > 0 && !filters.finishing.includes(property.finishing)) return false;
      if (filters.completionYear && property.yearBuilt !== filters.completionYear) return false;
      if (filters.districts.length > 0 && !filters.districts.includes(property.district)) return false;
      if (filters.complexes.length > 0 && !filters.complexes.includes(property.title)) return false;
      return true;
    });
  }, [filters, properties]);

  const availableDistricts = useMemo(() => {
    // Получаем все уникальные районы из существующих ЖК
    const existingDistricts = new Set(properties.map(p => p.district));
    
    // Фильтруем районы по выбранным регионам, наличию ЖК и поисковому запросу
    const filteredDistricts = districts.filter(d => {
      const isInSelectedRegions = filters.regions.length === 0 || filters.regions.includes(d.region);
      const hasProperties = existingDistricts.has(d.id);
      const matchesSearch = d.name.toLowerCase().includes(districtSearch.toLowerCase());
      return isInSelectedRegions && hasProperties && matchesSearch;
    });

    return filteredDistricts;
  }, [filters.regions, districtSearch, properties]);

  const availableDevelopers = useMemo(() => {
    const developers = new Set(filteredPropertiesWithoutDevelopers.map(p => p.developer));
    return Array.from(developers)
      .filter(developer => 
        developer.toLowerCase().includes(developerSearch.toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b));
  }, [filteredPropertiesWithoutDevelopers, developerSearch]);

  const availableComplexes = useMemo(() => {
    const complexSet = new Set<string>();
    
    // Фильтруем properties без учета фильтра ЖК
    const filteredWithoutComplex = properties.filter(property => {
      if (property.price < filters.minPrice || property.price > filters.maxPrice) return false;
      if (property.totalArea < filters.minArea || property.totalArea > filters.maxArea) return false;
      if (property.pricePerMeter < filters.minPricePerMeter || property.pricePerMeter > filters.maxPricePerMeter) return false;
      if (filters.rooms.length > 0 && !filters.rooms.includes(property.rooms)) return false;
      if (filters.regions.length > 0 && !filters.regions.includes(property.region)) return false;
      if (filters.direction.length > 0 && !filters.direction.includes(property.direction)) return false;
      if (filters.finishing.length > 0 && !filters.finishing.includes(property.finishing)) return false;
      if (filters.completionYear && property.yearBuilt !== filters.completionYear) return false;
      if (filters.districts.length > 0 && !filters.districts.includes(property.district)) return false;
      if (filters.developers.length > 0 && !filters.developers.includes(property.developer)) return false;
      return true;
    });

    filteredWithoutComplex.forEach(property => {
      complexSet.add(property.title);
    });

    return Array.from(complexSet).sort();
  }, [properties, filters]);

  const availableFinishing = useMemo(() => {
    // Если выбран конкретный ЖК, показываем только доступные для него варианты отделки
    if (filters.complexes.length === 1) {
      const complex = filteredPropertiesWithoutDevelopers.find(p => p.title === filters.complexes[0]);
      return complex ? finishingOptions.filter(option => option.id === complex.finishing) : [];
    }
    
    // Иначе показываем все варианты отделки, доступные для отфильтрованных объектов
    const finishingTypes = new Set(filteredPropertiesWithoutDevelopers.map(p => p.finishing));
    return finishingOptions.filter(option => finishingTypes.has(option.id as Finishing));
  }, [filteredPropertiesWithoutDevelopers, filters.complexes]);

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

  const handleDeveloperClick = (developer: string) => {
    const newDevelopers = filters.developers.includes(developer)
      ? filters.developers.filter(d => d !== developer)
      : [...filters.developers, developer];
    setFilters({ ...filters, developers: newDevelopers });
  };

  // Обработчик выбора ЖК
  const handleComplexClick = (complex: string) => {
    const newComplexes = filters.complexes.includes(complex)
      ? filters.complexes.filter(c => c !== complex)
      : [...filters.complexes, complex];
    setFilters({ ...filters, complexes: newComplexes });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1200px] grid grid-cols-[280px_480px_280px] gap-6">
        {/* Левая колонка - ЖК и Отделка */}
        <div className="space-y-6">
          {/* Поиск по ЖК */}
          <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Жилые комплексы</div>
            <div className="relative">
              <input
                type="text"
                value={complexSearch}
                onChange={(e) => setComplexSearch(e.target.value)}
                placeholder="Поиск ЖК..."
                className="w-full px-3 py-2 mb-2 text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
              />
              {complexSearch && (
                <button
                  onClick={() => {
                    setComplexSearch('');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-400 dark:scrollbar-thumb-neutral-600 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
              {availableComplexes.map(complex => (
                <button
                  key={complex}
                  onClick={() => handleComplexClick(complex)}
                  className={`px-4 py-2 text-sm transition-colors rounded text-left ${
                    filters.complexes.includes(complex)
                      ? 'bg-teal-600 text-white'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {complex}
                </button>
              ))}
            </div>
          </div>

          {/* Отделка */}
          <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Отделка</div>
            <div className="flex flex-col gap-2">
              {availableFinishing.map(option => (
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
        </div>

        {/* Центральная колонка - Основные фильтры */}
        <div className="flex flex-col items-center bg-neutral-100 dark:bg-neutral-900 rounded-lg p-8 relative overflow-hidden">
          {/* Фоновый паттерн */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-transparent" />
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>

          {/* Регионы */}
          <div className="w-full mb-12 relative">
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 text-center font-medium">
              Регион поиска
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {regions.map(region => (
                <button
                  key={region.id}
                  onClick={() => handleRegionClick(region.id)}
                  className={`px-3 py-1.5 text-sm transition-all rounded-lg shadow-sm hover:shadow 
                    ${filters.regions.includes(region.id)
                      ? 'bg-teal-600 text-white shadow-teal-500/20'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                    }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>

          {/* Роза направлений */}
          <div className="mb-12 relative">
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 text-center font-medium">
              Направление от центра
            </div>
            <div className="relative w-[220px] h-[220px]">
              <div className="absolute inset-0 rounded-full border-2 border-neutral-200 dark:border-neutral-700" />
              <div className="absolute inset-2 rounded-full border border-neutral-200 dark:border-neutral-700 opacity-50" />
              <button
                className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center 
                  bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 
                  hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all rounded-full shadow-sm hover:shadow z-10"
              >
                <div className="w-2 h-2 rounded-full bg-current" />
              </button>
              {directions.map(({ id, angle }) => {
                const radius = 90;
                const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                return (
                  <button
                    key={id}
                    onClick={() => handleDirectionClick(id)}
                    className={`absolute left-1/2 top-1/2 w-9 h-9 flex items-center justify-center 
                      transition-all rounded-lg shadow-sm hover:shadow ${
                        filters.direction.includes(id)
                          ? 'bg-teal-600 text-white shadow-teal-500/20'
                          : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                      }`}
                    style={{
                      transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
                    }}
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-5 h-5"
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
          <div className="w-full relative">
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 text-center font-medium">
              Количество комнат
            </div>
            <div className="flex justify-center gap-3">
              {roomOptions.map(room => (
                <button
                  key={room}
                  onClick={() => handleRoomClick(room)}
                  className={`w-11 h-11 text-base font-medium transition-all rounded-lg shadow-sm hover:shadow
                    ${filters.rooms.includes(room)
                      ? 'bg-teal-600 text-white shadow-teal-500/20'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                    }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Правая колонка - Застройщики */}
        <div className="space-y-2 p-4 h-fit bg-neutral-100 dark:bg-neutral-900 rounded-lg">
          <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Застройщик</div>
          <div className="relative">
            <input
              type="text"
              value={developerSearch}
              onChange={(e) => setDeveloperSearch(e.target.value)}
              placeholder="Поиск застройщика..."
              className="w-full px-3 py-2 mb-2 text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            />
            {filters.developers.length > 0 && (
              <button
                onClick={() => setFilters({ ...filters, developers: [] })}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-400 dark:scrollbar-thumb-neutral-600 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
            {availableDevelopers.map(developer => (
              <button
                key={developer}
                onClick={() => handleDeveloperClick(developer)}
                className={`px-4 py-2 text-sm transition-colors rounded text-left ${
                  filters.developers.includes(developer)
                    ? 'bg-teal-600 text-white'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {developer}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};