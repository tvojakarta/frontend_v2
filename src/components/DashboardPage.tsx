import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Ticket } from 'lucide-react';
import { UpcomingEventCard } from './dashboard/UpcomingEventCard';
import { OrderHistoryCard } from './dashboard/OrderHistoryCard';
import { ProfileCard } from './dashboard/ProfileCard';
import { upcomingEvents, orderHistory, userProfile } from './data/dashboardData';

interface DashboardPageProps {
  onNavigate: (page: string, eventId?: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState('tickets');

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => onNavigate('home')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Nazad na početnu
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl mb-2">Moj račun</h1>
        <p className="text-muted-foreground">
          Upravljajte svojim kartama, narudžbama i podešavanjima računa
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">Moje karte</TabsTrigger>
          <TabsTrigger value="orders">Istorija narudžbi</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          <div className="grid gap-6">
            <h2 className="text-2xl">Predstojeći događaji</h2>
            
            {upcomingEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <Ticket className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl mb-2">Nema predstojećih događaja</h3>
                <p className="text-muted-foreground mb-4">
                  Nemate karte za predstojeće događaje
                </p>
                <Button onClick={() => onNavigate('events')}>
                  Pretraži događaje
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => (
                  <UpcomingEventCard 
                    key={event.id} 
                    event={event} 
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <h2 className="text-2xl">Istorija narudžbi</h2>
          
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <OrderHistoryCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <ProfileCard 
            userProfile={userProfile}
            orderHistory={orderHistory}
            upcomingEventsCount={upcomingEvents.length}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}