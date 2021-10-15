const btn = document.querySelector("#btn");
const sidebar = document.querySelector(".sidebar");
const playlist_text = document.querySelector(".playlist_text");
const profile_link = document.querySelector(".profile_link");
const delPlaylist = document.querySelectorAll(".delPlaylist");

const handleMenuBtn = (e) => {
  sidebar.classList.toggle("active");
};

const handleDelete = (event) => {
  const { id } = event.target.dataset;
  // let delFilter = delFilter.filter((todo) => id !== parseInt(deleteLi.id));
  fetch(`/api/musics/${id}/deletePlaylist`, { method: "POST" });
  event.target.parentElement.remove();
};

btn.addEventListener("click", handleMenuBtn);
for (let i = 0; i < delPlaylist.length; i++) {
  delPlaylist[i].addEventListener("click", handleDelete);
}
