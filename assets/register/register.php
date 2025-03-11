<?php
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

require_once __DIR__ . '/config/database.php';

if (empty($_SESSION['csrf_token'])) {
  $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script
    src="https://kit.fontawesome.com/64d58efce2.js"
    crossorigin="anonymous"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  <link rel="stylesheet" href="./register.css" />
  <title>Daftar & Login</title>

  <meta http-equiv="X-Frame-Options" content="DENY">
  <meta http-equiv="X-XSS-Protection" content="1; mode=block">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://kit.fontawesome.com 'unsafe-inline'; style-src 'self' https://cdnjs.cloudflare.com 'unsafe-inline';">
  <link rel="icon" type="image/x-icon" href="/assets/images/logos/logo.png">
</head>

<body>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="login_process.php" method="post" class="sign-in-form">
          <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
          <h2 class="title">Login</h2>
          <div class="error-message" style="color: red; margin-bottom: 10px">
            <?php if (isset($_GET['error'])) {
              echo htmlspecialchars($_GET['error']);
            } ?>
          </div>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Harus setidaknya memiliki 1 nomer, 1 huruf besar, 1 huruf kecil dan setidaknya 8 karakter atau lebih"
              required />
          </div>
          <input type="submit" value="Login" class="btn solid" />
          <p class="social-text">Or Sign in with social platforms</p>
          <div class="social-media">
            <a href="#" class="social-icon"><i class="fab fa-google"></i></a>
          </div>
        </form>
        <form
          action="register_process.php"
          method="POST"
          class="sign-up-form">
          <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
          <h2 class="title">Daftar</h2>
          <div class="error-message" style="color: red; margin-bottom: 10px">
            <?php
            if (isset($_GET['error'])) {
              echo htmlspecialchars($_GET['error']);
            } elseif (isset($_GET['success'])) {
              echo '<span style="color: green;">' . htmlspecialchars($_GET['success']) . '</span>';
            }
            ?>
          </div>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Harus setidaknya memiliki 1 nomer, 1 huruf besar, 1 huruf kecil dan setidaknya 8 karakter atau lebih"
              required />
          </div>
          <input type="submit" class="btn" value="Daftar" />
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here ?</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
            ex ratione. Aliquid!
          </p>
          <button class="btn transparent" id="sign-up-btn">Daftar</button>
        </div>
        <img src="./login.png" class="image" alt="Login image" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p>
          <button class="btn transparent" id="sign-in-btn">Login</button>
        </div>
        <img src="./register.png" class="image" alt="Register image" />
      </div>
    </div>
  </div>
  <script src="./register.js"></script>
</body>

</html>