import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { HomePage } from './components/HomePage';
import { EventsPage } from './components/EventsPage';
import { EventDetailPage } from './components/EventDetailPage';
import { CartPage } from './components/CartPage';
import { PaymentPage } from './components/PaymentPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { CookiePolicyPage } from './components/CookiePolicyPage';
import { ContactPage } from './components/ContactPage';
import { FAQPage } from './components/FAQPage';
import { AboutPage } from './components/AboutPage';
import { ThankYouPage } from './components/ThankYouPage';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { CartProvider } from './components/CartProvider';
import { LanguageProvider } from './components/LanguageProvider';

type Page = 'home' | 'events' | 'event-detail' | 'cart' | 'payment' | 'thank-you' | 'privacy-policy' | 'terms-of-service' | 'cookie-policy' | 'contact' | 'faq' | 'about';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  // Load cookie preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('tvoja-karta-cookie-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setCookiePreferences(parsed);
        
        // Initialize analytics if enabled
        if (parsed.analytics) {
          // Here you would initialize Google Analytics or other analytics tools
          console.log('Analytics initialized');
        }
        
        // Initialize marketing tools if enabled
        if (parsed.marketing) {
          // Here you would initialize marketing pixels, etc.
          console.log('Marketing tools initialized');
        }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  // Handle escape key to close desktop and mobile search
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDesktopSearchOpen) {
          setIsDesktopSearchOpen(false);
        }
        if (isMobileSearchOpen) {
          setIsMobileSearchOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isDesktopSearchOpen, isMobileSearchOpen]);

  // Handle click/touch outside to close desktop and mobile search
  useEffect(() => {
    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      if (!isDesktopSearchOpen && !isMobileSearchOpen) return;

      const target = e.target as Element;
      
      // Check if click/touch is inside header or search overlays
      const header = document.querySelector('[data-header]');
      const desktopSearchOverlay = document.querySelector('[data-search-overlay]');
      const mobileSearchOverlay = document.querySelector('[data-mobile-search-overlay]');
      
      const isInsideHeader = header && header.contains(target);
      const isInsideDesktopSearchOverlay = desktopSearchOverlay && desktopSearchOverlay.contains(target);
      const isInsideMobileSearchOverlay = mobileSearchOverlay && mobileSearchOverlay.contains(target);
      
      // Close search if interaction is outside header and all search overlays
      if (!isInsideHeader && !isInsideDesktopSearchOverlay && !isInsideMobileSearchOverlay) {
        if (isDesktopSearchOpen) {
          setIsDesktopSearchOpen(false);
        }
        if (isMobileSearchOpen) {
          setIsMobileSearchOpen(false);
        }
      }
    };

    // Add both mouse and touch event listeners
    document.addEventListener('mousedown', handleOutsideInteraction);
    document.addEventListener('touchstart', handleOutsideInteraction);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideInteraction);
      document.removeEventListener('touchstart', handleOutsideInteraction);
    };
  }, [isDesktopSearchOpen, isMobileSearchOpen]);

  const navigate = useCallback((page: Page, eventId?: string) => {
    setCurrentPage(page);
    if (eventId) setSelectedEventId(eventId);
    setIsDesktopSearchOpen(false); // Close desktop search when navigating
    setIsMobileSearchOpen(false); // Close mobile search when navigating
    
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setSelectedCategory(''); // Clear category when searching
    setCurrentPage('events');
    setIsDesktopSearchOpen(false); // Close desktop search when search is performed
    setIsMobileSearchOpen(false); // Close mobile search when search is performed
  }, []);

  const handleCategoryFilter = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search when filtering by category
    setCurrentPage('events');
  }, []);

  const toggleDesktopSearch = useCallback(() => {
    setIsDesktopSearchOpen(prev => !prev);
  }, []);

  const closeDesktopSearch = useCallback(() => {
    setIsDesktopSearchOpen(false);
  }, []);

  const toggleMobileSearch = useCallback(() => {
    setIsMobileSearchOpen(prev => !prev);
  }, []);

  const closeMobileSearch = useCallback(() => {
    setIsMobileSearchOpen(false);
  }, []);

  const handleCookiePreferencesChange = useCallback((preferences: CookiePreferences) => {
    setCookiePreferences(prevPreferences => {
      // Handle analytics initialization/removal
      if (preferences.analytics && !prevPreferences.analytics) {
        // Initialize analytics
        console.log('Analytics enabled');
      } else if (!preferences.analytics && prevPreferences.analytics) {
        // Remove analytics
        console.log('Analytics disabled');
      }
      
      // Handle marketing tools initialization/removal
      if (preferences.marketing && !prevPreferences.marketing) {
        // Initialize marketing tools
        console.log('Marketing tools enabled');
      } else if (!preferences.marketing && prevPreferences.marketing) {
        // Remove marketing tools
        console.log('Marketing tools disabled');
      }
      
      return preferences;
    });
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigate={navigate} 
            onCategoryFilter={handleCategoryFilter}
          />
        );
      case 'events':
        return (
          <EventsPage 
            onNavigate={navigate} 
            initialSearchTerm={searchTerm}
            selectedCategory={selectedCategory}
          />
        );
      case 'event-detail':
        return <EventDetailPage eventId={selectedEventId} onNavigate={navigate} />;
      case 'cart':
        return <CartPage onNavigate={navigate} />;
      case 'payment':
        return <PaymentPage onNavigate={navigate} />;
      case 'thank-you':
        return <ThankYouPage onNavigate={navigate} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage onNavigate={navigate} />;
      case 'terms-of-service':
        return <TermsOfServicePage onNavigate={navigate} />;
      case 'cookie-policy':
        return <CookiePolicyPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage onNavigate={navigate} />;
      case 'faq':
        return <FAQPage onNavigate={navigate} />;
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      default:
        return (
          <HomePage 
            onNavigate={navigate} 
            onCategoryFilter={handleCategoryFilter}
          />
        );
    }
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Header 
            onNavigate={navigate} 
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            isDesktopSearchOpen={isDesktopSearchOpen}
            onDesktopSearchToggle={toggleDesktopSearch}
            isMobileSearchOpen={isMobileSearchOpen}
            onMobileSearchToggle={toggleMobileSearch}
            onMobileSearchClose={closeMobileSearch}
          />
          
          {/* Desktop Search Overlay */}
          {isDesktopSearchOpen && (
            <div 
              className="fixed top-16 left-0 right-0 z-40 hidden md:block" 
              data-search-overlay
            >
              <SearchBar 
                onSearch={handleSearch}
                onNavigate={navigate}
                onClose={closeDesktopSearch}
              />
            </div>
          )}
          
          <main className="pt-16 flex-1">
            {renderPage()}
          </main>
          <Footer 
            onNavigate={navigate}
            onCategoryFilter={handleCategoryFilter}
          />
          <CookieConsent onPreferencesChange={handleCookiePreferencesChange} />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}