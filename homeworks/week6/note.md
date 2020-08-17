## Week6 作業筆記
人生第一次切版，很多地方不熟練或根本沒看過，筆記一些作業過程中特別去查、踩到的坑，希望幫助自己在之後切類似的版型時，可以馬上想到並用到，正因為切版需要時間去累積經驗，每一次的經驗都得好好記錄。

P.S 附上每個作業的連結，方便助教直接查看和批改

* hw1：餐廳介面  https://zoeaeen13.github.io/Demo/week6/hw1/

* hw2：活動報名表單  https://zoeaeen13.github.io/Demo/week6/hw2/

* challenge：Hacker News  

---

#### ▲ Block 元素的水平置中： `margin: 0 auto`
在做餐廳介面時，有些區塊並不需要滿版，老師示範有設置一個 wrapper 包住、並讓裡面的東西置中（例如標題），使用到了 margin 這個屬性：

**用法**
```css
.wrapper {
    padding: 0px 24px;
    max-width: 1280px;
    margin: 0 auto;  /* 或者 margin: auto; */
}
```
當元素為 block 區塊元素時，可以設定左右外邊距（margin-left 與 margin-right）為 auto，來使其水平居中，元素在顯示時，只會顯示到指定的寬度，然後剩餘寬度平均分散在左右兩邊邊距。


**為什麼可以水平置中？**

margin 是複合屬性，也就是說 `margin: auto;` 寫法相當於 `margin: auto auto auto auto;`，分別對應上右下左四邊，但有趣的是，效果出來只有水平置中，為什麼沒有垂直置中呢？

>On the A edge and C edge, the used value is 0. On the B edge and D edge, the used value depends on the available space after calculations have been made for the widths, heights, and margins.

這裡研究一下[文件](https://www.quackit.com/css/properties/css_margin-right.cfm)，發現 A 邊和 C 邊（也就是上下邊）它的 auto 值就是 0，所以一般我們寫 `margin: 0 auto;` 就等於 `margin: auto;` 在 margin 如果只設置兩個值就是指上下邊和左右邊。而再看文件第二句，如果是 B 邊和 D 邊（也就是左右邊）水平邊的計算方式不一樣，計算值是取決於**可用空間**！

![](https://i.imgur.com/hsjiDLr.png)


舉個例子，如果寬 100px 的 `div` 被放置在寬 500px 的 `section` 裡面，為其 `div` 設置左邊距為 auto 的話，猜猜會發生什麼事？
```css=
margin-left: auto;
```
按照規範，auto 的計算值是取決於剩餘空間，500px -100px = 400px，所以 auto 值計算為 400px，也就是說左邊距會是 400px，而 `div` 效果是向會右對齊！簡直太神奇～所以現在終於弄懂為什麼可以水平置中，因為左右邊的 auto 值均分了可用剩餘空間，使得區塊元素可以在父層元素居中顯示。

![](https://i.imgur.com/FGAFSP5.png)

既然談到了置中，順便整理一下 Block 元素的垂直置中方法，族繁不及備載，整理幾種我認為好用的方法：
1. 文本
如果內容是單行文字的話，很簡單，直接設置文字的 `line-height` 為元素高度
2. 絕對定位方法
```css=
/* #1 已知元素寬高 */
div {
    position: absolute; 
    left: 50%; top: 50%; 
    margin-top: -100px;/* 高度的一半 */ 
    margin-left: -100px;/* 宽度的一半 */
}

/* #2 不知元素寬高 */
div {
    position: absolute; 
    left: 50%; top: 50%; 
    transform: translate(-50%, -50%);/* 50%為自身尺寸的一半 */
}

div {
    position: absolute; 
    left: 0; 
    top: 0; 
    right: 0; 
    bottom: 0; 
    margin: auto;/* 加它可以自動居中 */
}
```

#### ▲ 子層圓角問題

作業二中，我有參考正常 Google 表單的樣式，上邊會有一條主題色的邊線，同時還要有表單的圓角，為了提高作業美觀程度就多加上這塊，原以為簡單的設置一下就好，沒想到踩了一個坑！

![](https://i.imgur.com/W3jG5Dg.png)

問題找很久，發現是表格裡面包的白色背景給擋住了，那就給白色背景的 div 也加上 border-radius 圓角屬性，沒想到越弄越糟，表單底部是處理好了，可是黃色頂部還是一樣，總不能也為黃色線另外加入左上、右上兩個圓角吧？ => 我認為 [CSS3 圆角无效](http://alfred-sun.github.io/tuliangblog/CSS3-radius-invalid/) 這篇解法不夠漂亮

![](https://i.imgur.com/JnEbm1V.png)

最好方法，應該是讓外層的表單圓角顯示出來，而超出部分不出現，於是研究了 [overflow 屬性](https://www.w3.org/TR/CSS21/visufx.html)，還有在 [stack overflow](https://stackoverflow.com/questions/8582176/should-border-radius-clip-the-content) 上也有討論這類問題：
> The default overflow for` <div>` elements (and most other things) is visible, and the spec says this about overflow: visible:

**overflow: visible 效果**
> This value indicates that content is not clipped, i.e., it may be rendered outside the block box.

如果我們沒有設置，多數元素的 overflow 預設屬性是 visible，而不是 auto！为了讓子元素不超出容器圓角邊框，容器的 overflow 屬性必须是除visible 之外的其他值（比如 auto, hidden, scroll 等）


### 參考資料：
* [margin：auto 与 margin：0 auto 区别](https://blog.csdn.net/dkmings/article/details/51661056)
* [CSS margin-right](https://www.quackit.com/css/properties/css_margin-right.cfm)
* [CSS margin Property](https://www.w3schools.com/cssref/pr_margin.asp)
* [块级元素 垂直居中](https://blog.csdn.net/dkmings/article/details/51671351)
* [有关CSS的overflow和border-radius的那些事，你的圆角被覆盖了吗？](https://www.cnblogs.com/sanshi/p/9712426.html)
* [Should border-radius clip the content?](https://stackoverflow.com/questions/8582176/should-border-radius-clip-the-content)
* [Visual effects](https://www.w3.org/TR/CSS21/visufx.html)