// src/components/admin/kepokmas/GridDetailPage.tsx
    
import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Trash2, ArrowLeft, Search } from 'lucide-react'; // <-- Tambahkan ikon Search
import Modal from '../../ui/Modal';
import ConfirmationModal from '../../ui/ConfirmationModal';

// (Interface-interface tetap sama)
interface Market { id: number; nama_pasar: string; }
interface Unit { idSatuan: number; satuanBarang: string; }
interface Item { id: number; namaBarang: string; satuan: Unit; }
interface GridItem { id_barang_pasar: number; pasar: Market; barang: Item; keterangan?: string; }


export default function GridDetailPage() {
  const { marketId } = useParams();
  const [marketName, setMarketName] = useState('');
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GridItem | null>(null);

  // State untuk form tambah barang
  const [selectedItemId, setSelectedItemId] = useState('');
  const [keterangan, setKeterangan] = useState(''); // <-- State baru untuk keterangan

  // State baru untuk search bar
  const [searchTerm, setSearchTerm] = useState('');

  const numericMarketId = parseInt(marketId || '0', 10);

  useEffect(() => {
    if (numericMarketId) {
      // (Fungsi fetchDetails tetap sama)
      const fetchDetails = async () => {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        if (!token) { setLoading(false); return; }
        const headers = { Authorization: `Bearer ${token}` };
  
        try {
          const [marketRes, allItemsRes, gridRes] = await Promise.all([
            axios.get('http://localhost:3000/nama-pasar', { headers }),
            axios.get('http://localhost:3000/nama-barang', { headers }),
            axios.post('http://localhost:3000/barang-pasar-grid/filter', { idPasar: numericMarketId }, { headers })
              .catch(error => {
                if (error.response && error.response.status === 404) { return { data: [] }; }
                throw error;
              })
          ]);
  
          const currentMarket = marketRes.data.find(m => m.id === numericMarketId);
          if (currentMarket) setMarketName(currentMarket.nama_pasar);
          
          setAllItems(allItemsRes.data);
          setGridItems(gridRes.data);
  
        } catch (error) {
          console.error("Gagal memuat data detail grid", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, [numericMarketId]);

  const availableItemsToAdd = useMemo(() => {
    const existingItemIds = new Set(gridItems.map(item => item.barang.id));
    return allItems.filter(item => !existingItemIds.has(item.id));
  }, [allItems, gridItems]);

  // Filter data untuk tabel berdasarkan searchTerm
  const filteredGridItems = gridItems.filter(item =>
    item.barang.namaBarang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId) return;
    const token = localStorage.getItem('accessToken');
    try {
        const response = await axios.post('http://localhost:3000/barang-pasar-grid', {
            idPasar: numericMarketId,
            idBarang: parseInt(selectedItemId),
            keterangan: keterangan, // <-- Kirim data keterangan
        }, { headers: { Authorization: `Bearer ${token}` } });
        
        const newItemFullData = allItems.find(item => item.id === parseInt(selectedItemId));
        if (newItemFullData) {
            const newGridItem = { ...response.data, barang: newItemFullData, pasar: { id: numericMarketId, nama_pasar: marketName } };
            setGridItems([...gridItems, newGridItem]);
        }
        setIsModalOpen(false);
        setSelectedItemId('');
        setKeterangan(''); // <-- Reset state keterangan
    } catch (error) {
        alert("Gagal menambahkan barang. Mungkin barang sudah ada.");
    }
  };
  
  const handleConfirmDelete = async () => {
    // (Fungsi ini tetap sama)
    if (!itemToDelete) return;
    const token = localStorage.getItem('accessToken');
    try {
        await axios.delete(`http://localhost:3000/barang-pasar-grid/${itemToDelete.pasar.id}/${itemToDelete.barang.id}`, { headers: { Authorization: `Bearer ${token}` } });
        setGridItems(gridItems.filter(i => i.id_barang_pasar !== itemToDelete.id_barang_pasar));
        setItemToDelete(null);
    } catch (error) {
        alert("Gagal menghapus barang.");
    }
  };

  return (
    <>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
        <Link to="/admin/kepokmas/barang-pasar-grid" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
          <ArrowLeft size={16} />
          Kembali ke Daftar Pasar
        </Link>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Daftar Barang: {marketName}</h2>
            <p className="text-sm text-gray-500">Kelola barang yang tersedia untuk pasar ini</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary"><Plus size={16} className="mr-2"/>Tambah Barang</button>
        </div>

        {/* Search Bar Baru */}
        <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari barang di pasar ini..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          {/* ... thead tetap sama ... */}
          <tbody className="bg-white divide-y divide-gray-200">
              {loading && <tr><td colSpan={4} className="text-center py-4">Memuat data...</td></tr>}
              {!loading && filteredGridItems.length === 0 && <tr><td colSpan={4} className="text-center py-4 text-gray-500">{gridItems.length > 0 ? 'Barang tidak ditemukan.' : 'Belum ada barang di pasar ini.'}</td></tr>}
              
              {/* Tabel sekarang menggunakan filteredGridItems */}
              {!loading && filteredGridItems.map(item => (
                  <tr key={item.id_barang_pasar}>
                      <td className="px-6 py-4 font-medium">{item.barang.namaBarang}</td>
                      <td className="px-6 py-4 text-gray-500">{item.barang.satuan?.satuanBarang || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-500">{item.keterangan || '-'}</td>
                      <td className="px-6 py-4">
                          <button onClick={() => setItemToDelete(item)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                      </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Tambah Barang ke ${marketName}`}>
          <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label htmlFor="item-select" className="block text-sm font-medium text-gray-700">Pilih Barang</label>
                <select id="item-select" value={selectedItemId} onChange={e => setSelectedItemId(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
                    <option value="" disabled>-- Pilih Barang untuk Ditambahkan --</option>
                    {availableItemsToAdd.map(item => (
                        <option key={item.id} value={item.id}>{item.namaBarang} ({item.satuan.satuanBarang})</option>
                    ))}
                </select>
                {availableItemsToAdd.length === 0 && <p className="text-xs text-gray-500 mt-1">Semua barang sudah ditambahkan ke pasar ini.</p>}
              </div>
              
              {/* Field Keterangan Baru */}
              <div>
                <label htmlFor="item-keterangan" className="block text-sm font-medium text-gray-700">Keterangan (Opsional)</label>
                <textarea id="item-keterangan" value={keterangan} onChange={e => setKeterangan(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" rows={3}></textarea>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Batal</button>
                  <button type="submit" className="btn-primary" disabled={availableItemsToAdd.length === 0}>Tambah</button>
              </div>
          </form>
      </Modal>

      <ConfirmationModal isOpen={!!itemToDelete} onClose={() => setItemToDelete(null)} onConfirm={handleConfirmDelete}
          title="Konfirmasi Hapus"
          message={`Hapus barang "${itemToDelete?.barang.namaBarang}" dari pasar "${itemToDelete?.pasar.nama_pasar}"?`} />
    </>
  );
}