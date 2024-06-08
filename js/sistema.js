window.addEventListener("load", inicio);

function inicio() {
  document.getElementById("guardarTema").addEventListener("click", agregarTema);
  document
    .getElementById("guardarPregunta")
    .addEventListener("click", nuevaPregunta);
}

// funcion para evitar que se recargue la pagina al dar submit
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});
