export interface EventData {
  id: string;
  title: Record<'sr' | 'en', string>;
  description: Record<'sr' | 'en', string>;
  category: string;
  date: string;
  time: string;
  location: Record<'sr' | 'en', string>;
  venue: Record<'sr' | 'en', string>;
  price: number;
  image: string;
  featured: boolean;
  ticketTypes: {
    name: Record<'sr' | 'en', string>;
    price: number;
    available: number;
  }[];
}

export const categories = ['Koncerti', 'Festivali', 'Predstave', 'Konferencije', 'Sajmovi', 'Nova godina', 'Ostalo'];

export const locations = ['Banja Luka', 'Prijedor'];

export const allEvents: EventData[] = [
  {
    id: '1',
    title: {
      sr: 'Noćni koncer jazz muzike',
      en: 'Night Jazz Concert'
    },
    description: {
      sr: 'Pridružite se nezaboravnoj večeri punoj jazz melodija u srcu Banja Luke. Nastupiće poznati regionalni jazz muzičari.',
      en: 'Join an unforgettable evening full of jazz melodies in the heart of Banja Luka. Featuring renowned regional jazz musicians.'
    },
    category: 'Koncerti',
    date: '2025-02-15',
    time: '20:00',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Dom kulture Banja Luka',
      en: 'Cultural Center Banja Luka'
    },
    price: 25,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    ticketTypes: [
      {
        name: { sr: 'Regularna karta', en: 'Regular Ticket' },
        price: 25,
        available: 100
      },
      {
        name: { sr: 'VIP karta', en: 'VIP Ticket' },
        price: 45,
        available: 25
      }
    ]
  },
  {
    id: '2',
    title: {
      sr: 'Festival elektronske muzike',
      en: 'Electronic Music Festival'
    },
    description: {
      sr: 'Trodnevni festival elektronske muzike sa najboljim DJ-ovima iz regije i Evrope.',
      en: 'Three-day electronic music festival featuring the best DJs from the region and Europe.'
    },
    category: 'Festivali',
    date: '2025-03-10',
    time: '18:00',
    location: {
      sr: 'Prijedor',
      en: 'Prijedor'
    },
    venue: {
      sr: 'Gradski park Prijedor',
      en: 'City Park Prijedor'
    },
    price: 65,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    ticketTypes: [
      {
        name: { sr: 'Jednodnevna karta', en: 'Single Day Pass' },
        price: 30,
        available: 200
      },
      {
        name: { sr: 'Trodnevna karta', en: 'Three Day Pass' },
        price: 65,
        available: 150
      },
      {
        name: { sr: 'VIP trodnevna', en: 'VIP Three Day' },
        price: 120,
        available: 50
      }
    ]
  },
  {
    id: '3',
    title: {
      sr: 'Pozorišna predstava "Hamlet"',
      en: 'Theater Play "Hamlet"'
    },
    description: {
      sr: 'Klasična Shakespeareova drama u izvedbi Narodnog pozorišta Republike Srpske.',
      en: 'Classic Shakespearean drama performed by the National Theater of Republika Srpska.'
    },
    category: 'Predstave',
    date: '2025-02-28',
    time: '19:30',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Narodno pozorište RS',
      en: 'National Theater RS'
    },
    price: 20,
    image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Parter', en: 'Orchestra' },
        price: 20,
        available: 80
      },
      {
        name: { sr: 'Balkon', en: 'Balcony' },
        price: 15,
        available: 60
      },
      {
        name: { sr: 'Loža', en: 'Box Seat' },
        price: 35,
        available: 20
      }
    ]
  },
  {
    id: '4',
    title: {
      sr: 'Konferencija o digitalnoj transformaciji',
      en: 'Digital Transformation Conference'
    },
    description: {
      sr: 'Stručna konferencija o najnovijim trendovima u digitalnoj transformaciji biznisa.',
      en: 'Professional conference on the latest trends in business digital transformation.'
    },
    category: 'Konferencije',
    date: '2025-03-05',
    time: '09:00',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Hotel Bosna',
      en: 'Hotel Bosna'
    },
    price: 75,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Standardna karta', en: 'Standard Ticket' },
        price: 75,
        available: 120
      },
      {
        name: { sr: 'Premium karta', en: 'Premium Ticket' },
        price: 150,
        available: 30
      }
    ]
  },
  {
    id: '5',
    title: {
      sr: 'Rok koncert - Tribute to Queen',
      en: 'Rock Concert - Tribute to Queen'
    },
    description: {
      sr: 'Nezaboravan tribute koncert posvećen legendarnom bendu Queen sa hitovima svih vremena.',
      en: 'Unforgettable tribute concert dedicated to the legendary band Queen with all-time hits.'
    },
    category: 'Koncerti',
    date: '2025-04-12',
    time: '21:00',
    location: {
      sr: 'Prijedor',
      en: 'Prijedor'
    },
    venue: {
      sr: 'Dvorana kulture Prijedor',
      en: 'Cultural Hall Prijedor'
    },
    price: 35,
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    ticketTypes: [
      {
        name: { sr: 'Parter', en: 'Floor Ticket' },
        price: 35,
        available: 150
      },
      {
        name: { sr: 'Galerija', en: 'Gallery' },
        price: 25,
        available: 100
      }
    ]
  },
  {
    id: '6',
    title: {
      sr: 'Sajam domaćih proizvoda',
      en: 'Local Products Fair'
    },
    description: {
      sr: 'Prikaz najboljih domaćih proizvoda iz regije - od hrane do rukotvorina.',
      en: 'Showcase of the best local products from the region - from food to handicrafts.'
    },
    category: 'Sajmovi',
    date: '2025-03-20',
    time: '10:00',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Sajmični prostor Banja Luka',
      en: 'Fair Grounds Banja Luka'
    },
    price: 5,
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Ulaznica', en: 'Entry Ticket' },
        price: 5,
        available: 500
      },
      {
        name: { sr: 'Porodična karta', en: 'Family Ticket' },
        price: 15,
        available: 100
      }
    ]
  },
  {
    id: '7',
    title: {
      sr: 'Stand-up komedija večer',
      en: 'Stand-up Comedy Night'
    },
    description: {
      sr: 'Večer smijeha sa poznatim domaćim komičarima koji će vas nasmijati do suza.',
      en: 'Night of laughter with famous local comedians who will make you laugh to tears.'
    },
    category: 'Ostalo',
    date: '2025-02-22',
    time: '20:30',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Klub Tramvaj',
      en: 'Club Tramvaj'
    },
    price: 15,
    image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Standardna karta', en: 'Standard Ticket' },
        price: 15,
        available: 80
      }
    ]
  },
  {
    id: '8',
    title: {
      sr: 'Gastronomski festival',
      en: 'Gastronomic Festival'
    },
    description: {
      sr: 'Festival tradicionalne i moderne kuhinje sa učešćem najboljih restorana iz grada.',
      en: 'Festival of traditional and modern cuisine featuring the best restaurants in the city.'
    },
    category: 'Festivali',
    date: '2025-04-05',
    time: '12:00',
    location: {
      sr: 'Prijedor',
      en: 'Prijedor'
    },
    venue: {
      sr: 'Trg Krajine',
      en: 'Krajina Square'
    },
    price: 20,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    ticketTypes: [
      {
        name: { sr: 'Dnevna karta', en: 'Day Pass' },
        price: 20,
        available: 200
      },
      {
        name: { sr: 'VIP degustacija', en: 'VIP Tasting' },
        price: 50,
        available: 40
      }
    ]
  },
  // NEW EVENTS START HERE
  {
    id: '9',
    title: {
      sr: 'Koncert klasične muzike - Filharmonija',
      en: 'Classical Music Concert - Philharmonic'
    },
    description: {
      sr: 'Spektakularan koncert Banjalučke filharmonije sa djelima velikih majstora klasične muzike.',
      en: 'Spectacular concert by the Banja Luka Philharmonic featuring works by classical music masters.'
    },
    category: 'Koncerti',
    date: '2025-03-18',
    time: '19:00',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Banjalučka filharmonija',
      en: 'Banja Luka Philharmonic'
    },
    price: 30,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Parter', en: 'Orchestra' },
        price: 30,
        available: 120
      },
      {
        name: { sr: 'Balkon', en: 'Balcony' },
        price: 25,
        available: 80
      }
    ]
  },
  {
    id: '10',
    title: {
      sr: 'Folk koncert - Narodna muzika',
      en: 'Folk Concert - Traditional Music'
    },
    description: {
      sr: 'Večer posvećena tradicionalnoj folk muzici sa nastupom poznatih izvođača iz regije.',
      en: 'Evening dedicated to traditional folk music featuring renowned performers from the region.'
    },
    category: 'Koncerti',
    date: '2025-04-20',
    time: '20:00',
    location: {
      sr: 'Prijedor',
      en: 'Prijedor'
    },
    venue: {
      sr: 'KUD Prijedor',
      en: 'Cultural Center Prijedor'
    },
    price: 20,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Regularna karta', en: 'Regular Ticket' },
        price: 20,
        available: 200
      }
    ]
  },
  {
    id: '11',
    title: {
      sr: 'Pop koncert - Regionalne zvijezde',
      en: 'Pop Concert - Regional Stars'
    },
    description: {
      sr: 'Veliki pop koncert sa nastupom najpopularnijih izvođača sa Balkana.',
      en: 'Major pop concert featuring the most popular performers from the Balkans.'
    },
    category: 'Koncerti',
    date: '2025-05-15',
    time: '20:30',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Gradski stadion',
      en: 'City Stadium'
    },
    price: 50,
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    ticketTypes: [
      {
        name: { sr: 'Tribine', en: 'Stands' },
        price: 50,
        available: 300
      },
      {
        name: { sr: 'Parter', en: 'Floor' },
        price: 80,
        available: 150
      },
      {
        name: { sr: 'VIP', en: 'VIP' },
        price: 120,
        available: 50
      }
    ]
  },
  {
    id: '12',
    title: {
      sr: 'Festival uličnih izvođača',
      en: 'Street Performers Festival'
    },
    description: {
      sr: 'Međunarodni festival uličnih izvođača sa muzičarima, žonglerima i akrobatama.',
      en: 'International street performers festival featuring musicians, jugglers and acrobats.'
    },
    category: 'Festivali',
    date: '2025-06-01',
    time: '16:00',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Centar grada',
      en: 'City Center'
    },
    price: 10,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Dnevna karta', en: 'Day Pass' },
        price: 10,
        available: 400
      },
      {
        name: { sr: 'Porodična karta', en: 'Family Pass' },
        price: 30,
        available: 100
      }
    ]
  },
  {
    id: '13',
    title: {
      sr: 'Festival kratkog filma',
      en: 'Short Film Festival'
    },
    description: {
      sr: 'Takmičarski festival kratkih filmova mladih autora iz regije i šire.',
      en: 'Competitive festival of short films by young authors from the region and beyond.'
    },
    category: 'Festivali',
    date: '2025-04-25',
    time: '18:00',
    location: {
      sr: 'Prijedor',
      en: 'Prijedor'
    },
    venue: {
      sr: 'Bioskop Kozara',
      en: 'Kozara Cinema'
    },
    price: 12,
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Pojedinačna projekcija', en: 'Single Screening' },
        price: 8,
        available: 120
      },
      {
        name: { sr: 'Festival pass', en: 'Festival Pass' },
        price: 12,
        available: 50
      }
    ]
  },
  {
    id: '14',
    title: {
      sr: 'Mjuzikl "Mamma Mia"',
      en: 'Musical "Mamma Mia"'
    },
    description: {
      sr: 'Popularni mjuzikl baziran na hitovima grupe ABBA u izvedbi lokalnog ansambla.',
      en: 'Popular musical based on ABBA hits performed by a local ensemble.'
    },
    category: 'Predstave',
    date: '2025-03-12',
    time: '19:00',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Dom kulture Banja Luka',
      en: 'Cultural Center Banja Luka'
    },
    price: 28,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    ticketTypes: [
      {
        name: { sr: 'Parter', en: 'Orchestra' },
        price: 28,
        available: 100
      },
      {
        name: { sr: 'Balkon', en: 'Balcony' },
        price: 22,
        available: 80
      }
    ]
  },
  {
    id: '15',
    title: {
      sr: 'Dječja predstava "Mali princ"',
      en: 'Children\'s Play "The Little Prince"'
    },
    description: {
      sr: 'Čarobna dječja predstava prema djelu Antoine de Saint-Exupéryja.',
      en: 'Magical children\'s play based on the work by Antoine de Saint-Exupéry.'
    },
    category: 'Predstave',
    date: '2025-03-30',
    time: '17:00',
    location: {
      sr: 'Prijedor',
      en: 'Prijedor'
    },
    venue: {
      sr: 'Dječji kulturni centar',
      en: 'Children\'s Cultural Center'
    },
    price: 8,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Dječja karta', en: 'Children\'s Ticket' },
        price: 8,
        available: 150
      },
      {
        name: { sr: 'Odrasla karta', en: 'Adult Ticket' },
        price: 12,
        available: 100
      }
    ]
  },
  {
    id: '16',
    title: {
      sr: 'Konferencija o održivom razvoju',
      en: 'Sustainable Development Conference'
    },
    description: {
      sr: 'Stručna konferencija o održivom razvoju i ekološkim rješenjima za buducnost.',
      en: 'Professional conference on sustainable development and ecological solutions for the future.'
    },
    category: 'Konferencije',
    date: '2025-04-08',
    time: '09:00',
    location: {
      sr: 'Prijedor',
      en: 'Prijedor'
    },
    venue: {
      sr: 'Hotel Una',
      en: 'Hotel Una'
    },
    price: 60,
    image: 'https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Standardna karta', en: 'Standard Ticket' },
        price: 60,
        available: 100
      },
      {
        name: { sr: 'Studentska karta', en: 'Student Ticket' },
        price: 30,
        available: 50
      }
    ]
  },
  {
    id: '17',
    title: {
      sr: 'Sajam knjiga i izdavaštva',
      en: 'Book and Publishing Fair'
    },
    description: {
      sr: 'Godišnji sajam knjiga sa učešćem izdavača iz cijele zemlje i promocijama novih izdanja.',
      en: 'Annual book fair featuring publishers from across the country and new publication launches.'
    },
    category: 'Sajmovi',
    date: '2025-05-10',
    time: '10:00',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Biblioteka "Petar Kočić"',
      en: 'Library "Petar Kočić"'
    },
    price: 3,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Ulaznica', en: 'Entry Ticket' },
        price: 3,
        available: 300
      }
    ]
  },
  {
    id: '18',
    title: {
      sr: 'Radionica fotografije',
      en: 'Photography Workshop'
    },
    description: {
      sr: 'Jednodnevna radionica fotografije za početnike i amatere sa stručnim vodiče.',
      en: 'One-day photography workshop for beginners and amateurs with professional guides.'
    },
    category: 'Ostalo',
    date: '2025-04-15',
    time: '10:00',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Foto klub Banja Luka',
      en: 'Photo Club Banja Luka'
    },
    price: 40,
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    ticketTypes: [
      {
        name: { sr: 'Kompletan paket', en: 'Complete Package' },
        price: 40,
        available: 25
      }
    ]
  },
  // NEW YEAR EVENTS
  {
    id: '19',
    title: {
      sr: 'Novogodišnji koncert na trgu',
      en: 'New Year\'s Concert at the Square'
    },
    description: {
      sr: 'Veliki novogodišnji koncert na glavnom trgu sa domaćim izvođačima i spektakularnim vatrometom.',
      en: 'Grand New Year\'s concert at the main square featuring local performers and spectacular fireworks.'
    },
    category: 'Nova godina',
    date: '2025-12-31',
    time: '22:00',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Trg Krajine',
      en: 'Krajina Square'
    },
    price: 0,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    ticketTypes: [
      {
        name: { sr: 'Besplatan ulaz', en: 'Free Entry' },
        price: 0,
        available: 1000
      }
    ]
  },
  {
    id: '20',
    title: {
      sr: 'Novogodišnja zabava u hotelu',
      en: 'New Year\'s Hotel Party'
    },
    description: {
      sr: 'Elegantna novogodišnja zabava sa programom, večerom i plesom do jutarnjih sati.',
      en: 'Elegant New Year\'s party with entertainment, dinner and dancing until dawn.'
    },
    category: 'Nova godina',
    date: '2025-12-31',
    time: '20:00',
    location: {
      sr: 'Banja Luka',
      en: 'Banja Luka'
    },
    venue: {
      sr: 'Hotel Bosna',
      en: 'Hotel Bosna'
    },
    price: 150,
    image: 'https://images.unsplash.com/photo-1482575832494-771f74bf6cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    ticketTypes: [
      {
        name: { sr: 'Standardna karta', en: 'Standard Ticket' },
        price: 150,
        available: 200
      },
      {
        name: { sr: 'VIP paket', en: 'VIP Package' },
        price: 250,
        available: 50
      }
    ]
  }
];

