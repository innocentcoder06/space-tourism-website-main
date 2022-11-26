class Nav {
  constructor(el) {
    this._el = el;
    this.nav_container = this._el.querySelector(".navigation_list--container");
    this.nav_ham = this._el.querySelector(".navigation_ham");
    this.nav_close = this._el.querySelector(".navigation_ham--close");
    this.init();
  }

  init() {
    if (this.nav_container) {
      if (this.nav_ham) {
        this.nav_ham.addEventListener("click", (evt) => {
          if (!this.nav_container.classList.contains("active")) {
            this.nav_container.classList.add("active");
            document.documentElement.style.overflow = "hidden";
          }
        });
      }
      if (this.nav_close) {
        this.nav_close.addEventListener("click", (evt) => {
          if (this.nav_container.classList.contains("active")) {
            this.nav_container.classList.remove("active");
            document.documentElement.style.overflow = "unset";
          }
        });
      }
    }
    window.addEventListener("resize", (evt) => {
      if (this.nav_container.classList.contains("active")) {
        this.nav_container.classList.remove("active");
      }
    });
  }

}

window.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".navigation");
  if (navigation) {
    new Nav(navigation);
  }
});