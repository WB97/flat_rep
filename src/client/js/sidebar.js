const btn = document.querySelector("#btn");
const sidebar = document.querySelector(".sidebar");
const playlist_text = document.querySelector(".playlist_text");
const profile_link = document.querySelector(".profile_link");

const handleMenuBtn = (e) => {
  sidebar.classList.toggle("active");
};

btn.addEventListener("click", handleMenuBtn);
