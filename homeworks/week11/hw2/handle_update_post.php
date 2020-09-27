<?php
session_start();
require_once('./utills.php');
require_once('./conn.php');

// check user
if (empty($_SESSION['blog_username'])) {
  header('Location: dashboard.php?errCode=2');
  die('請先登入');
}

// check data
if (
  empty($_POST['id'])||
  empty($_POST['title'])||
  empty($_POST['content'])
) {
  header('Location: update_post.php?errCode=1');
  die('資料不齊全');
}

$username = NULL;
if (getUserData($_SESSION['blog_username'])) {
  $user_info = getUserData($_SESSION['blog_username']);
  $username = $user_info['username'];
}

$id = $_POST['id'];
$title = $_POST['title'];
$category = $_POST['category'];
$content = $_POST['content'];

if ($username) {
  $sql = "UPDATE zoeaeen13_blog_article SET `title`=?, content=?, category=? WHERE username=? AND `id`=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sssss", $title, $content, $category, $username, $id);
  $result = $stmt->execute();
  if (!$result) {
    die ($conn->error);
  }
}

header("Location: index.php");
?>