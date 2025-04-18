export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  pricePerMeter: number;
  address: string;
  totalArea: number;
  rooms: number;
  floor: number;
  totalFloors: number;
  yearBuilt: number;
  developer: string;
  images: string[];
  amenities: string[];
  status: 'planned' | 'underConstruction' | 'completed';
  completionDate?: string;
  region: string;
  direction: string;
  metro?: string;
  metroLine?: string;
  railway?: string;
  finishing: 'none' | 'rough' | 'fine' | 'turnkey';
  district: string;
  propertyType: string;
  distanceFromMKAD?: number;
  highway?: string;
}

export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
export type Region = 'MSK' | 'MO' | 'NMSK' | 'SPB' | 'LO' | 'UFA';

export interface FilterParams {
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minPricePerMeter: number;
  maxPricePerMeter: number;
  direction: Direction[];
  rooms: number[];
  region: Region | null;
  completionYear: number | null;
} 