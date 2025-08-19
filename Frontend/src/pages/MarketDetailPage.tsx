// src/pages/MarketDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000';

interface Market {
  id: number;
  nama_pasar: string;
}

interface CommodityData {
  name: string;
  unit: string;
  priceToday: number;
  priceYesterday: number;
  gambar?: string; // Path gambar dari backend
}

const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

// Fungsi helper ini tidak perlu diubah, sudah benar
const createImageUrl = (path?: string) => {
  if (!path) return null;
  const cleanedPath = path.replace(/\\/g, '/').replace('uploads/', '');
  return `${API_BASE_URL}/${cleanedPath}`;
};

export default function MarketDetailPage() {
  const { marketId } = useParams<{ marketId: string }>();
  const [marketName, setMarketName] = useState('');
  const [commodityList, setCommodityList] = useState<CommodityData[]>([]);
  const [loading, setLoading] = useState(true);

  const numericMarketId = parseInt(marketId || '0', 10);

  useEffect(() => {
    if (!numericMarketId) return;

    const fetchDetailData = async () => {
      setLoading(true);
      try {
        // const marketRes = await axios.get(`${API_BASE_URL}/public/markets`);
        const marketRes = await axios.get<Market[]>(`${API_BASE_URL}/public/markets`);
        const currentMarket = marketRes.data.find(m => m.id === numericMarketId);
        if (currentMarket) {
          setMarketName(currentMarket.nama_pasar);
        }

        // const pricesRes = await axios.get(`${API_BASE_URL}/public/prices/market/${numericMarketId}`);
        const pricesRes = await axios.get<CommodityData[]>(`${API_BASE_URL}/public/prices/market/${numericMarketId}`);
        setCommodityList(pricesRes.data);

      } catch (error) {
        console.error("Gagal mengambil detail data pasar:", error);
        setCommodityList([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetailData();
  }, [numericMarketId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-8">
        <ArrowLeft size={18} />
        Kembali ke Daftar Pasar
      </Link>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Analisis Perbandingan Harian</h1>
        <p className="text-2xl text-gray-500 mt-2">{marketName || 'Memuat...'}</p>
      </div>
      
      {loading ? (
        <p className="text-center text-gray-500">Memuat data harga...</p>
      ) : commodityList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commodityList.map(item => {
            const change = item.priceToday - item.priceYesterday;
            const percentage = item.priceYesterday !== 0 ? (change / item.priceYesterday) * 100 : 0;
            const isUp = change > 0;
            const isDown = change < 0;
            const imageUrl = createImageUrl(item.gambar);

            return (
              // --- PERUBAHAN TATA LETAK KARTU ---
              <div key={item.name} className="border rounded-lg bg-white shadow-sm overflow-hidden">
                {/* Bagian Gambar di Atas */}
                <img 
                  src={imageUrl || '/default-item.jpg'} // Sediakan gambar default jika tidak ada
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />

                {/* Bagian Konten di Bawah */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold capitalize text-lg text-gray-800">{item.name}</h4>
                    <div className={`rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center space-x-1 ${
                      isUp ? 'bg-red-100 text-red-700' : isDown ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {isUp && <TrendingUp size={12} />}
                      {isDown && <TrendingDown size={12} />}
                      {percentage !== 0 ? `${percentage.toFixed(2)}%` : 'Stabil'}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hari Ini:</span>
                      <span className="font-medium">{item.priceToday > 0 ? formatCurrency(item.priceToday) : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Kemarin:</span>
                      <span className="font-medium">{item.priceYesterday > 0 ? formatCurrency(item.priceYesterday) : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Perubahan:</span>
                      <span className={`font-medium ${isUp ? 'text-red-600' : isDown ? 'text-green-600' : 'text-gray-600'}`}>
                        {change > 0 ? `+${formatCurrency(change)}` : formatCurrency(change)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">Belum ada data harga yang dilaporkan untuk pasar ini hari ini.</p>
      )}
    </div>
  );
}