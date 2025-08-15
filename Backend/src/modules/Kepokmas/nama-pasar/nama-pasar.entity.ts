import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { BarangPasarGrid } from '../barang-pasar-grid/barang-pasar-grid.entity';

@Entity('nama_pasar')
export class NamaPasar {
  @PrimaryGeneratedColumn({ name: 'id_pasar' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nama_pasar: string;

  @Column({ type: 'text', nullable: true })
  alamat: string;

  @CreateDateColumn({ name: 'time_stamp' })
  time_stamp: Date;

  // Tambahan relasi
  @OneToMany(() => BarangPasarGrid, (grid) => grid.pasar)
  barangPasarGrid: BarangPasarGrid[];
}
