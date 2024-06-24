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
    // HECHO CON CHATGPT-4
    // prompt: Hazme una funcion que evalue si el atributo nombre del objeto tema, es igual al nombreTema el cual ingresa el usuario, esta evaluacion sera hecha dentro de un array, por lo tanto la funcion debera retornar true o false para ser usado posteriormente en otras partes del codigo

    // el metodo .some() comprueba si al menos un elemento de un array cumple con una condicion, en el caso de que sea asi, devuelve true

    let valido = this.listaTemas.some((tema) => tema.nombre === nombreTema);

    return valido;
  }
  existePregunta(texto) {
    let valido = this.listaPreguntas.some(
      (pregunta) => pregunta.texto === texto
    );

    return valido;
  }
  ordenarTemas() {
    this.listaTemas.sort(function (a, b) {
      return a.nombre.localeCompare(b.nombre);
    });
  }
  ordenarNivel() {
    this.listaPreguntas.sort(function (a, b) {
      return a.nivel - b.nivel;
    });
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

  esCorrecta() {
    return alert(`${this.respuestaCorrecta} es correcto!`);
  }
  esIncorrecta() {
    return alert(`La respuesta es incorrecta!`);
  }
}
