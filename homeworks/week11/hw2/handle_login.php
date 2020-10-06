<?php
session_start();
require_once('./conn.php');

if (
  empty($_POST['username'])||
  empty($_POST['password'])
) {
  header('Location: login.php?errCode=1');
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT `password` FROM zoeaeen13_blog_admin WHERE username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
if (!$result) {
  die ($conn->error);
}
$row = $result->fetch_assoc();
$verify_result = password_verify($password, $row['password']);
if ($verify_result) {
  $_SESSION['blog_username'] = $username;
  header('Location: index.php');
} else {
  header('Location: login.php?errCode=2');
}
?>