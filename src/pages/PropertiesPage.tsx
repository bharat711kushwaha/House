// src/pages/PropertiesPage.tsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, List, MapPin, SlidersHorizontal, X,Heart,Bed,Bath ,Square } from 'lucide-react';
import PropertySearch, { type PropertySearchParams } from '../components/property/PropertySearch';
import PropertyCard from '../components/property/PropertyCard';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { ChevronRight } from 'lucide-react';
// Mock property data (same as used in HomePage.tsx)
const allProperties = [
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
      'https://media.gettyimages.com/id/1173194315/photo/brownstone-buildings-in-midtown-manhattan.jpg?s=612x612&w=0&k=20&c=MoNu4tMBtNaWijfXBlH1dcuJMdhBQmHdkYiXX3SBmi8=',
    ],
    ownerId: 'owner8',
    createdAt: '2025-07-20T10:30:00Z',
    updatedAt: '2025-07-20T10:30:00Z',
    isFeatured: false,
  },
  {
    id: '9',
    title: 'Luxury Condo for Rent',
    description: 'Premium condo in a high-end building with amazing amenities.',
    price: 4500,
    status: 'For Rent' as const,
    type: 'Condo' as const,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    yearBuilt: 2020,
    garages: 1,
    address: {
      street: '789 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'USA',
    },
    features: ['Concierge', 'Gym', 'Rooftop Terrace'],
    amenities: ['Air Conditioning', 'Heating', 'Washer/Dryer'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner9',
    createdAt: '2025-06-05T16:20:00Z',
    updatedAt: '2025-06-05T16:20:00Z',
    isFeatured: false,
  },
  {
    id: '10',
    title: 'Cozy Apartment Near Downtown',
    description: 'Charming apartment located within walking distance to downtown shops and restaurants.',
    price: 2200,
    status: 'For Rent' as const,
    type: 'Apartment' as const,
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    yearBuilt: 2015,
    garages: 0,
    address: {
      street: '123 Main St',
      city: 'Portland',
      state: 'OR',
      zipCode: '97204',
      country: 'USA',
    },
    features: ['Balcony', 'Stainless Steel Appliances', 'Hardwood Floors'],
    amenities: ['Air Conditioning', 'Heating', 'Dishwasher'],
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner10',
    createdAt: '2025-06-10T09:30:00Z',
    updatedAt: '2025-06-10T09:30:00Z',
    isFeatured: false,
  },
];

