// src/layouts/DashboardLayout.tsx

import React, { type ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Home, 
  Grid, 
  Heart, 
  Calendar, 
  Settings, 
  Menu, 
  X,
  ChevronDown,
  ChevronUp,
  Search,
  PlusCircle,
  BarChart,
  Users,
  Building
} from 'lucide-react';

import Footer from '../components/common/Footer';

// Interface for child menu items
interface ChildMenuItem {
  path: string;
  label: string;
}

// Interface for main navigation items
interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  role: string[];
  children?: ChildMenuItem[];
}

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: 'user' | 'owner' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  userRole = 'user' 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    properties: false,
    bookings: false,
    users: false,
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleLogout = () => {
    // In a real app, handle logout logic here
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const userNavItems: NavItem[] = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: <Home size={20} />,
      role: ['user', 'owner', 'admin']
    },
    { 
      path: '/dashboard/favorites', 
      label: 'Favorites', 
      icon: <Heart size={20} />,
      role: ['user']
    },
    { 
      path: '/dashboard/bookings', 
      label: 'My Bookings', 
      icon: <Calendar size={20} />,
      role: ['user']
    },
    { 
      path: '/dashboard/profile', 
      label: 'My Profile', 
      icon: <User size={20} />,
      role: ['user', 'owner', 'admin']
    },
  ];

  const ownerNavItems: NavItem[] = [
    { 
      path: '/owner/dashboard', 
      label: 'Dashboard', 
      icon: <Home size={20} />,
      role: ['owner']
    },
    { 
      path: '/owner/properties', 
      label: 'Properties', 
      icon: <Building size={20} />,
      role: ['owner'],
      children: [
        { path: '/owner/properties', label: 'All Properties' },
        { path: '/owner/properties/add', label: 'Add New Property' },
      ],
    },
    { 
      path: '/owner/bookings', 
      label: 'Bookings', 
      icon: <Calendar size={20} />,
      role: ['owner']
    },
    { 
      path: '/owner/analytics', 
      label: 'Analytics', 
      icon: <BarChart size={20} />,
      role: ['owner']
    },
    { 
      path: '/owner/profile', 
      label: 'Profile', 
      icon: <User size={20} />,
      role: ['owner']
    },
  ];

  const adminNavItems: NavItem[] = [
    { 
      path: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: <Home size={20} />,
      role: ['admin']
    },
    { 
      path: '/admin/users', 
      label: 'Users', 
      icon: <Users size={20} />,
      role: ['admin']
    },
    { 
      path: '/admin/properties', 
      label: 'Properties', 
      icon: <Grid size={20} />,
      role: ['admin']
    },
    { 
      path: '/admin/bookings', 
      label: 'Bookings', 
      icon: <Calendar size={20} />,
      role: ['admin']
    },
    { 
      path: '/admin/settings', 
      label: 'Settings', 
      icon: <Settings size={20} />,
      role: ['admin']
    },
  ];

  // Determine which nav items to display based on user role
  let navItems: NavItem[] = userNavItems;
  if (userRole === 'owner') {
    navItems = ownerNavItems;
  } else if (userRole === 'admin') {
    navItems = adminNavItems;
  }

  const getUserInfo = () => {
    switch (userRole) {
      case 'owner':
        return { name: 'Sarah Johnson', initials: 'SJ' };
      case 'admin':
        return { name: 'Admin User', initials: 'AU' };
      default:
        return { name: 'John Doe', initials: 'JD' };
    }
  };

  const userInfo = getUserInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Mobile Menu Toggle */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden transition-colors"
              >
                <Menu size={22} />
              </button>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building size={20} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">FindHouses</h1>
              </Link>
            </div>

            {/* Search Bar (Hidden on Mobile) */}
            <div className="hidden md:flex flex-grow max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Right Side Items */}
            <div className="flex items-center space-x-3">
              {/* Owner Dashboard Button */}
              {userRole === 'owner' && (
                <Link 
                  to="/owner/dashboard"
                  className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                >
                  <BarChart size={16} />
                  <span className="text-sm font-medium">Owner Dashboard</span>
                </Link>
              )}
              
              {/* Add New Button (for property owners) */}
              {userRole === 'owner' && (
                <Link 
                  to="/owner/properties/add"
                  className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <PlusCircle size={18} />
                  <span className="text-sm font-medium">Add Property</span>
                </Link>
              )}
              
              {/* User Menu */}
              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-gray-800">{userInfo.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-medium shadow-md">
                    {userInfo.initials}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Overlay (Mobile) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden backdrop-blur-sm"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <div 
          className={`
            md:w-72 bg-white shadow-xl z-50 border-r border-gray-200
            ${isSidebarOpen ? 'fixed inset-y-0 left-0 w-80' : 'hidden'} 
            md:block md:static md:h-auto
          `}
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button 
                onClick={closeSidebar}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* User Profile Summary */}
            <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                  {userInfo.initials}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{userInfo.name}</p>
                  <p className="text-sm text-blue-600 capitalize font-medium">{userRole} Account</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => {
                  if (!item.role.includes(userRole)) return null;
                  
                  if (item.children) {
                    return (
                      <li key={item.path}>
                        <button 
                          onClick={() => toggleMenu(item.label.toLowerCase())}
                          className={`
                            w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200
                            ${isActive(item.path) 
                              ? 'bg-blue-600 text-white shadow-md' 
                              : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                            }
                          `}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <span className="transition-transform duration-200">
                            {openMenus[item.label.toLowerCase()] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        </button>
                        
                        {/* Submenu */}
                        {openMenus[item.label.toLowerCase()] && (
                          <ul className="ml-6 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                            {item.children.map((child: ChildMenuItem) => (
                              <li key={child.path}>
                                <Link
                                  to={child.path}
                                  onClick={closeSidebar}
                                  className={`
                                    block p-2 rounded-lg text-sm transition-colors
                                    ${isActive(child.path) 
                                      ? 'text-blue-600 bg-blue-50 font-medium' 
                                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                    }
                                  `}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  }
                  
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={closeSidebar}
                        className={`
                          flex items-center p-3 rounded-xl transition-all duration-200
                          ${isActive(item.path) 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                          }
                        `}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            {/* Logout Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
              >
                <span className="mr-3"><LogOut size={20} /></span>
                <span className="font-medium">Logout</span>
              </button>
            </div>
            
            {/* Upgrade Banner (for owners) */}
            {userRole === 'owner' && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg">
                <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Get premium features and boost your property visibility.
                </p>
                <button className="w-full py-2.5 bg-white text-blue-600 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm">
                  Upgrade Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;