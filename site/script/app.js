window.addEventListener("load", (e) => {
  displayGallery();
});

function displayGallery() {
  const mainTag = document.querySelector("main");
  const WC = document.createElement("list-wallpapers");
  mainTag.innerHTML = "";
  mainTag.appendChild(WC);
}
