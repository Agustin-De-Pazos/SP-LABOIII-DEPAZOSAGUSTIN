import {getMonstruos} from "./peticiones.js";
const loader = document.getElementById("spinner");
let monstruos = await getMonstruos();
console.log(monstruos);
const $articulos = document.getElementById("articulos");
loader.classList.add("oculto");
if (monstruos.length) {
  monstruos.forEach((monstruo) => {
    $articulos.insertAdjacentHTML(
      "beforeend",
      `<article>
          <p>Nombre: ${monstruo.nombre}</p>  
          <p><i class="fa-solid fa-mask text-white"></i> Alias: ${monstruo.alias}</p>
          <p><i class="fa-solid fa-shield text-white"></i>Defensa: ${monstruo.defensa}</p>
          <p><i class="fa-solid fa-ghost text-white"></i>Miedo: ${monstruo.miedo}</p>
          <p><i class="fa-brands fa-optin-monster text-white"></i>Monstruo: ${monstruo.monstruo}</p>
          <p><i class="fa-solid fa-book text-white"></i>Habilidad: ${monstruo.habilidad}</p>
        </article>`
    );
  });
}
