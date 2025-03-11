<!-- filepath: /D:/Agung/Balle inc/Balle inc/assets/register/config.php -->
<?php
session_start();
$host = 'localhost';
$dbname = 'balle_inc';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>