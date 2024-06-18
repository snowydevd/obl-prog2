// alert("ha");

window.addEventListener("load", inicio);
// Variables adicionales
var cantTemas = 0;
var cantPreguntas = 0;
var prom = cantTemas / cantPreguntas;
var temas = [];
let miSistema = new Sistema();

var form = document.querySelectorAll("form");

form.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
});

function inicio() {
  document.getElementById("guardarTema").addEventListener("click", nuevoTema);
  document
    .getElementById("guardarPregunta")
    .addEventListener("click", nuevaPregunta);

  document
    .getElementById("cargarDatosBtn")
    .addEventListener("click", cargarDatos(preguntas));
  document
    .getElementById("cancelCargaDatos")
    .addEventListener("click", hideCarga);

  document.getElementById("infoLink").addEventListener("click", mostrarInfo);
  document
    .getElementById("gestionLink")
    .addEventListener("click", mostrarGestion);
  document.getElementById("jugarLink").addEventListener("click", mostrarJugar);

  // alert('desea cargar los datos?')
}

function mostrarInfo() {
  document.getElementById("info").style.display = "block";
  document.getElementById("admin").style.display = "none";
  document.getElementById("jugar").style.display = "none";
  document.getElementById("cargaDatosSection").style.display = "none";
}

function mostrarGestion() {
  document.getElementById("info").style.display = "none";
  document.getElementById("admin").style.display = "block";
  document.getElementById("jugar").style.display = "none";
  document.getElementById("cargaDatosSection").style.display = "block";
}

function mostrarJugar() {
  document.getElementById("info").style.display = "none";
  document.getElementById("admin").style.display = "none";
  document.getElementById("jugar").style.display = "block";
  document.getElementById("cargaDatosSection").style.display = "none";
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
      console.log(preg);
      agregarFilas(celdas);
    }
  }
  let section = document.getElementById("cargaDatosSection");

  section.style.display = "none";
}
// funcion para esconder la seccion de carga de datos en caso de que se elija no cargarlos
function hideCarga() {
  let section = document.getElementById("cargaDatosSection");
  section.style.display = "none";
}

function nuevoTema() {
  // e.preventDefault();
  let temaForm = document.getElementById("temaForm");

  if (temaForm.reportValidity()) {
    let temaName = document.getElementById("nombreTema").value;
    let temaDescription = document.getElementById("descriptionTema").value;

    if (!miSistema.existeTema(temaName)) {
      var tema = new Tema(temaName, temaDescription);
      miSistema.agregarTema(tema);

      // * AGREGAR EL TEMA AL ARRAY DE TEMAS Y AGREGAR +1 A 'cantTemas'
      //temas.push(tema.nombre);

      cantTemas += 1;
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
    } else {
      alert("este tema ya existe");
    }
  } else {
    alert("Porfavor, rellene todos los campos");
  }
}

function nuevaPregunta() {
  let form = document.getElementById("pregForm");
  if (form.reportValidity()) {
    let texto = document.getElementById("textoPregunta").value;
    let nivel = document.getElementById("nivel").value;
    let temaOpt = document.getElementById("temas").value;
    let correcta = document.getElementById("correcta").value;
    let incorrecta = document.getElementById("incorrecta").value;

    incorrecta = incorrecta.split(", ");

    // console.log(preg);
    // if (miSistema.existePregunta(texto, temaOpt)) {
    let preg = new Pregunta(texto, nivel, temaOpt, correcta, incorrecta);
    miSistema.agregarPregunta(preg);

    cantPreguntas++;
    let contadorPreguntas = document.getElementById("totalPreguntas");
    contadorPreguntas.innerHTML = cantPreguntas;

    let celdas = [texto, nivel, temaOpt, correcta, incorrecta];
    agregarFilas(celdas);

    alert("pregunta agregada");
    // agregar datos a la tabla
  } else {
    alert("Porfavor, rellene todos los campos");
  }
}

function agregarFilas(datos) {
  let tablaMuestra = document.getElementById("tabla-muestra");
  const tr = document.createElement("tr");

  datos.forEach((dato) => {
    const td = document.createElement("td");
    const txtNode = document.createTextNode(dato);
    td.appendChild(txtNode);
    tr.appendChild(td);
  });

  tablaMuestra.append(tr);
}
