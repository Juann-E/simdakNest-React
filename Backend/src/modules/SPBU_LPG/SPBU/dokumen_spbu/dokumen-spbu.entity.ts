import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Spbu } from '../../SPBU/main/spbu.entity';
import { RefDokuSpbu } from '../refrensi_doku_spbu/ref-doku-spbu.entity';


@Entity('dokumen_spbu')
export class DokumenSpbu {
  @PrimaryGeneratedColumn()
  id_dokumenSPBU: number;

  @Column()
  id_spbu: number;

  @Column()
  id_ref_dSPBU: number;

  @Column({ nullable: true })
  file_path: string;

  @Column({ type: 'text', nullable: true })
  keterangan: string;

  @Column({ nullable: true })
  file_ext: string;

  @Column({ nullable: true })
  file_name?: string;

  @ManyToOne(() => Spbu, spbu => spbu.dokumen, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_spbu' })
  spbu: Spbu;

  @ManyToOne(() => RefDokuSpbu, ref => ref.dokumen, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_ref_dSPBU' })
  refJenis: RefDokuSpbu;
}
