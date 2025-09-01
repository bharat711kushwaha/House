// src/pages/user/ProfilePage.tsx

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Lock, Camera, Save } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

// Mock user data
const userData = {
  id: '123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (123) 456-7890',
  address: '123 Main St, Anytown, CA 12345',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
  avatar: '',
  createdAt: '2025-01-15T10:00:00Z',
};

const UserProfilePage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
    bio: userData.bio,
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEditToggle = () => {
    if (isEditMode) {
      // If we're saving, reset the form data to the current user data
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        bio: userData.bio,
      });
    }
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the profile data to the server here
    
    // Show success message
    setSuccessMessage('Profile updated successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    
    setIsEditMode(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error message
    setPasswordError('');
    
    // Validate password
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    // In a real app, you would send the password change request to the server here
    
    // Show success message
    setSuccessMessage('Password changed successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <DashboardLayout userRole="user">
      <div>
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
            {successMessage}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Profile Information</h2>
                  <button
                    onClick={handleEditToggle}
                    className={`px-4 py-2 rounded ${
                      isEditMode 
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition`}
                  >
                    {isEditMode ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                
                {isEditMode ? (
                  <form onSubmit={handleSaveProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
                      >
                        <Save size={18} className="mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <User size={20} className="text-blue-600 mr-3 mt-1" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="text-gray-900">{userData.firstName} {userData.lastName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail size={20} className="text-blue-600 mr-3 mt-1" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                        <p className="text-gray-900">{userData.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone size={20} className="text-blue-600 mr-3 mt-1" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                        <p className="text-gray-900">{userData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin size={20} className="text-blue-600 mr-3 mt-1" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Address</h3>
                        <p className="text-gray-900">{userData.address}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
                      <p className="text-gray-900">{userData.bio}</p>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-500">
                        Member since {new Date(userData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Password Change */}
            <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Change Password</h2>
                
                {passwordError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
                    {passwordError}
                  </div>
                )}
                
                <form onSubmit={handlePasswordChange}>
                  <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
                    >
                      <Lock size={18} className="mr-2" />
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Profile Picture */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Profile Picture</h2>
                
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4">
                    {userData.avatar ? (
                      <img 
                        src={userData.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100">
                        <User size={60} className="text-blue-600" />
                      </div>
                    )}
                  </div>
                  
                  <label 
                    htmlFor="avatar-upload"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition cursor-pointer flex items-center"
                  >
                    <Camera size={18} className="mr-2" />
                    Change Photo
                  </label>
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    accept="image/*" 
                    className="hidden" 
                  />
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    JPG, GIF or PNG. Max size 800K
                  </p>
                </div>
              </div>
            </div>
            
            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">SMS Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Marketing Emails</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <button
                    className="w-full px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfilePage;