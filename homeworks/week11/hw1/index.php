<?php
session_start();
require_once('./conn.php');
require_once('./utills.php');

$page = 1;
$limit = 5;
if (!empty($_GET['page'])) {
  $page = (int)$_GET['page'];
}
$offset = ($page -1) * $limit;

$username = NULL;
// check if user is login
if (!empty($_SESSION['username'])) { 
  $user_info = getUserData($_SESSION['username']);
  if ($user_info) {
    $username = $user_info['username'];
    $nickname = $user_info['nickname'];
    $user_id = $user_info['id'];
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
        <?php if ($username) {
          if ($user_info['role'] === 'admin') { ?>
            <a href="user_dashboard.php">權限管理</a>
          <?php }?>
          <a href="handle_logout.php">登出</a>
        <?php } else { ?>
          <a href="register.php">註冊</a>
          <a href="login.php">登入</a>
        <?php }?>
      </div>
      <h1>Discussion Board</h1>
      <h5>Give everyone the opportunity to talk about ideas!</h4>
      <!-- handle error code-->
      <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '資料不齊全';
        } else if ($code === '2') {
          $msg = '請先登入';
        } else if ($code === '3') {
          $msg = '只有管理員有權限';
        } else if ($code === '4') {
          $msg = '帳戶被停權發言';
        } else if ($code === '5') {
          $msg = '留言不存在';
        }
        echo '<h2>' . $msg . '<h2>';
      }
      ?>
      <?php if ($username) {?>
      <div class="input_section">
        <div class="input_section_user_edit hidden">
          <form action="handle_update_nickname.php" method="POST">
            <input type="hidden" require name="id" value="<?php echo $user_id?>">
            <?php if (!empty($nickname)) {?>
            <input type="text" name="nickname" require value="<?php echo htmlspecialchars($nickname)?>">
            <?php } else {?>
            <input type="text" name="nickname" require>
            <?php }?>
            <span class="btn_unchange_nickname">取消</span>
            <button class="btn_save_nickname">儲存</button>
          </form>
        </div>
      </div>
      <form action="handle_add_comment.php" method="get">
        <div class="input_section">
          <div class="input_section_user">
            <?php if (!empty($nickname)) {?>
            <input type="text" name="nickname" readonly="readonly" require value="<?php echo htmlspecialchars($nickname)?>">
            <?php } else {?>
            <input type="text" name="nickname" readonly="readonly" require placeholder="EX: 王小明">
            <?php }?>
            <div class="btn_edit_nickname"><img class="img_edit_nickname" src="images/edit.png"></div>  
          </div>
        </div>
      <?php } else {?>
        <form action="handle_add_comment.php" method="get" required>
          <div class="input_section">
            <h3>What's your name</h3>
            <input type="text" name="nickname">
          </div>
      <?php } ?>
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
        $sql = 'SELECT C.id AS id, C.content AS content, C.created_at AS created_at, ' . 
        'U.nickname AS nickname, U.username AS username, U.role AS role, ' .
        'U.edit_right AS edit_right, U.delete_right AS delete_right, ' . 
        'U.admin_edit AS admin_edit, U.admin_delete AS admin_delete ' . 
        'FROM zoeaeen13_comments AS C ' . 
        'LEFT JOIN zoeaeen13_users AS U ' . 
        'ON C.username = U.username ' . 
        'WHERE C.is_deleted IS NULL ' . 
        'ORDER BY C.id DESC ' . 
        'limit ? offset ?';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $limit, $offset);
        $result = $stmt->execute();
        if (!$result) {
          die ($conn->errno);
        }
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
          $num = rand(0,9);
          $edit_right = NULL;
          $delete_right = NULL;
          // personal
          if ($row["username"] === $username) {
            if ($user_info['edit_right'] === 1) {
              $edit_right = 1;
            }
            if ($user_info['delete_right'] === 1) {
              $delete_right = 1;
            }
          }

          // editor or admin
          if ($user_info['role'] === 'admin'|| $user_info['role'] === 'editor') {
            if($user_info['admin_edit'] === 1) {
              $edit_right = 1;
            }
            if($user_info['admin_delete'] === 1) {
              $delete_right = 1;
            }
          }
      ?>
      <div class="item">
      <?php
          if ($delete_right) {
        ?>
        <a class="btn_delete_comment" href="handle_delete_comment.php?id=<?php echo $row["id"] ?>">
          <img class="img_delete_comment" src="images/delete.png">
        </a>
        <?php } ?>
        <div class="item_users">
          <div class="avatar" style = "background-image: url('images/avatar<?php echo $num ?>.jpg'); background-size: cover;"></div>
          <h5><?php echo htmlspecialchars($row["nickname"]) . " (@" . htmlspecialchars($row["username"]) . ")";?></h5>
        </div>
        <div class="item_contents">
          <h6><?php echo substr($row["created_at"], 0, 10) ?></h6>
          <?php
          if ($edit_right) {
          ?>
          <a class="btn_edit_content" href="update_comment.php?id=<?php echo $row["id"] ?>">
            <img class="img_edit_content" src="images/edit.png">
          </a>
          <?php } ?>
          <p><?php echo htmlspecialchars($row["content"]) ?></p>
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
  <section class="pagination">
    <?php
    $page_sql = 'SELECT count(id) as num FROM zoeaeen13_comments AS C WHERE C.is_deleted IS NULL';
    $page_stmt = $conn->prepare($page_sql);
    $page_result = $page_stmt->execute();
    if (!$page_result) {
      die ($conn->errno);
    }
    $page_result = $page_stmt->get_result();
    $page_row = $page_result->fetch_assoc();
    $num = (int)$page_row["num"];
    $total_pages = ceil($num/$limit);
    $i = 1;

    // 上一頁
    if ($page <= 1) { ?>
    <a class="pagination_link hide_in_phone" href="index.php"><img src="images/left-arrow.png">Prev</a>
    <?php } else {?>
    <a class="pagination_link hide_in_phone" href="index.php?page=<?php echo $page-1?>"><img src="images/left-arrow.png">Prev</a>
    <?php }?>

    <!-- 頁碼 -->
    <?php while ($i <= $total_pages) {
      if ($i === $page) { ?>
      <a class="page_item page_select" href="index.php?page=<?php echo $i?>"><?php echo $i?></a>
    <?php } else { ?>
      <a class="page_item" href="index.php?page=<?php echo $i?>"><?php echo $i?></a>
    <?php }
      $i += 1;
      } ?>

    <!-- 下一頁 -->
    <?php if ($page < $total_pages) {?>
      <a class="pagination_link hide_in_phone" href="index.php?page=<?php echo $page+1?>"><img src="images/right-arrow.png">Next</a>
    <?php } else {?>
      <a class="pagination_link hide_in_phone" href="index.php?page=<?php echo $total_pages?>"><img src="images/right-arrow.png">Next</a>
    <?php }?>

  </section>
</body>
<script type="text/javascript" src="demo.js"></script>
</html>