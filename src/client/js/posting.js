const postingForm = document.querySelector(".posting-form");
const postingBtn = document.querySelector(".posting-btn");

const handleSubmit = async (e) => {
  e.preventDefault();
  const postingTitle = document.querySelector(".posting-title");
  const postingMaintext = document.querySelector(".posting-maintext");
  const { id } = postingForm.dataset;
  const title = postingTitle.value;
  const mainText = postingMaintext.value;
  await fetch(`/api/noticeboard/${id}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, mainText }),
  });
  location.href = "/noticeboard";
};

postingBtn.addEventListener("click", handleSubmit);
