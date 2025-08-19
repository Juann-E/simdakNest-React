import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ChevronLeft, ChevronRight, Save } from 'lucide-react';

// Tipe data yang dibutuhkan
interface GridItem { id_barang_pasar: number; barang: { namaBarang: string; satuan: { satuanBarang: string } } }
interface PriceInput { [key: number]: string }
interface Market { id: number; nama_pasar: string }

export default function InputHargaPage() {
  const { marketId } = useParams<{ marketId: string }>();
  const navigate = useNavigate();
  const numericMarketId = parseInt(marketId || '0', 10);

  // State untuk data
  const [marketInfo, setMarketInfo] = useState<Market | null>(null);
  const [allItems, setAllItems] = useState<GridItem[]>([]);
  const [prices, setPrices] = useState<PriceInput>({});
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  
  // State untuk UI & Paginasi
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Anda bisa ubah ini ke 5, 20, atau 30

  // Kunci unik untuk localStorage
  const storageKey = `priceInput_market_${marketId}`;

  // Efek untuk memuat data barang dan data input dari localStorage
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      try {
        // Ambil data yang tersimpan dari localStorage
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
          const { savedPrices, savedTanggal } = JSON.parse(savedData);
          setPrices(savedPrices || {});
          setTanggal(savedTanggal || new Date().toISOString().split('T')[0]);
        }

        // Ambil info pasar dan daftar barang
        const [marketRes, itemsRes] = await Promise.all([
           axios.get(`http://localhost:3000/nama-pasar/${numericMarketId}`, { headers: { Authorization: `Bearer ${token}` } }),
           axios.post('http://localhost:3000/barang-pasar-grid/filter', { idPasar: numericMarketId }, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setMarketInfo(marketRes.data);
        setAllItems(itemsRes.data);

      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (numericMarketId) fetchData();
  }, [numericMarketId]);

  // Efek untuk menyimpan perubahan input ke localStorage
  useEffect(() => {
    const dataToSave = JSON.stringify({ savedPrices: prices, savedTanggal: tanggal });
    localStorage.setItem(storageKey, dataToSave);
  }, [prices, tanggal, storageKey]);


  const handlePriceChange = (id_barang_pasar: number, value: string) => {
    setPrices(prev => ({ ...prev, [id_barang_pasar]: value }));
  };

  // Logika Paginasi
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allItems.slice(startIndex, startIndex + itemsPerPage);
  }, [allItems, currentPage, itemsPerPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem('accessToken');

    const promises = Object.entries(prices)
      .filter(([, price]) => price && price.trim() !== '')
      .map(([id_barang_pasar, harga]) => {
        const payload = {
          id_barang_pasar: parseInt(id_barang_pasar),
          harga: parseInt(harga),
          tanggal_harga: tanggal,
        };
        return axios.post('http://localhost:3000/harga-barang-pasar', payload, { headers: { Authorization: `Bearer ${token}` } });
      });

    try {
      await Promise.all(promises);
      alert("Semua harga berhasil disimpan!");
      // Hapus data dari localStorage setelah berhasil submit
      localStorage.removeItem(storageKey);
      navigate(`/admin/kepokmas/harga-barang-grid/${marketId}`);
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan harga.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="text-center p-10">Memuat data input...</div>;

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
      <Link to={`/admin/kepokmas/harga-barang-grid/${marketId}`} className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
        <ArrowLeft size={16} />
        Kembali ke Detail Pasar
      </Link>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Input Harga Harian: {marketInfo?.nama_pasar}</h2>
        <p className="text-sm text-gray-500">Isi harga untuk barang-barang di bawah ini. Data Anda akan tersimpan otomatis di browser.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">Tanggal Input Harga</label>
          <input type="date" id="tanggal" value={tanggal} onChange={e => setTanggal(e.target.value)}
            className="mt-1 input-field w-full md:w-1/3" required />
        </div>

        <div className="space-y-4">
          {paginatedItems.map(item => (
            <div key={item.id_barang_pasar} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-2">
              <label htmlFor={`price-${item.id_barang_pasar}`} className="text-sm text-gray-600 md:col-span-2">
                {item.barang.namaBarang} ({item.barang.satuan?.satuanBarang})
              </label>
              <input
                type="number"
                id={`price-${item.id_barang_pasar}`}
                placeholder="Rp"
                value={prices[item.id_barang_pasar] || ''}
                onChange={e => handlePriceChange(item.id_barang_pasar, e.target.value)}
                className="input-field"
              />
            </div>
          ))}
        </div>

        {/* Kontrol Paginasi */}
        <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Halaman <span className="font-semibold">{currentPage}</span> dari <span className="font-semibold">{totalPages}</span>
            </span>
            <div className="inline-flex items-center -space-x-px">
              <button type="button" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 disabled:opacity-50">
                <ChevronLeft size={16} />
              </button>
              <button type="button" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 disabled:opacity-50">
                <ChevronRight size={16} />
              </button>
            </div>
        </div>

        <div className="mt-8 pt-4 border-t flex justify-end">
          <button type="submit" className="btn-primary" disabled={isSaving || Object.keys(prices).length === 0}>
            <Save size={16} className="mr-2"/>
            {isSaving ? 'Menyimpan...' : 'Simpan Semua Harga'}
          </button>
        </div>
      </form>
    </div>
  );
}