import React from 'react';
import { Property } from '../types/types';

interface NewBuildingCardProps {
  property: Property;
}

export const NewBuildingCard: React.FC<NewBuildingCardProps> = ({ property }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-yellow-500';
      case 'underConstruction':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planned':
        return 'Планируется';
      case 'underConstruction':
        return 'Строится';
      case 'completed':
        return 'Сдан';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Галерея изображений */}
      <div className="relative h-48">
        {property.images[0] && (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm ${getStatusColor(property.status)}`}>
          {getStatusText(property.status)}
        </div>
      </div>

      {/* Основная информация */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{property.title}</h3>
        
        {/* Цена */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-green-400">
            {(property.price / 1000000).toFixed(1)} млн ₽
          </span>
          <span className="text-gray-400">
            {Math.round(property.pricePerMeter).toLocaleString()} ₽/м²
          </span>
        </div>

        {/* Характеристики */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Комнат:</span>
            <span className="text-white">{property.rooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Площадь:</span>
            <span className="text-white">{property.totalArea} м²</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Этаж:</span>
            <span className="text-white">{property.floor}/{property.totalFloors}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Сдача:</span>
            <span className="text-white">{property.yearBuilt}</span>
          </div>
        </div>

        {/* Расположение */}
        <div className="mb-4">
          <div className="text-gray-400 mb-1">Расположение:</div>
          <div className="text-white">
            {property.district}
            {property.metro && ` • ${property.metro}`}
            {property.distanceFromMKAD && ` • ${property.distanceFromMKAD} км от МКАД`}
          </div>
        </div>

        {/* Застройщик */}
        <div className="text-gray-400">
          Застройщик: <span className="text-white">{property.developer}</span>
        </div>
      </div>
    </div>
  );
}; 