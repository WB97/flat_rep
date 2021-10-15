const videoGrid = document.querySelector(".video-grid");

const handleRLWheel = (e) => {
  videoGrid.scrollBy({
    left: e.deltaY < 0 ? -150 : 150,
    behavior: "smooth",
  });
};

videoGrid.addEventListener("wheel", handleRLWheel);
