// src/pages/HomePage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import PropertySearch, { type PropertySearchParams } from '../components/property/PropertySearch';
import PropertyCard from '../components/property/PropertyCard';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// Mock data for featured properties
const featuredProperties = [
  {
    id: '1',
    title: 'Modern Villa in Beverly Hills',
    description: 'A stunning modern villa with panoramic views of the city.',
    price: 4500000,
    status: 'For Sale' as const,
    type: 'Villa' as const,
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    yearBuilt: 2020,
    garages: 2,
    address: {
      street: '123 Beverly Dr',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
    },
    features: ['Pool', 'Garden', 'Security System'],
    amenities: ['Air Conditioning', 'Heating', 'Gym', 'Wine Cellar'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner1',
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-03-15T10:00:00Z',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Luxury Apartment in Manhattan',
    description: 'High-end apartment in the heart of Manhattan with amazing views.',
    price: 2800000,
    status: 'For Sale' as const,
    type: 'Apartment' as const,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    yearBuilt: 2018,
    garages: 1,
    address: {
      street: '456 Park Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      country: 'USA',
    },
    features: ['Doorman', 'Elevator', 'Fitness Center'],
    amenities: ['Air Conditioning', 'Heating', 'Washer/Dryer'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner2',
    createdAt: '2025-02-10T14:30:00Z',
    updatedAt: '2025-02-10T14:30:00Z',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Beachfront House in Malibu',
    description: 'Beautiful beachfront property with direct access to the ocean.',
    price: 6200000,
    status: 'For Sale' as const,
    type: 'House' as const,
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    yearBuilt: 2015,
    garages: 2,
    address: {
      street: '789 Pacific Coast Hwy',
      city: 'Malibu',
      state: 'CA',
      zipCode: '90265',
      country: 'USA',
    },
    features: ['Beachfront', 'Terrace', 'Fireplace'],
    amenities: ['Air Conditioning', 'Heating', 'Pool'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner3',
    createdAt: '2025-01-05T09:15:00Z',
    updatedAt: '2025-01-05T09:15:00Z',
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Modern Townhouse in Chicago',
    description: 'Elegant townhouse in a prime location with modern amenities.',
    price: 1750000,
    status: 'For Sale' as const,
    type: 'House' as const,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2400,
    yearBuilt: 2019,
    garages: 1,
    address: {
      street: '123 Michigan Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
    },
    features: ['Rooftop Terrace', 'Smart Home', 'Garage'],
    amenities: ['Air Conditioning', 'Heating', 'Washer/Dryer'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner4',
    createdAt: '2025-04-20T11:45:00Z',
    updatedAt: '2025-04-20T11:45:00Z',
    isFeatured: true,
  },
];

// Mock data for recent properties
const recentProperties = [
  {
    id: '5',
    title: 'Penthouse in Downtown',
    description: 'Luxurious penthouse with panoramic views of the city skyline.',
    price: 3200000,
    status: 'For Sale' as const,
    type: 'Apartment' as const,
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    yearBuilt: 2021,
    garages: 2,
    address: {
      street: '555 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90012',
      country: 'USA',
    },
    features: ['Rooftop Terrace', 'Private Elevator', 'Wine Cellar'],
    amenities: ['Air Conditioning', 'Heating', 'Pool', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner5',
    createdAt: '2025-07-01T15:20:00Z',
    updatedAt: '2025-07-01T15:20:00Z',
    isFeatured: false,
  },
  {
    id: '6',
    title: 'Suburban Family Home',
    description: 'Spacious family home in a quiet suburban neighborhood.',
    price: 850000,
    status: 'For Sale' as const,
    type: 'House' as const,
    bedrooms: 4,
    bathrooms: 2.5,
    area: 2800,
    yearBuilt: 2017,
    garages: 2,
    address: {
      street: '789 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      country: 'USA',
    },
    features: ['Garden', 'Patio', 'Fireplace'],
    amenities: ['Air Conditioning', 'Heating', 'Washer/Dryer'],
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner6',
    createdAt: '2025-07-10T09:00:00Z',
    updatedAt: '2025-07-10T09:00:00Z',
    isFeatured: false,
  },
  {
    id: '7',
    title: 'Modern Condo with City Views',
    description: 'Contemporary condo with stunning views and premium finishes.',
    price: 1200000,
    status: 'For Sale' as const,
    type: 'Condo' as const,
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    yearBuilt: 2020,
    garages: 1,
    address: {
      street: '123 Pine St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
    },
    features: ['Balcony', 'Concierge', 'Fitness Center'],
    amenities: ['Air Conditioning', 'Heating', 'In-unit Laundry'],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner7',
    createdAt: '2025-07-15T13:45:00Z',
    updatedAt: '2025-07-15T13:45:00Z',
    isFeatured: false,
  },
  {
    id: '8',
    title: 'Historic Brownstone',
    description: 'Beautifully restored historic brownstone with original details.',
    price: 3500000,
    status: 'For Sale' as const,
    type: 'House' as const,
    bedrooms: 5,
    bathrooms: 3.5,
    area: 4000,
    yearBuilt: 1900,
    garages: 0,
    address: {
      street: '456 Bedford Ave',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11216',
      country: 'USA',
    },
    features: ['High Ceilings', 'Original Woodwork', 'Garden'],
    amenities: ['Heating', 'Washer/Dryer'],
    images: [
      'https://t3.ftcdn.net/jpg/04/27/70/64/360_F_427706432_OTNX01bqkZttcIX9sht4SxvjBm6xJHEX.jpg',
    ],
    ownerId: 'owner8',
    createdAt: '2025-07-20T10:30:00Z',
    updatedAt: '2025-07-20T10:30:00Z',
    isFeatured: false,
  },
];

// Mock data for testimonials
const testimonials = [
  {
    id: '1',
    name: 'John Smith',
    position: 'CEO, Tech Company',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    text: 'I found my dream home through FindHouses. The platform is incredibly user-friendly and the agents were professional and responsive. Highly recommend!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Emma Johnson',
    position: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    text: 'As a first-time homebuyer, I was nervous about the process. FindHouses made everything simple and straightforward. I m now happily settled in my new apartment!',
    rating: 5,
  },
  {
    id: '3',
    name: 'David Chen',
    position: 'Property Investor',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    text: 'I ve used many real estate platforms, but FindHouses stands out for its quality listings and excellent service. I ve found multiple investment properties here.',
    rating: 4,
  },
];

// Property categories
const propertyCategories = [
  {
    id: '1',
    name: 'Houses',
    count: 245,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Apartments',
    count: 183,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    name: 'Villas',
    count: 65,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    name: 'Commercial',
    count: 112,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
];

const HomePage: React.FC = () => {
  const handleSearch = (searchParams: PropertySearchParams) => {
    console.log('Search params:', searchParams);
    // In a real app, this would navigate to search results page or filter properties
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[600px]" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Discover the perfect property that matches your lifestyle from our extensive collection of listings.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-4xl">
            <PropertySearch onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Properties</h2>
            <Link 
              to="/properties" 
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View All <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Explore Properties by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyCategories.map((category) => (
              <Link 
                key={category.id}
                to={`/properties?category=${category.name.toLowerCase()}`} 
                className="relative rounded-lg overflow-hidden group h-64 shadow-md hover:shadow-xl transition-shadow"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p>{category.count} Properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Recent Properties</h2>
            <Link 
              to="/properties" 
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View All <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>
          
          <div className="relative">
            <div className="flex overflow-x-hidden">
              <div className="flex flex-nowrap">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full lg:w-1/3 px-4 flex-shrink-0">
                    <div className="bg-white text-gray-800 rounded-lg p-8 h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={18} 
                            className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 flex-grow">{testimonial.text}</p>
                      <div className="flex items-center">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-gray-500 text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-blue-600 hover:bg-gray-100 focus:outline-none">
              <ChevronLeft size={24} />
            </button>
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-blue-600 hover:bg-gray-100 focus:outline-none">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose FindHouses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Trusted by Thousands</h3>
              <p className="text-gray-600">
                With over 10,000 successful property transactions, we've built a reputation for trust and reliability.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Range of Properties</h3>
              <p className="text-gray-600">
                From luxury villas to affordable apartments, we have properties to match every preference and budget.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast & Easy Process</h3>
              <p className="text-gray-600">
                Our streamlined process ensures you can find, book, and finalize your property transaction quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property with FindHouses.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/properties" 
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Browse Properties
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:text-gray-900 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;