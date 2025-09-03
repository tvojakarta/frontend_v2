import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, CreditCard, Shield, Lock, Calendar, User } from 'lucide-react';
import { useCart } from './CartProvider';
import { useLanguage } from './LanguageProvider';
import { toast } from 'sonner@2.0.3';

interface PaymentPageProps {
  onNavigate: (page: string) => void;
}

export function PaymentPage({ onNavigate }: PaymentPageProps) {
  const { items, getCartTotal, clearCart } = useCart();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Billing Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Terms and Preferences
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const cartTotal = getCartTotal();
  const serviceFee = Math.round(cartTotal * 0.035);
  const processingFee = 5;
  const totalPrice = cartTotal + serviceFee + processingFee;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    handleInputChange('expiryDate', formatted);
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode',
      'cardNumber', 'expiryDate', 'cvv', 'cardName'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(t('message.error.required_fields'));
        return false;
      }
    }
    
    if (!formData.agreeToTerms) {
      toast.error(t('message.error.terms'));
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t('message.error.invalid_email'));
      return false;
    }

    // Basic card number validation (should be 16 digits)
    const cardNumberDigits = formData.cardNumber.replace(/\s/g, '');
    if (cardNumberDigits.length !== 16) {
      toast.error(t('message.error.card_number'));
      return false;
    }

    // Basic CVV validation
    if (formData.cvv.length !== 3) {
      toast.error(t('message.error.cvv'));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success
      clearCart();
      toast.success(t('message.success.payment'));
      onNavigate('thank-you');
    } catch (error) {
      toast.error(t('message.error.payment'));
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl mb-4">{t('cart.empty')}</h1>
          <p className="text-muted-foreground mb-6">
            {language === 'sr' 
              ? 'Dodajte događaje u korpu prije nego što nastavite na plaćanje.'
              : 'Add events to cart before proceeding to payment.'
            }
          </p>
          <Button onClick={() => onNavigate('home')}>
            {language === 'sr' ? 'Vrati se na početnu' : 'Return to Home'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('cart')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'sr' ? 'Nazad na korpu' : 'Back to Cart'}
          </Button>
          <div>
            <h1 className="text-3xl">{t('payment.title')}</h1>
            <p className="text-muted-foreground">{t('payment.subtitle')}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {t('payment.billing')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{t('payment.first_name')} *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder={language === 'sr' ? 'Unesite ime' : 'Enter first name'}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t('payment.last_name')} *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder={language === 'sr' ? 'Unesite prezime' : 'Enter last name'}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t('payment.email')} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={language === 'sr' ? 'vasa@email.com' : 'your@email.com'}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t('payment.phone')} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+387 XX XXX XXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">{t('payment.address')} *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder={language === 'sr' ? 'Unesite adresu' : 'Enter address'}
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">{t('payment.city')} *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder={language === 'sr' ? 'Unesite naziv grada' : 'Enter city name'}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">{t('payment.postal_code')} *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="78000"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    {t('payment.card_details')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">{t('payment.card_name')} *</Label>
                    <Input
                      id="cardName"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      placeholder={language === 'sr' ? 'Ime kako je napisano na kartici' : 'Name as written on card'}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">{t('payment.card_number')} *</Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">{language === 'sr' ? 'Datum isteka' : 'Expiry Date'} *</Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder={language === 'sr' ? 'MM/GG' : 'MM/YY'}
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        type="password"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                      required
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm leading-6">
                      {language === 'sr' ? 'Prihvatam' : 'I accept'}{' '}
                      <a
                        href="/terms-of-service"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open('#', '_blank');
                          setTimeout(() => onNavigate('terms-of-service'), 100);
                        }}
                        className="text-primary hover:underline"
                      >
                        {language === 'sr' ? 'Uslove korišćenja' : 'Terms of Service'}
                      </a>{' '}
                      {language === 'sr' ? 'i' : 'and'}{' '}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open('#', '_blank');
                          setTimeout(() => onNavigate('privacy-policy'), 100);
                        }}
                        className="text-primary hover:underline"
                      >
                        {language === 'sr' ? 'Politiku privatnosti' : 'Privacy Policy'}
                      </a>
                      *
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onCheckedChange={(checked) => handleInputChange('subscribeNewsletter', checked as boolean)}
                    />
                    <Label htmlFor="subscribeNewsletter" className="text-sm">
                      {language === 'sr' 
                        ? 'Želim da primam obaveštenja o novim događajima i posebnim ponudama'
                        : 'I want to receive notifications about new events and special offers'
                      }
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  language === 'sr' ? 'Obrađuje se...' : 'Processing...'
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    {language === 'sr' 
                      ? `Izvrši plaćanje - ${totalPrice} KM`
                      : `Complete Payment - ${totalPrice} KM`
                    }
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{language === 'sr' ? 'Pregled narudžbe' : 'Order Summary'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-sm line-clamp-2">{item.eventTitle}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.ticketType} • {item.quantity}x
                      </p>
                    </div>
                    <span className="text-sm">{item.price * item.quantity} KM</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{language === 'sr' ? 'Međuzbroj:' : 'Subtotal:'}</span>
                    <span>{cartTotal} KM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'sr' ? 'Servisna naknada:' : 'Service Fee:'}</span>
                    <span>{serviceFee} KM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'sr' ? 'Naknada za procesiranje:' : 'Processing Fee:'}</span>
                    <span>{processingFee} KM</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span>{language === 'sr' ? 'Ukupno:' : 'Total:'}</span>
                  <span className="text-xl">{totalPrice} KM</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>
                    {language === 'sr' 
                      ? 'Sigurno plaćanje zaštićeno SSL enkripcijom'
                      : 'Secure payment protected by SSL encryption'
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}