// backend/src/modules/public/public.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NamaPasar } from '../Kepokmas/nama-pasar/nama-pasar.entity';
import { HargaBarangPasar } from '../Kepokmas/harga-barang-grid/harga-barang-pasar.entity';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(NamaPasar)
    private readonly pasarRepo: Repository<NamaPasar>,
    @InjectRepository(HargaBarangPasar)
    private readonly hargaRepo: Repository<HargaBarangPasar>,
  ) {}

  async findAllMarkets(): Promise<NamaPasar[]> {
    return this.pasarRepo.find();
  }

  async findPricesForMarket(marketId: number) {
    // ... (fungsi ini tidak berubah)
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

  // --- FUNGSI INI DIPERBARUI TOTAL ---
  async getChartData() {
    const allPrices = await this.hargaRepo.find({
      relations: ['barangPasar', 'barangPasar.pasar', 'barangPasar.barang'],
      order: { time_stamp: 'DESC' } // Ambil data terbaru dulu
    });

    if (allPrices.length === 0) {
      return { chartData: [], chartLines: [] };
    }

    // Ambil 7 hari unik terakhir dari data yang ada
    const recentDates = [...new Set(allPrices.map(p => p.tanggal_harga.toString().split('T')[0]))]
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .slice(0, 7).reverse();

    // Saring harga hanya dari tanggal-tanggal tersebut
    const recentPrices = allPrices.filter(p => recentDates.includes(p.tanggal_harga.toString().split('T')[0]));
    
    // Tentukan 5 barang teratas yang paling sering muncul di data terbaru
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

    // Kelompokkan data berdasarkan tanggal
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