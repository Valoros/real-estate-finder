import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiPlus, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { usePropertyContext } from '../context/PropertyContext';
import { Property as PropertyType, Apartment } from '../types/types';

interface Property {
  id: string;
  title: string;
  price: number;
  totalArea: number;
  rooms: number;
  developer: string;
}

const AdminPage: React.FC = () => {
  const { properties, updateProperty, deleteProperty } = usePropertyContext();
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  
  // Состояние для квартир
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
  const [newApartment, setNewApartment] = useState<Omit<Apartment, 'id'>>({
    price: 0,
    area: 0,
    rooms: 0,
    complexTitle: ''
  });

  // Преобразуем Property из контекста в локальный тип Property для отображения
  const displayProperties: Property[] = properties.map(property => ({
    id: property.id,
    title: property.title,
    price: property.price,
    totalArea: property.totalArea,
    rooms: property.rooms,
    developer: property.developer
  }));

  // Функции для работы с ЖК
  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
  };

  const handleSaveProperty = () => {
    if (editingProperty) {
      // Обновляем свойство в глобальном контексте
      updateProperty(editingProperty.id, {
        title: editingProperty.title,
        price: editingProperty.price,
        totalArea: editingProperty.totalArea,
        rooms: editingProperty.rooms,
        developer: editingProperty.developer
      });
      
      setEditingProperty(null);
    }
  };

  const handleDeleteProperty = (id: string) => {
    // Удаляем свойство из глобального контекста
    deleteProperty(id);
  };

  // Функции для работы с квартирами
  const handleAddApartment = () => {
    const newId = apartments.length > 0 ? Math.max(...apartments.map(a => a.id)) + 1 : 1;
    setApartments([...apartments, { ...newApartment, id: newId }]);
    setNewApartment({ price: 0, area: 0, rooms: 0, complexTitle: '' });
  };

  const handleEditApartment = (apartment: Apartment) => {
    setEditingApartment(apartment);
  };

  const handleSaveApartment = () => {
    if (editingApartment) {
      setApartments(apartments.map(a => 
        a.id === editingApartment.id ? editingApartment : a
      ));
      setEditingApartment(null);
    }
  };

  const handleDeleteApartment = (id: number) => {
    setApartments(apartments.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="bg-white dark:bg-neutral-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-light text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
          >
            GREENMEDIA
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/api" 
              className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              API
            </Link>
            <span className="text-neutral-600 dark:text-neutral-400">
              ADMIN
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Секция ЖК */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Жилые комплексы</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Название</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Цена</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Площадь</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Комнаты</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Застройщик</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {displayProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {editingProperty?.id === property.id ? (
                        <input
                          type="text"
                          value={editingProperty.title}
                          onChange={(e) => setEditingProperty({...editingProperty, title: e.target.value})}
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                        />
                      ) : (
                        property.title
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {editingProperty?.id === property.id ? (
                        <input
                          type="number"
                          value={editingProperty.price}
                          onChange={(e) => setEditingProperty({...editingProperty, price: Number(e.target.value)})}
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                        />
                      ) : (
                        property.price.toLocaleString() + ' ₽'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {editingProperty?.id === property.id ? (
                        <input
                          type="number"
                          value={editingProperty.totalArea}
                          onChange={(e) => setEditingProperty({...editingProperty, totalArea: Number(e.target.value)})}
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                        />
                      ) : (
                        property.totalArea + ' м²'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {editingProperty?.id === property.id ? (
                        <input
                          type="number"
                          value={editingProperty.rooms}
                          onChange={(e) => setEditingProperty({...editingProperty, rooms: Number(e.target.value)})}
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                        />
                      ) : (
                        property.rooms
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {editingProperty?.id === property.id ? (
                        <input
                          type="text"
                          value={editingProperty.developer}
                          onChange={(e) => setEditingProperty({...editingProperty, developer: e.target.value})}
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                        />
                      ) : (
                        property.developer
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingProperty?.id === property.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveProperty}
                            className="text-green-500 hover:text-green-700 transition-colors"
                            title="Сохранить"
                          >
                            <FiSave className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setEditingProperty(null)}
                            className="text-neutral-500 hover:text-neutral-700 transition-colors"
                            title="Отменить"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProperty(property)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                            title="Редактировать"
                          >
                            <FiEdit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Удалить"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Секция добавления квартиры */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Добавить квартиру</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                ЖК
              </label>
              <select
                value={newApartment.complexTitle}
                onChange={(e) => setNewApartment({...newApartment, complexTitle: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              >
                <option value="">Выберите ЖК</option>
                {displayProperties.map(property => (
                  <option key={property.id} value={property.title}>{property.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Цена
              </label>
              <input
                type="number"
                value={newApartment.price}
                onChange={(e) => setNewApartment({...newApartment, price: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Площадь
              </label>
              <input
                type="number"
                value={newApartment.area}
                onChange={(e) => setNewApartment({...newApartment, area: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Количество комнат
              </label>
              <input
                type="number"
                value={newApartment.rooms}
                onChange={(e) => setNewApartment({...newApartment, rooms: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              />
            </div>
          </div>
          <button
            onClick={handleAddApartment}
            disabled={!newApartment.complexTitle}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlus /> Добавить квартиру
          </button>
        </div>

        {/* Список квартир */}
        {apartments.length > 0 && (
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Список квартир</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">ЖК</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Цена</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Площадь</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Комнаты</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {apartments.map((apartment) => (
                    <tr key={apartment.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">{apartment.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                        {editingApartment?.id === apartment.id ? (
                          <select
                            value={editingApartment.complexTitle}
                            onChange={(e) => setEditingApartment({...editingApartment, complexTitle: e.target.value})}
                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                          >
                            {displayProperties.map(property => (
                              <option key={property.id} value={property.title}>{property.title}</option>
                            ))}
                          </select>
                        ) : (
                          apartment.complexTitle
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                        {editingApartment?.id === apartment.id ? (
                          <input
                            type="number"
                            value={editingApartment.price}
                            onChange={(e) => setEditingApartment({...editingApartment, price: Number(e.target.value)})}
                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                          />
                        ) : (
                          apartment.price.toLocaleString() + ' ₽'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                        {editingApartment?.id === apartment.id ? (
                          <input
                            type="number"
                            value={editingApartment.area}
                            onChange={(e) => setEditingApartment({...editingApartment, area: Number(e.target.value)})}
                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                          />
                        ) : (
                          apartment.area + ' м²'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                        {editingApartment?.id === apartment.id ? (
                          <input
                            type="number"
                            value={editingApartment.rooms}
                            onChange={(e) => setEditingApartment({...editingApartment, rooms: Number(e.target.value)})}
                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                          />
                        ) : (
                          apartment.rooms
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingApartment?.id === apartment.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveApartment}
                              className="text-green-500 hover:text-green-700 transition-colors"
                              title="Сохранить"
                            >
                              <FiSave className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setEditingApartment(null)}
                              className="text-neutral-500 hover:text-neutral-700 transition-colors"
                              title="Отменить"
                            >
                              <FiX className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditApartment(apartment)}
                              className="text-blue-500 hover:text-blue-700 transition-colors"
                              title="Редактировать"
                            >
                              <FiEdit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteApartment(apartment.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              title="Удалить"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 