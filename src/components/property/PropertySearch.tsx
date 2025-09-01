// src/components/property/PropertySearch.tsx

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface PropertySearchProps {
  onSearch: (searchParams: PropertySearchParams) => void;
  className?: string;
  isAdvanced?: boolean;
}

export interface PropertySearchParams {
  keyword: string;
  propertyType: string;
  location: string;
  status: string;
  minPrice: number | '';
  maxPrice: number | '';
  bedrooms: number | '';
  bathrooms: number | '';
  minArea: number | '';
  maxArea: number | '';
  features: string[];
}

const PropertySearch: React.FC<PropertySearchProps> = ({ 
  onSearch, 
  className = '', 
  isAdvanced = false 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(isAdvanced);
  
  const [searchParams, setSearchParams] = useState<PropertySearchParams>({
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
    features: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSearchParams(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, value] 
        : prev.features.filter(feature => feature !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const propertyTypes = [
    'Any Type', 'House', 'Apartment', 'Villa', 'Condo', 'Land', 'Office', 'Retail'
  ];

  const propertyStatus = [
    'Any Status', 'For Sale', 'For Rent'
  ];

  const locations = [
    'Any Location', 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco', 'Las Vegas'
  ];

  const features = [
    'Air Conditioning', 'Swimming Pool', 'Garden', 'Garage', 'Gym', 'Balcony', 
    'Fireplace', 'Security System', 'Parking', 'Internet'
  ];

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          {/* Basic Search */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Keyword */}
            <div>
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                Keyword
              </label>
              <input
                type="text"
                id="keyword"
                name="keyword"
                value={searchParams.keyword}
                onChange={handleInputChange}
                placeholder="Enter keywords..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={searchParams.propertyType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type === 'Any Type' ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="location"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                {locations.map((location) => (
                  <option key={location} value={location === 'Any Location' ? '' : location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={searchParams.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                {propertyStatus.map((status) => (
                  <option key={status} value={status === 'Any Status' ? '' : status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Search */}
          {showAdvanced && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Min Price */}
                <div>
                  <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={searchParams.minPrice}
                    onChange={handleInputChange}
                    placeholder="No Min"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={searchParams.maxPrice}
                    onChange={handleInputChange}
                    placeholder="No Max"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  />
                </div>

                {/* Bedrooms */}
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={searchParams.bedrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
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
                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <select
                    id="bathrooms"
                    name="bathrooms"
                    value={searchParams.bathrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Min Area */}
                <div>
                  <label htmlFor="minArea" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Area (sq ft)
                  </label>
                  <input
                    type="number"
                    id="minArea"
                    name="minArea"
                    value={searchParams.minArea}
                    onChange={handleInputChange}
                    placeholder="No Min"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  />
                </div>

                {/* Max Area */}
                <div>
                  <label htmlFor="maxArea" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Area (sq ft)
                  </label>
                  <input
                    type="number"
                    id="maxArea"
                    name="maxArea"
                    value={searchParams.maxArea}
                    onChange={handleInputChange}
                    placeholder="No Max"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`feature-${feature}`}
                        name="features"
                        value={feature}
                        checked={searchParams.features.includes(feature)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-gray-700">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Button & Advanced Toggle */}
          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={toggleAdvanced}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center focus:outline-none"
            >
              {showAdvanced ? (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Hide Advanced
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  Advanced Search
                </>
              )}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
            >
              <Search size={18} className="mr-2" />
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertySearch;