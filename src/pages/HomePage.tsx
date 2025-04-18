import React from 'react';
import { PropertyFilter } from '../components/PropertyFilter';
import { FilterParams } from '../types/types';
import { mockProperties } from '../data/mockProperties';

interface HomePageProps {
  filters: FilterParams;
  setFilters: (filters: FilterParams) => void;
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

    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="bg-white dark:bg-neutral-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Поиск новостроек</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Фильтры */}
          <div className="w-full max-w-2xl">
            <PropertyFilter
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          {/* Количество найденных объектов */}
          <div className="w-full text-center text-neutral-600 dark:text-neutral-400">
            Найдено объектов: {filteredProperties.length}
          </div>

          {/* Список новостроек */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <div 
                key={property.id} 
                className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-4"
              >
                <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                  {property.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                  {property.description}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-lg font-bold text-teal-600 dark:text-teal-500">
                      {property.price.toLocaleString()} ₽
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {Math.round(property.pricePerMeter).toLocaleString()} ₽/м²
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-neutral-900 dark:text-neutral-100">
                      {property.totalArea} м²
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {property.rooms} комн.
                    </p>
                  </div>
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  <p>{property.address}</p>
                  {property.metro && (
                    <p>М: {property.metro}</p>
                  )}
                  <p>Сдача: {property.yearBuilt}</p>
                  <p>Отделка: {
                    property.finishing === 'none' ? 'Без отделки' :
                    property.finishing === 'rough' ? 'Черновая' :
                    property.finishing === 'fine' ? 'Чистовая' :
                    'Под ключ'
                  }</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}; 