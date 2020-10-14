/* eslint-disable  arrow-body-style */
const url = 'https://api.twitch.tv/kraken';
const clientID = '0n4il3nmibawzxq23hqdbid338v15p';
const template = `<img src="$banner" onerror="if (this.src != './default.jpg') this.src = './default.jpg';">
  <a href="$url"></a>
  <div class="itemInfo">
    <div class="itemAvator">
      <img src="$logo" onerror="if (this.src != 'error.jpg') this.src = './default.jpg';">
    </div>
    <div class="itemDetail">
      <h3>$status</h3>
      <p>$username</p>
    </div>
  </div>`;

const body = document.querySelector('body');
const navbar = document.querySelector('.navbar');
const gameList = document.querySelector('.gameList');
const btnShowList = document.querySelector('.btn-show-list');
const btnMore = document.querySelector('.btn-more');
let recentGame;
let streamNum = 0;

// add navbar items
function setNavbar(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const navItem = document.createElement('div');
    navItem.classList.add('navItem');
    navItem.innerText = arr[i].game.name;
    navbar.appendChild(navItem);
  }
}

// add stream item
function setStreamItem(arr) {
  streamNum += arr.length;
  for (let i = 0; i < arr.length; i += 1) {
    const gameData = arr[i];
    const streamItem = document.createElement('div');
    const content = template
      .replace('$url', gameData.channel.url)
      .replace('$banner', gameData.preview.medium)
      .replace('$logo', gameData.channel.logo)
      .replace('$status', gameData.channel.status)
      .replace('$username', gameData.channel.name);
    streamItem.classList.add('streamItem');
    streamItem.innerHTML = content;
    gameList.appendChild(streamItem);
  }
}

// for layout
function addEmptyItem(num) {
  for (let i = 0; i < num; i += 1) {
    const emptyItem = document.createElement('div');
    emptyItem.classList.add('streamItem-empty');
    gameList.appendChild(emptyItem);
  }
}
function removeEmptyItem() {
  const elements = document.querySelectorAll('.streamItem-empty');
  for (let i = 0; i < elements.length; i += 1) {
    gameList.removeChild(elements[i]);
  }
}

// call API and set streams
function updateStreams(gameName) {
  const game = encodeURIComponent(gameName);
  const offset = streamNum;
  fetch(`${url}/streams?game=${game}&limit=20&offset=${offset}`, {
    method: 'GET',
    headers: {
      'Client-ID': clientID,
      Accept: 'application/vnd.twitchtv.v5+json',
    },
    mode: 'cors',
  }).then((response) => {
    return response.json();
  }).then((responseData) => {
    removeEmptyItem();
    const streamList = responseData.streams;
    setStreamItem(streamList);
    addEmptyItem(2);
  }).catch((err) => {
    console.log(err);
  });
}

// show top 5 games
function getTopGame() {
  fetch(`${url}/games/top?limit=5`, {
    method: 'GET',
    headers: {
      'Client-ID': clientID,
      Accept: 'application/vnd.twitchtv.v5+json',
    },
    mode: 'cors',
  }).then((response) => {
    return response.json();
  }).then((responseData) => {
    const games = responseData.top;
    setNavbar(games);

    // select the first item
    document.querySelector('.navItem').classList.add('select');
    recentGame = document.querySelector('.navItem').innerText;
    updateStreams(recentGame);
  }).catch((err) => {
    console.log(err);
  });
}

getTopGame();

// click
btnShowList.addEventListener('click', () => {
  gameList.scrollIntoView();
});

btnMore.addEventListener('click', () => {
  updateStreams(recentGame);
});

body.addEventListener('click', (e) => {
  // navbar
  if (e.target.closest('.navItem')) {
    recentGame = e.target.closest('.navItem').innerText;
    streamNum = 0;
    gameList.innerHTML = '';
    updateStreams(recentGame);

    // update the recent navbar
    const navItems = document.querySelectorAll('.navItem');
    for (let i = 0; i < navItems.length; i += 1) {
      if (navItems[i] === e.target) {
        navItems[i].classList.add('select');
      } else if (e.target.classList.contains('navItem')) {
        navItems[i].classList.remove('select');
      }
    }
  }

  // item
  if (e.target.closest('.streamItem')) {
    const streamUrl = e.target.closest('.streamItem').querySelector('a').href;
    window.location.href = streamUrl;
  }
});
