import React, { useState } from 'react';
import { Header } from '../components/Header';
import { PropertyFilter } from '../components/PropertyFilter';
import { NewBuildingCard } from '../components/NewBuildingCard';
import { FilterParams, Property } from '../types/types';

// Временные моковые данные
const mockProperties: Property[] = [
  {
    id: "1",
    title: "ЖК Цветочные поляны",
    description: "Современный жилой комплекс с развитой инфраструктурой",
    price: 7500000,
    pricePerMeter: 165929,
    address: "Москва, ул. Цветочная, 1",
    totalArea: 45.2,
    rooms: 2,
    floor: 5,
    totalFloors: 25,
    yearBuilt: 2024,
    developer: "Самолет",
    images: ["https://example.com/image1.jpg"],
    amenities: ["парк", "школа", "детский сад"],
    status: "underConstruction",
    region: "MSK",
    direction: "N",
    metro: "Бульвар Рокоссовского",
    metroLine: "Сокольническая",
    finishing: "rough",
    district: "Богородское",
    propertyType: "apartment",
    distanceFromMKAD: 5,
    highway: "Щелковское"
  },
  {
    id: "2",
    title: "ЖК Северный парк",
    description: "Комфортабельный жилой комплекс в экологически чистом районе",
    price: 12000000,
    pricePerMeter: 180000,
    address: "Москва, ул. Северная, 10",
    totalArea: 66.7,
    rooms: 3,
    floor: 12,
    totalFloors: 20,
    yearBuilt: 2025,
    developer: "ПИК",
    images: ["https://example.com/image2.jpg"],
    amenities: ["парк", "торговый центр", "фитнес-клуб"],
    status: "planned",
    region: "MSK",
    direction: "N",
    metro: "Медведково",
    metroLine: "Калужско-Рижская",
    finishing: "turnkey",
    district: "Медведково",
    propertyType: "apartment",
    distanceFromMKAD: 8,
    highway: "Алтуфьевское"
  }
];

export const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<FilterParams>({
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
  });

  const handleResetFilters = () => {
    setFilters({
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
    });
  };

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

    // Фильтр по количеству комнат
    if (filters.rooms.length > 0 && !filters.rooms.includes(property.rooms)) {
      return false;
    }

    // Фильтр по региону
    if (filters.region && property.region !== filters.region) {
      return false;
    }

    // Фильтр по направлению
    if (filters.direction.length > 0 && !filters.direction.includes(property.direction as any)) {
      return false;
    }

    // Фильтр по году сдачи
    if (filters.completionYear && property.yearBuilt !== filters.completionYear) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header onResetFilters={handleResetFilters} />
      <main className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Фильтры */}
            <div className="lg:col-span-1">
              <PropertyFilter
                filters={filters}
                setFilters={setFilters}
                resetFilters={handleResetFilters}
              />
            </div>

            {/* Список новостроек */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map(property => (
                  <NewBuildingCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 