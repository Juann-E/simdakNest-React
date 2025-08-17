import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { NamaPasar } from '../nama-pasar/nama-pasar.entity';
import { BarangPasarGrid } from '../barang-pasar-grid/barang-pasar-grid.entity';
import { HargaBarangPasar } from '../harga-barang-grid/harga-barang-pasar.entity';
import { ExcelBuilder } from './utils/excel-builder';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(NamaPasar) private readonly pasarRepo: Repository<NamaPasar>,
    @InjectRepository(BarangPasarGrid) private readonly barangRepo: Repository<BarangPasarGrid>,
    @InjectRepository(HargaBarangPasar) private readonly hargaRepo: Repository<HargaBarangPasar>,
  ) {}

  private parseDate(date?: string): Date | undefined {
    return date ? new Date(date) : undefined;
  }

  async generateJson(pasarIds: number[], barangIds: number[], start?: string, end?: string) {
    const where: any = {};
    if (start && end) where.tanggal_harga = Between(this.parseDate(start), this.parseDate(end));

    if (pasarIds.length) where.barangPasar = { pasar: { id: In(pasarIds) } };
    if (barangIds.length) where.barangPasar = { ...(where.barangPasar || {}), barang: { id: In(barangIds) } };

    const hargaList = await this.hargaRepo.find({
      where,
      relations: ['barangPasar', 'barangPasar.barang', 'barangPasar.pasar'],
      order: { tanggal_harga: 'ASC' },
    });

    return hargaList.map((h) => ({
      pasar: h.barangPasar.pasar.nama_pasar,
      barang: h.barangPasar.barang.namaBarang,
      harga: h.harga,
      tanggal: h.tanggal_harga instanceof Date ? h.tanggal_harga.toISOString().split('T')[0] : h.tanggal_harga,
    }));
  }

  async generateExcel(pasarIds: number[], barangIds: number[], start?: string, end?: string): Promise<Buffer> {
    const hargaList = await this.generateJson(pasarIds, barangIds, start, end);

    // ambil daftar tanggal unik
    const tanggalList = Array.from(new Set(hargaList.map((h) => h.tanggal))).sort();

    // pivot data: { namaBarang: { harga: {tanggal: harga} } }
    const pivot: Record<string, any> = {};
    for (const h of hargaList) {
      if (!pivot[h.barang]) pivot[h.barang] = { harga: {} };
      pivot[h.barang].harga[h.tanggal] = h.harga;
    }

    // gunakan ExcelBuilder
    const pasarName = pasarIds.length ? `ID_${pasarIds.join('_')}` : 'ALL';
    return ExcelBuilder.buildExcel(pasarName, start || 'ALL', end || 'ALL', tanggalList, pivot);
  }
}
