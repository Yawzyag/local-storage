//globals
let newImage = document.querySelector("#newImage");
let paintImage = document.querySelector("#image-random");
let imageLocalStorage = document.querySelector("#img-local-storage");
let carouselImg = document.querySelector("#carousel-img");
let borrarLocalStorage = document.querySelector("#borrarLocalStorage");
let imageGalerry;
let arrayImages = {};

// paintCat.childNodes[1].attributes[0].value ="https://78.media.tumblr.com/tumblr_m3evqr0TgS1qhwmnpo1_500.jpg";
// console.dir(paintCat.childNodes[1].attributes[0].value);

newImage.addEventListener("click", imgRandom);
imageLocalStorage.addEventListener("click", carouselLocalStorage);
borrarLocalStorage.addEventListener("click", cleanLocalStorage);
window.addEventListener("DOMLoadedContent", carouselToDOM());

//fetch img
function imgRandom() {
  fetch("https://source.unsplash.com/random")
    .then(res => res)
    .then(data => {
      // console.log(data.url);
      // console.log(paintImage.src);
      paintImage.src = data.url;
    });
}

//img
fetch("https://api.thedogapi.com/v1/images/search")
  .then(res => res.json())
  .then(data => {
    // console.log(data[0].url);
    paintImage.src = data[0].url;
  });

//send to local storage
function carouselLocalStorage() {
  // image src
  let imagen = paintImage.src;
  //comprobar si existe en local storage
  if (localStorage.getItem("carrousel-collection")) {
    arrayImages = JSON.parse(localStorage.getItem("carrousel-collection"));
    // console.log(arrayImages);
    arrayImages.image.push({ url: `${imagen}` });
    localStorage.setItem("carrousel-collection", JSON.stringify(arrayImages));
  } else {
    arrayImages.image = [];
    //push imagen src
    arrayImages.image.push({ url: `${imagen}` });
    localStorage.setItem("carrousel-collection", JSON.stringify(arrayImages));
  }

  carouselToDOM();
}

//mostrar imagenes guardadas

function carouselToDOM() {
  if (localStorage.getItem("carrousel-collection")) {
    let collections = JSON.parse(localStorage.getItem("carrousel-collection"));
    collections = collections.image;

    carouselImg.innerHTML = "";
    carouselImg.innerHTML += `<h5 class="center-align s12 indigo-text darken-4">Esta es Tu galeria</h5>
    <h6 class="center-align s12 red-text text-darken-2">presiona el boton rojo para borrar todo</h6>
    <p class="center-align s12 blue-text text-darken-2">dobleclick en una imagen para borrarla</p>

    `;

    collections.forEach(img => {
      carouselImg.innerHTML += `
        <img class="responsive-img img-height col s12 m6 l4" src="${
          img.url
        }" alt="galleria">
             
    `;
    });
  } else {
    carouselImg.innerHTML = "";
    carouselImg.innerHTML += `<h5 class="center-align s12">Sin imagenes</h5>`;
  }

  setTimeout(cambiarDeGaleria(), 500);
}

//borar local storage
function cleanLocalStorage() {
  localStorage.clear();
  carouselToDOM();
}

function cambiarDeGaleria() {
  imageGalerry = document.querySelectorAll(".img-height");

  imageGalerry.forEach(img => {
    let imagenG = img;
    imagenG.addEventListener("click", targetImg);
    imagenG.addEventListener("dblclick", hola);
  });
}

//seleccionar imagen de galeria

function targetImg(e) {
  paintImage.src = e.target.src;
}

//borrar imagen
function hola(e) {
  borrar(e.target);
}

function borrar(img) {
  img.classList.remove("img-height");

  let imageborrar = document.querySelectorAll(".img-height");
  arrayImages = {};
  arrayImages.image = [];

  imageborrar.forEach(img => {
    arrayImages.image.push({ url: `${img.src}` });
  });

  localStorage.setItem("carrousel-collection", JSON.stringify(arrayImages));

  carouselToDOM();
}
