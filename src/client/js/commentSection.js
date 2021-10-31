const commentWriteSection = document.querySelector(".commentWrite-section");
const commentWriteForm = document.querySelector(".commentWrite_form");
const mainplayer = document.querySelector(".main-player");
const delComment = document.querySelectorAll(".delComment");

const addComment = (text, id, user) => {
  const musicComment = document.querySelector(".comment_section ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "comment_text";
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const delIcon = document.createElement("i");
  delIcon.className = "fas fa-times";
  div1.innerText = ` ${text}`;
  div2.innerText = ` ${user}`;
  newComment.appendChild(div1);
  newComment.appendChild(div2);
  newComment.appendChild(delIcon);
  musicComment.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const commentWritetextarea = commentWriteForm.querySelector(
    ".commentWrite_textarea"
  );
  const text = commentWritetextarea.value;
  const { id } = mainplayer.dataset;
  const { user } = mainplayer.dataset;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/musics/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    commentWritetextarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId, user);
  }
};

const handleCommentDelete = (e) => {
  const comment = e.target.parentElement;
  const { id } = comment.dataset;
  fetch(`/api/musics/${id}/deleteComment`, { method: "POST" });
  e.target.parentElement.remove();
};

if (commentWriteForm) {
  commentWriteForm.addEventListener("submit", handleSubmit);
}

for (let i = 0; i < delComment.length; i++) {
  delComment[i].addEventListener("click", handleCommentDelete);
}
