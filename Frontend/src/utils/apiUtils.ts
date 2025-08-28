import axios, { type AxiosResponse } from 'axios';
import { API_CONFIG, isDevelopment } from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Simple API call wrapper
export const apiCall = async <T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data?: any;
    params?: any;
  } = {}
): Promise<T> => {
  const { method = 'GET', data, params } = options;
  
  try {
    const response: AxiosResponse<T> = await apiClient({
      url: endpoint,
      method,
      data,
      params
    });
    
    return response.data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// API endpoints
export const fetchLocations = () => apiCall('/public/locations');
export const fetchMarkets = () => apiCall('/public/markets');
export const fetchPrices = () => apiCall('/public/prices/all');

export const login = (credentials: { username: string; password: string }) => 
  apiCall('/auth/login', { method: 'POST', data: credentials });

export const fetchNamaPasar = () => apiCall('/nama-pasar');
export const fetchNamaBarang = () => apiCall('/nama-barang');
export const fetchSatuanBarang = () => apiCall('/satuan-barang');
export const fetchHargaBarangPasar = () => apiCall('/harga-barang-pasar');

export const fetchKecamatan = () => apiCall('/kecamatan');
export const fetchKelurahan = (id_kecamatan?: number) => 
  apiCall('/kelurahan', { params: id_kecamatan ? { id_kecamatan } : undefined });

export const fetchSpbu = () => apiCall('/spbu');
export const fetchAgen = () => apiCall('/agen');
export const fetchPangkalanLpg = () => apiCall('/pangkalan-lpg');
export const fetchSpbe = () => apiCall('/spbe');

export const createItem = <T>(endpoint: string, data: any) => 
  apiCall<T>(endpoint, { method: 'POST', data });

export const updateItem = <T>(endpoint: string, id: number, data: any) => 
  apiCall<T>(`${endpoint}/${id}`, { method: 'PATCH', data });

export const deleteItem = (endpoint: string, id: number) => 
  apiCall(`${endpoint}/${id}`, { method: 'DELETE' });

export default apiClient;