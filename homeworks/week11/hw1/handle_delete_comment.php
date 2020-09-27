<?php
session_start();
require_once('./utills.php');
require_once('./conn.php');

// check data
if (empty($_GET['id'])) {
  header('Location: index.php?errCode=1');
  die('資料不齊全');
}

// check login status
$username = NULL;
$role = NULL;
$admin_delete;

if (empty($_SESSION['username'])) {
  header('Location: index.php?errCode=2');
  die('請先登入');
}

$user_info = getUserData($_SESSION['username']);
if ($user_info) {
  $username = $user_info['username'];
  $role = $user_info['role'];
  $admin_delete = $user_info['admin_delete'];
}


$id = $_GET['id'];
$isDeleted = 1;
if ($role === 'admin'|| $role === 'editor') {
  if ($admin_delete === 1) {
    $sql = "UPDATE zoeaeen13_comments SET is_deleted=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $isDeleted, $id);  
  }
} else {
  $sql = "UPDATE zoeaeen13_comments SET is_deleted=? WHERE id=? AND username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("iss", $isDeleted, $id, $username);
}
$result = $stmt->execute();
if (!$result) {
  die ($conn->error);
}
header("Location: index.php");
?>