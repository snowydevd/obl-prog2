// alert("ha");

window.addEventListener("load", inicio);

const confirmLoad = confirm("desea cargar datos?");

function inicio() {
  document.getElementById("guardarTema").addEventListener("click", nuevoTema);
  document
    .getElementById("guardarPregunta")
    .addEventListener("click", nuevaPregunta);
  // alert('desea cargar los datos?')
}

// funcion para evitar que se recargue la pagina al dar submit
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

// Variables adicionales
var cantTemas = 0;
var cantPreguntas = 0;
var prom = cantTemas + cantPreguntas / 2;
var temas = [];
let miSistema = new Sistema();

function nuevoTema() {
  // e.preventDefault();
  let form = document.getElementById("temaForm").valid;

  let temaName = document.getElementById("nombreTema").value;
  let temaDescription = document.getElementById("descriptionTema").value;
  if (miSistema.existeTema(temaName)) {
    var tema = new Tema(temaName, temaDescription);
    console.log(tema.nombre);
    miSistema.agregarTema(tema);
    // * AGREGAR EL TEMA AL ARRAY DE TEMAS Y AGREGAR +1 A 'cantTemas'
    //temas.push(tema.nombre);

    cantTemas += 1;
    // for (let i = 0; i <= temas.length; i++) {
    //   let tema = temas[i];
    //   if (tema === temaName) {
    //     alert(`EL tema ${temaName} ya se encuentra en la lista de temas!`);
    //   } else {
    //     temas.push(tema);
    //   }
    // }
    // * AGREGAR EL TEMA A LA LISTA `listaTemas`
    let liTemas = document.getElementById("liTemas");
    // liTemas.innerHTML = "";
    let LIObj = document.createElement("LI");
    let textNodeLI = document.createTextNode(
      `${tema.nombre}: ${tema.descripcion}`
    );

    LIObj.appendChild(textNodeLI);
    liTemas.appendChild(LIObj);

    // * AGREGAR CANTIDAD DE TEMAS (numero)
    let totalTemas = document.getElementById("totalTemasSpan");
    totalTemas.innerHTML = "";
    let textNodeTotal = document.createTextNode(cantTemas);
    totalTemas.appendChild(textNodeTotal);

    // * AGREGAR TEMA AL SELECT DE ALTA DE PREGUNTAS
    let temasSelect = document.getElementById("temas");
    let nodeTextOption = document.createTextNode(temaName);
    var temaOption = document.createElement("option");
    // temaOption.id = tema.nombre;
    temaOption.appendChild(nodeTextOption);
    temasSelect.appendChild(temaOption);

    alert(`El tema ${temaName} ha sido agregado`);
  }
}

function nuevaPregunta() {
  // e.preventDefault();

  let form = document.getElementById("pregForm");

  // if (form.reportValidity()) {
  let texto = document.getElementById("textoPregunta").value;
  let nivel = document.getElementById("nivel").value;
  let temaOpt = document.getElementById("temas").value;
  let correcta = document.getElementById("correcta").value;
  let incorrecta = document.getElementById("incorrecta").value;

  incorrecta = incorrecta.split(", ");

  // console.log(preg);
  if (miSistema.existePregunta(texto, temaOpt)) {
    let preg = new Pregunta(texto, nivel, temaOpt, correcta, incorrecta);
    miSistema.agregarPregunta(preg);
    cantPreguntas++;
    console.log(cantPreguntas);
    console.log(preg);

    let celdas = [texto, nivel, temaOpt, correcta, incorrecta];
    alert("pregunta agregada");
    // for (let i = 0; i <= celdas.length; i++) {
    //   let tr = document.createElement("tr");
    //   let td = document.createElement("td");
    //   let cellTextNode = document.createTextNode(celdas[i]);
    //   td.appendChild(cellTextNode);
    //   tr.appendChild(td);

    //   tablaMuestra.appendChild(tr);
    // }
  } else {
    alert("La pregunta ya existe o no es valida");
  }
  // } else {
  //   alert("Formulario debe ser valido");
  // }

  // agregar datos a la tabla
}

function agregarFilas(fila) {
  let tablaMuestra = document.getElementById("tabla-muestra");
  for (let i = 0; i <= fila.length; i++) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let cellTextNode = document.createTextNode(fila[i]);
    td.appendChild(cellTextNode);
    tr.appendChild(td);
    tablaMuestra.appendChild(tr);
  }
}

function cargarDatos(preguntas) {
  for (let dato of preguntas) {
    if (miSistema.existePregunta(dato.texto, dato.tema)) {
      let preg = new Pregunta(
        dato.texto,
        dato.nivel,
        dato.temasOpt,
        dato.respuestaCorrecta,
        dato.respuestasIncorrectas
      );
      let celdas = [
        dato.texto,
        dato.nivel,
        dato.temasOpt,
        dato.respuestaCorrecta,
        dato.respuestasIncorrectas,
      ];
      agregarFilas(celdas);
      console.log(dato.texto);
      miSistema.agregarPregunta(preg);

      nuevaPregunta(preg);
    }
  }
}

if (confirmLoad) {
  cargarDatos(preguntas);
  alert("datos cargados");
}
