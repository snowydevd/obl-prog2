// Variables adicionales
var cantTemas = 0;
var temas = [];
let miSistema = new Sistema();

function agregarTema() {
  let temaName = document.getElementById("nombreTema").value;
  let temaDescription = document.getElementById("descriptionTema").value;
  var tema = new Tema(temaName, temaDescription);

  // * AGREGAR EL TEMA AL ARRAY DE TEMAS Y AGREGAR +1 A 'cantTemas'
  temas.push(tema.nombre);
  console.log(tema.nombre);
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
  let listaTemas = document.getElementById("listaTemas");
  // listaTemas.innerHTML = "";
  let LIObj = document.createElement("LI");
  let textNodeLI = document.createTextNode(
    `${tema.nombre}: ${tema.descripcion}`
  );

  LIObj.appendChild(textNodeLI);
  listaTemas.appendChild(LIObj);

  // * AGREGAR CANTIDAD DE TEMAS (numero)
  let totalTemas = document.getElementById("totalTemasSpan");
  totalTemas.innerHTML = "";
  let textNodeTotal = document.createTextNode(cantTemas);
  totalTemas.appendChild(textNodeTotal);

  // * AGREGAR TEMA AL SELECT DE ALTA DE PREGUNTAS
  let temasSelect = document.getElementById("temas");
  // temasSelect.innerHTML = "";
  let nodeTextOption = document.createTextNode(temaName);
  let temaOption = document.createElement("option");

  temaOption.value = nodeTextOption;
  temaOption.appendChild(nodeTextOption);
  temasSelect.appendChild(temaOption);

  alert(`El tema ${temaName} ha sido agregado`);
}

function nuevaPregunta() {
  let texto = document.getElementById("textoPregunta").value;
  let nivel = document.getElementById("nivel").value;
  let temas = document.getElementById("temas").value;
  let correcta = document.getElementById("correcta").value;
  let incorrecta = document.getElementById("incorrecta").value;

  let celdas = [texto, nivel, temas, correcta, incorrecta];

  let preg = new Pregunta(texto, nivel, temas, correcta, incorrecta);
  miSistema.agregarPregunta(preg);

  let tablaMuestra = document.getElementById("tabla-muestra");

  alert(preg.texto);
  // for (let i = 0; i <= celdas.length; i++) {
  //   let tr = document.createElement("tr");
  //   let td = document.createElement("td");
  //   let cellTextNode = document.createTextNode(celdas[i]);
  //   td.appendChild(cellTextNode);
  //   tr.appendChild(td);

  //   tablaMuestra.appendChild(tr);
  // }
  // agregar datos a la tabla
}

function cargarDatos() {}
