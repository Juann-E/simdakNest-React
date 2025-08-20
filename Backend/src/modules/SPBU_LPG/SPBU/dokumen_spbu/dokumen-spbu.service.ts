import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DokumenSpbu } from './dokumen-spbu.entity';
import { CreateDokumenSpbuDto } from './dto/create-dokumen-spbu.dto';
import { UpdateDokumenSpbuDto } from './dto/update-dokumen-spbu.dto';
import { promises as fs } from 'fs';
import { CryptoUtil } from '../../../../common/utils/crypto.util';
import * as path from 'path';

@Injectable()
export class DokumenSpbuService {
  constructor(
    @InjectRepository(DokumenSpbu)
    private repo: Repository<DokumenSpbu>,
  ) { }

  private async encryptFileInPlace(filePath: string) {
    const buf = await fs.readFile(filePath);
    const enc = CryptoUtil.encrypt(buf);
    await fs.writeFile(filePath, enc);
  }

  private async decryptFile(filePath: string) {
    const buf = await fs.readFile(filePath);
    return CryptoUtil.decrypt(buf);
  }

  async create(dto: CreateDokumenSpbuDto, file?: Express.Multer.File) {
    if (file) {
      dto.file_name = file.originalname; // simpan nama asli
      dto.file_ext = path.extname(file.originalname); // simpan ekstensi
      await this.encryptFileInPlace(file.path);
      dto.file_path = file.path; // server path random
    }
    const doc = this.repo.create(dto);
    return this.repo.save(doc);
  }

  findAll() {
    return this.repo.find({ relations: ['spbu', 'refJenis'] });
  }

  async findOne(id: number) {
    const doc = await this.repo.findOne({
      where: { id_dokumenSPBU: id },
      relations: ['spbu', 'refJenis'],
    });
    if (!doc) throw new NotFoundException(`Dokumen SPBU ${id} tidak ditemukan`);
    return doc;
  }

  async findBySpbuAndDokumen(spbuId: number, dokumenId: number) {
    const doc = await this.repo.findOne({
      where: {
        id_spbu: spbuId,
        id_dokumenSPBU: dokumenId,
      },
      relations: ['spbu', 'refJenis'],
    });

    if (!doc) throw new NotFoundException('Dokumen tidak ditemukan');
    return doc;
  }


  async update(id: number, dto: UpdateDokumenSpbuDto, file?: Express.Multer.File) {
    const doc = await this.repo.findOne({ where: { id_dokumenSPBU: id } });
    if (!doc) throw new NotFoundException(`Dokumen SPBU ${id} tidak ditemukan`);

    if (file) {
      if (doc.file_path) {
        try { await fs.unlink(doc.file_path); } catch { }
      }
      dto.file_name = file.originalname;
      dto.file_ext = path.extname(file.originalname);
      await this.encryptFileInPlace(file.path);
      dto.file_path = file.path;
    }

    Object.assign(doc, dto);
    return this.repo.save(doc);
  }

  async remove(id: number) {
    const doc = await this.findOne(id);
    if (doc.file_path) {
      try { await fs.unlink(doc.file_path); } catch { }
    }
    return this.repo.remove(doc);
  }

  async getDecryptedFile(id: number) {
    const doc = await this.repo.findOne({ where: { id_dokumenSPBU: id } });
    if (!doc || !doc.file_path) throw new NotFoundException('File tidak tersedia');
    const decrypted = await this.decryptFile(doc.file_path);

    // Gunakan nama asli saat download
    const filename = doc.file_name || (path.basename(doc.file_path) + doc.file_ext);
    return { buffer: decrypted, filename };
  }


}
