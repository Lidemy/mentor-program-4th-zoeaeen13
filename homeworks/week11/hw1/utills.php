<?php
require_once('./conn.php');

function getUserData($username) {
  global $conn;

  $sql = "SELECT * FROM zoeaeen13_users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    die ($conn->error);
  }
  $user_info = $result->fetch_assoc();
  return $user_info;
}
?>