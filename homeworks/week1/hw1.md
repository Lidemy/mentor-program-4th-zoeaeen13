## 交作業流程

### 上完課了，如何設置作業專案？
1. 創建個人課程專案

首先在課程影片上方有一個網址，點這個 GitHuba classroom 連結，接受並登入 Github 帳號後自動幫你創建一個 repository，專案名稱會是這堂課「mentor-program-4th」加上你的 Github 名稱

![](https://i.imgur.com/OfBAGtM.png)

簡單來說，就是一個 Lidemy 的課程群組，按下連結就可以加入這個大群。一開始它幫你會拷貝作業模板，創建成一份個人專案，你能夠在這個群組裡搜尋，查看誰是大家收藏的範本作品，作為改進的依據。

![](https://i.imgur.com/1R81Xh2.png)


2. 當遠端專案建好，就拉到本地

你會得到一個專案的 clone 連結，在終端機上使用 `git clone` 指令，就能將遠端伺服器的資料抓取下來，本地會建立一個 `mentor0program-4th-zoeaeen13` 資料夾

![](https://i.imgur.com/V9vfHHj.png)
```
$ git clone 'https://github.com/Lidemy/....git'
```
![](https://i.imgur.com/wGlOyG6.png)


3. 進入本地資料夾，建立新分支⭐


重要的一步，因為寫作業需要在分支裡面寫，我們都知道主分支需要維持穩定，一般不會輕易動到，當然也不會直接在 master 進行
```
#建一個名為week1的分支
$ git branch week

#切換到week1
$ git checkout week1
```
![](https://i.imgur.com/YjOk4Yq.png)

4. 完成設置後，來寫作業吧


基本上就可以直接開始寫啦，我個人是會先在 hackmd 上把大部分內容寫好，再用 VS Code 開啟檔案，貼到上面進行最後排版，然後將完成作業提交進行版控。


### 作業寫完了，我該怎麼交呢？
寫作業過程中的 Git 操作這裡就不多說，可以參考我的 [hw4.md](hw4.md) 了解如何進行版本控制，這邊假定已經完成作業，也全部都 commit 了，接下來要怎麼推上 Github 上給助教批改呢？

1. 準備推上遠端

推之前，再一次使用 `git status` 確認工作目錄裡面是乾淨、沒有完成到一半的東西
![](https://i.imgur.com/TyDJKbr.png)

2. 繼續停留在 week1 分支，現在要做的就是使用下方指令把**目前分支**推上去
```
$ git push origin 分支名稱

$ git push origin week1  ->我們要做的事把 week1 分支推上去
```
這個指令會把你手邊的 week1 分支的內容，推一份到 origin 這個地方， origin 可能是 GitHub、GitLab 或是公司內部的 Git 伺服器，如果找不到這個分支，它會在 origin 這個地方形成一個同名的分支（week1），也就是我們要的，將本地分支內容推到遠端。

特別去查了一下`git push`，原來 push 指令的完整型態是長這樣
```
$ git push origin master:master
```

意思就是「把本地的 master 分支的內容，推一份到 origin 上，並且在 origin 上建立一個 master 分支」，如果把指令調整一下：
```
$ git push origin master:today
```
意思就會變成「把本地的 master 分支的內容，推一份到 origin 上，並且在 origin 上建立一個 today 分支」


3. Pull Request

將本地分支推上遠端後，系統會提示你可以「Compare & pull request」如果沒有也沒關係，自己開一個 pull request 也可以，記得確認是要將 week1 合併到 master

![](https://i.imgur.com/kCm5xXU.png)


4. 提交到交作業列表

完成之後，將 pull request 連結貼到作業系統上，會看到自己的提交及幫你改的助教，當他改完並確認沒有問題之後就會把你的 week1 分支 merge 到 master 主分支，並刪掉你的 week1 分支 

![](https://i.imgur.com/cA71ygi.png)

![](https://i.imgur.com/hCBydix.png)

5. 本地要和遠端同步


最後一步，現在我們知道遠端已經完成本週作業批改、也更新了主分支，但是本地內容還是舊的！
於是我們在本地切回主分支，使用 `git pull origin` 指令更新 master，確認更新完就可以刪掉本地的 week1 分支，這麼一來遠端和本地就同步了！

```
$ git checkout master
#切回主分支

$ git pull origin master
#更新本地端 master

$ git branch -d week1
#刪除本地分支week1
```

---
> 補充：git clone、git fetch 跟 git pull 這三個指令有什麼不同？

#### git clone
會把線上的專案，「整個」複製一份到你的電腦裡，並且在你的電腦裡建立相對應的標案及目錄
* 只會在一開始的時候使用
* clone 之後要再更新的話，通常是執行 git fetch 或 git pull 

#### git fetch
遠端節點叫 origin，當執行 git fetch 指令，Git 會比對本機與遠端專案的差別，會「下載 origin 上面有但我本機目前還沒有」的內容下來，並且在本地端形成相對應的分支。

* fetch 指令只做下載，不會進行合併

#### git pull
做的事情跟 fetch 是一樣的，差別只在於 fetch 只有把檔案抓下來，但 pull 不只抓下來，還會順便進行合併
* git pull 其實就等於 git fetch 加上 merge 指令

參考資料：[為你自己學 Git](https://gitbook.tw/interview)

