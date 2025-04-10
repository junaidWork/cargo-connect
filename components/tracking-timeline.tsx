"use client";

import { CheckCircle, Clock, AlertCircle, Package, Truck, Send, Building } from 'lucide-react';

interface TimelineEvent {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
  icon: string;
}

interface TrackingTimelineProps {
  events: TimelineEvent[];
}

export function TrackingTimeline({ events }: TrackingTimelineProps) {
  const getIcon = (iconName: string, completed: boolean) => {
    const className = `h-6 w-6 ${completed ? 'text-primary' : 'text-muted-foreground'}`;
    
    switch (iconName) {
      case 'package':
        return <Package className={className} />;
      case 'truck':
        return <Truck className={className} />;
      case 'send':
        return <Send className={className} />;
      case 'building':
        return <Building className={className} />;
      case 'check-circle':
        return <CheckCircle className={className} />;
      default:
        return <Clock className={className} />;
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div className={`rounded-full p-2 ${
              event.completed 
                ? 'bg-primary/10 text-primary' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {getIcon(event.icon, event.completed)}
            </div>
            {index < events.length - 1 && (
              <div className={`w-0.5 h-full mt-2 ${
                event.completed ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
          <div className="pb-8">
            <div className="font-medium">{event.status}</div>
            <div className="text-sm text-muted-foreground">{event.location}</div>
            <div className="text-sm text-muted-foreground">
              {new Date(event.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}