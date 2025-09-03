import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Star, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EventsBanner } from './EventsBanner';
import { allEvents, localizeEvent, getEventsByCategory } from './data/eventsData';
import { useLanguage } from './LanguageProvider';

interface HomePageProps {
  onNavigate: (page: string, eventId?: string) => void;
  onCategoryFilter?: (category: string) => void;
}

export function HomePage({ onNavigate, onCategoryFilter }: HomePageProps) {
  const { t, language } = useLanguage();
  
  // Helper function to format category names for translation keys
  const getCategoryTranslationKey = (category: string) => {
    return `category.${category.toLowerCase()}`;
  };

  // Get featured events from our data (first 3)
  const featuredEvents = allEvents.slice(0, 3).map(event => ({
    ...event,
    featured: true
  }));

  const categoryData = [
    { 
      name: 'Koncerti', 
      icon: '🎵', 
      count: allEvents.filter(e => e.category === 'Koncerti').length,
      translatedName: t('category.koncerti')
    },
    { 
      name: 'Festivali', 
      icon: '🎪', 
      count: allEvents.filter(e => e.category === 'Festivali').length,
      translatedName: t('category.festivali')
    },
    { 
      name: 'Predstave', 
      icon: '🎭', 
      count: allEvents.filter(e => e.category === 'Predstave').length,
      translatedName: t('category.predstave')
    },
    { 
      name: 'Konferencije', 
      icon: '📊', 
      count: allEvents.filter(e => e.category === 'Konferencije').length,
      translatedName: t('category.konferencije')
    },
    { 
      name: 'Sajmovi', 
      icon: '🛍️', 
      count: allEvents.filter(e => e.category === 'Sajmovi').length,
      translatedName: t('category.sajmovi')
    },
    { 
      name: 'Nova godina', 
      icon: '🎆', 
      count: allEvents.filter(e => e.category === 'Nova godina').length,
      translatedName: t('category.nova godina')
    },
    { 
      name: 'Ostalo', 
      icon: '🎯', 
      count: allEvents.filter(e => e.category === 'Ostalo').length,
      translatedName: t('category.ostalo')
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    if (onCategoryFilter) {
      onCategoryFilter(categoryName);
    } else {
      onNavigate('events');
    }
  };

  return (
    <div>
      {/* Events Banner - Replaces Hero Section */}
      <EventsBanner onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-3xl mb-6">{t('home.categories.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {categoryData.map((category) => (
              <Card 
                key={category.name}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="mb-1">{category.translatedName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} {language === 'sr' ? `događaj${category.count !== 1 ? 'a' : ''}` : `event${category.count !== 1 ? 's' : ''}`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Events */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-6 w-6 text-yellow-500" />
            <h2 className="text-3xl">{t('home.featured.title')}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => {
              const localizedEvent = localizeEvent(event, language);
              return (
                <Card 
                  key={event.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                  onClick={() => onNavigate('event-detail', event.id)}
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={localizedEvent.localizedTitle}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3">
                      {t(getCategoryTranslationKey(event.category))}
                    </Badge>
                    {event.featured && (
                      <Badge variant="destructive" className="absolute top-3 right-3">
                        {language === 'sr' ? 'Istaknuto' : 'Featured'}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{localizedEvent.localizedTitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString(language === 'sr' ? 'sr-RS' : 'en-US')} {language === 'sr' ? 'u' : 'at'} {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{localizedEvent.localizedVenue}, {localizedEvent.localizedLocation}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl">{event.price} {t('common.currency')}</span>
                      <Button size="sm">
                        {language === 'sr' ? 'Nabavi karte' : 'Get Tickets'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <h2 className="text-3xl">
              {language === 'sr' ? 'Trenutno popularno' : 'Currently Popular'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl mb-4">
                🔥 {language === 'sr' ? 'Najpopularnije ove sedmice' : 'Most Popular This Week'}
              </h3>
              <div className="space-y-3">
                {featuredEvents.slice(0, 3).map((event, index) => {
                  const localizedEvent = localizeEvent(event, language);
                  return (
                    <div 
                      key={event.id} 
                      className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded"
                      onClick={() => onNavigate('event-detail', event.id)}
                    >
                      <span className="text-lg">{index + 1}</span>
                      <div className="flex-1">
                        <p className="line-clamp-1">{localizedEvent.localizedTitle}</p>
                        <p className="text-sm text-muted-foreground">{localizedEvent.localizedLocation}</p>
                      </div>
                      <Badge variant="outline">{event.price} {t('common.currency')}</Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
              <h3 className="text-xl mb-4">
                ✨ {language === 'sr' ? 'Zašto odabrati Tvoju Kartu?' : 'Why Choose Tvoja Karta?'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</div>
                  <div>
                    <p>{language === 'sr' ? 'Trenutna dostava karata' : 'Instant ticket delivery'}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'sr' ? 'Dobijte svoje karte odmah putem email-a' : 'Get your tickets instantly via email'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</div>
                  <div>
                    <p>{language === 'sr' ? 'Sigurno procesuiranje plaćanja' : 'Secure payment processing'}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'sr' ? 'Vaše informacije o plaćanju su uvijek zaštićene' : 'Your payment information is always protected'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</div>
                  <div>
                    <p>{language === 'sr' ? '24/7 korisnička podrška' : '24/7 customer support'}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'sr' ? 'Tu smo da pomognemo kada je potrebno' : 'We\'re here to help when you need it'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Category Sections */}
        {categoryData.filter(cat => cat.count > 0).map((category) => {
          const categoryEvents = allEvents.filter(e => e.category === category.name).slice(0, 4);
          if (categoryEvents.length === 0) return null;
          
          return (
            <div key={category.name} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-2xl">{category.translatedName}</h2>
                  <Badge variant="secondary" className="ml-2">
                    {category.count} {language === 'sr' ? `događaj${category.count !== 1 ? 'a' : ''}` : `event${category.count !== 1 ? 's' : ''}`}
                  </Badge>
                </div>
                {category.count > 4 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {language === 'sr' ? 'Vidi sve' : 'View All'}
                  </Button>
                )}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryEvents.map((event) => {
                  const localizedEvent = localizeEvent(event, language);
                  return (
                    <Card 
                      key={event.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                      onClick={() => onNavigate('event-detail', event.id)}
                    >
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <ImageWithFallback
                          src={event.image}
                          alt={localizedEvent.localizedTitle}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {event.featured && (
                          <Badge variant="destructive" className="absolute top-3 right-3">
                            {language === 'sr' ? 'Istaknuto' : 'Featured'}
                          </Badge>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base line-clamp-2">{localizedEvent.localizedTitle}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(event.date).toLocaleDateString(language === 'sr' ? 'sr-RS' : 'en-US')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">{localizedEvent.localizedLocation}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-lg">{event.price === 0 ? (language === 'sr' ? 'Besplatno' : 'Free') : `${event.price} KM`}</span>
                          <Button size="sm">
                            {language === 'sr' ? 'Rezerviši' : 'Book Now'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}