// src/pages/user/DashboardPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Heart, Bell, User, Clock, Eye, TrendingUp, MapPin } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

// Mock recent activities data
const recentActivities = [
  {
    id: 1,
    type: 'booking',
    message: 'Your booking request for "Modern Villa in Beverly Hills" has been confirmed.',
    date: '2025-07-25T10:30:00Z',
    isRead: true,
  },
  {
    id: 2,
    type: 'favorite',
    message: 'You added "Luxury Apartment in Manhattan" to your favorites.',
    date: '2025-07-24T15:45:00Z',
    isRead: true,
  },
  {
    id: 3,
    type: 'viewing',
    message: 'Upcoming property viewing for "Beachfront House in Malibu" on Jul 30, 2025.',
    date: '2025-07-23T09:15:00Z',
    isRead: false,
  },
  {
    id: 4,
    type: 'booking',
    message: 'New booking confirmation #12345 has been sent to your email.',
    date: '2025-07-22T11:20:00Z',
    isRead: false,
  },
];

// Mock upcoming viewings data
const upcomingViewings = [
  {
    id: 1,
    propertyName: 'Beachfront House in Malibu',
    address: '789 Pacific Coast Hwy, Malibu, CA',
    date: '2025-07-30T14:00:00Z',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    status: 'confirmed',
  },
  {
    id: 2,
    propertyName: 'Modern Townhouse in Chicago',
    address: '123 Michigan Ave, Chicago, IL',
    date: '2025-08-05T11:30:00Z',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    status: 'pending',
  },
];

// Mock favorite properties data
const favoriteProperties = [
  {
    id: 1,
    name: 'Luxury Villa in Los Angeles',
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    beds: 5,
    baths: 4,
    area: 4200,
    status: 'For Sale',
  },
  {
    id: 2,
    name: 'Luxury Apartment in Manhattan',
    price: 2800000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    beds: 3,
    baths: 2,
    area: 1800,
    status: 'For Sale',
  },
  {
    id: 3,
    name: 'Cozy Apartment Near Downtown',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    beds: 1,
    baths: 1,
    area: 800,
    status: 'For Rent',
  },
];

const UserDashboardPage: React.FC = () => {
  // Format date to readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Get activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="text-blue-600" size={20} />;
      case 'favorite':
        return <Heart className="text-red-600" size={20} />;
      case 'viewing':
        return <Eye className="text-green-600" size={20} />;
      default:
        return <Bell className="text-gray-600" size={20} />;
    }
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

  return (
    <DashboardLayout userRole="user">
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Here's what's happening with your property searches.</p>
        </div>
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium opacity-90">Favorite Properties</h3>
                <p className="text-3xl font-bold mt-2">{favoriteProperties.length}</p>
                <p className="text-blue-100 text-sm mt-1">Properties saved</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Heart size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium opacity-90">Upcoming Viewings</h3>
                <p className="text-3xl font-bold mt-2">{upcomingViewings.length}</p>
                <p className="text-green-100 text-sm mt-1">Scheduled visits</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Calendar size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium opacity-90">Profile Completion</h3>
                <p className="text-3xl font-bold mt-2">85%</p>
                <p className="text-purple-100 text-sm mt-1">Almost complete</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <User size={24} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                    <p className="text-gray-600 text-sm mt-1">Your latest property interactions</p>
                  </div>
                  <Link 
                    to="#" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View All
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div 
                      key={activity.id}
                      className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                        activity.isRead 
                          ? 'bg-white border-gray-200' 
                          : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`mr-4 mt-1 p-2 rounded-lg ${
                          activity.isRead ? 'bg-gray-100' : 'bg-white shadow-sm'
                        }`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-grow">
                          <p className={`${
                            activity.isRead 
                              ? 'text-gray-700' 
                              : 'text-gray-900 font-medium'
                          }`}>
                            {activity.message}
                          </p>
                          <div className="flex items-center mt-2">
                            <Clock size={14} className="text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                              {formatDate(activity.date)}
                            </span>
                            {!activity.isRead && (
                              <span className="ml-3 w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Upcoming Viewings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Upcoming Viewings</h2>
                    <p className="text-gray-600 text-sm mt-1">Your scheduled visits</p>
                  </div>
                  <Link 
                    to="/dashboard/bookings" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View All
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingViewings.map((viewing) => (
                    <div key={viewing.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-32 overflow-hidden relative">
                        <img 
                          src={viewing.image} 
                          alt={viewing.propertyName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {viewing.propertyName}
                        </h3>
                        <div className="flex items-start text-sm text-gray-600 mb-3">
                          <MapPin size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{viewing.address}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">
                              {new Date(viewing.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                            <span className="text-gray-600 ml-2">
                              {new Date(viewing.date).toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <span className={`
                            text-xs px-3 py-1 rounded-full font-medium
                            ${viewing.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                            }
                          `}>
                            {viewing.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Favorite Properties */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Favorite Properties</h2>
                  <p className="text-gray-600 text-sm mt-1">Properties you've saved for later</p>
                </div>
                <Link 
                  to="/dashboard/favorites" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View All
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProperties.map((property) => (
                  <div key={property.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-3 left-3">
                        <span className={`
                          text-xs px-3 py-1 rounded-full text-white font-medium
                          ${property.status === 'For Sale' 
                            ? 'bg-blue-600' 
                            : 'bg-green-600'
                          }
                        `}>
                          {property.status}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                          <Heart size={16} className="text-red-500 fill-red-500" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                        {property.name}
                      </h3>
                      <p className="text-blue-600 font-bold text-lg mb-3">
                        {formatPrice(property.price, property.status)}
                      </p>
                      <div className="flex justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        <div className="text-center">
                          <span className="font-medium text-gray-900">{property.beds}</span>
                          <span className="block text-xs">Beds</span>
                        </div>
                        <div className="text-center">
                          <span className="font-medium text-gray-900">{property.baths}</span>
                          <span className="block text-xs">Baths</span>
                        </div>
                        <div className="text-center">
                          <span className="font-medium text-gray-900">{property.area}</span>
                          <span className="block text-xs">sq ft</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboardPage;