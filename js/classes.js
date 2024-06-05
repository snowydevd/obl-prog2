// ! EJEMPLO DE CREACION DE CLASE

class editorial {
  constructor(nombre, pais) {
    this.nombre = nombre;
    this.pais = pais;
  }

  retornarDatos() {
    alert(`El nombre de la editorial es: ${this.nombre} y es de ${this.pais}`);
  }
}

// ! EJEMPLO DE CLASE ASOCIADA A OTRA
class libro {
  constructor(title, pages, editorial, desc) {
    this.title = title;
    this.pages = pages;
    this.editorial = editorial;
    this.desc = desc;
  }

  toString() {
    return `El libro se llama ${this.title}, tiene ${this.pages} paginas, su editorial es: ${this.editorial} y su descripcion es ${this.desc}`;
  }
}

let ed1 = new editorial("El pais", "Uruguay");
let l1 = new libro("El naufrago", 100, ed1.retornarDatos, "trata de ....");
