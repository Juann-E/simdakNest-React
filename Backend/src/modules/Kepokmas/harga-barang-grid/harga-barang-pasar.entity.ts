import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { BarangPasarGrid } from '../barang-pasar-grid/barang-pasar-grid.entity';

@Entity('harga_barang_pasar')
export class HargaBarangPasar {
  @PrimaryGeneratedColumn()
  id_harga: number;
  
  @Column({ name: 'id_barang_pasar' })
  idBarangPasar: number;

  @Column('decimal', { precision: 15, scale: 2 })
  harga: number;

  @Column({ type: 'text', nullable: true })
  keterangan: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time_stamp: Date;

  @ManyToOne(() => BarangPasarGrid, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_barang_pasar' })
  barang: BarangPasarGrid;

}
