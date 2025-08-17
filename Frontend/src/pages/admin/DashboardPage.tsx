// src/pages/admin/DashboardPage.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, Package, CheckCircle, AlertTriangle, XCircle, DatabaseBackup } from 'lucide-react';
import PriceChart from '../../components/PriceChart';

// Definisikan tipe data untuk membantu kita
interface PriceHistoryItem {
  harga: number;
  tanggal_harga: string;
  barangPasar: {
    barang: { namaBarang: string; };
  };
}

export default function DashboardPage() {
  // State untuk statistik
  const [marketCount, setMarketCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  
  // State baru untuk data grafik
  const [chartData, setChartData] = useState([]);
  const [chartLines, setChartLines] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) { setLoading(false); return; }
      const headers = { Authorization: `Bearer ${token}` };

      try {
        // Ambil semua data yang dibutuhkan secara bersamaan
        const [marketsRes, itemsRes, pricesRes] = await Promise.all([
          axios.get('http://localhost:3000/nama-pasar', { headers }),
          axios.get('http://localhost:3000/nama-barang', { headers }),
          axios.get('http://localhost:3000/harga-barang-pasar', { headers })
        ]);

        // 1. Set data untuk kartu statistik
        setMarketCount(marketsRes.data.length);
        setItemCount(itemsRes.data.length);

        // 2. Proses data harga untuk grafik
        const rawPrices: PriceHistoryItem[] = pricesRes.data;
        
        // Ambil 5 tanggal unik terakhir
        const recentDates = [...new Set(rawPrices.map(p => p.tanggal_harga.split('T')[0]))]
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .slice(0, 5)
            .reverse(); // Balik urutan agar tanggal tertua di kiri

        // Kelompokkan data berdasarkan tanggal
        const groupedByDate: { [key: string]: any } = {};
        recentDates.forEach(date => {
          groupedByDate[date] = { day: new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) };
        });

        rawPrices.forEach(p => {
          const date = p.tanggal_harga.split('T')[0];
          if(groupedByDate[date]) {
            // Asumsikan harga rata-rata jika ada barang yg sama di pasar berbeda
            groupedByDate[date][p.barangPasar.barang.namaBarang] = p.harga;
          }
        });
        
        const formattedChartData = Object.values(groupedByDate);
        setChartData(formattedChartData);

        // 3. Tentukan barang apa saja yang ingin ditampilkan di grafik
        const popularItems = ['Beras', 'Cabai', 'Bawang', 'Daging Sapi', 'Minyak Goreng'];
        const lineKeys = [...new Set(rawPrices.map(p => p.barangPasar.barang.namaBarang))]
            .filter(name => popularItems.some(popular => name.toLowerCase().includes(popular.toLowerCase())))
            .slice(0, 5); // Ambil maksimal 5
        
        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];
        setChartLines(lineKeys.map((key, index) => ({ key, color: colors[index % colors.length] })));

      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
      <p className="text-gray-500 mt-1">Selamat datang di SIMDAG - Sistem Informasi Perdagangan Salatiga</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Pasar</p>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? '...' : marketCount}
            </p>
            <p className="text-xs text-green-500 font-semibold">Aktif</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
            <Building2 />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Komoditas</p>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? '...' : itemCount}
            </p>
            <p className="text-xs text-gray-500 font-semibold">Terdaftar</p>
          </div>
          <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-lg">
            <Package />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <PriceChart data={chartData} lines={chartLines} />
        </div>

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