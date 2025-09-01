// src/types/index.ts

export type UserRole = 'user' | 'owner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Rented';
  type: 'House' | 'Apartment' | 'Villa' | 'Condo' | 'Land';
  bedrooms: number;
  bathrooms: number;
  area: number; // square feet
  yearBuilt?: number;
  garages?: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  features: string[];
  amenities: string[];
  images: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  isFeatured?: boolean;
}

export interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  bio?: string;
  properties: string[]; // Array of property IDs
  createdAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  status: 'For Sale' | 'For Rent';
  type: 'House' | 'Apartment' | 'Villa' | 'Condo' | 'Land';
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt?: number;
  garages?: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  features: string[];
  amenities: string[];
  images: File[];
}

export interface BookingFormData {
  propertyId: string;
  startDate: string;
  endDate: string;
  message?: string;
}