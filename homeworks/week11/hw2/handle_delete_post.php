<?php
session_start();
require_once('./utills.php');
require_once('./conn.php');

// check user
if (empty($_SESSION['blog_username'])) {
  header('Location: login.php');
  die('請先登入');
}

// check data
if (empty($_GET['id'])) {
  header('Location: dashboard.php?err');
  die('資料不齊全');
}

$id = $_GET['id'];
$isDeleted = 1;
$username = NULL;
if (getUserData($_SESSION['blog_username'])) {
  $user_info = getUserData($_SESSION['blog_username']);
  $username = $user_info['username'];
}

if ($username) {
  $sql = "UPDATE zoeaeen13_blog_article SET is_deleted=? WHERE id=? AND username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("iss", $isDeleted, $id, $username);
  $result = $stmt->execute();
  if (!$result) {
    die ($conn->error);
  }
}

header("Location: dashboard.php");
?>