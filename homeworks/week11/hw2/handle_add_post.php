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
    empty($_POST['title'])||
    empty($_POST['content'])
  ) {
    header('Location: dashboard.php?errCode=1');
    die('資料不齊全');
  }

  $username = NULL;
  if (getUserData($_SESSION['blog_username'])) {
    $user_info = getUserData($_SESSION['blog_username']);
    $username = $user_info['username'];
  }

  $title = $_POST['title'];
  $content = $_POST['content'];
  $category = $_POST['category'];
  if ($username) {
    $sql = "insert into zoeaeen13_blog_article(username, title, category, content) values(?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $username, $title, $category, $content);
    $result = $stmt->execute();
    if (!$result) {
      die ($conn->error);
    }
  }

  header("Location: index.php");
?>