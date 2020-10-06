## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
### 加密（Encryption）
將明文資訊改變為難以讀取的密文內容，讓人不可讀取。只有擁有解密方法的人，經由解密過程才能將它還原為正常內容，可以將重要資料保護起來，不讓其他人看到。
- 加密內容是可逆的
- 有鑰匙（Key）就可以解密讀取
#### AES
常見的對稱加密演算法，所謂的「對稱」就是說加密解密都是用同一個 key，AES 有超過 10³⁸ 種 key 值，安全性高、不易破解，加密速度快。缺點是**雙方必須先說好密碼是什麼**，因為只要一透過網路傳送，這些資訊就有可能被中間人拿走。

#### RSA
常見的非對稱加密法（Asymmetric Encryption），產生一組兩個 Key，分別叫公鑰跟私鑰，用公鑰加密的內容只能用私鑰解。


然而，並不是所有的資料都需要經由加解密來處理，有些資料其實不應該被還原，就像密碼，只需要經由一道程序驗證它是正確的即可，意思是，我們目的只是確認資料的特徵，而不是拿到全部資料，僅需判斷兩者內容相同即可。
- 提供檔案的摘要（Digest），不需全部的檔案，確認在傳送過程中沒有被任何人改過
- 相同的摘要計算程序，就可以拿到相同的摘要值

### 雜湊（Hashing）
而雜湊，就是一個由資料本身計算出摘要的技術，它輸出的資料只能證明在計算當下，針對輸入資料本身所得到的特徵。
一般使用上，我們會**將密碼變成雜湊存在資料庫**，之後使用者輸入相同內容時，只要用同一計算方式重新跑一遍，驗證兩者，若得到同樣結果則表示資料沒有被改動過，而資料本身（也就是真實的密碼）不會被洩漏，就算整包資料庫被偷走，也因為只知道部分特徵，其他人無法還原回去資料本體。
- 無論原文的內容長短，透過雜湊演算法運算完的輸出會是固定長度
- 即便只差一個字，雜湊演算法產生的兩個輸出內容卻會差非常多
- 檔案內容不同就會計算出不同的 hash value
- 不同內容的輸入，得到相同的 hash value 機率極低
- 不需密鑰，也無法逆向解出原本輸入
- 要使用較高強度的 SHA-2 系列與 SHA-3 系列的雜湊演算法

> 雖然無法得到資料本體，但就驗證資料正確性而言，仍然有很多研究在於如何讓雜湊演算法在不同資料上產生相同的摘要，這個現象稱為碰撞（Collision），目前 MD4, MD5, SHA1 這些已經被研究出碰撞的方法，原則上不能再使用

雜湊（Hash）是將目標文字轉換成具有相同長度的、不可逆的雜湊字串（或叫做訊息摘要），而加密（Encrypt）是將目標文字轉換成具有不同長度的、可逆的密文，很容易被人搞混的原因，主要是因為雜湊和加密通常是一起搭配使用，他們都是為了保護資料而設計。

## include、require、include_once、require_once 的差別

### include 和 include_once
可以告訴 PHP 提取特定的檔案，並載入它的全部內容
* 用來引入檔案
* 後者可避免重複引入
* 找不到檔案會出現 Warning 警告，仍會繼續執行

### require 和 require_once
同樣是用來引入檔案，後者也會判斷之前是否已經引入過，避免覆寫。但沒有找到檔案，會出現 `Fatal error` 致命錯誤，**程式會停止執行**


結論：應該使用 require_once 語句

## 請說明 SQL Injection 的攻擊原理以及防範方法
又稱 SQL 隱碼或 SQL 注碼，發生於應用程式與資料庫層的安全漏洞。簡單來說，利用在輸入的字串之中夾帶 SQL 指令，因程式設計者**忽略了字元檢查**，這些夾帶進去的惡意指令就會被資料庫伺服器誤認為是正常的 SQL 指令而執行，因此資料庫遭到破壞，讓攻擊者有了擅自竊取、修改、挪動或刪除資料的可能

