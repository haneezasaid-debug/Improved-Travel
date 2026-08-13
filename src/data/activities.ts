import { Activity } from '../types';

export const ACTIVITIES: Activity[] = [
  // ==========================================
  // KUALA LUMPUR (8 activities)
  // ==========================================
  {
    id: 'kl-1',
    destination: 'Kuala Lumpur',
    name: 'Petronas Twin Towers Skybridge & Observation Deck',
    description: 'Marvel at panoramic city views from the world’s tallest twin towers and double-deck skybridge on level 41.',
    category: 'Historical & Monuments',
    costSGD: 28,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Air-conditioned interior, smooth elevator access, and high-safety glass railings.',
    soloNoteFemale: 'Heavily patrolled mall area with direct LRT connection. Staff are happy to take photos for solo visitors.',
    soloNoteMale: 'Easy single-ticket online purchase; staff readily assist solo visitors with photos.',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    location: 'KLCC, Kuala Lumpur',
    estimatedHours: 2
  },
  {
    id: 'kl-2',
    destination: 'Kuala Lumpur',
    name: 'Batu Caves Rainbow Steps & Cave Temple Exploration',
    description: 'Climb 272 vibrant colorful steps guarded by the towering golden Lord Murugan statue into ancient limestone caverns.',
    category: 'Historical & Monuments',
    costSGD: 0,
    timeSlot: 'Morning',
    familyStatus: 'Conditional',
    familyNote: 'StEEP climb with 272 stairs; mind inquisitive wild monkeys with snacks or loose items.',
    soloNoteFemale: 'Modest attire required (shoulders & knees covered; sarong rental available at entrance). Women-only coaches available on the KTM Komuter train line from KL Sentral.',
    soloNoteMale: 'Shoulders & knees must be covered for temple entry. Direct KTM Komuter train connection from KL Sentral.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    location: 'Gombak, Kuala Lumpur',
    estimatedHours: 2.5
  },
  {
    id: 'kl-3',
    destination: 'Kuala Lumpur',
    name: 'Jalan Alor Hawkers Food Trail',
    description: 'Feast on smoky chicken wings, grilled stingray, durian desserts, and satay along KL’s most legendary night food street.',
    category: 'Food & Dining',
    costSGD: 18,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Lively atmosphere with open-air plastic chairs; high chairs available at major stalls.',
    soloNoteFemale: 'Extremely busy and well-lit until late midnight. Open communal seating makes solo dining comfortable and casual.',
    soloNoteMale: 'Vibrant, high-energy food street. Easy single-portion stall orders and communal tables.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    location: 'Bukit Bintang, Kuala Lumpur',
    estimatedHours: 2
  },
  {
    id: 'kl-4',
    destination: 'Kuala Lumpur',
    name: 'Islamic Arts Museum Malaysia & Lake Gardens',
    description: 'Browse over 10,000 exquisite Islamic artifacts, scale models of famous mosques, and jewel-encrusted manuscripts.',
    category: 'Galleries & Museums',
    costSGD: 6,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Quiet, cool galleries with stroller ramps and interactive craft activity corner.',
    soloNoteFemale: 'Serene, air-conditioned museum with quiet galleries. Modest clothing suggested.',
    soloNoteMale: 'Relaxed, contemplative gallery pace for solo art enthusiasts.',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
    location: 'Perdana Botanical Garden, KL',
    estimatedHours: 2
  },
  {
    id: 'kl-5',
    destination: 'Kuala Lumpur',
    name: 'KL Eco Forest Canopy Walk & Park',
    description: 'Walk through a suspended canopy trail inside one of Malaysia’s oldest permanent forest reserves right in the city center.',
    category: 'Outdoor & Nature',
    costSGD: 3,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Fun tree-top wooden bridges; wear comfortable walking shoes.',
    soloNoteFemale: 'Best visited in morning daylight hours. Use Grab app for direct main gate pickup.',
    soloNoteMale: 'Quick morning nature break in the heart of KL; easy Grab ride-hailing access.',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-8767614657f6?auto=format&fit=crop&w=800&q=80',
    location: 'Bukit Nanas, Kuala Lumpur',
    estimatedHours: 1.5
  },
  {
    id: 'kl-6',
    destination: 'Kuala Lumpur',
    name: 'Symphony Lake Light & Sound Water Show at KLCC Park',
    description: 'Relax in front of the illuminated Petronas Twin Towers as musical fountains dance to choreographed light symphonies.',
    category: 'Relaxation',
    costSGD: 0,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Spacious green lawns, children’s playground, and wading pool adjacent to the fountain lake.',
    imageUrl: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80',
    location: 'KLCC Park, Kuala Lumpur',
    estimatedHours: 1.5
  },
  {
    id: 'kl-7',
    destination: 'Kuala Lumpur',
    name: 'Chinatown & Central Market Artisan Souvenirs',
    description: 'Explore Petaling Street, heritage coffee shops, Kwai Chai Hong alley murals, and handmade craft shops.',
    category: 'Food & Dining',
    costSGD: 12,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Colorful art murals and indoor air-conditioned crafts bazaar at Central Market.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    location: 'Petaling Street, Kuala Lumpur',
    estimatedHours: 2
  },

  // ==========================================
  // PENANG (7 activities)
  // ==========================================
  {
    id: 'penang-1',
    destination: 'Penang',
    name: 'UNESCO George Town Street Art & Heritage Trisha Ride',
    description: 'Hunt for famous iron caricatures and Ernest Zacharevic murals on a traditional pedal-powered trishaw.',
    category: 'Historical & Monuments',
    costSGD: 15,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Trishaws seat 2 passengers comfortably; memorable fun for kids and seniors alike.',
    imageUrl: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=800&q=80',
    location: 'George Town, Penang',
    estimatedHours: 2
  },
  {
    id: 'penang-2',
    destination: 'Penang',
    name: 'Penang Hill Funicular Railway & The Habitat Rain Forest',
    description: 'Ride the steep funicular railway up Penang Hill and stroll through the Curtis Crest treetop canopy walk.',
    category: 'Outdoor & Nature',
    costSGD: 22,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Cooler highland temperatures and barrier-free 360-degree viewing platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Air Itam, Penang',
    estimatedHours: 3
  },
  {
    id: 'penang-3',
    destination: 'Penang',
    name: 'Kek Lok Si Temple & Pagoda of Ten Thousand Buddhas',
    description: 'Visit South East Asia’s largest Buddhist temple complex crowned by a majestic bronze Statue of Kuan Yin.',
    category: 'Historical & Monuments',
    costSGD: 4,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Inclined lift available for upper pagoda access; turtle liberation pond loved by children.',
    imageUrl: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80',
    location: 'Air Itam, Penang',
    estimatedHours: 2.5
  },
  {
    id: 'penang-4',
    destination: 'Penang',
    name: 'Gurney Drive Hawker Centre Culinary Feast',
    description: 'Taste world-famed Penang Char Kway Teow, Assam Laksa, Hokkien Mee, and Chendol desserts.',
    category: 'Food & Dining',
    costSGD: 12,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Bustling open stall seating with endless variety to satisfy every family member.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    location: 'George Town, Penang',
    estimatedHours: 2
  },
  {
    id: 'penang-5',
    destination: 'Penang',
    name: 'Entopia by Penang Butterfly Farm',
    description: 'Step into a giant glass conservatory home to over 15,000 free-flying tropical butterflies and flora.',
    category: 'Galleries & Museums',
    costSGD: 20,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Highly educational hands-on nature discovery center designed specially for families.',
    imageUrl: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=800&q=80',
    location: 'Teluk Bahang, Penang',
    estimatedHours: 2
  },
  {
    id: 'penang-6',
    destination: 'Penang',
    name: 'Batu Ferringhi Sunset Beach & Night Market',
    description: 'Unwind on golden sands watching parasailers before browsing the vibrant beachside night market stalls.',
    category: 'Relaxation',
    costSGD: 0,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Gentle waves and soft sand for sandcastle building.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Batu Ferringhi, Penang',
    estimatedHours: 2.5
  },

  // ==========================================
  // MELAKA (7 activities)
  // ==========================================
  {
    id: 'melaka-1',
    destination: 'Melaka',
    name: 'Jonker Street Heritage Walk & Nyonya Delicacies',
    description: 'Stroll past colonial shop-houses, taste chicken rice balls, Peranakan laksa, and traditional Nyonya kueh.',
    category: 'Food & Dining',
    costSGD: 10,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Pedestrian friendly on weekends; sweet treats like Gula Melaka Cendol are kids favorites.',
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    location: 'Jonker Walk, Melaka',
    estimatedHours: 2
  },
  {
    id: 'melaka-2',
    destination: 'Melaka',
    name: 'A Famosa Fort Ruins & St. Paul’s Church Hill',
    description: 'Explore the 16th-century Portuguese fortress gateway and historic hilltop church with Straits views.',
    category: 'Historical & Monuments',
    costSGD: 0,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Gentle hill walk with shade trees and street musicians along the steps.',
    imageUrl: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80',
    location: 'Bandar Hilir, Melaka',
    estimatedHours: 1.5
  },
  {
    id: 'melaka-3',
    destination: 'Melaka',
    name: 'Melaka River Cruise & Waterfront Street Murals',
    description: 'Glide along the historic Melaka River passing illuminated bridges, restored warehouses, and colorful murals.',
    category: 'Relaxation',
    costSGD: 10,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Life jackets provided for all ages; smooth electric boat motion.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Taman Rempah Jetty, Melaka',
    estimatedHours: 1
  },
  {
    id: 'melaka-4',
    destination: 'Melaka',
    name: 'Baba & Nyonya Heritage Museum Tour',
    description: 'Discover three interconnected 19th-century townhouse mansions showcasing Peranakan carved furniture and silk craft.',
    category: 'Galleries & Museums',
    costSGD: 6,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Guided tours share vivid stories about Straits Chinese culture.',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
    location: 'Jalan Tun Tan Cheng Lock, Melaka',
    estimatedHours: 1.5
  },
  {
    id: 'melaka-5',
    destination: 'Melaka',
    name: 'Melaka Straits Floating Mosque Sunset View',
    description: 'Watch the sun set over the Malacca Straits at the breathtaking floating mosque built on stilts above the sea.',
    category: 'Historical & Monuments',
    costSGD: 0,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Peaceful coastal sea breezes and designated visitor viewing areas.',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    location: 'Pulau Melaka, Melaka',
    estimatedHours: 1.5
  },

  // ==========================================
  // SABAH (7 activities)
  // ==========================================
  {
    id: 'sabah-1',
    destination: 'Sabah',
    name: 'Mount Kinabalu Botanical Gardens & Canopy Walk',
    description: 'Trek UNESCO World Heritage cloud forest trails surrounded by wild orchids and pitcher plants near Mt. Kinabalu.',
    category: 'Outdoor & Nature',
    costSGD: 15,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Well-maintained boardwalks and visitor info center in cool mountain air.',
    imageUrl: 'https://images.unsplash.com/photo-1584208124888-3a20b9c799e2?auto=format&fit=crop&w=800&q=80',
    location: 'Kinabalu Park, Sabah',
    estimatedHours: 3
  },
  {
    id: 'sabah-2',
    destination: 'Sabah',
    name: 'Sepilok Orangutan Rehabilitation Centre',
    description: 'Witness rescued young orangutans feeding and playing in protected virgin rainforest surroundings.',
    category: 'Outdoor & Nature',
    costSGD: 12,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Raised wooden viewing platforms with nursery viewing window.',
    imageUrl: 'https://images.unsplash.com/photo-1540573133985-77898816866f?auto=format&fit=crop&w=800&q=80',
    location: 'Sandakan, Sabah',
    estimatedHours: 2.5
  },
  {
    id: 'sabah-3',
    destination: 'Sabah',
    name: 'Tunku Abdul Rahman Marine Park Island Hopping & Snorkeling',
    description: 'Speedboat to Manukan and Sapi islands for turquoise marine waters, clownfish coral reefs, and beach relaxation.',
    category: 'Adventure',
    costSGD: 35,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Kid-sized life vests available; shallow reef zones ideal for beginner snorkelers.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    location: 'Jesselton Point Jetty, Kota Kinabalu',
    estimatedHours: 4
  },
  {
    id: 'sabah-4',
    destination: 'Sabah',
    name: 'Kota Kinabalu Waterfront Sunset Seafood Feast',
    description: 'Dine on live sea mantis shrimp, butter crabs, and grilled fish as orange sunsets paint the South China Sea.',
    category: 'Food & Dining',
    costSGD: 25,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Open oceanfront deck with cheerful atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    location: 'Kota Kinabalu Waterfront, Sabah',
    estimatedHours: 2
  },

  // ==========================================
  // SARAWAK (7 activities)
  // ==========================================
  {
    id: 'sarawak-1',
    destination: 'Sarawak',
    name: 'Bako National Park Wildlife Trek & Proboscis Monkeys',
    description: 'Spot wild big-nosed proboscis monkeys, bearded pigs, and sea stack rock formations in Sarawak’s oldest park.',
    category: 'Outdoor & Nature',
    costSGD: 20,
    timeSlot: 'Morning',
    familyStatus: 'Conditional',
    familyNote: 'Involves boat ride landing; select easy trail loops (Telok Paku) when hiking with children.',
    imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    location: 'Bako, Sarawak',
    estimatedHours: 4
  },
  {
    id: 'sarawak-2',
    destination: 'Sarawak',
    name: 'Sarawak Cultural Village & Tribal Living Museum',
    description: 'Explore authentic Iban longhouses, Bidayuh bamboo dwellings, Penan huts, and enjoy traditional dance performances.',
    category: 'Historical & Monuments',
    costSGD: 25,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Interactive blowpipe shooting and traditional music workshops kids will love.',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
    location: 'Damai Beach, Santubong, Sarawak',
    estimatedHours: 3
  },
  {
    id: 'sarawak-3',
    destination: 'Sarawak',
    name: 'Kuching Waterfront Sunset Cruise & Sarawak Laksa',
    description: 'Cruise past the majestic Astana Palace and DUN State Assembly before savoring Anthony Bourdain’s favorite Sarawak Laksa.',
    category: 'Food & Dining',
    costSGD: 15,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Gentle river barge cruise with sunset photos and breezy promenades.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    location: 'Kuching Waterfront, Sarawak',
    estimatedHours: 2
  },

  // ==========================================
  // KEDAH & LANGKAWI (7 activities)
  // ==========================================
  {
    id: 'langkawi-1',
    destination: 'Kedah & Langkawi',
    name: 'Langkawi Cable Car (SkyCab) & Sky Bridge Expedition',
    description: 'Glide up Machinchang Mountain for panoramic Andaman Sea views and walk the curved suspension Sky Bridge.',
    category: 'Adventure',
    costSGD: 28,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Glass-bottom gondolas available; high safety railings across entire Sky Bridge.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Oriental Village, Langkawi',
    estimatedHours: 3
  },
  {
    id: 'langkawi-2',
    destination: 'Kedah & Langkawi',
    name: 'Kilim Karst Geoforest Park Mangrove & Eagle Feeding Boat Tour',
    description: 'Cruise limestone rivers, bat caves, floating fish farms, and observe brown eagles soaring in wild mangrove forest.',
    category: 'Outdoor & Nature',
    costSGD: 30,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Shaded canopy boat tours with life jackets for infants and kids.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    location: 'Kilim Jetty, Langkawi',
    estimatedHours: 3
  },
  {
    id: 'langkawi-3',
    destination: 'Kedah & Langkawi',
    name: 'Pantai Cenang Sunset Beach & Duty-Free Chocolates',
    description: 'Relax on Langkawi’s signature beach before shopping for tax-free chocolates, artisan crafts, and beachwear.',
    category: 'Relaxation',
    costSGD: 0,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Calm shallow shorelines perfect for kids paddling.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Pantai Cenang, Langkawi',
    estimatedHours: 2.5
  },

  // ==========================================
  // PAHANG (6 activities)
  // ==========================================
  {
    id: 'pahang-1',
    destination: 'Pahang',
    name: 'BOH Tea Plantation Estate & Highland Tea Center',
    description: 'Sip fresh black tea on a scenic overhanging deck overlooking endless rolling green tea terraces in Cameron Highlands.',
    category: 'Relaxation',
    costSGD: 8,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Cool 18°C mountain weather and cake cafes.',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=800&q=80',
    location: 'Sungei Palas, Cameron Highlands',
    estimatedHours: 2.5
  },
  {
    id: 'pahang-2',
    destination: 'Pahang',
    name: 'Taman Negara Ancient Rainforest Canopy Walk',
    description: 'Traverse 500 meters of narrow canopy bridges suspended 40 meters above a 130-million-year-old virgin rainforest floor.',
    category: 'Adventure',
    costSGD: 10,
    timeSlot: 'Morning',
    familyStatus: 'Conditional',
    familyNote: 'Height threshold: suitable for kids aged 6+ who are confident walking on narrow suspended bridges.',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-8767614657f6?auto=format&fit=crop&w=800&q=80',
    location: 'Kuala Tahan, Taman Negara',
    estimatedHours: 3
  },
  {
    id: 'pahang-3',
    destination: 'Pahang',
    name: 'Raju Hill Strawberry Farm & Highland Steamboat',
    description: 'Pick fresh juicy red strawberries straight from hydroponic vines before enjoying a hot steamboat dinner in cool air.',
    category: 'Food & Dining',
    costSGD: 15,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Hands-on basket picking activity super popular with young kids.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    location: 'Brinchang, Cameron Highlands',
    estimatedHours: 2
  },

  // ==========================================
  // PERAK (6 activities)
  // ==========================================
  {
    id: 'perak-1',
    destination: 'Perak',
    name: 'Ipoh Old Town White Coffee & Wall Murals Trail',
    description: 'Sip authentic frothy Ipoh White Coffee with egg tarts while exploring heritage shophouses and Ernest Zacharevic art.',
    category: 'Food & Dining',
    costSGD: 8,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Compact walkable historical streets with charming old-style bakeries.',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    location: 'Old Town, Ipoh',
    estimatedHours: 2
  },
  {
    id: 'perak-2',
    destination: 'Perak',
    name: 'Kek Lok Tong Cave Temple & Zen Lotus Gardens',
    description: 'Walk through massive limestone caverns illuminated by natural sunlight into a tranquil ornamental lotus lake park.',
    category: 'Historical & Monuments',
    costSGD: 0,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Naturally cool subterranean cave breeze; paddle boats available on the lake.',
    imageUrl: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80',
    location: 'Gunung Rapat, Ipoh',
    estimatedHours: 2
  },
  {
    id: 'perak-3',
    destination: 'Perak',
    name: 'Taiping Lake Gardens Sunset Stroll',
    description: 'Walk under centuries-old rain trees whose giant branches bend gracefully down to touch the calm lake waters.',
    category: 'Relaxation',
    costSGD: 0,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Paved jogging paths, swan pedal boats, and nearby Taiping Night Safari.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Taiping Lake Gardens, Perak',
    estimatedHours: 2
  },

  // ==========================================
  // SELANGOR (6 activities)
  // ==========================================
  {
    id: 'selangor-1',
    destination: 'Selangor',
    name: 'Sunway Lagoon Theme Park Water World',
    description: 'Splish and splash through South East Asia’s largest waterpark, Vuvuzela slide, nickelodeon lost lagoon, and wildlife park.',
    category: 'Adventure',
    costSGD: 45,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'World-class family theme park with dedicated toddler splash zones.',
    imageUrl: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=800&q=80',
    location: 'Sunway City, Selangor',
    estimatedHours: 4
  },
  {
    id: 'selangor-2',
    destination: 'Selangor',
    name: 'Kuala Selangor Firefly Sampan River Tour',
    description: 'Board a quiet wooden rowboat in total darkness as thousands of synchronized fireflies illuminate mangrove trees like Christmas lights.',
    category: 'Outdoor & Nature',
    costSGD: 15,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Magical quiet night river experience with mandatory life jackets.',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-8767614657f6?auto=format&fit=crop&w=800&q=80',
    location: 'Kampung Kuantan, Kuala Selangor',
    estimatedHours: 2
  },
  {
    id: 'selangor-3',
    destination: 'Selangor',
    name: 'Sultan Salahuddin Abdul Aziz Blue Mosque Visit',
    description: 'Tour Malaysia’s largest mosque adorned with a magnificent royal blue glass dome and soaring minarets.',
    category: 'Historical & Monuments',
    costSGD: 0,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Free informative volunteer guided tours; modest robes provided at entrance.',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    location: 'Shah Alam, Selangor',
    estimatedHours: 1.5
  },

  // ==========================================
  // JOHOR (6 activities)
  // ==========================================
  {
    id: 'johor-1',
    destination: 'Johor',
    name: 'Legoland Malaysia Resort & Water Park',
    description: 'Build brick memories across 8 themed lands, roller coasters, Miniland landmark models, and interactive LEGO rides.',
    category: 'Adventure',
    costSGD: 50,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Designed specifically for families with kids aged 2–12.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    location: 'Iskandar Puteri, Johor',
    estimatedHours: 4.5
  },
  {
    id: 'johor-2',
    destination: 'Johor',
    name: 'Desaru Coast Beach Relaxation & Fruit Farm',
    description: 'Unwind along 17km of white sandy beach line and tour a 100-acre tropical agricultural fruit farm with tractor rides.',
    category: 'Outdoor & Nature',
    costSGD: 12,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Tractor rides and fruit buffet tasting included in farm tour.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Desaru, Johor',
    estimatedHours: 3
  },
  {
    id: 'johor-3',
    destination: 'Johor',
    name: 'Johor Bahru Heritage Food & Kam Long Curry Fish Head',
    description: 'Savor traditional charcoal-baked banana cakes from Hiap Joo bakery and claypot curry fish head.',
    category: 'Food & Dining',
    costSGD: 12,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Heritage eateries located near JB Sentral.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    location: 'Jalan Dhoby, Johor Bahru',
    estimatedHours: 2
  },

  // ==========================================
  // TERENGGANU (5 activities)
  // ==========================================
  {
    id: 'terengganu-1',
    destination: 'Terengganu',
    name: 'Redang Island Marine Park Snorkeling & Turtle Spotting',
    description: 'Swim alongside green sea turtles and baby reef sharks in crystal-clear turquoise waters of Pulau Redang.',
    category: 'Outdoor & Nature',
    costSGD: 35,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Calm water conditions and life vests for non-swimmers.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    location: 'Pulau Redang, Terengganu',
    estimatedHours: 3.5
  },
  {
    id: 'terengganu-2',
    destination: 'Terengganu',
    name: 'Crystal Mosque & Islamic Heritage Park',
    description: 'Admire the striking steel and glass Crystal Mosque situated on Wan Man Island along the Terengganu River.',
    category: 'Historical & Monuments',
    costSGD: 5,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Spacious landscaped park area along the riverbank.',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
    location: 'Kuala Terengganu, Terengganu',
    estimatedHours: 2
  },
  {
    id: 'terengganu-3',
    destination: 'Terengganu',
    name: 'Pasar Payang Craft Market & Keropok Lekor Tasting',
    description: 'Shop for hand-printed Terengganu batik silk, copper crafts, and fresh fried hot keropok lekor fish sausages.',
    category: 'Food & Dining',
    costSGD: 8,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Vibrant local bazaar experience.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    location: 'Kuala Terengganu, Terengganu',
    estimatedHours: 2
  },

  // ==========================================
  // KELANTAN (5 activities)
  // ==========================================
  {
    id: 'kelantan-1',
    destination: 'Kelantan',
    name: 'Pasar Siti Khadijah Cultural Market & Nasi Kerabu',
    description: 'Experience the iconic octagonal central market run predominantly by matriarch traders and sample blue-hued Nasi Kerabu rice.',
    category: 'Food & Dining',
    costSGD: 6,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Vivid colors from upper floor photo balcony; friendly local vendors.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    location: 'Kota Bharu, Kelantan',
    estimatedHours: 2
  },
  {
    id: 'kelantan-2',
    destination: 'Kelantan',
    name: 'Handicraft Village & Traditional Wau Kite Workshop',
    description: 'Watch master craftsmen craft elaborate moon kites (Wau Bulan), silver filigree jewelry, and hand-woven songket fabrics.',
    category: 'Galleries & Museums',
    costSGD: 4,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Mini kite painting sessions available for young children.',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
    location: 'Kota Bharu, Kelantan',
    estimatedHours: 2
  },
  {
    id: 'kelantan-3',
    destination: 'Kelantan',
    name: 'Pantai Cahaya Bulan Evening Breeze & Seafood Stalls',
    description: 'Enjoy refreshing coastal sea breezes while watching traditional kite flying along Moon-Light Beach.',
    category: 'Relaxation',
    costSGD: 5,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Spacious sandy beach line where kids can fly paper kites.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Kota Bharu, Kelantan',
    estimatedHours: 2
  },

  // ==========================================
  // NEGERI SEMBILAN (5 activities)
  // ==========================================
  {
    id: 'ns-1',
    destination: 'Negeri Sembilan',
    name: 'Port Dickson Beach Stroll & Cape Rachado Lighthouse',
    description: 'Climb through coastal forest paths to Malaysia’s oldest lighthouse built by the Portuguese in the 16th century.',
    category: 'Outdoor & Nature',
    costSGD: 2,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Forest birdwatching trail with panoramic ocean viewpoints.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Tanjung Tuan, Port Dickson',
    estimatedHours: 2
  },
  {
    id: 'ns-2',
    destination: 'Negeri Sembilan',
    name: 'Istana Seri Menanti Timber Royal Palace',
    description: 'Admire a majestic 4-story royal palace constructed entirely from black hardwood without using a single metal nail.',
    category: 'Historical & Monuments',
    costSGD: 3,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Shaded palace grounds showcasing classical Minangkabau architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80',
    location: 'Seri Menanti, Negeri Sembilan',
    estimatedHours: 1.5
  },
  {
    id: 'ns-3',
    destination: 'Negeri Sembilan',
    name: 'Seremban Baked Siew Pau & Beef Noodle Feast',
    description: 'Taste flaky oven-baked crispy buns stuffed with savory sweet BBQ chicken or pork alongside thick Seremban beef noodles.',
    category: 'Food & Dining',
    costSGD: 8,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Loved by pastry enthusiasts of all ages.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    location: 'Seremban, Negeri Sembilan',
    estimatedHours: 1.5
  },

  // ==========================================
  // PERLIS (5 activities)
  // ==========================================
  {
    id: 'perlis-1',
    destination: 'Perlis',
    name: 'Gua Kelam Wooden Cave Walk & Secret Valley',
    description: 'Walk through an illuminated 370-meter suspension bridge inside a former tin-mining subterranean cave into a green hidden valley.',
    category: 'Outdoor & Nature',
    costSGD: 2,
    timeSlot: 'Morning',
    familyStatus: 'Family-friendly',
    familyNote: 'Flat wooden footbridge with handrails inside illuminated cave floor.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    location: 'Kaki Bukit, Perlis',
    estimatedHours: 2
  },
  {
    id: 'perlis-2',
    destination: 'Perlis',
    name: 'Timah Tasoh Lake Viewpoint & Harumanis Mango Farms',
    description: 'Gaze out across mirror-like lake waters framed by dramatic limestone karst monoliths while tasting fragrant Harumanis mangoes.',
    category: 'Relaxation',
    costSGD: 5,
    timeSlot: 'Afternoon',
    familyStatus: 'Family-friendly',
    familyNote: 'Scenic picnic benches and fresh fruit sampling stalls.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Beseri, Perlis',
    estimatedHours: 2
  },
  {
    id: 'perlis-3',
    destination: 'Perlis',
    name: 'Kuala Perlis Sunset Seafood & Ikan Bakar',
    description: 'Dine on fresh grilled sea bass with sambal chili sauce at the fishing village port as the sun dips into the Andaman Sea.',
    category: 'Food & Dining',
    costSGD: 15,
    timeSlot: 'Evening',
    familyStatus: 'Family-friendly',
    familyNote: 'Relaxed harbor seating overlooking colorful wooden fishing trawlers.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    location: 'Kuala Perlis, Perlis',
    estimatedHours: 2
  }
];
