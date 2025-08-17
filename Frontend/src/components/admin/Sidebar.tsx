// src/components/admin/Sidebar.tsx
import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Boxes, LogOut, ChevronDown, CircleDot } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // State untuk mengontrol menu Kepokmas
  const [isKepokmasOpen, setIsKepokmasOpen] = useState(true);

  // Cek apakah rute saat ini ada di dalam section Kepokmas
  const isKepokmasActive = location.pathname.startsWith('/admin/kepokmas');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const linkClass = "flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-200";
  const activeLinkClass = "flex items-center p-2 text-blue-600 rounded-lg bg-blue-50 font-semibold";
  
  const subLinkClass = "flex items-center p-2 pl-11 text-sm text-gray-700 rounded-lg hover:bg-gray-200";
  const activeSubLinkClass = "flex items-center p-2 pl-11 text-sm text-blue-600 rounded-lg bg-blue-50 font-semibold";

  return (
    <aside className="w-64 h-screen bg-white border-r fixed top-0 left-0 flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">SIMDAG Admin</h1>
        <p className="text-sm text-gray-500">Dashboard Administrasi</p>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        <p className="px-2 text-xs font-semibold text-gray-400 uppercase">Menu Utama</p>
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? activeLinkClass : linkClass}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="ml-3">Dashboard</span>
        </NavLink>

        {/* Tombol Kepokmas yang bisa dilipat */}
        <button 
          onClick={() => setIsKepokmasOpen(!isKepokmasOpen)} 
          className={`w-full flex items-center justify-between p-2 text-gray-700 rounded-lg hover:bg-gray-200 ${isKepokmasActive ? 'bg-gray-100' : ''}`}
        >
          <div className="flex items-center">
            <Boxes className="w-5 h-5" />
            <span className="ml-3">Kepokmas</span>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${isKepokmasOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Sub-menu Kepokmas */}
        {isKepokmasOpen && (
          <div className="space-y-1 mt-1">
            <NavLink to="/admin/kepokmas/nama-pasar" className={({ isActive }) => isActive ? activeSubLinkClass : subLinkClass}>
              Nama Pasar
            </NavLink>
            <NavLink to="/admin/kepokmas/satuan-barang" className={({ isActive }) => isActive ? activeSubLinkClass : subLinkClass}>
              Satuan Barang
            </NavLink>
            <NavLink to="/admin/kepokmas/nama-barang" className={({ isActive }) => isActive ? activeSubLinkClass : subLinkClass}>
              Nama Barang
            </NavLink>
             <NavLink to="/admin/kepokmas/barang-pasar-grid" className={({ isActive }) => isActive ? activeSubLinkClass : subLinkClass}>
              Barang Pasar Grid
            </NavLink>
             <NavLink to="/admin/kepokmas/harga-barang-grid" className={({ isActive }) => isActive ? activeSubLinkClass : subLinkClass}>
              Harga Barang Grid
            </NavLink>
            <NavLink to="/admin/kepokmas/report" className={({ isActive }) => isActive ? activeSubLinkClass : subLinkClass}>
              Report
            </NavLink>
          </div>
        )}

      </nav>
      <div className="p-4 border-t mt-auto">
        {/* ... (bagian profil dan logout tetap sama) ... */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-yellow-900">A</div>
          <div className="ml-3"><p className="font-semibold text-gray-800">Administrator</p><p className="text-xs text-gray-500">admin@salatiga.go.id</p></div>
        </div>
        <button onClick={handleLogout} className="w-full mt-4 flex items-center justify-center p-2 text-sm text-red-600 rounded-lg hover:bg-red-50">
          <LogOut className="w-4 h-4 mr-2" />
          Keluar
        </button>
      </div>
    </aside>
  );
}