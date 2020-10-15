<?php
require_once('conn.php');
require_once('./utills.php');
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
  if (empty($_GET['token'])) {
    $json = array(
      "ok" => false,
      "message" => 'Please put token in url'
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $token = $_GET['token'];
  $sql = 'SELECT content, `type` FROM zoeaeen13_todolist WHERE token=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $token);

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
  $todolist = array();
  while ($row = $result->fetch_assoc()) {
    array_push(
      $todolist, array(
        "content" => $row['content'],
        "type" => $row['type']
      )
    );
  }

  $json = array(
    "ok" => true,
    "message" => 'success!',
    "todolist" => $todolist
  );

  $response = json_encode($json);
  echo $response;
}

function handlePOSTRequest() {
  global $conn;

  // handle error
  if (empty($_POST['token'])||
      empty($_POST['content'])||
      empty($_POST['type'])
  ) {
    $json = array(
      "ok" => false,
      "message" => 'Please input missing data'
    );

    $response = json_encode($json);
    echo $response;
    die();
  }



  $token = $_POST['token'];
  $content = $_POST['content'];
  $type = $_POST['type'];

  if (getTokenData($token)) {
    $sql = "UPDATE zoeaeen13_todolist SET content=?, `type`=? WHERE token=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $content, $type, $token);
  } else {
    $sql = "INSERT INTO zoeaeen13_todolist(token, content, `type`) VALUES(?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $token, $content, $type);  
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
  $json = array(
    "ok" => true,
    "message" => "success"
  );

  $response = json_encode($json);
  echo $response;
}
?>