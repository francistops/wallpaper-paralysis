class ListWallpapersElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async loadContent() {
    const [html, css] = await Promise.all([
      fetch("/wc/list-wallpapers/list-wallpapers.html").then((res) => res.text()),
      fetch("/wc/list-wallpapers/list-wallpapers.css").then((res) => res.text()),
    ]);

    const style = document.createElement("style");
    style.textContent = css;

    const template = document.createElement("template");
    template.innerHTML = html;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async connectedCallback() {
    await this.loadContent();

    try {
      const response = await fetch("https://api.francis.ca/wallpapers");
      console.log(response)
      if (response = 401) {
        throw new Error(`Error 401: Unauthorized access. 
          Are you trying to access NSFW wallpaper without an api key? 
          or if your api key is valid. ${response.status}`)
      } else if (response = 429) {
        throw new  Error(`Error 429: Too many requests limited at 45 per minute. ${response.status}`)
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const wallpapersJson = await response.json();
      // const apiErrorCodes = [401]

      const tableBodyTag = this.shadowRoot.querySelector("tbody");

      if (wallpapersJson.error != null) {
        data.forEach((wallpaper, index) => {
          this.addData(wallpaper);
        });
      } else {
        throw new Error(`API return an error`);
      }
    } catch (error) {
      console.log(`Oops: ${error}`);
    }

    const createBtn = this.shadowRoot.getElementById("fetch-wallpapers-btn");
    createBtn.addEventListener("click", (e) => {
      const event = new CustomEvent("ready-fetch-wallpapers", {
        detail: {
          wallpapers: {
            wallpaperID: wallpaper.id,
            wallpaperUrl: wallpaper.url
          }
        },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(event);
    });
  }

  
// not implement yet
  // likeWallpaper(id, wallpaper) {
  //   // console.log('publishData wallpaper', wallpaper)
  //   const row = this.shadowRoot.getElementById(id);
  //   const columns = row.querySelectorAll("td");

  //   columns[2].innerHTML = "✓";
  // }

  addData(wallpaper) {
    // console.log('addData wallpaper = ', wallpaper)
    const cardsDiv = this.shadowRoot.getElementById("wallpapers-gallery");

    const cardBox = document.createElement("div")
    cardBox.classList.add("card-class")
    const wallpaperImgtag = document.createElement("img");
    const urlPTag = document.createElement("p")
    wallpaperImgtag.setAttribute("scr", wallpaper.url)
    urlPTag.innerHTML = wallpaper.url;

    // const likeWallpaperBtn = document.createElement("button");
    // if (wallpaper.like !== null) {
    //   likeWallpaperBtn.innerHTML = "✓";
    // } else {
    //   likeWallpaperBtn.innerHTML = "like?";
    //   likeWallpaperBtn.addEventListener("click", (e) => {
    //     const event = new CustomEvent("ready-like", {
    //       detail: {
    //         id: wallpaper.id,
    //       },
    //       bubbles: true,
    //       composed: true,
    //     });

    //     this.dispatchEvent(event);
    //   });
    //   tdHasBeenPublished.appendChild(likeWallpaperBtn);
    // }

    cardsDiv.appendChild(cardBox)
    cardBox.appendChild(wallpaperImgtag)
    cardBox.appendChild(urlPTag)
  }
}

customElements.define("list-wallpapers", ListWallpapersElement);
