// src/pages/user/FavoritesPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Bed, Bath, Square, MapPin, Search } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

// Mock favorite properties data
const initialFavorites = [
  {
    id: '1',
    title: 'Luxury Villa in Los Angeles',
    description: 'This stunning modern villa offers luxurious living with breathtaking views of the city.',
    price: 3500000,
    status: 'For Sale',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    address: {
      street: "1234 Wilshire Blvd",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    date_added: '2025-07-10T15:30:00Z',
  },
  {
    id: '2',
    title: 'Luxury Apartment in Manhattan',
    description: 'High-end apartment in the heart of Manhattan with amazing views.',
    price: 2800000,
    status: 'For Sale',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    address: {
      street: '456 Park Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    date_added: '2025-07-05T10:15:00Z',
  },
  {
    id: '3',
    title: 'Beachfront House in Malibu',
    description: 'Beautiful beachfront property with direct access to the ocean.',
    price: 6200000,
    status: 'For Sale',
    type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    address: {
      street: '789 Pacific Coast Hwy',
      city: 'Malibu',
      state: 'CA',
      zipCode: '90265',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    date_added: '2025-06-28T14:20:00Z',
  },
  {
    id: '4',
    title: 'Modern Townhouse in Chicago',
    description: 'Elegant townhouse in a prime location with modern amenities.',
    price: 1750000,
    status: 'For Sale',
    type: 'House',
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2400,
    address: {
      street: '123 Michigan Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    date_added: '2025-06-20T09:45:00Z',
  },
  {
    id: '5',
    title: 'Cozy Apartment Near Downtown',
    description: 'Charming apartment located within walking distance to downtown shops and restaurants.',
    price: 2200,
    status: 'For Rent',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    address: {
      street: '123 Main St',
      city: 'Portland',
      state: 'OR',
      zipCode: '97204',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    date_added: '2025-07-15T11:30:00Z',
  },
  {
    id: '6',
    title: 'Suburban Family Home',
    description: 'Spacious family home in a quiet suburban neighborhood.',
    price: 850000,
    status: 'For Sale',
    type: 'House',
    bedrooms: 4,
    bathrooms: 2.5,
    area: 2800,
    address: {
      street: '789 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    date_added: '2025-07-02T16:45:00Z',
  },
];

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter favorites based on search query and status filter
  const filteredFavorites = favorites.filter(property => {
    const matchesQuery = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.state.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    
    return matchesQuery && matchesStatus;
  });

  // Remove property from favorites
  const handleRemoveFromFavorites = (propertyId: string) => {
    setFavorites(favorites.filter(property => property.id !== propertyId));
  };

  // Format price with commas and determine if it's rent
  const formatPrice = (price: number, status: string): string => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
    
    return status === 'For Rent' ? `${formattedPrice}/month` : formattedPrice;
  };

  // Format date to relative time (e.g., "3 days ago")
  const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  };

  return (
    <DashboardLayout userRole="user">
      <div>
        <h1 className="text-2xl font-bold mb-6">Favorite Properties</h1>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by name, city, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex-shrink-0">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Properties</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Favorites List */}
        {filteredFavorites.length > 0 ? (
          <div className="space-y-4">
            {filteredFavorites.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <div className={`absolute top-0 left-0 m-2 px-2 py-1 text-xs font-semibold rounded ${
                      property.status === 'For Sale' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-green-600 text-white'
                    }`}>
                      {property.status}
                    </div>
                  </div>
                  <div className="md:w-2/3 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link 
                          to={`/properties/${property.id}`}
                          className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                        >
                          {property.title}
                        </Link>
                        <div className="flex items-center text-gray-500 mt-1">
                          <MapPin size={16} className="mr-1 flex-shrink-0" />
                          <span className="text-sm">
                            {`${property.address.street}, ${property.address.city}, ${property.address.state}`}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveFromFavorites(property.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove from favorites"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mt-3 mb-3 line-clamp-2">
                      {property.description}
                    </p>
                    
                    <div className="flex flex-wrap justify-between items-center mt-4">
                      <div className="flex space-x-4 text-sm text-gray-600 mb-2 md:mb-0">
                        <span className="flex items-center">
                          <Bed size={16} className="mr-1" /> {property.bedrooms}
                        </span>
                        <span className="flex items-center">
                          <Bath size={16} className="mr-1" /> {property.bathrooms}
                        </span>
                        <span className="flex items-center">
                          <Square size={16} className="mr-1" /> {property.area} sq ft
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-3">
                          Added {formatRelativeDate(property.date_added)}
                        </span>
                        <span className="font-bold text-blue-600">
                          {formatPrice(property.price, property.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                      <Link
                        to={`/properties/${property.id}`}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              <Heart size={30} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No favorite properties</h3>
            {searchQuery || statusFilter !== 'all' ? (
              <p className="text-gray-600 mb-6">
                No properties match your current filters. Try adjusting your search criteria.
              </p>
            ) : (
              <p className="text-gray-600 mb-6">
                You haven't added any properties to your favorites yet. Browse properties and click the heart icon to add them here.
              </p>
            )}
            <Link 
              to="/properties" 
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition inline-block"
            >
              Browse Properties
            </Link>
          </div>
        )}
        
        {/* Pagination */}
        {filteredFavorites.length > 0 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex">
              <button className="px-3 py-1 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 bg-blue-600 text-white">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FavoritesPage;