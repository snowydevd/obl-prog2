// Variables adicionales
var cantTemas = 0;
var temas = [];

function agregarTema() {
  let temaName = document.getElementById("nombreTeama").value;
  let temaDescription = document.getElementById("descriptionTema").value;
  var tema = new Tema(temaName, temaDescription);

  // * AGREGAR EL TEMA AL ARRAY DE TEMAS Y AGREGAR +1 A 'cantTemas'
  temas.push(tema);
  cantTemas += 1;

  // * AGREGAR EL TEMA A LA LISTA `listaTemas`
  let listaTemas = document.getElementById("listaTemas");
  // listaTemas.innerHTML = "";
  let LIObj = document.createElement("LI");
  let textNodeLI = document.createTextNode(temaName);

  LIObj.appendChild(textNodeLI);
  listaTemas.appendChild(LIObj);

  // * AGREGAR CANTIDAD DE TEMAS (numero)
  let totalTemas = document.getElementById("totalTemasSpan");
  totalTemas.innerHTML = "";
  let textNodeTotal = document.createTextNode(cantTemas);
  totalTemas.appendChild(textNodeTotal);
  alert(`El tema ${temaName} ha sido agregado`);
}
