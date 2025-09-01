// src/pages/owner/DashboardPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Plus,
  BarChart2,
  ChevronRight,
  Eye,
  Star,
  Settings,
  Bell,
  ExternalLink,
  Download
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

// Mock data for statistics
const statistics = {
  totalProperties: 8,
  activeListings: 5,
  totalBookings: 12,
  pendingBookings: 3,
  totalViews: 542,
  totalIncome: 25600,
  monthlyIncome: 3800,
  previousMonthIncome: 3200
};

// Mock data for recent bookings
const recentBookings = [
  {
    id: 'B001',
    propertyName: 'Luxury Villa in Los Angeles',
    propertyImage: '/assets/images/property-1.jpg',
    customerName: 'John Smith',
    customerImage: '/assets/images/user-1.jpg',
    date: '2025-07-30T14:00:00Z',
    status: 'confirmed',
    amount: 1200
  },
  {
    id: 'B002',
    propertyName: 'Modern Townhouse in Chicago',
    propertyImage: '/assets/images/property-2.jpg',
    customerName: 'Emily Johnson',
    customerImage: '/assets/images/user-2.jpg',
    date: '2025-08-05T11:30:00Z',
    status: 'pending',
    amount: 850
  },
  {
    id: 'B003',
    propertyName: 'Beachfront House in Malibu',
    propertyImage: '/assets/images/property-3.jpg',
    customerName: 'Michael Brown',
    customerImage: '/assets/images/user-3.jpg',
    date: '2025-08-10T13:00:00Z',
    status: 'pending',
    amount: 1500
  }
];

// Mock data for property performance
const propertyPerformance = [
  {
    id: '1',
    name: 'Luxury Villa in Los Angeles',
    image: '/assets/images/property-1.jpg',
    views: 189,
    bookings: 5,
    rating: 4.8,
    income: 6000
  },
  {
    id: '3',
    name: 'Beachfront House in Malibu',
    image: '/assets/images/property-3.jpg',
    views: 156,
    bookings: 4,
    rating: 4.9,
    income: 7500
  },
  {
    id: '4',
    name: 'Modern Townhouse in Chicago',
    image: '/assets/images/property-2.jpg',
    views: 120,
    bookings: 3,
    rating: 4.7,
    income: 2550
  },
  {
    id: '2',
    name: 'Luxury Apartment in Manhattan',
    image: '/assets/images/property-4.jpg',
    views: 77,
    bookings: 0,
    rating: 0,
    income: 0
  }
];

// Chart data for monthly earnings
const monthlyEarnings = [
  { month: 'Jan', amount: 2100 },
  { month: 'Feb', amount: 2400 },
  { month: 'Mar', amount: 1800 },
  { month: 'Apr', amount: 2800 },
  { month: 'May', amount: 3100 },
  { month: 'Jun', amount: 2900 },
  { month: 'Jul', amount: 3500 },
  { month: 'Aug', amount: 3800 }
];

// Tasks or notifications
const notifications = [
  {
    id: '1',
    type: 'review',
    text: 'New review for Luxury Villa in Los Angeles',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'maintenance',
    text: 'Maintenance request: Fix AC in Beachfront House',
    time: '1 day ago'
  },
  {
    id: '3',
    type: 'payment',
    text: 'Payment received for Modern Townhouse booking',
    time: '2 days ago'
  }
];

const OwnerDashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  // Format date to readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPercentChange = (current: number, previous: number): number => {
    return ((current - previous) / previous) * 100;
  };

  return (
    <DashboardLayout userRole="owner">
      <div className="bg-gray-50 min-h-screen">
        {/* Dashboard Header */}
        <div className="px-6 py-6 bg-white border-b">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
              <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your properties</p>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Settings size={20} />
              </button>
              <Link
                to="/owner/properties/add"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
              >
                <Plus size={18} className="mr-1" />
                Add Property
              </Link>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Properties</p>
                  <div className="mt-2 flex items-baseline">
                    <h3 className="text-3xl font-bold text-gray-900">{statistics.totalProperties}</h3>
                    <span className="ml-2 text-sm text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">
                      {statistics.activeListings} active
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <Home className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/owner/properties" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  View all properties <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                  <div className="mt-2 flex items-baseline">
                    <h3 className="text-3xl font-bold text-gray-900">{statistics.totalBookings}</h3>
                    <span className="ml-2 text-sm text-yellow-600 font-medium bg-yellow-100 px-2 py-0.5 rounded-full">
                      {statistics.pendingBookings} pending
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-green-50">
                  <Calendar className="text-green-600" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/owner/bookings" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  Manage bookings <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                  <div className="mt-2 flex items-baseline">
                    <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(statistics.monthlyIncome)}</h3>
                    <span className="ml-2 text-sm text-green-600 font-medium">
                      +{getPercentChange(statistics.monthlyIncome, statistics.previousMonthIncome).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-purple-50">
                  <DollarSign className="text-purple-600" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/owner/finances" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  View financial reports <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Views</p>
                  <div className="mt-2 flex items-baseline">
                    <h3 className="text-3xl font-bold text-gray-900">{statistics.totalViews}</h3>
                    <span className="ml-2 text-sm text-blue-600 font-medium bg-blue-100 px-2 py-0.5 rounded-full">
                      last 30 days
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-indigo-50">
                  <Eye className="text-indigo-600" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/owner/analytics" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  View analytics <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Earnings Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">Earnings Overview</h2>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button 
                      onClick={() => setTimeRange('week')}
                      className={`px-3 py-1 text-sm ${timeRange === 'week' ? 'bg-white shadow-sm rounded-md' : 'text-gray-500'}`}
                    >
                      Week
                    </button>
                    <button 
                      onClick={() => setTimeRange('month')}
                      className={`px-3 py-1 text-sm ${timeRange === 'month' ? 'bg-white shadow-sm rounded-md' : 'text-gray-500'}`}
                    >
                      Month
                    </button>
                    <button 
                      onClick={() => setTimeRange('year')}
                      className={`px-3 py-1 text-sm ${timeRange === 'year' ? 'bg-white shadow-sm rounded-md' : 'text-gray-500'}`}
                    >
                      Year
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="h-64 flex items-end">
                  {monthlyEarnings.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full px-2">
                        <div 
                          className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-all duration-300"
                          style={{ 
                            height: `${(data.amount / 4000) * 200}px`,
                            opacity: index === monthlyEarnings.length - 1 ? 1 : 0.7 + (index * 0.05)
                          }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">{data.month}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Total yearly earnings:</span>
                    <span className="ml-2 font-bold">{formatCurrency(statistics.totalIncome)}</span>
                  </div>
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <Download size={14} className="mr-1" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications/Tasks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                  <Link to="/owner/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start">
                      <div className={`p-2 rounded-full mr-4 ${
                        notification.type === 'review' ? 'bg-yellow-100 text-yellow-600' : 
                        notification.type === 'maintenance' ? 'bg-red-100 text-red-600' : 
                        'bg-green-100 text-green-600'
                      }`}>
                        {notification.type === 'review' ? <Star size={16} /> : 
                         notification.type === 'maintenance' ? <Settings size={16} /> : 
                         <DollarSign size={16} />}
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
                  Mark all as read
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Recent Bookings */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">Recent Booking Requests</h2>
                  <Link to="/owner/bookings" className="text-sm text-blue-600 hover:text-blue-800">
                    View All
                  </Link>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-md bg-gray-200"></div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{booking.propertyName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(booking.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(booking.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Property Performance */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">Property Performance</h2>
                  <span className="text-sm text-gray-500">Last 30 days</span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {propertyPerformance.map((property) => (
                    <div key={property.id} className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0">
                        <div className="h-16 w-16 rounded-md bg-gray-200"></div>
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-gray-900">{property.name}</h3>
                          <span className="text-blue-600 font-medium">{property.views} views</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                          <span>{property.bookings} bookings</span>
                          <span>
                            {property.rating > 0 ? (
                              <span className="flex items-center">
                                <Star size={14} className="text-yellow-500 mr-1" /> {property.rating}
                              </span>
                            ) : (
                              'No ratings'
                            )}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min(100, (property.views / 200) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/owner/analytics" 
                  className="mt-6 block w-full py-2 text-center border border-gray-200 rounded-md text-sm text-blue-600 hover:bg-blue-50 transition"
                >
                  View Detailed Analytics
                </Link>
              </div>
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-md overflow-hidden mb-6">
            <div className="md:flex items-center">
              <div className="p-6 md:w-2/3">
                <h2 className="text-xl font-bold text-white mb-2">Boost Your Property Visibility</h2>
                <p className="text-blue-100 mb-4">
                  Upgrade to Premium listing to get 5x more visibility and priority in search results.
                </p>
                <button className="px-6 py-2 bg-white text-blue-700 rounded-md hover:bg-blue-50 transition shadow-sm font-medium flex items-center">
                  Upgrade Now <ExternalLink size={16} className="ml-2" />
                </button>
              </div>
              <div className="md:w-1/3 p-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full"></div>
                  <TrendingUp size={120} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboardPage;