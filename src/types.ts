export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  targetAudience: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
}

export interface Shop {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  rating: number;
  distance: string;
  popularity: number;
  videoUrl: string;
  thumbnailUrl: string;
  services: Service[];
  openingHours: OpeningHour[];
  address: string;
  transportation: string;
  notices: string[];
  faqs: FAQ[];
}

export interface Booking {
  id: string;
  shopId: string;
  serviceId: string;
  date: string;
  time: string;
  userName: string;
  userPhone: string;
  note?: string;
  status: 'pending' | 'booked' | 'cancelled' | 'arrived' | 'checked_out';
}

export interface User {
  id: string;
  points: number;
  pointHistory: PointRecord[];
}

export interface PointRecord {
  id: string;
  date: string;
  amount: number;
  description: string;
}
