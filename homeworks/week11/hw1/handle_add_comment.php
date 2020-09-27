<?php
session_start();
require_once('./utills.php');
require_once('./conn.php');

// check data
if (
  empty($_GET['nickname'])||
  empty($_GET['content'])
) {
  header('Location: index.php?errCode=1');
  die('資料不齊全');
}

// check login status
if (empty($_SESSION['username'])) {
  header('Location: index.php?errCode=2');
  die('請先登入');
}

$username = NULL;
$role = NULL;
$user_info = getUserData($_SESSION['username']);
if ($user_info) {
  $username = $user_info['username'];
  $role = $user_info['role'];
}

// if restricted
if ($role === 'restricted') {
  if ($user_info['add_right'] === 0) {
    header('Location: index.php?errCode=4');
    die('帳戶被停權發言');  
  }
}

$content = $_GET['content'];
$sql = "insert into zoeaeen13_comments(username, content) values(?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $content);
$result = $stmt->execute();
if (!$result) {
  die ($conn->error);
}

header("Location: index.php");
?>