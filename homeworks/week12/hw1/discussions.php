<?php
require_once('conn.php');
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin: *');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
  case 'GET':
    handleGETRequest();
    break;
  case 'POST':
    handlePOSTRequest();
    break;
}


function handleGETRequest() {
  global $conn;

  // handle error
  if (empty($_GET['site_key'])) {
    $json = array(
      "ok" => false,
      "message" => 'Please add site key in url'
    );

    $response = json_encode($json);
    echo $response;
    die();
  }


  $before_id = NULL;
  if (!empty($_GET['before'])) {
    $before_id = $_GET['before'];
  }

  if ($before_id) {
    $site_key = $_GET['site_key'];
    $sql = 'SELECT id, nickname, content, created_at FROM zoeaeen13_discussions AS D WHERE site_key=? ' . 
    'AND id < ? ' . 
    'ORDER BY D.id DESC limit 5';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $site_key, $before_id);
  } else {
    $site_key = $_GET['site_key'];
    $sql = 'SELECT id, nickname, content, created_at FROM zoeaeen13_discussions AS D WHERE site_key=? ' . 
    'ORDER BY D.id DESC limit 5';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $site_key);
  }

  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // successful
  $result = $stmt->get_result();
  $discussions = array();
  while ($row = $result->fetch_assoc()) {
    array_push(
      $discussions, array(
        "id" => $row['id'],
        "nickname" => $row['nickname'],
        "content" => $row['content'],
        "created_at" => $row['created_at']
      )
    );
  }

  $json = array(
    "ok" => true,
    "message" => 'success!',
    "discussions" => $discussions
  );

  $response = json_encode($json);
  echo $response;
}

function handlePOSTRequest() {
  global $conn;

  // handle error
  if (empty($_POST['content'])||
      empty($_POST['nickname'])||
      empty($_POST['site_key'])
  ) {
    $json = array(
      "ok" => false,
      "message" => 'Please input missing data'
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_POST['site_key'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];
  $sql = "INSERT INTO zoeaeen13_discussions(site_key, nickname, content) VALUES(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $site_key, $nickname,$content);
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // successful
  $json = array(
    "ok" => true,
    "message" => "success"
  );

  $response = json_encode($json);
  echo $response;
  }
?>