<?php
session_start();
require_once('./conn.php');
require_once('./utills.php');

if (empty($_POST['id'])|| 
    empty($_POST['role'])
) {
  header('Location: user_dashboard.php?errCode=1');
  die ('資料不齊全');
}

// check user status
$username = NULL;
if (empty($_SESSION['username'])) {
  header('Location: index.php?errCode=1');
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

// default
$add_right = 1;
$edit_right = 1;
$delete_right = 1;
$admin_edit = 0;
$admin_delete = 0;

$id = $_POST['id'];
$role = $_POST['role'];
switch ($role) {
  case 'admin':
    $admin_edit = (int)$_POST['admin_edit'];
    $admin_delete = (int)$_POST['admin_delete'];
    break;
  case 'restricted':
    if (!empty($_POST['restricted_add'])) {
      $add_right = 0;
    }
    if (!empty($_POST['restricted_edit'])) {
      $edit_right = 0;
    }
    if (!empty($_POST['restricted_delete'])) {
      $delete_right = 0;
    }
    break;
  case 'editor':
    $admin_edit = (int)$_POST['admin_edit'];
    $admin_delete = (int)$_POST['admin_delete'];
    break;
  default:
    break;
}

$sql = "UPDATE zoeaeen13_users SET `role`=?, add_right=?, edit_right=?, delete_right=?, admin_edit=?, admin_delete=? WHERE `id`=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("siiiiis", $role, $add_right, $edit_right, $delete_right, $admin_edit, $admin_delete, $id);
$result = $stmt->execute();
if (!$result) {
  die ($conn->error);
}

header("Location: user_dashboard.php");
?>