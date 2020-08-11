## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
一份 HTML 文件 (HTML document) 是由一堆標籤 (tag) 結構所組成，不同的 HTML 標籤包圍表示不同語意 (semantic) 內容的區塊，而瀏覽器 (web browser) 知道如何解讀標籤、以呈現最終的網頁畫面。
```javascript=
// Element
<Tag> Content </Tag>
```

### 1. article 內容標籤
內容獨立完整的區塊，例如部落格中的一篇文章、一則留言，或像論壇中的一個回覆。

和 Section 相似，但差別是 article 標籤具有更高的獨立性及完整性，而 section 雖然也表示**相對獨立**的內容，但其對外層的內容通常有一定的相依性。

> 不要將 `<section>` 或 `<article>` 當做一般容器或 CSS 排版來用，應該是要用 `<div>`，div 才是不含任何語意的一般性容器標籤
> 
```javascript=
<h1>The Daily News</h1>

<article>
    <h2>News 1</h2>
    <!-- article content -->
</article>

<article>
    <!-- article content -->
</article>
```

### 2. form 表單標籤
用來讓使用者輸入資料，這些資料可以用來和使用者互動，例如表單內容填完後可以傳回遠端伺服器 (web server)。`<form>` 標籤是用來建立一個表單，作為表單的容器，裡面還會有不同用途的標籤來建構出完整的內容。

#### form 標籤屬性 (attribute)
* action: 指定一個位址 (URL)，告訴瀏覽器當 user 按送出表單後，將表格內容送去哪邊
* method: 用來指定資料傳輸時的 HTTP 協議，最常用是 get 或 post
    * get: 將資料放在 form action 請求的位址 URL 網址參數列 (URL GET parameters) 上面送出，放在網址中直接傳出，容易被直接看到資料
    * post: 會將表單資料放在 HTTP 傳輸封包 body 中送出。post通常用在資料量比較大、有夾帶檔案上傳
* target: 用來指定瀏覽器要在何處顯示送出後伺服器的回應結果


示範：宣告這個表單的資料會被用 post 方法送到 "/formprocess.php" 這支遠端程式
```javascript=
<form action="/formprocess.php" method="post">
  
  <!-- ....表單 HTMLs .... -->
  
</form>
```

### 3. 表單元素標籤
1. **input 輸入欄位**

用其 type 屬性來指明不同的用法功能。大部分 type 可以再搭配上 value 屬性，指定一個預設值。是**空元素**不需要 closing tag
```javascript=
<input type="text">       //文字輸入欄
<input type="password">   //密碼文字輸入
<input type="checkbox">   //多選方塊
<input type="radio">      //單選按鈕
<input type="submit"> 　  //送出表單按鈕
```

2. **textarea 多行文字輸入欄（multi-line textbox）**

```javascript=
<textarea rows="指定輸入框的高度/列數，一個整數"
          cols="指定輸入框的寬度/行數，一個整數"
          maxlength="限定輸入的文字長度上限"
          placeholder="指定輸入框的提示訊息">
  
  輸入欄位中的預設文字內容
  
</textarea>
```
3. **select 和 option 下拉式選單（drop-down select boxes）**

select 是用來宣告一個下拉式選單，select 標籤裡面還會有 option 標籤用來宣告有哪些選項
```javascript=
<select>
    <option>Option 1</option>
    <option>Option 2</option>
    
    // 屬性 value 是表單送出去時伺服器會收到的值，沒有設定的話，預設是 <option> 內容
    <option value="3">Option 3</option>
</select>
```

#### 常見的表單元素屬性 (attributes)
```
* name: 欄位名稱，指定送出去的該筆資料要用什麼名稱
* disabled: 將欄位設定為禁用狀態 (boolean)
* required: 將欄位設定為必填 (boolean)
* autofocus: 頁面載入後，將游標直接聚焦
```


<br>
<br>

## 請問什麼是盒模型（box modal）

> Everything in CSS has a box around it, and understanding these boxes is key to being able to create layouts with CSS, or to align items with other items. In this lesson, we will take a proper look at the CSS Box Model so that you can build more complex layout tasks with an understanding of how it works and the terminology that relates to it.

根據 [MDN 解釋](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)，在 CSS 裡面 html 每個元素皆可視作為一個盒子，然後可以針對該盒子做調整，建立排版布局或是對齊其他元素。

