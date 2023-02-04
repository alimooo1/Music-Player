let songName = document.querySelector(".song-name");
let artistName = document.querySelector(".artist-name");
let coverImage = document.querySelector("img");
const backward = document.querySelectorAll("i")[0];
let playPause = document.querySelectorAll("i")[1];
const forward = document.querySelectorAll("i")[2];
const timeline = document.querySelector(".time-line");
const filler = document.querySelector(".filler");
let audio = document.querySelector("audio");
let time = document.querySelector(".song-time");
let currentTime = document.querySelector(".current-time");
const body = document.querySelector("body");

let songs = [
  {
    id: 0,
    name: "Believer",
    artist: "Imagine Dragons",
    cover: "images/Imagine-Dragons-Believer-art.jpg",
    src: "songs/01 Believer.mp3",
    background: "videos/believergif.gif",
  },
  {
    id: 1,
    name: "Goodbyes",
    artist: "Post Malone",
    cover: "images/Post_Malone_-_Hollywood's_Bleeding.png",
    src: "songs/2_5323735572550780476.mp3",
    background: "videos/goodbyesgif.gif",
  },
  {
    id: 2,
    name: "Paid My Dues",
    artist: "NF",
    cover: "images/NF_Clouds_(The_Mixtape)_album_cover.png",
    src: "songs/10 PAID MY DUES.mp3",
    background: "videos/nfgif.gif",
  },
  {
    id: 3,
    name: "Blinding Lights",
    artist: "The Weeknd",
    cover: "images/The_Weeknd_-_Blinding_Lights.png",
    src: "songs/The Weeknd - Blinding Lights.mp3",
    background: "videos/blindinglightgif.gif",
  },
  {
    id: 4,
    name: "GraveYard",
    artist: "Halsey",
    cover: "images/Halsey_-_Graveyard.png",
    src: "songs/Halsey - Graveyard (2019) MELOVAZ.NET.mp3",
    background: "videos/graveyardgif.gif",
  },
  {
    id: 5,
    name: "What I've Done",
    artist: "Linkin Park",
    cover: "images/Minutes_to_Midnight_cover.jpg",
    src: "songs/07 What I've Done.mp3",
    background: "videos/whativedonegif.gif",
  },
];

let songIndex = 0;
let kornometer;

playPause.addEventListener("click", playPauseSong);
forward.addEventListener("click", nextMusic);
backward.addEventListener("click", previousSong);
timeline.addEventListener("click", selectTime);

function playPauseSong() {
  if (playPause.classList.contains("fa-circle-play")) {
    playPause.classList.remove("fa-circle-play");
    playPause.classList.add("fa-circle-pause");
    audio.play();
    kornometer = setInterval(currentTimeHandler, 1000);
  } else {
    playPause.classList.remove("fa-circle-pause");
    playPause.classList.add("fa-circle-play");
    audio.pause();
    clearInterval(kornometer);
  }
}

function songsData() {
  coverImage.setAttribute("src", songs[songIndex].cover);
  songName.innerHTML = songs[songIndex].name;
  artistName.innerHTML = songs[songIndex].artist;
  audio.setAttribute("src", songs[songIndex].src);
  audio.addEventListener("loadeddata", function () {
    time.innerHTML = convertTime(audio.duration);
  });
  currentTime.innerHTML = "00:00";
  body.style.backgroundImage = "url(" + songs[songIndex].background + ")";
  if (playPause.classList.contains("fa-circle-pause")) {
    playPauseSong();
  }
  filler.style.left = "-100%";
}

function nextMusic() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  songsData();
}

function previousSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  songsData();
}

function currentTimeHandler() {
  currentTime.innerHTML = convertTime(audio.currentTime);
  fillerHandler();
  if (audio.duration === audio.currentTime) {
    clearInterval(kornometer);
  }
}

function fillerHandler() {
  let total = audio.currentTime;
  const songTime = audio.duration;
  let percent = 100 - (total / songTime) * 100;
  filler.style.left = "-" + percent + "%";
}

function convertTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let second = Math.floor(seconds % 60);
  if (second < 10) {
    second = "0" + second;
  }
  return "0" + minutes + ":" + second;
}

function selectTime(event) {
  let start = (document.body.clientWidth - 456) / 2 + (456 * 7.5) / 100;
  let current = event.clientX - start;
  let percent = 100 - (current / timeline.offsetWidth) * 100;
  filler.style.left = "-" + percent + "%";
  audio.currentTime = ((100 - percent) * audio.duration) / 100;
  currentTime.innerHTML = convertTime(audio.currentTime);
}
