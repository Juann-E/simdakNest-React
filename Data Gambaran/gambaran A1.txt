-- agen
CREATE TABLE `agen` (
  `id_agen` int(11) NOT NULL,
  `nama_usaha` varchar(100) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `id_kelurahan` int(11) NOT NULL,
  `alamat` text NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `telepon` varchar(50) DEFAULT NULL,
  `penanggung_jawab` varchar(100) DEFAULT NULL,
  `nomor_hp_penanggung_jawab` varchar(20) DEFAULT NULL,
  `status` enum('Aktif','Tidak Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- barang_pasar_grid
CREATE TABLE `barang_pasar_grid` (
  `id_barang_pasar` int(11) NOT NULL,
  `id_pasar` int(11) DEFAULT NULL,
  `id_barang` int(11) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `time_stamp` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- distributor
CREATE TABLE `distributor` (
  `id_distributor` int(11) NOT NULL,
  `nama_distributor` varchar(100) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `id_kelurahan` int(11) NOT NULL,
  `alamat` text NOT NULL,
  `koordinat` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- dokumen_spbu
CREATE TABLE `dokumen_spbu` (
  `id_dokumenSPBU` int(11) NOT NULL,
  `id_spbu` int(11) NOT NULL,
  `id_ref_dSPBU` int(11) NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `file_ext` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- harga_barang_pasar
CREATE TABLE `harga_barang_pasar` (
  `id_harga` int(11) NOT NULL,
  `id_barang_pasar` int(11) NOT NULL,
  `harga` decimal(15,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `tanggal_harga` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- kecamatan
CREATE TABLE `kecamatan` (
  `id_kecamatan` int(11) NOT NULL,
  `nama_kecamatan` varchar(100) NOT NULL,
  `keterangan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- kelurahan
CREATE TABLE `kelurahan` (
  `id_kelurahan` int(11) NOT NULL,
  `nama_kelurahan` varchar(100) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `id_kecamatan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- komoditas_stock_pangan
CREATE TABLE `komoditas_stock_pangan` (
  `id_komoditas` int(11) NOT NULL,
  `komoditas` varchar(100) NOT NULL,
  `satuan` varchar(50) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- nama_barang
CREATE TABLE `nama_barang` (
  `id_barang` int(11) NOT NULL,
  `nama_barang` varchar(100) NOT NULL,
  `id_satuan` int(11) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `time_stamp` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- nama_pasar
CREATE TABLE `nama_pasar` (
  `id_pasar` int(11) NOT NULL,
  `nama_pasar` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `time_stamp` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `gambar` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- pangkalan_lpg
CREATE TABLE `pangkalan_lpg` (
  `id_pangkalan_lpg` int(11) NOT NULL,
  `nama_usaha` varchar(100) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `id_kelurahan` int(11) NOT NULL,
  `alamat` text NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `telepon` varchar(50) DEFAULT NULL,
  `penanggung_jawab` varchar(100) DEFAULT NULL,
  `nomor_hp_penanggung_jawab` varchar(20) DEFAULT NULL,
  `status` enum('Aktif','Tidak Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- satuan_barang
CREATE TABLE `satuan_barang` (
  `id_satuan` int(11) NOT NULL,
  `satuan_barang` varchar(50) NOT NULL,
  `time_stamp` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- satuan_barang_stock_pangan
CREATE TABLE `satuan_barang_stock_pangan` (
  `id_satuan` int(11) NOT NULL,
  `satuan_barang` varchar(50) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- spbe
CREATE TABLE `spbe` (
  `id_spbe` int(11) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `id_kelurahan` int(11) NOT NULL,
  `alamat` text NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `telepon` varchar(50) DEFAULT NULL,
  `status` enum('Aktif','Tidak Aktif') NOT NULL DEFAULT 'Aktif',
  `nama_usaha` varchar(100) NOT NULL,
  `penanggung_jawab` varchar(100) DEFAULT NULL,
  `nomor_hp_penanggung_jawab` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- spbu
CREATE TABLE `spbu` (
  `id_spbu` int(11) NOT NULL,
  `no_spbu` varchar(50) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `id_kelurahan` int(11) NOT NULL,
  `alamat` text NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `telepon` varchar(50) DEFAULT NULL,
  `penanggung_jawab` varchar(100) DEFAULT NULL,
  `nomor_hp_penanggung_jawab` varchar(20) DEFAULT NULL,
  `status` enum('Aktif','Tidak Aktif') NOT NULL DEFAULT 'Aktif',
  `nama_usaha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- transaksi_stock_pangan
CREATE TABLE `transaksi_stock_pangan` (
  `id_transaksi` int(11) NOT NULL,
  `tahun` int(4) NOT NULL,
  `bulan` int(2) NOT NULL,
  `id_distributor` int(11) NOT NULL,
  `id_komoditas` int(11) NOT NULL,
  `stock_awal` decimal(10,2) DEFAULT 0.00,
  `pengadaan` decimal(10,2) DEFAULT 0.00,
  `penyaluran` decimal(10,2) DEFAULT 0.00,
  `keterangan` text DEFAULT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- users
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','operator') NOT NULL DEFAULT 'operator',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- view_perubahan_harga
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_perubahan_harga`  AS SELECT `h1`.`id_barang_pasar` AS `id_barang_pasar`, `bpg`.`id_pasar` AS `id_pasar`, `np`.`nama_pasar` AS `nama_pasar`, `nb`.`nama_barang` AS `nama_barang`, `h1`.`harga` AS `harga_terbaru`, `h2`.`harga` AS `harga_h_1`, round((`h1`.`harga` - `h2`.`harga`) / `h2`.`harga` * 100,2) AS `persen_perubahan` FROM ((((`harga_barang_pasar` `h1` join `harga_barang_pasar` `h2` on(`h1`.`id_barang_pasar` = `h2`.`id_barang_pasar` and cast(`h2`.`time_stamp` as date) = cast(`h1`.`time_stamp` as date) - interval 1 day)) join `barang_pasar_grid` `bpg` on(`h1`.`id_barang_pasar` = `bpg`.`id_barang_pasar`)) join `nama_pasar` `np` on(`bpg`.`id_pasar` = `np`.`id_pasar`)) join `nama_barang` `nb` on(`bpg`.`id_barang` = `nb`.`id_barang`)) ;
