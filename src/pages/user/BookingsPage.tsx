// src/pages/user/BookingsPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  Search,
  Eye,
  MessageSquare
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

// Define booking status type
type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Define booking type
interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  propertyImage: string;
  price: number;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  ownerName: string;
  ownerContact: string;
  bookingDate: string;
  notes?: string;
}

// Mock bookings data
const initialBookings: Booking[] = [
  {
    id: 'B001',
    propertyId: '1',
    propertyName: 'Luxury Villa in Los Angeles',
    propertyAddress: '1234 Wilshire Blvd, Los Angeles, CA',
    propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    price: 3500000,
    startDate: '2025-07-30T14:00:00Z',
    endDate: '2025-07-30T15:00:00Z',
    status: 'confirmed',
    ownerName: 'Sarah Johnson',
    ownerContact: '+1 (123) 456-7890',
    bookingDate: '2025-07-25T10:30:00Z',
    notes: 'Looking forward to seeing this property!'
  },
  {
    id: 'B002',
    propertyId: '4',
    propertyName: 'Modern Townhouse in Chicago',
    propertyAddress: '123 Michigan Ave, Chicago, IL',
    propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    price: 1750000,
    startDate: '2025-08-05T11:30:00Z',
    endDate: '2025-08-05T12:30:00Z',
    status: 'pending',
    ownerName: 'Michael Brown',
    ownerContact: '+1 (234) 567-8901',
    bookingDate: '2025-07-28T09:15:00Z'
  },
  {
    id: 'B003',
    propertyId: '3',
    propertyName: 'Beachfront House in Malibu',
    propertyAddress: '789 Pacific Coast Hwy, Malibu, CA',
    propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    price: 6200000,
    startDate: '2025-08-10T13:00:00Z',
    endDate: '2025-08-10T14:00:00Z',
    status: 'pending',
    ownerName: 'Jessica Williams',
    ownerContact: '+1 (345) 678-9012',
    bookingDate: '2025-07-27T14:45:00Z',
    notes: 'Interested in the beach access and views.'
  },
  {
    id: 'B004',
    propertyId: '2',
    propertyName: 'Luxury Apartment in Manhattan',
    propertyAddress: '456 Park Ave, New York, NY',
    propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    price: 2800000,
    startDate: '2025-07-15T10:00:00Z',
    endDate: '2025-07-15T11:00:00Z',
    status: 'completed',
    ownerName: 'Robert Davis',
    ownerContact: '+1 (456) 789-0123',
    bookingDate: '2025-07-10T08:30:00Z'
  },
  {
    id: 'B005',
    propertyId: '5',
    propertyName: 'Cozy Apartment Near Downtown',
    propertyAddress: '123 Main St, Portland, OR',
    propertyImage: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    price: 2200,
    startDate: '2025-07-20T15:30:00Z',
    endDate: '2025-07-20T16:30:00Z',
    status: 'cancelled',
    ownerName: 'Jennifer Miller',
    ownerContact: '+1 (567) 890-1234',
    bookingDate: '2025-07-15T11:00:00Z',
    notes: 'Had to cancel due to scheduling conflict.'
  }
];

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Toggle expanded booking details
  const toggleExpandBooking = (bookingId: string) => {
    if (expandedBookingId === bookingId) {
      setExpandedBookingId(null);
    } else {
      setExpandedBookingId(bookingId);
    }
  };
  
  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    ));
  };
  
  // Filter bookings based on status and search query
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = booking.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Get status badge color and text
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle size={16} className="mr-1" />
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <AlertCircle size={16} className="mr-1" />
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <XCircle size={16} className="mr-1" />
        };
      case 'completed':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <CheckCircle size={16} className="mr-1" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: null
        };
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  // Format time for display
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };
  
  // Format price with commas
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Get counts by status
  const statusCounts = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DashboardLayout userRole="user">
      <div>
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">All Bookings</h2>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">{bookings.length}</span>
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Confirmed</h2>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">{statusCounts.confirmed || 0}</span>
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Pending</h2>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">{statusCounts.pending || 0}</span>
              <AlertCircle size={24} className="text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Completed</h2>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">{statusCounts.completed || 0}</span>
              <CheckCircle size={24} className="text-blue-600" />
            </div>
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
              
              <div className="flex-shrink-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Bookings</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
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
                            alt={booking.propertyName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{booking.propertyName}</h3>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{booking.propertyAddress}</span>
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
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            <span>{formatDate(booking.startDate)}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock size={14} className="mr-1" />
                            <span>{formatTime(booking.startDate)}</span>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Booking Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Property Price:</span>
                              <span className="font-medium">{formatPrice(booking.price)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date:</span>
                              <span className="font-medium">{formatDate(booking.startDate)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Time:</span>
                              <span className="font-medium">{formatTime(booking.startDate)} - {formatTime(booking.endDate)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Booked On:</span>
                              <span className="font-medium">{formatDate(booking.bookingDate)}</span>
                            </div>
                            {booking.notes && (
                              <div className="pt-2">
                                <span className="text-gray-600 block mb-1">Notes:</span>
                                <p className="bg-gray-50 p-2 rounded">{booking.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Owner:</span>
                              <span className="font-medium">{booking.ownerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Contact:</span>
                              <span className="font-medium">{booking.ownerContact}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                            <Link
                              to={`/properties/${booking.propertyId}`}
                              className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                            >
                              <Eye size={16} className="mr-1" />
                              View Property
                            </Link>
                            
                            <button className="flex items-center px-3 py-1.5 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300 transition">
                              <MessageSquare size={16} className="mr-1" />
                              Contact Owner
                            </button>
                            
                            {booking.status === 'pending' && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelBooking(booking.id);
                                }}
                                className="flex items-center px-3 py-1.5 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition"
                              >
                                <XCircle size={16} className="mr-1" />
                                Cancel Booking
                              </button>
                            )}
                          </div>
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
            {searchQuery || statusFilter !== 'all' ? (
              <p className="text-gray-600 mb-6">
                No bookings match your current filters. Try adjusting your search criteria.
              </p>
            ) : (
              <p className="text-gray-600 mb-6">
                You haven't scheduled any property viewings yet. Browse properties and request a viewing to see them here.
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
        {filteredBookings.length > 0 && (
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

export default BookingsPage;