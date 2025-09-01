// src/pages/PropertyDetailsPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Printer, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Info, 
  Check, 
  ArrowRight, 
  Calendar, 
  Phone, 
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PropertyCard from '../components/property/PropertyCard';
import type { Property } from '../types';

// Mock data for a single property
const propertyDetails: Property = {
  id: '1',
  title: "Luxury Villa in Los Angeles",
  description: "This stunning modern villa offers luxurious living with breathtaking views of the city. The property features high ceilings, floor-to-ceiling windows, and premium finishes throughout. The open-concept design seamlessly connects indoor and outdoor living spaces, perfect for entertaining.",
  price: 3500000,
  status: 'For Sale',
  type: 'Villa',
  bedrooms: 5,
  bathrooms: 4,
  area: 4200,
  yearBuilt: 2021,
  garages: 2,
  address: {
    street: "1234 Wilshire Blvd",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    country: "USA",
  },
  features: [
    "Swimming Pool", 
    "Garden", 
    "Security System", 
    "Central Air Conditioning", 
    "Balcony", 
    "Fireplace", 
    "Home Office"
  ],
  amenities: [
    "Gym", 
    "Wine Cellar", 
    "Smart Home Technology", 
    "Home Theater", 
    "Outdoor Kitchen"
  ],
  images: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
  ],
  ownerId: 'owner1',
  createdAt: '2025-03-15T10:00:00Z',
  updatedAt: '2025-03-15T10:00:00Z',
  isFeatured: true,
};

// Agent data
const agent = {
  id: 'agent1',
  name: "Sarah Johnson",
  phone: "+1 (123) 456-7890",
  email: "sarah.johnson@realestate.com",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  position: "Real Estate Agent",
  experience: 5,
  description: "Sarah is a dedicated real estate professional with over 5 years of experience in the Los Angeles market. She specializes in luxury properties and has a keen eye for detail.",
  listings: 24,
  sales: 42,
};