* 未過濾惡意程式碼的情況
* 透過更改語法邏輯或加入特殊指令的方式

### 常見攻擊手法
1. 略過權限檢查（Authorization Bypass）
```sql=
SELECT * FROM users WHERE name = 'name' AND password = 'password'
```
以註冊登入為例，當有兩個輸入框要求使用者登入帳號密碼，在取得輸入框的值，給後端去驗證，攻擊者可以輸入`'OR 1=1 --` 來繞開這關程序 =>`'` 讓輸入框內容關閉、`OR 1=1` 讓條件恆正、`--` 註解掉後面的程式碼，如此一來就登入資料庫了
```sql=
"SELECT * FROM customers WHERE name =''OR 1=1 --AND password = ' -password-' 
```

2. 注入惡意的 SQL 的語法

攻擊者可以在注入惡意的 SQL 的語法去改變資料庫，或進一步探查其他 table 中的資料，造成個人機密資料、伺服器被攻擊，系統管理員帳戶被竄改等等

SQL Injection，就是駭客透過修改 SQL 語句，改變他的語意，達成竊取資料/破壞資料的行為

### 如何避免

1. 過瀘字串「'」或「"」
2. 限制輸入字元格式並檢查輸入長度、資料格式
3. 資料庫設定使用者帳號權限，限制非特定使用者無法作資料庫存取
4. mysql_real_eascape_string() 處理（老方法不建議）
5. PDO 防止注入，預處理

#### 筆記：Prepared Statements 預處理語句
Prepared Statements 方式，是運用**預處理**的概念來解決這個問題。
以往的傳統寫法是在程式裡拼接，再發送到 Mysql 中，後者沒辦法對傳入的東西判斷是否正常，但是當我們先發送一份模板到 Mysql Server 做預處理，再傳參數過去，之後不管怎麼注入什麼，Mysql Server 都知道是變量。

透過編譯 SQL 模板來執行 SQL 指令，能提高 SQL 語句的效能，並且有效阻止 SQL 隱碼攻擊
1. 先將 sql 語句模板發送給 Mysql Server
2. 再將要塞入的變數發送給 Mysql server
3. 轉譯是在 Mysql Server 做的，而不是本地

預處理分成兩種方法：mysqli 和 PDO
* 方法一：`mysqli:prepare()`
先寫出 $sql 語句，用 `?` 占位符代替變量，之後按照順序加入變數的值執行
```php=
$stmt = $conn->prepare('SELECT * FROM employees WHERE name = ? AND id = ?');
$stmt->bind_param('si', $name, $id);
$stmt->execute();

$result = $stmt->get_result();
```
* 方法二：PDO
使用原理和上面差不多，通過指定參數（像 `:name` 這樣的命名參數）告訴 Mysql Server 你想過濾它，接著調用 execute() 函數時，prepared statements 會和你剛才指定的參數值結合

> 設置 PDO 處理器： **ATTR_EMULATE_PREPARES**
> 
> - ATTR_EMULATE_PREPARES = true（默認情況）
> 對指定的字元集以輸入參數進行本地轉義，然後拼接成完整的 SQL 語句，發送給MySQL Server，類似於我們原本的程式拼接再執行的模式，但老版本並不支援在 DSN 中定義 charset 屬性，仍可能導致 SQL 注入
>
> - ATTR_EMULATE_PREPARES = false
> sql 會分兩次把參數給送給 Mysql，Mysql 根據自身字元集（set names）進行處理
    
```php=
$pdo = new PDO('mysql:dbname=dbtest;host=127.0.0.1;charset=utf8', 'user', 'pass');
$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);   //必須設
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $pdo->prepare('SELECT * FROM employees WHERE name = :name');
$stmt->execute(array(':name' => $name));
 
foreach ($stmt as $row) {
    // do something with $row
}
```
## 請說明 XSS 的攻擊原理以及防範方法
XSS，又稱跨網域攻擊（Cross-Site Scripting），我們都知道可以寫在網頁裡，讓瀏覽器執行的一種程式碼稱為 JavaScript，只要使用 `<script>` 標籤，就可以在裡面撰寫一些 JavaScript 程式碼，讓網頁具有動態、互動的效果，但是

