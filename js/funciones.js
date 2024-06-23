window.addEventListener("load", inicio);
// Variables adicionales
var cantTemas = 0;
var cantPreguntas = 0;
var prom = cantTemas / cantPreguntas;
var temas = [];
var indiceListaPreguntas = 0;
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
    .addEventListener("click", cargarDatos);
  document
    .getElementById("cancelCargaDatos")
    .addEventListener("click", hideCarga);
  document.getElementById("infoLink").addEventListener("click", mostrarInfo);
  document
    .getElementById("gestionLink")
    .addEventListener("click", mostrarGestion);
  document.getElementById("jugarLink").addEventListener("click", mostrarJugar);
  document
    .getElementById("jugarBtn")
    .addEventListener("click", mostrarPregunta);

  document
    .getElementById("siguientePregunta")
    .addEventListener("click", siguientePregunta);
  document
    .getElementById("terminarJuego")
    .addEventListener("click", terminarJuego);
}

function Promedio() {
  let promedio = document.getElementById("promedio");
  // console.log(cantPreguntas);
  // console.log(cantTemas);
  if (isNaN(promedio.value)) {
    promedio.innerHTML = "Sin datos";
  } else {
    promedio.innerHTML = parseInt(prom);
  }
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

function cargarDatos() {
  for (let dato of preguntas) {
    if (!miSistema.existePregunta(dato.texto, dato.tema.nombre)) {
      if (!miSistema.existeTema(dato.tema.nombre)) {
        cantTemas++;
        var tema = new Tema(dato.tema.nombre, dato.tema.descripcion);
        miSistema.agregarTema(tema);

        addOption("temas", tema.nombre);
        addOption("temaJuego", tema.nombre);
        addList("liTemas", tema.nombre, tema.descripcion);
        Contador("totalTemasSpan", cantTemas);
        Promedio();
      } else {
        console.log("tema ya existe");
      }

      cantPreguntas++;
      Contador("totalPreguntas", cantPreguntas);

      let preg = new Pregunta(
        dato.texto,
        dato.nivel,
        tema,
        dato.respuestaCorrecta,
        dato.respuestasIncorrectas
      );

      miSistema.agregarPregunta(preg);

      let celdas = [
        dato.texto,
        dato.nivel,
        tema.nombre,
        dato.respuestaCorrecta,
        dato.respuestasIncorrectas,
      ];
      agregarFilas(celdas);
    } else {
      alert("Ya existe la pregunta");
    }
  }
  let section = document.getElementById("cargaDatosSection");

  section.style.display = "none";
}

function hideSection(id) {
  let section = document.getElementById(id);
  section.style.display = "none";
}
// funcion para esconder la seccion de carga de datos en caso de que se elija no cargarlos
function hideCarga() {
  let section = document.getElementById("cargaDatosSection");

  section.style.display = "none";
}

function addList(id, title, desc) {
  let liTemas = document.getElementById(id);
  let LIObj = document.createElement("LI");
  let textNodeLI = document.createTextNode(`${title}: ${desc}`);

  LIObj.appendChild(textNodeLI);
  liTemas.appendChild(LIObj);
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

function addOption(id, label) {
  var select = document.getElementById(id);
  var OptionTxt = document.createTextNode(label);
  var option = document.createElement("option");
  option.value = label;
  option.appendChild(OptionTxt);
  select.appendChild(option);
}

function Contador(id, counter) {
  let counterID = document.getElementById(id);
  counterID.innerHTML = "";
  let textNodeTotal = document.createTextNode(counter);
  counterID.appendChild(textNodeTotal);
}

function nuevoTema() {
  let temaForm = document.getElementById("temaForm");

  if (temaForm.reportValidity()) {
    let temaName = document.getElementById("nombreTema").value;
    let temaDescription = document.getElementById("descriptionTema").value;

    if (!miSistema.existeTema(temaName)) {
      var tema = new Tema(temaName, temaDescription);
      miSistema.agregarTema(tema);

      cantTemas += 1;

      addOption("temas", temaName);
      addList("liTemas", tema.nombre, tema.descripcion);
      Contador("totalTemasSpan", cantTemas);
      Promedio();
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

    let preg = new Pregunta(texto, nivel, temaOpt, correcta, incorrecta);
    miSistema.agregarPregunta(preg);

    cantPreguntas++;
    Contador("totalPreguntas", cantPreguntas);
    Promedio();

    let celdas = [texto, nivel, temaOpt, correcta, incorrecta];
    agregarFilas(celdas);

    alert("pregunta agregada");
  } else {
    alert("Porfavor, rellene todos los campos");
  }
}

function mostrarPregunta() {
  let form = document.getElementById("gameForm");
  if (form.reportValidity()) {
    document.getElementById("juegoSection").style.display = "block";

    let listaPreguntas = miSistema.listaPreguntas;
    let listaPreguntasValidas = [];

    let temaJuego = document.getElementById("temaJuego").value;
    console.log("Tema del juego:", temaJuego);

    // Obtener y convertir el valor del nivel del juego
    let nivelJuego = parseInt(document.getElementById("nivelJuego").value);
    console.log("Nivel del juego:", nivelJuego);

    let valido = listaPreguntas.filter((pregunta) => {
      let retorno = false;
      let nivel = pregunta.nivel;
      let tema = pregunta.tema.nombre.trim().toLowerCase();

      console.log(pregunta.tema.nombre);

      let nivelCoincide = nivel == nivelJuego;
      let temaCoincide = tema == temaJuego.trim().toLowerCase();

      // if (!nivelCoincide || !temaCoincide) {
      //   alert(`No existen preguntas con el tema ${temaJuego} y ${nivelJuego}`);
      // }

      return nivelCoincide && temaCoincide;
    });

    listaPreguntasValidas.push(valido);

    listaPreguntasValidas[0].forEach((preg) => {
      let pregText = document.getElementById(`textoJuego`);
      pregText.innerText = preg.texto;

      let respuestasTotal = [];

      respuestasTotal.push(preg.respuestaCorrecta);
      respuestasTotal.push(...preg.respuestasIncorrectas);

      respuestasTotal.sort();

      console.log(`respuestas Totales:  ${respuestasTotal} `);

      let resContainer = document.getElementById("respuestasContainer");

      for (let res of respuestasTotal) {
        let resButton = document.createElement("button");
        resButton.className = "respuestas";
        resButton.id = res;
        resButton.innerText = res;
        resButton.addEventListener("click", () => {
          verificarRepuesta(res, preg.respuestaCorrecta);
        });
        resContainer.appendChild(resButton);
      }
    });

    console.log(listaPreguntasValidas);
    console.log("Preguntas válidas:", valido);
  } else {
    console.error("miSistema.listaPreguntas no es un array válido");
  }
}

function terminarJuego() {}

function siguientePregunta() {}

function verificarRepuesta(resSel, resCorr) {
  let esCorrecta = false;
  if (resSel === resCorr) {
    // reproducir sonido
    alert("correcto");

    indiceListaPreguntas++;
    esCorrecta = true;
    // if (IndexPreguntaActual < preguntaActual.length) {
    //   mostrarPregunta();
    // } else {
    //   alert("juego terminado");
    //   document.getElementById("juegoSection").style.display = "none";
    // }
  } else {
    alert("Respuesta Incorrecta, intente de nuevo");
  }
  return esCorrecta;
}
