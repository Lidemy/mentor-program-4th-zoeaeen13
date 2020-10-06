<?php
session_start();
require_once('./conn.php');
require_once('./utills.php');

$id = NULL;
$post_info = NULL;
if (!empty($_GET['id'])) {
  $id = $_GET['id'];
  if (getPostInfo($id)) {
    $post_info = getPostInfo($id);
    $title = $post_info['title'];
    $content = $post_info['content'];
    $category = $post_info['category'];
  }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="user.css">
  <title>個人部落格</title>
  <script src="https://cdn.ckeditor.com/4.15.0/standard/ckeditor.js"></script>
</head>
<body class="debug">
  <?php if ($id) {?>
  <form action="handle_update_post.php" method="POST">
    <div class="post_buttons">
      <a href="handle_delete_post.php?id=<?php echo $id?>">Delete</a>
      <button class="btn_update_post">Update</button>
  <?php } else {?>
  <form action="handle_add_post.php" method="POST">
    <div class="post_buttons">
      <button class="btn_update_post">Publish</button>
  <?php }?>
    </div>
    <div class="edit_dashboard">
      <div class="container_cover" style="background: #626262; background-size: cover;">
        <label class="btn_choose_cover">Choose image<input class="input_cover" style="display:none" name="cover" type='file'/></label>
      </div>
      <?php if($id) {?>
      <input type="hidden" name="id" value="<?php echo $id?>">
      <?php }?>

      <!-- handle error code-->
      <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '資料不齊全';
        }
        echo '<h2>' . $msg . '<h2>';
      }
      ?>
      
      <?php if (empty($title)&& empty($content)) { ?>
        <input class="title" type="text" name="title" placeholder="Title" required>
        <div class="container_category">
          <?php switch ($category) {
            case 'mountain': ?>
              <input type="radio" name="category" value="mountain" id="mountain" checked><label for="mountain">山日記</label>
              <input type="radio" name="category" value="travel" id="travel"><label for="travel">旅行</label>
              <input type="radio" name="category" value="life" id="life"><label for="life">生活</label>
              <input type="radio" name="category" value="others" id="others"><label for="others">其他</label>

              <?php break;
            case 'travel': ?>
              <input type="radio" name="category" value="mountain" id="mountain"><label for="mountain">山日記</label>
              <input type="radio" name="category" value="travel" id="travel" checked><label for="travel">旅行</label>
              <input type="radio" name="category" value="life" id="life"><label for="life">生活</label>
              <input type="radio" name="category" value="others" id="others"><label for="others">其他</label>
              <?php break;
            case 'life': ?>
              <input type="radio" name="category" value="mountain" id="mountain"><label for="mountain">山日記</label>
              <input type="radio" name="category" value="travel" id="travel"><label for="travel">旅行</label>
              <input type="radio" name="category" value="life" id="life" checked><label for="life">生活</label>
              <input type="radio" name="category" value="others" id="others"><label for="others">其他</label>
              <?php break;
            default: ?>
              <input type="radio" name="category" value="mountain" id="mountain"><label for="mountain">山日記</label>
              <input type="radio" name="category" value="travel" id="travel"><label for="travel">旅行</label>
              <input type="radio" name="category" value="life" id="life"><label for="life">生活</label>
              <input type="radio" name="category" value="others" id="others" checked><label for="others">其他</label>
              <?php break;
          } ?>
        </div>
        <textarea name="content" id="content" rows="20" cols="80" placeholder="Tell your story..." required></textarea>
      <?php } else {?>
        <input class="title" type="text" name="title" placeholder="Title" value="<?php echo htmlspecialchars($title)?>" required>
        <div class="container_category">
          <?php switch ($category) {
            case 'mountain': ?>
              <input type="radio" name="category" value="mountain" id="mountain" checked><label for="mountain">山日記</label>
              <input type="radio" name="category" value="travel" id="travel"><label for="travel">旅行</label>
              <input type="radio" name="category" value="life" id="life"><label for="life">生活</label>
              <input type="radio" name="category" value="others" id="others"><label for="others">其他</label>

              <?php break;
            case 'travel': ?>
              <input type="radio" name="category" value="mountain" id="mountain"><label for="mountain">山日記</label>
              <input type="radio" name="category" value="travel" id="travel" checked><label for="travel">旅行</label>
              <input type="radio" name="category" value="life" id="life"><label for="life">生活</label>
              <input type="radio" name="category" value="others" id="others"><label for="others">其他</label>
              <?php break;
            case 'life': ?>
              <input type="radio" name="category" value="mountain" id="mountain"><label for="mountain">山日記</label>
              <input type="radio" name="category" value="travel" id="travel"><label for="travel">旅行</label>
              <input type="radio" name="category" value="life" id="life" checked><label for="life">生活</label>
              <input type="radio" name="category" value="others" id="others"><label for="others">其他</label>
              <?php break;
            default: ?>
              <input type="radio" name="category" value="mountain" id="mountain"><label for="mountain">山日記</label>
              <input type="radio" name="category" value="travel" id="travel"><label for="travel">旅行</label>
              <input type="radio" name="category" value="life" id="life"><label for="life">生活</label>
              <input type="radio" name="category" value="others" id="others" checked><label for="others">其他</label>
              <?php break;
          } ?>
        </div>
        <textarea name="content" id="content" rows="20" cols="80" placeholder="Tell your story..." required><?php echo htmlspecialchars($content)?></textarea>
      <?php }?>
      <script>
        CKEDITOR.replace('content', {
          height: 450,
        });
      </script>
    </div>
  </form>
</body>
<script type="text/javascript" src="demo.js"></script>
</html>