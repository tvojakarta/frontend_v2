import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Calendar, MapPin, Download, Ticket } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { formatDate, downloadTicket } from '../utils/dashboardUtils';

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  image: string;
  ticketType: string;
  quantity: number;
  orderNumber: string;
  qrCode: string;
}

interface UpcomingEventCardProps {
  event: UpcomingEvent;
  onNavigate: (page: string, eventId?: string) => void;
}

export function UpcomingEventCard({ event, onNavigate }: UpcomingEventCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] relative">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 left-3">
          {event.quantity} kart{event.quantity > 1 ? 'a' : 'a'}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Narudžba #{event.orderNumber}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)} u {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.venue}, {event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            <span>{event.ticketType}</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => downloadTicket(event.orderNumber)}
          >
            <Download className="h-4 w-4 mr-2" />
            Preuzmi
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onNavigate('event-detail', event.id)}
          >
            Pogledaj događaj
          </Button>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          QR kod: {event.qrCode}
        </div>
      </CardContent>
    </Card>
  );
}