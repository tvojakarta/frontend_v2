import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Calendar, MapPin, Clock, Users, ArrowLeft, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from './CartProvider';
import { toast } from 'sonner@2.0.3';
import { allEvents, localizeEvent } from './data/eventsData';
import { useLanguage } from './LanguageProvider';

interface EventDetailPageProps {
  eventId: string | null;
  onNavigate: (page: string) => void;
}

export function EventDetailPage({ eventId, onNavigate }: EventDetailPageProps) {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  
  // Helper function to format category names for translation keys
  const getCategoryTranslationKey = (category: string) => {
    return `category.${category.toLowerCase()}`;
  };
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});

  // Find the event from our data
  const foundEvent = allEvents.find(e => e.id === eventId);
  
  if (!foundEvent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl mb-4">{t('events.no_results')}</h1>
          <Button onClick={() => onNavigate('events')}>
            {t('common.back')} {t('nav.events')}
          </Button>
        </div>
      </div>
    );
  }

  const localizedEvent = localizeEvent(foundEvent, language);

  // Enhanced event data with additional details
  const event = {
    ...foundEvent,
    localizedTitle: localizedEvent.localizedTitle,
    localizedDescription: localizedEvent.localizedDescription,
    localizedLocation: localizedEvent.localizedLocation,
    localizedVenue: localizedEvent.localizedVenue,
    capacity: 15000,
    ticketsAvailable: 2450,
    organizer: language === 'sr' ? 'MusicEvents Inc.' : 'MusicEvents Inc.',
    longDescription: localizedEvent.localizedDescription + (language === 'sr' 
      ? ' Ovo je prošireni opis događaja koji sadrži više detalja o tome šta možete očekivati, ko će nastupati, i sve dodatne informacije koje su vam potrebne za donošenje odluke o kupovini karata.'
      : ' This is an extended event description containing more details about what you can expect, who will be performing, and all additional information you need to make a ticket purchase decision.'
    ),
    localizedTicketTypes: localizedEvent.localizedTicketTypes.map((ticket, index) => ({
      id: `ticket-${index}`,
      name: ticket.localizedName,
      price: ticket.price,
      description: language === 'sr' 
        ? index === 0 ? 'Standardan pristup događaju' : 'Poboljšano iskustvo sa dodatnim pogodnostima'
        : index === 0 ? 'Standard access to the event' : 'Enhanced experience with additional perks',
      available: ticket.available
    }))
  };

  const updateTicketQuantity = (ticketTypeId: string, change: number) => {
    const ticketType = event.localizedTicketTypes.find(t => t.id === ticketTypeId);
    if (!ticketType) return;

    const currentQuantity = selectedTickets[ticketTypeId] || 0;
    const newQuantity = Math.max(0, Math.min(currentQuantity + change, Math.min(ticketType.available, 8)));
    
    setSelectedTickets(prev => ({
      ...prev,
      [ticketTypeId]: newQuantity
    }));
  };

  const addSelectedTicketsToCart = () => {
    let totalAdded = 0;
    const ticketsToAdd: Array<Omit<CartItem, 'id'>> = [];
    
    // First, collect all tickets to add
    Object.entries(selectedTickets).forEach(([ticketTypeId, quantity]) => {
      if (quantity > 0) {
        const ticketType = event.localizedTicketTypes.find(t => t.id === ticketTypeId);
        if (ticketType) {
          ticketsToAdd.push({
            eventId: event.id,
            eventTitle: event.localizedTitle,
            ticketType: ticketType.name,
            price: ticketType.price,
            quantity,
            eventDate: event.date,
            eventImage: event.image
          });
          totalAdded += quantity;
        }
      }
    });

    // Then add all tickets to cart
    ticketsToAdd.forEach(ticket => {
      addToCart(ticket);
    });

    if (totalAdded > 0) {
      toast.success(t('message.success.added_to_cart'));
      setSelectedTickets({});
    }
  };

  const continueToPayment = () => {
    // Add selected tickets to cart first if any are selected
    if (getTotalSelected() > 0) {
      let totalAdded = 0;
      const ticketsToAdd: Array<Omit<CartItem, 'id'>> = [];
      
      // First, collect all tickets to add
      Object.entries(selectedTickets).forEach(([ticketTypeId, quantity]) => {
        if (quantity > 0) {
          const ticketType = event.localizedTicketTypes.find(t => t.id === ticketTypeId);
          if (ticketType) {
            ticketsToAdd.push({
              eventId: event.id,
              eventTitle: event.localizedTitle,
              ticketType: ticketType.name,
              price: ticketType.price,
              quantity,
              eventDate: event.date,
              eventImage: event.image
            });
            totalAdded += quantity;
          }
        }
      });

      // Then add all tickets to cart
      ticketsToAdd.forEach(ticket => {
        addToCart(ticket);
      });

      if (totalAdded > 0) {
        toast.success(t('message.success.added_to_cart'));
      }
      
      // Clear selected tickets after adding to cart
      setSelectedTickets({});
    }
    
    // Navigate to payment page
    onNavigate('payment');
  };

  const getTotalSelected = () => {
    return Object.values(selectedTickets).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketTypeId, quantity]) => {
      const ticketType = event.localizedTicketTypes.find(t => t.id === ticketTypeId);
      return total + (ticketType ? ticketType.price * quantity : 0);
    }, 0);
  };

  const hasSelectedTickets = getTotalSelected() > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => onNavigate('events')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t('common.back')} {t('nav.events')}
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Event Details */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="aspect-[16/9] relative overflow-hidden rounded-lg mb-6">
              <ImageWithFallback
                src={event.image}
                alt={event.localizedTitle}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4">
                {t(getCategoryTranslationKey(event.category))}
              </Badge>
            </div>

            <h1 className="text-4xl mb-4">{event.localizedTitle}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              {event.localizedDescription}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p>{t('event.date_time')}</p>
                    <p className="text-muted-foreground">
                      {new Date(event.date).toLocaleDateString(
                        language === 'sr' ? 'sr-RS' : 'en-US', 
                        { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }
                      )} {language === 'sr' ? 'u' : 'at'} {event.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p>{t('event.location')}</p>
                    <p className="text-muted-foreground">{event.localizedVenue}</p>
                    <p className="text-muted-foreground">{event.localizedLocation}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p>{language === 'sr' ? 'Kapacitet' : 'Capacity'}</p>
                    <p className="text-muted-foreground">
                      {event.ticketsAvailable} {language === 'sr' ? 'karata dostupno' : 'tickets available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p>{language === 'sr' ? 'Organizator' : 'Organizer'}</p>
                    <p className="text-muted-foreground">{event.organizer}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div>
              <h2 className="text-2xl mb-4">{t('event.description')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.longDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Ticket Selection */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>{t('event.select_ticket')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {event.localizedTicketTypes.map((ticketType) => (
                <div key={ticketType.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg">{ticketType.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {ticketType.description}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {ticketType.available} {t('event.available')}
                      </p>
                    </div>
                    <span className="text-xl">{ticketType.price} {t('common.currency')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateTicketQuantity(ticketType.id, -1)}
                        disabled={!selectedTickets[ticketType.id]}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg w-8 text-center">
                        {selectedTickets[ticketType.id] || 0}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateTicketQuantity(ticketType.id, 1)}
                        disabled={
                          (selectedTickets[ticketType.id] || 0) >= Math.min(ticketType.available, 8)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {selectedTickets[ticketType.id] > 0 && (
                      <span className="text-lg">
                        {(selectedTickets[ticketType.id] * ticketType.price)} {t('common.currency')}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {hasSelectedTickets && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>
                        {t('common.total')} ({getTotalSelected()} {language === 'sr' ? 'kart' : 'ticket'}{getTotalSelected() > 1 ? (language === 'sr' ? 'a' : 's') : ''})
                      </span>
                      <span className="text-xl">{getTotalPrice()} {t('common.currency')}</span>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons - Always visible */}
              <div className="space-y-2">
                <Button 
                  className="w-full"
                  onClick={continueToPayment}
                  disabled={!hasSelectedTickets}
                  variant={hasSelectedTickets ? "default" : "secondary"}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {t('event.continue_to_payment')}
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={addSelectedTicketsToCart}
                  disabled={!hasSelectedTickets}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t('event.add_to_cart')}
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>🔒 {t('cart.security.ssl')}</p>
                <p>📧 {t('cart.security.delivery')}</p>
                <p>🎫 {t('cart.security.mobile')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}