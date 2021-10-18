const videoGrid = document.querySelectorAll(".video-grid");

const handleRLWheel = (e) => {
  e.target.scrollBy({
    left: e.deltaY < 0 ? -150 : 150,
    behavior: "smooth",
  });
  // console.log();
};

for (let i = 0; i < videoGrid.length; i++) {
  videoGrid[i].addEventListener("wheel", handleRLWheel);
}
