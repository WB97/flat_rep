const previous = document.querySelector("#pre");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const name = document.querySelector("#name");
const recent_volume = document.querySelector("#volume");
const volume_show = document.querySelector("#volume_show");
const slider = document.querySelector("#duration_silder");
const show_duration = document.querySelector("#pre");
const track_image = document.querySelector("#track_image");
const auto_play = document.querySelector("#auto");
const present = document.querySelector("#present");
const total = document.querySelector("#total");
const artist = document.querySelector("#artist");
const audio = document.querySelector("#audio_page");
const main = document.querySelector(".main-player");
const delPlaylist = document.querySelector(".delPlaylist");

let timer;
let autoplay = 0;

let index_no = 0;

const handlePlay = (e) => {
  if (audio.paused) {
    audio.play();
    play.innerHTML = '<i class="fa fa-pause"></i>';
  } else {
    audio.pause();
    play.innerHTML = '<i class="fa fa-play"></i>';
  }
};

const handlePushPlaylist = () => {
  const { id } = main.dataset;
  fetch(`/api/musics/${id}/pushPlaylist`, { method: "POST" });
};

const handleDelete = (event) => {
  const parent = event.target.parentElement;
  // const { id } = delPlaylist.dataset;
  // let delFilter = delFilter.filter((todo) => id !== parseInt(deleteLi.id));
  // fetch(`/api/musics/${id}/deletePlaylist`, { method: "POST" });
  // const deleteLi = event.target.parentElement;
  // deleteLi.remove();
  console.log(parent);
};

play.addEventListener("click", handlePlay);
audio.addEventListener("play", handlePushPlaylist);
delPlaylist.addEventListener("click", handleDelete);
