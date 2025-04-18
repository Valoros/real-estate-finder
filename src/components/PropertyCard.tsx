import React from 'react';
import { Property } from '../types/types';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-[#1a1a1a] p-3 rounded-lg text-sm">
      {/* Заголовок и цена */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-white font-medium">{property.title}</h3>
        <div className="text-right">
          <div className="text-green-400 font-medium">
            {(property.price / 1000000).toFixed(1)} млн ₽
          </div>
          <div className="text-gray-400 text-xs">
            {Math.round(property.pricePerMeter).toLocaleString()} ₽/м²
          </div>
        </div>
      </div>

      {/* Основные характеристики */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
        <div className="text-gray-400">
          {property.rooms} комн. • {property.totalArea} м²
        </div>
        <div className="text-gray-400">
          {property.floor}/{property.totalFloors} этаж
        </div>
        <div className="text-gray-400">
          {property.finishing === 'none' ? 'Без отделки' : 
           property.finishing === 'rough' ? 'Черновая' : 'Чистовая'}
        </div>
        <div className="text-gray-400">
          Сдача: {property.yearBuilt}
        </div>
      </div>

      {/* Расположение */}
      <div className="flex items-center justify-between text-xs">
        <div className="text-blue-400">
          {property.region} • {property.direction}
        </div>
        <div className="text-gray-500">
          {property.developer}
        </div>
      </div>
    </div>
  );
}; 