const PropertiesPage: React.FC = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [activeFilters, setActiveFilters] = useState<PropertySearchParams>({
    keyword: '',
    propertyType: '',
    location: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    maxArea: '',
    features: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Parse URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters: Partial<PropertySearchParams> = {};
    
    if (params.has('keyword')) newFilters.keyword = params.get('keyword') || '';
    if (params.has('propertyType')) newFilters.propertyType = params.get('propertyType') || '';
    if (params.has('location')) newFilters.location = params.get('location') || '';
    if (params.has('status')) newFilters.status = params.get('status') || '';
    if (params.has('category')) {
      const category = params.get('category');
      if (category === 'houses') newFilters.propertyType = 'House';
      else if (category === 'apartments') newFilters.propertyType = 'Apartment';
      else if (category === 'villas') newFilters.propertyType = 'Villa';
      else if (category === 'commercial') newFilters.propertyType = 'Office';
    }
    
    if (Object.keys(newFilters).length > 0) {
      setActiveFilters(prev => ({
        ...prev,
        ...newFilters
      }));
      applyFilters({ ...activeFilters, ...newFilters });
    }
  }, [location.search]);
  
  const applyFilters = (filters: PropertySearchParams) => {
    let results = [...allProperties];
    
    // Apply keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      results = results.filter(property => 
        property.title.toLowerCase().includes(keyword) || 
        property.description.toLowerCase().includes(keyword) ||
        property.address.city.toLowerCase().includes(keyword) ||
        property.address.state.toLowerCase().includes(keyword)
      );
    }
    
    // Apply property type filter
    if (filters.propertyType) {
      results = results.filter(property => 
        property.type === filters.propertyType
      );
    }
    
    // Apply location filter
    if (filters.location) {
      results = results.filter(property => 
        property.address.city === filters.location ||
        property.address.state === filters.location
      );
    }
    
    // Apply status filter
    if (filters.status) {
      results = results.filter(property => 
        property.status === filters.status
      );
    }
    
    // Apply price range filter
    if (filters.minPrice) {
      results = results.filter(property => 
        property.price >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      results = results.filter(property => 
        property.price <= Number(filters.maxPrice)
      );
    }
    
    // Apply bedroom filter
    if (filters.bedrooms) {
      results = results.filter(property => 
        property.bedrooms >= Number(filters.bedrooms)
      );
    }
    
    // Apply bathroom filter
    if (filters.bathrooms) {
      results = results.filter(property => 
        property.bathrooms >= Number(filters.bathrooms)
      );
    }
    
    // Apply area range filter
    if (filters.minArea) {
      results = results.filter(property => 
        property.area >= Number(filters.minArea)
      );
    }
    if (filters.maxArea) {
      results = results.filter(property => 
        property.area <= Number(filters.maxArea)
      );
    }
    
    // Apply features filter
    if (filters.features.length > 0) {
      results = results.filter(property => 
        filters.features.every(feature => 
          property.features.includes(feature) || property.amenities.includes(feature)
        )
      );
    }
    
    setFilteredProperties(results);
  };
  
  const handleSearch = (searchParams: PropertySearchParams) => {
    setActiveFilters(searchParams);
    applyFilters(searchParams);
  };
  
  const handleToggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };
  
  const clearFilters = () => {
    setActiveFilters({
      keyword: '',
      propertyType: '',
      location: '',
      status: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: '',
      features: [],
    });
    setFilteredProperties(allProperties);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Count active filters
  const activeFilterCount = Object.entries(activeFilters).reduce((count, [key, value]) => {
    if (key === 'features') {
      return count + (activeFilters.features?.length || 0);
    }
    return count + (value ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Properties</h1>
          <div className="flex items-center text-blue-100">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>Properties</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <PropertySearch 
            onSearch={handleSearch} 
            isAdvanced={false}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleFilters}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-between"
          >
            <span className="flex items-center">
              <SlidersHorizontal size={18} className="mr-2" />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </span>
            <span>{showFilters ? <X size={18} /> : <ChevronRight size={18} />}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 lg:pr-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-700 text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Status */}
              <div className="mb-6 text-gray-700">
                <h3 className="font-medium mb-2">Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="status-rent"
                      name="status"
                      value="For Rent"
                      checked={activeFilters.status === 'For Rent'}
                      onChange={() => handleSearch({ ...activeFilters, status: 'For Rent' })}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="status-rent" className="ml-2 text-gray-700">For Rent</label>
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6 text-gray-700">
                <h3 className="font-medium mb-2">Property Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-any"
                      name="propertyType"
                      value=""
                      checked={activeFilters.propertyType === ''}
                      onChange={() => handleSearch({ ...activeFilters, propertyType: '' })}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="type-any" className="ml-2 text-gray-700">Any</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-house"
                      name="propertyType"
                      value="House"
                      checked={activeFilters.propertyType === 'House'}
                      onChange={() => handleSearch({ ...activeFilters, propertyType: 'House' })}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="type-house" className="ml-2 text-gray-700">House</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-apartment"
                      name="propertyType"
                      value="Apartment"
                      checked={activeFilters.propertyType === 'Apartment'}
                      onChange={() => handleSearch({ ...activeFilters, propertyType: 'Apartment' })}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="type-apartment" className="ml-2 text-gray-700">Apartment</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-villa"
                      name="propertyType"
                      value="Villa"
                      checked={activeFilters.propertyType === 'Villa'}
                      onChange={() => handleSearch({ ...activeFilters, propertyType: 'Villa' })}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="type-villa" className="ml-2 text-gray-700">Villa</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-condo"
                      name="propertyType"
                      value="Condo"
                      checked={activeFilters.propertyType === 'Condo'}
                      onChange={() => handleSearch({ ...activeFilters, propertyType: 'Condo' })}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="type-condo" className="ml-2 text-gray-700">Condo</label>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 text-gray-700">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="minPrice" className="block text-sm text-gray-700 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      id="minPrice"
                      value={activeFilters.minPrice}
                      onChange={(e) => handleSearch({ ...activeFilters, minPrice: e.target.value })}
                      placeholder="No Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice" className="block text-sm text-gray-600 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      id="maxPrice"
                      value={activeFilters.maxPrice}
                      onChange={(e) => handleSearch({ ...activeFilters, maxPrice: e.target.value })}
                      placeholder="No Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    />
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-6 text-gray-700">
                <h3 className="font-medium text-gray-700 mb-2">Bedrooms</h3>
                <select
                  value={activeFilters.bedrooms}
                  onChange={(e) => handleSearch({ ...activeFilters, bedrooms: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div className="mb-6 text-gray-700">
                <h3 className="font-medium  text-gray-700 mb-2">Bathrooms</h3>
                <select
                  value={activeFilters.bathrooms}
                  onChange={(e) => handleSearch({ ...activeFilters, bathrooms: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Area Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Area (sq ft)</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="minArea" className="block text-sm text-gray-600 mb-1">
                      Min Area
                    </label>
                    <input
                      type="number"
                      id="minArea"
                      value={activeFilters.minArea}
                      onChange={(e) => handleSearch({ ...activeFilters, minArea: e.target.value })}
                      placeholder="No Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxArea" className="block text-sm text-gray-600 mb-1">
                      Max Area
                    </label>
                    <input
                      type="number"
                      id="maxArea"
                      value={activeFilters.maxArea}
                      onChange={(e) => handleSearch({ ...activeFilters, maxArea: e.target.value })}
                      placeholder="No Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Listings */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-3 sm:mb-0">
                <span className="font-medium">
                  {filteredProperties.length} Properties found
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
                  <select
                    id="sort"
                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                  >
                    <option value="newest">Newest</option>
                    <option value="price_asc">Price (Low to High)</option>
                    <option value="price_desc">Price (High to Low)</option>
                    <option value="beds_desc">Most Beds</option>
                    <option value="baths_desc">Most Baths</option>
                  </select>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  {activeFilters.keyword && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                      Keyword: {activeFilters.keyword}
                      <button
                        onClick={() => handleSearch({ ...activeFilters, keyword: '' })}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {activeFilters.propertyType && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                      Type: {activeFilters.propertyType}
                      <button
                        onClick={() => handleSearch({ ...activeFilters, propertyType: '' })}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {activeFilters.status && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                      Status: {activeFilters.status}
                      <button
                        onClick={() => handleSearch({ ...activeFilters, status: '' })}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {(activeFilters.minPrice || activeFilters.maxPrice) && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                      Price: {activeFilters.minPrice || '0'} - {activeFilters.maxPrice || 'Any'}
                      <button
                        onClick={() => handleSearch({ ...activeFilters, minPrice: '', maxPrice: '' })}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {activeFilters.bedrooms && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                      Beds: {activeFilters.bedrooms}+
                      <button
                        onClick={() => handleSearch({ ...activeFilters, bedrooms: '' })}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {activeFilters.bathrooms && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                      Baths: {activeFilters.bathrooms}+
                      <button
                        onClick={() => handleSearch({ ...activeFilters, bathrooms: '' })}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Property Grid */}
            {filteredProperties.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-6"
              }>
                {filteredProperties.map((property) => (
                  viewMode === 'grid' ? (
                    <PropertyCard 
                      key={property.id}
                      property={property}
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ) : (
                    <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative">
                          <img 
                            src={property.images[0]} 
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
                          <button 
                            onClick={() => handleToggleFavorite(property.id)}
                            className="absolute top-0 right-0 m-2 p-1.5 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                          >
                            <Heart 
                              size={18} 
                              className={favorites.includes(property.id) ? "text-red-500 fill-red-500" : "text-gray-400"} 
                            />
                          </button>
                        </div>
                        <div className="md:w-2/3 p-4">
                          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-1">
                            {property.title}
                          </h3>
                          <div className="flex items-center text-gray-500 mb-2">
                            <MapPin size={16} className="mr-1 flex-shrink-0" />
                            <span className="text-sm">
                              {`${property.address.street}, ${property.address.city}, ${property.address.state}`}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {property.description}
                          </p>
                          <div className="flex justify-between text-sm text-gray-600 mb-3">
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
                          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <span className="font-bold text-blue-600">
                              ${property.price.toLocaleString()}
                              {property.status === 'For Rent' && <span className="text-gray-500 text-xs font-normal">/month</span>}
                            </span>
                            <a href={`/properties/${property.id}`} className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium">
                              View Details
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <button 
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center">
                  <button className="px-3 py-1 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300 bg-blue-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertiesPage;
                    