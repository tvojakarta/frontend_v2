import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  ArrowLeft, 
  Mail, 
  Facebook, 
  Instagram,
  Send,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { toast } from 'sonner@2.0.3';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

// TikTok icon component since Lucide doesn't have it
const TikTokIcon = React.memo(() => (
  <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
));

export function ContactPage({ onNavigate }: ContactPageProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error(language === 'sr' ? 'Unesite email adresu' : 'Please enter an email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast.error(language === 'sr' ? 'Unesite valjanu email adresu' : 'Please enter a valid email address');
      return;
    }

    toast.success(language === 'sr' ? 'Uspješno ste se pretplatili na newsletter!' : 'Successfully subscribed to newsletter!');
    setNewsletterEmail('');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@tvojakarta.com',
      link: 'mailto:info@tvojakarta.com'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      content: 'tvojakarta.com',
      link: 'https://instagram.com/tvojakarta.com'
    },
    {
      icon: Facebook,
      title: 'Facebook',
      content: 'Tvoja Karta',
      link: 'https://facebook.com/tvojakarta.com'
    },
    {
      icon: TikTokIcon,
      title: 'TikTok',
      content: '@tvojakarta',
      link: 'https://www.tiktok.com/@tvojakarta'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === 'sr' ? 'Nazad na početnu' : 'Back to home'}
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-4">
            {language === 'sr' ? 'Kontaktirajte nas' : 'Contact Us'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'sr' 
              ? 'Imate pitanje? Trebate pomoć? Naš tim je spreman da vam pomogne. Kontaktirajte nas putem email-a ili društvenih mreža.'
              : 'Have a question? Need help? Our team is ready to help you. Contact us via email or social media.'
            }
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Information */}
        <div className="lg:col-span-1 flex">
          <Card className="w-full flex flex-col">
            <CardHeader>
              <CardTitle>
                {language === 'sr' ? 'Kontakt i društvene mreže' : 'Contact and Social Media'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 flex flex-col justify-center">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-primary hover:underline block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p>{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 flex">
          <Card className="w-full flex flex-col">
            <CardHeader>
              <CardTitle>
                {language === 'sr' ? 'Pošaljite nam poruku' : 'Send us a message'}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl mb-2">
                    {language === 'sr' ? 'Poruka poslana!' : 'Message sent!'}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === 'sr' 
                      ? 'Hvala vam na poruci. Odgovorićemo vam u najkraćem mogućem roku.'
                      : 'Thank you for your message. We will respond to you as soon as possible.'
                    }
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {language === 'sr' ? 'Ime i prezime' : 'Full Name'}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={language === 'sr' ? 'Unesite vaše ime' : 'Enter your name'}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {language === 'sr' ? 'Email adresa' : 'Email Address'}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={language === 'sr' ? 'vaš.email@example.com' : 'your.email@example.com'}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {language === 'sr' ? 'Tema' : 'Subject'}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={language === 'sr' ? 'Ukratko opišite temu vaše poruke' : 'Briefly describe the topic of your message'}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="message">
                      {language === 'sr' ? 'Poruka' : 'Message'}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={language === 'sr' ? 'Detaljno opišite vaš upit ili problem...' : 'Describe your inquiry or problem in detail...'}
                      className="flex-1 min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full gap-2 mt-auto">
                    <Send className="h-4 w-4" />
                    {language === 'sr' ? 'Pošaljite poruku' : 'Send message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Newsletter Section */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{t('footer.newsletter')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto text-center">
            <p className="text-muted-foreground mb-6">
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
        </CardContent>
      </Card>
    </div>
  );
}