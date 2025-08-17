// src/components/PriceChart.tsx

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

// Data bohongan untuk tren harga
const priceTrendData = [
  { day: 'Sab', Beras: 14200, Cabai: 38000, Bawang: 25000 },
  { day: 'Min', Beras: 14100, Cabai: 37500, Bawang: 24800 },
  { day: 'Sen', Beras: 14150, Cabai: 37800, Bawang: 25100 },
  { day: 'Sel', Beras: 14250, Cabai: 36000, Bawang: 25500 },
  { day: 'Rab', Beras: 14300, Cabai: 35500, Bawang: 25300 },
  { day: 'Kam', Beras: 14200, Cabai: 34000, Bawang: 25800 },
  { day: 'Jum', Beras: 14400, Cabai: 33500, Bawang: 26000 },
];

const formatToRupiah = (tickItem: number) => {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(tickItem);
}

export default function PriceChart() {
  return (
    <div className="rounded-lg border bg-white text-gray-800 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Grafik Harga 7 Hari Terakhir
        </h3>
        <p className="text-sm text-gray-500">
          Pergerakan harga komoditas utama dalam seminggu terakhir.
        </p>
      </div>
      <div className="p-6 pt-0">
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrendData} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(tick) => `Rp${tick/1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} formatter={formatToRupiah} />
                    <Legend />
                    <Line type="monotone" dataKey="Beras" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="Cabai" stroke="#ffc658" strokeWidth={2} />
                    <Line type="monotone" dataKey="Bawang" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}