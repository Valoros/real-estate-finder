import { Property } from '../types/types';

export const mockProperties: Property[] = [
  // Москва (MSK)
  {
    id: "1",
    title: "ЖК Цветочные поляны",
    description: "Современный жилой комплекс с развитой инфраструктурой",
    price: 7500000,
    pricePerMeter: 165929,
    address: "Москва, ул. Цветочная, 1",
    totalArea: 45.2,
    rooms: 2,
    floor: 5,
    totalFloors: 25,
    yearBuilt: 2024,
    developer: "Самолет",
    images: ["https://example.com/image1.jpg"],
    amenities: ["парк", "школа", "детский сад"],
    status: "underConstruction",
    region: "MSK",
    direction: "N",
    metro: "Бульвар Рокоссовского",
    metroLine: "Сокольническая",
    finishing: "rough",
    district: "cao",
    propertyType: "apartment",
    distanceFromMKAD: 0,
    highway: "Щелковское"
  },
  {
    id: "2",
    title: "ЖК Небесная гавань",
    description: "Премиальный комплекс с видом на Москва-Сити",
    price: 25000000,
    pricePerMeter: 320000,
    address: "Москва, Пресненская наб., 10",
    totalArea: 78.1,
    rooms: 3,
    floor: 45,
    totalFloors: 60,
    yearBuilt: 2025,
    developer: "Capital Group",
    images: ["https://example.com/image2.jpg"],
    amenities: ["спа", "фитнес", "консьерж"],
    status: "underConstruction",
    region: "MSK",
    direction: "W",
    metro: "Деловой центр",
    metroLine: "Солнцевская",
    finishing: "turnkey",
    district: "cao",
    propertyType: "apartment",
    distanceFromMKAD: 0
  },
  // Московская область (MO)
  {
    id: "3",
    title: "ЖК Зеленый квартал",
    description: "Экологичный комплекс в окружении леса",
    price: 5500000,
    pricePerMeter: 110000,
    address: "Красногорск, ул. Лесная, 15",
    totalArea: 50,
    rooms: 2,
    floor: 8,
    totalFloors: 17,
    yearBuilt: 2024,
    developer: "ПИК",
    images: ["https://example.com/image3.jpg"],
    amenities: ["лес", "велодорожки", "детские площадки"],
    status: "underConstruction",
    region: "MO",
    direction: "NW",
    finishing: "fine",
    district: "Красногорский",
    propertyType: "apartment",
    distanceFromMKAD: 8,
    highway: "Новорижское"
  },
  // Новая Москва (NMSK)
  {
    id: "4",
    title: "ЖК Солнечная долина",
    description: "Современный квартал с собственной инфраструктурой",
    price: 6200000,
    pricePerMeter: 130000,
    address: "Коммунарка, ул. Ясная, 5",
    totalArea: 47.7,
    rooms: 2,
    floor: 12,
    totalFloors: 25,
    yearBuilt: 2023,
    developer: "А101",
    images: ["https://example.com/image4.jpg"],
    amenities: ["школа", "детский сад", "торговый центр"],
    status: "completed",
    region: "NMSK",
    direction: "SW",
    metro: "Коммунарка",
    metroLine: "Сокольническая",
    finishing: "fine",
    district: "Коммунарка",
    propertyType: "apartment",
    distanceFromMKAD: 5,
    highway: "Калужское"
  },
  // Санкт-Петербург (SPB)
  {
    id: "5",
    title: "ЖК Северная Венеция",
    description: "Элитный комплекс в историческом центре",
    price: 18000000,
    pricePerMeter: 280000,
    address: "Санкт-Петербург, наб. реки Мойки, 102",
    totalArea: 64.3,
    rooms: 2,
    floor: 6,
    totalFloors: 8,
    yearBuilt: 2024,
    developer: "RBI",
    images: ["https://example.com/image5.jpg"],
    amenities: ["подземный паркинг", "консьерж", "видеонаблюдение"],
    status: "underConstruction",
    region: "SPB",
    direction: "N",
    metro: "Адмиралтейская",
    finishing: "turnkey",
    district: "adm",
    propertyType: "apartment"
  },
  // Ленинградская область (LO)
  {
    id: "6",
    title: "ЖК Балтийский бриз",
    description: "Комфортный комплекс у залива",
    price: 4800000,
    pricePerMeter: 100000,
    address: "Всеволожск, Приморская ул., 20",
    totalArea: 48,
    rooms: 2,
    floor: 5,
    totalFloors: 12,
    yearBuilt: 2025,
    developer: "Setl Group",
    images: ["https://example.com/image6.jpg"],
    amenities: ["парковка", "детская площадка", "зона отдыха"],
    status: "planned",
    region: "LO",
    direction: "N",
    finishing: "rough",
    district: "Всеволожский",
    propertyType: "apartment",
    distanceFromMKAD: 15,
    highway: "Дорога жизни"
  },
  // Уфа (UFA)
  {
    id: "7",
    title: "ЖК Уфимский кремль",
    description: "Современный квартал в центре города",
    price: 4200000,
    pricePerMeter: 95000,
    address: "Уфа, ул. Ленина, 25",
    totalArea: 44.2,
    rooms: 1,
    floor: 10,
    totalFloors: 20,
    yearBuilt: 2024,
    developer: "ПСК-6",
    images: ["https://example.com/image7.jpg"],
    amenities: ["подземный паркинг", "детская площадка"],
    status: "underConstruction",
    region: "UFA",
    direction: "N",
    finishing: "fine",
    district: "lenin",
    propertyType: "apartment"
  },
  // Дополнительные ЖК в Москве
  {
    id: "8",
    title: "ЖК Парк Легенд",
    description: "Спортивно-жилой квартал с ледовой ареной",
    price: 12500000,
    pricePerMeter: 250000,
    address: "Москва, ул. Автозаводская, 23",
    totalArea: 50,
    rooms: 2,
    floor: 15,
    totalFloors: 28,
    yearBuilt: 2023,
    developer: "ТЭН",
    images: ["https://example.com/image8.jpg"],
    amenities: ["спорткомплекс", "парк", "подземный паркинг"],
    status: "completed",
    region: "MSK",
    direction: "S",
    metro: "Автозаводская",
    metroLine: "Замоскворецкая",
    finishing: "turnkey",
    district: "uao",
    propertyType: "apartment",
    distanceFromMKAD: 0
  },
  {
    id: "9",
    title: "ЖК Серебряный фонтан",
    description: "Премиальный квартал с историческим наследием",
    price: 15800000,
    pricePerMeter: 290000,
    address: "Москва, ул. Новоалексеевская, 16",
    totalArea: 54.5,
    rooms: 2,
    floor: 18,
    totalFloors: 22,
    yearBuilt: 2024,
    developer: "Эталон",
    images: ["https://example.com/image9.jpg"],
    amenities: ["фонтан", "парк", "фитнес-центр"],
    status: "underConstruction",
    region: "MSK",
    direction: "NE",
    metro: "Алексеевская",
    metroLine: "Калужско-Рижская",
    finishing: "fine",
    district: "svao",
    propertyType: "apartment",
    distanceFromMKAD: 0
  },
  // Дополнительные ЖК в Московской области
  {
    id: "10",
    title: "ЖК Лесные просторы",
    description: "Малоэтажный комплекс в экологичном районе",
    price: 4900000,
    pricePerMeter: 105000,
    address: "Одинцово, ул. Лесная, 10",
    totalArea: 46.7,
    rooms: 2,
    floor: 4,
    totalFloors: 5,
    yearBuilt: 2024,
    developer: "Гранель",
    images: ["https://example.com/image10.jpg"],
    amenities: ["лес", "детский сад", "спортплощадка"],
    status: "underConstruction",
    region: "MO",
    direction: "W",
    finishing: "rough",
    district: "Одинцовский",
    propertyType: "apartment",
    distanceFromMKAD: 12,
    highway: "Минское"
  }
];

