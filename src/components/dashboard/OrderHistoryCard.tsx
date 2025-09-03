import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Download } from 'lucide-react';
import { downloadTicket } from '../utils/dashboardUtils';

interface OrderEvent {
  title: string;
  ticketType: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
  events: OrderEvent[];
}

interface OrderHistoryCardProps {
  order: Order;
}

export function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Narudžba #{order.orderNumber}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Naručena {new Date(order.date).toLocaleDateString('sr-RS')}
            </p>
          </div>
          <div className="text-right">
            <Badge variant={order.status === 'Završena' ? 'secondary' : 'default'}>
              {order.status}
            </Badge>
            <p className="text-lg mt-1">${order.total.toFixed(2)}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {order.events.map((event, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p>{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {event.quantity}x {event.ticketType}
                </p>
              </div>
              <p>${(event.price * event.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between items-center">
          <span>Ukupno</span>
          <span className="text-lg">${order.total.toFixed(2)}</span>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => downloadTicket(order.orderNumber)}
          >
            <Download className="h-4 w-4 mr-2" />
            Preuzmi račun
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}