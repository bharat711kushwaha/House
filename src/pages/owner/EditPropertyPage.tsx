// src/pages/owner/AddPropertyPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, ArrowLeft, Save, MapPin, Camera, CheckCircle2, Home, DollarSign, Info } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: '',
    status: 'active',
    bedrooms: '',
    bathrooms: '',
    area: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    features: [] as string[],
    amenities: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'features' | 'amenities') => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData(prevData => ({
        ...prevData,
        [type]: [...prevData[type], value]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [type]: prevData[type].filter(item => item !== value)
      }));
    }
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  // Handle files
  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    
    // Limit to 10 images
    if (images.length + newFiles.length > 10) {
      alert('You can upload a maximum of 10 images.');
      return;
    }
    
    // Add new files to images array
    setImages(prevImages => [...prevImages, ...newFiles]);
    
    // Create preview URLs
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviews => [...prevPreviews, ...newPreviewUrls]);

    // Clear image error if exists
    if (errors.images) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    // Remove from images array
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    
    // Revoke preview URL and remove from previews array
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  // Navigate to next tab
  const goToNextTab = () => {
    const currentTabErrors = validateCurrentTab();
    
    if (Object.keys(currentTabErrors).length === 0) {
      setActiveTab(prevTab => prevTab + 1);
      window.scrollTo(0, 0);
    } else {
      setErrors(currentTabErrors);
    }
  };

  // Navigate to previous tab
  const goToPrevTab = () => {
    setActiveTab(prevTab => prevTab - 1);
    window.scrollTo(0, 0);
  };

  // Validate current tab
  const validateCurrentTab = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    
    if (activeTab === 0) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.price.trim()) {
        newErrors.price = 'Price is required';
      } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
        newErrors.price = 'Price must be a positive number';
      }
      if (!formData.type) newErrors.type = 'Property type is required';
      if (!formData.status) newErrors.status = 'Status is required';
    } else if (activeTab === 1) {
      if (!formData.bedrooms.trim()) {
        newErrors.bedrooms = 'Bedrooms is required';
      } else if (isNaN(Number(formData.bedrooms)) || Number(formData.bedrooms) < 0) {
        newErrors.bedrooms = 'Bedrooms must be a non-negative number';
      }
      if (!formData.bathrooms.trim()) {
        newErrors.bathrooms = 'Bathrooms is required';
      } else if (isNaN(Number(formData.bathrooms)) || Number(formData.bathrooms) < 0) {
        newErrors.bathrooms = 'Bathrooms must be a non-negative number';
      }
      if (!formData.area.trim()) {
        newErrors.area = 'Area is required';
      } else if (isNaN(Number(formData.area)) || Number(formData.area) <= 0) {
        newErrors.area = 'Area must be a positive number';
      }
    } else if (activeTab === 2) {
      if (!formData.street.trim()) newErrors.street = 'Street address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    } else if (activeTab === 3) {
      if (images.length === 0) newErrors.images = 'At least one image is required';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all tabs
    let allErrors: Record<string, string> = {};
    
    for (let i = 0; i < 4; i++) {
      setActiveTab(i);
      const tabErrors = validateCurrentTab();
      allErrors = { ...allErrors, ...tabErrors };
    }
    
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      
      // Find the first tab with errors and go to it
      for (let i = 0; i < 4; i++) {
        const tabFields = getTabFields(i);
        const hasError = tabFields.some(field => allErrors[field]);
        
        if (hasError) {
          setActiveTab(i);
          break;
        }
      }
      
      return;
    }
    
    // Submit form
    setSubmitting(true);
    
    try {
      // In a real app, you would upload images and submit form data to a server here
      console.log('Form data:', formData);
      console.log('Images:', images);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to properties page
      navigate('/owner/properties');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
    }
  };

  // Get fields for each tab
  const getTabFields = (tabIndex: number): string[] => {
    switch (tabIndex) {
      case 0:
        return ['title', 'description', 'price', 'type', 'status'];
      case 1:
        return ['bedrooms', 'bathrooms', 'area'];
      case 2:
        return ['street', 'city', 'state', 'zipCode', 'country'];
      case 3:
        return ['images'];
      default:
        return [];
    }
  };

  // Check if tab is completed
  const isTabCompleted = (tabIndex: number): boolean => {
    const tabFields = getTabFields(tabIndex);
    return tabFields.every(field => {
      if (field === 'images') return images.length > 0;
      return formData[field as keyof typeof formData] !== '';
    });
  };

  // Tab configuration
  const tabs = [
    { 
      title: 'Basic Info', 
      icon: <Info size={18} />,
      description: 'Property title, description & pricing'
    },
    { 
      title: 'Details', 
      icon: <Home size={18} />,
      description: 'Bedrooms, bathrooms & area'
    },
    { 
      title: 'Location', 
      icon: <MapPin size={18} />,
      description: 'Address & map location'
    },
    { 
      title: 'Media', 
      icon: <Camera size={18} />,
      description: 'Photos, features & amenities'
    }
  ];

  // Property types with icons
  const propertyTypes = [
    { value: 'House', icon: '🏠' },
    { value: 'Apartment', icon: '🏢' },
    { value: 'Villa', icon: '🏡' },
    { value: 'Condo', icon: '🏘️' },
    { value: 'Townhouse', icon: '🏘️' },
    { value: 'Land', icon: '🌍' },
    { value: 'Commercial', icon: '🏪' },
    { value: 'Other', icon: '🏗️' }
  ];

  // Property status options
  const statusOptions = [
    { value: 'active', label: 'Active', color: 'text-green-600 bg-green-50' },
    { value: 'pending', label: 'Pending Approval', color: 'text-yellow-600 bg-yellow-50' },
    { value: 'inactive', label: 'Inactive', color: 'text-gray-600 bg-gray-50' }
  ];

  // Features and amenities with icons
  const featuresList = [
    { name: 'Garage', icon: '🚗' }, { name: 'Basement', icon: '🏠' }, 
    { name: 'Garden', icon: '🌻' }, { name: 'Balcony', icon: '🏞️' }, 
    { name: 'Pool', icon: '🏊' }, { name: 'Fireplace', icon: '🔥' },
    { name: 'Air Conditioning', icon: '❄️' }, { name: 'Heating', icon: '🔥' },
    { name: 'Furnished', icon: '🪑' }, { name: 'Elevator', icon: '🛗' },
    { name: 'Security System', icon: '🔒' }, { name: 'Parking', icon: '🅿️' },
    { name: 'Waterfront', icon: '🌊' }, { name: 'Pets Allowed', icon: '🐕' }
  ];

  const amenitiesList = [
    { name: 'WiFi', icon: '📶' }, { name: 'TV', icon: '📺' },
    { name: 'Washer', icon: '🧺' }, { name: 'Dryer', icon: '🌪️' },
    { name: 'Dishwasher', icon: '🍽️' }, { name: 'Microwave', icon: '📱' },
    { name: 'Refrigerator', icon: '❄️' }, { name: 'Oven', icon: '🔥' },
    { name: 'Gym', icon: '💪' }, { name: 'Spa', icon: '💆' },
    { name: 'Hot Tub', icon: '🛁' }, { name: 'EV Charging', icon: '⚡' },
    { name: 'BBQ Grill', icon: '🔥' }, { name: 'Tennis Court', icon: '🎾' }
  ];

  return (
    <DashboardLayout userRole="owner">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/owner/properties')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
              <p className="text-gray-600 mt-1">Fill in the details to list your property</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {tabs.map((tab, index) => (
              <div 
                key={index} 
                className="flex-1 flex flex-col items-center relative"
              >
                {/* Connection line */}
                {index < tabs.length - 1 && (
                  <div className={`absolute top-6 left-1/2 w-full h-0.5 ${
                    index < activeTab ? 'bg-blue-600' : 'bg-gray-200'
                  } z-0`} />
                )}
                
                {/* Tab Circle */}
                <button
                  onClick={() => {
                    if (index <= activeTab || isTabCompleted(index)) {
                      setActiveTab(index);
                    }
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-200 ${
                    index === activeTab
                      ? 'bg-blue-600 text-white shadow-lg'
                      : index < activeTab || isTabCompleted(index)
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < activeTab || isTabCompleted(index) ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    tab.icon
                  )}
                </button>
                
                {/* Tab Info */}
                <div className="mt-3 text-center">
                  <p className={`text-sm font-medium ${
                    index === activeTab ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {tab.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                    {tab.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Tab 1: Basic Information */}
            {activeTab === 0 && (
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Info size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                    <p className="text-gray-600 text-sm">Tell us about your property</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                      Property Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="e.g. Luxury Villa in Beverly Hills"
                    />
                    {errors.title && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <X size={16} className="mr-1" />
                        {errors.title}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none ${
                        errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Describe your property in detail. Highlight unique features, location benefits, and what makes it special..."
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <X size={16} className="mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-gray-500" />
                        </div>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                            errors.price ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="500,000"
                        />
                      </div>
                      {errors.price && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <X size={16} className="mr-1" />
                          {errors.price}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                        Property Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          errors.type ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <option value="">Select Type</option>
                        {propertyTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.value}
                          </option>
                        ))}
                      </select>
                      {errors.type && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <X size={16} className="mr-1" />
                          {errors.type}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          errors.status ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.status && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <X size={16} className="mr-1" />
                          {errors.status}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Property Details */}
            {activeTab === 1 && (
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Home size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
                    <p className="text-gray-600 text-sm">Specifications and measurements</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-700 mb-2">
                      Bedrooms <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="bedrooms"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      min="0"
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white ${
                        errors.bedrooms ? 'border-red-300' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="3"
                    />
                    {errors.bedrooms && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <X size={16} className="mr-1" />
                        {errors.bedrooms}
                      </p>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <label htmlFor="bathrooms" className="block text-sm font-semibold text-gray-700 mb-2">
                      Bathrooms <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="bathrooms"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      min="0"
                      step="0.5"
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white ${
                        errors.bathrooms ? 'border-red-300' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="2.5"
                    />
                    {errors.bathrooms && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <X size={16} className="mr-1" />
                        {errors.bathrooms}
                      </p>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-2">
                      Area (sq ft) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      min="1"
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white ${
                        errors.area ? 'border-red-300' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="2,500"
                    />
                    {errors.area && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <X size={16} className="mr-1" />
                        {errors.area}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Location */}
            {activeTab === 2 && (
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Location Details</h2>
                    <p className="text-gray-600 text-sm">Where is your property located?</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.street ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="123 Beverly Hills Drive"
                    />
                    {errors.street && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <X size={16} className="mr-1" />
                        {errors.street}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          errors.city ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Los Angeles"
                      />
                      {errors.city && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <X size={16} className="mr-1" />
                          {errors.city}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          errors.state ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="California"
                      />
                      {errors.state && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <X size={16} className="mr-1" />
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          errors.zipCode ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="90210"
                      />
                      {errors.zipCode && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <X size={16} className="mr-1" />
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                  
                  {/* Map Placeholder */}
                  <div className="mt-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Property Location
                    </label>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-blue-300 h-64 rounded-xl flex flex-col items-center justify-center">
                      <MapPin size={48} className="text-blue-500 mb-4" />
                      <p className="text-blue-700 font-medium">Interactive Map</p>
                      <p className="text-blue-600 text-sm text-center mt-2 px-4">
                        In production, this would show an interactive map where you can pinpoint the exact property location
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Photos & Features */}
            {activeTab === 3 && (
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Camera size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Photos & Features</h2>
                    <p className="text-gray-600 text-sm">Showcase your property with photos and highlight features</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Property Photos <span className="text-red-500">*</span>
                    </label>
                    <div 
                      className={`border-3 border-dashed rounded-2xl p-8 transition-all duration-200 ${
                        dragActive 
                          ? 'border-blue-500 bg-blue-50' 
                          : errors.images 
                          ? 'border-red-400 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <div className="text-center">
                        <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center ${
                          dragActive ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Upload className={`h-8 w-8 ${
                            dragActive ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="mt-4">
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <span className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                              Click to upload
                            </span>
                            <span className="text-gray-600"> or drag and drop</span>
                          </label>
                          <input
                            id="image-upload"
                            name="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            PNG, JPG, GIF up to 10MB each (Maximum 10 images)
                          </p>
                        </div>
                      </div>
                      
                      {previewImages.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                          {previewImages.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="h-32 w-full object-cover rounded-xl shadow-md"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-xl transition-all duration-200" />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-600 focus:outline-none transform scale-90 hover:scale-100 transition-all duration-200"
                              >
                                <X size={16} />
                              </button>
                              {index === 0 && (
                                <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                                  Main Photo
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.images && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <X size={16} className="mr-1" />
                        {errors.images}
                      </p>
                    )}
                  </div>
                  
                  {/* Features */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Property Features
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {featuresList.map((feature) => (
                        <label 
                          key={feature.name} 
                          className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            formData.features.includes(feature.name)
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={feature.name}
                            checked={formData.features.includes(feature.name)}
                            onChange={(e) => handleCheckboxChange(e, 'features')}
                            className="sr-only"
                          />
                          <span className="text-xl mr-3">{feature.icon}</span>
                          <span className="text-sm font-medium">{feature.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {amenitiesList.map((amenity) => (
                        <label 
                          key={amenity.name} 
                          className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            formData.amenities.includes(amenity.name)
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={amenity.name}
                            checked={formData.amenities.includes(amenity.name)}
                            onChange={(e) => handleCheckboxChange(e, 'amenities')}
                            className="sr-only"
                          />
                          <span className="text-xl mr-3">{amenity.icon}</span>
                          <span className="text-sm font-medium">{amenity.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Footer */}
            <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={goToPrevTab}
                  className={`flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 ${
                    activeTab === 0 ? 'invisible' : ''
                  }`}
                >
                  <ArrowLeft size={18} />
                  <span className="font-medium">Previous</span>
                </button>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Step {activeTab + 1} of {tabs.length}</span>
                </div>
                
                {activeTab < 3 ? (
                  <button
                    type="button"
                    onClick={goToNextTab}
                    className="flex items-center space-x-2 px-6 py-3 border-2 border-blue-600 rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span className="font-medium">Continue</span>
                    <ArrowLeft size={18} className="rotate-180" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex items-center space-x-2 px-8 py-3 border-2 border-green-600 rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-md hover:shadow-lg ${
                      submitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-medium">Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span className="font-medium">Publish Property</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddPropertyPage;