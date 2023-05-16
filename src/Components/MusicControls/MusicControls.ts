const [backward, playPause, forward] = document.querySelectorAll("i");
const audio = document.querySelector("audio") as HTMLAudioElement;

import { MusicTimeHandler } from "../MusicTimeHandler/MusicTimeHandler";
import { MusicPlayer } from "../MusicPlayer/MusicPlayer";

class MusicControls {
  private _timeHandler: MusicTimeHandler;
  private _musicPlayer: MusicPlayer;

  constructor(musicPlayer: MusicPlayer) {
    this._musicPlayer = musicPlayer;
    this._timeHandler = new MusicTimeHandler();
  }

  public playPauseHandler() {
    if (playPause.classList.contains("fa-circle-play")) {
      this.playSong();
    } else {
      this.pauseSong();
    }
  }

  public playSong() {
    playPause.classList.remove("fa-circle-play");
    playPause.classList.add("fa-circle-pause");
    audio.play();
    this._timeHandler.setInterval(
      this._timeHandler.currentTimeHandler.bind(this._timeHandler),
      1000
    );
  }

  public pauseSong() {
    playPause.classList.remove("fa-circle-pause");
    playPause.classList.add("fa-circle-play");
    audio.pause();
    this._timeHandler.clearInterval();
  }

  public nextMusic() {
    this._musicPlayer.songIndex++;
    if (this._musicPlayer.songIndex >= this._musicPlayer.songs.length) {
      this._musicPlayer.songIndex = 0;
    }
    this._musicPlayer.setSongData();
  }

  public previousSong() {
    this._musicPlayer.songIndex--;
    if (this._musicPlayer.songIndex < 0) {
      this._musicPlayer.songIndex = this._musicPlayer.songs.length - 1;
    }
    this._musicPlayer.setSongData();
  }

  public initialize() {
    playPause.addEventListener("click", this.playPauseHandler.bind(this));
    forward.addEventListener("click", this.nextMusic.bind(this));
    backward.addEventListener("click", this.previousSong.bind(this));
  }
}

export { MusicControls };
