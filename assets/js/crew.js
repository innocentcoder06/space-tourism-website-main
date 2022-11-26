class Crew {
  constructor(el) {
    this._el = el;
    this.carousel_container = this._el.querySelector(".crew_carousel");
    this.init();
  }

  init() {
    if (this.carousel_container) {
      const URI = `${location.origin}/assets/data.json`;
      const pagination = document.createElement("ul");
      pagination.classList.add("crew_carousel--pagination");
      const carouselImgList = document.createElement("div");
      carouselImgList.classList.add("crew_carousel--item-img");
      const carouselContentList = document.createElement("div");
      carouselContentList.classList.add("crew_carousel--item-content");
      fetch(URI).then((res) => res.json()).then((out) => {
        const crew = out.crew;
        //console.log(crew);
        crew.forEach((item) => {
          const paginationItem = document.createElement("li");
          paginationItem.classList.add("crew_carousel--pagination-dot");
          pagination.appendChild(paginationItem);
          const imgSlide = document.createElement("div");
          imgSlide.classList.add("crew_carousel--item-img_slide");
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
          carouselImgList.appendChild(imgSlide);
          const contentSlide = document.createElement("div");
          contentSlide.classList.add("crew_carousel--item-content_slide");
          contentSlide.innerHTML = `
            <h4>${item.role}</h4>
            <h3>${item.name}</h3>
            <p>${item.bio}</p>
          `;
          carouselContentList.appendChild(contentSlide);
        });
        this.carousel_container.appendChild(carouselContentList);
        this.carousel_container.appendChild(pagination);
        this.carousel_container.appendChild(carouselImgList);
        //console.log(this.carousel_container);
        this.paginationItems = this._el.querySelectorAll(".crew_carousel--pagination-dot");
        this.imgItems = this._el.querySelectorAll(".crew_carousel--item-img_slide");
        this.contentItems = this._el.querySelectorAll(".crew_carousel--item-content_slide");
        this.currentItem = this.paginationItems[0];
        this.currentImg = this.imgItems[0];
        this.currentContent = this.contentItems[0];
        this.currentContent.classList.add("active");
        this.currentItem.classList.add("active");
        this.currentImg.classList.add("active");
        this.paginationItems.forEach((item, index) => {
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
  const crew = document.querySelector(".crew");
  if (crew) {
    new Crew(crew);
  }
});