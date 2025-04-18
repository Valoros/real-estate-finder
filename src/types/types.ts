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
  region: Region;
  direction: Direction;
  metro?: string;
  metroLine?: string;
  railway?: string;
  finishing: Finishing;
  district: string;
  propertyType: string;
  distanceFromMKAD?: number;
  highway?: string;
}

export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
export type Region = 'MSK' | 'MO' | 'NMSK' | 'SPB' | 'LO' | 'UFA';
export type Finishing = 'none' | 'rough' | 'fine' | 'turnkey';

export interface District {
  id: string;
  name: string;
  region: Region;
}

export const districts: District[] = [
  // Москва
  { id: 'cao', name: 'ЦАО', region: 'MSK' },
  { id: 'sao', name: 'САО', region: 'MSK' },
  { id: 'svao', name: 'СВАО', region: 'MSK' },
  { id: 'vao', name: 'ВАО', region: 'MSK' },
  { id: 'uvao', name: 'ЮВАО', region: 'MSK' },
  { id: 'uao', name: 'ЮАО', region: 'MSK' },
  { id: 'uzao', name: 'ЮЗАО', region: 'MSK' },
  { id: 'zao', name: 'ЗАО', region: 'MSK' },
  { id: 'szao', name: 'СЗАО', region: 'MSK' },
  // Уфа
  { id: 'dema', name: 'Демский', region: 'UFA' },
  { id: 'kalinin', name: 'Калининский', region: 'UFA' },
  { id: 'kirov', name: 'Кировский', region: 'UFA' },
  { id: 'lenin', name: 'Ленинский', region: 'UFA' },
  { id: 'oktyabr', name: 'Октябрьский', region: 'UFA' },
  { id: 'ordzhon', name: 'Орджоникидзевский', region: 'UFA' },
  { id: 'sovet', name: 'Советский', region: 'UFA' },
  // Санкт-Петербург
  { id: 'adm', name: 'Адмиралтейский', region: 'SPB' },
  { id: 'vas', name: 'Василеостровский', region: 'SPB' },
  { id: 'vyb', name: 'Выборгский', region: 'SPB' },
  { id: 'kalinin_spb', name: 'Калининский', region: 'SPB' },
  { id: 'kirov_spb', name: 'Кировский', region: 'SPB' },
  { id: 'moscow', name: 'Московский', region: 'SPB' },
  { id: 'nevsky', name: 'Невский', region: 'SPB' },
  { id: 'petro', name: 'Петроградский', region: 'SPB' },
  { id: 'prim', name: 'Приморский', region: 'SPB' },
  { id: 'frunze', name: 'Фрунзенский', region: 'SPB' },
  { id: 'center', name: 'Центральный', region: 'SPB' }
];

export const finishingOptions = [
  { id: 'none', name: 'Без отделки' },
  { id: 'rough', name: 'Черновая' },
  { id: 'fine', name: 'Чистовая' },
  { id: 'turnkey', name: 'Под ключ' }
] as const;

export interface FilterParams {
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minPricePerMeter: number;
  maxPricePerMeter: number;
  direction: Direction[];
  rooms: number[];
  regions: Region[];
  finishing: Finishing[];
  completionYear: number | null;
  districts: string[];
} 