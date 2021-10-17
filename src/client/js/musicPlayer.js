const play = document.querySelector("#play");
const name = document.querySelector("#name");
const recent_volume = document.querySelector("#volume");
const volume_show = document.querySelector("#volume_show");
const volume_bar = document.querySelector("#volume_bar");
const slider = document.querySelector("#duration_silder");
const track_image = document.querySelector(".playpage_track_imag");
const present = document.querySelector("#present");
const total = document.querySelector("#total");
const artist = document.querySelector("#artist");
const audio = document.querySelector("#audio_page");
const main = document.querySelector(".main-player");
const like_icon = document.querySelector(".like_icon");

let timer;
let autoplay = 0;
const { id } = main.dataset;

const handlePlay = (e) => {
  if (audio.paused) {
    audio.play();
    play.classList.add("hide");
  } else {
    audio.pause();
    play.classList.remove("hide");
  }
};

const handlePushPlaylist = (e) => {
  fetch(`/api/musics/${id}/pushPlaylist`, { method: "POST" });
};

const handleVolume = (e) => {
  volume_show.innerText = volume_bar.value;
  audio.volume = volume_bar.value / 100;
};

const handleLike = (e) => {
  fetch(`/api/musics/${id}/like`, { method: "POST" });
  if (like_icon.dataset.id === "true") {
    like_icon.classList.remove("far");
    like_icon.classList.add("fas");
    like_icon.dataset.id = "false";
  } else {
    like_icon.classList.remove("fas");
    like_icon.classList.add("far");
    like_icon.dataset.id = "true";
  }
};

play.addEventListener("click", handlePlay);
track_image.addEventListener("click", handlePlay);
audio.addEventListener("play", handlePushPlaylist);
window.addEventListener("load", (e) => {
  audio.volume = 0.5;
});
volume_bar.addEventListener("input", handleVolume);
like_icon.addEventListener("click", handleLike);
