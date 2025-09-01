// src/pages/owner/AddPropertyPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ArrowLeft, Save } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
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

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
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

  // Tab titles
  const tabs = [
    'Basic Information',
    'Property Details',
    'Location',
    'Photos & Features'
  ];

  // Property types
  const propertyTypes = [
    'House',
    'Apartment',
    'Villa',
    'Condo',
    'Townhouse',
    'Land',
    'Commercial',
    'Other'
  ];

  // Property status options
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'inactive', label: 'Inactive' }
  ];

  // Features and amenities
  const featuresList = [
    'Garage', 'Basement', 'Garden', 'Balcony', 'Pool',
    'Fireplace', 'Air Conditioning', 'Heating', 'Furnished',
    'Elevator', 'Security System', 'Parking', 'Waterfront', 'Pets Allowed'
  ];

  const amenitiesList = [
    'Wifi', 'TV', 'Washer', 'Dryer', 'Dishwasher',
    'Microwave', 'Refrigerator', 'Oven', 'Gym', 'Spa',
    'Hot Tub', 'EV Charging', 'BBQ Grill', 'Tennis Court'
  ];

  return (
    <DashboardLayout userRole="owner">
      <div>
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/owner/properties')}
            className="mr-4 p-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Add New Property</h1>
        </div>

        {/* Progress Tabs */}
        <div className="mb-8">
          <div className="flex border-b">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`pb-3 px-4 text-sm font-medium ${
                  activeTab === index
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => {
                  const currentTabErrors = validateCurrentTab();
                  if (Object.keys(currentTabErrors).length === 0 || index < activeTab) {
                    setActiveTab(index);
                  } else {
                    setErrors(currentTabErrors);
                  }
                }}
              >
                <span className="hidden md:inline">{index + 1}. {tab}</span>
                <span className="md:hidden">{index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            {/* Tab 1: Basic Information */}
            {activeTab === 0 && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Property Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. Luxury Villa in Los Angeles"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Describe your property..."
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className={`w-full pl-7 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                            errors.price ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g. 500000"
                        />
                      </div>
                      {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Property Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.type ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Type</option>
                        {propertyTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.status ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Property Details */}
            {activeTab === 1 && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Property Details</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                        Bedrooms <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        min="0"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.bedrooms ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. 3"
                      />
                      {errors.bedrooms && <p className="mt-1 text-sm text-red-500">{errors.bedrooms}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.bathrooms ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. 2"
                      />
                      {errors.bathrooms && <p className="mt-1 text-sm text-red-500">{errors.bathrooms}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                        Area (sq ft) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        min="1"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.area ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. 1500"
                      />
                      {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Location */}
            {activeTab === 2 && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Location</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.street ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. 123 Main St"
                    />
                    {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. Los Angeles"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. CA"
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. 90001"
                      />
                      {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. USA"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">
                      <p className="text-gray-500">Map functionality would be integrated here</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      In a complete implementation, this would show a map where you could pinpoint the exact location.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Photos & Features */}
            {activeTab === 3 && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Photos & Features</h2>
                
                <div className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Photos <span className="text-red-500">*</span>
                    </label>
                    <div className={`border-2 border-dashed rounded-md p-6 ${
                      errors.images ? 'border-red-500' : 'border-gray-300'
                    }`}>
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <label htmlFor="image-upload" className="cursor-pointer text-blue-600 hover:text-blue-500 font-medium">
                            Click to upload
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
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF up to 10MB (Max. 10 images)
                          </p>
                        </div>
                      </div>
                      
                      {previewImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {previewImages.map((preview, index) => (
                            <div key={index} className="relative">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="h-24 w-full object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
                  </div>
                  
                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {featuresList.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`feature-${feature}`}
                            value={feature}
                            checked={formData.features.includes(feature)}
                            onChange={(e) => handleCheckboxChange(e, 'features')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-gray-700">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amenities
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {amenitiesList.map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`amenity-${amenity}`}
                            value={amenity}
                            checked={formData.amenities.includes(amenity)}
                            onChange={(e) => handleCheckboxChange(e, 'amenities')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="px-6 py-4 bg-gray-50 flex justify-between">
              <button
                type="button"
                onClick={goToPrevTab}
                className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  activeTab === 0 ? 'invisible' : ''
                }`}
              >
                Previous
              </button>
              
              {activeTab < 3 ? (
                <button
                  type="button"
                  onClick={goToNextTab}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center ${
                    submitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Property
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddPropertyPage;