const btn = document.querySelector("#btn");
const sidebar = document.querySelector(".sidebar");
const playlist_text = document.querySelector(".playlist_text");
const profile_link = document.querySelector(".profile_link");
const delPlaylist = document.querySelectorAll(".delPlaylist");
const playlist_audio = document.querySelectorAll(".playlist_audio");
const playlist_playbtn = document.querySelectorAll(".playlist_playbtn");

const handleMenuBtn = (e) => {
  sidebar.classList.toggle("active");
};

const handleDelete = (e) => {
  const { id } = e.target.dataset;
  fetch(`/api/musics/${id}/deletePlaylist`, { method: "POST" });
  e.target.parentElement.remove();
};

const handlePlaylistPlay = (e) => {
  const audio = e.target.parentElement.querySelector("audio");
  if (audio.paused) {
    audio.play();
    // console.log(e.target.classList);
    for (let i = 0; i < playlist_audio.length; i++) {
      if (audio !== playlist_audio[i]) {
        playlist_audio[i].pause();
      }
    }
  } else {
    audio.pause();
  }
};

btn.addEventListener("click", handleMenuBtn);
for (let i = 0; i < playlist_playbtn.length; i++) {
  playlist_playbtn[i].addEventListener("click", handlePlaylistPlay);
}

for (let i = 0; i < delPlaylist.length; i++) {
  delPlaylist[i].addEventListener("click", handleDelete);
}
