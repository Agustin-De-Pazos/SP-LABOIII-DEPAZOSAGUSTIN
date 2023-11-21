export const crearTabla = (data, colorCabecera) => {
  if (!Array.isArray(data)) return null;
  const tabla = document.createElement("table");
  tabla.classList.add("table", "table-bordered", "table-striped", "table-dark", "table-hover", "table-sm");
  //o table-ligth 
  tabla.appendChild(crearCabecera(data[0], colorCabecera));
  tabla.appendChild(crearCuerpo(data));

  return tabla;
};

const crearCabecera = (elemento, color) => {
  const tHead = document.createElement("thead"),
  headRow = document.createElement("tr");
  headRow.classList.add("table-danger"); //"table-succes" VERDE     
  tHead.classList.add("thead-dark");
  headRow.style.setProperty("background-color", color);
  for (const key in elemento) {
    if (key === "id") continue;
    const th = document.createElement("th");
    th.textContent = key;
    headRow.appendChild(th);
  }
  tHead.appendChild(headRow);

  return tHead;
};

const crearCuerpo = (data) => {
  if (!Array.isArray(data)) return null;

  const tBdoy = document.createElement("tbody");

  data.forEach((element, index) => {
    const tr = document.createElement("tr");
    if (index % 2 == 0) {
      tr.classList.add("rowPar");
    } else {
      tr.classList.add("inPar");
    }
    for (const key in element) {
      if (key === "id") {
        tr.dataset.id = element[key];
        //tr.setAttribute("data-id", element[key]);
      } else {
        const td = document.createElement("td");
        td.textContent = element[key];
        tr.appendChild(td);
      }
    }
    tBdoy.appendChild(tr);
  });
  return tBdoy;
};

export const actualizarTabla = (contenedor, data) => {
  const loader = document.getElementById("spinner");
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstElementChild);
  }
  contenedor.appendChild(crearTabla(data, "coral"));
  loader.classList.add("oculto");
  tabla.removeAttribute("Hidden");
};
