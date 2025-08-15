import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { BarangPasarGrid } from '../barang-pasar-grid/barang-pasar-grid.entity';

@Entity('harga_barang_pasar')
export class HargaBarangPasar {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BarangPasarGrid, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_barang_pasar' })
  barangPasar: BarangPasarGrid;

  @Column('decimal', { precision: 15, scale: 2 })
  harga: number;

  @Column({ type: 'text', nullable: true })
  keterangan: string;

  @CreateDateColumn({ type: 'timestamp' })
  time_stamp: Date;
}
