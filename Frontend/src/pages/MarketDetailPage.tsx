// src/pages/MarketDetailPage.tsx
import { useParams, Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';

// Data bohongan untuk simulasi
const commodityData = {
  '1': [ // Data untuk Pasar Raya I
    { name: 'Beras', priceToday: 12500, priceYesterday: 12300, unit: 'kg' },
    { name: 'Cabai', priceToday: 36500, priceYesterday: 38000, unit: 'kg' },
    { name: 'Bawang', priceToday: 25000, priceYesterday: 25000, unit: 'kg' },
    { name: 'Minyak Goreng', priceToday: 19000, priceYesterday: 18500, unit: 'liter' },
  ],
  '2': [ // Data untuk Pasar Blauran
    { name: 'Beras', priceToday: 12600, priceYesterday: 12600, unit: 'kg' },
    { name: 'Daging Sapi', priceToday: 120000, priceYesterday: 118000, unit: 'kg' },
    { name: 'Telur Ayam', priceToday: 28000, priceYesterday: 29500, unit: 'kg' },
  ],
  '3': [ // Data untuk Pasar Rejosari
    { name: 'Gula Pasir', priceToday: 16000, priceYesterday: 16500, unit: 'kg' },
    { name: 'Cabai', priceToday: 37000, priceYesterday: 36500, unit: 'kg' },
    { name: 'Bawang', priceToday: 24500, priceYesterday: 24500, unit: 'kg' },
    { name: 'Daging Ayam', priceToday: 35000, priceYesterday: 34000, unit: 'kg' },
  ],
};

const marketNames = { '1': 'Pasar Raya I', '2': 'Pasar Blauran', '3': 'Pasar Rejosari' };

const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

export default function MarketDetailPage() {
  const { marketId } = useParams();
  const marketName = marketId ? marketNames[marketId] : "Pasar Tidak Dikenal";
  const data = marketId ? commodityData[marketId] || [] : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-8">
        <ArrowLeft size={18} />
        Kembali ke Daftar Pasar
      </Link>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Analisis Perbandingan Harian</h1>
        <p className="text-2xl text-gray-500 mt-2">{marketName}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(item => {
          const change = item.priceToday - item.priceYesterday;
          const percentage = change !== 0 ? (change / item.priceYesterday) * 100 : 0;
          const isUp = change > 0;
          const isDown = change < 0;

          return (
            <div key={item.name} className="border rounded-lg p-4 space-y-3 bg-white shadow-sm">
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
                <div className="flex justify-between"><span className="text-gray-500">Hari Ini:</span><span className="font-medium">{formatCurrency(item.priceToday)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Kemarin:</span><span className="font-medium">{formatCurrency(item.priceYesterday)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Perubahan:</span>
                  <span className={`font-medium ${isUp ? 'text-red-600' : isDown ? 'text-green-600' : 'text-gray-600'}`}>
                    {change > 0 ? `+${formatCurrency(change)}` : formatCurrency(change)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}