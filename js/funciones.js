window.addEventListener("load", inicio);
// Variables adicionales
var cantTemas = 0;
var cantPreguntas = 0;
var prom = cantTemas / cantPreguntas;
var temas = [];
var preguntaActual = [];
var IndexPreguntaActual = 0;
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
}

function Promedio() {
  let promedio = document.getElementById("promedio");
  console.log(cantPreguntas);
  console.log(cantTemas);
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
  console.log("funcion cargaDatos");
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
        console.log(`tema ${tema.nombre} agregado`);
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
    let seccion = document.getElementById("juegoSection");
    seccion.style.display = "block";

    let preguntaEncontrada = preguntaActual[IndexPreguntaActual];

    let listaRespuestas = [
      ...preguntaEncontrada.respuestasIncorrectas,
      preguntaEncontrada.respuestaCorrecta,
    ];

    listaRespuestas = listaRespuestas.sort(() => Math.random() - 0.5); // Mezclar las respuestas
    document.getElementById("terminarJuego").addEventListener("click", () => {
      seccion.style.display = "none";
      alert("juego terminado");
    });

    let gameTema = document.getElementById("gameTema").value;
    let nivelJuego = document.getElementById("nivelJuego").value;

    let pregText = document.getElementById("textoPregunta");
    pregText.innerHTML = "";

    let preguntasSistema = miSistema.listaPreguntas;

    for (let pregunta of preguntasSistema) {
      if (pregunta.tema === gameTema && pregunta.nivel === nivelJuego) {
        preguntaEncontrada = pregunta;
        pregText.innerHTML = pregunta.texto;
      }
    }
    let respuestasContainer = document.getElementById("respuestasContainer");

    listaRespuestas.forEach((respuesta) => {
      let resButton = document.createElement("button");
      resButton.className = "respuestas";
      resButton.innerHTML = respuesta;
      resButton.addEventListener("click", () =>
        verificarRepuesta(respuesta, preguntaEncontrada.respuestaCorrecta)
      );
      respuestasContainer.appendChild(resButton);
    });
  }
}

function verificarRepuesta(resSel, resCorr) {
  if (resSel === resCorr) {
    // reproducir sonido
    alert("correcto");
    if (IndexPreguntaActual < preguntaActual.length) {
      mostrarPregunta();
    } else {
      alert("juego terminado");
      document.getElementById("JuegoSection").style.display = "none";
    }
  } else {
    alert("Respuesta Incorrecta, intente de nuevo");
  }
}
