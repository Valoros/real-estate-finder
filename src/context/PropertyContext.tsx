import React, { createContext, useState, useContext, ReactNode } from 'react';
import { mockProperties } from '../data/mockProperties';
import { Property, FilterParams } from '../types/types';

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addProperty: (property: Property) => void;
  setFilteredProperties: (properties: Property[]) => void;
  filters: FilterParams;
  updateFilters: (filters: Partial<FilterParams>) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterParams = {
  minPrice: 0,
  maxPrice: 50000000,
  minArea: 0,
  maxArea: 200,
  minPricePerMeter: 0,
  maxPricePerMeter: 500000,
  direction: [],
  rooms: [],
  regions: [],
  finishing: [],
  completionYear: null,
  districts: [],
  developers: [],
  complexes: []
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [filters, setFilters] = useState<FilterParams>(defaultFilters);

  const updateProperty = (id: string, updatedProperty: Partial<Property>) => {
    setProperties(
      properties.map(property =>
        property.id === id ? { ...property, ...updatedProperty } : property
      )
    );
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  const addProperty = (property: Property) => {
    setProperties([...properties, property]);
  };

  const updateFilters = (newFilters: Partial<FilterParams>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        updateProperty,
        deleteProperty,
        addProperty,
        setFilteredProperties,
        filters,
        updateFilters,
        resetFilters,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
}; 