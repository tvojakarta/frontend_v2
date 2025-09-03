import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from './ui/carousel';
import { allEvents } from './data/eventsData';

interface EventsSliderProps {
  onNavigate: (page: string, eventId?: string) => void;
}

export function EventsSlider({ onNavigate }: EventsSliderProps) {
  // Get latest events (sorted by date)
  const latestEvents = allEvents
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6); // Show up to 6 events

  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {latestEvents.map((event) => (
            <CarouselItem 
              key={event.id} 
              className="pl-0 basis-full"
            >
              <div 
                className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] cursor-pointer group overflow-hidden"
                onClick={() => onNavigate('event-detail', event.id)}
              >
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dark overlay for better contrast */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Optional: Subtle gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Arrows */}
        <CarouselPrevious className="left-4 md:left-8 bg-white/20 hover:bg-white/30 border-white/30 text-white shadow-lg backdrop-blur-sm" />
        <CarouselNext className="right-4 md:right-8 bg-white/20 hover:bg-white/30 border-white/30 text-white shadow-lg backdrop-blur-sm" />
      </Carousel>
    </div>
  );
}