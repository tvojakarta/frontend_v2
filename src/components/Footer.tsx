import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Mail, Facebook, Instagram, Send } from 'lucide-react';
import { categories } from './data/eventsData';
import { useLanguage } from './LanguageProvider';
import { toast } from 'sonner@2.0.3';

// TikTok icon component since Lucide doesn't have it
const TikTokIcon = () => (
  <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

interface FooterProps {
  onNavigate: (page: string) => void;
  onCategoryFilter: (category: string) => void;
}

export function Footer({ onNavigate, onCategoryFilter }: FooterProps) {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  // Helper function to format category names for translation keys
  const getCategoryTranslationKey = (category: string) => {
    return `category.${category.toLowerCase()}`;
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error(language === 'sr' ? 'Unesite email adresu' : 'Please enter an email address');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast.error(language === 'sr' ? 'Unesite valjanu email adresu' : 'Please enter a valid email address');
      return;
    }

    // Simulate newsletter subscription
    toast.success(language === 'sr' ? 'Uspješno ste se pretplatili na newsletter!' : 'Successfully subscribed to newsletter!');
    setNewsletterEmail('');
  };

  const navigationLinks = [
    { label: t('nav.home'), action: () => onNavigate('home') },
    { label: t('nav.events'), action: () => onNavigate('events') },
    { label: t('footer.support'), action: () => onNavigate('faq') },
    { label: t('nav.contact'), action: () => onNavigate('contact') },
    { label: t('nav.cart'), action: () => onNavigate('cart') }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      label: 'Facebook', 
      href: 'https://facebook.com/tvojakarta.com' 
    },
    { 
      icon: Instagram, 
      label: 'Instagram', 
      href: 'https://instagram.com/tvojakarta.com' 
    },
    { 
      icon: TikTokIcon, 
      label: 'TikTok', 
      href: 'https://www.tiktok.com/@tvojakarta.com' 
    }
  ];

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info - First Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-semibold">Tvoja Karta</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm">
              {t('footer.description')}
            </p>
            
            {/* Contact & Social Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@tvojakarta.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  info@tvojakarta.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Instagram className="h-4 w-4 text-primary" />
                <a href="https://instagram.com/tvojakarta.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  tvojakarta.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Facebook className="h-4 w-4 text-primary" />
                <a href="https://facebook.com/tvojakarta.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Tvoja Karta
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <TikTokIcon />
                <a href="https://www.tiktok.com/@tvojakarta" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  @tvojakarta
                </a>
              </div>
            </div>
          </div>

          {/* Navigation - Second Column */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={link.action}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - Third Column */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('footer.newsletter_description')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder={t('footer.newsletter_placeholder')}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} Tvoja Karta. {t('footer.rights')}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <Button
              variant="ghost"
              className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => onNavigate('privacy-policy')}
            >
              {t('footer.privacy')}
            </Button>
            <Button
              variant="ghost"
              className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => onNavigate('terms-of-service')}
            >
              {t('footer.terms')}
            </Button>
            <Button
              variant="ghost"
              className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => onNavigate('cookie-policy')}
            >
              {t('footer.cookies')}
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="grid md:grid-cols-2 gap-6 text-xs text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">
                {language === 'sr' ? 'Sigurnost plaćanja' : 'Payment Security'}
              </h4>
              <p>
                {language === 'sr' 
                  ? 'Sva plaćanja se obrađuju preko sigurnih SSL konekcija. Vaši podaci o platnim karticama se ne čuvaju na našim serverima.'
                  : 'All payments are processed through secure SSL connections. Your payment card data is not stored on our servers.'
                }
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">
                {language === 'sr' ? 'Elektronske karte' : 'Electronic Tickets'}
              </h4>
              <p>
                {language === 'sr'
                  ? 'Sve karte se dostavljaju elektronski na vašu email adresu odmah nakon uspješne kupovine. Molimo sačuvajte vaše karte za ulaz na događaj.'
                  : 'All tickets are delivered electronically to your email address immediately after successful purchase. Please save your tickets for event entry.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}