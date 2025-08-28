// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  ENDPOINTS: {
    // Auth
    LOGIN: '/auth/login',
    
    // Public endpoints
    LOCATIONS: '/public/locations',
    MARKETS: '/public/markets', 
    PRICES_ALL: '/public/prices/all',
    
    // Admin endpoints
    NAMA_PASAR: '/nama-pasar',
    NAMA_BARANG: '/nama-barang',
    SATUAN_BARANG: '/satuan-barang',
    HARGA_BARANG_PASAR: '/harga-barang-pasar',
    BARANG_PASAR_GRID: '/barang-pasar-grid',
    
    // Location endpoints
    KECAMATAN: '/kecamatan',
    KELURAHAN: '/kelurahan',
    
    // SPBU LPG endpoints
    SPBU: '/spbu',
    AGEN: '/agen',
    PANGKALAN_LPG: '/pangkalan-lpg',
    SPBE: '/spbe'
  }
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};


// Development mode check
export const isDevelopment = import.meta.env.DEV;

// API status check
export const checkApiStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
      method: 'GET',
      timeout: 5000
    } as any);
    return response.ok;
  } catch (error) {
    console.warn('Backend API not available, using mock data');
    return false;
  }
};

// Opsi 3: Test Langsung dari Frontend

// Karena frontend sudah deploy di Netlify, test melalui aplikasi web:

// 1. **Buka**: https://simdag-salatiga-deploy.netlify.app
// 2. **Test fitur**:
//    - Login/Authentication
//    - Data Kecamatan
//    - Data Pasar
//    - Stock Pangan
//    - Dashboard

// ## 🎯 **Rekomendasi Workflow:**

// ### **Step 1: Update Frontend Config**

// Update URL backend di frontend untuk point ke backend yang sudah deploy:
// ```typescript
// // Production config
// const API_BASE_URL = process.env.NODE_ENV === 'production' 
//   ? 'https://your-backend-url.railway.app/api'
//   : 'http://localhost:3000/api';
// ```