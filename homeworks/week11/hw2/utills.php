<?php
require_once('./conn.php');

function getUserData($username) {
  global $conn;

  $sql = "SELECT * FROM zoeaeen13_blog_admin WHERE username=?";
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

function getPostInfo($id) {
  global $conn;

  $sql = 'SELECT * FROM zoeaeen13_blog_article WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    die ($conn->errno);
  }
  $post_info = $result->fetch_assoc();
  return  $post_info;
}

function setCategory($category) {
  switch ($category) {
    case 'mountain':
      return '山日記';
      break;
    case 'travel':
      return '旅行';
      break;
    case 'life':
      return '生活';
      break;
    default:
      return NULL;
      break;
  }
}
?>