<?php
session_start();
require_once('./conn.php');
require_once('./utills.php');

$username = NULL;
$nickname = NULL;
// check if user is login
if (!empty($_SESSION['username'])) {  
  $user_info = getUserData($_SESSION['username']);
  if ($user_info) {
    $username = $user_info['username'];
    $nickname = $user_info['nickname'];
  }
  // let JS file get the login status
  echo '<Script>' . 'const isLogin = "true"' . '</Script>';
} else {
  echo '<Script>' . 'const isLogin = "false"' . '</Script>';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="style.css">
  <title>留言版</title>
</head>
<header>
  注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
</header>
<body class="debug">
  <div class="dashboard">
    <section class="main">
      <div class="user_buttons">
        <!-- if login -->
        <?php if ($username) { ?>
          <a href="handle_logout.php">登出</a>
        <?php } else { ?>
          <a href="register.php">註冊</a>
          <a href="login.php">登入</a>
        <?php } ?>
      </div>
      <h1>Discussion Board</h1>
      <h5>Give everyone the opportunity to talk about ideas!</h4>
      <form action="handle_add_comment.php" method="get">

        <!-- handle error code-->
        <?php
        if (!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = 'Error';
          if ($code === '1') {
            $msg = '資料不齊全';
          }
          echo '<h2>' . $msg . '<h2>';
        }
        ?>

        <div class="input_section">
          <h3>What's your name?</h3>

          <!-- show nickname -->
          <?php if ($nickname) { ?>
            <input type="text" name="username" readonly="readonly" value="<?php echo ($nickname)?>">  
          <?php } else { ?>
            <input type="text" name="username">  
          <?php } ?>

        </div>
        <div class="input_section">
          <h3>What do you want to say?</h3>
          <textarea name="content" rows="5" required></textarea>
        </div>
        <div class="buttons">
          <div class="btn_clear">Clear</div>
          <button class="btn_submit">Submit</button>
        </div>
      </form>
    </section>

    <section class="discussions">
      <?php
      // query
        $sql = "SELECT * FROM zoeaeen13_comments ORDER BY id DESC";
        $result = $conn->query($sql);
        if (!$result) {
          die($conn->error);          
        }
        while ($row = $result->fetch_assoc()) {
          $num = rand(0,9)
      ?>
      <div class="item">
        <div class="item_users">
          <div class="avatar" style = "background-image: url('images/avatar<?php echo $num ?>.jpg'); background-size: cover;"></div>
          <h5>
            <?php echo $row["username"] ?>
          </h5>
        </div>
        <div class="item_contents">
          <h6>
            <?php echo substr($row["created_at"], 0, 10) ?>
          </h6>
          <p><?php echo $row["content"] ?></p>
        </div>
      </div>
      <?php
        }
      ?>
    </section>
    <div class="btn_up">
      <img src="images/up_arrow.png">
    </div>
  </div>
</body>
<script type="text/javascript" src="demo.js"></script>
</html>