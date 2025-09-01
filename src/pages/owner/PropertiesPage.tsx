// src/pages/owner/PropertiesPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  MoreVertical,
  Filter,
  ArrowUp,
  ArrowDown,
  Calendar
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

// Property status type
type PropertyStatus = 'active' | 'pending' | 'sold' | 'rented' | 'inactive';

// Property type
interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  status: PropertyStatus;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured: boolean;
  views: number;
  bookings: number;
  createdAt: string;
}

// Mock properties data
const initialProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa in Los Angeles',
    address: '1234 Wilshire Blvd, Los Angeles, CA',
    price: 3500000,
    status: 'active',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    featured: true,
    views: 189,
    bookings: 5,
    createdAt: '2025-03-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Luxury Apartment in Manhattan',
    address: '456 Park Ave, New York, NY',
    price: 2800000,
    status: 'active',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    featured: false,
    views: 77,
    bookings: 0,
    createdAt: '2025-02-10T14:30:00Z',
  },
  {
    id: '3',
    title: 'Beachfront House in Malibu',
    address: '789 Pacific Coast Hwy, Malibu, CA',
    price: 6200000,
    status: 'active',
    type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    featured: true,
    views: 156,
    bookings: 4,
    createdAt: '2025-01-05T09:15:00Z',
  },
  {
    id: '4',
    title: 'Modern Townhouse in Chicago',
    address: '123 Michigan Ave, Chicago, IL',
    price: 1750000,
    status: 'active',
    type: 'House',
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2400,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    featured: false,
    views: 120,
    bookings: 3,
    createdAt: '2025-04-20T11:45:00Z',
  },
  {
    id: '5',
    title: 'Cozy Apartment Near Downtown',
    address: '123 Main St, Portland, OR',
    price: 2200,
    status: 'rented',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    featured: false,
    views: 95,
    bookings: 2,
    createdAt: '2025-06-10T09:30:00Z',
  },
  {
    id: '6',
    title: 'Suburban Family Home',
    address: '789 Oak Ave, San Francisco, CA',
    price: 850000,
    status: 'sold',
    type: 'House',
    bedrooms: 4,
    bathrooms: 2.5,
    area: 2800,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    featured: false,
    views: 110,
    bookings: 0,
    createdAt: '2025-07-10T09:00:00Z',
  },
  {
    id: '7',
    title: 'Downtown Office Space',
    address: '567 Business Ave, New York, NY',
    price: 1200000,
    status: 'inactive',
    type: 'Commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 1500,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    featured: false,
    views: 45,
    bookings: 0,
    createdAt: '2025-05-15T13:20:00Z',
  },
  {
    id: '8',
    title: 'Historic Brownstone',
    address: '456 Bedford Ave, Brooklyn, NY',
    price: 3500000,
    status: 'pending',
    type: 'House',
    bedrooms: 5,
    bathrooms: 3.5,
    area: 4000,
    image: 'https://images.unsplash.com/photo-1600573472556-e370bc6193b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
    featured: true,
    views: 134,
    bookings: 3,
    createdAt: '2025-07-20T10:30:00Z',
  },
];

const OwnerPropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  // Toggle action menu
  const toggleActionMenu = (propertyId: string) => {
    if (actionMenuOpen === propertyId) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(propertyId);
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (propertyId: string) => {
    setPropertyToDelete(propertyId);
    setShowDeleteModal(true);
    setActionMenuOpen(null);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (propertyToDelete) {
      setProperties(properties.filter(property => property.id !== propertyToDelete));
      setShowDeleteModal(false);
      setPropertyToDelete(null);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPropertyToDelete(null);
  };

  // Toggle featured status
  const toggleFeatured = (propertyId: string) => {
    setProperties(
      properties.map(property => 
        property.id === propertyId 
          ? { ...property, featured: !property.featured } 
          : property
      )
    );
    setActionMenuOpen(null);
  };

  // Get status badge style
  const getStatusBadge = (status: PropertyStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'rented':
        return 'bg-purple-100 text-purple-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesType = typeFilter === 'all' || property.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortField === 'price') {
      return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortField === 'views') {
      return sortDirection === 'asc' ? a.views - b.views : b.views - a.views;
    } else if (sortField === 'bookings') {
      return sortDirection === 'asc' ? a.bookings - b.bookings : b.bookings - a.bookings;
    } else if (sortField === 'createdAt') {
      return sortDirection === 'asc' 
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() 
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return 0;
    }
  });

  // Get counts by status
  const statusCounts = properties.reduce((acc, property) => {
    acc[property.status] = (acc[property.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DashboardLayout userRole="owner">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Properties</h1>
          <Link
            to="/owner/properties/add"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add New Property
          </Link>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div 
            className={`bg-white rounded-lg shadow p-4 cursor-pointer ${statusFilter === 'all' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            <p className="text-sm text-gray-500">All</p>
            <p className="text-xl font-bold">{properties.length}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow p-4 cursor-pointer ${statusFilter === 'active' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('active')}
          >
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-xl font-bold">{statusCounts.active || 0}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow p-4 cursor-pointer ${statusFilter === 'pending' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xl font-bold">{statusCounts.pending || 0}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow p-4 cursor-pointer ${statusFilter === 'sold' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('sold')}
          >
            <p className="text-sm text-gray-500">Sold</p>
            <p className="text-xl font-bold">{statusCounts.sold || 0}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow p-4 cursor-pointer ${statusFilter === 'rented' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setStatusFilter('rented')}
          >
            <p className="text-sm text-gray-500">Rented</p>
            <p className="text-xl font-bold">{statusCounts.rented || 0}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial">Commercial</option>
                </select>
                
                <button className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                  <Filter size={18} className="mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Price
                      {sortField === 'price' && (
                        sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('views')}
                  >
                    <div className="flex items-center">
                      Views
                      {sortField === 'views' && (
                        sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('bookings')}
                  >
                    <div className="flex items-center">
                      Bookings
                      {sortField === 'bookings' && (
                        sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center">
                      Date Added
                      {sortField === 'createdAt' && (
                        sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-14 w-20 flex-shrink-0">
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="h-14 w-20 object-cover rounded"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{property.title}</div>
                          <div className="text-sm text-gray-500">{property.address}</div>
                          <div className="text-xs text-gray-500">
                            {property.bedrooms} BD | {property.bathrooms} BA | {property.area} ft²
                          </div>
                        </div>
                        {property.featured && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(property.price)}</div>
                      <div className="text-xs text-gray-500">{property.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(property.status)}`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {property.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-400" />
                        {property.bookings}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(property.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button
                          onClick={() => toggleActionMenu(property.id)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          <MoreVertical size={20} />
                        </button>
                        
                        {actionMenuOpen === property.id && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu" aria-orientation="vertical">
                              <Link
                                to={`/properties/${property.id}`}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                onClick={() => setActionMenuOpen(null)}
                              >
                                <Eye size={16} className="mr-2" />
                                View Property
                              </Link>
                              <Link
                                to={`/owner/properties/edit/${property.id}`}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                onClick={() => setActionMenuOpen(null)}
                              >
                                <Edit size={16} className="mr-2" />
                                Edit Property
                              </Link>
                              <button
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                onClick={() => toggleFeatured(property.id)}
                              >
                                {property.featured ? (
                                  <>
                                    <X size={16} className="mr-2" />
                                    Remove Featured
                                  </>
                                ) : (
                                  <>
                                    <Check size={16} className="mr-2" />
                                    Mark as Featured
                                  </>
                                )}
                              </button>
                              <button
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                role="menuitem"
                                onClick={() => handleDeleteClick(property.id)}
                              >
                                <Trash2 size={16} className="mr-2" />
                                Delete Property
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty state */}
          {sortedProperties.length === 0 && (
            <div className="py-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' ? (
                  'Try adjusting your filters to see more results.'
                ) : (
                  'You haven\'t added any properties yet.'
                )}
              </p>
              {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setTypeFilter('all');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              ) : (
                <Link
                  to="/owner/properties/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus size={18} className="mr-1" />
                  Add New Property
                </Link>
              )}
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {sortedProperties.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedProperties.length}</span> of{' '}
                <span className="font-medium">{sortedProperties.length}</span> results
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
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default OwnerPropertiesPage;