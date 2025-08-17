// src/components/admin/kepokmas/NamaBarang.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Search, Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../../ui/Modal';
import ConfirmationModal from '../../ui/ConfirmationModal';

// Definisikan tipe data untuk Satuan dan Barang
interface Unit {
  idSatuan: number;
  satuanBarang: string;
}
interface Item {
  id: number;
  namaBarang: string;
  keterangan?: string;
  satuan: Unit;
}

export default function NamaBarang() {
  const [items, setItems] = useState<Item[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState({ namaBarang: '', keterangan: '', idSatuan: '' });
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) { setError("Autentikasi gagal."); setLoading(false); return; }
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [itemsResponse, unitsResponse] = await Promise.all([
          axios.get('http://localhost:3000/nama-barang', { headers }),
          axios.get('http://localhost:3000/satuan-barang', { headers })
        ]);
        setItems(itemsResponse.data);
        setUnits(unitsResponse.data);
      } catch (err) {
        setError("Gagal mengambil data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems = items.filter(item => {
    const term = searchTerm.toLowerCase();
    const itemName = item.namaBarang.toLowerCase();
    const unitName = item.satuan?.satuanBarang.toLowerCase() || '';
    return itemName.includes(term) || unitName.includes(term);
  });
  
  // --- FUNGSI-FUNGSI YANG KITA ISI KEMBALI ---
  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormData({ namaBarang: '', keterangan: '', idSatuan: units[0]?.idSatuan.toString() || '' });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (item: Item) => {
    setEditingItem(item);
    setFormData({
      namaBarang: item.namaBarang,
      keterangan: item.keterangan || '',
      idSatuan: item.satuan.idSatuan.toString(),
    });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) { alert("Sesi berakhir."); return; }

    const url = editingItem 
      ? `http://localhost:3000/nama-barang/${editingItem.id}` 
      : 'http://localhost:3000/nama-barang';
      
    const method = editingItem ? 'patch' : 'post';
    
    const payload = {
      ...formData,
      idSatuan: parseInt(formData.idSatuan, 10),
    };

    try {
      const response = await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Ambil ulang data untuk memastikan relasi terupdate
      const updatedItems = await axios.get('http://localhost:3000/nama-barang', { headers: { Authorization: `Bearer ${token}` } });
      setItems(updatedItems.data);
      setIsFormModalOpen(false);
    } catch (err) {
      alert("Gagal menyimpan data.");
    }
  };

  const handleOpenDeleteModal = (item: Item) => {
    setItemToDelete(item);
  };
  
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    const token = localStorage.getItem('accessToken');
    if (!token) { alert("Sesi berakhir."); return; }

    try {
      await axios.delete(`http://localhost:3000/nama-barang/${itemToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(items.filter(i => i.id !== itemToDelete.id));
      setItemToDelete(null);
    } catch (err) {
      alert("Gagal menghapus barang.");
    }
  };
  // --- AKHIR DARI FUNGSI-FUNGSI ---

  return (
    <>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center"><Package size={20} className="mr-2"/>Nama Barang</h2>
            <p className="text-sm text-gray-500">Kelola nama dan satuan komoditas</p>
          </div>
          <div>
            <button onClick={handleOpenCreateModal} className="btn-primary"><Plus size={16} className="mr-2"/>Tambah Barang</button>
          </div>
        </div>
        
        <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama barang atau satuan..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
             <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Barang</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Satuan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {loading && <tr><td colSpan={4} className="text-center py-4">Memuat data...</td></tr>}
                {error && <tr><td colSpan={4} className="text-center py-4 text-red-500">{error}</td></tr>}
                
                {!loading && !error && filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{item.namaBarang}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.satuan?.satuanBarang || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.keterangan || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button onClick={() => handleOpenEditModal(item)} className="text-blue-600 hover:text-blue-900"><Edit size={16} /></button>
                          <button onClick={() => handleOpenDeleteModal(item)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                ))}

                {!loading && filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      Tidak ada barang yang cocok dengan pencarian Anda.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        title={editingItem ? "Edit Barang" : "Tambah Barang Baru"}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">Nama Barang</label>
              <input type="text" id="item-name" value={formData.namaBarang} onChange={(e) => setFormData({ ...formData, namaBarang: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label htmlFor="item-unit" className="block text-sm font-medium text-gray-700">Satuan</label>
              <select id="item-unit" value={formData.idSatuan} onChange={(e) => setFormData({ ...formData, idSatuan: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
                <option value="" disabled>Pilih satuan...</option>
                {units.map(unit => (
                  <option key={unit.idSatuan} value={unit.idSatuan}>{unit.satuanBarang}</option>
                ))}
              </select>
            </div>
             <div>
              <label htmlFor="item-desc" className="block text-sm font-medium text-gray-700">Keterangan (Opsional)</label>
              <textarea id="item-desc" value={formData.keterangan} onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" rows={3}></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => setIsFormModalOpen(false)} className="btn-secondary">Batal</button>
            <button type="submit" className="btn-primary">
              {editingItem ? "Simpan Perubahan" : "Tambah"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationModal 
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus barang "${itemToDelete?.namaBarang}"?`}
      />
    </>
  );
}