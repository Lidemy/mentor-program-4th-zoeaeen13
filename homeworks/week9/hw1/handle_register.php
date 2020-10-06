<?php
require_once('./conn.php');

if (
  empty($_POST['username'])||
  empty($_POST['nickname'])||
  empty($_POST['password'])
) {
  header('Location: register.php?errCode=1');
}

$nickname = $_POST['nickname'];
$username = $_POST['username'];
$password = $_POST['password'];

$sql = sprintf(
  "insert into zoeaeen13_users(nickname, username, password) values('%s', '%s', '%s')", 
  $nickname,
  $username,
  $password
);

$result = $conn->query($sql);
if (!$result) {
  $code = $conn->errno;
  if ($code === 1062) {
    header("Location: register.php?errCode=2");
  }
  die ($conn->error);
}

echo "<script>alert('提醒：註冊成功，請前往登入'); location.href = 'login.php';</script>";
?>