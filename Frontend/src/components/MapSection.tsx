// src/components/MapSection.tsx

import { MapPin } from 'lucide-react';

export default function MapSection() {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="rounded-lg bg-white text-gray-800 shadow-sm border-2">
          {/* Card Header */}
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center text-blue-600">
              <MapPin className="w-5 h-5 mr-2" />
              Peta Pasar Di Salatiga
            </h3>
            <p className="text-sm text-gray-500">
              Peta interaktif akan ditampilkan di sini (sementara dalam pengembangan)
            </p>
          </div>
          {/* Card Content (Placeholder) */}
          <div className="p-6 pt-0">
            <div className="h-96 rounded-lg border bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Peta Salatiga</h3>
                  <p className="text-gray-500">
                    Menampilkan lokasi Pasar Salatiga
                  </p>
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600">PASAR RAYA I</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                <span className="text-sm text-gray-600">PASAR BLAURAN</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                <span className="text-sm text-gray-600">PASAR REJOSARI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}