// Similar properties
const similarProperties: Property[] = [
  {
    id: '2',
    title: 'Modern Apartment in Downtown',
    description: 'Luxurious apartment in the heart of downtown with amazing city views.',
    price: 950000,
    status: 'For Sale',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    yearBuilt: 2020,
    garages: 1,
    address: {
      street: '789 Grand Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90017',
      country: 'USA',
    },
    features: ['Balcony', 'City View', 'Security System'],
    amenities: ['Gym', 'Concierge', 'Rooftop Terrace'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner2',
    createdAt: '2025-05-10T14:30:00Z',
    updatedAt: '2025-05-10T14:30:00Z',
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Spacious Family Home',
    description: 'Beautiful family home in a quiet neighborhood with spacious backyard.',
    price: 1250000,
    status: 'For Sale',
    type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    yearBuilt: 2018,
    garages: 2,
    address: {
      street: '456 Oak Street',
      city: 'Pasadena',
      state: 'CA',
      zipCode: '91101',
      country: 'USA',
    },
    features: ['Garden', 'Patio', 'Fireplace'],
    amenities: ['Central Air', 'Smart Home', 'Granite Countertops'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    ],
    ownerId: 'owner3',
    createdAt: '2025-04-25T09:45:00Z',
    updatedAt: '2025-04-25T09:45:00Z',
    isFeatured: false,
  },
];

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [property, setProperty] = useState<Property | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock API call to fetch property details
  useEffect(() => {
    // In a real app, you would fetch the property data based on the ID
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setProperty(propertyDetails);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
        <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/properties" 
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Browse Properties
        </Link>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const nextImage = () => {
    setActiveImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* Property Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-blue-100">
                <MapPin size={18} className="mr-1" />
                <span>{`${property.address.street}, ${property.address.city}, ${property.address.state}`}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-3xl font-bold">${property.price.toLocaleString()}</span>
              <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm">{property.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column (Main Content) */}
          <div className="w-full lg:w-2/3 lg:pr-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-[400px] md:h-[500px]">
                <img 
                  src={property.images[activeImageIndex]} 
                  alt={`Property view ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                    onClick={handleToggleFavorite}
                  >
                    <Heart 
                      size={20} 
                      className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"} 
                    />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                    <Share2 size={20} className="text-blue-500" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                    <Printer size={20} className="text-gray-500" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded">
                  {activeImageIndex + 1}/{property.images.length} Photos
                </div>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-blue-600 hover:bg-gray-100 focus:outline-none"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-blue-600 hover:bg-gray-100 focus:outline-none"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              {/* Thumbnails */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`h-20 w-32 flex-shrink-0 cursor-pointer border-2 ${activeImageIndex === index ? 'border-blue-600' : 'border-transparent'}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Property Details</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <Bed size={24} className="text-blue-600 mb-2" />
                    <span className="text-gray-500">Bedrooms</span>
                    <span className="text-xl font-bold text-gray-700">{property.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <Bath size={24} className="text-blue-600 mb-2" />
                    <span className="text-gray-500">Bathrooms</span>
                    <span className="text-xl font-bold text-gray-700">{property.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <Square size={24} className="text-blue-600 mb-2" />
                    <span className="text-gray-500">Square Ft</span>
                    <span className="text-xl font-bold text-gray-700">{property.area}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <Info size={24} className="text-blue-600 mb-2" />
                    <span className="text-gray-500">Property ID</span>
                    <span className="text-xl font-bold text-gray-700">{property.id}</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b mb-6">
                  <div className="flex space-x-6">
                    <button 
                      className={`pb-3 text-lg ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('description')}
                    >
                      Description
                    </button>
                    <button 
                      className={`pb-3 text-lg ${activeTab === 'features' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('features')}
                    >
                      Features
                    </button>
                    <button 
                      className={`pb-3 text-lg ${activeTab === 'location' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('location')}
                    >
                      Location
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div>
                  {activeTab === 'description' && (
                    <div>
                      <p className="text-gray-700 mb-4">{property.description}</p>
                      <p className="text-gray-700 mb-4">
                        The main level boasts a gourmet kitchen with custom cabinetry and high-end appliances, a formal dining room, and a spacious living area with a fireplace. The primary suite includes a spa-like bathroom with a soaking tub and a large walk-in closet. Additional features include smart home technology, a home theater, a wine cellar, and a fitness room.
                      </p>
                      
                      <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4">Property Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <span className="text-gray-500 w-1/2 ">Property ID:</span>
                            <span className="font-medium text-gray-700">{property.id}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 w-1/2">Property Type:</span>
                            <span className="font-medium text-gray-700">{property.type}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 w-1/2">Property Status:</span>
                            <span className="font-medium text-gray-700">{property.status}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 w-1/2">Property Price:</span>
                            <span className="font-medium text-gray-700">${property.price.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 w-1/2">Bedrooms:</span>
                            <span className="font-medium text-gray-700">{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 w-1/2">Bathrooms:</span>
                            <span className="font-medium text-gray-700">{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 w-1/2">Garage:</span>
                            <span className="font-medium text-gray-700">{property.garages || 0} Cars</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 w-1/2">Year Built:</span>
                            <span className="font-medium text-gray-700">{property.yearBuilt || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Features & Amenities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
                        {[...property.features, ...property.amenities].map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <Check size={20} className="text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'location' && (
                    <div>
                      <div className="bg-gray-200 h-[400px] flex items-center justify-center">
                        <div className="text-center">
                          <MapPin size={40} className="mx-auto text-blue-600 mb-2" />
                          <p className="text-gray-700">Map would load here with the property location</p>
                          <p className="text-sm text-gray-500">{`${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zipCode}`}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4">Location Details</h3>
                        <p className="text-gray-700 mb-4">
                          This property is located in a prime area of {property.address.city}, offering convenient access to shopping, dining, entertainment, and schools. The neighborhood is known for its safety, beautiful tree-lined streets, and friendly community atmosphere.
                        </p>
                        
                        <div className="mt-4">
                          <h4 className="font-bold mb-2">Points of Interest Nearby:</h4>
                          <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            <li>5 minutes to shopping centers</li>
                            <li>10 minutes to downtown</li>
                            <li>15 minutes to the nearest beach</li>
                            <li>Close to top-rated schools</li>
                            <li>Easy access to major highways</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Similar Properties */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Similar Properties</h2>
                  <Link 
                    to="/properties" 
                    className="text-blue-600 flex items-center hover:text-blue-800"
                  >
                    View All <ArrowRight size={18} className="ml-1" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarProperties.map((property) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            {/* Schedule Viewing */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-blue-600 text-white py-4 px-6">
                <h3 className="text-xl font-bold">Schedule a Tour</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap -mx-2 mb-4">
                  <div className="w-full px-2 mb-4">
                    <div className="flex border rounded">
                      <div className="w-1/2 py-2 px-4 border-r text-center cursor-pointer bg-blue-50 text-blue-600 font-medium">
                        In Person
                      </div>
                      <div className="w-1/2 py-2 px-4 text-center cursor-pointer text-gray-500">
                        Video Chat
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-2 mb-4">
                    <label className="block text-gray-700 mb-2">Date</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Select Date"
                        className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Calendar size={18} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="w-full px-2 mb-4">
                    <label className="block text-gray-700 mb-2">Time</label>
                    <select className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>1:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                    </select>
                  </div>
                  <div className="w-full px-2 mb-4">
                    <label className="block text-gray-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name"
                      className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full px-2 mb-4">
                    <label className="block text-gray-700 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full px-2 mb-4">
                    <label className="block text-gray-700 mb-2">Your Phone</label>
                    <input 
                      type="tel" 
                      placeholder="Enter your phone"
                      className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full px-2 mb-4">
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea 
                      placeholder="I'm interested in this property"
                      className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    ></textarea>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition">
                  Submit Request
                </button>
              </div>
            </div>

            {/* Agent Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Property Agent</h3>
                <div className="flex items-center mb-4">
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-700">{agent.name}</h4>
                    <p className="text-gray-500 text-sm">{agent.position}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Phone size={18} className="text-blue-600 mr-3" />
                    <span className="text-gray-700">{agent.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={18} className="text-blue-600 mr-3" />
                    <span className="text-gray-700">{agent.email}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 rounded flex justify-center items-center">
                    <Phone size={18} className="mr-2" /> Call Agent
                  </button>
                  <button className="w-full border border-blue-600 text-blue-600 py-2 rounded flex justify-center items-center">
                    <Mail size={18} className="mr-2" /> Email Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetailsPage;