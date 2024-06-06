window.addEventListener("load", inicio);
function inicio() {
  document.getElementById("guardarTema").addEventListener("click", agregarTema);
}

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});
