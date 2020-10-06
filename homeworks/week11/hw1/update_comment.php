<?php
session_start();
require_once('./utills.php');
require_once('./conn.php');

if (empty($_SESSION['username'])) {
  header("Location: index.php?errCode=2");
  die('請先登入');
}

$id = $_GET['id'];
$sql = 'SELECT * FROM zoeaeen13_comments WHERE id = ? AND is_deleted IS NULL';
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id);
$result = $stmt->execute();
if (!$result) {
  die ($conn->errno);
}
$result = $stmt->get_result();
$row = $result->fetch_assoc();
if (empty($row)) {
  header("Location: index.php?errCode=5");
  die('留言不存在');
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
        <a href="index.php">回到首頁</a>
      </div>
      <h1>Edit Message</h1>
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

      <form action="handle_update_comment.php" method="post" required>
        <div class="input_section">
          <h3>What do you want to say?</h3>
          <textarea name="content" cols="80" rows="9" required><?php echo htmlspecialchars($row['content'])?></textarea>
          <input type="hidden" name="id" value="<?php echo $id?>">
        </div>
        <button class="btn_submit">Submit</button>
      </form>
    </section>
  </div>
</body>
<script type="text/javascript" src="demo.js"></script>
</html>