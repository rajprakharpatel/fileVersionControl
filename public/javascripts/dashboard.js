const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browseBtn");
const fileInput = document.querySelector("#fileInput");

const bgProgress = document.querySelector(".bg-progress");
const percentDiv = document.querySelector("#percent");

// const host = "https://innshare.herokuapp.com/"
const uploadURL = `/api/upload`;
// import db from "../../config/env/dev.js";

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();

  if (!dropZone.classList.contains("dragged")) {
    dropZone.classList.add("dragged");
  }
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragged");
  const files = e.dataTransfer.files;
  // console.log(files);
  if (files.length) {
    fileInput.files = files;
    uploadFile();
  }
});

fileInput.addEventListener("change", () => {
  uploadFile();
});

browseBtn.addEventListener("click", () => {
  fileInput.click();
});

const uploadFile = () => {
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      try {
        if (JSON.parse(xhr.response).code === 16) {
          alert("File too large");
          window.location.reload();
          return;
        }
      } catch (e) {
        console.log(e);
      }
      if (xhr.status === 409) {
        alert("File already exists");
      } else {
        alert("File upload successful");
      }
      window.location.reload();
    }
  };

  xhr.onerror = function () {
    alert("Network Error");
  };

  xhr.upload.onprogress = updateProgress;

  xhr.open("POST", uploadURL);
  xhr.send(formData);
};

const updateProgress = (e) => {
  const percent = Math.round((e.loaded / e.total) * 100);
  // console.log(percent);
  bgProgress.style.width = `${percent}%`;
  percentDiv.innerText = percent;
};