<?php
  session_start();
  require_once('./conn.php');
  require_once('./utills.php');

  // check user
  $username = NULL;
  if (!empty($_SESSION['blog_username'])) {
    $user_info = getUserData($_SESSION['blog_username']);
    $username = $user_info['username'];
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
  <div><img class="section_banner_img" src="./images/logo.gif"></div>
</div>
<div class="post_content">
<section class="section_about">
    <h1>ABOUT ME</h1>
    <div class="img_about" style="background: url(./images/about.jpg); background-size: cover;"></div>
    <p>// 老余 //</br></br>
      大學主修登山系，嘗試攀岩、探勘和長程縱走，同時也是一位瑜珈人，持續練習 Ashtanga，</br>
      從2019年末開始自學程式語言，在這裡記錄所學習過的事，分享我的瑜珈、程式、登山和旅行，</br>
      而我的理想，是找一座喜歡的城住下，有一個自己喜歡的人，按照自己想要的方式去生活。</br>
      </br>
      如果你想了解我更多，歡迎直接聯繫。</br>
    </p>
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