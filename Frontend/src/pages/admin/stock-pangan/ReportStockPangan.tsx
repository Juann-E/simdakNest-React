import React, { useState } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface MonthlyReportForm {
  tahun: number;
  bulan: number;
}

const ReportStockPangan: React.FC = () => {
  const [monthlyForm, setMonthlyForm] = useState<MonthlyReportForm>({
    tahun: new Date().getFullYear(),
    bulan: new Date().getMonth() + 1
  });
  const [isDownloadingMonthly, setIsDownloadingMonthly] = useState(false);

  const bulanNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];



  // Download monthly Excel report
  const downloadMonthlyExcel = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Sesi berakhir, silakan login kembali.');
      return;
    }

    if (!monthlyForm.tahun || !monthlyForm.bulan) {
      console.warn('Mohon pilih tahun dan bulan terlebih dahulu');
      return;
    }

    setIsDownloadingMonthly(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/stock-pangan/report/monthly-excel',
        {
          tahun: monthlyForm.tahun,
          bulan: monthlyForm.bulan
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `data_stock_pangan_${String(monthlyForm.bulan).padStart(2, '0')}_${monthlyForm.tahun}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log('Laporan Excel berhasil diunduh');
    } catch (error) {
      console.error('Error downloading monthly excel:', error);
    } finally {
      setIsDownloadingMonthly(false);
    }
  };

  // Handle monthly form change
  const handleMonthlyFormChange = (field: keyof MonthlyReportForm, value: number) => {
    setMonthlyForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Generate month options
  const monthOptions = [
    { value: 1, label: 'Januari' },
    { value: 2, label: 'Februari' },
    { value: 3, label: 'Maret' },
    { value: 4, label: 'April' },
    { value: 5, label: 'Mei' },
    { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' },
    { value: 8, label: 'Agustus' },
    { value: 9, label: 'September' },
    { value: 10, label: 'Oktober' },
    { value: 11, label: 'November' },
    { value: 12, label: 'Desember' }
  ];

  // Generate year options (current year ± 5 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    yearOptions.push({ value: i, label: i.toString() });
  }



  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Report Stock Pangan</h2>
        <p className="text-sm text-gray-500">
          Generate dan ekspor laporan stock pangan berdasarkan bulan dan tahun.
        </p>
      </div>

      {/* Monthly Report Section */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Laporan Bulanan Excel</h3>
        <p className="text-sm text-gray-600 mb-4">
          Download laporan stock pangan dalam format Excel yang dikelompokkan berdasarkan komoditas dengan perhitungan stock akhir otomatis.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tahun
            </label>
            <select
              value={monthlyForm.tahun}
              onChange={(e) => handleMonthlyFormChange('tahun', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {yearOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bulan
            </label>
            <select
              value={monthlyForm.bulan}
              onChange={(e) => handleMonthlyFormChange('bulan', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {monthOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <button
              onClick={downloadMonthlyExcel}
              disabled={isDownloadingMonthly}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isDownloadingMonthly ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Mengunduh...
                </>
              ) : (
                <>
                  <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                  Download Excel
                </>
              )}
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ReportStockPangan;