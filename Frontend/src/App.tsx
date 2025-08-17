// src/App.tsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Impor semua halaman dan komponen
import MarketListPage from './pages/MarketListPage';
import MarketDetailPage from './pages/MarketDetailPage';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/admin/Sidebar';
import DashboardPage from './pages/admin/DashboardPage';
import Header from './components/Header'; 
import KepokmasPage from './pages/admin/KepokmasPage';
// Impor komponen baru untuk halaman detail
import GridDetailPage from './components/admin/kepokmas/GridDetailPage';

// ==========================================================
// ## KOMPONEN BARU UNTUK LAYOUT PUBLIK ##
function PublicLayout() {
  return (
    <div>
      <Header />
      {/* Outlet akan merender halaman publik (MarketListPage, dll) */}
      <Outlet /> 
    </div>
  );
}
// ==========================================================

// Komponen untuk Layout Admin
function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow ml-64 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

// Komponen untuk Rute Terproteksi
function ProtectedRoute() {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <AdminLayout />;
}

function App() {
  return (
    <Routes>
      {/* Rute Login (tanpa Header) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rute Publik (dibungkus dengan PublicLayout agar punya Header) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<MarketListPage />} />
        <Route path="/market/:marketId" element={<MarketDetailPage />} />
      </Route>

      {/* Rute Admin yang Terproteksi */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Rute baru yang lebih fleksibel untuk Kepokmas */}
        <Route path="kepokmas/:tab" element={<KepokmasPage />} />
        
        {/* TAMBAHKAN RUTE BARU DI SINI */}
        <Route path="kepokmas/barang-pasar-grid/:marketId" element={<GridDetailPage />} />

        {/* Tambahkan redirect agar /admin/kepokmas otomatis ke tab pertama */}
        <Route 
          path="kepokmas" 
          element={<Navigate to="/admin/kepokmas/nama-pasar" replace />} 
        />
      </Route>
    </Routes>
  );
}

export default App;