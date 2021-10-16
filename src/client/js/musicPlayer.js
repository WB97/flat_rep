const play = document.querySelector("#play");
const name = document.querySelector("#name");
const recent_volume = document.querySelector("#volume");
const volume_show = document.querySelector("#volume_show");
const volume_bar = document.querySelector("#volume_bar");
const slider = document.querySelector("#duration_silder");
const track_image = document.querySelector("#track_image");
const present = document.querySelector("#present");
const total = document.querySelector("#total");
const artist = document.querySelector("#artist");
const audio = document.querySelector("#audio_page");
const main = document.querySelector(".main-player");

let timer;
let autoplay = 0;
const { id } = main.dataset;

const handlePlay = (e) => {
  if (audio.paused) {
    audio.play();
    play.innerHTML = '<i class="fa fa-pause"></i>';
  } else {
    audio.pause();
    play.innerHTML = '<i class="fa fa-play"></i>';
  }
};

const handlePushPlaylist = (e) => {
  fetch(`/api/musics/${id}/pushPlaylist`, { method: "POST" });
};

const handleVolume = () => {
  volume_show.innerText = volume_bar.value;
  audio.volume = volume_bar.value / 100;
};

play.addEventListener("click", handlePlay);
audio.addEventListener("play", handlePushPlaylist);
window.addEventListener("load", (e) => {
  audio.volume = 0.5;
});
volume_bar.addEventListener("input", handleVolume);
