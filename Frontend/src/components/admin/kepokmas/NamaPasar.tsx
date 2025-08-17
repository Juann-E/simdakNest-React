// src/components/admin/kepokmas/NamaPasar.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Building, Search, Plus, Upload, Download, Edit, Trash2 } from 'lucide-react';
import Modal from '../../ui/Modal';
import ConfirmationModal from '../../ui/ConfirmationModal';

interface Market {
  id: number;
  nama_pasar: string;
  alamat: string;
}

export default function NamaPasar() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingMarket, setEditingMarket] = useState<Market | null>(null);
  const [formData, setFormData] = useState({ nama_pasar: '', alamat: '' });

  const [marketToDelete, setMarketToDelete] = useState<Market | null>(null);

  useEffect(() => {
    fetchMarkets();
  }, []);

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

  const filteredMarkets = markets.filter(market =>
    market.nama_pasar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    setEditingMarket(null);
    setFormData({ nama_pasar: '', alamat: '' });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (market: Market) => {
    setEditingMarket(market);
    setFormData({ nama_pasar: market.nama_pasar, alamat: market.alamat });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) { alert("Sesi berakhir, silakan login kembali."); return; }

    const url = editingMarket 
      ? `http://localhost:3000/nama-pasar/${editingMarket.id}` 
      : 'http://localhost:3000/nama-pasar';

    const method = editingMarket ? 'patch' : 'post';

    try {
      const response = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (editingMarket) {
        setMarkets(markets.map(m => m.id === editingMarket.id ? response.data : m));
      } else {
        setMarkets([...markets, response.data]);
      }
      setIsFormModalOpen(false);

    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      alert("Gagal menyimpan data. Periksa kembali input Anda.");
    }
  };

  const handleOpenDeleteModal = (market: Market) => {
    setMarketToDelete(market);
  };

  const handleConfirmDelete = async () => {
    if (!marketToDelete) return;
    const token = localStorage.getItem('accessToken');
    if (!token) { alert("Sesi berakhir, silakan login kembali."); return; }

    try {
      await axios.delete(`http://localhost:3000/nama-pasar/${marketToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMarkets(markets.filter(m => m.id !== marketToDelete.id));
      setMarketToDelete(null);

    } catch (err) {
      console.error("Gagal menghapus pasar:", err);
      alert("Gagal menghapus pasar.");
    }
  };

  return (
    <>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center"><Building size={20} className="mr-2"/>Nama Pasar</h2>
            <p className="text-sm text-gray-500">Kelola data pasar tradisional untuk survey komoditas</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn-secondary"><Download size={16} className="mr-2"/>Export</button>
            <button className="btn-secondary"><Upload size={16} className="mr-2"/>Import</button>
            <button onClick={handleOpenCreateModal} className="btn-primary"><Plus size={16} className="mr-2"/>Tambah Pasar</button>
          </div>
        </div>

        <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama pasar..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Pasar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {loading && <tr><td colSpan={4} className="text-center py-4">Memuat data...</td></tr>}
                {error && <tr><td colSpan={4} className="text-center py-4 text-red-500">{error}</td></tr>}
                {!loading && !error && filteredMarkets.map((market) => (
                    <tr key={market.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{market.nama_pasar}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{market.alamat}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Aktif</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onClick={() => handleOpenEditModal(market)} className="text-blue-600 hover:text-blue-900"><Edit size={16} /></button>
                        <button onClick={() => handleOpenDeleteModal(market)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                    </td>
                    </tr>
                ))}
                {!loading && filteredMarkets.length === 0 && (
                    <tr><td colSpan={4} className="text-center py-4 text-gray-500">Tidak ada pasar yang cocok.</td></tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        title={editingMarket ? "Edit Pasar" : "Tambah Pasar Baru"}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="market-name" className="block text-sm font-medium text-gray-700">Nama Pasar</label>
              <input
                type="text" id="market-name"
                value={formData.nama_pasar}
                onChange={(e) => setFormData({ ...formData, nama_pasar: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="market-address" className="block text-sm font-medium text-gray-700">Alamat</label>
              <input
                type="text" id="market-address"
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => setIsFormModalOpen(false)} className="btn-secondary">Batal</button>
            <button type="submit" className="btn-primary">
              {editingMarket ? "Simpan Perubahan" : "Tambah"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationModal 
        isOpen={!!marketToDelete}
        onClose={() => setMarketToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus pasar "${marketToDelete?.nama_pasar}"? Tindakan ini tidak dapat dibatalkan.`}
      />
    </>
  );
}