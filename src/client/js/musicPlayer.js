const play = document.querySelector("#play");
const name = document.querySelector("#name");
const recent_volume = document.querySelector("#volume");
const volume_show = document.querySelector("#volume_show");
const volume_bar = document.querySelector("#volume_bar");
const slider = document.querySelector("#duration_silder");
const playbtn_section = document.querySelector(".playbtn-section");
const track_image = document.querySelector(".playpage_track_imag");
const present = document.querySelector("#present");
const total = document.querySelector("#total");
const artist = document.querySelector("#artist");
const audio = document.querySelector("#audio_page");
const main = document.querySelector(".main-player");
const like_icon = document.querySelector(".like_icon");
const duration_slider = document.querySelector("#duration_slider");
const duration_text = document.querySelector(".duration_text");
const commentform = document.querySelector(".comment_form");
const commenttext = document.querySelector(".comment_text");

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

const handleDuration = (e) => {
  let sec = audio.currentTime;
  let min = Math.floor(sec / 60);
  sec = Math.floor(sec % 60);
  if (sec.toString().length < 2) sec = "0" + sec;
  if (min.toString().length < 2) min = "0" + min;
  duration_text.innerHTML = min + ":" + sec;
  let position = audio.currentTime * (100 / audio.duration);
  duration_slider.value = position;
};

const handleAudioSeek = (e) => {
  let seek = audio.duration * (duration_slider.value / 100);
  audio.currentTime = seek;
};
window.onload = function () {
  play.addEventListener("click", handlePlay);
  audio.addEventListener("timeupdate", handleDuration);
  duration_slider.addEventListener("change", handleAudioSeek);
  playbtn_section.addEventListener("click", handlePlay);
  audio.addEventListener("play", handlePushPlaylist);
  audio.volume = 0.3;
  volume_bar.addEventListener("input", handleVolume);
  like_icon.addEventListener("click", handleLike);
};
