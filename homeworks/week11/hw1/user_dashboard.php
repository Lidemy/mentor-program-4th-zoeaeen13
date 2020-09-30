<?php
session_start();
require_once('./conn.php');
require_once('./utills.php');
$username = NULL;
$role = NULL;
$user_num = 0;
$admin_num = 0;
$editor_num = 0;

if (empty($_SESSION['username'])) {
  header('Location: index.php?errCode=2');
  die('請先登入');
}

$user_info = getUserData($_SESSION['username']);
if ($user_info) {
  $username = $user_info['username'];
  $role = $user_info['role'];
  if ($role !== 'admin') {
    header('Location: index.php?errCode=3');
    die('只有管理員有權限');
  }
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
<div class="user_dashboard">
    <section class="list">
      <div class="user_buttons">
          <a href="index.php">首頁</a>
          <a href="handle_logout.php">登出</a>
      </div>
      <div class="list_intro">
        <h1>Users Dashboard</h1>
        <!-- 留個按鈕，希望之後加上管理員手動添加使用者的功能 -->
        <!-- <a href="" class="btn_add_user">
          <div class="img_add_user">
            <img src="images/plus.png">
          </div>
          Add User
        </a> -->
      </div>

      <div class="user_list">
        <div class="user_column">
          <div>用戶</div>
          <div>身分</div>
          <div>管理編輯</div>
          <div>管理刪除</div>
          <div></div>
        </div>

        <?php
        $sql = 'SELECT * FROM zoeaeen13_users AS U ORDER BY U.id DESC';
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        if (!$result) {
          die ($conn->errno);
        }
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
          $user_num += 1;
          $num = rand(0,9);?>
          <form class="user_form" action="handle_update_user.php" method="POST">
            <div class="user_item">
              <div class="user_info">
                <div class="user_avatar" style = "background-image: url('images/avatar<?php echo $num ?>.jpg'); background-size: cover;"></div>
                <div>
                  <h3><?php echo htmlspecialchars($row['nickname'])?></h3>
                  <h4>@<?php echo htmlspecialchars($row['username'])?></h4>
                  <input type="hidden" name="id" value="<?php echo $row['id']?>">
                </div>
              </div>
              <div>
                <select name="role">
                <?php
                $user_role = $row['role'];
                switch ($user_role) {
                  case 'admin':
                    $admin_num += 1?>
                    <option value="user">用戶</option>
                  　<option value="restricted">停權</option>
                  　<option value="editor">編輯</option>
                  　<option value="admin" selected>管理員</option>
                  <?php break;
                  case 'restricted':?>
                    <option value="user">用戶</option>
                  　<option value="restricted" selected>停權</option>
                  　<option value="editor">編輯</option>
                  　<option value="admin">管理員</option>
                  <?php break;
                  case 'editor':
                    $editor_num += 1?>
                    <option value="user">用戶</option>
                  　<option value="restricted">停權</option>
                  　<option value="editor" selected>編輯</option>
                  　<option value="admin">管理員</option>
                  <?php break;
                  default:?>
                    <option value="user" selected>用戶</option>
                  　<option value="restricted">停權</option>
                  　<option value="editor">編輯</option>
                  　<option value="admin">管理員</option>
                  <?php break;
                }?>
                </select>
                <?php if ($user_role === 'restricted') {?>
                  <div class="restricted_right">
                <?php } else {?>
                  <div class="restricted_right hidden">
                <?php }?>
                  <!-- restrict add -->
                  <?php if (($row['add_right']) === 0) {?>
                    <input type="checkbox" name="restricted_add" id="restricted_add_<?php echo $row['id']?>" value="1" checked><label for="restricted_add_<?php echo $row['id']?>">禁言</label>
                  <?php } else {?>
                    <input type="checkbox" name="restricted_add" id="restricted_add_<?php echo $row['id']?>" value="1"><label for="restricted_add_<?php echo $row['id']?>">禁言</label>
                  <?php }?>

                  <!-- restrict edit -->
                  <?php if (($row['edit_right']) === 0) {?>
                    <input type="checkbox" name="restricted_edit" id="restricted_edit_<?php echo $row['id']?>" value="1" checked><label for="restricted_edit_<?php echo $row['id']?>">禁編輯</label>
                  <?php } else {?>
                    <input type="checkbox" name="restricted_edit" id="restricted_edit_<?php echo $row['id']?>" value="1"><label for="restricted_edit_<?php echo $row['id']?>">禁編輯</label>
                  <?php }?>

                  <!-- restrict delete -->
                  <?php if (($row['delete_right']) === 0) {?>
                    <input type="checkbox" name="restricted_delete" id="restricted_delete_<?php echo $row['id']?>" value="1" checked><label for="restricted_delete_<?php echo $row['id']?>">禁刪除</label>
                  <?php } else {?>
                    <input type="checkbox" name="restricted_delete" id="restricted_delete_<?php echo $row['id']?>" value="1"><label for="restricted_delete_<?php echo $row['id']?>">禁刪除</label>
                  <?php }?>
                </div>
              </div>

              <!-- admin edit right -->
              <?php if ($user_role === 'admin'|| $user_role === 'editor') {?>
              <div class="admin_edit_right">
              <?php } else {?>
              <div class="admin_edit_right invisible">
              <?php }?>
                <?php if (($row['admin_edit']) === 1) {?>
                <label><input type="radio" name="admin_edit" value="1" checked>可</label>
                <label><input type="radio" name="admin_edit" value="0">否</label>
                <?php } else {?>
                <label><input type="radio" name="admin_edit" value="1">可</label>
                <label><input type="radio" name="admin_edit" value="0" checked>否</label>
                <?php }?>
              </div>

              <!-- admin delete right -->
              <?php if ($user_role === 'admin'|| $user_role === 'editor') {?>
              <div class="admin_delete_right">
              <?php } else {?>
              <div class="admin_delete_right invisible">
              <?php }?>
                <?php if (($row['admin_delete']) === 1) {?>
                <label><input type="radio" name="admin_delete" value="1" checked>可</label>
                <label><input type="radio" name="admin_delete" value="0">否</label>
                <?php } else {?>
                <label><input type="radio" name="admin_delete" value="1">可</label>
                <label><input type="radio" name="admin_delete" value="0" checked>否</label>
                <?php }?>
              </div>
              <div>
                <button>Save</button>
              </div>
            </div>
          </form>
        <?php }?>
      </div>
    </section>
    <section class="list_info hide_in_phone">
      <h3 class="hide_in_phone">#Info</h3>
      <div class="hide_in_phone">
        <h4>使用者</h3>
        <h5><?php echo $user_num?></h5>
      </div>
      <div class="hide_in_phone">
        <h4>管理員</h3>
        <h5><?php echo $admin_num?></h5>
      </div>
      <div class="hide_in_phone">
        <h4>編輯</h3>
        <h5><?php echo $editor_num?></h5>
      </div>
    </section>
    <div class="btn_up">
      <img src="images/up_arrow.png">
    </div>
  </div>
</body>
<script type="text/javascript" src="demo.js"></script>
</html>