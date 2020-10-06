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
// hash password
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "insert into zoeaeen13_users(nickname, username, password) values(?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nickname, $username, $password);
$result = $stmt->execute();
if (!$result) {
  $code = $conn->errno;
  if ($code === 1062) {
    header("Location: register.php?errCode=2");
  }
  die ($conn->error);
}

echo "<script>alert('提醒：註冊成功，請前往登入'); location.href = 'login.php';</script>";
?>