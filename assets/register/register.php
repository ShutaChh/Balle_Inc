<?php
session_start();
require_once '../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullname = filter_input(INPUT_POST, 'fullname', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $role = filter_input(INPUT_POST, 'role', FILTER_SANITIZE_STRING);

    // Validate password match
    if ($password !== $confirm_password) {
        header("Location: register.html?error=Passwords do not match");
        exit();
    }

    try {
        // Check if email already exists
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            header("Location: register.html?error=Email already registered");
            exit();
        }

        // Hash password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Begin transaction
        $conn->beginTransaction();

        // Insert into users table
        $sql = "INSERT INTO users (fullname, email, phone, password, role) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$fullname, $email, $phone, $hashed_password, $role]);

        $user_id = $conn->lastInsertId();

        // If user is vendor, save additional info
        if ($role === 'vendor') {
            $company_name = filter_input(INPUT_POST, 'company_name', FILTER_SANITIZE_STRING);
            $business_address = filter_input(INPUT_POST, 'business_address', FILTER_SANITIZE_STRING);

            $sql = "INSERT INTO vendor_details (user_id, company_name, business_address) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$user_id, $company_name, $business_address]);
        }

        $conn->commit();
        header("Location: ../login/login.html?success=Registration successful");
        exit();
    } catch (PDOException $e) {
        $conn->rollBack();
        header("Location: register.html?error=Registration failed: " . $e->getMessage());
        exit();
    }
}
