import React from 'react';
import { Link } from 'react-router-dom';

const ApiPage: React.FC = () => {
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
          <span className="text-neutral-600 dark:text-neutral-400">
            API
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-neutral-100">Endpoints</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-neutral-800 dark:text-neutral-200">GET /api/properties</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Returns a list of all available properties</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-neutral-800 dark:text-neutral-200">GET /api/properties/:id</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Returns details for a specific property</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-neutral-800 dark:text-neutral-200">POST /api/properties</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Creates a new property listing</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiPage; 