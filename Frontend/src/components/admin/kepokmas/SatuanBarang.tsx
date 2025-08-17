// src/components/admin/kepokmas/SatuanBarang.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Weight, Search, Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../../ui/Modal';
import ConfirmationModal from '../../ui/ConfirmationModal';

// Definisikan tipe data untuk satu satuan, sesuai dengan Entity Anda
interface Unit {
  idSatuan: number;
  satuanBarang: string;
}

export default function SatuanBarang() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 1. State baru untuk menyimpan input pencarian
  const [searchTerm, setSearchTerm] = useState('');

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [formData, setFormData] = useState({ satuanBarang: '' });

  const [unitToDelete, setUnitToDelete] = useState<Unit | null>(null);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    if (!token) { setError("Autentikasi gagal."); setLoading(false); return; }
    try {
      const response = await axios.get('http://localhost:3000/satuan-barang', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUnits(response.data);
    } catch (err) {
      setError("Gagal mengambil data satuan.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Filter daftar satuan berdasarkan searchTerm
  const filteredUnits = units.filter(unit =>
    unit.satuanBarang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    setEditingUnit(null);
    setFormData({ satuanBarang: '' });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (unit: Unit) => {
    setEditingUnit(unit);
    setFormData({ satuanBarang: unit.satuanBarang });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) { alert("Sesi berakhir, silakan login kembali."); return; }

    const url = editingUnit 
      ? `http://localhost:3000/satuan-barang/${editingUnit.idSatuan}` 
      : 'http://localhost:3000/satuan-barang';
      
    const method = editingUnit ? 'patch' : 'post';

    try {
      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchUnits();
      setIsFormModalOpen(false);

    } catch (err) {
      alert("Gagal menyimpan data. Pastikan nama satuan unik.");
    }
  };

  const handleOpenDeleteModal = (unit: Unit) => {
    setUnitToDelete(unit);
  };
  
  const handleConfirmDelete = async () => {
    if (!unitToDelete) return;
    const token = localStorage.getItem('accessToken');
    if (!token) { alert("Sesi berakhir, silakan login kembali."); return; }

    try {
      await axios.delete(`http://localhost:3000/satuan-barang/${unitToDelete.idSatuan}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUnits(units.filter(u => u.idSatuan !== unitToDelete.idSatuan));
      setUnitToDelete(null);

    } catch (err) {
      alert("Gagal menghapus satuan.");
    }
  };

  return (
    <>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center"><Weight size={20} className="mr-2"/>Satuan Barang</h2>
            <p className="text-sm text-gray-500">Kelola satuan untuk semua komoditas</p>
          </div>
          <div className="flex space-x-2">
            <button onClick={handleOpenCreateModal} className="btn-primary"><Plus size={16} className="mr-2"/>Tambah Satuan</button>
          </div>
        </div>
        
        {/* 3. Tambahkan input search bar di sini */}
        <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama satuan..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
             <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-4/5">Nama Satuan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {loading && <tr><td colSpan={2} className="text-center py-4">Memuat data...</td></tr>}
                {error && <tr><td colSpan={2} className="text-center py-4 text-red-500">{error}</td></tr>}
                
                {/* 4. Tabel sekarang me-render 'filteredUnits' */}
                {!loading && !error && filteredUnits.map((unit) => (
                    <tr key={unit.idSatuan}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{unit.satuanBarang}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button onClick={() => handleOpenEditModal(unit)} className="text-blue-600 hover:text-blue-900"><Edit size={16} /></button>
                          <button onClick={() => handleOpenDeleteModal(unit)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                ))}

                {/* 5. Pesan jika hasil pencarian kosong */}
                {!loading && filteredUnits.length === 0 && (
                  <tr>
                    <td colSpan={2} className="text-center py-4 text-gray-500">
                      Tidak ada satuan yang cocok dengan pencarian Anda.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ... (Modal dan ConfirmationModal tetap sama) ... */}
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        title={editingUnit ? "Edit Satuan Barang" : "Tambah Satuan Barang Baru"}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="unit-name" className="block text-sm font-medium text-gray-700">Nama Satuan</label>
              <input
                type="text" id="unit-name"
                value={formData.satuanBarang}
                onChange={(e) => setFormData({ ...formData, satuanBarang: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Contoh: Kg, Liter, Ikat"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => setIsFormModalOpen(false)} className="btn-secondary">Batal</button>
            <button type="submit" className="btn-primary">
              {editingUnit ? "Simpan Perubahan" : "Tambah"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationModal 
        isOpen={!!unitToDelete}
        onClose={() => setUnitToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus satuan "${unitToDelete?.satuanBarang}"?`}
      />
    </>
  );
}