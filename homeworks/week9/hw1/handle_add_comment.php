<?php
require_once('./conn.php');

if (
  empty($_GET['username']) ||
  empty($_GET['content'])
) {
  header('Location: index.php?errCode=1');
  die('資料不齊全');
}

$username = $_GET['username'];
$content = $_GET['content'];

$sql = sprintf(
  "insert into zoeaeen13_comments(username, content) values('%s', '%s')", 
  $username,
  $content
);

$result = $conn->query($sql);
if (!$result) {
  die ($conn->error);
}

header("Location: index.php");
?>