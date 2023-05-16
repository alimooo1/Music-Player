import { MusicTimeHandler } from "../MusicTimeHandler/MusicTimeHandler";
import { Song, getSongs } from "../GetSongs/GetSongs";
import { MusicControls } from "../MusicControls/MusicControls";

const songName = document.querySelector(".song-name") as HTMLDivElement;
const artistName = document.querySelector(".artist-name") as HTMLDivElement;
const coverImage = document.querySelector("img") as HTMLImageElement;
const playPause = document.querySelectorAll("i")[1];
const timeline = document.querySelector(".time-line") as HTMLDivElement;
const filler = document.querySelector(".filler") as HTMLDivElement;
const audio = document.querySelector("audio") as HTMLAudioElement;
const time = document.querySelector(".song-time") as HTMLDivElement;
const currentTime = document.querySelector(".current-time") as HTMLDivElement;
const body = document.querySelector("body") as HTMLBodyElement;
const playerBox = document.querySelector(".player-box") as HTMLDivElement;
const content = document.querySelector(".content") as HTMLDivElement;

class MusicPlayer {
  public songIndex = 0;
  private _timeHandler: MusicTimeHandler;
  public songs: Song[] = [];
  private _musicControls: MusicControls;

  constructor() {
    this._timeHandler = new MusicTimeHandler();
    this._musicControls = new MusicControls(this);
  }

  private _fetchSongs = async () => {
    return await getSongs();
  };

  public setSongData() {
    coverImage.setAttribute("src", this.songs[this.songIndex].cover);
    songName.innerText = this.songs[this.songIndex].name;
    artistName.innerText = this.songs[this.songIndex].artist;
    audio.setAttribute("src", this.songs[this.songIndex].src);
    const convertedTime = this._timeHandler.convertTime.bind(this._timeHandler);
    audio.addEventListener("loadeddata", function () {
      time.innerText = convertedTime(audio.duration);
    });
    currentTime.innerText = "00:00";
    body.style.backgroundImage = `url(${
      this.songs[this.songIndex].background
    })`;
    if (playPause.classList.contains("fa-circle-pause")) {
      this._musicControls.playPauseHandler();
    }
    filler.style.left = "-100%";
  }

  public async run() {
    this.songs = await this._fetchSongs();
    this._musicControls.initialize();

    document.body.style.backgroundImage = "url('../videos/visulizegif.gif')";
    timeline.addEventListener(
      "click",
      this._timeHandler.selectTime.bind(this._timeHandler)
    );
    playerBox.addEventListener("click", firstShowHandler);
    playerBox.addEventListener("mouseover", hoverHandler);
    playerBox.addEventListener("mouseout", unHoverHandler);
    playerBox.addEventListener("animationend", animationHandler);
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

export { MusicPlayer };
