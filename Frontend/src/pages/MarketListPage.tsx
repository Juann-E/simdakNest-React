// src/pages/MarketListPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import FeatureCarousel from '../components/FeatureCarousel';
import MapSection from '../components/MapSection';
import PriceChart from '../components/PriceChart';
import Footer from '../components/Footer'; // 1. Import komponen Footer
import { MapPin } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000';

interface Market {
  id: number;
  nama_pasar: string;
  alamat: string;
  gambar?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
}

export default function MarketListPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/public/markets`);
        
        const marketsWithImages = response.data.map((market: Market) => {
          let imageUrl = '/default-market.jpg';
          if (market.gambar) {
            const cleanedPath = market.gambar.replace(/\\/g, '/').replace('uploads/', '');
            imageUrl = `${API_BASE_URL}/${cleanedPath}`;
          }
          return { ...market, imageUrl };
        });
        
        setMarkets(marketsWithImages);

        if (marketsWithImages.length > 0) {
          setSelectedMarket(marketsWithImages[0]);
        }

      } catch (error) {
        console.error("Gagal mengambil data pasar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkets();
  }, []);

  return (
    // Gunakan React Fragment <>...</> untuk membungkus halaman dan footer
    <>
      <div className="space-y-12 pb-16">
        <HeroSection />
        <FeatureCarousel />
        
        <section className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-4xl font-bold text-gray-800">Peta Lokasi Pasar</h3>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Pilih nama pasar di samping untuk melihat lokasinya di peta.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg h-full max-h-[500px] overflow-y-auto">
              <h4 className="text-2xl font-bold mb-4">Pilih Pasar</h4>
              <ul className="space-y-2">
                {markets.map(market => (
                  <li key={market.id}>
                    <button 
                      onClick={() => setSelectedMarket(market)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center ${selectedMarket?.id === market.id ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-gray-100'}`}
                    >
                      <MapPin size={18} className="mr-3 flex-shrink-0" />
                      {market.nama_pasar}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <MapSection markets={markets} selectedMarket={selectedMarket} />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 mt-16">
          <div className="text-center space-y-4 mb-12">
              <h3 className="text-4xl font-bold text-gray-800">Analisis Tren Harga Komoditas</h3>
              <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                  Pilih pasar pada grafik di bawah untuk melihat tren harga
              </p>
          </div>
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
      
      <Footer />
    </>
  );
}