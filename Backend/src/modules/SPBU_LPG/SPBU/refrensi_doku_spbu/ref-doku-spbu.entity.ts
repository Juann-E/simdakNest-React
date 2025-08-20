import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { DokumenSpbu } from '../dokumen_spbu/dokumen-spbu.entity';

@Entity('ref_doku_spbu')
export class RefDokuSpbu {
    @PrimaryGeneratedColumn({ name: 'id_ref_dSPBU' })
    id_ref_dSPBU: number;

    @Column({ name: 'nama_jenis_dok', type: 'varchar', length: 255 })
    nama_jenis_dok: string;

    // Relasi ke dokumen_spbu
    @OneToMany(() => DokumenSpbu, dok => dok.refJenis, { cascade: true })
    dokumen: DokumenSpbu[];
}
