//import { monstruos as people } from "../data/data.js";
import { actualizarTabla } from "./tabla.js";
import { Monstruo } from "./monstruo.js";
import {getMonstruos,getMonstruo,postMonstruo,deleteMonstruo,updateMonstruo} from "./peticiones.js";

const tipoMonstruo = [
  "ESQUELETO",
  "ZOMBIE",
  "VAMPIRO",
  "FANTASMA",
  "BRUJA",
  "HOMBRE LOBO"
];
const tipoHabilidad = [
  "DULCE O TRUCO",
  "SUSTO",
  "INMOVILIZAR",
  "RASGAR",
  "ELECTRUCUTAR"
];
var selectHabilidad = document.getElementById("selectHabilidad");
// Agregar las opciones del array armas al select
tipoHabilidad.forEach(function (habilidad) {
  var option = document.createElement("option");
  option.value = habilidad;
  option.textContent = habilidad;
  selectHabilidad.appendChild(option);
});

// Obtener el valor seleccionado por el usuario
selectHabilidad.addEventListener("change", function () {
  $formulario.selectHabilidad.value = selectHabilidad.value;
});

var selectMonstruo = document.getElementById("selectMonstruo");
// Agregar las opciones del array armas al select
tipoMonstruo.forEach(function (monstruo) {
  var option = document.createElement("option");
  option.value = monstruo;
  option.textContent = monstruo;
  selectMonstruo.appendChild(option);
});


// Obtener el valor seleccionado por el usuario
selectMonstruo.addEventListener("change", function () {
  $formulario.selectMonstruo.value = selectMonstruo.value;
});

const $seccionTabla = document.getElementById("tabla");
const $btnCancelar = document.getElementById("btnCancelar");
const $btnEliminar = document.getElementById("btnEliminar");
const $formulario = document.forms[0];
const $promedio = document.getElementById("txtPromedio");
const $checkboxFiltros = document.querySelectorAll(".check");
const $filtros = document.getElementById("filtros");
const loader = document.getElementById("spinner");
let monstruos = [];

window.addEventListener("load", async() => {
  monstruos = await getMonstruos();
  if (monstruos.length) {
    actualizarTabla($seccionTabla, monstruos)
    $promedio.value = CalcularPromedio(monstruos);
  } else {
    alert("Base de datos vacia");
  }
  CargarFiltros();
});

window.addEventListener("click", async (e) => {
  //const id = e.target.parentElement.dataset.id;
  if (e.target.matches("td")) {
    const id = e.target.parentElement.getAttribute("data-id");
    const selectmonstruos = monstruos.find((mon) => mon.id == id);
    cargarFormulario($formulario, selectmonstruos);
    MostrarBotones();
  } else if (e.target.matches("input[value='Eliminar Monstruo']")) {
    if ($formulario.txtId.value != "") {
      if(validarDatos())
      {
        const id = parseInt($formulario.txtId.value);
        deleteMonstruo(id);
        monstruos = await getMonstruos();
        actualizarTabla($seccionTabla, monstruos);
        OcultarBotones();
      }
      else
      {
        mostrarModal("Modifico algun campo elija de nuevo el monstruo");
      }
      OcultarBotones();
    }
  }
});

$formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { txtId, txtNombre, txtAlias, rdoDefensa, txtMiedo, selectMonstruo, selectHabilidad} =
    $formulario;
  if (validarDatos()) {
    if (txtId.value === "") {
      const newMonstruo = new Monstruo(
        Date.now(),
        txtNombre.value,
        txtAlias.value,
        rdoDefensa.value,
        parseFloat(txtMiedo.value),
        selectMonstruo.value,
        selectHabilidad.value
      );

      postMonstruo(newMonstruo);
      monstruos = await getMonstruos();
      actualizarTabla($seccionTabla, monstruos);
    } else if(txtId.value != "") {

      const updateMon = new Monstruo(
        parseInt(txtId.value),
        txtNombre.value,
        txtAlias.value,
        rdoDefensa.value,
        parseFloat(txtMiedo.value),
        selectMonstruo.value,
        selectHabilidad.value
      );
      updateMonstruo(updateMon,parseInt(txtId.value));
      monstruos = await getMonstruos();
      actualizarTabla($seccionTabla, monstruos);
      OcultarBotones();
    }
    else
    {
      mostrarModal("Elegir un monstruo para poder modificar");
    }
  }
  $formulario.reset();
  $formulario.txtId.value = "";
});


