// src/components/property/PropertyCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import type { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  isFavorite = false, 
  onToggleFavorite 
}) => {
  // Format price as currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle favorite toggle
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Property Image */}
      <Link to={`/properties/${property.id}`} className="block relative">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className={`absolute top-0 left-0 m-2 px-2 py-1 text-xs font-semibold rounded ${
            property.status === 'For Sale' 
              ? 'bg-blue-600 text-white' 
              : property.status === 'For Rent' 
                ? 'bg-green-600 text-white'
                : property.status === 'Sold'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-600 text-white'
          }`}>
            {property.status}
          </div>

          {/* Favorite Button */}
          <button 
            onClick={handleFavoriteClick}
            className="absolute top-0 right-0 m-2 p-1.5 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
          >
            <Heart 
              size={18} 
              className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"} 
            />
          </button>

          {/* Featured Tag (if applicable) */}
          {property.isFeatured && (
            <div className="absolute bottom-0 left-0 m-2 px-2 py-1 text-xs font-semibold bg-yellow-500 text-white rounded">
              Featured
            </div>
          )}
        </div>
      </Link>

      {/* Property Details */}
      <div className="p-4">
        <Link to={`/properties/${property.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-1 truncate">
            {property.title}
          </h3>
        </Link>
        
        {/* Location */}
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span className="text-sm truncate">
            {`${property.address.street}, ${property.address.city}, ${property.address.state}`}
          </span>
        </div>
        
        {/* Key Features */}
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
        
        {/* Price and Details Button */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="font-bold text-blue-600">
            {formatPrice(property.price)}
            {property.status === 'For Rent' && <span className="text-gray-500 text-xs font-normal">/month</span>}
          </span>
          <Link 
            to={`/properties/${property.id}`}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;