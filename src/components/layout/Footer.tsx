
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-campusBridge-blue text-white font-bold text-lg">
              CB
            </div>
            <span className="font-bold text-campusBridge-blue">Campus Bridge</span>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link to="/about" className="text-sm text-gray-500 hover:text-campusBridge-teal">
              About
            </Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-campusBridge-teal">
              Contact
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-campusBridge-teal">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-campusBridge-teal">
              Privacy
            </Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Campus Bridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
