// src/pages/admin/KepokmasPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import KepokmasTabs from '../../components/admin/KepokmasTabs';
import NamaPasar from '../../components/admin/kepokmas/NamaPasar';
import SatuanBarang from '../../components/admin/kepokmas/SatuanBarang'; 
import NamaBarang from '../../components/admin/kepokmas/NamaBarang';
import BarangPasarGrid from '../../components/admin/kepokmas/BarangPasarGrid';
import HargaBarangGrid from '../../components/admin/kepokmas/HargaBarangGrid';


// Komponen placeholder untuk tab lainnya
const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border">
    <h2 className="text-xl font-bold text-gray-800">Konten untuk {title}</h2>
    <p className="mt-2 text-gray-500">Fitur untuk bagian ini sedang dalam pengembangan.</p>
  </div>
);

// Daftar tab yang valid untuk dicocokkan dengan URL
const validTabs = {
  'nama-pasar': 'Nama Pasar',
  'satuan-barang': 'Satuan Barang',
  'nama-barang': 'Nama Barang',
  'barang-pasar-grid': 'Barang Pasar Grid',
  'harga-barang-grid': 'Harga Barang Grid',
  'report': 'Report',
};

export default function KepokmasPage() {
  const { tab } = useParams();
  const navigate = useNavigate();

  const currentTab = tab && validTabs[tab] ? validTabs[tab] : 'Nama Pasar';
  const [activeTab, setActiveTab] = useState(currentTab);

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);
  
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    const urlKey = Object.keys(validTabs).find(key => validTabs[key] === tabName);
    if (urlKey) {
      navigate(`/admin/kepokmas/${urlKey}`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Nama Pasar':
        return <NamaPasar />;
      case 'Satuan Barang':
        return <SatuanBarang />; // <-- 2. Ganti placeholder dengan komponen asli
      case 'Nama Barang':
        return <NamaBarang />;
      case 'Barang Pasar Grid':
        return <BarangPasarGrid />;
      case 'Harga Barang Grid':
        return <HargaBarangGrid />;
      case 'Report':
        return <PlaceholderContent title="Report" />;
      default:
        return <NamaPasar />;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Kepokmas</h1>
      <p className="text-gray-500 mt-1">Kebutuhan Pokok Masyarakat - Sistem manajemen harga komoditas esensial</p>
      
      <KepokmasTabs activeTab={activeTab} setActiveTab={handleTabClick} />

      <div>
        {renderContent()}
      </div>
    </div>
  );
}