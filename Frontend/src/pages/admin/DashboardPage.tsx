// src/pages/admin/DashboardPage.tsx
import { Building2, Package, TrendingUp, CheckCircle, AlertTriangle, XCircle, DatabaseBackup } from 'lucide-react';

// Kita bisa adaptasi PriceChart yang sudah ada nanti
import PriceChart from '../../components/PriceChart'; 

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
      <p className="text-gray-500 mt-1">Selamat datang di SIMDAG - Sistem Informasi Perdagangan Salatiga</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Pasar</p>
            <p className="text-3xl font-bold text-gray-800">3</p>
            <p className="text-xs text-green-500 font-semibold">Aktif</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
            <Building2 />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Komoditas</p>
            <p className="text-3xl font-bold text-gray-800">24</p>
            <p className="text-xs text-gray-500 font-semibold">Terdaftar</p>
          </div>
          <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-lg">
            <Package />
          </div>
        </div>
        {/* Kartu lain bisa ditambahkan di sini */}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Grafik */}
        <div className="lg:col-span-2">
          <PriceChart />
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div className="ml-3">
                <p className="text-sm text-gray-700">Data pasar Raya Bawang Putih</p>
                <p className="text-xs text-gray-400">10:30</p>
              </div>
              <span className="ml-auto text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Berhasil</span>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
              <div className="ml-3">
                <p className="text-sm text-gray-700">Update harga LPG 3kg</p>
                <p className="text-xs text-gray-400">08:45</p>
              </div>
              <span className="ml-auto text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Peringatan</span>
            </div>
            <div className="flex items-start">
              <XCircle className="w-5 h-5 text-red-500 mt-1" />
              <div className="ml-3">
                <p className="text-sm text-gray-700">SPBU Pertamina Argomulyo offline</p>
                <p className="text-xs text-gray-400">08:20</p>
              </div>
              <span className="ml-auto text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">Error</span>
            </div>
             <div className="flex items-start">
              <DatabaseBackup className="w-5 h-5 text-blue-500 mt-1" />
              <div className="ml-3">
                <p className="text-sm text-gray-700">Backup database berhasil</p>
                <p className="text-xs text-gray-400">01:30</p>
              </div>
              <span className="ml-auto text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Berhasil</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}