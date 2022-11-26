class Destination {
  constructor(el) {
    this._el = el;
    this.tab_container = this._el.querySelector(".destination_tab");
    this.init();
  }

  init() {
    if (this.tab_container) {
      const URI = `${location.origin}/assets/data.json`;
      const tabList = document.createElement("ul");
      tabList.classList.add("destination_tab--list");
      const tabImgList = document.createElement("div");
      tabImgList.classList.add("destination_tab--item-img");
      const tabContentList = document.createElement("div");
      tabContentList.classList.add("destination_tab--item-content");
      fetch(URI).then((res) => res.json()).then((out) => {
        const destinations = out.destinations;
        //console.log(destinations);
        destinations.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.classList.add("destination_tab--list-item");
          listItem.innerHTML = item.name;
          tabList.appendChild(listItem);
          const imgSlide = document.createElement("div");
          imgSlide.classList.add("destination_tab--item-img_slide");
          const picture = document.createElement("picture");
          for (const [key, value] of Object.entries(item.images)) {
            const source = document.createElement("source");
            source.src = value;
            source.type = `image/${key}`;
            picture.appendChild(source);
            if (key === "png") {
              const img = document.createElement("img");
              img.src = value;
              img.alt = item.name;
              picture.appendChild(img);
            }
          }
          imgSlide.appendChild(picture);
          tabImgList.appendChild(imgSlide);
          const contentSlide = document.createElement("div");
          contentSlide.classList.add("destination_tab--item-content_slide");
          const h2 = document.createElement("h2");
          h2.innerHTML = item.name;
          const p = document.createElement("p");
          p.innerHTML = item.description;
          const hr = document.createElement("hr");
          contentSlide.appendChild(h2);
          contentSlide.appendChild(p);
          contentSlide.appendChild(hr);
          const group = document.createElement("div");
          group.classList.add("destination_tab--item-content_group");
          group.innerHTML = `
            <div class="destination_tab--item-content_card">
              <h5>Avg. Distance</h5>
              <p>${item.distance}</p>
            </div>
            <div class="destination_tab--item-content_card">
              <h5>Est. travel time</h5>
              <p>${item.travel}</p>
            </div>
          `;
          contentSlide.appendChild(group);
          tabContentList.appendChild(contentSlide)
        });
        this.tab_container.appendChild(tabList);
        this.tab_container.appendChild(tabImgList);
        this.tab_container.appendChild(tabContentList);
        //console.log(this.tab_container);
        this.listItems = this._el.querySelectorAll(".destination_tab--list-item");
        this.imgItems = this._el.querySelectorAll(".destination_tab--item-img_slide")
        this.contentItems = this._el.querySelectorAll(".destination_tab--item-content_slide")
        this.currentItem = this.listItems[0];
        this.currentImg = this.imgItems[0];
        this.currentContent = this.contentItems[0];
        this.currentItem.classList.add("active");
        this.currentContent.classList.add("active");
        this.currentImg.classList.add("active");
        this.listItems.forEach((item, index) => {
          item.addEventListener("click", (evt) => {
            if (!item.classList.contains("active")) {
              item.classList.add("active");
              this.currentItem.classList.remove("active");
              this.currentItem = item;
              this.imgItems[index].classList.add("active");
              this.currentImg.classList.remove("active");
              this.currentImg = this.imgItems[index];
              this.contentItems[index].classList.add("active");
              this.currentContent.classList.remove("active");
              this.currentContent = this.contentItems[index];
            }
          });
        });
      });
    }
  }

}

window.addEventListener("DOMContentLoaded", (evt) => {
  const destination = document.querySelector(".destination");
  if (destination) {
    new Destination(destination);
  }
});