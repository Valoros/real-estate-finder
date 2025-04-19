import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onResetFilters: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onResetFilters }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1a1a1a] border-b border-[#2a2a2a] z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-medium text-white hover:text-gray-300 transition-colors">
          Поиск недвижимости
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/api"
            className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300 rounded-md transition-colors"
          >
            API
          </Link>
          <Link
            to="/admin"
            className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300 rounded-md transition-colors"
          >
            ADMIN
          </Link>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300 rounded-md flex items-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Сбросить фильтры
          </button>
        </div>
      </div>
    </header>
  );
}; 