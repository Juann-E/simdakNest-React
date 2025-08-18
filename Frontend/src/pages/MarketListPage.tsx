// src/pages/MarketListPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import FeatureCarousel from '../components/FeatureCarousel';
import MapSection from '../components/MapSection';
import PriceChart from '../components/PriceChart';

interface Market {
  id: number;
  nama_pasar: string;
  alamat: string;
  imageUrl?: string;
}

// Anda bisa menambahkan lebih banyak gambar di sini jika jumlah pasar bertambah
const marketImages = {
  1: '/pasar-raya.jpg',
  2: '/pasar-blauran.jpg',
  3: '/pasar-rejosari.jpg',
  4: '/pasar-pagi.jpg',
  5: '/pasar-jetis.jpg',
};

export default function MarketListPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      setLoading(true);
      try {
        // Mengambil data pasar dari endpoint publik
        const response = await axios.get('http://localhost:3000/public/markets');
        const marketsWithImages = response.data.map((market: Market) => ({
          ...market,
          imageUrl: marketImages[market.id] || '/default-market.jpg' // Memberi gambar default
        }));
        setMarkets(marketsWithImages);
      } catch (error) {
        console.error("Gagal mengambil data pasar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkets();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      <HeroSection />
      <FeatureCarousel />
      <MapSection />

      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4 mb-12">
            <h3 className="text-4xl font-bold text-gray-800">Analisis Tren Harga Komoditas</h3>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                Pilih pasar pada grafik di bawah untuk melihat tren harga
            </p>
        </div>
        {/*
          Panggil PriceChart tanpa props.
          Komponen ini sekarang akan mengambil dan mengelola datanya sendiri.
        */}
        <PriceChart />
      </section>

      <div className="container mx-auto px-4 mt-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Daftar Pasar</h1>
            <p className="text-lg text-gray-500 mt-2">Klik pasar untuk melihat perbandingan harga harian</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
                <p className="col-span-full text-center">Memuat data pasar...</p>
            ) : (
                markets.map((market) => (
                <Link to={`/market/${market.id}`} key={market.id} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <img src={market.imageUrl} alt={market.nama_pasar} className="w-full h-48 object-cover" />
                    <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{market.nama_pasar}</h2>
                    <p className="text-sm text-gray-500 mb-4">{market.alamat}</p>
                    <div className="flex items-center text-blue-600 font-semibold">
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full mr-3">Aktif</span>
                        Lihat Harga Real-time →
                    </div>
                    </div>
                </Link>
                ))
            )}
        </div>
      </div>
    </div>
  );
}