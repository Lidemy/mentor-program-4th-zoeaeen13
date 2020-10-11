<?php
require_once('./conn.php');

function getTokenData($token) {
  global $conn;

  $sql = "SELECT * FROM zoeaeen13_todolist WHERE token=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $token);
  $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    die ($conn->error);
  }
  $data = $result->fetch_assoc();
  return $data;
}
?>