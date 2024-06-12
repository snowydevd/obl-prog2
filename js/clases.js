// CLASE PRIMORDIAL PARA MANEJAR LAS LISTAS TANTO DE TEMAS, COMO PREGUNTAS Y TEMAS.

class Sistema {
  constructor() {
    this.listaPreguntas = [];
    this.listaTemas = [];
  }
  agregarTema(tema) {
    this.listaTemas.push(tema);
  }
  agregarPregunta(pregunta) {
    this.listaPreguntas.push(pregunta);
  }
  existeTema(nombreTema) {
    let valido = true;
    for (let tema of this.listaTemas) {
      if (nombreTema == tema) {
        valido = false;
      }
    }
    return valido;
  }
  existePregunta(texto, tema) {
    let valido = true;
    for (let preg of this.listaPreguntas) {
      if (preg.tema == tema && preg.texto == texto) {
        valido = false;
      }
    }
    return valido;
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
  constructor(texto, nivel, tema, correcta, incorrectas) {
    this.texto = texto;
    this.respuestaCorrecta = correcta;
    this.respuestasIncorrectas = incorrectas;
    this.nivel = nivel;
    this.tema = tema;
  }
  // separarIncorrectas(incorrectas) {
  //   this.respuestasIncorrectas = incorrectas.split;
  // }

  esCorrecta() {
    return alert(`${this.respuestaCorrecta} es correcto!`);
  }
  esIncorrecta() {
    return alert(`La respuesta es incorrecta!`);
  }
}

// export { Pregunta, Tema };
