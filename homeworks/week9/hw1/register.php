<?php
require_once('./conn.php');

// query
$sql = "SELECT * FROM zoeaeen13_comments ORDER BY id DESC";
$result = $conn->query($sql);
if (!$result) {
  die('Error:' . $conn->error);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="user.css">
  <title>留言版</title>
</head>
<header>
  注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
</header>
<body class="debug">
  <div class="dashboard">
    <section class="section_intro">
      <a class="btn_home" href="index.php">HOME</a>
      <a class="btn_signin" href="login.php">LOG IN</a>
    </section>

    <section class="section_content">
      <h1>Create Account</h1>
      <h5>Get started in a few clicks</h4>
      <!-- handle error -->
      <?php
        if (!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = '';
          if ($code === '1') {
            $msg = '資料不齊全';
          } else if ($code === '2') {
            $msg = '該帳號已被註冊';
          }
          echo '<h2>' . $msg . '<h2>';
        }
      ?>
      <form action="handle_register.php" method="POST">
        <input type="text" name="nickname" placeholder="Nickname">
        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="password">
        <button class="btn_signup">SIGN UP</button>
      </form>
    </section>
  </div>
</body>
</html>