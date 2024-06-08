class Sistema {
  constructor() {
    this.listaPreguntas = [];
  }
  agregarPregunta(pregunta) {
    this.listaPreguntas.push(pregunta);
  }
}
class Tema {
  constructor(nombre, descripcion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
  printTema() {
    return `Tema: ${this.nombre} \n Descripcion: ${this.descripcion}`;
  }
}

class Pregunta {
  constructor(texto, nivel, tema, correcta) {
    this.texto = texto;
    this.respuestaCorrecta = correcta;
    this.respuestasIncorrectas = [];
    this.nivel = nivel;
    this.tema = tema;
  }
  separarIncorrectas(incorrectas) {
    this.respuestasIncorrectas = incorrectas.split;
  }

  esCorrecta() {
    return alert(`${this.respuestaCorrecta} es correcto!`);
  }
  esIncorrecta() {
    return alert(`La respuesta es incorrecta!`);
  }
}

// export { Pregunta, Tema };
