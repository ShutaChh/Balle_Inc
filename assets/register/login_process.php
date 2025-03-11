<?php
session_start();
require_once __DIR__ . '/config/database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    try {
        $sql = "SELECT * FROM users WHERE username = :username";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            header("Location: ../index.html");
            exit(); 
        } else {
            // Redirect dengan pesan error
            header("Location: register.php?error=Invalid username or password");
            exit();
        }
    } catch (PDOException $e) {
        header("Location: register.php?error=Database error occurred");
        exit();
    }
}
