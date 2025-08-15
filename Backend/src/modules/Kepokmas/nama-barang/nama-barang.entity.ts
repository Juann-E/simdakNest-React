import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { SatuanBarang } from '../satuan-barang/satuan-barang.entity';

@Entity('nama_barang')
export class NamaBarang {
  @PrimaryGeneratedColumn({ name: 'id_barang' })
  id: number;

  @Column({ name: 'nama_barang', type: 'varchar', length: 100 })
  namaBarang: string;

  @ManyToOne(() => SatuanBarang, { eager: true }) // eager load satuan
  @JoinColumn({ name: 'id_satuan' })
  satuan: SatuanBarang;

  @Column({ type: 'text', nullable: true })
  keterangan?: string;

  @CreateDateColumn({ name: 'time_stamp' })
  createdAt: Date;
}
