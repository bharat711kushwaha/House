// src/pages/owner/BookingsPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  MapPin, 
  Eye,
  
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

// Booking status type
type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Booking interface
interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyImage: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  createdAt: string;
  message?: string;
}

// Mock bookings data
const initialBookings: Booking[] = [
  {
    id: 'B001',
    propertyId: '1',
    propertyTitle: 'Luxury Villa in Los Angeles',
    propertyAddress: '1234 Wilshire Blvd, Los Angeles, CA',
    propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    customerPhone: '+1 (123) 456-7890',
    startDate: '2025-07-30T14:00:00Z',
    endDate: '2025-07-30T15:00:00Z',
    status: 'pending',
    createdAt: '2025-07-25T10:30:00Z',
    message: 'I\'m interested in this property for my family. Looking forward to seeing it in person.',
  },
  {
    id: 'B002',
    propertyId: '4',
    propertyTitle: 'Modern Townhouse in Chicago',
    propertyAddress: '123 Michigan Ave, Chicago, IL',
    propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    customerName: 'Emily Johnson',
    customerEmail: 'emily.johnson@example.com',
    customerPhone: '+1 (234) 567-8901',
    startDate: '2025-08-05T11:30:00Z',
    endDate: '2025-08-05T12:30:00Z',
    status: 'confirmed',
    createdAt: '2025-07-28T09:15:00Z',
  },
  {
    id: 'B003',
    propertyId: '3',
    propertyTitle: 'Beachfront House in Malibu',
    propertyAddress: '789 Pacific Coast Hwy, Malibu, CA',
    propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    customerName: 'Jennifer Taylor',
    customerEmail: 'jennifer.taylor@example.com',
    customerPhone: '+1 (678) 901-2345',
    startDate: '2025-08-15T14:00:00Z',
    endDate: '2025-08-15T15:00:00Z',
    status: 'confirmed',
    createdAt: '2025-08-01T09:20:00Z',
  },
];

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [propertyFilter, setPropertyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Toggle expanded booking details
  const toggleExpandBooking = (bookingId: string) => {
    if (expandedBookingId === bookingId) {
      setExpandedBookingId(null);
    } else {
      setExpandedBookingId(bookingId);
    }
  };
  
  // Update booking status
  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };
  
  // Handle sort change
  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesProperty = propertyFilter === 'all' || booking.propertyId === propertyFilter;
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesProperty && matchesSearch;
  });
  
  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    if (sortBy === 'date') {
      return direction * (new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    } else if (sortBy === 'created') {
      return direction * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === 'property') {
      return direction * a.propertyTitle.localeCompare(b.propertyTitle);
    } else if (sortBy === 'customer') {
      return direction * a.customerName.localeCompare(b.customerName);
    } else {
      return 0;
    }
  });
  
  // Format date to readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  // Format time to readable format
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };
  
  // Get status badge style
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <Check size={16} className="mr-1" />
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock size={16} className="mr-1" />
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <X size={16} className="mr-1" />
        };
      case 'completed':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <Check size={16} className="mr-1" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: null
        };
    }
  };
  
  // Get unique properties from bookings
  const uniqueProperties = Array.from(
    new Set(bookings.map(booking => booking.propertyId))
  ).map(propertyId => {
    const property = bookings.find(booking => booking.propertyId === propertyId);
    return {
      id: propertyId,
      title: property?.propertyTitle || '',
    };
  });
  
  // Get counts by status
  const statusCounts = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const totalBookings = bookings.length;

  return (
    <DashboardLayout userRole="owner">
      <div>
        <h1 className="text-2xl font-bold mb-6">Booking Requests</h1>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div 
            className={`bg-white rounded-lg shadow p-4 cursor-pointer ${statusFilter === 'all' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            <p className="text-sm text-gray-500">All Bookings</p>
            <p className="text-xl font-bold">{totalBookings}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow p-4 cursor-pointer ${statusFilter === 'pending' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xl font-bold">{statusCounts.pending || 0}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow p-4 cursor-pointer ${statusFilter === 'confirmed' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('confirmed')}
          >
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-xl font-bold">{statusCounts.confirmed || 0}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow p-4 cursor-pointer ${statusFilter === 'completed' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-bold">{statusCounts.completed || 0}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow p-4 cursor-pointer ${statusFilter === 'cancelled' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('cancelled')}
          >
            <p className="text-sm text-gray-500">Cancelled</p>
            <p className="text-xl font-bold">{statusCounts.cancelled || 0}</p>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  value={propertyFilter}
                  onChange={(e) => setPropertyFilter(e.target.value)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Properties</option>
                  {uniqueProperties.map((property) => (
                    <option key={property.id} value={property.id}>{property.title}</option>
                  ))}
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="created">Sort by Created</option>
                  <option value="property">Sort by Property</option>
                  <option value="customer">Sort by Customer</option>
                </select>
                
                <button 
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                >
                  {sortDirection === 'asc' ? (
                    <>
                      <ChevronUp size={18} className="mr-2" />
                      Ascending
                    </>
                  ) : (
                    <>
                      <ChevronDown size={18} className="mr-2" />
                      Descending
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bookings List */}
        {sortedBookings.length > 0 ? (
          <div className="space-y-4 mb-6">
            {sortedBookings.map((booking) => {
              const statusBadge = getStatusBadge(booking.status);
              const isExpanded = expandedBookingId === booking.id;
              
              return (
                <div key={booking.id} className="bg-white rounded-lg shadow overflow-hidden">
                  {/* Booking Header */}
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleExpandBooking(booking.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 mr-4">
                          <img 
                            src={booking.propertyImage} 
                            alt={booking.propertyTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{booking.propertyTitle}</h3>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{booking.propertyAddress}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <Calendar size={14} className="mr-1" />
                            <span>{formatDate(booking.startDate)} at {formatTime(booking.startDate)}</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <span className={`flex items-center text-xs px-2 py-1 rounded-full ${statusBadge.color}`}>
                              {statusBadge.icon}
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500 ml-3">
                              Booking ID: {booking.id}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right mr-2">
                          <div className="text-sm font-medium">{booking.customerName}</div>
                          <div className="text-xs text-gray-500">
                            Request on {formatDate(booking.createdAt)}
                          </div>
                        </div>
                        <div>
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Booking Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Customer Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <span className="text-gray-600 w-24">Name:</span>
                              <span className="font-medium">{booking.customerName}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 w-24">Email:</span>
                              <a href={`mailto:${booking.customerEmail}`} className="text-blue-600 hover:underline">
                                {booking.customerEmail}
                              </a>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 w-24">Phone:</span>
                              <a href={`tel:${booking.customerPhone}`} className="text-blue-600 hover:underline">
                                {booking.customerPhone}
                              </a>
                            </div>
                          </div>
                          
                          {booking.message && (
                            <div className="mt-4">
                              <h4 className="font-medium text-gray-700 mb-2">Message</h4>
                              <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
                                {booking.message}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Booking Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <span className="text-gray-600 w-24">Date:</span>
                              <span className="font-medium">{formatDate(booking.startDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 w-24">Time:</span>
                              <span className="font-medium">{formatTime(booking.startDate)} - {formatTime(booking.endDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 w-24">Status:</span>
                              <span className={`flex items-center text-xs px-2 py-1 rounded-full ${statusBadge.color}`}>
                                {statusBadge.icon}
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 w-24">Created:</span>
                              <span className="font-medium">{formatDate(booking.createdAt)}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Link
                              to={`/properties/${booking.propertyId}`}
                              className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition"
                            >
                              <Eye size={16} className="mr-1" />
                              View Property
                            </Link>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `mailto:${booking.customerEmail}`;
                              }}
                              className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition"
                            >
                              <Mail size={16} className="mr-1" />
                              Email Customer
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `tel:${booking.customerPhone}`;
                              }}
                              className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition"
                            >
                              <Phone size={16} className="mr-1" />
                              Call Customer
                            </button>
                          </div>
                          
                          {/* Status Update Buttons */}
                          {booking.status === 'pending' && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateBookingStatus(booking.id, 'confirmed');
                                }}
                                className="flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                              >
                                <Check size={16} className="mr-1" />
                                Confirm Booking
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateBookingStatus(booking.id, 'cancelled');
                                }}
                                className="flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                              >
                                <X size={16} className="mr-1" />
                                Decline Booking
                              </button>
                            </div>
                          )}
                          
                          {booking.status === 'confirmed' && (
                            <div className="mt-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateBookingStatus(booking.id, 'completed');
                                }}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                              >
                                <Check size={16} className="mr-1" />
                                Mark as Completed
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              <Calendar size={30} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings found</h3>
            {searchQuery || statusFilter !== 'all' || propertyFilter !== 'all' ? (
              <p className="text-gray-600 mb-6">
                No bookings match your current filters. Try adjusting your search criteria.
              </p>
            ) : (
              <p className="text-gray-600 mb-6">
                You don't have any booking requests yet. When customers book property viewings, they will appear here.
              </p>
            )}
            {(searchQuery || statusFilter !== 'all' || propertyFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPropertyFilter('all');
                }}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
        
        {/* Pagination */}
        {sortedBookings.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedBookings.length}</span> of{' '}
                <span className="font-medium">{sortedBookings.length}</span> results
              </span>
            </div>
            <nav className="flex">
              <button
                className="px-3 py-1 border border-gray-300 rounded-l-md text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Previous
              </button>
              <button
                className="px-3 py-1 border-t border-b border-gray-300 bg-blue-50 text-blue-600 font-medium"
              >
                1
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded-r-md text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookingsPage;
  