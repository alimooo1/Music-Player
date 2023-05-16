import "./style.scss";
import { getSongs, Song } from "./Components/GetSongs/GetSongs";
import { MusicTimeHandler } from "./Components/MusicTimeHandler/MusicTimeHandler";

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

let songs: Song[] = [];

(async function fetchSongs() {
  songs = await getSongs();
})();

class MusicPlayer {
  protected static _songIndex = 0;
  protected static _timeHandler = new MusicTimeHandler();

  private static _playPauseHandler() {
    if (playPause.classList.contains("fa-circle-play")) {
      MusicControls._playSong();
    } else {
      MusicControls._pauseSong();
    }
  }

  // private static _playSong() {
  //   playPause.classList.remove("fa-circle-play");
  //   playPause.classList.add("fa-circle-pause");
  //   audio.play();
  //   this._timeHandler.setInterval(
  //     this._timeHandler.currentTimeHandler.bind(this._timeHandler),
  //     1000
  //   );
  // }

  // private static _pauseSong() {
  //   playPause.classList.remove("fa-circle-pause");
  //   playPause.classList.add("fa-circle-play");
  //   audio.pause();
  //   this._timeHandler.clearInterval();
  // }

  protected static _setSongData() {
    coverImage.setAttribute("src", songs[this._songIndex].cover);
    songName.innerText = songs[this._songIndex].name;
    artistName.innerText = songs[this._songIndex].artist;
    audio.setAttribute("src", songs[this._songIndex].src);
    const convertedTime = this._timeHandler.convertTime.bind(this);
    audio.addEventListener("loadeddata", function () {
      time.innerText = convertedTime(audio.duration);
    });
    currentTime.innerText = "00:00";
    body.style.backgroundImage = `url(${songs[this._songIndex].background})`;
    if (playPause.classList.contains("fa-circle-pause")) {
      this._playPauseHandler();
    }
    filler.style.left = "-100%";
  }

  // private static _nextMusic() {
  //   this._songIndex++;
  //   if (this._songIndex >= songs.length) {
  //     this._songIndex = 0;
  //   }
  //   this._setSongData();
  // }

  // private static _previousSong() {
  //   this._songIndex--;
  //   if (this._songIndex < 0) {
  //     this._songIndex = songs.length - 1;
  //   }
  //   this._setSongData();
  // }

  public static Run() {
    document.body.style.backgroundImage = "url('../videos/visulizegif.gif')";
    playPause.addEventListener("click", this._playPauseHandler.bind(this));
    forward.addEventListener("click", MusicControls._nextMusic.bind(this));
    backward.addEventListener("click", MusicControls._previousSong.bind(this));
    timeline.addEventListener("click", this._timeHandler.selectTime.bind(this));
    playerBox.addEventListener("click", firstShowHandler);
    playerBox.addEventListener("mouseover", hoverHandler);
    playerBox.addEventListener("mouseout", unHoverHandler);
    playerBox.addEventListener("animationend", animationHandler);
  }
}

class MusicControls extends MusicPlayer {
  public static _playSong() {
    playPause.classList.remove("fa-circle-play");
    playPause.classList.add("fa-circle-pause");
    audio.play();
    this._timeHandler.setInterval(
      this._timeHandler.currentTimeHandler.bind(this._timeHandler),
      1000
    );
  }

  public static _pauseSong() {
    playPause.classList.remove("fa-circle-pause");
    playPause.classList.add("fa-circle-play");
    audio.pause();
    this._timeHandler.clearInterval();
  }

  public static _nextMusic() {
    this._songIndex++;
    if (this._songIndex >= songs.length) {
      this._songIndex = 0;
    }
    this._setSongData();
  }

  public static _previousSong() {
    this._songIndex--;
    if (this._songIndex < 0) {
      this._songIndex = songs.length - 1;
    }
    this._setSongData();
  }
}

function hoverHandler() {
  playerBox.style.backgroundColor = "rgb(45, 118, 187)";
  playerBox.style.cursor = "pointer";
  playerBox.style.boxShadow =
    "1px 1px 2px black, 0 0 5px rgb(13, 44, 5), 0 0 5px rgba(1, 139, 30, 0.614)";
}

function unHoverHandler() {
  playerBox.style.backgroundColor = "rgba(121, 240, 168,0)";
  playerBox.style.border = "4px solid rgb(45, 118, 187)";
  playerBox.style.cursor = "default";
  playerBox.style.boxShadow = "";
}

function firstShowHandler() {
  playerBox.style.backgroundColor = "rgba(237, 255, 242,0)";
  playerBox.style.border = "2px solid rgb(45, 118, 187)";
  playerBox.style.boxShadow = "";
  playerBox.style.animation = "first-show 3s";
  playerBox.removeEventListener("mouseover", hoverHandler);
  playerBox.removeEventListener("mouseout", unHoverHandler);
  playerBox.removeEventListener("click", firstShowHandler);
  playerBox.style.cursor = "default";
  playerBox.style.width = "456px";
  playerBox.style.height = "80%";
  playerBox.style.transition = "all 1s";
  content.style.animation = "fade-in 2s";
  playerBox.style.boxShadow = "";
}

function animationHandler() {
  playerBox.style.border = "none";
  playerBox.style.boxShadow = "";
  body.style.backgroundImage = "url('../videos/believergif.gif')";
  playerBox.style.backgroundColor = "rgba(90, 133, 105, 0.178)";
  content.style.display = "block";
  content.style.visibility = "visible";
  content.style.opacity = "1";
}

MusicPlayer.Run();

export { MusicPlayer };