$btnCancelar.addEventListener("click", (e) => {
  $formulario.reset();
  $formulario.txtId.value = "";
  OcultarBotones();
});



function cargarFormulario(formulario, data) {
  formulario.txtId.value = data.id;
  formulario.txtNombre.value = data.nombre;
  formulario.txtAlias.value = data.alias;
  formulario.rdoDefensa.value = data.defensa;
  formulario.txtMiedo.value = data.miedo;
  formulario.selectMonstruo.value = data.monstruo;
  formulario.selectHabilidad.value = data.habilidad;
}

function validarDatos() {
  let bool = true;
  const { txtNombre, txtAlias } = $formulario;

  if (txtNombre.value.trim() === "" || txtAlias.value.trim() === "") {
    mostrarModal("Por favor, complete todos los campos.");
    bool = false;
  }

  return bool;
}

function MostrarBotones() {
  $btnCancelar.style.display = "inline-block";
  $btnEliminar.style.display = "inline-block";
}

function OcultarBotones() {
  $btnCancelar.style.display = "none";
  $btnEliminar.style.display = "none";
}



function mostrarModal(mensaje) {
  const modal = document.getElementById("alerta");
  const modalMessage = document.getElementById("modalMessage");

  modalMessage.textContent = mensaje;
  modal.style.display = "block";
}



const cerrar = document.getElementById("cerrar");
cerrar.addEventListener("click", (e) => {
  const modal = document.getElementById("alerta");
  modal.style.display = "none";
});

$filtros.addEventListener("change", () => {
  let lista = [];
  if (monstruos.length > 0) {
    lista = handlerFiltros(handlerCheckbox(monstruos));
    actualizarTabla($seccionTabla, lista);

    if (lista.length > 0) {
      $promedio.value = CalcularPromedio(handlerFiltros(monstruos));
    } else {
      $promedio.value = "";
      alert("base de datos vacia");
    }
  }
});

function CalcularPromedio(lista) {
  return (
    lista.reduce((previo, actual) => {
      return previo + actual.miedo;
    }, 0) / lista.length
  );
}

$checkboxFiltros.forEach((element) =>
  element.addEventListener("click", () => {
    actualizarTabla($seccionTabla, handlerCheckbox(handlerFiltros(monstruos)));
    GuardarFiltros();
  })
);

function handlerFiltros(lista) {
  let filtrada;
  switch ($filtros.value) {
    case "Vampiro":
      filtrada = lista.filter((mon) => mon.monstruo === "VAMPIRO");
      break;
    case "Hombre":
      filtrada = lista.filter((mon) => mon.monstruo === "HOMBRE LOBO");
      break;
    case "Fantasma":
      filtrada = lista.filter((mon) => mon.monstruo === "FANTASMA");
      break;
    case "Esqueleto":
      filtrada = lista.filter((mon) => mon.monstruo === "ESQUELETO");
      break;
    case "Bruja":
      filtrada = lista.filter((mon) => mon.monstruo === "BRUJA");
      break;
    case "Zombie":
      filtrada = lista.filter((mon) => mon.monstruo === "ZOMBIE");
      break;
    default:
      filtrada = lista;
      break;
  }
  return filtrada;
}

function handlerCheckbox(lista) {
  const filtros = {};

  $checkboxFiltros.forEach((item) => {
    filtros[item.name] = item.checked;
  });

  return lista.map((item) => {
    const map = {};
    for (const key in item) {
      if (filtros[key] || key == "id") {
        map[key] = item[key];
      }
    }
    return map;
  });
}

function GuardarFiltros()
{
  const filtros = {};
  $checkboxFiltros.forEach((item) => {
    filtros[item.name] = item.checked;
  });
  localStorage.setItem("FILTROS1", JSON.stringify(filtros));
}

function CargarFiltros()
{
  const f = JSON.parse(localStorage.getItem("FILTROS1")) || [];
    if(f.length)
    {
      $checkboxFiltros.forEach((item) => {
        if(f[item.name] == false){
          item.removeAttribute("checked");
        }
      });
    } 
}
OcultarBotones();