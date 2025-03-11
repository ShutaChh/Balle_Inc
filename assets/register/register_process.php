<?php
session_start();
require_once __DIR__ . '/config/database.php';

// Verify CSRF token
if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    header("Location: register.php?error=Invalid request");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    try {
        // Check if email already exists
        $checkEmail = "SELECT COUNT(*) FROM users WHERE email = :email";
        $stmt = $pdo->prepare($checkEmail);
        $stmt->execute([':email' => $email]);
        $emailExists = $stmt->fetchColumn();

        if ($emailExists) {
            $_SESSION['error'] = "Email sudah terdaftar. Silakan gunakan email lain.";
            header("Location: register.php");
            exit();
        }

        // If email doesn't exist, proceed with registration
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':email' => $email,
            ':password' => $hashedPassword
        ]);

        $_SESSION['success'] = "Registrasi berhasil! Silakan login.";
        header("Location: register.php");
        exit();
    } catch (PDOException $e) {
        $_SESSION['error'] = "Registration failed: " . $e->getMessage();
        header("Location: register.php");
        exit();
    }
}
