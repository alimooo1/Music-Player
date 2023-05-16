const timeline = document.querySelector(".time-line") as HTMLDivElement;
const filler = document.querySelector(".filler") as HTMLDivElement;
const audio = document.querySelector("audio") as HTMLAudioElement;
const currentTime = document.querySelector(".current-time") as HTMLDivElement;

export class MusicTimeHandler {
  private _kornometer: number = 0;

  public setInterval = (Task: Function, time: number) => {
    this._kornometer = window.setInterval(Task.bind(this), time);
  };

  public clearInterval = () => {
    clearInterval(this._kornometer);
  };

  public currentTimeHandler() {
    currentTime.innerText = this.convertTime(audio.currentTime);
    this._fillerHandler();
    if (audio.duration === audio.currentTime) {
      clearInterval(this._kornometer);
    }
  }

  private _fillerHandler() {
    const total = audio.currentTime;
    const songTime = audio.duration;
    const percent = 100 - (total / songTime) * 100;
    filler.style.left = "-" + percent + "%";
  }

  public convertTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    let second: number | string = Math.floor(seconds % 60);
    if (second < 10) {
      second = "0" + second;
    }
    return "0" + minutes + ":" + second;
  }

  public selectTime(event: MouseEvent) {
    const start = (document.body.clientWidth - 456) / 2 + (456 * 7.5) / 100;
    const current = event.clientX - start;
    const percent = 100 - (current / timeline.offsetWidth) * 100;
    filler.style.left = "-" + percent + "%";
    audio.currentTime = ((100 - percent) * audio.duration) / 100;
    currentTime.innerHTML = this.convertTime(audio.currentTime);
  }
}
