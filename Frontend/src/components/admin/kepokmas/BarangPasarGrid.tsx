// src/components/admin/kepokmas/BarangPasarGrid.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LayoutGrid, PlusCircle } from 'lucide-react';

interface Market {
  id: number;
  nama_pasar: string;
  alamat: string;
}

export default function BarangPasarGrid() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) { setError("Autentikasi gagal."); setLoading(false); return; }
      try {
        const response = await axios.get('http://localhost:3000/nama-pasar', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMarkets(response.data);
      } catch (err) {
        setError("Gagal mengambil data pasar.");
      } finally {
        setLoading(false);
      }
    };
    fetchMarkets();
  }, []);

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center"><LayoutGrid size={20} className="mr-2"/>Barang Pasar Grid</h2>
          <p className="text-sm text-gray-500">Pilih pasar untuk mengelola daftar barang yang tersedia</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
              <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Pasar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              {loading && <tr><td colSpan={3} className="text-center py-4">Memuat data pasar...</td></tr>}
              {error && <tr><td colSpan={3} className="text-center py-4 text-red-500">{error}</td></tr>}
              {!loading && !error && markets.map((market) => (
                  <tr key={market.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{market.nama_pasar}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{market.alamat}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          to={`/admin/kepokmas/barang-pasar-grid/${market.id}`} 
                          className="text-green-600 hover:text-green-900"
                          title={`Tambah/Lihat Barang di ${market.nama_pasar}`}
                        >
                          <PlusCircle size={20} />
                        </Link>
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}