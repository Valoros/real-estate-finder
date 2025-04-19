import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import ApiPage from './pages/ApiPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import './App.css';
import { FilterParams } from './types/types';

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [filters, setFilters] = useState<FilterParams>({
    minPrice: 0,
    maxPrice: 50_000_000,
    minArea: 0,
    maxArea: 200,
    minPricePerMeter: 0,
    maxPricePerMeter: 1_000_000,
    rooms: [],
    regions: [],
    direction: [],
    finishing: [],
    completionYear: null,
    districts: [],
    developers: [],
    complexes: []
  });

  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 50_000_000,
      minArea: 0,
      maxArea: 200,
      minPricePerMeter: 0,
      maxPricePerMeter: 1_000_000,
      rooms: [],
      regions: [],
      direction: [],
      finishing: [],
      completionYear: null,
      districts: [],
      developers: [],
      complexes: []
    });
  };

  return (
    <Router>
      <ThemeToggle />
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500 transition-colors"
          title={theme === 'dark' ? "Включить светлую тему" : "Включить тёмную тему"}
        >
          {theme === 'dark' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
        <button
          onClick={resetFilters}
          className="p-2 rounded-lg bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500 transition-colors"
          title="Сбросить все фильтры"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
      <Routes>
        <Route path="/" element={<HomePage filters={filters} setFilters={setFilters} />} />
        <Route path="/api" element={<ApiPage />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
