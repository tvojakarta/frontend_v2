import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FileText, ArrowLeft } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface TermsOfServicePageProps {
  onNavigate: (page: string) => void;
}

export function TermsOfServicePage({ onNavigate }: TermsOfServicePageProps) {
  const { language } = useLanguage();

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
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-4xl">
            {language === 'sr' ? 'Uslovi korišćenja' : 'Terms of Service'}
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
              {language === 'sr' ? '1. Prihvatanje uslova' : '1. Acceptance of terms'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Dobrodošli na Tvoja Karta platformu. Pristupanjem i korišćenjem naše stranice, pristajete da budete vezani ovim Uslovima korišćenja. Ako se ne slažete sa bilo kojim dijelom ovih uslova, molimo vas da ne koristite našu uslugu.'
                : 'Welcome to the Tvoja Karta platform. By accessing and using our website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our service.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '2. Opis usluge' : '2. Service description'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === 'sr'
                ? 'Tvoja Karta je online platforma za prodaju i distribuciju elektronskih karata za različite događaje uključujući koncerte, festivale, predstave i konferencije.'
                : 'Tvoja Karta is an online platform for selling and distributing electronic tickets for various events including concerts, festivals, shows and conferences.'
              }
            </p>
            <p>
              {language === 'sr'
                ? 'Služimo kao posrednik između organizatora događaja i posetilaca, omogućavajući jednostavnu kupovinu i dostavu elektronskih karata.'
                : 'We serve as an intermediary between event organizers and visitors, enabling easy purchase and delivery of electronic tickets.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '3. Registracija i račun' : '3. Registration and account'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === 'sr'
                ? 'Za kupovinu karata potrebno je da kreirate račun. Odgovorni ste za:'
                : 'To purchase tickets, you need to create an account. You are responsible for:'
              }
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{language === 'sr' ? 'Pružanje tačnih i potpunih informacija' : 'Providing accurate and complete information'}</li>
              <li>{language === 'sr' ? 'Održavanje sigurnosti vaše lozinke' : 'Maintaining the security of your password'}</li>
              <li>{language === 'sr' ? 'Sve aktivnosti koje se dese na vašem računu' : 'All activities that occur on your account'}</li>
              <li>{language === 'sr' ? 'Ažuriranje informacija kada se promijene' : 'Updating information when it changes'}</li>
            </ul>
            <p>
              {language === 'sr'
                ? 'Zadržavamo pravo da privremeno ili trajno onemogućimo račune koji krše ove uslove.'
                : 'We reserve the right to temporarily or permanently disable accounts that violate these terms.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '4. Kupovina karata' : '4. Ticket purchase'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">
              {language === 'sr' ? 'Proces kupovine:' : 'Purchase process:'}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{language === 'sr' ? 'Sve cijene su prikazane u konvertibilnim markama (KM)' : 'All prices are displayed in convertible marks (KM)'}</li>
              <li>{language === 'sr' ? 'Cijene mogu uključivati administrativne troškove' : 'Prices may include administrative fees'}</li>
              <li>{language === 'sr' ? 'Plaćanje se obrađuje kroz sigurne treće strane' : 'Payment is processed through secure third parties'}</li>
              <li>{language === 'sr' ? 'Karte se dostavljaju elektronski na vašu email adresu' : 'Tickets are delivered electronically to your email address'}</li>
            </ul>

            <h4 className="font-semibold">
              {language === 'sr' ? 'Ograničenja:' : 'Limitations:'}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{language === 'sr' ? 'Broj karata po transakciji može biti ograničen' : 'Number of tickets per transaction may be limited'}</li>
              <li>{language === 'sr' ? 'Karte nisu prenosive osim ako drugačije nije navedeno' : 'Tickets are not transferable unless otherwise stated'}</li>
              <li>{language === 'sr' ? 'Preprodaja karata je zabranjena' : 'Resale of tickets is prohibited'}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '5. Povraćaj i otkazivanje' : '5. Refunds and cancellations'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">
              {language === 'sr' ? 'Za kupce:' : 'For buyers:'}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{language === 'sr' ? 'Povraćaj je moguć do 48 sati prije događaja' : 'Refunds are possible up to 48 hours before the event'}</li>
              <li>{language === 'sr' ? 'Administrativni troškovi se zadržavaju' : 'Administrative fees are retained'}</li>
              <li>{language === 'sr' ? 'Povraćaj se obrađuje u roku od 5-10 radnih dana' : 'Refunds are processed within 5-10 business days'}</li>
            </ul>

            <h4 className="font-semibold">
              {language === 'sr' ? 'Za organizatore:' : 'For organizers:'}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{language === 'sr' ? 'U slučaju otkazivanja događaja, pun povraćaj novca' : 'In case of event cancellation, full refund'}</li>
              <li>{language === 'sr' ? 'Obavještavanje kupaca putem email-a i stranice' : 'Notifying customers via email and website'}</li>
              <li>{language === 'sr' ? 'Mogućnost prebacivanja na novi datum' : 'Option to reschedule to a new date'}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '6. Zabrane korišćenja' : '6. Prohibited uses'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{language === 'sr' ? 'Zabranjeno je:' : 'It is prohibited to:'}</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>{language === 'sr' ? 'Korišćenje platforme za nezakonite svrhe' : 'Use the platform for illegal purposes'}</li>
              <li>{language === 'sr' ? 'Pokušaj neovlašćenog pristupa sistemu' : 'Attempt unauthorized access to the system'}</li>
              <li>{language === 'sr' ? 'Preprodaja karata po višim cijenama' : 'Resale tickets at higher prices'}</li>
              <li>{language === 'sr' ? 'Kreiranje lažnih računa ili identiteta' : 'Create fake accounts or identities'}</li>
              <li>{language === 'sr' ? 'Automatizovana kupovina karata (botovi)' : 'Automated ticket purchasing (bots)'}</li>
              <li>{language === 'sr' ? 'Narušavanje rada platforme' : 'Disrupting platform operation'}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '7. Intelektualna svojina' : '7. Intellectual property'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Sav sadržaj na našoj platformi, uključujući dizajn, logotipe, tekst i kod, zaštićen je pravima intelektualne svojine. Zabranjeno je neovlašćeno korišćenje, kopiranje ili distribucija ovog sadržaja.'
                : 'All content on our platform, including design, logos, text and code, is protected by intellectual property rights. Unauthorized use, copying or distribution of this content is prohibited.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '8. Ograničenje odgovornosti' : '8. Limitation of liability'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === 'sr'
                ? 'Tvoja Karta se trudi da pruži kvalitetnu uslugu, ali ne garantuje:'
                : 'Tvoja Karta strives to provide quality service, but does not guarantee:'
              }
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{language === 'sr' ? 'Neprekidnu dostupnost platforme' : 'Continuous availability of the platform'}</li>
              <li>{language === 'sr' ? 'Tačnost svih informacija o događajima' : 'Accuracy of all event information'}</li>
              <li>{language === 'sr' ? 'Kvalitet događaja ili usluga organizatora' : 'Quality of events or organizer services'}</li>
            </ul>
            <p>
              {language === 'sr'
                ? 'Naša odgovornost je ograničena na vrijednost kupljenih karata.'
                : 'Our liability is limited to the value of purchased tickets.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '9. Privatnost' : '9. Privacy'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Vaša privatnost je važna za nas. Molimo pogledajte našu'
                : 'Your privacy is important to us. Please see our'
              }
              <Button variant="link" className="p-0 h-auto ml-1" onClick={() => onNavigate('privacy-policy')}>
                {language === 'sr' ? 'Politiku privatnosti' : 'Privacy Policy'}
              </Button>
              {language === 'sr'
                ? ' za informacije o tome kako prikupljamo, koristimo i štitimo vaše podatke.'
                : ' for information on how we collect, use and protect your data.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '10. Izmjene uslova' : '10. Changes to terms'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Zadržavamo pravo da mijenjamo ove uslove. O značajnim izmjenama ćemo vas obavijestiti putem email-a ili obavještenja na stranici. Kontinuirano korišćenje usluge nakon izmjena predstavlja prihvatanje novih uslova.'
                : 'We reserve the right to change these terms. We will notify you of significant changes via email or notifications on the site. Continued use of the service after changes constitutes acceptance of the new terms.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '11. Primenljivo pravo' : '11. Applicable law'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Ovi uslovi se tumače prema zakonima Bosne i Hercegovine. Svi sporovi će biti rješavani pred nadležnim sudovima u Banja Luci.'
                : 'These terms are interpreted according to the laws of Bosnia and Herzegovina. All disputes will be resolved before the competent courts in Banja Luka.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '12. Kontakt' : '12. Contact'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Za pitanja o ovim uslovima kontaktirajte nas:'
                : 'For questions about these terms contact us:'
              }
            </p>
            <div className="mt-4 space-y-1">
              <p><strong>Email:</strong> podrska@tvojakarta.ba</p>
              <p><strong>{language === 'sr' ? 'Telefon:' : 'Phone:'}</strong> +387 51 123 456</p>
              <p><strong>{language === 'sr' ? 'Adresa:' : 'Address:'}</strong> Kralja Petra I 15, 78000 Banja Luka</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}