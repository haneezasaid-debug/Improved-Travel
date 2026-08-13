import { DestinationInfo } from '../types';

export const DESTINATIONS: Record<string, DestinationInfo> = {
  'Kuala Lumpur': {
    id: 'Kuala Lumpur',
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    tagline: 'Skyline Skyscrapers & Vibrant Heritage Enclaves',
    description: 'Malaysia’s dynamic capital featuring iconic Petronas Twin Towers, Batu Caves, bustling street markets, and multicultural cuisine.',
    coverImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 35,
    avgDailyBudgetSGD: 80,
    highlights: ['Petronas Twin Towers', 'Batu Caves', 'Jalan Alor Night Market', 'Merdeka Square', 'Bukit Bintang']
  },
  'Penang': {
    id: 'Penang',
    name: 'Penang',
    country: 'Malaysia',
    tagline: 'Pearl of the Orient & World Street Food Capital',
    description: 'UNESCO George Town street art heritage, colonial mansions, sandy Batu Ferringhi beaches, and legendary hawker food.',
    coverImage: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 30,
    avgDailyBudgetSGD: 70,
    highlights: ['George Town Street Art', 'Penang Hill Funicular', 'Kek Lok Si Temple', 'Gurney Drive Hawkers', 'Batu Ferringhi']
  },
  'Melaka': {
    id: 'Melaka',
    name: 'Melaka (Malacca)',
    country: 'Malaysia',
    tagline: 'Historic Straits Trading Port & Nyonya Heritage',
    description: 'A UNESCO World Heritage city rich in Dutch, Portuguese, and Peranakan history, river cruises, and vibrant Jonker Street.',
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 25,
    avgDailyBudgetSGD: 60,
    highlights: ['Jonker Street Night Market', 'A Famosa Fort', 'Melaka River Cruise', 'St. Paul’s Hill', 'Baba Nyonya Heritage Museum']
  },
  'Sabah': {
    id: 'Sabah',
    name: 'Sabah',
    country: 'Malaysia',
    tagline: 'Land Below the Wind & Mount Kinabalu Sanctuary',
    description: 'Majestic volcanic peaks, lush rainforest wildlife sanctuaries, orangutan centers, and world-class diving off Sipadan.',
    coverImage: 'https://images.unsplash.com/photo-1584208124888-3a20b9c799e2?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 40,
    avgDailyBudgetSGD: 95,
    highlights: ['Mount Kinabalu National Park', 'Sepilok Orangutan Sanctuary', 'Manukan & Sapi Island Snorkeling', 'Kota Kinabalu Waterfront Sunset']
  },
  'Sarawak': {
    id: 'Sarawak',
    name: 'Sarawak',
    country: 'Malaysia',
    tagline: 'Land of the Hornbills & Ancient Rainforest Caves',
    description: 'Immense limestone caves at Mulu, wild proboscis monkeys in Bako, traditional tribal longhouses, and Kuching riverfront culture.',
    coverImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 35,
    avgDailyBudgetSGD: 80,
    highlights: ['Gunung Mulu National Park Caves', 'Bako National Park Wildlife', 'Sarawak Cultural Village', 'Kuching Waterfront']
  },
  'Kedah & Langkawi': {
    id: 'Kedah & Langkawi',
    name: 'Kedah & Langkawi',
    country: 'Malaysia',
    tagline: 'Jewel of Kedah & UNESCO Global Geopark',
    description: 'Emerald seas, tax-free archipelago, dramatic Sky Bridge cable car, ancient limestone mangroves, and golden rice paddies.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 35,
    avgDailyBudgetSGD: 85,
    highlights: ['Langkawi Sky Bridge & Cable Car', 'Kilim Geoforest Mangrove Tour', 'Pantai Cenang Beach', 'Kilim Karst Geopark']
  },
  'Pahang': {
    id: 'Pahang',
    name: 'Pahang',
    country: 'Malaysia',
    tagline: 'Misty Cameron Tea Plantations & Taman Negara Rainforest',
    description: 'Cool tea estate highlands, 130-million-year-old virgin rainforest canopy walks, elephant sanctuaries, and Cherating beaches.',
    coverImage: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 30,
    avgDailyBudgetSGD: 70,
    highlights: ['Boh Tea Plantation Cameron Highlands', 'Taman Negara Canopy Walk', 'Kuala Gandah Elephant Sanctuary', 'Cherating Turtle Sanctuary']
  },
  'Perak': {
    id: 'Perak',
    name: 'Perak',
    country: 'Malaysia',
    tagline: 'Colonial Ipoh Heritage, Limestone Caves & Pangkor Island',
    description: 'Famous white coffee culture, dramatic limestone cave temples, tranquil Taiping Lake Gardens, and royal heritage in Kuala Kangsar.',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 25,
    avgDailyBudgetSGD: 60,
    highlights: ['Ipoh Old Town & White Coffee', 'Kek Lok Tong Cave Temple', 'Taiping Lake Gardens', 'Pangkor Island Beaches', 'Kellie’s Castle']
  },
  'Selangor': {
    id: 'Selangor',
    name: 'Selangor',
    country: 'Malaysia',
    tagline: 'Golden Triangle, Batu Caves Shrines & Firefly Sanctuaries',
    description: 'Lush limestone Batu Caves, theme parks at Sunway, royal heritage in Klang, and romantic firefly boat rides in Kuala Selangor.',
    coverImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 30,
    avgDailyBudgetSGD: 75,
    highlights: ['Batu Caves Rainbow Stairs', 'Sunway Lagoon Water Park', 'Kuala Selangor Firefly Cruise', 'Sultan Salahuddin Abdul Aziz Mosque']
  },
  'Johor': {
    id: 'Johor',
    name: 'Johor',
    country: 'Malaysia',
    tagline: 'Desaru Coast Beaches, Legoland & Endau-Rompin Wilderness',
    description: 'Family theme parks, pristine Desaru beaches, eco-resorts, royal Johor Bahru landmarks, and ancient rainforest national parks.',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 30,
    avgDailyBudgetSGD: 75,
    highlights: ['Legoland Malaysia Resort', 'Desaru Coast Beach & Waterpark', 'Endau-Rompin National Park', 'Sultan Abu Bakar Mosque']
  },
  'Terengganu': {
    id: 'Terengganu',
    name: 'Terengganu',
    country: 'Malaysia',
    tagline: 'Crystal Clear Marine Parks & Coral Reef Islands',
    description: 'Tropical diving paradises at Redang and Perhentian Islands, traditional boat-building, and the stunning Crystal Mosque.',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 30,
    avgDailyBudgetSGD: 75,
    highlights: ['Redang Island Snorkeling', 'Perhentian Island Turtle Scuba', 'Crystal Mosque', 'Pasar Payang Craft Market']
  },
  'Kelantan': {
    id: 'Kelantan',
    name: 'Kelantan',
    country: 'Malaysia',
    tagline: 'Cradle of Malay Culture & Heritage Crafts',
    description: 'Authentic Malay traditions, vibrant Pasar Siti Khadijah, Wau kite making, batik printing, and traditional shadow puppet theatre.',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 20,
    avgDailyBudgetSGD: 50,
    highlights: ['Pasar Siti Khadijah Market', 'Handicraft Village & Craft Museum', 'Wat Machimmaram Sleeping Buddha', 'Pantai Cahaya Bulan']
  },
  'Negeri Sembilan': {
    id: 'Negeri Sembilan',
    name: 'Negeri Sembilan',
    country: 'Malaysia',
    tagline: 'Minangkabau Curved Roof Heritage & Port Dickson Beaches',
    description: 'Unique Minangkabau architecture with swooping horn roofs, Seremban siew pau treats, and family beach escapes at Port Dickson.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 25,
    avgDailyBudgetSGD: 55,
    highlights: ['Port Dickson Beach Walk', 'Istana Seri Menanti Royal Palace', 'Seremban Cultural Market', 'Cape Rachado Lighthouse']
  },
  'Perlis': {
    id: 'Perlis',
    name: 'Perlis',
    country: 'Malaysia',
    tagline: 'Malaysia’s Northern Gem, Limestone Caves & Vineyards',
    description: 'Malaysia’s smallest state featuring mystical Gua Kelam limestone cave walks, Timah Tasoh lake views, and Harumanis mango orchards.',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    minDailyBudgetSGD: 20,
    avgDailyBudgetSGD: 45,
    highlights: ['Gua Kelam Cave Walk', 'Timah Tasoh Lake Viewpoint', 'Perlis State Park Hiking', 'Chuping Mango Farms']
  }
};
