-- PostgreSQL Schema untuk Neon Database
-- Konversi dari MySQL Simdag_Main_db.sql

-- Tabel: agen
CREATE TABLE agen (
  id_agen SERIAL PRIMARY KEY,
  nama_usaha VARCHAR(100) NOT NULL,
  id_kecamatan INTEGER NOT NULL,
  id_kelurahan INTEGER NOT NULL,
  alamat TEXT NOT NULL,
  latitude DECIMAL(10,7) DEFAULT NULL,
  longitude DECIMAL(10,7) DEFAULT NULL,
  telepon VARCHAR(50) DEFAULT NULL,
  penanggung_jawab VARCHAR(100) DEFAULT NULL,
  nomor_hp_penanggung_jawab VARCHAR(20) DEFAULT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Tidak Aktif'))
);

-- Tabel: barang_pasar_grid 
CREATE TABLE barang_pasar_grid (
  id_barang_pasar SERIAL PRIMARY KEY,
  id_pasar INTEGER DEFAULT NULL,
  id_barang INTEGER DEFAULT NULL,
  keterangan TEXT DEFAULT NULL,
  time_stamp TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabel: distributor
CREATE TABLE distributor (
  id_distributor SERIAL PRIMARY KEY,
  nama_distributor VARCHAR(100) NOT NULL,
  id_kecamatan INTEGER NOT NULL,
  id_kelurahan INTEGER NOT NULL,
  alamat TEXT NOT NULL,
  koordinat VARCHAR(255) DEFAULT NULL,
  latitude DECIMAL(10,7) DEFAULT NULL,
  longitude DECIMAL(10,7) DEFAULT NULL,
  keterangan TEXT DEFAULT NULL,
  time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabel: dokumen_spbu
CREATE TABLE dokumen_spbu (
  id_dokumenSPBU SERIAL PRIMARY KEY,
  id_spbu INTEGER NOT NULL,
  id_ref_dSPBU INTEGER NOT NULL,
  file_path VARCHAR(255) DEFAULT NULL,
  keterangan TEXT DEFAULT NULL,
  file_ext VARCHAR(255) DEFAULT NULL,
  file_name VARCHAR(255) DEFAULT NULL
);

-- Tabel: harga_barang_pasar
CREATE TABLE harga_barang_pasar (
  id_harga SERIAL PRIMARY KEY,
  id_barang_pasar INTEGER NOT NULL,
  harga DECIMAL(15,2) NOT NULL,
  keterangan TEXT DEFAULT NULL,
  time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  tanggal_harga DATE NOT NULL
);

-- Tabel: kecamatan
CREATE TABLE kecamatan (
  id_kecamatan SERIAL PRIMARY KEY,
  nama_kecamatan VARCHAR(100) NOT NULL,
  keterangan TEXT DEFAULT NULL
);

-- Tabel: kelurahan
CREATE TABLE kelurahan (
  id_kelurahan SERIAL PRIMARY KEY,
  nama_kelurahan VARCHAR(100) NOT NULL,
  keterangan TEXT DEFAULT NULL,
  id_kecamatan INTEGER DEFAULT NULL
);

-- Tabel: komoditas_stock_pangan
CREATE TABLE komoditas_stock_pangan (
  id_komoditas SERIAL PRIMARY KEY,
  komoditas VARCHAR(100) NOT NULL,
  satuan VARCHAR(50) NOT NULL,
  keterangan TEXT DEFAULT NULL,
  gambar VARCHAR(255) DEFAULT NULL,
  time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabel: nama_barang
CREATE TABLE nama_barang (
  id_barang SERIAL PRIMARY KEY,
  nama_barang VARCHAR(100) NOT NULL,
  id_satuan INTEGER DEFAULT NULL,
  keterangan TEXT DEFAULT NULL,
  gambar VARCHAR(255) DEFAULT NULL,
  time_stamp TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabel: nama_pasar
CREATE TABLE nama_pasar (
  id_pasar SERIAL PRIMARY KEY,
  nama_pasar VARCHAR(100) NOT NULL,
  alamat TEXT DEFAULT NULL,
  time_stamp TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  gambar VARCHAR(255) DEFAULT NULL,
  latitude DECIMAL(10,7) DEFAULT NULL,
  longitude DECIMAL(10,7) DEFAULT NULL
);

-- Tabel: pangkalan_lpg
CREATE TABLE pangkalan_lpg (
  id_pangkalan_lpg SERIAL PRIMARY KEY,
  nama_usaha VARCHAR(100) NOT NULL,
  id_kecamatan INTEGER NOT NULL,
  id_kelurahan INTEGER NOT NULL,
  alamat TEXT NOT NULL,
  latitude DECIMAL(10,7) DEFAULT NULL,
  longitude DECIMAL(10,7) DEFAULT NULL,
  telepon VARCHAR(50) DEFAULT NULL,
  penanggung_jawab VARCHAR(100) DEFAULT NULL,
  nomor_hp_penanggung_jawab VARCHAR(20) DEFAULT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Tidak Aktif'))
);

-- Tabel: satuan_barang
CREATE TABLE satuan_barang (
  id_satuan SERIAL PRIMARY KEY,
  satuan_barang VARCHAR(50) NOT NULL,
  time_stamp TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabel: satuan_barang_stock_pangan
CREATE TABLE satuan_barang_stock_pangan (
  id_satuan SERIAL PRIMARY KEY,
  satuan_barang VARCHAR(50) NOT NULL,
  time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabel: spbe
CREATE TABLE spbe (
  id_spbe SERIAL PRIMARY KEY,
  id_kecamatan INTEGER NOT NULL,
  id_kelurahan INTEGER NOT NULL,
  alamat TEXT NOT NULL,
  latitude DECIMAL(10,7) DEFAULT NULL,
  longitude DECIMAL(10,7) DEFAULT NULL,
  telepon VARCHAR(50) DEFAULT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Tidak Aktif')),
  nama_usaha VARCHAR(100) NOT NULL,
  penanggung_jawab VARCHAR(100) DEFAULT NULL,
  nomor_hp_penanggung_jawab VARCHAR(20) DEFAULT NULL
);

-- Tabel: spbu
CREATE TABLE spbu (
  id_spbu SERIAL PRIMARY KEY,
  no_spbu VARCHAR(50) NOT NULL,
  id_kecamatan INTEGER NOT NULL,
  id_kelurahan INTEGER NOT NULL,
  alamat TEXT NOT NULL,
  latitude DECIMAL(10,7) DEFAULT NULL,
  longitude DECIMAL(10,7) DEFAULT NULL,
  telepon VARCHAR(50) DEFAULT NULL,
  penanggung_jawab VARCHAR(100) DEFAULT NULL,
  nomor_hp_penanggung_jawab VARCHAR(20) DEFAULT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Tidak Aktif')),
  nama_usaha VARCHAR(100) NOT NULL
);

-- Tabel: transaksi_stock_pangan
CREATE TABLE transaksi_stock_pangan (
  id_transaksi SERIAL PRIMARY KEY,
  tahun INTEGER NOT NULL,
  bulan INTEGER NOT NULL,
  id_distributor INTEGER NOT NULL,
  id_komoditas INTEGER NOT NULL,
  stock_awal DECIMAL(10,2) DEFAULT 0.00,
  pengadaan DECIMAL(10,2) DEFAULT 0.00,
  penyaluran DECIMAL(10,2) DEFAULT 0.00,
  keterangan TEXT DEFAULT NULL,
  time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabel: users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'operator' CHECK (role IN ('admin', 'operator')),
  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Foreign Key Constraints
ALTER TABLE agen ADD CONSTRAINT fk_agen_kecamatan FOREIGN KEY (id_kecamatan) REFERENCES kecamatan(id_kecamatan);
ALTER TABLE agen ADD CONSTRAINT fk_agen_kelurahan FOREIGN KEY (id_kelurahan) REFERENCES kelurahan(id_kelurahan);

ALTER TABLE distributor ADD CONSTRAINT fk_distributor_kecamatan FOREIGN KEY (id_kecamatan) REFERENCES kecamatan(id_kecamatan);
ALTER TABLE distributor ADD CONSTRAINT fk_distributor_kelurahan FOREIGN KEY (id_kelurahan) REFERENCES kelurahan(id_kelurahan);

ALTER TABLE barang_pasar_grid ADD CONSTRAINT fk_barang_pasar_pasar FOREIGN KEY (id_pasar) REFERENCES nama_pasar(id_pasar);
ALTER TABLE barang_pasar_grid ADD CONSTRAINT fk_barang_pasar_barang FOREIGN KEY (id_barang) REFERENCES nama_barang(id_barang);

ALTER TABLE harga_barang_pasar ADD CONSTRAINT fk_harga_barang_pasar FOREIGN KEY (id_barang_pasar) REFERENCES barang_pasar_grid(id_barang_pasar);

ALTER TABLE kelurahan ADD CONSTRAINT fk_kelurahan_kecamatan FOREIGN KEY (id_kecamatan) REFERENCES kecamatan(id_kecamatan);

ALTER TABLE nama_barang ADD CONSTRAINT fk_nama_barang_satuan FOREIGN KEY (id_satuan) REFERENCES satuan_barang(id_satuan);

ALTER TABLE pangkalan_lpg ADD CONSTRAINT fk_pangkalan_lpg_kecamatan FOREIGN KEY (id_kecamatan) REFERENCES kecamatan(id_kecamatan);
ALTER TABLE pangkalan_lpg ADD CONSTRAINT fk_pangkalan_lpg_kelurahan FOREIGN KEY (id_kelurahan) REFERENCES kelurahan(id_kelurahan);

ALTER TABLE spbe ADD CONSTRAINT fk_spbe_kecamatan FOREIGN KEY (id_kecamatan) REFERENCES kecamatan(id_kecamatan);
ALTER TABLE spbe ADD CONSTRAINT fk_spbe_kelurahan FOREIGN KEY (id_kelurahan) REFERENCES kelurahan(id_kelurahan);

ALTER TABLE spbu ADD CONSTRAINT fk_spbu_kecamatan FOREIGN KEY (id_kecamatan) REFERENCES kecamatan(id_kecamatan);
ALTER TABLE spbu ADD CONSTRAINT fk_spbu_kelurahan FOREIGN KEY (id_kelurahan) REFERENCES kelurahan(id_kelurahan);

ALTER TABLE transaksi_stock_pangan ADD CONSTRAINT fk_transaksi_distributor FOREIGN KEY (id_distributor) REFERENCES distributor(id_distributor);
ALTER TABLE transaksi_stock_pangan ADD CONSTRAINT fk_transaksi_komoditas FOREIGN KEY (id_komoditas) REFERENCES komoditas_stock_pangan(id_komoditas);

-- View: view_perubahan_harga (PostgreSQL version)
CREATE VIEW view_perubahan_harga AS 
SELECT 
  h1.id_barang_pasar,
  bpg.id_pasar,
  np.nama_pasar,
  nb.nama_barang,
  h1.harga AS harga_terbaru,
  h2.harga AS harga_h_1,
  ROUND(((h1.harga - h2.harga) / h2.harga * 100)::numeric, 2) AS persen_perubahan
FROM harga_barang_pasar h1
JOIN harga_barang_pasar h2 ON (
  h1.id_barang_pasar = h2.id_barang_pasar 
  AND h2.time_stamp::date = h1.time_stamp::date - INTERVAL '1 day'
)
JOIN barang_pasar_grid bpg ON h1.id_barang_pasar = bpg.id_barang_pasar
JOIN nama_pasar np ON bpg.id_pasar = np.id_pasar
JOIN nama_barang nb ON bpg.id_barang = nb.id_barang;

-- Indexes untuk performa
CREATE INDEX idx_harga_barang_pasar_tanggal ON harga_barang_pasar(tanggal_harga);
CREATE INDEX idx_harga_barang_pasar_timestamp ON harga_barang_pasar(time_stamp);
CREATE INDEX idx_transaksi_stock_pangan_tahun_bulan ON transaksi_stock_pangan(tahun, bulan);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- Trigger untuk updated_at pada tabel users
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Komentar untuk dokumentasi
COMMENT ON TABLE agen IS 'Tabel data agen LPG';
COMMENT ON TABLE distributor IS 'Tabel data distributor stock pangan';
COMMENT ON TABLE harga_barang_pasar IS 'Tabel harga barang di pasar';
COMMENT ON TABLE transaksi_stock_pangan IS 'Tabel transaksi stock pangan bulanan';
COMMENT ON TABLE users IS 'Tabel pengguna sistem';