"use strict";
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //cuando agregas un curso presionando "agregar al carrito"
  // En vez de agregar evento por evento, se crean funciones y se agregan los eventos acá.
  // En vez de la función xxx.addEventListener('click',()=>{}), la función q se pasa como parámetro ya está creada debajo
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso);

 //Vaciar el carrito
 vaciarCarritoBtn.addEventListener('click', ()=>{
  articulosCarrito = []; 
  limpiarHTML();
});
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();
  //previene q se vaya el scroll para arriba
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina un curso del carrito
function eliminarCurso(e){
  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');
    // Elimina del arreglo articulosCarrito por id con filter
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    carritoHTML();
  }
}
//lee el contenido del HTML al que le dimos click y extrae info del curso
function leerDatosCurso(curso) {
  console.log(curso);

  //crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //actualizar cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso; //retorna los objetos no duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agregar el curso al carrito
    //Agrega elementos al arreglo carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);
  carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
  limpiarHTML();
  // limpiar el html

  // recorre el carrito y genera el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
           <img src="${imagen}" width="100">
      </td>
      <td>
          ${titulo}
      </td>
      <td>
          ${precio}
      </td>
      <td>
          ${cantidad}
      </td>
      <td>
          <a href="#" class="borrar-curso" data-id="${id}"> x </a>
      </td>
    `;
    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Elimina el curso del html
function limpiarHTML() {
  // contenedorCarrito.innerHTML = '';
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