![](https://i.imgur.com/ilRjaSl.png)


以 Medium 這篇文章為例，網頁上的每個元素都會被藍線框框所包圍，一個框就是一個盒模型，一般看到的完整頁面其實就是由這一個個盒模型（box modal）所組成，而打開 DevTools，還能看到元素的實際狀態，寬度、大小、顏色和距離，由內而外分別是元素本身內容、padding 內距、border 邊線、margin 外距來組成一個盒模型。

Box Model，是定義網頁區塊與計算區塊的單位，讓你能夠輕易排版、抓對位置，是網頁製作裡很重要的一環，許多時候，設計師給出的範例和實際螢幕本身有出入，或是因為使用者裝置的多樣性，導致需要改變計算排版的方式，用 Box Model 的概念能更好地規劃。

![](https://i.imgur.com/3MKa4HA.png)

<br>
<br>

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

首先，我們需要知道 display 的作用：

display 這個屬性，是用來定義標籤們的**顯示方式**，每一個 html 元素都會有一個預設的 display 屬性，inline 或 block，可以透過 CSS 來改變元素預設的顯示方式，進而達到排版目的。常見的顯示方式有兩種：

#### Block 區塊元素
* 常見元素標籤：div、ul li、p、h1
* 寬度預設撐到最大，占滿整行容器
* 下個元素會換行呈現，並不會並排
* 水平置中方法：margin : 0 auto✍

#### Inline 行內元素
* 常見元素標籤：span、a、imput、img
* 元素連在一起會在同一行，**不會換行**，圖片或文字均不換行
* **不可設定長寬**，僅依照內容大小顯示
* 很多資料會寫到 margin/padding 不能設定，事實上是指排版不會隨著設定而有所改變，寬高都是依照元素本身大小，但可以設置 margin-left、margin-right、padding-left、padding-right
* 水平置中方法：加上 text-align : center✍
* 備註： inline 元素不該包住 block 元素✍

![](https://i.imgur.com/WFByAR7.png)


除了預設兩種，當然可以透過 CSS 去改變 display 方式，我們常用的 display 方式有 none、inline、block 和 inline-block 四種，

#### display: none
設定成 none，表示不顯示該元素，`display: none` 和 `visibility: hidden` 的差別在於 none 會讓這個東西完全不見，不佔空間，而 `visibility : hidden` 只是隱形，實際上還是佔據排版空間

#### display: inline-block
inline-block 的作用，就是為了整和名稱裡兩屬性的優缺點。有時候我們不需要占滿整行的元素、想讓它並排，同時又希望它可以設定 Box Model 的狀態，這時候就可以用上 inline-block：
* 外面用 inline 呈現，裡面是 block 屬性
* 意思是可以並排，可以設定元素的寬高/外距/內距

### 補充：CSS 彈性盒子（flexbox）
相較於塊狀佈局（Block layout）以垂直方向為準、行內佈局（Inline layout）以水平方向為準，這是一種新的布局方式，是為了適應不同螢幕和設備尺寸而誕生的佈局模式：
* 多數瀏覽器已有支援 flexbox 
* 沒有固定水平、垂直，而是利用**主軸**（main axis）和**切軸**（cross axis）的概念
* 彈性盒子適用不同的排版演算法，有些屬性在這裡無作用，例如 vertical-align
* **動態變更**的能力，更改該項目的長/高，以貼合任何顯示空間，擴張及收縮元素
![](https://i.imgur.com/GScIb0H.png)


> 舉例來說
> flex-direction 是 column，主軸會充當垂直、而切軸則為水平，和我們習慣相似。但參考下圖，它是一個 `flex-direction: row` 的彈性容器，也就是基於主軸作水平排列

![](https://developer.mozilla.org/files/3739/flex_terms.png)

那麼要如何使用 flexbox 來實作排版？
#### 一、設定彈性容器 flex container
首先，需要定義使用 flexbox 的區塊，將包裹住所有元素的父層容器，它的 display 設定成 `flex` 或 `inline-flex`，作為彈性容器 Flex container
```javascript=
display: flex

display: inline-flex   // 能讓父層保有 inline-block 的特性
```
如此一來，在彈性容器內的所有元素都會變成彈性項目（Flex item），我們可以利用一些屬性設定主軸，對 Flex item 進行排版

#### 二、建立彈性容器的排版規則（外部）
設定主軸（main axis）是跟隨著彈性項目順序的軸、而切軸(cross axis)是垂直於主軸的軸
1. **flex-direction：啟用主軸，決定子元件的排序方向**
```
row: 主軸從左至右（預設）
row-reverse: 主軸從右至左
column: 主軸由上至下
column-reverse: 主軸由下至上
```
2. **flex-wrap：決定了子物件是否可以換行**
```
nowrap：不換行（預設）
wrap 為換行
wrap-reverse 換行且排序方式與 wrap 相反
```

✍ **小技巧：flex-direction 和 flex-wrap 可以合併簡寫為 flex-flow 屬性**
```
flex-flow: flex-direction 值 || flex-wrap 值
```


3. **justify-content：依據主軸，彈性項目如何擺放**
它會依照我們設定的主軸方向，去移動子物件的對齊位置，因為排版方式眾多，以網路範例圖來展示，更好理解

![](https://i.imgur.com/5EACcpY.png)

4. **align-items：依據切軸的項目如何擺放**
也就是說，對齊方向與 justify-content 相反。舉例來說，當依照預設 `flex-direction: row` 設定主軸為橫向、副軸為縱向
```javascript=
.container {
  align-items: stretch;     // 自動將子元素的高度延展成一樣高度
               flex-start;  // 靠上
               flex-end;    // 靠下
               center;      // 垂直置中
               baseline;    // 依照基準線對齊
}
```
另外還有 align-content 屬性，與 align-items 類似，差別在於它適用於多行元素，如當設置 `flex-wrap: wrap` 時產生的多行元素

---
剛剛講的這些都是外容器，前面提過，彈性盒子有一特別屬性是「動態變更」運用在內容器，更能體現 "flex" 特性：

1. flex-grow：元件的伸展性，空間分配還有剩餘時的當前元件的伸展性。預設是 0，也就是不會縮放
![](https://i.imgur.com/8ISzDfl.png)
2. flex-shrink：元件的收縮性，空間分配還不足時的當前元件的收縮性
3. flex-basis：元件的基準值，可使用不同的單位

✍ **筆記：grow、shrink 計算概念 => 填入整數，按比例分配剩餘空間**
* 先將剩餘的空間計算出來，依據比例（flex-grow）
* 是分配 剩餘的空間，已經佔用的空間不會重新分配

可以參考這篇 [Flex 空間計算規則](https://wcc723.github.io/css/2020/03/08/flex-size/)，裡面有附圖比較好理解


<br>
<br>

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
### Position（Positioned Element）
Position，用來指定一個元素的定位方式
相較於屬性 display 定義元素與其它元素之間的排版關係、整體呈現方式，屬性 Position 是透過 top、right、bottom 和 left 特性來「特別定位」元素，是經過計算後得到的位置。常見定位元素有以下分類：
* 相對定位元素（relatively）
* 絕對定位元素（absolutely）：absolute 或 fixed 的元素
* 黏性定位元素（stickily）

要對元素進行定位，需要設置 position 屬性才能指定定位元素，如果沒有特別設置，預設 static 會按照正常的排版布局
#### 1. Static 預設
* 照著瀏覽器預設的配置自動排版
* 使用 top, right, bottom, left 和 z-index 属性無效，因為它非定位元素
```css
/* 預設位置 */
position: static;
```
![](https://i.imgur.com/MAc1m4y.png)

#### 2. Relative 相對定位
* 預設表現會和 static 一樣，除非你設置 top, right, bottom, left 等屬性
* 根據原位置，原位置「相對地」調整原本該出現的所在位置
* 不影響其他元素 => 脫離正常的文件流進行移動，原位置仍留空
```css
.item {
    position: relative;
    top: 40px; left: 40px;
}
```
![](https://i.imgur.com/d9r8MFA.png)


#### 3. Absolute 絕對定位
* 不會和 reletive 一樣預留空間，排版流視絕對定位的元素不存在
* 絕對定位的元素，會往上找到**定義為非 static 的父層**元素，根據它來進行偏移，確定元素位置
* 如果父層都沒有定義，那麽就一路找到整個文檔 body 定位
```css
.item {
    position: absolute;
    top: 40px; left: 40px;
}
/* 從下圖可以看到方塊黃被擠出正常的排版，定位的基準點是父層非static元素 */
```
![](https://i.imgur.com/MyfFnGp.png)

#### 4. Fixed 固定定位
* 和 absolute 相似，只是它根據的不是父層元素，而是 viewport 屏幕位置
* 相對於瀏覽器視窗來定位，即使頁面捲動依然在同一位置
* 通常配合 z-index 一起來使用


#### 補充：z-index 物件的層疊順序
* 用一個整數來定義堆疊的層次，整數值越大，則被層疊在越上面
* 父子關係是無法用 z-index 來設定上下關係 的，一定是子級在上父級在下
* 用 static 定位時，無效

參考資料：
* [HTML 標籤 (Tag)](https://www.fooish.com/html/tag.html)
* [The box model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
* [學習 CSS 版面配置](https://zh-tw.learnlayout.com/inline-block.html)
* [CSS教學-關於display:inline、block、inline-block的差別](https://medium.com/@wendy199288/css%E6%95%99%E5%AD%B8-%E9%97%9C%E6%96%BCdisplay-inline-inline-block-block%E7%9A%84%E5%B7%AE%E5%88%A5-1034f38eda82)
* [CSS 屬性 display 的值](https://blog.xuite.net/vexed/tech/29221717-CSS+%E5%B1%AC%E6%80%A7+display+%E7%9A%84%E5%80%BC+inline+block+inline-block+none)
* [MDN CSS 彈性盒子用法](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
* [CSS Flexbox 新手入門教學](https://medium.com/@a0988891318/css-flexbox-%E6%96%B0%E6%89%8B%E5%85%A5%E9%96%80%E6%95%99%E5%AD%B8-5ad3502e4f40)
* [第一次用 Flex 切版就上手](https://5xruby.tw/posts/flex/)
* [MDN position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
* [關於 position 屬性](https://zh-tw.learnlayout.com/position.html)
* [CSS 屬性篇(一)：relative與absolute](https://www.jishuwen.com/d/2A5E/zh-tw)


