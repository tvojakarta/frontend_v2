import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from './CartProvider';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    onNavigate('payment');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sr-RS', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('events')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Nazad na događaje
        </Button>

        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-2xl mb-4">Vaša korpa je prazna</h2>
          <p className="text-muted-foreground mb-6">
            Počnite da pregledate događaje da pronađete karte koje biste željeli kupiti
          </p>
          <Button onClick={() => onNavigate('events')}>
            Pregledaj događaje
          </Button>
        </div>
      </div>
    );
  }

  const cartTotal = getCartTotal();
  const serviceFee = Math.round(cartTotal * 0.035);
  const processingFee = 5;
  const totalPrice = cartTotal + serviceFee + processingFee;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => onNavigate('events')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Nastavi kupovinu
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl mb-6">Korpa za kupovinu</h1>
          
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.eventImage}
                        alt={item.eventTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{item.eventTitle}</h3>
                      <p className="text-muted-foreground mb-2">{item.ticketType}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(item.eventDate)}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg mb-2">{item.price} KM svaka</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 8}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <span className="text-lg">
                          {item.price * item.quantity} KM
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Pregled narudžbe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.ticketType}
                    </span>
                    <span>{item.price * item.quantity} KM</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Međuzbroj</span>
                  <span>{cartTotal} KM</span>
                </div>
                <div className="flex justify-between">
                  <span>Servisna naknada</span>
                  <span>{serviceFee} KM</span>
                </div>
                <div className="flex justify-between">
                  <span>Naknada za procesiranje</span>
                  <span>{processingFee} KM</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg">
                <span>Ukupno</span>
                <span>{totalPrice} KM</span>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCheckout}
              >
                Nastavi na naplatu
              </Button>

              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  Očisti korpu
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground space-y-1">
                <p>🔒 Sigurna 256-bit SSL enkripcija</p>
                <p>💳 Prihvaćene sve glavne kreditne kartice</p>
                <p>📧 Trenutna dostava karata</p>
                <p>🎫 QR kodovi prilagođeni mobilnim uređajima</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}