* Stored XSS (儲存型)
有使用者可以輸入任意內容的地方，如果沒有確實檢查，一旦鑽漏洞輸入如 `<script>` 等關鍵字就會被當成正常的 HTML 執行，標籤內容也會被視為正常內容而**保存在資料庫**，這種類型就是 Stored XSS

* Reflected XSS (反射型)
由網頁後端直接嵌入由前端使用者所傳送過來的內容造成的，最常見的就是以 **GET 方法**傳送資料給伺服器時，後端沒有過濾掉惡意字元，就直接將內容回應到網頁上

> 需透過特定網址點入，通常會以釣魚手法誘騙受害者點入連結，但因為程式碼就在網址上，細心一點就不容易受騙

* DOM-Based XSS (基於 DOM 的類型)
DOM 是描述 HTML 文件的表示法，也就是我們常看到的、可以使用 JS 動態產生網頁，而不必透過伺服器

### 如何防範
#### 1. 儲存型和反射型
* PHP htmlspecialchars 函數：轉換HTML 特殊符號為僅能顯示用的編碼

前兩種 Stored、Reflected 由後端進行防範，使用者輸入的內容都需要經過檢查，比如刪除 `<script>`、`onerror=` 及其他任何可能執行程式碼的字串，或改為純文字顯示，替換字元即可


| 原始字元 | HTML 跳脫字元| 
| -------- | -------- |
| < | `&lt;` |
| > | `&gt;` |
| " | `&quot;` |
| ' | `&#x27;` |
| / | `&#x2F;` |
| & | `&amp;` |

#### 2. DOM-Based 防範
由前端來防範，選擇正確的方法和屬性來動態操作 DOM，比如將底下 innerHTML 改為 innerText，因為如果 name 插入 HTML 字串，將會被解析成 DOM 物件
```javascript=
document.getElementById('show_name').innerHTML = name;
```
## 請說明 CSRF 的攻擊原理以及防範方法
CSRF，跨站請求偽造（Cross Site Request Forgery），通過一些技術手段欺騙用戶的瀏覽器，去存取一個自己**曾經認證過的網站**並執行一些操作，如發送郵件、發訊息、甚至財產操作如轉帳和購買商品。
由於瀏覽器曾經認證過，所以被存取的網站會認為是真正的用戶操作而執行，只能說保證請求發自某個用戶的瀏覽器，卻**不能保證請求本身是用戶自願發出**。

### 案例
```
一家銀行用以執行轉帳操作的URL位址：
https://bank.example.com/withdraw?account=AccoutName&amount=1000&for=PayeeName

惡意攻擊者可以在另一個網站上放置如下：
<img src="https://bank.example.com/withdraw?account=Alice&amount=100&for=Badman"/>

如用戶名 Alice 存取了惡意站點，而她之前剛認證過不久，登入資訊尚未過期，那麼她就會被扣款。
```
這種惡意網址形式多樣，藏在網頁的許多地方，也不一定要是攻擊者實際控制的網站，可以放在論壇、部落格等任何用戶生成內容的網站中，即使用戶是存取熟悉的可信網站，也有可能有受攻擊的危險。

CSRF 無法獲取用戶的帳戶控制權，也不能直接竊取用戶的任何資訊，但他們能做到的，是欺騙用戶的瀏覽器、讓其以用戶的名義執行操作。

### Server 的防禦
> 在不同的 domain 底下卻能夠偽造出「使用者本人發出的 request」

CSRF 的核心概念是「Cross Site Request」，因此可以思考 => 如何擋掉從別的 domain 來的請求

1. **檢查 Referer 欄位**

request 的 header 裡面會帶一個欄位叫做 referer，代表這個 request 是從哪個地方過來的（請求來源的位址），可以檢查這個欄位看是不是合法的 domain，不是的話直接檔下即可，但這個方法不夠完善的原因是
* 有些瀏覽器可能不會帶 referer
* 有些使用者可能會關閉自動帶 referer
* 判定是不是合法 domain 的程式碼可能不夠完善
* Referer 欄位被竄改的可能

