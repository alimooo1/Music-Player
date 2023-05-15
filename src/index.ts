const songName = document.querySelector(".song-name") as HTMLDivElement;
const artistName = document.querySelector(".artist-name") as HTMLDivElement;
const coverImage = document.querySelector("img") as HTMLImageElement;
const [backward, playPause, forward] = document.querySelectorAll("i");
const timeline = document.querySelector(".time-line") as HTMLDivElement;
const filler = document.querySelector(".filler") as HTMLDivElement;
const audio = document.querySelector("audio") as HTMLAudioElement;
const time = document.querySelector(".song-time") as HTMLDivElement;
const currentTime = document.querySelector(".current-time") as HTMLDivElement;
const body = document.querySelector("body") as HTMLBodyElement;
const playerBox = document.querySelector(".player-box") as HTMLDivElement;
const content = document.querySelector(".content") as HTMLDivElement;

let songs = [
  {
    id: 0,
    name: "Believer",
    artist: "Imagine Dragons",
    cover: "../images/Imagine-Dragons-Believer-art.jpg",
    src: "../songs/01 Believer.mp3",
    background: "../videos/believergif.gif",
  },
  {
    id: 1,
    name: "Goodbyes",
    artist: "Post Malone",
    cover: "../images/Post_Malone_-_Hollywood's_Bleeding.png",
    src: "../songs/2_5323735572550780476.mp3",
    background: "../videos/goodbyesgif.gif",
  },
  {
    id: 2,
    name: "Paid My Dues",
    artist: "NF",
    cover: "../images/NF_Clouds_(The_Mixtape)_album_cover.png",
    src: "../songs/10 PAID MY DUES.mp3",
    background: "../videos/nfgif.gif",
  },
  {
    id: 3,
    name: "Blinding Lights",
    artist: "The Weeknd",
    cover: "../images/The_Weeknd_-_Blinding_Lights.png",
    src: "../songs/The Weeknd - Blinding Lights.mp3",
    background: "../videos/blindinglightgif.gif",
  },
  {
    id: 4,
    name: "GraveYard",
    artist: "Halsey",
    cover: "../images/Halsey_-_Graveyard.png",
    src: "../songs/Halsey - Graveyard (2019) MELOVAZ.NET.mp3",
    background: "../videos/graveyardgif.gif",
  },
  {
    id: 5,
    name: "What I've Done",
    artist: "Linkin Park",
    cover: "../images/Minutes_to_Midnight_cover.jpg",
    src: "../songs/07 What I've Done.mp3",
    background: "../videos/whativedonegif.gif",
  },
];

class MusicPlayer {
  private static _songIndex = 0;
  private static _kornometer: any;

  private static _playPauseHandler() {
    if (playPause.classList.contains("fa-circle-play")) {
      this._playSong();
    } else {
      this._pauseSong();
    }
  }

  private static _playSong() {
    playPause.classList.remove("fa-circle-play");
    playPause.classList.add("fa-circle-pause");
    audio.play();
    this._kornometer = setInterval(this._currentTimeHandler, 1000);
  }

  private static _pauseSong() {
    playPause.classList.remove("fa-circle-pause");
    playPause.classList.add("fa-circle-play");
    audio.pause();
    clearInterval(this._kornometer);
  }

  private static _setSongData() {
    coverImage.setAttribute("src", songs[this._songIndex].cover);
    songName.innerText = songs[this._songIndex].name;
    artistName.innerText = songs[this._songIndex].artist;
    audio.setAttribute("src", songs[this._songIndex].src);
    const convertedTime = this._convertTime(audio.duration);
    audio.addEventListener("loadeddata", function () {
      time.innerText = convertedTime;
    });
    currentTime.innerText = "00:00";
    body.style.backgroundImage = `url(${songs[this._songIndex].background})`;
    if (playPause.classList.contains("fa-circle-pause")) {
      this._playPauseHandler();
    }
    filler.style.left = "-100%";
  }

  private static _nextMusic() {
    this._songIndex++;
    if (this._songIndex >= songs.length) {
      this._songIndex = 0;
    }
    this._setSongData();
  }

  private static _previousSong() {
    this._songIndex--;
    if (this._songIndex < 0) {
      this._songIndex = songs.length - 1;
    }
    this._setSongData();
  }

  private static _currentTimeHandler() {
    currentTime.innerText = this._convertTime(audio.currentTime);
    this._fillerHandler();
    if (audio.duration === audio.currentTime) {
      clearInterval(this._kornometer);
    }
  }

  private static _fillerHandler() {
    const total = audio.currentTime;
    const songTime = audio.duration;
    const percent = 100 - (total / songTime) * 100;
    filler.style.left = "-" + percent + "%";
  }

  private static _convertTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    let second: number | string = Math.floor(seconds % 60);
    if (second < 10) {
      second = "0" + second;
    }
    return "0" + minutes + ":" + second;
  }

  private static _selectTime(event: MouseEvent) {
    const start = (document.body.clientWidth - 456) / 2 + (456 * 7.5) / 100;
    const current = event.clientX - start;
    const percent = 100 - (current / timeline.offsetWidth) * 100;
    filler.style.left = "-" + percent + "%";
    audio.currentTime = ((100 - percent) * audio.duration) / 100;
    currentTime.innerHTML = this._convertTime(audio.currentTime);
  }

  private static _hoverHandler() {
    playerBox.style.backgroundColor = "rgb(45, 118, 187)";
    playerBox.style.cursor = "pointer";
    playerBox.style.boxShadow =
      "1px 1px 2px black, 0 0 5px rgb(13, 44, 5), 0 0 5px rgba(1, 139, 30, 0.614)";
  }

  private static _unHoverHandler() {
    playerBox.style.backgroundColor = "rgba(121, 240, 168,0)";
    playerBox.style.border = "4px solid rgb(45, 118, 187)";
    playerBox.style.cursor = "default";
    playerBox.style.boxShadow = "";
  }

  private static _firstShowHandler() {
    playerBox.style.backgroundColor = "rgba(237, 255, 242,0)";
    playerBox.style.border = "2px solid rgb(45, 118, 187)";
    playerBox.style.boxShadow = "";
    playerBox.style.animation = "first-show 3s";
    playerBox.removeEventListener("mouseover", this._hoverHandler);
    playerBox.removeEventListener("mouseout", this._unHoverHandler);
    playerBox.removeEventListener("click", this._firstShowHandler);
    playerBox.style.cursor = "default";
    playerBox.style.width = "456px";
    playerBox.style.height = "80%";
    playerBox.style.transition = "all 1s";
    content.style.animation = "fade-in 2s";
    playerBox.style.boxShadow = "";
  }

  private static _animationHandler() {
    playerBox.style.border = "none";
    playerBox.style.boxShadow = "";
    body.style.backgroundImage = "url('../videos/believergif.gif')";
    playerBox.style.backgroundColor = "rgba(90, 133, 105, 0.178)";
    content.style.display = "block";
    content.style.visibility = "visible";
    content.style.opacity = "1";
  }

  public static Run() {
    playPause.addEventListener("click", this._playPauseHandler);
    forward.addEventListener("click", this._nextMusic);
    backward.addEventListener("click", this._previousSong);
    timeline.addEventListener("click", this._selectTime);
    playerBox.addEventListener("click", this._firstShowHandler);
    playerBox.addEventListener("mouseover", this._hoverHandler);
    playerBox.addEventListener("mouseout", this._unHoverHandler);
    playerBox.addEventListener("animationend", this._animationHandler);
  }
}

MusicPlayer.Run();
