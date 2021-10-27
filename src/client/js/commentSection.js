const commentform = document.querySelector(".comment_form");
const commenttext = document.querySelector(".comment_text");
const mainplayer = document.querySelector(".main-player");

const handleSubmit = (e) => {
  e.preventDefault();
  const commenttext = document.querySelector(".comment_text");
  const { id } = mainplayer.dataset;
  fetch(`/api/musics/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};

if (commentform) {
  commentform.addEventListener("submit", handleSubmit);
}
