import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,OneToMany} from 'typeorm';
import { Kecamatan } from '../../../Alamat/Kecamatan/kecamatan.entity';
import { Kelurahan } from '../../../Alamat/Kelurahan/kelurahan.entity';
import { DokumenSpbu } from '../dokumen_spbu/dokumen-spbu.entity';

@Entity('spbu')
export class Spbu {
  @PrimaryGeneratedColumn({ name: 'id_spbu' })
  id_spbu: number;

  @Column({ name: 'no_spbu', type: 'varchar', length: 50 })
  no_spbu: string;

  @Column({ name: 'id_kecamatan' })
  id_kecamatan: number;

  @Column({ name: 'id_kelurahan' })
  id_kelurahan: number;

  @Column({ type: 'text' })
  alamat: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telepon: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  penanggung_jawab: string;

  // Relations
  @ManyToOne(() => Kecamatan)
  @JoinColumn({ name: 'id_kecamatan' })
  kecamatan: Kecamatan;

  @ManyToOne(() => Kelurahan)
  @JoinColumn({ name: 'id_kelurahan' })
  kelurahan: Kelurahan;

  //dokumen_spbu
  @OneToMany(() => DokumenSpbu, dok => dok.spbu, { cascade: true })
  dokumen: DokumenSpbu[];
}
