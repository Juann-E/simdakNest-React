// src/pages/MarketListPage.tsx
import { Link } from 'react-router-dom';

// Impor kembali komponen-komponen yang ingin ditampilkan
import HeroSection from '../components/HeroSection';
import FeatureCarousel from '../components/FeatureCarousel';
import MapSection from '../components/MapSection';
import PriceChart from '../components/PriceChart'; // <-- 1. Impor PriceChart di sini

const markets = [
  { id: 1, name: 'Pasar Raya I', address: 'Jl. Taman Pahlawan No.18, Kutowinangun Kidul', imageUrl: '/pasar-raya.jpg' },
  { id: 2, name: 'Pasar Blauran', address: 'Jl. Nyai Kopek, Kutowinangun Kidul', imageUrl: '/pasar-blauran.jpg' },
  { id: 3, name: 'Pasar Rejosari', address: 'Jl. Hasanudin No.3, Mangunsari', imageUrl: '/pasar-rejosari.jpg' },
];

export default function MarketListPage() {
  return (
    // Kita bungkus semua section dalam satu div utama
    <div className="space-y-12 pb-16">
      <HeroSection />
      <FeatureCarousel />
      <MapSection />

      {/* 2. Tambahkan kembali section untuk Analisis Tren Harga */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4 mb-12">
            <h3 className="text-4xl font-bold text-gray-800">Analisis Tren Harga Komoditas</h3>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                Monitoring pergerakan harga dan analisis tren mingguan komoditas pasar di Salatiga
            </p>
        </div>
        <PriceChart />
      </section>

      {/* Bagian Daftar Pasar */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Daftar Pasar</h1>
          <p className="text-lg text-gray-500 mt-2">Klik pasar untuk melihat harga komoditas real-time</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {markets.map((market) => (
            <Link to={`/market/${market.id}`} key={market.id} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img src={market.imageUrl} alt={market.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{market.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{market.address}</p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full mr-3">Aktif</span>
                  Lihat Harga Real-time →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}