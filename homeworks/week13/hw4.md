## Webpack 是做什麼用的？可以不用它嗎？
> 它是一項「打包工具」，它將眾多模組與資源打包成一組檔案，並編譯我們需要預先處理的內容，變成瀏覽器看得懂的東西，讓我們得以上傳到伺服器

使用 Webpack 之前，我們要先知道── 它是要作用在哪些東西上，認識什麼是模組，預處理工具、ES6 等等：

* 模組：把複雜的系統切分成一個個不同的小功能（檔案），然後透過引入檔案的方式使用，方便管理，不會是全部程式碼寫在一起
* 資源處理：例如可將圖片檔案壓縮（.png、.jpg）
* 預處理工具，如 SASS

現今的前端世界，不再只是單純寫寫 HTML、CSS、JavaScript 檔案，許多新工具和框架出現，像是引入模組化的概念、使用 SASS 以程式化方式寫 CSS、運用 ES6 語法開發，新工具讓一切變得方便，卻有個問題是：瀏覽器的支援度跟不上版本和工具的更新速度，意味著「**瀏覽器根本看不懂這些檔案！**」我們得把它編譯成一般瀏覽器看得懂的文件，這樣才能順利執行。

舉例來說，想要在瀏覽器上面使用 CommonJS 的模組機制，必須使用工具把程式碼打包才能做到，而像 [Webpack](https://webpack.js.org//) 就是這樣的自動化工具，可幫我們一次解決上述問題，不管是引入模組、轉換 ES6 語法還是編譯 SASS，它都可以做到，甚至還能最小化、優化你的程式碼。


#### 安裝 webpack
1. 安裝 npm 及 webpack
```
npm init -y
npm install webpack webpack-cli --save-dev
```
2. 啟用 webpack 打包
```
npx webpack
```
* 預設是 production 模式，代表在生產環境下使用，所以會自動幫你壓縮以及優化。開發時通常使用 development 這個模式，打包速度較快、不會做壓縮
* 預設以 `src/index.js` 為入口點，將幫你把東西打包一起，放到 `dist` 夾

2. 自定義的webpack 設定檔，新增一個 webpack.config.js
```webpack=
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.js'
  },
  externals: {
    jquery: 'jQuery',
  },
};
```

3. 更改預設，建立 `webpack.config.js` 檔案

```webpack=
module.exports = {
  mode: 'development', // 模式
  entry: './main.js',  // 入口點
  output: {
    path: path.resolve(__dirname, 'dist'),  //輸出路徑
    filename: 'webpack_bundle.js'           //輸出檔名
  },
  externals: {
    jquery: 'jQuery',  // 引入jquery
  },
}
```
 webpack 會根據你的設定檔去執行打包
```
npx webpack --config webpack.config.js // 使用自定義的設定檔
```
#### 有了 webpack 的好處
* 進行模組化的管理程式碼
* 它擁有許多不同的 loader 能加入各類型的檔案，例如 [CSS loader](https://webpack.js.org/loaders/css-loader/)，可把 CSS 當作資源載入，再進行打包
* 開發時用 **webpack dev server** 很方便
* 開發時開啟 **source maps** 用以 debug

<br>

## gulp 跟 webpack 有什麼不一樣？
> webpack 是 module bundler，gulp 是 task runner

webpack 的核心是「bundle」，bundle 由多個不同資源的模板生成，裡面包含了已經加載和編譯過的最終文件版本，也就是 webpack 將原始檔打包成瀏覽器看得懂的形式，是用來打包的工具。

而 gulp 本身沒有什麼功能，它就像是以前打遊戲我們使用的外掛程式，你在上頭設定一系列幫你打怪、蒐集寶物的任務，配置好他們的順序，外掛程式就會自動替你執行。

例如 webpack 的打包就是其中一項功能，你想要 gulp 指令具備這樣的功能，就載入它的 webpack 插件來進行調用，可以想像成 gulp 是管理所有任務的 PM，而不是本身要去做事的主體，只是從我們的角度來看，會覺得他們最終達成的結果是一樣的，而將兩者混淆一談。

<br>

## CSS Selector 權重的計算方式為何？
#### 為什麼需要了解選擇器的權重（Specificity）？
> 因為它決定了「對於同一個元素來說，哪條 CSS 規則會生效」這件事，基本上只有在多條規則都對同一個元素聲明相應樣式時，才會遇到**權重計算**的問題，它決定了元素最終會被什麼樣式渲染。

一般大家都熟知 id selector 權重高於 class selector，一旦你使用 id 選擇器，它的規則就會凌駕在其他選擇器之上。如果你不太清楚這是什麼意思，可以從範例了解，下面每一條 CSS 規則指的都是同一個元素，但是它最終卻被渲染成了粉色？這就是權重計算後的結果。
```htmlembedded=
<section>
    <h1 class="section__title" id="blogger">博客</h1>
    <input>
</section>
```
```css=
  h1 {color: red}
  section h1 {color: green}
  h1.section__title {color: blue}
  #blogger{color: pink}      /*最終會採用這條規則*/
```

### 選擇器的類型
眾多的 CSS 選擇器，主要可以被分為四類，由權重大小排列分別是：
1. ID 選擇器：比如 `#blogger`
2. 類別選擇器（class selector）、屬性選擇器（attribute selector）及偽類選取器（pseudo class selector）
```css=
/* class selector */
.section__title {

}
/* attribute selector */
[type="radio"] {

}

/* pseudo class selector */
:hover {

}
```
3. 元素選擇器（type selector）和偽選擇器（pseudo selector）：比如 `h1`、`::before`
4. 其他選擇器：對權重計算沒有影響，`*` 全域選擇器、`+,>,-, ,||`　選擇連接子、`:not()` 偽類反向選擇器（本身是不計入權重，但寫在它裡面的 css selector 需要計算）

其中有兩個特殊的樣式會影響權重計算的生效：
* 內聯樣式：把 CSS 程式碼直接寫在現有的 HTML 標籤裡面，比如下面就會直接套用紅色，因為內聯樣式始終擁有最高的權值（詳見權重計算），直接覆蓋過 [外部樣式表](https://www.itread01.com/content/1548510689.html) 的規則
```htmlmixed=
<h1 style="color: red;" class="section__title" id="blogger">博客</h1>
```
* 另一個是 `!important` 修飾詞，權重會高於正常規則，但不推薦使用！
    * 優先考慮使用權重更高的 CSS 選擇器, 而不是使用 `!important`
    * 只有當目的是要覆蓋來自第三方的 CSS 時（例如 Bootstrap、normalize.css）
    * **永遠不要** 在寫一個第三方外掛程式時使用它
    * **永遠不要** 在全域範圍使用它
 
### 選擇器的權重計算
依據 [W3 標準](https://www.w3.org/TR/CSS2/cascade.html#specificity)，在了解選擇器分類後，我們可以從任一 CSS 規則獲取 `(a,b,c,d)` 計算值：
1. a：是否有內聯樣式，如果 CSS 屬性是寫在 `style=""` 樣式中，那麼數量為 1，否則是 0
2. b：ID 數量
3. c：類別選擇器、屬性選擇器及偽類別選取器的總數量
4. d：元素選擇器、偽選擇器的數量

#### 如何進行權重計算
* 由左而右去逐個比較，數字大的勝出
* 如果同位置的權重一樣，那就往後去比較規則，同樣是數字大的生效

理解規則之後，再回到前面範例，就可以知道為什麼會採用粉色的 CSS 規則了
```css=
  h1 {color: red}                   /*權重值(0, 0, 0, 1)*/
  section h1 {color: green}         /*權重值(0, 0, 0, 2)*/
  h1.section__title {color: blue}   /*權重值(0, 0, 1, 1)*/
  #blogger {color: pink}            /*權重值(0, 1, 0, 0)*/
```

#### 最後的最後，一些例外情況
##### Q：如果 a、b、c、d 都比較完了？怎麼辦？
默認是最後聲明的規則生效
##### Q：如果我重複同樣的 css selectory type，權重會增加嗎？
會的，重複的 css selector，權重會被重複計算到



### 參考資料
* [webpack 新手教學之淺談模組化與 snowpack](https://blog.huli.tw/2020/01/21/webpack-newbie-tutorial/)
* [CSS 选择器权重计算规则](https://www.cnblogs.com/Wayou/p/css-specificity-calculation.html)
* [前端杂谈: CSS 权重 (Specificity)](https://zhuanlan.zhihu.com/p/50322177)
* [Day14 CSS：權重](https://ithelp.ithome.com.tw/articles/10221486?sc=rss.iron)
* [CSS 的模組化方法：OOCSS、SMACSS、BEM、CSS Modules、CSS in JS](https://cythilya.github.io/2018/06/05/css-methodologies/)

