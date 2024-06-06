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
  constructor(tema, preText, preCorrecta) {
    this.tema = tema;
    this.preText = preText;
    this.preCorrecta = preCorrecta;
    this.opciones = [];
  }
  // agregarCorrecta(correcta) {}
  agregarOpcion(opcion) {
    this.opciones.push(opcion);
  }
}

// export { Pregunta, Tema };
