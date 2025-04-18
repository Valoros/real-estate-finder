import axios from 'axios';

interface SamoletApartment {
  id: string;
  area: number;
  floor: number;
  rooms: number;
  price: number;
  pricePerMeter: number;
  status: string;
  building: string;
  section: string;
  apartment: string;
  finishing: string;
}

const SAMOLET_API_BASE_URL = 'https://samolet.ru/api/v1';

export async function fetchTsvetochnyePolyanyApartments(): Promise<SamoletApartment[]> {
  try {
    // Здесь будет реальный запрос к API Самолёта
    // Пока используем моковые данные для тестирования
    const mockData: SamoletApartment[] = [
      {
        id: "1",
        area: 45.2,
        floor: 5,
        rooms: 2,
        price: 7500000,
        pricePerMeter: 165929,
        status: "available",
        building: "1",
        section: "2",
        apartment: "123",
        finishing: "white_box"
      },
      {
        id: "2",
        area: 32.1,
        floor: 3,
        rooms: 1,
        price: 5900000,
        pricePerMeter: 183800,
        status: "available",
        building: "1",
        section: "2",
        apartment: "124",
        finishing: "white_box"
      },
      {
        id: "3",
        area: 61.8,
        floor: 7,
        rooms: 3,
        price: 9800000,
        pricePerMeter: 158577,
        status: "available",
        building: "1",
        section: "2",
        apartment: "125",
        finishing: "white_box"
      }
    ];

    return mockData;
  } catch (error) {
    console.error('Error fetching apartments:', error);
    throw error;
  }
}

export async function importApartmentsToDatabase(apartments: SamoletApartment[]) {
  // Здесь будет логика импорта данных в нашу базу данных
  // Пока просто выводим в консоль
  console.log('Importing apartments:', apartments);
} 