export function searchEvents(query: string, limit?: number): EventData[] {
  const searchTerm = query.toLowerCase();
  const filtered = allEvents.filter(event =>
    event.title.sr.toLowerCase().includes(searchTerm) ||
    event.title.en.toLowerCase().includes(searchTerm) ||
    event.description.sr.toLowerCase().includes(searchTerm) ||
    event.description.en.toLowerCase().includes(searchTerm) ||
    event.category.toLowerCase().includes(searchTerm) ||
    event.location.sr.toLowerCase().includes(searchTerm) ||
    event.location.en.toLowerCase().includes(searchTerm) ||
    event.venue.sr.toLowerCase().includes(searchTerm) ||
    event.venue.en.toLowerCase().includes(searchTerm)
  );
  
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getEventById(id: string): EventData | undefined {
  return allEvents.find(event => event.id === id);
}

export function getEventsByCategory(category: string): EventData[] {
  return allEvents.filter(event => event.category === category);
}

export function getFeaturedEvents(): EventData[] {
  return allEvents.filter(event => event.featured);
}

export function getUpcomingEvents(): EventData[] {
  const now = new Date();
  return allEvents
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Helper function to get localized values (pure function, no hooks)
export function localizeEvent(event: EventData, language: 'sr' | 'en') {
  return {
    ...event,
    localizedTitle: event.title[language],
    localizedDescription: event.description[language],
    localizedLocation: event.location[language],
    localizedVenue: event.venue[language],
    localizedTicketTypes: event.ticketTypes.map(ticket => ({
      ...ticket,
      localizedName: ticket.name[language]
    }))
  };
}