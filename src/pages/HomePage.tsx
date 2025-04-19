import React, { useMemo } from 'react';
import { PropertyFilter } from '../components/PropertyFilter';
import { FilterParams } from '../types/types';
import { mockProperties } from '../data/mockProperties';
import { Link } from 'react-router-dom';

interface HomePageProps {
  filters: FilterParams;
  setFilters: (filters: FilterParams) => void;
}

interface ApartmentInfo {
  rooms: number;
  price: number;
  area: number;
}

interface ApartmentSummary {
  rooms: number;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  count: number;
}

export const HomePage: React.FC<HomePageProps> = ({ filters, setFilters }) => {
  // Фильтрация объектов
  const filteredProperties = mockProperties.filter(property => {
    // Фильтр по цене
    if (property.price < filters.minPrice || property.price > filters.maxPrice) {
      return false;
    }

    // Фильтр по площади
    if (property.totalArea < filters.minArea || property.totalArea > filters.maxArea) {
      return false;
    }

    // Фильтр по цене за метр
    if (property.pricePerMeter < filters.minPricePerMeter || property.pricePerMeter > filters.maxPricePerMeter) {
      return false;
    }

    // Фильтр по количеству комнат
    if (filters.rooms.length > 0 && !filters.rooms.includes(property.rooms)) {
      return false;
    }

    // Фильтр по региону
    if (filters.regions.length > 0 && !filters.regions.includes(property.region)) {
      return false;
    }

    // Фильтр по направлению
    if (filters.direction.length > 0 && !filters.direction.includes(property.direction)) {
      return false;
    }

    // Фильтр по отделке
    if (filters.finishing.length > 0 && !filters.finishing.includes(property.finishing)) {
      return false;
    }

    // Фильтр по году сдачи
    if (filters.completionYear && property.yearBuilt !== filters.completionYear) {
      return false;
    }

    // Фильтр по районам
    if (filters.districts.length > 0 && !filters.districts.includes(property.district)) {
      return false;
    }

    // Фильтр по застройщикам
    if (filters.developers.length > 0 && !filters.developers.includes(property.developer)) {
      return false;
    }

    // Фильтр по ЖК
    if (filters.complexes.length > 0 && !filters.complexes.includes(property.title)) {
      return false;
    }

    return true;
  });

  // Группируем квартиры по ЖК с детальной информацией по типам квартир
  const groupedProperties = useMemo(() => {
    const grouped = new Map();
    
    filteredProperties.forEach(property => {
      if (!grouped.has(property.title)) {
        const allPropertiesInComplex = mockProperties.filter(p => p.title === property.title);
        
        // Группируем квартиры по количеству комнат
        const apartmentsByRooms = new Map<number, ApartmentInfo[]>();
        
        allPropertiesInComplex.forEach(p => {
          if (!apartmentsByRooms.has(p.rooms)) {
            apartmentsByRooms.set(p.rooms, []);
          }
          apartmentsByRooms.get(p.rooms)?.push({
            rooms: p.rooms,
            price: p.price,
            area: p.totalArea
          });
        });
        
        // Сортируем квартиры по количеству комнат
        const sortedApartments = Array.from(apartmentsByRooms.entries())
          .sort(([roomsA], [roomsB]) => roomsA - roomsB)
          .map(([rooms, apartments]) => ({
            rooms,
            minPrice: Math.min(...apartments.map(a => a.price)),
            maxPrice: Math.max(...apartments.map(a => a.price)),
            minArea: Math.min(...apartments.map(a => a.area)),
            maxArea: Math.max(...apartments.map(a => a.area)),
            count: apartments.length
          }));
        
        grouped.set(property.title, {
          ...property,
          apartments: sortedApartments
        });
      }
    });
    
    return Array.from(grouped.values());
  }, [filteredProperties]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="bg-white dark:bg-neutral-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-neutral-900 dark:text-neutral-100">GREENMEDIA</h1>
          <Link 
            to="/api" 
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            API
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Фильтры */}
          <div className="w-full">
            <PropertyFilter
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          {/* Количество найденных объектов */}
          <div className="w-full text-center text-neutral-600 dark:text-neutral-400">
            Найдено ЖК: {groupedProperties.length}
          </div>

          {/* Список новостроек */}
          <div className="w-full flex flex-col gap-6">
            {groupedProperties.map(complex => (
              <div 
                key={complex.id} 
                className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6"
              >
                <div className="flex gap-6">
                  {/* Основная информация */}
                  <div className="flex-1 border-r border-neutral-200 dark:border-neutral-700 pr-6">
                    <h2 className="text-2xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
                      {complex.title}
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm">
                      {complex.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="text-neutral-500 dark:text-neutral-400">
                        {complex.address}
                      </p>
                      {complex.metro && (
                        <p className="text-neutral-500 dark:text-neutral-400">
                          М: {complex.metro}
                        </p>
                      )}
                      <p className="text-neutral-500 dark:text-neutral-400">
                        Сдача: {complex.yearBuilt}
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        Отделка: {
                          complex.finishing === 'none' ? 'Без отделки' :
                          complex.finishing === 'rough' ? 'Черновая' :
                          complex.finishing === 'fine' ? 'Чистовая' :
                          'Под ключ'
                        }
                      </p>
                      <p className="text-teal-600 dark:text-teal-500 font-medium">
                        {complex.developer}
                      </p>
                    </div>
                  </div>

                  {/* Таблица с информацией о квартирах */}
                  <div className="pl-0">
                    <div className="grid grid-cols-[200px,1px,300px,1px,200px] h-full relative">
                      {/* Вертикальные разделители на всю высоту */}
                      <div className="absolute left-[200px] top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700" />
                      <div className="absolute left-[501px] top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700" />

                      {/* Контент */}
                      <div className="py-4">
                        {/* Заголовок */}
                        <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 px-4 mb-4">
                          Комнат
                        </div>
                        {/* Данные */}
                        {complex.apartments.map((apt: ApartmentSummary) => (
                          <div key={`${apt.rooms}-rooms`} className="px-4 text-neutral-900 dark:text-neutral-100 h-8 flex items-center">
                            {apt.rooms}-комн
                          </div>
                        ))}
                      </div>

                      {/* Пустая колонка для разделителя */}
                      <div />

                      <div className="py-4">
                        {/* Заголовок */}
                        <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 px-4 mb-4">
                          Стоимость
                        </div>
                        {/* Данные */}
                        {complex.apartments.map((apt: ApartmentSummary) => (
                          <div key={`${apt.rooms}-price`} className="px-4 text-neutral-900 dark:text-neutral-100 h-8 flex items-center">
                            {apt.minPrice.toLocaleString()} - {apt.maxPrice.toLocaleString()} ₽
                          </div>
                        ))}
                      </div>

                      {/* Пустая колонка для разделителя */}
                      <div />

                      <div className="py-4">
                        {/* Заголовок */}
                        <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 px-4 mb-4">
                          Площадь
                        </div>
                        {/* Данные */}
                        {complex.apartments.map((apt: ApartmentSummary) => (
                          <div key={`${apt.rooms}-area`} className="px-4 text-neutral-900 dark:text-neutral-100 h-8 flex items-center">
                            {apt.minArea.toFixed(1)} - {apt.maxArea.toFixed(1)} м²
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}; 