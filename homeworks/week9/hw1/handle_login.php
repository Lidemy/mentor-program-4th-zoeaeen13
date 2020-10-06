<?php
session_start();
require_once('./conn.php');
require_once('./utills.php');

if (
  empty($_POST['username'])||
  empty($_POST['password'])
) {
  header('Location: login.php?errCode=1');
}

$username = $_POST['username'];
$password = $_POST['password'];
$sql = sprintf(
  "SELECT * FROM zoeaeen13_users WHERE username='%s' AND `password`='%s'", 
  $username,
  $password
);

$result = $conn->query($sql);
if (!$result) {
  die ($conn->error);
}

if ($result->num_rows) {
  $_SESSION['username'] = $username;
  header('Location: index.php');
} else {
  header('Location: login.php?errCode=2');
}
?>