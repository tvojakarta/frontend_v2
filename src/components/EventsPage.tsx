import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { allEvents, categories, locations, localizeEvent } from './data/eventsData';
import { useLanguage } from './LanguageProvider';

interface EventsPageProps {
  onNavigate: (page: string, eventId?: string) => void;
  initialSearchTerm?: string;
  selectedCategory?: string;
}

export function EventsPage({ onNavigate, initialSearchTerm = '', selectedCategory = '' }: EventsPageProps) {
  const { t, language } = useLanguage();
  
  // Helper function to format category names for translation keys
  const getCategoryTranslationKey = (category: string) => {
    return `category.${category.toLowerCase()}`;
  };
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Update search term when initialSearchTerm changes
  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
      setActiveCategory('');
    }
  }, [initialSearchTerm]);

  // Update category when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
      setSearchTerm('');
    }
  }, [selectedCategory]);

  const allCategories = ['all', ...categories];
  const allLocations = ['all', ...locations];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = searchTerm ? (
      event.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) : true;
    
    const matchesCategory = activeCategory === 'all' || !activeCategory || event.category === activeCategory;
    const matchesLocation = selectedLocation === 'all' || event.location[language] === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'title':
        return a.title[language].localeCompare(b.title[language]);
      default:
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    setSelectedLocation('all');
  };

  const getPageTitle = () => {
    if (initialSearchTerm) {
      return language === 'sr' 
        ? `Rezultati pretrage za: "${initialSearchTerm}"`
        : `Search results for: "${initialSearchTerm}"`;
    }
    if (selectedCategory) {
      return t(getCategoryTranslationKey(selectedCategory));
    }
    return t('events.title');
  };

  const getPageSubtitle = () => {
    if (initialSearchTerm) {
      return language === 'sr'
        ? `Pronađeno ${filteredEvents.length} događaj${filteredEvents.length !== 1 ? 'a' : ''}`
        : `Found ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`;
    }
    if (selectedCategory) {
      return language === 'sr'
        ? `Otkrijte najbolje ${t(getCategoryTranslationKey(selectedCategory)).toLowerCase()} u vašoj blizini`
        : `Discover the best ${t(getCategoryTranslationKey(selectedCategory)).toLowerCase()} near you`;
    }
    return language === 'sr'
      ? 'Otkrijte nevjerovatne događaje koji se dešavaju u vašoj blizini'
      : 'Discover amazing events happening near you';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-4">{getPageTitle()}</h1>
        <p className="text-xl text-muted-foreground">
          {getPageSubtitle()}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t('events.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={activeCategory || 'all'} onValueChange={setActiveCategory}>
            <SelectTrigger>
              <SelectValue placeholder={t('events.filter.category')} />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' 
                    ? t('events.filter.all') 
                    : t(getCategoryTranslationKey(category))
                  }
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder={t('events.filter.location')} />
            </SelectTrigger>
            <SelectContent>
              {allLocations.map(location => (
                <SelectItem key={location} value={location}>
                  {location === 'all' 
                    ? (language === 'sr' ? 'Sve lokacije' : 'All Locations')
                    : location
                  }
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'sr' ? 'Sortiraj po' : 'Sort by'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">{t('events.sort.date')}</SelectItem>
              <SelectItem value="price-low">
                {language === 'sr' ? 'Cijena: od najniže' : 'Price: Low to High'}
              </SelectItem>
              <SelectItem value="price-high">
                {language === 'sr' ? 'Cijena: od najviše' : 'Price: High to Low'}
              </SelectItem>
              <SelectItem value="title">
                {language === 'sr' ? 'Sortiraj po naslovu' : 'Sort by Title'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              {language === 'sr' 
                ? `Prikazano ${filteredEvents.length} od ${allEvents.length} događaja`
                : `Showing ${filteredEvents.length} of ${allEvents.length} events`
              }
            </span>
          </div>
          
          {(searchTerm || (activeCategory && activeCategory !== 'all') || selectedLocation !== 'all') && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              {language === 'sr' ? 'Očisti filtere' : 'Clear Filters'}
            </Button>
          )}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
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
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{localizedEvent.localizedTitle}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {localizedEvent.localizedDescription}
                </p>
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

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl mb-2">{t('events.no_results')}</h3>
          <p className="text-muted-foreground mb-4">
            {language === 'sr'
              ? 'Pokušajte da prilagodite kriterije pretrage ili pregledajte sve događaje'
              : 'Try adjusting your search criteria or browse all events'
            }
          </p>
          <Button onClick={clearFilters}>
            {language === 'sr' ? 'Očisti filtere' : 'Clear Filters'}
          </Button>
        </div>
      )}
    </div>
  );
}