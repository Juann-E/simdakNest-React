INSERT INTO users (username, password, role) VALUES
('admin1', '123', 'admin'),
('operator1', '123', 'operator');

-- isi table ref_doku_spbu
INSERT INTO ref_doku_spbu (nama_jenis_dok) VALUES
('Akte Pendirian'),
('Akte Perubahan'),
('Peta Lokasi Pendirian SPBU'),
('Peta Konstruksi SPBU'),
('Kapasitas Penyimpanan dan Penimbunan'),
('Perkiraan Penyaluran'),
('Inventarisasi Peralatan dan Fasilitas'),
('Rekomendasi dari Pertamina'),
('Salinan KTP Penanggung Jawab SPBU'),
('Salinan NPWP'),
('Dokumen HO/AMDAL/UKL-UPL'),
('Ijin Peruntukan Penggunaan Tanah (IPPT)'),
('Ijin Mendirikan Bangunan (IMB)'),
('Bukti Pengesahan Meter Pompa SPBU'),
('Ijin Timbun Tangki dari Instansi Berwenang');

-- isi tabel kecamatan
INSERT INTO kecamatan (nama_kecamatan, keterangan) VALUES
('Argomulyo', 'Wilayah Argomulyo'),
('Sidomukti', 'Wilayah Sidomukti'),
('Sidorejo', 'Wilayah Sidorejo'),
('Tingkir', 'Wilayah Tingkir');

-- isi tabel kelurahan
INSERT INTO kelurahan (id_kecamatan, nama_kelurahan, keterangan) VALUES
-- Argomulyo (id_kecamatan = 1)
(1, 'Cebongan', 'Kelurahan di Argomulyo'),
(1, 'Ledok', 'Kelurahan di Argomulyo'),
(1, 'Noborejo', 'Kelurahan di Argomulyo'),

-- Sidomukti (id_kecamatan = 2)
(2, 'Mangunsari', 'Kelurahan di Sidomukti'),
(2, 'Kalibening', 'Kelurahan di Sidomukti'),
(2, 'Dukuh', 'Kelurahan di Sidomukti'),

-- Sidorejo (id_kecamatan = 3)
(3, 'Bugel', 'Kelurahan di Sidorejo'),
(3, 'Pulutan', 'Kelurahan di Sidorejo'),
(3, 'Kumpulrejo', 'Kelurahan di Sidorejo'),

-- Tingkir (id_kecamatan = 4)
(4, 'Gendongan', 'Kelurahan di Tingkir'),
(4, 'Sidorejo Lor', 'Kelurahan di Tingkir'),
(4, 'Kalibening', 'Kelurahan di Tingkir');
