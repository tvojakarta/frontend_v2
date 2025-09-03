import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Calendar, MapPin, X } from 'lucide-react';
import { Input } from './ui/input';
import { searchEvents, EventData } from './data/eventsData';
import { useLanguage } from './LanguageProvider';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onNavigate: (page: string, eventId?: string) => void;
  onClose?: () => void;
}

export function SearchBar({ onSearch, onNavigate, onClose }: SearchBarProps) {
  const { t, language } = useLanguage();
  
  // Helper function to format category names for translation keys
  const getCategoryTranslationKey = (category: string) => {
    return `category.${category.toLowerCase()}`;
  };
  
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<EventData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle search input changes and update suggestions
  useEffect(() => {
    if (searchInput.trim().length > 0) {
      const results = searchEvents(searchInput, 5);
      setSuggestions(results);
      setShowSuggestions(true);
      setSelectedSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  }, [searchInput]);

  // Focus search input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput('');
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      inputRef.current?.blur();
      if (onClose) onClose();
    }
  };

  const handleSuggestionClick = (event: EventData) => {
    setSearchInput('');
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    onNavigate('event-detail', event.id);
    inputRef.current?.blur();
    if (onClose) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Escape') {
        setSearchInput('');
        inputRef.current?.blur();
        if (onClose) onClose();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          handleSearchSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        setSearchInput('');
        inputRef.current?.blur();
        if (onClose) onClose();
        break;
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
              <Input 
                ref={inputRef}
                placeholder={t('events.search.placeholder')}
                className="pl-12 pr-12 h-12 text-base"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              {onClose && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {searchInput && !onClose && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </form>
            
            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {suggestions.map((event, index) => (
                  <button
                    key={event.id}
                    className={`w-full p-4 text-left hover:bg-muted transition-colors border-b last:border-b-0 ${
                      index === selectedSuggestionIndex ? 'bg-muted' : ''
                    }`}
                    onClick={() => handleSuggestionClick(event)}
                    onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={event.image} 
                          alt={event.title[language]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium truncate mb-1">{event.title[language]}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(event.date).toLocaleDateString(language === 'sr' ? 'sr-RS' : 'en-US')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="truncate">{event.location[language]}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {t(getCategoryTranslationKey(event.category))}
                          </Badge>
                          <div className="text-base font-medium">{event.price} {t('common.currency')}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
                
                {searchInput.trim() && (
                  <button
                    className="w-full p-4 text-left hover:bg-muted transition-colors border-t text-primary"
                    onClick={(e) => handleSearchSubmit(e)}
                  >
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span>{language === 'sr' ? `Pretraži sve za "${searchInput}"` : `Search all for "${searchInput}"`}</span>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}