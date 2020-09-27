<?php
session_start();
require_once('./utills.php');
require_once('./conn.php');

if (empty($_POST['id'])|| 
    empty($_POST['content'])
) {
  header('Location: update_comment.php?errCode=1');
  die('資料不齊全');
}

//check login status
if (empty($_SESSION['username'])) {
  header('Location: index.php?errCode=2');
  die('請先登入');
}

$username = NULL;
$role = NULL;
$admin_edit;

$user_info = getUserData($_SESSION['username']);
if ($user_info) {
  $username = $user_info['username'];
  $role = $user_info['role'];
  $admin_edit = $user_info['admin_edit'];
}


$id = $_POST['id'];
$content = $_POST['content'];
if ($role === 'admin'|| $role === 'editor') {
  if ($admin_edit === 1) {
    $sql = "UPDATE zoeaeen13_comments SET content=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $content, $id);  
  }
} else {
  $sql = "UPDATE zoeaeen13_comments SET content=? WHERE username=? AND id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $content, $username, $id);
}
$result = $stmt->execute();
if (!$result) {
  die ($conn->error);
}
header("Location: index.php");
?>