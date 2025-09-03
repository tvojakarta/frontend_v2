import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'sr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  sr: {
    // Navigation
    'nav.home': 'Početna',
    'nav.events': 'Događaji',
    'nav.cart': 'Korpa',
    'nav.contact': 'Kontakt',
    
    // Categories
    'category.koncerti': 'Koncerti',
    'category.festivali': 'Festivali',
    'category.predstave': 'Predstave',
    'category.konferencije': 'Konferencije',
    'category.sajmovi': 'Sajmovi',
    'category.nova godina': 'Nova godina',
    'category.ostalo': 'Ostalo',
    
    // Common
    'common.loading': 'Učitava...',
    'common.search': 'Pretraži',
    'common.filter': 'Filtriraj',
    'common.clear': 'Očisti',
    'common.cancel': 'Otkaži',
    'common.confirm': 'Potvrdi',
    'common.back': 'Nazad',
    'common.next': 'Sljedeće',
    'common.previous': 'Prethodno',
    'common.close': 'Zatvori',
    'common.save': 'Sačuvaj',
    'common.edit': 'Uredi',
    'common.delete': 'Obriši',
    'common.add': 'Dodaj',
    'common.remove': 'Ukloni',
    'common.view': 'Pogledaj',
    'common.download': 'Preuzmi',
    'common.share': 'Dijeli',
    'common.print': 'Štampaj',
    'common.email': 'Email',
    'common.phone': 'Telefon',
    'common.address': 'Adresa',
    'common.city': 'Grad',
    'common.date': 'Datum',
    'common.time': 'Vrijeme',
    'common.price': 'Cijena',
    'common.quantity': 'Količina',
    'common.total': 'Ukupno',
    'common.subtotal': 'Međuzbroj',
    'common.currency': 'KM',
    
    // Homepage
    'home.hero.title': 'Dobrodošli na Tvoja Karta',
    'home.hero.subtitle': 'Otkrijte najuzbudljivije događaje u Banja Luci i Prijedoru',
    'home.categories.title': 'Kategorije događaja',
    'home.featured.title': 'Istaknuti događaji',
    'home.upcoming.title': 'Nadolazeći događaji',
    
    // Events
    'events.title': 'Događaji',
    'events.search.placeholder': 'Pretraži događaje...',
    'events.filter.all': 'Svi događaji',
    'events.filter.category': 'Filtriraj po kategoriji',
    'events.filter.location': 'Filtriraj po lokaciji',
    'events.sort.date': 'Sortiraj po datumu',
    'events.sort.price': 'Sortiraj po cijeni',
    'events.sort.popularity': 'Sortiraj po popularnosti',
    'events.no_results': 'Nema rezultata',
    'events.load_more': 'Učitaj više',
    
    // Event Detail
    'event.details': 'Detalji događaja',
    'event.description': 'Opis',
    'event.location': 'Lokacija',
    'event.date_time': 'Datum i vrijeme',
    'event.tickets': 'Karte',
    'event.ticket_types': 'Tipovi karata',
    'event.select_ticket': 'Odaberite tip karte',
    'event.add_to_cart': 'Dodaj u korpu',
    'event.continue_to_payment': 'Nastavi na naplatu',
    'event.sold_out': 'Rasprodato',
    'event.available': 'Dostupno',
    'event.limited': 'Ograničeno',
    
    // Cart
    'cart.title': 'Korpa za kupovinu',
    'cart.empty': 'Vaša korpa je prazna',
    'cart.empty.description': 'Počnite da pregledate događaje da pronađete karte koje biste željeli kupiti',
    'cart.continue_shopping': 'Nastavi kupovinu',
    'cart.checkout': 'Nastavi na naplatu',
    'cart.clear': 'Očisti korpu',
    'cart.item.each': 'svaka',
    'cart.fees.service': 'Servisna naknada',
    'cart.fees.processing': 'Naknada za procesiranje',
    'cart.security.ssl': 'Sigurna 256-bit SSL enkripcija',
    'cart.security.cards': 'Prihvaćene sve glavne kreditne kartice',
    'cart.security.delivery': 'Trenutna dostava karata',
    'cart.security.mobile': 'QR kodovi prilagođeni mobilnim uređajima',
    
    // Payment
    'payment.title': 'Plaćanje',
    'payment.subtitle': 'Završite svoju kupovinu',
    'payment.billing': 'Podaci za naplatu',
    'payment.card_details': 'Podaci o kartici',
    'payment.first_name': 'Ime',
    'payment.last_name': 'Prezime',
    'payment.email': 'Email adresa',
    'payment.phone': 'Telefon',
    'payment.address': 'Adresa',
    'payment.city': 'Grad',
    'payment.postal_code': 'Poštanski kod',
    'payment.card_name': 'Ime na kartici',
    'payment.card_number': 'Broj kartice',
    'payment.expiry_date': 'Datum isteka',
    'payment.cvv': 'CVV',
    'payment.terms_accept': 'Prihvatam',
    'payment.terms_of_service': 'Uslove korišćenja',
    'payment.privacy_policy': 'Politiku privatnosti',
    'payment.newsletter': 'Želim da primam obaveštenja o novim događajima i posebnim ponudama',
    'payment.processing': 'Obrađuje se...',
    'payment.pay_now': 'Izvrši plaćanje',
    'payment.order_summary': 'Pregled narudžbe',
    'payment.secure': 'Sigurno plaćanje zaštićeno SSL enkripcijom',
    
    // Footer
    'footer.company': 'Tvoja Karta',
    'footer.description': 'Pouzdan, siguran i brz sistem za kupovinu karata za sve vrste događaja.',
    'footer.quick_links': 'Brze veze',
    'footer.categories': 'Kategorije',
    'footer.legal': 'Pravni dokumenti',
    'footer.follow_us': 'Pratite nas',
    'footer.contact_info': 'Kontakt informacije',
    'footer.rights': 'Sva prava zadržana.',
    'footer.privacy': 'Politika privatnosti',
    'footer.terms': 'Uslovi korišćenja',
    'footer.cookies': 'Politika kolačića',
    'footer.navigation': 'Navigacija',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter_description': 'Pretplatite se na naš newsletter da primite najnovije vijesti o događajima u blizini.',
    'footer.newsletter_placeholder': 'Unesite vašu email adresu',
    'footer.newsletter_subscribe': 'Pretplati se',
    'footer.support': 'Podrška',
    
    // Contact
    'contact.title': 'Kontaktirajte nas',
    'contact.subtitle': 'Imate pitanja? Rado ćemo vam pomoći!',
    'contact.form.name': 'Ime i prezime',
    'contact.form.email': 'Email adresa',
    'contact.form.subject': 'Predmet',
    'contact.form.message': 'Poruka',
    'contact.form.send': 'Pošaljite poruku',
    'contact.info.title': 'Kontakt informacije',
    'contact.info.address': 'Banja Luka, Bosnia and Herzegovina',
    'contact.info.phone': '+387 XX XXX XXX',
    'contact.info.email': 'info@tvojakarta.com',
    'contact.hours.title': 'Radno vrijeme',
    'contact.hours.weekdays': 'Ponedjeljak - Petak: 9:00 - 17:00',
    'contact.hours.weekend': 'Subota - Nedjelja: 10:00 - 16:00',
    
    // Messages
    'message.success.payment': 'Plaćanje je uspješno izvršeno! Vaše karte će biti poslane na email.',
    'message.success.added_to_cart': 'Dodano u korpu',
    'message.error.required_fields': 'Molimo popunite sva potrebna polja',
    'message.error.invalid_email': 'Unesite valjanu email adresu',
    'message.error.card_number': 'Broj kartice mora imati 16 cifara',
    'message.error.cvv': 'CVV mora imati 3 cifre',
    'message.error.terms': 'Morate prihvatiti Uslove korišćenja',
    'message.error.payment': 'Došlo je do greške prilikom plaćanja. Pokušajte ponovo.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.events': 'Events',
    'nav.cart': 'Cart',
    'nav.contact': 'Contact',
    
    // Categories
    'category.koncerti': 'Concerts',
    'category.festivali': 'Festivals',
    'category.predstave': 'Shows',
    'category.konferencije': 'Conferences',
    'category.sajmovi': 'Fairs',
    'category.nova godina': 'New Year',
    'category.ostalo': 'Other',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.view': 'View',
    'common.download': 'Download',
    'common.share': 'Share',
    'common.print': 'Print',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.address': 'Address',
    'common.city': 'City',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.price': 'Price',
    'common.quantity': 'Quantity',
    'common.total': 'Total',
    'common.subtotal': 'Subtotal',
    'common.currency': 'BAM',
    
    // Homepage
    'home.hero.title': 'Welcome to Tvoja Karta',
    'home.hero.subtitle': 'Discover the most exciting events in Banja Luka and Prijedor',
    'home.categories.title': 'Event Categories',
    'home.featured.title': 'Featured Events',
    'home.upcoming.title': 'Upcoming Events',
    
    // Events
    'events.title': 'Events',
    'events.search.placeholder': 'Search events...',
    'events.filter.all': 'All Events',
    'events.filter.category': 'Filter by Category',
    'events.filter.location': 'Filter by Location',
    'events.sort.date': 'Sort by Date',
    'events.sort.price': 'Sort by Price',
    'events.sort.popularity': 'Sort by Popularity',
    'events.no_results': 'No Results',
    'events.load_more': 'Load More',
    
    // Event Detail
    'event.details': 'Event Details',
    'event.description': 'Description',
    'event.location': 'Location',
    'event.date_time': 'Date & Time',
    'event.tickets': 'Tickets',
    'event.ticket_types': 'Ticket Types',
    'event.select_ticket': 'Select ticket type',
    'event.add_to_cart': 'Add to Cart',
    'event.continue_to_payment': 'Continue to Payment',
    'event.sold_out': 'Sold Out',
    'event.available': 'Available',
    'event.limited': 'Limited',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.empty.description': 'Start browsing events to find tickets you would like to purchase',
    'cart.continue_shopping': 'Continue Shopping',
    'cart.checkout': 'Proceed to Checkout',
    'cart.clear': 'Clear Cart',
    'cart.item.each': 'each',
    'cart.fees.service': 'Service Fee',
    'cart.fees.processing': 'Processing Fee',
    'cart.security.ssl': 'Secure 256-bit SSL encryption',
    'cart.security.cards': 'All major credit cards accepted',
    'cart.security.delivery': 'Instant ticket delivery',
    'cart.security.mobile': 'Mobile-friendly QR codes',
    
    // Payment
    'payment.title': 'Payment',
    'payment.subtitle': 'Complete your purchase',
    'payment.billing': 'Billing Information',
    'payment.card_details': 'Card Details',
    'payment.first_name': 'First Name',
    'payment.last_name': 'Last Name',
    'payment.email': 'Email Address',
    'payment.phone': 'Phone',
    'payment.address': 'Address',
    'payment.city': 'City',
    'payment.postal_code': 'Postal Code',
    'payment.card_name': 'Name on Card',
    'payment.card_number': 'Card Number',
    'payment.expiry_date': 'Expiry Date',
    'payment.cvv': 'CVV',
    'payment.terms_accept': 'I accept the',
    'payment.terms_of_service': 'Terms of Service',
    'payment.privacy_policy': 'Privacy Policy',
    'payment.newsletter': 'I want to receive notifications about new events and special offers',
    'payment.processing': 'Processing...',
    'payment.pay_now': 'Pay Now',
    'payment.order_summary': 'Order Summary',
    'payment.secure': 'Secure payment protected by SSL encryption',
    
    // Footer
    'footer.company': 'Tvoja Karta',
    'footer.description': 'Reliable, safe and fast system for buying tickets for all kinds of events.',
    'footer.quick_links': 'Quick Links',
    'footer.categories': 'Categories',
    'footer.legal': 'Legal',
    'footer.follow_us': 'Follow Us',
    'footer.contact_info': 'Contact Info',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.navigation': 'Navigation',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter_description': 'Subscribe to our newsletter to receive the latest news on events nearby.',
    'footer.newsletter_placeholder': 'Enter your email address',
    'footer.newsletter_subscribe': 'Subscribe',
    'footer.support': 'Support',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions? We\'d love to help!',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'Banja Luka, Bosnia and Herzegovina',
    'contact.info.phone': '+387 XX XXX XXX',
    'contact.info.email': 'info@tvojakarta.com',
    'contact.hours.title': 'Business Hours',
    'contact.hours.weekdays': 'Monday - Friday: 9:00 AM - 5:00 PM',
    'contact.hours.weekend': 'Saturday - Sunday: 10:00 AM - 4:00 PM',
    
    // Messages
    'message.success.payment': 'Payment successful! Your tickets will be sent to your email.',
    'message.success.added_to_cart': 'Added to cart',
    'message.error.required_fields': 'Please fill in all required fields',
    'message.error.invalid_email': 'Please enter a valid email address',
    'message.error.card_number': 'Card number must have 16 digits',
    'message.error.cvv': 'CVV must have 3 digits',
    'message.error.terms': 'You must accept the Terms of Service',
    'message.error.payment': 'An error occurred during payment. Please try again.',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('tvoja-karta-language');
    return (saved as Language) || 'sr';
  });

  useEffect(() => {
    localStorage.setItem('tvoja-karta-language', language);
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}