<?php
  session_start();
  require_once('./conn.php');
  require_once('./utills.php');
  // page
  $page = 1;
  $limit = 5;
  if (!empty($_GET['page'])) {
    $page = (int)$_GET['page'];
  }
  $offset = ($page -1) * $limit;

  // category
  $category = NULL;
  if (!empty($_GET['category'])) {
    $category = $_GET['category'];
  }

  // user
  $username = NULL;
  $nickname = NULL;
  if (!empty($_SESSION['blog_username'])) {
    if (getUserData($_SESSION['blog_username'])) {
      $user_info = getUserData($_SESSION['blog_username']);
      $username = $user_info['username'];
      $nickname = $user_info['nickname'];
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="style.css">
  <title>個人部落格</title>
</head>
<body class="debug">
<nav class="navbar">
  <div class="section_sub_pages">
    <a href="index.php">首頁</a>
    <a href="index.php?category=mountain">山日記</a>
    <a href="index.php?category=travel">旅行</a>
    <a href="index.php?category=life">生活</a>
    <a href="dashboard.php">所有文章</a>
    <a href="about.php">關於我</a>
  </div>
  <div class="section_social_media">
    <a href="https://www.facebook.com/menghua.yu1026/"></a>
    <a href="https://www.instagram.com/menghuayu/"></a>
    <a href="https://github.com/zoeaeen13"></a>
  </div>
</nav>
<div class="section_banner hide_in_phone">
  <div><img class="section_banner_img"src="./images/logo.gif"></div>
</div>
<div class="content">
  <section class="section_posts">
    <?php
    // set sql
    if ($category) {
      $sql = 'SELECT B.id AS id, B.content AS content, B.title AS title, B.category AS category, ' . 
      'B.cover AS cover, B.created_at AS created_at, U.username AS username, U.nickname AS nickname ' .
      'FROM zoeaeen13_blog_article AS B ' . 
      'LEFT JOIN zoeaeen13_blog_admin AS U ' . 
      'ON B.username = U.username ' . 
      'WHERE B.is_deleted IS NULL AND B.category = ? ' . 
      'ORDER BY B.id DESC ' .
      'limit ? offset ?';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("sii", $category, $limit, $offset);
    } else {
      $sql = 'SELECT B.id AS id, B.content AS content, B.title AS title, B.category AS category, ' . 
      'B.cover AS cover, B.created_at AS created_at, U.username AS username, U.nickname AS nickname ' .
      'FROM zoeaeen13_blog_article AS B ' . 
      'LEFT JOIN zoeaeen13_blog_admin AS U ' . 
      'ON B.username = U.username ' . 
      'WHERE B.is_deleted IS NULL ' . 
      'ORDER BY B.id DESC ' .
      'limit ? offset ?';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("ii", $limit, $offset);
    }

    $result = $stmt->execute();
    // get result
    if (!$result) {
      die ($conn->errno);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if (empty($row)) {
      echo '<h4>' . 'Sorry the page you are looking for doesnt exists!' . '</h4>';
    } else {
      while ($row = $result->fetch_assoc()) { ?>
      <article class="article">
        <a href="article.php?id=<?php echo $row['id']?>"></a>
        <div class="article_banner" style="background: url(./images/cover.jpg); background-size: cover;">
          <?php if (setCategory($row['category'])) {?>
            <a class="article_type type_position" href="index.php?category=<?php echo $row['category']?>"><?php echo setCategory($row['category'])?></a>
          <?php }?>
        </div>
        <h3 class="article_title"><?php echo htmlspecialchars($row['title'])?></h3>
        <h5><?php echo substr($row["created_at"], 0, 10) ?></h5>
        <h6><?php echo strip_tags($row['content'])?></h6>
      </article>
      <?php }?>
      <div class="article_blank"></div>
      <section class="pagination">
      <?php
      // set page sql
      if ($category) {
        $page_sql = 'SELECT count(id) as num FROM zoeaeen13_blog_article AS B ' . 
        'WHERE B.is_deleted IS NULL AND B.category = ?';
        $page_stmt = $conn->prepare($page_sql);  
        $page_stmt->bind_param("s", $category);
      } else {
        $page_sql = 'SELECT count(id) as num FROM zoeaeen13_blog_article AS B WHERE B.is_deleted IS NULL';
        $page_stmt = $conn->prepare($page_sql);
      }

      // get result
      $page_result = $page_stmt->execute();
      if (!$page_result) {
        die ($conn->errno);
      }
      $page_result = $page_stmt->get_result();
      $page_row = $page_result->fetch_assoc();
      $num = (int)$page_row["num"];
      $total_pages = ceil($num/$limit);
      $i = 1;

      if ($category) {
        // 上一頁
        if ($page <= 1) { ?>
          <a class="pagination_link hide_in_phone" href="index.php?category=<?php echo htmlspecialchars($category) ?>"><img src="images/left-arrow.png">Prev</a>
        <?php } else {?>
          <a class="pagination_link hide_in_phone" href="index.php?category=<?php echo htmlspecialchars($category) ?>&page=<?php echo $page-1?>"><img src="images/left-arrow.png">Prev</a>
        <?php }

        // 頁碼
        while ($i <= $total_pages) {
          if ($i === $page) { ?>
          <a class="page_item page_select" href="index.php?category=<?php echo htmlspecialchars($category) ?>&page=<?php echo $i?>"><?php echo $i?></a>
        <?php } else { ?>
          <a class="page_item" href="index.php?category=<?php echo htmlspecialchars($category) ?>&page=<?php echo $i?>"><?php echo $i?></a>
        <?php }
          $i += 1;
        }

        // 下一頁
        if ($page < $total_pages) { ?>
          <a class="pagination_link hide_in_phone" href="index.php?category=<?php echo htmlspecialchars($category) ?>&page=<?php echo $page+1?>"><img src="images/right-arrow.png">Next</a>
        <?php } else { ?>
          <a class="pagination_link hide_in_phone" href="index.php?category=<?php echo htmlspecialchars($category) ?>&page=<?php echo $total_pages?>"><img src="images/right-arrow.png">Next</a>
        <?php }
      } else {
        // 上一頁
        if ($page <= 1) { ?>
        <a class="pagination_link hide_in_phone" href="index.php"><img src="images/left-arrow.png">Prev</a>
        <?php } else {?>
        <a class="pagination_link hide_in_phone" href="index.php?page=<?php echo $page-1?>"><img src="images/left-arrow.png">Prev</a>
        <?php }?>

        <!-- 頁碼 -->
        <?php while ($i <= $total_pages) {
          if ($i === $page) { ?>
          <a class="page_item page_select" href="index.php?page=<?php echo $i?>"><?php echo $i?></a>
        <?php } else { ?>
          <a class="page_item" href="index.php?page=<?php echo $i?>"><?php echo $i?></a>
        <?php }
          $i += 1;
        } ?>

        <!-- 下一頁 -->
        <?php if ($page < $total_pages) {?>
          <a class="pagination_link hide_in_phone" href="index.php?page=<?php echo $page+1?>"><img src="images/right-arrow.png">Next</a>
        <?php } else {?>
          <a class="pagination_link hide_in_phone" href="index.php?page=<?php echo $total_pages?>"><img src="images/right-arrow.png">Next</a>
        <?php }
      } 
    }?>

  </section>
  </section>
  <section class="section_intro hide_in_phone">
    <h3>關於我</h3>
    <h4>// 老余 //</h4>
    <p>喜歡山和瑜珈的工程師，希望用不一樣的方式感受世界，期望能在生活、工作跟寫作取得平衡，並且永遠保持熱情。</p>
    <img src="./images/aboutme.jpg">
    <div class="user_buttons">
      <!-- if login -->
      <?php if ($username) {?>
      <a href="handle_logout.php">登出</a>
      <a href="update_post.php">發文</a>
      <?php } else { ?>
        <a href="login.php">登入</a>
      <?php } ?>
    </div>
  </section>
</div>
<footer class="footer">
  <div class="footer_top">
    <div class="footer_no_reproduction">
      <h4>圖文轉載注意</h4>
      <p>請勿部分刪除節錄此部落格的內容，怕資訊不足會有遺漏或失誤，如有轉載內容分享請標註 全網址 註明出處，若有使用部落格上的自製圖文，請聯繫作者取的同意後方始能轉載。</p>
    </div>
    <div class="footer_search">
      <h4>搜尋此網站</h4>
      <form action="">
        <input class="input" type="text">
        <input class= "btn_submit" type="submit">
      </form>
    </div>
    <div class="footer_subscribe">
      <h4>透過 Email 訂閱</h4>
      <form action="">
        <input class="input" type="email">
        <input class= "btn_submit" type="submit">
      </form>
    </div>
  </div>

  <div class="footer_distribution">DESIGNED BY <a href="http://www.oddthemes.com/">ODDTHEMES</a> | DISTRIBUTED BY <a href="https://www.mybloggerthemes.com/">BLOGGER TEMPLATES</a></div>
</footer>
</body>
<script type="text/javascript" src="demo.js"></script>
</html>