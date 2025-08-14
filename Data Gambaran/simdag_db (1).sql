-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2025 at 10:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simdag_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `agen_lpg`
--

CREATE TABLE `agen_lpg` (
  `id` int(11) NOT NULL,
  `nama_usaha` varchar(255) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `kelurahan` varchar(100) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `penanggung_jawab` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `barang_pasar`
--

CREATE TABLE `barang_pasar` (
  `id` int(11) NOT NULL,
  `nama_pasar_id` int(11) NOT NULL,
  `nama_barang_id` int(11) NOT NULL,
  `type_barang` varchar(50) DEFAULT NULL,
  `explanation` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_realisasi_bbm`
--

CREATE TABLE `detail_realisasi_bbm` (
  `id` int(11) NOT NULL,
  `realisasi_bbm_header_id` int(11) NOT NULL,
  `bulan` varchar(20) NOT NULL,
  `tahun` int(11) NOT NULL,
  `jenis_bbm_id` int(11) NOT NULL,
  `realisasi_liter` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `distributor`
--

CREATE TABLE `distributor` (
  `id` int(11) NOT NULL,
  `nama_distributor` varchar(255) NOT NULL,
  `kecamatan` varchar(100) DEFAULT NULL,
  `kelurahan` varchar(100) DEFAULT NULL,
  `alamat` text NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ekspor_perusahaan`
--

CREATE TABLE `ekspor_perusahaan` (
  `id` int(11) NOT NULL,
  `perusahaan_id` int(11) NOT NULL,
  `tahun` int(11) NOT NULL,
  `bulan` varchar(20) NOT NULL,
  `nilai_rupiah` bigint(20) NOT NULL,
  `nilai_usd` bigint(20) NOT NULL,
  `negara_tujuan` varchar(100) NOT NULL,
  `komoditi` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `harga_barang_pasar`
--

CREATE TABLE `harga_barang_pasar` (
  `id` int(11) NOT NULL,
  `barang_pasar_id` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `tanggal_harga` date NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `impor_perusahaan`
--

CREATE TABLE `impor_perusahaan` (
  `id` int(11) NOT NULL,
  `perusahaan_id` int(11) NOT NULL,
  `tahun` int(11) NOT NULL,
  `bulan` varchar(20) NOT NULL,
  `nilai_rupiah` bigint(20) NOT NULL,
  `nilai_usd` bigint(20) NOT NULL,
  `negara_asal` varchar(100) NOT NULL,
  `komoditi` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jenis_bbm`
--

CREATE TABLE `jenis_bbm` (
  `id` int(11) NOT NULL,
  `jenis_bbm` varchar(100) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `komoditas_stok`
--

CREATE TABLE `komoditas_stok` (
  `id` int(11) NOT NULL,
  `nama_komoditas` varchar(255) NOT NULL,
  `satuan` varchar(50) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nama_barang`
--

CREATE TABLE `nama_barang` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(255) NOT NULL,
  `satuan_id` int(11) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nama_pasar`
--

CREATE TABLE `nama_pasar` (
  `id` int(11) NOT NULL,
  `nama_pasar` varchar(100) NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pangkalan_lpg`
--

CREATE TABLE `pangkalan_lpg` (
  `id` int(11) NOT NULL,
  `nama_usaha` varchar(255) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `kelurahan` varchar(100) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `penanggung_jawab` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perusahaan_export_import`
--

CREATE TABLE `perusahaan_export_import` (
  `id` int(11) NOT NULL,
  `nama_perusahaan` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `kelurahan` varchar(100) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `realisasi_bbm_header`
--

CREATE TABLE `realisasi_bbm_header` (
  `id` int(11) NOT NULL,
  `spbu_id` int(11) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `realisasi_bulanan_lpg`
--

CREATE TABLE `realisasi_bulanan_lpg` (
  `id` int(11) NOT NULL,
  `realisasi_lpg_header_id` int(11) NOT NULL,
  `bulan` varchar(20) NOT NULL,
  `tahun` int(11) NOT NULL,
  `jumlah_tabung` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `realisasi_lpg_header`
--

CREATE TABLE `realisasi_lpg_header` (
  `id` int(11) NOT NULL,
  `agen_lpg_id` int(11) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `satuan_barang`
--

CREATE TABLE `satuan_barang` (
  `id` int(11) NOT NULL,
  `satuan_barang` varchar(50) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `spbe`
--

CREATE TABLE `spbe` (
  `id` int(11) NOT NULL,
  `nama_usaha` varchar(255) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `kelurahan` varchar(100) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `penanggung_jawab` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `spbu`
--

CREATE TABLE `spbu` (
  `id` int(11) NOT NULL,
  `nama_usaha` varchar(255) NOT NULL,
  `nomor_spbu` varchar(100) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `kelurahan` varchar(100) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `penanggung_jawab` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spbu`
--

INSERT INTO `spbu` (`id`, `nama_usaha`, `nomor_spbu`, `kecamatan`, `kelurahan`, `alamat`, `latitude`, `longitude`, `telepon`, `penanggung_jawab`, `created_at`, `updated_at`) VALUES
(1, 'SPBU Mijen 02', '123456', 'Mijen', 'Karangmalang', 'Jl. Merdeka No.88', -6.98765432, 110.12345678, '08123456789', 'Budi Santoso', '2025-07-30 11:38:12', '2025-07-30 11:38:12');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_stok_pangan`
--

CREATE TABLE `transaksi_stok_pangan` (
  `id` int(11) NOT NULL,
  `tahun` int(11) NOT NULL,
  `bulan` varchar(20) NOT NULL,
  `distributor_id` int(11) NOT NULL,
  `komoditas_id` int(11) NOT NULL,
  `stock_awal` int(11) NOT NULL,
  `pengadaan` int(11) NOT NULL,
  `penyaluran` int(11) NOT NULL,
  `stok_akhir` int(11) GENERATED ALWAYS AS (`stock_awal` + `pengadaan` - `penyaluran`) STORED,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','operator') DEFAULT 'operator',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'coba', '$2b$10$QQ7kQ.3V4r8lCuD77rCwd.NEQFwqDK04B2J3Dzv5iMZwoq3KEM/4W', 'operator', '2025-07-30 10:06:33', '2025-07-30 10:06:33'),
(2, 'rio', '$2b$10$4E0oGV3KZy3aai7LOwuwzu6WBuz94xVNvNjBBRWIUc67koUrLa63K', 'operator', '2025-07-30 19:21:41', '2025-07-30 19:21:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agen_lpg`
--
ALTER TABLE `agen_lpg`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_usaha` (`nama_usaha`);

--
-- Indexes for table `barang_pasar`
--
ALTER TABLE `barang_pasar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_pasar_id` (`nama_pasar_id`,`nama_barang_id`),
  ADD KEY `nama_barang_id` (`nama_barang_id`);

--
-- Indexes for table `detail_realisasi_bbm`
--
ALTER TABLE `detail_realisasi_bbm`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `realisasi_bbm_header_id` (`realisasi_bbm_header_id`,`bulan`,`tahun`,`jenis_bbm_id`),
  ADD KEY `jenis_bbm_id` (`jenis_bbm_id`);

--
-- Indexes for table `distributor`
--
ALTER TABLE `distributor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_distributor` (`nama_distributor`);

--
-- Indexes for table `ekspor_perusahaan`
--
ALTER TABLE `ekspor_perusahaan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `perusahaan_id` (`perusahaan_id`,`tahun`,`bulan`,`negara_tujuan`,`komoditi`(255));

--
-- Indexes for table `harga_barang_pasar`
--
ALTER TABLE `harga_barang_pasar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `barang_pasar_id` (`barang_pasar_id`,`tanggal_harga`);

--
-- Indexes for table `impor_perusahaan`
--
ALTER TABLE `impor_perusahaan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `perusahaan_id` (`perusahaan_id`,`tahun`,`bulan`,`negara_asal`,`komoditi`(255));

--
-- Indexes for table `jenis_bbm`
--
ALTER TABLE `jenis_bbm`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jenis_bbm` (`jenis_bbm`);

--
-- Indexes for table `komoditas_stok`
--
ALTER TABLE `komoditas_stok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_komoditas` (`nama_komoditas`);

--
-- Indexes for table `nama_barang`
--
ALTER TABLE `nama_barang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_barang` (`nama_barang`),
  ADD KEY `satuan_id` (`satuan_id`);

--
-- Indexes for table `nama_pasar`
--
ALTER TABLE `nama_pasar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_pasar` (`nama_pasar`);

--
-- Indexes for table `pangkalan_lpg`
--
ALTER TABLE `pangkalan_lpg`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_usaha` (`nama_usaha`);

--
-- Indexes for table `perusahaan_export_import`
--
ALTER TABLE `perusahaan_export_import`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_perusahaan` (`nama_perusahaan`);

--
-- Indexes for table `realisasi_bbm_header`
--
ALTER TABLE `realisasi_bbm_header`
  ADD PRIMARY KEY (`id`),
  ADD KEY `spbu_id` (`spbu_id`);

--
-- Indexes for table `realisasi_bulanan_lpg`
--
ALTER TABLE `realisasi_bulanan_lpg`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `realisasi_lpg_header_id` (`realisasi_lpg_header_id`,`bulan`,`tahun`);

--
-- Indexes for table `realisasi_lpg_header`
--
ALTER TABLE `realisasi_lpg_header`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agen_lpg_id` (`agen_lpg_id`);

--
-- Indexes for table `satuan_barang`
--
ALTER TABLE `satuan_barang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `satuan_barang` (`satuan_barang`);

--
-- Indexes for table `spbe`
--
ALTER TABLE `spbe`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_usaha` (`nama_usaha`);

--
-- Indexes for table `spbu`
--
ALTER TABLE `spbu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_usaha` (`nama_usaha`),
  ADD UNIQUE KEY `nomor_spbu` (`nomor_spbu`);

--
-- Indexes for table `transaksi_stok_pangan`
--
ALTER TABLE `transaksi_stok_pangan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tahun` (`tahun`,`bulan`,`distributor_id`,`komoditas_id`),
  ADD KEY `distributor_id` (`distributor_id`),
  ADD KEY `komoditas_id` (`komoditas_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agen_lpg`
--
ALTER TABLE `agen_lpg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `barang_pasar`
--
ALTER TABLE `barang_pasar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_realisasi_bbm`
--
ALTER TABLE `detail_realisasi_bbm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `distributor`
--
ALTER TABLE `distributor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ekspor_perusahaan`
--
ALTER TABLE `ekspor_perusahaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `harga_barang_pasar`
--
ALTER TABLE `harga_barang_pasar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `impor_perusahaan`
--
ALTER TABLE `impor_perusahaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jenis_bbm`
--
ALTER TABLE `jenis_bbm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `komoditas_stok`
--
ALTER TABLE `komoditas_stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nama_barang`
--
ALTER TABLE `nama_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nama_pasar`
--
ALTER TABLE `nama_pasar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pangkalan_lpg`
--
ALTER TABLE `pangkalan_lpg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perusahaan_export_import`
--
ALTER TABLE `perusahaan_export_import`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `realisasi_bbm_header`
--
ALTER TABLE `realisasi_bbm_header`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `realisasi_bulanan_lpg`
--
ALTER TABLE `realisasi_bulanan_lpg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `realisasi_lpg_header`
--
ALTER TABLE `realisasi_lpg_header`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `satuan_barang`
--
ALTER TABLE `satuan_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `spbe`
--
ALTER TABLE `spbe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `spbu`
--
ALTER TABLE `spbu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transaksi_stok_pangan`
--
ALTER TABLE `transaksi_stok_pangan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barang_pasar`
--
ALTER TABLE `barang_pasar`
  ADD CONSTRAINT `barang_pasar_ibfk_1` FOREIGN KEY (`nama_pasar_id`) REFERENCES `nama_pasar` (`id`),
  ADD CONSTRAINT `barang_pasar_ibfk_2` FOREIGN KEY (`nama_barang_id`) REFERENCES `nama_barang` (`id`);

--
-- Constraints for table `detail_realisasi_bbm`
--
ALTER TABLE `detail_realisasi_bbm`
  ADD CONSTRAINT `detail_realisasi_bbm_ibfk_1` FOREIGN KEY (`realisasi_bbm_header_id`) REFERENCES `realisasi_bbm_header` (`id`),
  ADD CONSTRAINT `detail_realisasi_bbm_ibfk_2` FOREIGN KEY (`jenis_bbm_id`) REFERENCES `jenis_bbm` (`id`);

--
-- Constraints for table `ekspor_perusahaan`
--
ALTER TABLE `ekspor_perusahaan`
  ADD CONSTRAINT `ekspor_perusahaan_ibfk_1` FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan_export_import` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `harga_barang_pasar`
--
ALTER TABLE `harga_barang_pasar`
  ADD CONSTRAINT `harga_barang_pasar_ibfk_1` FOREIGN KEY (`barang_pasar_id`) REFERENCES `barang_pasar` (`id`);

--
-- Constraints for table `impor_perusahaan`
--
ALTER TABLE `impor_perusahaan`
  ADD CONSTRAINT `impor_perusahaan_ibfk_1` FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan_export_import` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `nama_barang`
--
ALTER TABLE `nama_barang`
  ADD CONSTRAINT `nama_barang_ibfk_1` FOREIGN KEY (`satuan_id`) REFERENCES `satuan_barang` (`id`);

--
-- Constraints for table `realisasi_bbm_header`
--
ALTER TABLE `realisasi_bbm_header`
  ADD CONSTRAINT `realisasi_bbm_header_ibfk_1` FOREIGN KEY (`spbu_id`) REFERENCES `spbu` (`id`);

--
-- Constraints for table `realisasi_bulanan_lpg`
--
ALTER TABLE `realisasi_bulanan_lpg`
  ADD CONSTRAINT `realisasi_bulanan_lpg_ibfk_1` FOREIGN KEY (`realisasi_lpg_header_id`) REFERENCES `realisasi_lpg_header` (`id`);

--
-- Constraints for table `realisasi_lpg_header`
--
ALTER TABLE `realisasi_lpg_header`
  ADD CONSTRAINT `realisasi_lpg_header_ibfk_1` FOREIGN KEY (`agen_lpg_id`) REFERENCES `agen_lpg` (`id`);

--
-- Constraints for table `transaksi_stok_pangan`
--
ALTER TABLE `transaksi_stok_pangan`
  ADD CONSTRAINT `transaksi_stok_pangan_ibfk_1` FOREIGN KEY (`distributor_id`) REFERENCES `distributor` (`id`),
  ADD CONSTRAINT `transaksi_stok_pangan_ibfk_2` FOREIGN KEY (`komoditas_id`) REFERENCES `komoditas_stok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
