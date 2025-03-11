<?php
// Konfigurasi database
$host = 'localhost';     // Host database
$dbname = 'balle_inc';   // Nama database
$username = 'root';      // Username database (default XAMPP)
$password = '';          // Password database (default XAMPP kosong)

try {
    // Membuat koneksi PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    // Set mode error PDO ke exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Set karakter encoding
    $pdo->exec("set names utf8mb4");
} catch (PDOException $e) {
    // Tampilkan pesan error jika koneksi gagal
    die("Koneksi Database gagal: " . $e->getMessage());
}
