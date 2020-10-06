<?php
session_start();
require_once('./utills.php');
require_once('./conn.php');

//check data
if (empty($_POST['nickname'])||
    empty($_POST['id'])
) {
  header('Location: index.php?errCode=1');
  die('資料不齊全');
}

//check login status
if (empty($_SESSION['username'])) {
  header('Location: index.php?errCode=2');
  die('請先登入');
}
$username = NULL;
$user_info = getUserData($_SESSION['username']);
if ($user_info) {
  $username = $user_info['username'];
}

$nickname = $_POST['nickname'];
$user_id = $_POST['id'];
$sql = "UPDATE zoeaeen13_users SET nickname=? WHERE id=? AND username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nickname, $user_id, $username);
$result = $stmt->execute();
if (!$result) {
  die ($conn->error);
}
header("Location: index.php");
?>