// Добавляем еще 25 ЖК с разными характеристиками
for (let i = 11; i <= 35; i++) {
  const regions = ['MSK', 'MO', 'NMSK', 'SPB', 'LO', 'UFA'];
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const finishings = ['none', 'rough', 'fine', 'turnkey'];
  const statuses = ['planned', 'underConstruction', 'completed'];
  
  const region = regions[Math.floor(Math.random() * regions.length)] as Property['region'];
  const direction = directions[Math.floor(Math.random() * directions.length)] as Property['direction'];
  const finishing = finishings[Math.floor(Math.random() * finishings.length)] as Property['finishing'];
  const status = statuses[Math.floor(Math.random() * statuses.length)] as Property['status'];
  
  let district = '';
  let metro = '';
  let metroLine = '';
  
  // Определяем район в зависимости от региона
  switch (region) {
    case 'MSK':
      district = ['cao', 'sao', 'svao', 'vao', 'uvao', 'uao', 'uzao', 'zao', 'szao'][Math.floor(Math.random() * 9)];
      metro = ['Охотный ряд', 'Третьяковская', 'Арбатская', 'Смоленская'][Math.floor(Math.random() * 4)];
      metroLine = ['Сокольническая', 'Замоскворецкая', 'Арбатско-Покровская'][Math.floor(Math.random() * 3)];
      break;
    case 'SPB':
      district = ['adm', 'vas', 'vyb', 'kalinin_spb', 'kirov_spb', 'moscow', 'nevsky'][Math.floor(Math.random() * 7)];
      metro = ['Невский проспект', 'Василеостровская', 'Площадь Восстания'][Math.floor(Math.random() * 3)];
      break;
    case 'UFA':
      district = ['dema', 'kalinin', 'kirov', 'lenin', 'oktyabr', 'ordzhon', 'sovet'][Math.floor(Math.random() * 7)];
      break;
    case 'MO':
      district = ['Красногорский', 'Одинцовский', 'Мытищинский', 'Химкинский'][Math.floor(Math.random() * 4)];
      break;
    case 'LO':
      district = ['Всеволожский', 'Гатчинский', 'Ломоносовский'][Math.floor(Math.random() * 3)];
      break;
    case 'NMSK':
      district = ['Коммунарка', 'Щербинка', 'Троицк'][Math.floor(Math.random() * 3)];
      break;
  }

  const rooms = [1, 2, 3, 4][Math.floor(Math.random() * 4)];
  const basePrice = Math.floor(Math.random() * (20000000 - 4000000) + 4000000);
  const area = Math.floor(Math.random() * (120 - 30) + 30);
  const pricePerMeter = Math.floor(basePrice / area);

  mockProperties.push({
    id: i.toString(),
    title: `ЖК Новый ${i}`,
    description: `Современный жилой комплекс с развитой инфраструктурой ${i}`,
    price: basePrice,
    pricePerMeter: pricePerMeter,
    address: `Адрес ${i}`,
    totalArea: area,
    rooms: rooms,
    floor: Math.floor(Math.random() * 20) + 1,
    totalFloors: Math.floor(Math.random() * 30) + 5,
    yearBuilt: Math.floor(Math.random() * (2026 - 2023) + 2023),
    developer: ['ПИК', 'Самолет', 'А101', 'Эталон', 'ФСК'][Math.floor(Math.random() * 5)],
    images: [`https://example.com/image${i}.jpg`],
    amenities: ['парк', 'школа', 'детский сад', 'паркинг', 'фитнес'].slice(0, Math.floor(Math.random() * 3) + 1),
    status: status,
    region: region,
    direction: direction,
    metro: metro || undefined,
    metroLine: metroLine || undefined,
    finishing: finishing,
    district: district,
    propertyType: 'apartment',
    distanceFromMKAD: region === 'MSK' ? 0 : Math.floor(Math.random() * 30),
    highway: region === 'MSK' ? undefined : ['Ленинградское', 'Новорижское', 'Киевское', 'Минское'][Math.floor(Math.random() * 4)]
  });
} 