window.addEventListener("load", inicio);
// Variables adicionales
var cantTemas = 0;
var cantPreguntas = 0;
let miSistema = new Sistema();
const r = 206;
var g = 0;
const b = 50;

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
  document.getElementById("elegirC").addEventListener("click", ordenarCreciente);
  document.getElementById("elegirD").addEventListener("click", ordenarDecreciente);
}

function Promedio() {
  let promedio = document.getElementById("promedio");
  var prom = cantPreguntas / cantTemas;
  if (isNaN(prom)) {
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
    if (!miSistema.existePregunta(dato.texto)) {
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
        dato.tema,
        dato.respuestaCorrecta,
        dato.respuestasIncorrectas
      );
      miSistema.agregarPregunta(preg);
    } else {
      alert("Ya existe la pregunta");
    }
  }
  miSistema.ordenarNivel();
  if(document.getElementById("elegirC").checked){
    ordenarCreciente();
  }else if(document.getElementById("elegirD").checked){
    ordenarDecreciente();
  }
  console.log(miSistema.listaTemas);
  pregTabla();
  
  let section = document.getElementById("cargaDatosSection");
  hideCarga(section);
}
// Función para esconder la sección de carga de datos en caso de que se elija no cargarlos
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

function addOption(id, label) {
  var select = document.getElementById(id);
  var OptionTxt = document.createTextNode(label);
  var option = document.createElement("option");
  option.appendChild(OptionTxt);
  select.appendChild(option);
}

//function agregarFilas(datos) {
//  let tablaMuestra = document.getElementById("tabla-muestra");
//  const tr = document.createElement("tr");
//
//  datos.forEach((dato) => {
//    const td = document.createElement("td");
//    const txtNode = document.createTextNode(dato);
//    td.appendChild(txtNode);
//    tr.appendChild(td);
//  });
//  tablaMuestra.append(tr);
//}

function Contador(id, counter) {
  let counterID = document.getElementById(id);
  counterID.innerHTML = "";
  let textNodeTotal = document.createTextNode(counter);
  counterID.appendChild(textNodeTotal);
}
// Función para añadir un tema según los valores ingresados en el formulario "Alta de Temas"
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
      alert("Este tema ya existe");
    }
  } else {
    alert("Por favor, rellene todos los campos");
  }
}
// Función para añadir pregunta según los valores ingresados en el formulario "Alta de preguntas"
function nuevaPregunta() {
  let form = document.getElementById("pregForm");
  if (form.reportValidity()) {
    let texto = document.getElementById("textoPregunta").value;
    let nivel = document.getElementById("nivel").value;
    let temaOpt = document.getElementById("temas").value;
    let correcta = document.getElementById("correcta").value;
    let incorrecta = document.getElementById("incorrecta").value.split(",");
    let temaObj = [];
    for(let tema of miSistema.listaTemas){
      if(tema.nombre==temaOpt){
        temaObj=tema;
      }
    }
    if(!miSistema.existePregunta(texto)){  
      if(incluyeStr(correcta,incorrecta)){
        let preg = new Pregunta(texto, nivel, temaObj, correcta, incorrecta);
        miSistema.agregarPregunta(preg);

        cantPreguntas++;
        Contador("totalPreguntas", cantPreguntas);
        Promedio();

        miSistema.ordenarNivel();
        if(document.getElementById("elegirC").checked){
          ordenarCreciente();
        }else if(document.getElementById("elegirD").checked){
          ordenarDecreciente();
        }
        pregTabla();

        alert("Pregunta agregada");
      }else{
        alert("Respuesta correcta y respuesta incorrecta coincide");
      }
    } else {
      alert("Ya existe una pregunta con ese nombre");
    }
  }  else {
      alert("Por favor, rellene todos los campos");
  } 
}
// Función que transforma valores numéricos al formato usado para colores (dos dígitos, cociente y resto de 16)
function toHex(number) {
  let hexStr = "";
  let first = parseInt(number/16);
  let second = parseInt(number%16);
  hexStr= hexChar(first) + hexChar(second);
  return hexStr;
}
// Función que convierte un valor numérico base 10 a su equivalente hexadecimal
function hexChar(number){
  let hex = "0123456789ABCDEF";
  let retorno = hex[number];
  return retorno;
}
// Función que genera un color aleatorio variando el green de RGB
function generateColor(){
  let colorTema=[];
  for(let tema of miSistema.listaTemas){
    g=Math.floor(Math.random()*56)+150;
    colorTema.push("#"+toHex(r)+toHex(g)+toHex(b));
  }
  return colorTema;
}
// Función que imprime las preguntas en la tabla de gestión
// Recorre cada pregunta y crea una celda para cada elemento, las listas están ordenadas previamente
function pregTabla(){
  let tablaMuestra = document.getElementById("tabla-muestra");
  tablaMuestra.innerHTML="";
  let listaColores = generateColor();
  for(let tema of miSistema.listaTemas){
    for(let preg of miSistema.listaPreguntas){
      if(tema.nombre==preg.tema.nombre){
        var n = getIndex(preg.tema.nombre);
        var tr = document.createElement("tr");
        const tdTexto = document.createElement("td");
        const tdNivel = document.createElement("td");
        const tdTema = document.createElement("td");
        const tdRespC = document.createElement("td");
        const tdRespI = document.createElement("td");
        const nodeTexto = document.createTextNode(preg.texto);
        const nodeNivel = document.createTextNode(preg.nivel);
        const nodeTema = document.createTextNode(preg.tema.nombre);
        const nodeRespC = document.createTextNode(preg.respuestaCorrecta);
        const nodeRespI = document.createTextNode(preg.respuestasIncorrectas);
        tdTexto.appendChild(nodeTexto);
        tdNivel.appendChild(nodeNivel);
        tdTema.appendChild(nodeTema);
        tdRespC.appendChild(nodeRespC);
        tdRespI.appendChild(nodeRespI);
        tr.append(tdTema);
        tr.append(tdNivel);
        tr.append(tdTexto);
        tr.append(tdRespC);
        tr.append(tdRespI);
        tablaMuestra.appendChild(tr);
        tr.style.backgroundColor = listaColores[n];
      }
    }
  }
}
// Función que recibe el nombre de un tema y retorna la posición del mismo en listaTemas
function getIndex(nombreTema){
  let index=0;
  for(let tema of miSistema.listaTemas){
    if(tema.nombre==nombreTema){
      index=miSistema.listaTemas.indexOf(tema);
    }
  }
  return index;
}
// Función que ordena los temas de forma decreciente (criterio alfabético)
function ordenarDecreciente(){
  let aux=[];
  miSistema.ordenarTemas();
  for(let i=miSistema.listaTemas.length-1;i>=0;i--){
    aux.push(miSistema.listaTemas[i]);
  }
  miSistema.listaTemas=[];
  for(let tema of aux){
    miSistema.listaTemas.push(tema);
  }
  pregTabla();
}
// Función que ordena los temas de forma creciente (criterio alfabético)
// Hace uso del método ordenarTemas, pero sirve para la interacción con radio buttons al ser una función
function ordenarCreciente(){
  miSistema.ordenarTemas();
  pregTabla();
}
// Función que revisa si un array incluye un string determinado
// Se usa para ver si "RespuestaCorrecta" se encuentra incluida en "RespuestasIncorrectas"
function incluyeStr(strA,array){
  let valido = true;
  if(array.includes(strA)){
    valido = false;
  }
  return valido;
}