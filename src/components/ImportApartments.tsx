import React, { useState } from 'react';
import { fetchTsvetochnyePolyanyApartments, importApartmentsToDatabase } from '../utils/samoletApi';

export const ImportApartments: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleImport = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const apartments = await fetchTsvetochnyePolyanyApartments();
      await importApartmentsToDatabase(apartments);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при импорте данных');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-[#1a1a1a] rounded">
      <h2 className="text-white text-lg font-medium mb-4">Импорт квартир ЖК "Цветочные поляны"</h2>
      <button
        onClick={handleImport}
        disabled={isLoading}
        className={`px-4 py-2 rounded text-sm ${
          isLoading
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500'
        } transition-colors`}
      >
        {isLoading ? 'Импорт...' : 'Начать импорт'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-900/50 text-red-200 rounded text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-3 bg-green-900/50 text-green-200 rounded text-sm">
          Данные успешно импортированы
        </div>
      )}
    </div>
  );
}; 