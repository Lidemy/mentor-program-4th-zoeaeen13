<?php
require_once('./conn.php');

function getUserData($username) {
  global $conn;

  $user_sql = sprintf(
    "SELECT * FROM zoeaeen13_users WHERE username='%s'", 
    $username
  );
  $user_result = $conn->query($user_sql);
  $user_info = $user_result->fetch_assoc();
  return $user_info;
}
?>