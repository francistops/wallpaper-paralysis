import { getWallpaperUrl } from "../../script/auth.js";

class ListWallpapers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.wallpaper = {}  
  }

  async connectedCallback() {
    console.log('connected')
    this.wallpaper = await this.fetchWallpaperUrl()
    console.log('about to render this: ', this.wallpaper)
    this.render(this.wallpaper)
  }
  disconnectedCallback() {
    console.log('disconnected')
  }

  async fetchWallpaperUrl() {
    const result = await getWallpaperUrl();
    console.log('WC result: ', result)
    return result
    //if result ok todo

  }

  render(state) {
    let color = "gray";
    let text = "Chargement...";

    // if (state === "online") {
    //   color = "green";
    //   text = "En fonction";
    // } else if (state === "offline") {
    //   color = "red";
    //   text = "Hors ligne";
    // }

    // console.log(state)
    // console.log(state.data)
    // console.log(state.data.url)
    // console.log(state.url)
    const wallpaper_tag = document.createElement('img')
    wallpaper_tag.setAttribute('src', state.data.url)

    this.shadowRoot.innerHTML = `
      <style>
        #wallpapers-gallery {
          display: flex;
          flex-direction: column;
          gap: 0.5em;
        }
        #wallpapers-row {
          display: flex;
          align-items: center;
          gap: 0.5em;
        }
      </style>
      <div class="status">
        <div class="state">
          <span class="dot"></span>
          <span>${text}</span>
        </div>
    
      </div>
      <div id="pager-wrapper">
        <button id="fetch-wallpapers-btn">fetch wallpapers</button>
      </div>
      <div id="wallpapers-gallery">
        <div id="wallpapers-row">
        </div>

      </div>
    `;

    const wallpaper_div = this.shadowRoot.getElementById('wallpapers-row')
    wallpaper_div.appendChild(wallpaper_tag) 
  }
}

customElements.define("list-wallpapers", ListWallpapers);
