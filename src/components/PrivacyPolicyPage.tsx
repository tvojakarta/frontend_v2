import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
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
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl">
            {language === 'sr' ? 'Politika privatnosti' : 'Privacy Policy'}
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
              {language === 'sr' ? '1. Uvod' : '1. Introduction'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === 'sr'
                ? 'Tvoja Karta ("mi", "naš", "nas") je posvećena zaštiti vaše privatnosti. Ova Politika privatnosti objašnjava kako prikupljamo, koristimo, čuvamo i dijelimo vaše lične podatke kada koristite našu platformu za prodaju karata.'
                : 'Tvoja Karta ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store and share your personal data when you use our ticket sales platform.'
              }
            </p>
            <p>
              {language === 'sr'
                ? 'Korišćenjem naših usluga, pristajete na prikupljanje i korišćenje informacija u skladu sa ovom politikom.'
                : 'By using our services, you agree to the collection and use of information in accordance with this policy.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '2. Podaci koje prikupljamo' : '2. Data we collect'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">
              {language === 'sr' ? 'Lični podaci:' : 'Personal data:'}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{language === 'sr' ? 'Ime i prezime' : 'Full name'}</li>
              <li>{language === 'sr' ? 'Email adresa' : 'Email address'}</li>
              <li>{language === 'sr' ? 'Broj telefona' : 'Phone number'}</li>
              <li>{language === 'sr' ? 'Adresa' : 'Address'}</li>
              <li>{language === 'sr' ? 'Podaci o plaćanju (obrađuju se preko sigurnih treći strana)' : 'Payment data (processed through secure third parties)'}</li>
            </ul>

            <h4 className="font-semibold">
              {language === 'sr' ? 'Tehnički podaci:' : 'Technical data:'}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{language === 'sr' ? 'IP adresa' : 'IP address'}</li>
              <li>{language === 'sr' ? 'Tip preglednika i verzija' : 'Browser type and version'}</li>
              <li>{language === 'sr' ? 'Operativni sistem' : 'Operating system'}</li>
              <li>{language === 'sr' ? 'Podaci o korišćenju stranice' : 'Website usage data'}</li>
              <li>{language === 'sr' ? 'Kolačići i slične tehnologije' : 'Cookies and similar technologies'}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '3. Kako koristimo vaše podatke' : '3. How we use your data'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>{language === 'sr' ? 'Za obradu vaših narudžbi i dostavu elektronskih karata' : 'To process your orders and deliver electronic tickets'}</li>
              <li>{language === 'sr' ? 'Za komunikaciju u vezi sa vašim narudžbama' : 'To communicate regarding your orders'}</li>
              <li>{language === 'sr' ? 'Za poboljšanje naših usluga i korisničkog iskustva' : 'To improve our services and user experience'}</li>
              <li>{language === 'sr' ? 'Za pružanje korisničke podrške' : 'To provide customer support'}</li>
              <li>{language === 'sr' ? 'Za slanje promotivnih materijala (samo uz vašu saglasnost)' : 'To send promotional materials (only with your consent)'}</li>
              <li>{language === 'sr' ? 'Za analizu korišćenja stranice i kreiranje izvještaja' : 'For website usage analysis and reporting'}</li>
              <li>{language === 'sr' ? 'Za sprečavanje prevara i osiguravanje sigurnosti' : 'To prevent fraud and ensure security'}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '4. Kolačići' : '4. Cookies'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === 'sr'
                ? 'Koristimo kolačiće da poboljšamo vaše iskustvo. Kolačići su mali tekstualni fajlovi koji se čuvaju na vašem uređaju. Možete upravljati kolačićima kroz postavke vašeg preglednika.'
                : 'We use cookies to improve your experience. Cookies are small text files stored on your device. You can manage cookies through your browser settings.'
              }
            </p>
            <p>
              {language === 'sr'
                ? 'Za detaljne informacije o našem korišćenju kolačića, molimo pogledajte našu'
                : 'For detailed information about our use of cookies, please see our'
              }
              <Button variant="link" className="p-0 h-auto ml-1" onClick={() => onNavigate('cookie-policy')}>
                {language === 'sr' ? 'Politiku kolačića' : 'Cookie Policy'}
              </Button>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '5. Dijeljenje podataka' : '5. Data sharing'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === 'sr'
                ? 'Ne prodajemo vaše lične podatke trećim licima. Možemo podijeliti vaše podatke u sljedećim situacijama:'
                : 'We do not sell your personal data to third parties. We may share your data in the following situations:'
              }
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{language === 'sr' ? 'Sa pouzdanim poslovnim partnerima koji nam pomažu u pružanju usluga' : 'With trusted business partners who help us provide services'}</li>
              <li>{language === 'sr' ? 'Sa processorima plaćanja radi obradu transakcija' : 'With payment processors to process transactions'}</li>
              <li>{language === 'sr' ? 'Kada to zahtijeva zakon ili regulatorni organi' : 'When required by law or regulatory authorities'}</li>
              <li>{language === 'sr' ? 'U slučaju spajanja, akvizicije ili prodaje imovine' : 'In case of merger, acquisition or sale of assets'}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '6. Sigurnost podataka' : '6. Data security'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Implementiramo odgovarajuće tehničke i organizacione mjere sigurnosti da zaštitimo vaše lične podatke od neovlašćenog pristupa, mijenjanja, otkrivanja ili uništavanja. Ipak, nijedan sistem prenosa preko interneta nije 100% siguran.'
                : 'We implement appropriate technical and organizational security measures to protect your personal data from unauthorized access, alteration, disclosure or destruction. However, no internet transmission system is 100% secure.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '7. Vaša prava' : '7. Your rights'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{language === 'sr' ? 'Imate pravo da:' : 'You have the right to:'}</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>{language === 'sr' ? 'Pristupite svojim ličnim podacima' : 'Access your personal data'}</li>
              <li>{language === 'sr' ? 'Ispravite netačne podatke' : 'Correct inaccurate data'}</li>
              <li>{language === 'sr' ? 'Zatražite brisanje svojih podataka' : 'Request deletion of your data'}</li>
              <li>{language === 'sr' ? 'Ograničite obradu svojih podataka' : 'Restrict processing of your data'}</li>
              <li>{language === 'sr' ? 'Prigovorite obradi svojih podataka' : 'Object to processing of your data'}</li>
              <li>{language === 'sr' ? 'Zatražite prenosivost podataka' : 'Request data portability'}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '8. Čuvanje podataka' : '8. Data retention'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Vaše lične podatke čuvam samo onoliko dugo koliko je potrebno za svrhe za které su prikupljeni, ili koliko zahtijeva zakon. Podaci o transakcijama se čuvaju u skladu sa računovodstvenim i poreskim propisima.'
                : 'We keep your personal data only as long as necessary for the purposes for which it was collected, or as required by law. Transaction data is kept in accordance with accounting and tax regulations.'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '9. Kontakt' : '9. Contact'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Ako imate pitanja o ovoj Politici privatnosti, možete nas kontaktirati:'
                : 'If you have questions about this Privacy Policy, you can contact us:'
              }
            </p>
            <div className="mt-4 space-y-1">
              <p><strong>Email:</strong> privatnost@tvojakarta.ba</p>
              <p><strong>{language === 'sr' ? 'Telefon:' : 'Phone:'}</strong> +387 51 123 456</p>
              <p><strong>{language === 'sr' ? 'Adresa:' : 'Address:'}</strong> Kralja Petra I 15, 78000 Banja Luka</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? '10. Izmjene politike' : '10. Policy changes'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === 'sr'
                ? 'Zadržavamo pravo da mijenjamo ovu Politiku privatnosti. O značajnim izmjenama ćemo vas obavijestiti putem email-a ili obavještenja na našoj stranici. Preporučujemo da povremeno pregledate ovu politiku.'
                : 'We reserve the right to change this Privacy Policy. We will notify you of significant changes via email or notifications on our website. We recommend that you periodically review this policy.'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}