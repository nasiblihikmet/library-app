import { readData } from "./firebase.js";

const aboutArea = document.querySelector("#aboutArea");

function renderAbout(obj) {
    aboutArea.innerHTML = `<div class="about_page">
      <div class="about_paragraph" >
        <h1 class="about_title">${obj.aboutTitle}</h1>
        <p class="about_text">${obj.aboutDesc}</p>
      </div>
      <div class="about_img">
        <img src="${obj.aboutImage}" width="90%"/>
      </div>
  </div>`;
}

window.addEventListener("load", function () {
    const loader = document.querySelector(".loader-container");
    loader.style.display = "flex";

    readData("/about")
        .then((data) => {
            renderAbout(data);
            loader.style.display = "none";
        })
        .catch((error) => console.error("Error reading data:", error));
});
