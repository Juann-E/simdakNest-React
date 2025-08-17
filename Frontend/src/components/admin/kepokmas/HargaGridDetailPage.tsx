// src/components/admin/kepokmas/HargaGridDetailPage.tsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Edit, Save } from 'lucide-react';

// Definisikan tipe data yang diperlukan
interface GridItem {
  id_barang_pasar: number;
  barang: {
    namaBarang: string;
    satuan: { satuanBarang: string };
  };
}
interface HargaItem {
  id_harga: number;
  harga: number;
  barang: { id_barang_pasar: number };
}

export default function HargaGridDetailPage() {
  const { marketId } = useParams();
  const [marketName, setMarketName] = useState('');
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [prices, setPrices] = useState<Map<number, number>>(new Map());
  const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchDetails = async () => {
      try {
        const marketRes = await axios.get('http://localhost:3000/nama-pasar', { headers });
        const currentMarket = marketRes.data.find(m => m.id === parseInt(marketId!));
        if (currentMarket) setMarketName(currentMarket.nama_pasar);

        const gridRes = await axios.post('http://localhost:3000/barang-pasar-grid/filter', { idPasar: parseInt(marketId!) }, { headers });
        setGridItems(gridRes.data);

        const hargaRes = await axios.get('http://localhost:3000/harga-barang-pasar', { headers });
        const priceMap = new Map<number, number>();
        hargaRes.data.forEach((p: HargaItem) => {
          priceMap.set(p.barang.id_barang_pasar, p.harga);
        });
        setPrices(priceMap);

      } catch (error) {
        console.error("Gagal memuat data", error);
      }
    };

    if (marketId) fetchDetails();
  }, [marketId]);

  const handleSavePrice = async (gridItemId: number) => {
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` };
    const priceValue = parseInt(newPrice);

    try {
      // Cek apakah sudah ada harga sebelumnya
      const existingPrices: HargaItem[] = (await axios.get('http://localhost:3000/harga-barang-pasar', { headers })).data;
      const existingPrice = existingPrices.find(p => p.barang.id_barang_pasar === gridItemId);

      if (existingPrice) {
        // Update harga yang ada
        await axios.put(`http://localhost:3000/harga-barang-pasar/${existingPrice.id_harga}`, { harga: priceValue }, { headers });
      } else {
        // Buat harga baru
        await axios.post('http://localhost:3000/harga-barang-pasar', { id_barang_pasar: gridItemId, harga: priceValue }, { headers });
      }

      // Update state lokal untuk UI responsif
      setPrices(new Map(prices.set(gridItemId, priceValue)));
      setEditingPriceId(null);
      setNewPrice('');

    } catch (error) {
      alert("Gagal menyimpan harga.");
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
      <Link to="/admin/kepokmas/harga-barang-grid" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
        <ArrowLeft size={16} />
        Kembali ke Daftar Pasar
      </Link>
      <h2 className="text-xl font-bold text-gray-800">Kelola Harga: {marketName}</h2>

      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Barang</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {gridItems.map(item => (
                <tr key={item.id_barang_pasar}>
                    <td className="px-6 py-4">{item.barang.namaBarang} ({item.barang.satuan?.satuanBarang})</td>
                    <td className="px-6 py-4">
                      {editingPriceId === item.id_barang_pasar ? (
                        <input 
                          type="number" 
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="px-2 py-1 border rounded-md w-32"
                          autoFocus
                        />
                      ) : (
                        prices.get(item.id_barang_pasar) 
                          ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(prices.get(item.id_barang_pasar)!)
                          : <span className="text-gray-400">Belum ada harga</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingPriceId === item.id_barang_pasar ? (
                        <button onClick={() => handleSavePrice(item.id_barang_pasar)} className="text-green-600 hover:text-green-900">
                          <Save size={16} />
                        </button>
                      ) : (
                        <button onClick={() => { setEditingPriceId(item.id_barang_pasar); setNewPrice(prices.get(item.id_barang_pasar)?.toString() || ''); }} className="text-blue-600 hover:text-blue-900">
                          <Edit size={16} />
                        </button>
                      )}
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}