-- Script untuk membuat database dan tabel Stock Pangan
-- Jalankan script ini di phpMyAdmin atau MySQL command line

-- 1. Membuat database simdag_main
CREATE DATABASE IF NOT EXISTS `simdag_main` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `simdag_main`;

-- 2. Membuat tabel kecamatan (diperlukan untuk relasi)
CREATE TABLE IF NOT EXISTS `kecamatan` (
  `id_kecamatan` int(11) NOT NULL AUTO_INCREMENT,
  `nama_kecamatan` varchar(100) NOT NULL,
  `keterangan` text,
  PRIMARY KEY (`id_kecamatan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Membuat tabel kelurahan (diperlukan untuk relasi)
CREATE TABLE IF NOT EXISTS `kelurahan` (
  `id_kelurahan` int(11) NOT NULL AUTO_INCREMENT,
  `nama_kelurahan` varchar(100) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `keterangan` text,
  PRIMARY KEY (`id_kelurahan`),
  KEY `fk_kelurahan_kecamatan` (`id_kecamatan`),
  CONSTRAINT `fk_kelurahan_kecamatan` FOREIGN KEY (`id_kecamatan`) REFERENCES `kecamatan` (`id_kecamatan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Membuat tabel distributor
CREATE TABLE IF NOT EXISTS `distributor` (
  `id_distributor` int(11) NOT NULL AUTO_INCREMENT,
  `nama_distributor` varchar(100) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `id_kelurahan` int(11) NOT NULL,
  `alamat` text NOT NULL,
  `koordinat` varchar(255),
  `latitude` decimal(10,7),
  `longitude` decimal(10,7),
  `keterangan` text,
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_distributor`),
  KEY `fk_distributor_kecamatan` (`id_kecamatan`),
  KEY `fk_distributor_kelurahan` (`id_kelurahan`),
  CONSTRAINT `fk_distributor_kecamatan` FOREIGN KEY (`id_kecamatan`) REFERENCES `kecamatan` (`id_kecamatan`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_distributor_kelurahan` FOREIGN KEY (`id_kelurahan`) REFERENCES `kelurahan` (`id_kelurahan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Membuat tabel satuan_barang_stock_pangan
CREATE TABLE IF NOT EXISTS `satuan_barang_stock_pangan` (
  `id_satuan` int(11) NOT NULL AUTO_INCREMENT,
  `satuan_barang` varchar(50) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_satuan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Membuat tabel komoditas_stock_pangan
CREATE TABLE IF NOT EXISTS `komoditas_stock_pangan` (
  `id_komoditas` int(11) NOT NULL AUTO_INCREMENT,
  `komoditas` varchar(100) NOT NULL,
  `satuan` varchar(50) NOT NULL,
  `keterangan` text,
  `gambar` varchar(255),
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_komoditas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Membuat tabel transaksi_stock_pangan
CREATE TABLE IF NOT EXISTS `transaksi_stock_pangan` (
  `id_transaksi` int(11) NOT NULL AUTO_INCREMENT,
  `tahun` int(4) NOT NULL,
  `bulan` int(2) NOT NULL,
  `id_distributor` int(11) NOT NULL,
  `id_komoditas` int(11) NOT NULL,
  `stock_awal` decimal(10,2) DEFAULT 0.00,
  `pengadaan` decimal(10,2) DEFAULT 0.00,
  `penyaluran` decimal(10,2) DEFAULT 0.00,
  `keterangan` text,
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_transaksi`),
  KEY `fk_transaksi_distributor` (`id_distributor`),
  KEY `fk_transaksi_komoditas` (`id_komoditas`),
  CONSTRAINT `fk_transaksi_distributor` FOREIGN KEY (`id_distributor`) REFERENCES `distributor` (`id_distributor`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_transaksi_komoditas` FOREIGN KEY (`id_komoditas`) REFERENCES `komoditas_stock_pangan` (`id_komoditas`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Insert data sample untuk kecamatan
INSERT INTO `kecamatan` (`nama_kecamatan`, `keterangan`) VALUES
('Sukolilo', 'Kecamatan Sukolilo'),
('Gubeng', 'Kecamatan Gubeng'),
('Wonokromo', 'Kecamatan Wonokromo'),
('Tegalsari', 'Kecamatan Tegalsari'),
('Genteng', 'Kecamatan Genteng');

-- 8. Insert data sample untuk kelurahan
INSERT INTO `kelurahan` (`nama_kelurahan`, `id_kecamatan`, `keterangan`) VALUES
('Keputih', 1, 'Kelurahan Keputih'),
('Klampis Ngasem', 1, 'Kelurahan Klampis Ngasem'),
('Gubeng', 2, 'Kelurahan Gubeng'),
('Airlangga', 2, 'Kelurahan Airlangga'),
('Wonokromo', 3, 'Kelurahan Wonokromo'),
('Jagir', 3, 'Kelurahan Jagir'),
('Tegalsari', 4, 'Kelurahan Tegalsari'),
('Kebon Rojo', 4, 'Kelurahan Kebon Rojo'),
('Genteng', 5, 'Kelurahan Genteng'),
('Embong Kaliasin', 5, 'Kelurahan Embong Kaliasin');

-- 9. Insert data sample untuk distributor
INSERT INTO `distributor` (`nama_distributor`, `id_kecamatan`, `id_kelurahan`, `alamat`, `koordinat`, `keterangan`) VALUES
('PT. Distributor Pangan Nusantara', 1, 1, 'Jl. Raya Surabaya No. 123', '-7.2575,112.7521', 'Distributor utama wilayah Sukolilo'),
('CV. Sumber Pangan Jaya', 2, 3, 'Jl. Pahlawan No. 45', '-7.2652,112.7454', 'Distributor wilayah Gubeng'),
('UD. Berkah Pangan', 3, 5, 'Jl. Merdeka No. 78', '-7.2754,112.7321', 'Distributor wilayah Wonokromo'),
('PT. Mitra Distribusi Indonesia', 4, 7, 'Jl. Industri No. 90', '-7.2598,112.7389', 'Distributor wilayah Tegalsari'),
('CV. Cahaya Pangan Mandiri', 5, 9, 'Jl. Pemuda No. 12', '-7.2634,112.7456', 'Distributor wilayah Genteng');

-- 10. Insert data sample untuk satuan_barang_stock_pangan
INSERT INTO `satuan_barang_stock_pangan` (`satuan_barang`) VALUES
('Kg'),
('Liter'),
('Gram'),
('Ton'),
('Karung'),
('Dus'),
('Pcs'),
('Botol'),
('Kaleng'),
('Bungkus');

-- 11. Insert data sample untuk komoditas_stock_pangan
INSERT INTO `komoditas_stock_pangan` (`komoditas`, `satuan`, `keterangan`) VALUES
('Beras', 'Kg', 'Beras untuk kebutuhan pokok'),
('Gula Pasir', 'Kg', 'Gula pasir untuk kebutuhan rumah tangga'),
('Minyak Goreng', 'Liter', 'Minyak goreng untuk memasak'),
('Tepung Terigu', 'Kg', 'Tepung terigu untuk membuat roti dan kue'),
('Telur Ayam', 'Kg', 'Telur ayam segar'),
('Daging Sapi', 'Kg', 'Daging sapi segar'),
('Daging Ayam', 'Kg', 'Daging ayam segar'),
('Ikan Laut', 'Kg', 'Ikan laut segar'),
('Cabai Merah', 'Kg', 'Cabai merah untuk bumbu masakan'),
('Bawang Merah', 'Kg', 'Bawang merah untuk bumbu masakan'),
('Bawang Putih', 'Kg', 'Bawang putih untuk bumbu masakan'),
('Tomat', 'Kg', 'Tomat segar'),
('Kentang', 'Kg', 'Kentang untuk sayuran'),
('Wortel', 'Kg', 'Wortel untuk sayuran'),
('Kacang Tanah', 'Kg', 'Kacang tanah untuk camilan');

-- 12. Insert data sample untuk transaksi_stock_pangan
INSERT INTO `transaksi_stock_pangan` (`tahun`, `bulan`, `id_distributor`, `id_komoditas`, `stock_awal`, `pengadaan`, `penyaluran`, `keterangan`) VALUES
(2024, 1, 1, 1, 1000.00, 500.00, 300.00, 'Stok beras bulan Januari - PT. Distributor Pangan Nusantara'),
(2024, 1, 1, 2, 800.00, 400.00, 250.00, 'Stok gula pasir bulan Januari - PT. Distributor Pangan Nusantara'),
(2024, 1, 2, 3, 600.00, 300.00, 200.00, 'Stok minyak goreng bulan Januari - CV. Sumber Pangan Jaya'),
(2024, 1, 2, 4, 750.00, 350.00, 180.00, 'Stok tepung terigu bulan Januari - CV. Sumber Pangan Jaya'),
(2024, 1, 3, 5, 500.00, 200.00, 150.00, 'Stok telur ayam bulan Januari - UD. Berkah Pangan'),
(2024, 2, 1, 1, 1200.00, 600.00, 400.00, 'Stok beras bulan Februari - PT. Distributor Pangan Nusantara'),
(2024, 2, 2, 2, 900.00, 450.00, 300.00, 'Stok gula pasir bulan Februari - CV. Sumber Pangan Jaya'),
(2024, 2, 3, 3, 700.00, 350.00, 250.00, 'Stok minyak goreng bulan Februari - UD. Berkah Pangan'),
(2024, 2, 4, 4, 850.00, 400.00, 220.00, 'Stok tepung terigu bulan Februari - PT. Mitra Distribusi Indonesia'),
(2024, 2, 5, 5, 600.00, 250.00, 180.00, 'Stok telur ayam bulan Februari - CV. Cahaya Pangan Mandiri'),
(2024, 3, 1, 1, 1100.00, 550.00, 350.00, 'Stok beras bulan Maret - PT. Distributor Pangan Nusantara'),
(2024, 3, 2, 2, 850.00, 425.00, 275.00, 'Stok gula pasir bulan Maret - CV. Sumber Pangan Jaya'),
(2024, 3, 3, 3, 650.00, 325.00, 225.00, 'Stok minyak goreng bulan Maret - UD. Berkah Pangan'),
(2024, 3, 4, 4, 800.00, 375.00, 200.00, 'Stok tepung terigu bulan Maret - PT. Mitra Distribusi Indonesia'),
(2024, 3, 5, 5, 550.00, 225.00, 160.00, 'Stok telur ayam bulan Maret - CV. Cahaya Pangan Mandiri');

-- Script selesai
-- Database dan tabel Stock Pangan berhasil dibuat dengan data sample
SELECT 'Database Stock Pangan berhasil dibuat!' as status;