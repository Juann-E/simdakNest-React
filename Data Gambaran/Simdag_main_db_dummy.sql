INSERT INTO users (username, password, role) VALUES
('admin1', '123', 'admin'),
('operator1', '123', 'operator');

INSERT INTO nama_pasar (nama_pasar, alamat) VALUES
('Pasar Pagi', 'Jl. Mawar No. 1'),
('Pasar Malam', 'Jl. Melati No. 2');

INSERT INTO satuan_barang (satuan_barang) VALUES
('Kilogram'),
('Lembar');

INSERT INTO nama_barang (nama_barang, id_satuan, keterangan) VALUES
('Beras Premium', 1, 'Beras kualitas tinggi'),
('Kertas HVS', 2, 'Kertas ukuran A4');

INSERT INTO barang_pasar_grid (id_pasar, id_barang) VALUES
(1, 1), -- Beras Premium di Pasar Pagi
(2, 2); -- Kertas HVS di Pasar Malam


INSERT INTO harga_barang_pasar (id_barang_pasar, harga, time_stamp) VALUES
(1, 12000.00, NOW()), -- Harga beras premium di Pasar Pagi
(2, 45000.00, NOW()); -- Harga kertas HVS di Pasar Malam