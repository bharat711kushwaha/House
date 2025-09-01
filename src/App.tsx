// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import LoginPage from './pages/LoginPage';

import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// User Dashboard Pages
import UserDashboardPage from './pages/user/DashboardPage';
import UserProfilePage from './pages/user/ProfilePage';
import UserFavoritesPage from './pages/user/FavoritesPage';
import UserBookingsPage from './pages/user/BookingsPage';

// Owner Dashboard Pages
import OwnerDashboardPage from './pages/owner/DashboardPage';
import OwnerPropertiesPage from './pages/owner/PropertiesPage';
import OwnerAddPropertyPage from './pages/owner/AddPropertyPage';
import OwnerEditPropertyPage from './pages/owner/EditPropertyPage';
import OwnerBookingsPage from './pages/owner/BookingsPage';

// Admin Dashboard Pages
// import AdminDashboardPage from './pages/admin/DashboardPage';
// import AdminUsersPage from './pages/admin/UsersPage';
// import AdminPropertiesPage from './pages/admin/PropertiesPage';
// import AdminBookingsPage from './pages/admin/BookingsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
   
        <Route path="/contact" element={<ContactPage />} />
        
        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/dashboard/profile" element={<UserProfilePage />} />
        <Route path="/dashboard/favorites" element={<UserFavoritesPage />} />
        <Route path="/dashboard/bookings" element={<UserBookingsPage />} />
        
        {/* Owner Dashboard Routes */}
        <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
        <Route path="/owner/properties" element={<OwnerPropertiesPage />} />
        <Route path="/owner/properties/add" element={<OwnerAddPropertyPage />} />
        <Route path="/owner/properties/edit/:id" element={<OwnerEditPropertyPage />} />
        <Route path="/owner/bookings" element={<OwnerBookingsPage />} />
        
        {/* Admin Dashboard Routes */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/properties" element={<AdminPropertiesPage />} />
        <Route path="/admin/bookings" element={<AdminBookingsPage />} />
         */}
        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;