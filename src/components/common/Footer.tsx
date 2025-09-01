// src/components/common/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">FindHouses</h3>
            <p className="text-gray-400 mb-4">
              FindHouses is the best place to find your next perfect place to live. 
              We have a wide range of properties for you to choose from.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin size={18} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Main Street, New York, NY 10001</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">info@findhouses.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/agents" className="hover:text-white transition-colors">
                  Agents
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Cities</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/properties?city=new-york" className="hover:text-white transition-colors">
                  New York
                </Link>
              </li>
              <li>
                <Link to="/properties?city=los-angeles" className="hover:text-white transition-colors">
                  Los Angeles
                </Link>
              </li>
              <li>
                <Link to="/properties?city=chicago" className="hover:text-white transition-colors">
                  Chicago
                </Link>
              </li>
              <li>
                <Link to="/properties?city=houston" className="hover:text-white transition-colors">
                  Houston
                </Link>
              </li>
              <li>
                <Link to="/properties?city=miami" className="hover:text-white transition-colors">
                  Miami
                </Link>
              </li>
              <li>
                <Link to="/properties?city=las-vegas" className="hover:text-white transition-colors">
                  Las Vegas
                </Link>
              </li>
              <li>
                <Link to="/properties?city=san-francisco" className="hover:text-white transition-colors">
                  San Francisco
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter and get the latest updates on new properties and real estate news.
            </p>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 w-full rounded-l focus:outline-none text-gray-900"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors flex items-center">
                <Send size={18} />
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              By subscribing you agree to our <Link to="/terms" className="text-blue-400 hover:text-blue-300">Terms & Conditions</Link>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} FindHouses. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;