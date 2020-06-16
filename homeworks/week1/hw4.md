## 跟你朋友介紹 Git


> 菜哥：嗨～我聽說你前幾天教 h0w 使用 Command Line 呢，感覺挺實用的，最近我遇到一個問題，想要好好管理我的笑話靈感，不過太多次修改，有時候還忘記哪一個笑點才是亮點，聽說你們工程師都會用一種程式叫做 Git 來做版本控制，那是什麼呀？可以教我怎麼用嗎？

大部份會使用 Git 工具的人，多半會回答你「Git 是一種版本控制系統」，不過我知道你應該無法理解，那我們就用你的笑話集來簡單比喻一下吧！

### 理解版本控制的概念

假設你 4/20 要上台表演笑話，你從 15 號開始準備，寫了第一個版本、第二個版本，然後期間內不停修改，一直到上台前還準備好了 final 最終版本，大家都很喜歡你的表演。不過你覺得有點美中不足，演出完隔天還添加一些新笑點及檢討內容。
![](https://i.imgur.com/pLgV7qq.png)

到某個聚會前，你又被 cue 去表演上次的笑話，而陪你練習笑話的朋友，覺得某個笑點可以回到之前的版本，笑果應該更好，這時候你要回去看紀錄時突然愣住了，完全找不到哪一個版本修改了什麼。

於是你學乖了，把檔案名稱加上修改訊息，這樣比較好懂一點吧？
![](https://i.imgur.com/7XjpxzX.png)

但是你點開檔案後又遇到了困難，笑話腳本這種東西，通常就是改一兩句話，或是一些冗言贅字修掉，你不會每次修改就註解自己改掉了什麼，也不會留下上個版本的東西，時間一久你就忘了是哪裡寫不好、版本間差異有哪些，難不成要像補習老師批改作業一樣，一堆紅字刪除和插入評語？那打開文件多難看懂呀！

![](https://i.imgur.com/o8Fb6LT.jpg)

其實你的困擾，就很適合用 Git 來管理，版本控制並非只有工程師才用的到，設計師要管理設計稿的版本、人資要管理每一屆應徵者的資料，只要以「檔案」為單位都適合，總不能永遠都在複製、貼上然後找不到資料吧？

---

### 版本控制的用途

講這麼多，來認識一下 Git 到底是什麼神奇的程式吧？
* 幫你記住版本的順序
* 記住各版本的差異
* 每個版本修改的時間、修改者和細節
* 標示最新的版本，幫你判斷修改到哪了

光是幾個基本的功能就讓人眼睛一亮了，就像你的隨身助理，幫你記住工作中大小瑣事、記錄會議重點、分類各個做過的專案、提醒你目前做到哪裡，只要喊一聲就可以拿到你需要的資料、在你不小心刪掉檔案時跟你說「沒關係我有備份」！

我們可能沒本錢為了寫笑話聘個專職助理，但是絕對能花一點時間學會用 Git 來幫你。

---

### 開始用 Git
#### 第一步：呼叫 Git，來幫我版本控制吧
你沒有開職缺，誰知道你在應徵助理？
當然得先跟 Git 說你要做版本控制，它才會來幫你呀！
```
# 開啟版控
$ git init
Initialized empty Git repository in C:/Users/...
```
建立一個專門準備 0420 笑話的空資料夾，使用 [`git init`](https://git-scm.com/docs/git-init) 指令開始版控，會看到裡面有一個隱藏資料夾，它就是會幫你記錄一切的小助理

`.git` 這個資料夾，包含 Git 所有必需的倉儲檔案，也就是 Git 倉庫的架構。

![](https://i.imgur.com/sYNd0Kl.png)

記住到目前這步驟為止倉庫都是預設，**還沒有追蹤任何檔案**，可以用 `git status` 指令隨時確認目前狀態，它會告訴你目前處在哪一個分支、檔案 Commit 狀況等等
```
#確認版控狀態
$ git status
On branch master

No Commits yet

nothing to Commit...
```
![](https://i.imgur.com/njaqngZ.png)

#### 第二步：Git 基本操作
不過當你寫好了第一版笑話、新增檔案之後，再 `git status` 查看狀態就不一樣了。這時候它會提示你，有一個叫 joke.dot 的 **Untracked files**，還提示你可以用 `git add <file>...` 這個指令
![](https://i.imgur.com/hFYrTVw.png)

於是按照提示，我們輸入 `git add` 順利將檔案加入暫存區（Staging Area），這時候再次查看狀態，它就會提示你有東西可以加入到儲存庫（Repository）喔！
```
$ git add 檔名
```
![](https://i.imgur.com/bMP3M3O.png)

放在暫存區（Staging Area）顧名思義是暫時，你還必須再做一步才能完成版本控制喔，那就是執行`git commit` 指令！
```
$ git commit -m"commit message"
```
它會將**所有暫存區的東西都放入儲存庫**，形成一個新的版本。
做這個指令時，要注意後面必須加一個 `-m` 參數用來寫「版本訊息」，通常是用來提醒自己這個版本做了什麼、改哪些東西或新增檔案。

如果不小心忘記加 `-m` 參數，就會跳到一個神奇的介面，這時候莫慌莫怕，鍵盤上按一個 `i` 就可以移動游標和輸入文字，在沒有井字符號的行數輸入你的 commit 訊息（`#`符號是用來備註的）

![](https://i.imgur.com/XV2Hl7t.png)

![](https://i.imgur.com/xi9mFaa.png)

輸入完後按 `esc` 切換原本模式，再按 `:wq` 就可以儲存離開 VIM 介面囉！這時候能看到 commit 成功的訊息，也就完成一個版控流程！

![](https://i.imgur.com/omieLeS.png)

關於暫存區（Staging Area）和儲存庫（Repository）的流程，可能還不是很理解為什麼要經過兩層，看以下的圖會發現有三層狀態：工作區、暫存區和儲存庫。

![](https://uploads-ssl.webflow.com/5d3a7aed4e11720246d46f49/5e54c452ffbfe965bbc38ad0_ExportedContentImage_05.png)

可以簡單理解成，雖然我們已經開啟了版本控制，但並非資料夾裡每一檔案你都想要被追蹤
* 只有當你把該檔案加入暫存區（Staging Area）時，每次有任何修改它就會提示你，如下圖改了笑話內容，就顯示 **modified**
* 而沒被追蹤的檔案不管你怎麼修改，它都只會提示你說這個檔案還沒被追蹤。
![](https://i.imgur.com/CEH2Soc.png)

另外注意上上張圖，在 commit 放進儲存庫之後，右上角除了 commit message 外還有一串長長的亂碼字，那是 git 給每個版本的編號，當你想要回復某一個版本時 git 就是透過它在紀錄中找到，不會重複。

如果想查看你做了幾個版本和詳細資料，可以使用 `git log` 指令
```
$ git log
```
![](https://i.imgur.com/B3jneyj.png)

---

> 菜哥：看完這些，流程總算清楚了啊
> 不過 Git 就只有這些東西嗎？有沒有更進階的呢？如果我不只想要紀錄版本，還想要修改、實驗一些半成品笑點、甚至放到網路上和別人一起寫笑話呢？


這一份基本指令給你對照，那我們底下來說更多 Git 的使用狀況吧

| Windows | 指令 | 操作  | 備註說明 |
| -------- | -------- | -------- | -------- |
| git init | 初始化目錄 |  | 開始版控，建立 `.git` 目錄，所有版控記錄都會在裡面 |
| git status | 查詢狀態 |  | 查詢確認當前檔案的狀況 |
| git add | 加入版控追蹤 | git add +`檔名` | 追蹤檔案加入至暫存區，從工作目錄加入至 staging |
| git commit | 創建一新版本 | git commit -m "訊息" | 新版本及 commit message |
| git log | 檢視 Commit 紀錄 |  | 可加 `--oneline` 簡短一行查看 |
| git diff | 查看差異 |  | 查看本次與上一回的差異 |
| git checkout | 回到某次 Commit 紀錄 | git checkout + `版本編碼` | git checkout master 回到最新狀態 |


### 第三步：Git 哪有這麼簡單，一些小問題

#### Q: 如果在 git add 之後又修改了那個檔案？
編輯內容並沒有再次被加到暫存區，得再次使用 git add 指令加至暫存區

#### Q: 一定要經過兩步驟才能存放到儲存區（Repository）？一定要輸入 commit 訊息？
要完成 commit 指令才算是完成整個流程，而 commit 都只會處理暫存區（Staging Area）裡的內容
* 預設一定要輸入訊息才能 commit，如不想輸入訊息可加上 `--allow-empty-message` 參數(通常不會這樣做)
* `git add -am "message"` 是合併 `git add` 和 `git commit` 兩者的好用指令

#### Q: 如何刪除檔案？
在 Git 裡，不管是刪除檔案或是變更檔名，對 Git 來說都是一種「修改」
1. 系統指令 `rm`，刪除檔案 X.html
```
$ rm X.html
```
查看會發現該檔案狀態為「deleted」，還需要把這次修改再加到暫存區
```
$ git status
On branch master
Changes not staged for commit:

	deleted:    X.html
```
2. 使用 `git rm` 指令，讓 Git 幫你完成。
完成後直接在暫存區了，不需要再自己 add 一次
```
$ git rm X.html
rm 'X.html'
```

3. 加上 `–cached` 參數
隱藏忽略的意思，把檔案從 Git 目錄移除，不再追蹤(非刪除)，因為系統的 `rm` 或是 `git rm` 指令，都會真的把這個檔案從工作目錄裡刪掉，如果只是想解除版控，可以加上這個參數
```
$ git rm X.html --cached
rm 'X.html'
```
X.html 的狀態從原本已經在目錄裡的 tracked 變成 Untracked 了


#### Q: 什麼時候應該要 Commit 啊？
* 完成一個「任務」的時候
* 下班的時候，可能還沒完全搞定任務，但至少先 Commit 今天進度，除了備份之外，也讓公司知道你今天有在努力工作(?)
* 你想要 Commit 的時候就可以
* 盡量細切 commit，把每個小功能做一次 commit

#### Q: 更改 Commit 紀錄，使用 --amend 參數
可以修改近期一次的 Commit Message
但改訊息就是修改了一次的歷史，**盡量不要在已經 Push 出去之後再修改**，可能會造成其它協作者困擾
```
$ git commit --amend -m "NEW Message"
```
把單一檔案追加到最後一次的 Commit，`--no-edit` 是指「我不要編輯 Commit 訊息」，所以就不會跳出 Vim 編輯器的視窗
```
$ git commit --amend --no-edit
```

#### Q: 用 git log 查詢特定 commit 紀錄
查詢某些人的 Commit，例如協作者名為「Meng」
```
$ git log --oneline --author="Meng22"
```
搜尋包含某文字的 commit：查詢 Commit 訊息有"hahaha"
```
$ git log --oneline --grep="hahaha"
```

#### Q: 如何邊緣化某些檔案
```
touch .gitignore   建立 .gitignore 檔案
vim .gitignore     編輯內容，哪些檔案不要放進版本控制
---

# 忽略名為text的檔案(檔名)
text.txt
*.log*  忽略
*.swp   忽略暫存檔

# 忽略 config 目錄下的 database.yml 檔案
config/database.yml

# 忽略所有 db 目錄下附檔名是 .sqlite3 的檔案
/db/*.sqlite3
```

#### Q: 當我拿到一個新專案的步驟？
1. 先加入版本控制 git init
2. 建立 `.gitignore` 裡面寫下排除需要忽略的檔案，`.gitignore` 這個檔案也需要加入版控喔
3. 用 `git add .` 加入檔案，因為是新增的檔案，不能直接用`git comiit -am` （他們並非修改，他們本身還不在暫存區）
4. 但如果是已經加入過、修改的檔案，可直接用上面那個合併指令

### 第四步：還有還有，來認識一下分支吧
在增加新功能、修正 Bug，或是想試一些新做法時，其實可以透過另外叫「branch」的東西，做一個分支來進行測試，等做完確認沒問題之後再合併回來，不會影響正在運行的功能

```
$ git branch　　      //印出目前這個專案有哪些分支
  dog          　　   //* 表示在哪個分支上
* master


$ git branch -v      //意思是--no-abbrev 不縮寫，給你最完整的分支資料
  dog    f95a13f init
* master f95a13f init
```

**假設我想新增一條名為 cat 的分支**
```
git branch cat    //新增分支cat
```
**分支改名**
完全不會影響檔案或目錄，使用的是 `-m `參數，把分支名稱由 cat 改成 tiger。另外，master 想改名也可以改喔！
```
git branch -m cat tiger
```
**想刪除分支，使用 `-d` 參數來刪除**
```
git branch -d tiger
Deleted branch tiger (was 08a6af4).
```
**做完啦！我要來合併分支**
當你做完東西，切回主要分支(通常是master)，輸入你要合併的分支名稱。
注意：所謂的 merge 並非真的指合併分支，合併是**合併「該分支所指向的那些 Commit」**
```
git merge tiger
```

#### Q: 當 Merge 合併時發生衝突（Conflict）
在 Merge 的時候，如果兩個分支內某個檔案內容有差異，這時候該怎麼辦呢？倒底要以哪一份為主？ Git 不知道，遇上這種情形也只能請你抬抬手，自己手動修改，才能留下需要的資料。
```
git merge bear
CONFLICT (add/add): Merge conflict in .gitignore
Auto-merging .gitignore
Automatic merge failed; fix conflicts and then commit the result.
```
這時候用 `git status` 查看，會看到 Unmerged paths
```
You have unmerged paths.

Unmerged paths:
  (use "git add <file>..." to mark resolution)
  ...
```

這時候需要人工手動修改（可使用 vim 介面），Git 已經幫你把有衝突的段落標記出來
* 上半部是 HEAD（>>>>>）也就是目前所在的主分支
* 中間用分隔線（======）區別
* 下面是被合併分支的內容（<<<<<）

修改完之後把檔案加到暫存區，再 Commit 一次
```
Changes not staged for commit:
    modified:   .gitignore
```

#### Q: 我剛剛 Commit 了，但我想要拿掉！
```
$ git reset
```

很多人誤會是重新設定，但 Reset 指令比較像是「前往」或「變成」
```
git reset HEAD~2  //我要變成兩個 Commit 之前的狀態
```
很難理解嗎？
假設 HEAD 和 MASTER 目前都是指向 `e12d8ef` 這個 Commit 上
```
git reset e12d8ef^  
git reset master^
git reset HEAD^     

//^代表前次，這些都是同個意思，表示回到前一次Commit

git reset e12d8ef^^  //往前兩次
git reset e12d8ef~5  //往前五次
```
Reset 指令可以搭配參數使用，有三種模式：
* `--mixed` 
預設，把暫存區的檔案丟掉，但不會動到工作目錄的檔案
* `--soft`
工作目錄跟暫存區的檔案都不會被丟掉，所以看起來就只有 HEAD 的移動
* `--hard`
工作目錄和暫存區的檔案都會丟掉。


---
> 菜哥：哇！真的很多有趣用法，Git 也太實用了吧，那要如何和別人用 Git 進行合作呢？

### 如何從本地放上 Github repository
1. 在 Github 上建立一個 repository
![](https://i.imgur.com/Jm3aBpx.png)
2. 建立後系統會提示你該怎麼做，將程式碼複製下來去 cmd 操作
![](https://i.imgur.com/BZSzARM.png)
3. 操作遠端和本地的溝通

```
#1 指定(-u)將 本地master 推到 origin的master
git push -u origin master

#2 推上本地commit
git push origin master 

#3 推上本地新建的分支
git push origin branch 分支名稱

#4 拉下遠端的 commit
git pull origin master 

```

### 額外補充：使用 Pull Request（PR）

#### **為什麼要使用 PR？**

比喻 Pull Request 過程像是我們在大學時教授出作業：
> 1. 以前助教會在課後幫同學補充上課內容和筆記，大家會在助教課抄寫一份筆記（fork）
> 2. 回家延伸內容及寫題目，完成後會讓助教先批改（發 Pull Request 給助教），由他確認內容沒有問題
> 3. 如需修正就再拿回來修正，一直到修改完成，助教才會收齊這些作業（merge）統一交給教授

而運用到軟體開發上，開發者拿到一項 issue 或工作，會在一個專屬他的分支上進行開發，然後完成新功能後需要將它合併到主要分支上，但就像前面說的
* master 分支需要維持穩定

大型專案不可能時常出問題，而且協作者太多也無法讓所有人有權限、都能拿到遠端的資料庫，因為「權限管理」而衍生出 Pull Request 功能。


#### **PR 主要功能**
* 通知：通知相關人員來檢查功能開發
* 討論：針對某一段 code 在底下進行有效討論，而不會發散
* 延伸功能：貢獻開源專案

而有錯誤或需修正的地方，要求的修改 (follow-up commit) 會標示在這頁


#### **PR 流程**
1. 先 Fork 一份原專案到自己的 GitHub 底下，你就有完整的權限，想怎麼改就怎麼改
2. 改完後，先推回（Push）你自己帳號的專案
3. 然後發 Pull Request 通知原作者知道你有做事，請他看一下。如果他認為 OK，會決定把你這些修改合併（Merge）到他的原專案

---

### 參考資料
1. [Git 基礎 - 取得一個 Git 倉儲](https://git-scm.com/book/zh-tw/v2/Git-%E5%9F%BA%E7%A4%8E-%E5%8F%96%E5%BE%97%E4%B8%80%E5%80%8B-Git-%E5%80%89%E5%84%B2)
2. 如果想了解 `.git` 資料夾裡面有什麼請點[連結](https://git-scm.com/book/zh-tw/v2/Git-Internals-Plumbing-and-Porcelain#ch10-git-internals)
3. [工作區、暫存區與儲存庫](https://gitbook.tw/chapters/using-git/working-staging-and-repository.html)
4. [Git Gud: The Working Tree, Staging Area, and Local Repo](https://medium.com/@lucasmaurer/git-gud-the-working-tree-staging-area-and-local-repo-a1f0f4822018)
5. [為自己學 Git](https://gitbook.tw/)
6. [與其它開發者的互動 - 使用 Pull Request](https://gitbook.tw/chapters/github/pull-request.html)、[什麼是 Pull Request?](https://medium.com/@shoujhengduan/%E4%BB%80%E9%BA%BC%E6%98%AF-pull-request-b476ee3e0217)