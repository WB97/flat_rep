const videoGrid = document.querySelector(".video-grid");
const pre_btn = document.querySelector(".pre_btn");
const next_btn = document.querySelector(".next_btn");

const handleLeft = (e) => {
  if (videoGrid.scrollLeft > 0) {
    videoGrid.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }
  // console.log(videoGrid.scrollLeft);
};
const handleRight = (e) => {
  if (videoGrid.scrollLeft < videoGrid.scrollWidth) {
    videoGrid.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }
};

pre_btn.addEventListener("click", handleLeft);
next_btn.addEventListener("click", handleRight);
