import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, CheckCircle, Mail, Smartphone, Printer } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface ThankYouPageProps {
  onNavigate: (page: string) => void;
}

export function ThankYouPage({ onNavigate }: ThankYouPageProps) {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('events')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'sr' ? 'Nazad na događaje' : 'Back to Events'}
          </Button>
        </div>

        {/* Main Thank You Content */}
        <div className="text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl">
              {language === 'sr' ? 'Vaše karte su kupljene!' : 'Your tickets are purchased!'}
            </h1>
            <p className="text-muted-foreground text-lg">
              {language === 'sr' 
                ? 'Hvala vam što ste odabrali Tvoju Kartu. Uskoro ćete dobiti email sa vašim kartama.'
                : 'Thank you for choosing Tvoja Karta. You will receive an email with your tickets shortly.'
              }
            </p>
          </div>

          {/* Instructions Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Mail className="h-5 w-5" />
                  <h3 className="text-lg">
                    {language === 'sr' ? 'Email potvrda' : 'Email Confirmation'}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {language === 'sr' 
                    ? 'Vaše karte će biti poslane na email adresu koju ste naveli. Molimo provjerite i spam folder ako ne vidite email u sljedećih 10 minuta.'
                    : 'Your tickets will be sent to the email address you provided. Please check your spam folder if you don\'t see the email within 10 minutes.'
                  }
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Printer className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="mb-1">
                        {language === 'sr' ? 'Štampajte karte' : 'Print Tickets'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'sr' 
                          ? 'Možete štampati karte iz email-a i donijeti ih štampane na događaj.'
                          : 'You can print tickets from the email and bring them printed to the event.'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Smartphone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="mb-1">
                        {language === 'sr' ? 'Sačuvajte na telefon' : 'Save to Phone'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'sr' 
                          ? 'Otvorite email na telefonu i pokažite QR kod na ulazu.'
                          : 'Open the email on your phone and show the QR code at the entrance.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('events')}
              className="px-8"
            >
              {language === 'sr' ? 'Pregledaj događaje' : 'Browse Events'}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('home')}
              className="px-8"
            >
              {language === 'sr' ? 'Početna stranica' : 'Home Page'}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              {language === 'sr' 
                ? 'Imate pitanja? Kontaktirajte našu podršku na'
                : 'Have questions? Contact our support at'
              }{' '}
              <a href="mailto:info@tvojakarta.ba" className="text-primary hover:underline">
                info@tvojakarta.ba
              </a>
            </p>
            <p>
              {language === 'sr' 
                ? 'ili pozovite +387 51 234 567'
                : 'or call +387 51 234 567'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}