import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { User, Settings } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}

interface Order {
  total: number;
}

interface ProfileCardProps {
  userProfile: UserProfile;
  orderHistory: Order[];
  upcomingEventsCount: number;
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}

export function ProfileCard({ userProfile, orderHistory, upcomingEventsCount }: ProfileCardProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Lične informacije
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm">Puno ime</Label>
            <p>{userProfile.name}</p>
          </div>
          <div>
            <Label className="text-sm">Email</Label>
            <p>{userProfile.email}</p>
          </div>
          <div>
            <Label className="text-sm">Telefon</Label>
            <p>{userProfile.phone}</p>
          </div>
          <div>
            <Label className="text-sm">Adresa</Label>
            <p>{userProfile.address}</p>
          </div>
          <div>
            <Label className="text-sm">Član od</Label>
            <p>{new Date(userProfile.joinDate).toLocaleDateString('sr-RS')}</p>
          </div>
          <Button variant="outline" className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Uredi profil
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistike računa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl">{orderHistory.length}</p>
              <p className="text-sm text-muted-foreground">Ukupno narudžbi</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl">{upcomingEventsCount}</p>
              <p className="text-sm text-muted-foreground">Predstojeći događaji</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl">
                ${orderHistory.reduce((sum, order) => sum + order.total, 0).toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground">Ukupno potrošeno</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl">⭐</p>
              <p className="text-sm text-muted-foreground">VIP član</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4>Podešavanja računa</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Email obavještenja</span>
                <Badge variant="secondary">Omogućeno</Badge>
              </div>
              <div className="flex justify-between">
                <span>SMS obavještenja</span>
                <Badge variant="secondary">Omogućeno</Badge>
              </div>
              <div className="flex justify-between">
                <span>Marketing email-ovi</span>
                <Badge variant="outline">Onemogućeno</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}