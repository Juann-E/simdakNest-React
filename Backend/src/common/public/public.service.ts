// backend/src/modules/public/public.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NamaPasar } from '../../modules/Kepokmas/nama-pasar/nama-pasar.entity';
import { HargaBarangPasar } from '../../modules/Kepokmas/harga-barang-grid/harga-barang-pasar.entity';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(NamaPasar)
    private readonly pasarRepo: Repository<NamaPasar>,
    @InjectRepository(HargaBarangPasar)
    private readonly hargaRepo: Repository<HargaBarangPasar>,
  ) {}

  /**
   * Mengambil semua data harga dengan relasi yang dibutuhkan oleh chart di frontend.
   */
  async findAllPrices(): Promise<HargaBarangPasar[]> {
    return this.hargaRepo.find({
      relations: ['barangPasar', 'barangPasar.pasar', 'barangPasar.barang'],
      order: { time_stamp: 'DESC' }, // Mengurutkan untuk performa query yang lebih baik
    });
  }

  /**
   * Mengambil semua daftar pasar.
   */
  async findAllMarkets(): Promise<NamaPasar[]> {
    return this.pasarRepo.find();
  }

  /**
   * Mengambil data harga hari ini dan kemarin untuk pasar tertentu.
   */
  async findPricesForMarket(marketId: number) {
    const allPrices = await this.hargaRepo.find({
      where: { barangPasar: { pasar: { id: marketId } } },
      relations: ['barangPasar', 'barangPasar.barang', 'barangPasar.barang.satuan', 'barangPasar.pasar'],
      order: { tanggal_harga: 'DESC' },
    });
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const commodityMap = new Map<string, any>();
    allPrices.forEach(p => {
      const itemName = p.barangPasar.barang.namaBarang;
      const priceDate = new Date(p.tanggal_harga).toISOString().split('T')[0];
      if (!commodityMap.has(itemName)) {
        commodityMap.set(itemName, {
          name: itemName,
          unit: p.barangPasar.barang.satuan?.satuanBarang || 'N/A',
          gambar: p.barangPasar.barang.gambar,
          priceToday: 0,
          priceYesterday: 0,
        });
      }
      const commodity = commodityMap.get(itemName)!;
      if (priceDate === today && commodity.priceToday === 0) commodity.priceToday = p.harga;
      if (priceDate === yesterday && commodity.priceYesterday === 0) commodity.priceYesterday = p.harga;
    });
    commodityMap.forEach(commodity => {
      if (commodity.priceToday === 0) commodity.priceToday = commodity.priceYesterday;
    });
    return Array.from(commodityMap.values());
  }

  /**
   * Mengambil data yang sudah diproses untuk chart global (tanpa filter pasar).
   */
  async getChartData() {
    const allPrices = await this.hargaRepo.find({
      relations: ['barangPasar', 'barangPasar.pasar', 'barangPasar.barang'],
      order: { time_stamp: 'DESC' }
    });

    if (allPrices.length === 0) {
      return { chartData: [], chartLines: [] };
    }

    const recentDates = [...new Set(allPrices.map(p => p.tanggal_harga.toString().split('T')[0]))]
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .slice(0, 7).reverse();

    const recentPrices = allPrices.filter(p => recentDates.includes(p.tanggal_harga.toString().split('T')[0]));
    
    const itemFrequency = new Map<string, number>();
    recentPrices.forEach(p => {
        const itemName = p.barangPasar?.barang?.namaBarang;
        if (itemName) {
            itemFrequency.set(itemName, (itemFrequency.get(itemName) || 0) + 1);
        }
    });

    const topItems = [...itemFrequency.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(entry => entry[0]);

    const groupedByDate: { [key: string]: any } = {};
    recentDates.forEach(date => {
      groupedByDate[date] = { day: new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) };
    });

    recentPrices.forEach(p => {
      const date = p.tanggal_harga.toString().split('T')[0];
      const itemName = p.barangPasar?.barang?.namaBarang;
      if (groupedByDate[date] && topItems.includes(itemName)) {
        if (!groupedByDate[date][itemName]) {
            groupedByDate[date][itemName] = p.harga;
        }
      }
    });
    
    const formattedChartData = Object.values(groupedByDate);
    
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];
    const chartLines = topItems.map((key, index) => ({ key, color: colors[index % colors.length] }));

    return { chartData: formattedChartData, chartLines };
  }
}