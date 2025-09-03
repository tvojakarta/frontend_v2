export const upcomingEvents = [
  {
    id: '1',
    title: 'Ljetni muzički festival 2025',
    date: '2025-08-15',
    time: '19:00',
    venue: 'Arena Centralni park',
    location: 'Banja Luka',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
    ticketType: 'VIP paket',
    quantity: 2,
    orderNumber: 'TK-2025-001',
    qrCode: 'QR123456789'
  },
  {
    id: '5',
    title: 'Jazz večer u Prijedoru',
    date: '2025-09-10',
    time: '20:00',
    venue: 'Kulturni centar',
    location: 'Prijedor',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    ticketType: 'Opći ulaz',
    quantity: 1,
    orderNumber: 'TK-2025-002',
    qrCode: 'QR987654321'
  }
];

export const orderHistory = [
  {
    id: '1',
    orderNumber: 'TK-2025-001',
    date: '2025-07-15',
    total: 298.00,
    status: 'Potvrđena',
    events: [
      {
        title: 'Ljetni muzički festival 2025',
        ticketType: 'VIP paket',
        quantity: 2,
        price: 134.00
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'TK-2025-002',
    date: '2025-07-20',
    total: 37.50,
    status: 'Potvrđena',
    events: [
      {
        title: 'Jazz večer u Prijedoru',
        ticketType: 'Opći ulaz',
        quantity: 1,
        price: 35.00
      }
    ]
  },
  {
    id: '3',
    orderNumber: 'TK-2025-003',
    date: '2025-06-10',
    total: 130.00,
    status: 'Završena',
    events: [
      {
        title: 'Rok koncert "Divlje jagode"',
        ticketType: 'Opći ulaz',
        quantity: 2,
        price: 65.00
      }
    ]
  },
  {
    id: '4',
    orderNumber: 'TK-2025-004',
    date: '2025-05-22',
    total: 40.00,
    status: 'Završena',
    events: [
      {
        title: 'Predstava "Gospođa ministarka"',
        ticketType: 'Opći ulaz',
        quantity: 2,
        price: 20.00
      }
    ]
  }
];

export const userProfile = {
  name: 'Marko Petrović',
  email: 'marko.petrovic@example.com',
  phone: '+387 65 123 456',
  address: 'Kralja Petra I 15, 78000 Banja Luka',
  joinDate: '2024-01-15'
};