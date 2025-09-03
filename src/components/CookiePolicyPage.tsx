import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Cookie, ArrowLeft, Settings } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface CookiePolicyPageProps {
  onNavigate: (page: string) => void;
}

export function CookiePolicyPage({ onNavigate }: CookiePolicyPageProps) {
  const { language } = useLanguage();

  const openCookieSettings = () => {
    // Trigger the cookie consent modal to open in preferences mode
    const event = new CustomEvent('openCookieSettings');
    window.dispatchEvent(event);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === 'sr' ? 'Nazad na početnu' : 'Back to home'}
        </Button>
        
        <div className="flex items-center gap-3 mb-4">
          <Cookie className="h-8 w-8 text-primary" />
          <h1 className="text-4xl">
            {language === 'sr' ? 'Politika kolačića' : 'Cookie Policy'}
          </h1>
        </div>
        <p className="text-muted-foreground">
          {language === 'sr' 
            ? `Poslednja izmjena: ${new Date().toLocaleDateString('sr-RS')}`
            : `Last updated: ${new Date().toLocaleDateString('en-US')}`
          }
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? 'Šta su kolačići?' : 'What are cookies?'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Kolačići su mali tekstualni fajlovi koji se postavljaju na vaš uređaj (računar, telefon, tablet) kada posetite web stranicu. Oni omogućavaju stranici da "zapamti" vaše djelovanje i preferencije kroz određeni period vremena.'
                : 'Cookies are small text files that are placed on your device (computer, phone, tablet) when you visit a website. They allow the site to "remember" your actions and preferences over a certain period of time.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? 'Kako koristimo kolačiće' : 'How we use cookies'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Tvoja Karta koristi kolačiće da poboljša vaše iskustvo korišćenja naše platforme, analizira saobraćaj i personalizuje sadržaj. Možete upravljati postavkama kolačića u bilo kom trenutku.'
                : 'Tvoja Karta uses cookies to improve your experience using our platform, analyze traffic and personalize content. You can manage cookie settings at any time.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? 'Tipovi kolačića koje koristimo' : 'Types of cookies we use'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">
                  {language === 'sr' ? 'Neophodni kolačići' : 'Necessary cookies'}
                </h4>
                <Badge variant="destructive" className="text-xs">
                  {language === 'sr' ? 'Obavezno' : 'Required'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {language === 'sr'
                  ? 'Ovi kolačići su neophodni za osnovno funkcionisanje stranice i ne mogu se onemogućiti.'
                  : 'These cookies are necessary for the basic functioning of the site and cannot be disabled.'
                }
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>{language === 'sr' ? 'Svrha:' : 'Purpose:'}</strong> {language === 'sr' ? 'Održavanje sesije, sigurnost, osnovne funkcionalnosti' : 'Session maintenance, security, basic functionality'}</div>
                <div><strong>{language === 'sr' ? 'Trajanje:' : 'Duration:'}</strong> {language === 'sr' ? 'Sesija ili do 1 godina' : 'Session or up to 1 year'}</div>
                <div><strong>{language === 'sr' ? 'Primjeri:' : 'Examples:'}</strong> {language === 'sr' ? 'Košarica, prijava, CSRF zaštita' : 'Cart, login, CSRF protection'}</div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">
                  {language === 'sr' ? 'Funkcionalni kolačići' : 'Functional cookies'}
                </h4>
                <Badge variant="secondary" className="text-xs">
                  {language === 'sr' ? 'Opciono' : 'Optional'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {language === 'sr'
                  ? 'Omogućavaju poboljšane funkcionalnosti i personalizaciju stranice.'
                  : 'Enable enhanced functionality and site personalization.'
                }
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>{language === 'sr' ? 'Svrha:' : 'Purpose:'}</strong> {language === 'sr' ? 'Pamćenje preferencija, jezičke postavke, tema' : 'Remembering preferences, language settings, theme'}</div>
                <div><strong>{language === 'sr' ? 'Trajanje:' : 'Duration:'}</strong> {language === 'sr' ? 'Do 1 godine' : 'Up to 1 year'}</div>
                <div><strong>{language === 'sr' ? 'Primjeri:' : 'Examples:'}</strong> {language === 'sr' ? 'Jezik, tema, lokacija' : 'Language, theme, location'}</div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">
                  {language === 'sr' ? 'Analitički kolačići' : 'Analytics cookies'}
                </h4>
                <Badge variant="secondary" className="text-xs">
                  {language === 'sr' ? 'Opciono' : 'Optional'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {language === 'sr'
                  ? 'Pomažu nam da razumijemo kako posetitelji koriste našu stranicu.'
                  : 'Help us understand how visitors use our site.'
                }
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>{language === 'sr' ? 'Svrha:' : 'Purpose:'}</strong> {language === 'sr' ? 'Analiza saobraćaja, statistike korišćenja' : 'Traffic analysis, usage statistics'}</div>
                <div><strong>{language === 'sr' ? 'Trajanje:' : 'Duration:'}</strong> {language === 'sr' ? 'Do 2 godina' : 'Up to 2 years'}</div>
                <div><strong>{language === 'sr' ? 'Primjeri:' : 'Examples:'}</strong> {language === 'sr' ? 'Google Analytics, interne statistike' : 'Google Analytics, internal statistics'}</div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">
                  {language === 'sr' ? 'Marketing kolačići' : 'Marketing cookies'}
                </h4>
                <Badge variant="secondary" className="text-xs">
                  {language === 'sr' ? 'Opciono' : 'Optional'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {language === 'sr'
                  ? 'Koriste se za prikazivanje relevantnih reklama i mjerenje efikasnosti kampanja.'
                  : 'Used to display relevant ads and measure campaign effectiveness.'
                }
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>{language === 'sr' ? 'Svrha:' : 'Purpose:'}</strong> {language === 'sr' ? 'Personalizovane reklame, praćenje konverzija' : 'Personalized ads, conversion tracking'}</div>
                <div><strong>{language === 'sr' ? 'Trajanje:' : 'Duration:'}</strong> {language === 'sr' ? 'Do 1 godine' : 'Up to 1 year'}</div>
                <div><strong>{language === 'sr' ? 'Primjeri:' : 'Examples:'}</strong> {language === 'sr' ? 'Facebook Pixel, Google Ads' : 'Facebook Pixel, Google Ads'}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? 'Kolačići treći strana' : 'Third-party cookies'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === 'sr'
                ? 'Neki kolačići postavljaju treći strane koje koristimo za poboljšanje naših usluga:'
                : 'Some cookies are set by third parties we use to improve our services:'
              }
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold">Google Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'sr'
                    ? 'Analiza saobraćaja i ponašanja korisnika.'
                    : 'Traffic analysis and user behavior tracking.'
                  }
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                     className="text-primary hover:underline ml-1">
                    {language === 'sr' ? 'Politika privatnosti Google-a' : 'Google Privacy Policy'}
                  </a>
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold">
                  {language === 'sr' ? 'Procesori plaćanja' : 'Payment Processors'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'sr'
                    ? 'Kolačići potrebni za sigurno procesiranje plaćanja preko Stripe, PayPal i drugih provajdera.'
                    : 'Cookies required for secure payment processing through Stripe, PayPal and other providers.'
                  }
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold">
                  {language === 'sr' ? 'Društvene mreže' : 'Social Media'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'sr'
                    ? 'Kolačići za dijeljenje sadržaja na društvenim mrežama (Facebook, Twitter, Instagram).'
                    : 'Cookies for sharing content on social networks (Facebook, Twitter, Instagram).'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? 'Upravljanje kolačićima' : 'Managing cookies'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">
                  {language === 'sr' ? 'Postavke kolačića na stranici' : 'Cookie settings on site'}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {language === 'sr'
                  ? 'Možete upravljati svojim preferencijama kolačića direktno na našoj stranici.'
                  : 'You can manage your cookie preferences directly on our site.'
                }
              </p>
              <Button size="sm" variant="outline" onClick={openCookieSettings}>
                {language === 'sr' ? 'Otvori postavke kolačića' : 'Open cookie settings'}
              </Button>
            </div>

            <h4 className="font-semibold">
              {language === 'sr' ? 'Postavke preglednika:' : 'Browser settings:'}
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Chrome:</strong>
                <p className="text-muted-foreground">
                  {language === 'sr' ? 'Postavke → Privatnost i sigurnost → Kolačići' : 'Settings → Privacy and security → Cookies'}
                </p>
              </div>
              <div>
                <strong>Firefox:</strong>
                <p className="text-muted-foreground">
                  {language === 'sr' ? 'Opcije → Privatnost i sigurnost → Kolačići' : 'Options → Privacy & Security → Cookies'}
                </p>
              </div>
              <div>
                <strong>Safari:</strong>
                <p className="text-muted-foreground">
                  {language === 'sr' ? 'Preferencije → Privatnost → Kolačići' : 'Preferences → Privacy → Cookies'}
                </p>
              </div>
              <div>
                <strong>Edge:</strong>
                <p className="text-muted-foreground">
                  {language === 'sr' ? 'Postavke → Kolačići i dozvole stranica' : 'Settings → Cookies and site permissions'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? 'Posledice onemogućavanja kolačića' : 'Consequences of disabling cookies'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Ako onemogućite kolačiće, neki djelovi naše stranice možda neće funkcionisati pravilno:'
                : 'If you disable cookies, some parts of our site may not work properly:'
              }
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>{language === 'sr' ? 'Možda nećete moći da se prijavite ili registrujete' : 'You may not be able to log in or register'}</li>
              <li>{language === 'sr' ? 'Košarica možda neće sačuvati vaš izbor' : 'Cart may not save your selection'}</li>
              <li>{language === 'sr' ? 'Preferencije jezika i teme neće biti zapamćene' : 'Language and theme preferences will not be remembered'}</li>
              <li>{language === 'sr' ? 'Neke personalizovane funkcije neće biti dostupne' : 'Some personalized features will not be available'}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? 'Ažuriranje ove politike' : 'Updates to this policy'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Možemo povremeno ažurirati ovu Politiku kolačića. O značajnim izmjenama ćemo vas obavijestiti putem email-a ili obavještenja na stranici. Preporučujemo da povremeno pregledate ovu politiku.'
                : 'We may occasionally update this Cookie Policy. We will notify you of significant changes via email or notifications on the site. We recommend that you periodically review this policy.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? 'Kontakt' : 'Contact'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Ako imate pitanja o našem korišćenju kolačića:'
                : 'If you have questions about our use of cookies:'
              }
            </p>
            <div className="mt-4 space-y-1">
              <p><strong>Email:</strong> privatnost@tvojakarta.ba</p>
              <p><strong>{language === 'sr' ? 'Telefon:' : 'Phone:'}</strong> +387 51 123 456</p>
              <p><strong>{language === 'sr' ? 'Adresa:' : 'Address:'}</strong> Kralja Petra I 15, 78000 Banja Luka</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}