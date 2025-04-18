import React from 'react';

const ApiPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Documentation</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-3">Endpoints</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">GET /api/properties</h3>
            <p className="text-gray-600">Returns a list of all available properties</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">GET /api/properties/:id</h3>
            <p className="text-gray-600">Returns details for a specific property</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">POST /api/properties</h3>
            <p className="text-gray-600">Creates a new property listing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiPage; 