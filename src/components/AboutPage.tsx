import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Users, Target, Heart, Award, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { language } = useLanguage();

  const features = [
    {
      icon: Calendar,
      title: {
        sr: 'Raznovrsni događaji',
        en: 'Diverse Events'
      },
      description: {
        sr: 'Od koncerata i festivala do konferencija i predstava - nudimo širok spektar događaja za sve ukuse.',
        en: 'From concerts and festivals to conferences and plays - we offer a wide spectrum of events for all tastes.'
      }
    },
    {
      icon: MapPin,
      title: {
        sr: 'Lokalne lokacije',
        en: 'Local Venues'
      },
      description: {
        sr: 'Fokusirani smo na Banja Luku i Prijedor, omogućavajući vam da otkrijete najbolje što vaš grad nudi.',
        en: 'We focus on Banja Luka and Prijedor, enabling you to discover the best your city has to offer.'
      }
    },
    {
      icon: Users,
      title: {
        sr: 'Jednostavna rezervacija',
        en: 'Easy Booking'
      },
      description: {
        sr: 'Intuitivna platforma koja čini rezervaciju karata brzom i jednostavnom za sve korisčike.',
        en: 'Intuitive platform that makes ticket booking fast and simple for all users.'
      }
    },
    {
      icon: Award,
      title: {
        sr: 'Sigurno plaćanje',
        en: 'Secure Payment'
      },
      description: {
        sr: 'Koristimo najsavremenije sisteme zaštite za sigurno procesiranje svih transakcija.',
        en: 'We use state-of-the-art security systems for safe processing of all transactions.'
      }
    }
  ];

  const stats = [
    {
      number: '500+',
      label: {
        sr: 'Događaja godišnje',
        en: 'Events annually'
      }
    },
    {
      number: '50,000+',
      label: {
        sr: 'Zadovoljnih korisnika',
        en: 'Happy customers'
      }
    },
    {
      number: '2',
      label: {
        sr: 'Grada pokrivena',
        en: 'Cities covered'
      }
    },
    {
      number: '99%',
      label: {
        sr: 'Uspješnih rezervacija',
        en: 'Successful bookings'
      }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'sr' ? 'Nazad na početnu' : 'Back to Home'}
          </Button>
          <div>
            <h1 className="text-3xl">
              {language === 'sr' ? 'O nama' : 'About Us'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'sr' 
                ? 'Upoznajte se sa našom pricom i misijom'
                : 'Learn about our story and mission'
              }
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl mb-4 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-primary" />
                  {language === 'sr' ? 'Naša priča' : 'Our Story'}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {language === 'sr' 
                      ? 'Tvoja Karta nastala je iz ljubavi prema kulturi i želje da svima omogućimo lakši pristup najkvalitetnijim događajima u našem regionu. Osnovana 2023. godine, brzo smo postali vodeća platforma za rezervaciju karata u Banja Luci i Prijedoru.'
                      : 'Tvoja Karta was born from a love of culture and a desire to provide everyone with easier access to the highest quality events in our region. Founded in 2023, we quickly became the leading ticket booking platform in Banja Luka and Prijedor.'
                    }
                  </p>
                  <p>
                    {language === 'sr' 
                      ? 'Vjerujemo da kultura čini našu zajednicu bogatijom i povezanijom. Zato radimo sa lokalnim organizatorima da vam donesemo najbolje koncerte, predstave, festivale i konferencije na jednom mjestu.'
                      : 'We believe that culture makes our community richer and more connected. That\'s why we work with local organizers to bring you the best concerts, plays, festivals and conferences in one place.'
                    }
                  </p>
                </div>
              </div>
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Team collaboration"
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {language === 'sr' ? 'Naša misija' : 'Our Mission'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'sr' 
                  ? 'Povezati ljubitelje kulture sa najboljim događajima u regionu kroz jednostavnu, sigurnu i pouzdanu platformu koja čini rezervaciju karata ugodnim iskustvom.'
                  : 'To connect culture enthusiasts with the best events in the region through a simple, secure and reliable platform that makes ticket booking a pleasant experience.'
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {language === 'sr' ? 'Naša vizija' : 'Our Vision'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'sr' 
                  ? 'Biti vodeća kulturna platforma u Republici Srpskoj koja omogućava svima da otkriju, doživе i uživaju u bogatstvu lokalne kulturne scene.'
                  : 'To be the leading cultural platform in Republika Srpska that enables everyone to discover, experience and enjoy the richness of the local cultural scene.'
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {language === 'sr' ? 'Zašto odabrati nas?' : 'Why Choose Us?'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <feature.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-lg mb-2">{feature.title[language]}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description[language]}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">
              {language === 'sr' ? 'Naši rezultati' : 'Our Results'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl text-primary mb-2">{stat.number}</div>
                  <p className="text-muted-foreground">{stat.label[language]}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl mb-4">
              {language === 'sr' ? 'Želite da sarađujemo?' : 'Want to Collaborate?'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {language === 'sr' 
                ? 'Ako organizujete događaje ili imate ideju za partnerstvo, voleli bismo da čujemo od vas. Kontaktirajte nas i razgovarajmo o mogućnostima saradnje.'
                : 'If you organize events or have a partnership idea, we would love to hear from you. Contact us and let\'s discuss collaboration opportunities.'
              }
            </p>
            <Button size="lg" onClick={() => onNavigate('contact')}>
              {language === 'sr' ? 'Kontaktirajte nas' : 'Contact Us'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}