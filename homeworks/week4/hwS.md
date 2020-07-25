# 挑戰題心得
## 挑戰題
寫一個 node.js 的程式並串接 Twitch API，接收一個參數是遊戲名稱，輸出那個遊戲底下最受歡迎的前 200 個實況名稱與 id。
- 程式碼連結： [挑戰題](twitch.js)

- 範例 
```node twitch.js "Apex Legends"```

![](https://i.imgur.com/m7T0LWM.png)




## 超級挑戰題
這週的作業我們都是使用 request 這個 library 來發送 request，但其實 request 這個套件也是使用 Node.js 原生提供的 library。因此，這週的超級挑戰題就是讓你試試看能否不用 request，只用 Node.js 內建的套件來發出 request，並且改寫 hw2，改寫成只用原生的 library。
- 程式碼連結： [超級挑戰題](hwS2.js)

