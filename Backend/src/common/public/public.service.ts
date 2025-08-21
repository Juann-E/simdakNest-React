// backend/src/modules/public/public.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NamaPasar } from '../../modules/Kepokmas/nama-pasar/nama-pasar.entity';
import { HargaBarangPasar } from '../../modules/Kepokmas/harga-barang-grid/harga-barang-pasar.entity';
import { Spbu } from '../../modules/SPBU_LPG/SPBU/spbu.entity';
import { Agen } from '../../modules/SPBU_LPG/Agen/agen.entity';
import { PangkalanLpg } from '../../modules/SPBU_LPG/PangkalanLpg/pangkalan-lpg.entity';
import { Spbe } from '../../modules/SPBU_LPG/Spbe/spbe.entity';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(NamaPasar)
    private readonly pasarRepo: Repository<NamaPasar>,
    @InjectRepository(HargaBarangPasar)
    private readonly hargaRepo: Repository<HargaBarangPasar>,
    @InjectRepository(Spbu)
    private readonly spbuRepo: Repository<Spbu>,
    @InjectRepository(Agen)
    private readonly agenRepo: Repository<Agen>,
    @InjectRepository(PangkalanLpg)
    private readonly pangkalanLpgRepo: Repository<PangkalanLpg>,
    @InjectRepository(Spbe)
    private readonly spbeRepo: Repository<Spbe>,
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

  /**
   * Mengambil semua data lokasi untuk peta dengan koordinat
   */
  async getAllLocations() {
     const [markets, spbu, agen, pangkalanLpg, spbe] = await Promise.all([
       this.pasarRepo.createQueryBuilder('pasar')
         .where('pasar.latitude IS NOT NULL')
         .andWhere('pasar.longitude IS NOT NULL')
         .getMany(),
       this.spbuRepo.createQueryBuilder('spbu')
         .where('spbu.latitude IS NOT NULL')
         .andWhere('spbu.longitude IS NOT NULL')
         .andWhere('spbu.status = :status', { status: 'Aktif' })
         .getMany(),
       this.agenRepo.createQueryBuilder('agen')
         .where('agen.latitude IS NOT NULL')
         .andWhere('agen.longitude IS NOT NULL')
         .andWhere('agen.status = :status', { status: 'Aktif' })
         .getMany(),
       this.pangkalanLpgRepo.createQueryBuilder('pangkalan')
         .where('pangkalan.latitude IS NOT NULL')
         .andWhere('pangkalan.longitude IS NOT NULL')
         .andWhere('pangkalan.status = :status', { status: 'Aktif' })
         .getMany(),
       this.spbeRepo.createQueryBuilder('spbe')
         .where('spbe.latitude IS NOT NULL')
         .andWhere('spbe.longitude IS NOT NULL')
         .andWhere('spbe.status = :status', { status: 'Aktif' })
         .getMany()
     ]);

    return {
      markets: markets.map(item => ({
        id: item.id,
        name: item.nama_pasar,
        address: item.alamat,
        latitude: item.latitude,
        longitude: item.longitude,
        type: 'market'
      })),
      spbu: spbu.map(item => ({
        id: item.id_spbu,
        name: item.nama_usaha,
        address: item.alamat,
        latitude: item.latitude,
        longitude: item.longitude,
        type: 'spbu'
      })),
      agen: agen.map(item => ({
        id: item.id_agen,
        name: item.nama_usaha,
        address: item.alamat,
        latitude: item.latitude,
        longitude: item.longitude,
        type: 'agen'
      })),
      pangkalanLpg: pangkalanLpg.map(item => ({
        id: item.id_pangkalan_lpg,
        name: item.nama_usaha,
        address: item.alamat,
        latitude: item.latitude,
        longitude: item.longitude,
        type: 'pangkalan_lpg'
      })),
      spbe: spbe.map(item => ({
        id: item.id_spbe,
        name: item.nama_usaha,
        address: item.alamat,
        latitude: item.latitude,
        longitude: item.longitude,
        type: 'spbe'
      }))
    };
  }
}