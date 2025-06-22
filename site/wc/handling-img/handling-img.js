class HandlingPostElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async loadContent() {
    const [html, css] = await Promise.all([
      fetch("/wc/handling-post/handling-post.html").then((res) => res.text()),
      fetch("/wc/handling-post/handling-post.css").then((res) => res.text()),
    ]);

    const style = document.createElement("style");
    style.textContent = css;

    const template = document.createElement("template");
    template.innerHTML = html;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async handleCreate() {
    const form = this.shadowRoot.getElementById("action-post");
    const { parseFormToObject } = await import("/script/utilform.js");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    const actionBtn = this.shadowRoot.getElementById("action");
    actionBtn.innerHTML = "Créer";
    actionBtn.addEventListener("click", async (e) => {
      const post = parseFormToObject(form);

      const response = await fetch("https://api.francis.ca/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      const result = await response.json();
      console.log(result);

      const event = new CustomEvent("post-created", {
        detail: {
          result: result,
        },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(event);
    });
  }

  async handleUpdate(id) {
    const form = this.shadowRoot.getElementById("action-post");
    const { parseFormToObject } = await import("/script/utilform.js");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    const hiddenPublished = document.createElement("input");
    const hiddenCreated = document.createElement("input");
    try {
      const response = await fetch(`https://api.francis.ca/posts/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const postTitleTag = this.shadowRoot.getElementById("post-title");
      postTitleTag.value = data.row.title;

      const postExcertTag = this.shadowRoot.getElementById("post-excert");
      postExcertTag.value = data.row.excert;

      const postContentTag = this.shadowRoot.getElementById("post-content");
      postContentTag.value = data.row.content;

      hiddenPublished.id = "hidden-published";
      hiddenPublished.setAttribute("type", "hidden");
      hiddenPublished.setAttribute("value", data.row.published);

      hiddenCreated.id = "hidden-created";
      hiddenCreated.setAttribute("type", "hidden");
      hiddenCreated.setAttribute("value", data.row.created);

      form.appendChild(hiddenPublished);
      form.appendChild(hiddenCreated);
    } catch (error) {
      console.log(error);
    }

    const actionBtn = this.shadowRoot.getElementById("action");
    actionBtn.innerHTML = "Modifier";
    actionBtn.addEventListener("click", async (e) => {
      const post = parseFormToObject(form);

      const response = await fetch(`https://api.francis.ca/posts/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      let result = await response.json();

      result.rows.post.created = hiddenCreated.getAttribute("value");
      result.rows.post.published = hiddenPublished.getAttribute("value");

      const event = new CustomEvent("post-updated", {
        detail: result,
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(event);
    });
  }

  async connectedCallback() {
    await this.loadContent();

    const cancelBtn = this.shadowRoot.getElementById("cancel");
    cancelBtn.addEventListener("click", (e) => {
      const event = new CustomEvent("cancel-action", {
        detail: {},
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(event);
    });

    const mode = this.getAttribute("mode");

    if (mode === "create") {
      this.handleCreate();
    } else if (mode === "update") {
      const id = this.getAttribute("id");
      if (id !== undefined) {
        this.handleUpdate(id);
      }
      console.log("Ready to update");
    } else {
      throw new Error("Mode invalide");
    }
  }
  addData(post) {
    const tableBodyTag = this.shadowRoot.querySelector("tbody");

    const trTag = document.createElement("tr");
    trTag.id = post.id;

    const tdTitle = document.createElement("td");
    tdTitle.innerHTML = post.title;
    const tdHasBeenPublished = document.createElement("td");
    if (post.published !== null) {
      tdHasBeenPublished.innerHTML = "✓";
    }
    const tdCreated = document.createElement("td");
    tdCreated.innerHTML = post.created;
    const tdPublished = document.createElement("td");
    tdPublished.innerHTML = post.published;
    const tdExcert = document.createElement("td");
    tdExcert.innerHTML = post.excert;

    const tdOperation = document.createElement("td");

    const operationUpdate = document.createElement("button");
    operationUpdate.innerHTML = "Modifier";
    operationUpdate.addEventListener("click", (e) => {
      const event = new CustomEvent("ready-update", {
        detail: {
          id: post.id,
        },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(event);
    });

    const operationDelete = document.createElement("button");
    operationDelete.innerHTML = "Supprimer";
    operationDelete.addEventListener("click", (e) => {
      const event = new CustomEvent("ready-delete", {
        detail: {
          id: post.id,
        },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(event);
    });

    tdOperation.appendChild(operationUpdate);
    tdOperation.appendChild(operationDelete);

    trTag.appendChild(tdTitle);
    trTag.appendChild(tdHasBeenPublished);
    trTag.appendChild(tdCreated);
    trTag.appendChild(tdPublished);
    trTag.appendChild(tdExcert);
    trTag.appendChild(tdOperation);

    tableBodyTag.appendChild(trTag);
  }
}

customElements.define("handling-post", HandlingPostElement);