2. **加上圖形驗證碼、簡訊驗證碼**

比如網路銀行轉帳時，需要收簡訊驗證碼進行驗證，確保不會被 CSRF 攻擊，但因為很麻煩，往往用在需安全性高的操作上

3. **校驗 token**

防止 CSRF 攻擊，只要確保有些資訊「只有使用者知道」即可，要求在存取敏感數據請求時，用戶瀏覽器提供不儲存在 cookie 中，並且攻擊者無法偽造的數據作為校驗，那麼攻擊者就無法再執行 CSRF 攻擊，校驗 token 值為空或者錯誤時，就拒絕這個可疑的請求。
* Server 端生成的，在 form 裡面加上一個 hidden 的欄位，叫做 CSRF token，裡面填的值由 server 隨機產生，並且存在 server 中
* Server 端生成的，一樣在 form 放 CSRF token，但這次參照值不是存在 Server 裡，而是存在 cookie 裡
* Client 端生成的，有些套件（axios）可以設定好 header 和 cookie 的值，之後每一個 request 會自動添加上去

4. **瀏覽器本身的防禦：SameSite cookie**
```javascript=
Set-Cookie: session_id=ewfewjf23o1; SameSite
```

* Strict（默認 SameSite=Strict）
完全禁止第三方 Cookie，跨網站請求时，任何情况下都不會發送 Cookie。

換句話說，只有和當前網頁的URL一致，才會帶上 Cookie。如果只允許 same site 使用，不應該在任何的 cross site request 被加上去，像是 `<a href="">`、`<form>` 等，從 Google 搜尋結果或其他連結點進某個網站的時候，因為不會帶 cookie 的關係，所以那個網站就會變成是登出狀態，造成不好的使用者體驗。
* Lax
多數情況也是不發送第三方 Cookie，不過像 `<a>`、`<link rel="prerender">`、`<form method="GET">` 這些還是會帶上 cookie，比較彈性

    - 唯一問題是沒辦法擋掉 GET 形式的 CSRF，這點要注意

| 請求類型 | 範例 | 一般情況 | Lax |
| -------- | -------- | -------- |-------- |
| a 連結 | `<a href="..."></a>`| 發送 cookie| 發送 cookie |
| link 連結 | `<link rel="prerender" href="..."/>`| 發送 cookie| 發送 cookie |
| GET 請求 | `<form method="GET" action="...">` | 發送 cookie| 發送 cookie |
| POST 請求 | `<form method="POST" action="...">	`| 發送 cookie | 不發送 |
| iframe| `<iframe src="..."></iframe>` | 發送 cookie | 不發送 |
| AJAX | `$.get("...")`| 發送 cookie | 不發送 |
| 圖片 | `<img src="...">` | 發送 cookie | 不發送 |


### 參考資料
* [加密和雜湊有什麼不一樣？](https://blog.m157q.tw/posts/2017/12/25/differences-between-encryption-and-hashing/)
* [一次搞懂密碼學中的三兄弟 — Encode、Encrypt 跟 Hash](https://medium.com/starbugs/what-are-encoding-encrypt-and-hashing-4b03d40e7b0c)
* [雜湊不是加密](https://dotblogs.com.tw/regionbbs/2017/09/21/hashing_is_not_encryption)
* [比較require(), include(), require_once(), include_once()](http://ps.hsuweni.idv.tw/?p=5003)
* [攻擊行為－SQL 資料隱碼攻擊 SQL injection](https://ithelp.ithome.com.tw/articles/10189201)
* [pdo防止注入的原理](http://lk1ngaa7.github.io/2016/01/25/pdo-with-mysql/)
* [PHP中如何防止SQL注入](https://blog.csdn.net/sky_zhe/article/details/9702489)
* [給網頁開發新人的 XSS 攻擊介紹](https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267)
* [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
* [Cookie 的 SameSite 属性](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
