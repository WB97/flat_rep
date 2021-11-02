const second = document.querySelector(".second");
const pre_btn = document.querySelector(".pre_btn");
const next_btn = document.querySelector(".next_btn");

const handleLeft = (e) => {
  if (second.scrollLeft > 0) {
    second.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  }
  // console.log(second.scrollLeft);
};
const handleRight = (e) => {
  if (second.scrollLeft < second.scrollWidth) {
    second.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  }
};

pre_btn.addEventListener("click", handleLeft);
next_btn.addEventListener("click", handleRight);
