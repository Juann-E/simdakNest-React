// src/components/Header.tsx

import { Link } from 'react-router-dom';
import { ChartColumn, TriangleAlert, Eye } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <ChartColumn className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                <h1 className="text-lg sm:text-xl font-bold text-blue-600">SIMDAG</h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                    Sistem Informasi Perdagangan
                </p>
                </div>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3">
            {/* 2. Ganti <a> dengan <Link> dan href="#" dengan to="/login" */}
            <Link
              to="/login" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-200 h-9 rounded-md px-3 text-xs sm:text-sm bg-yellow-400 text-yellow-900 hover:bg-yellow-400/90 shadow-lg hover:shadow-xl"
            >
              <TriangleAlert className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Login Admin</span>
              <span className="sm:hidden">Admin</span>
            </Link>
            <a
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-200 h-9 rounded-md px-3 text-xs sm:text-sm border border-gray-200 bg-white hover:bg-gray-100"
              href="#" // Biarkan ini sebagai link eksternal atau ganti sesuai kebutuhan
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Training</span>
              <span className="sm:hidden">Info</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}