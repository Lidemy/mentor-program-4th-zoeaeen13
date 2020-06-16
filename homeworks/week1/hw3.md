## 教你朋友 CLI

> h0w 哥：哎哎！聽說你最近在學程式？可以教我 Command line 嗎？我完全看不懂那是什麼啊

什麼是 CLI 呢？全名稱作 Command Line Interface，它是一種對電腦下指令的方式。

一般大家習慣，透過按鈕、圖示這些很直覺的東西就能操控電腦的視窗，是圖形使用者介面 GUI (Graphic User Interface)，而 CLI 和 GUI 相反，它是利用文字 (比如輸入關鍵字、特殊指令)對電腦下命令、進而操控電腦的方式。

用以下這張圖，我們可以更好理解兩者之間的差異，同樣是做開啟檔案的動作，GUI 可以讓使用者點擊對應的按鈕，而右邊 CLI 則是輸入一行特定的文字指令，CLI 速度上會快很多，不過對多數人來說，並不直覺。

![](https://sciencerack.com/wp-content/uploads/2018/06/GUI-vs-CUI-min-768x379.jpg)


> h0w 哥：但是為什麼要使用 CLI？全部都用視覺介面處理不就好了嗎？

原因很多，比如速度快就是一個，你用 GUI 操作實際上也是在調用 CLI 指令，那直接在 CLI 操控效率更好，而且很多程式實際上是沒有介面存在，總結以下幾點大家使用 CLI 的原因：
* 鍵盤輸入文字比起用滑鼠移動點擊，速度快
* GUI 介面不可能涵蓋所有的命令，CLI 可以對文件和操作系統有更多控制
* 簡單一行指令就可以完成好幾個點擊動作，更簡單


> h0w 哥：用簡單一行指令？比如說？

就拿檔案改名來說吧，假設我在 `/desktop` 資料夾裡面有一個 `/mode` 資料夾和 `happy.txt` 文字檔

![](https://i.imgur.com/pky5kRv.png)

我想要幫 `happy.txt` 改一個名字，一般人都需要右鍵按一下再移動到重新命名這欄，才能開始輸入新名稱，快一點的會知道可以按 `f2` 跳到改名狀態
![](https://i.imgur.com/ZnRvNez.png)

但是這些都太慢了，在 Terminal 上我只要一行字就可以完成，如果英打很強，那更快了，是不是超有效率的呢
```
$ mv happy.txt sad.txt     //把 happy.txt 改名成 sad 檔案
```

![](https://i.imgur.com/vCDHrLp.png)


以下給你介紹幾個常用指令，按對照表你就可以學會用 CLI 啦

| 指令 | 名稱 | 功能 |
| -------- | -------- | -------- |
| pwd | Print Working Directory | 顯示目前目錄的絕對路徑 |
| ls | List | 列出檔案清單 |
| cd | Change Directory | 切換資料夾 |
| cd . . |  | `cd ..`切換到上一層，`cd ~` home目錄，`cd/`根目錄 |
| clear | Clear | 清除畫面 |
| touch |  | 建立檔案/最後修改時間 |
| clear | Clear | 清除畫面 |
| rm | Remove | 刪除檔案 |
| rmdir | Remove Directory | 刪除資料夾|
| mv | Move | 移動或改名|
| grep | | 抓關鍵字（$grep keyword file）|
| echo |  | 產生字串|
| cat | Catenate | 顯示檔案內容|



> h0w 哥：聽起來還真是不錯！但我還是不確定怎麼操作，如果想用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案，要怎麼做阿？

這樣還不會啊？真是拿你沒辦法，就拿同一份來舉例吧，重新來一遍。
1. **開啟 command line 介面**

command line 很多名字，像是 cmd, CLT, prompt, console 或是 terminal 終端機等等，如果你是 Windows 系統就按鍵盤 `window 鍵 + R`，左下角會跳出一個輸入框，在裡面輸入 `cmd` 就可以

不過我已經幫你安裝好，只要開啟 Git Bash 這個應用程式就可以啦

![](https://i.imgur.com/CnvrdCF.png)


2. **接著利用 `cd` 指令移動到上面舉例的目錄資料夾**
如果你不確定有沒有進到資料夾，可以看黃色`~`提示的檔案層級確認資料夾的名字，接著可以用 `ls` 指令列出資料夾裡面的清單

如下圖，會顯示裡面有 `mode/` 資料夾和` sad.txt` 兩個檔案
![](https://i.imgur.com/yBcJN2w.png)

3. 接著使用 `mkdir` 指令建立一個空資料夾，名為 wifi
```
$ mkdir wifi
```
![](https://i.imgur.com/Twq6Jhk.png)

4. 進入 `wifi/` 資料夾，使用 `touch` 指令在裡面建立一個 `afu.js` 的檔案
```
$ touch afu.js
```
![](https://i.imgur.com/FuHTbjX.png)

或是試試第二種方式，在外面建立 `afu.js` 檔案，再把它移到 `wifi/` 裡面，這樣就可以多練習到移動的 `mv` 指令喔！

![](https://i.imgur.com/J9wzdzf.png)

![](https://i.imgur.com/onIYHiJ.png)

CLI 看起來很難操作，只要花一點時間練習、克服沒有視覺介面的恐懼，實際上並不難上手喔！多多練習，下次我再教你用 Git

---

參考資料：
1. [Difference Between GUI And CLI in Tabular Form](https://sciencerack.com/difference-between-gui-and-cli/)
2. [介紹命令行(command-line)介面](https://carolhsu.gitbooks.io/django-girls-tutorial-traditional-chiness/content/intro_to_command_line/README.html)
3. [为什么很多人喜欢使用CLI而不是GUI？](https://blog.csdn.net/Gnd15732625435/article/details/80870310)
