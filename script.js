import { renderHeader } from "./componentes/header.js";
import { renderFooter } from "./componentes/footer.js";
import { TaskManager } from "./componentes/taskManager.js";

renderHeader('#app-header');
renderFooter('#app-footer');

const gestorTareas = new TaskManager(); // la lista de tareas vive en el gestor de tareas

function validateTaskForm() {
    const nombreValido = revisionNombre();
    const descripcionValida = revisionDescripcion();
    const asignadoValido = revisionAsignado();
    const estadoValido = revisionEstado();
    const fechaValida = revisionFecha();
    return nombreValido && descripcionValida && asignadoValido && estadoValido && fechaValida;
}

/* reglas */

const reglaAsignado = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/; //permite letras mayusculas y minusculas
//de la a la z, incluyendo tildes y espacios
const minNombre = 8;
const minDescripcion = 15;
const maxDescripcion = 100;
const minAsignado = 8;

function validarNombre(nombre) {
    return nombre.trim().length > minNombre;
}

function validarAsignado(asignado) {
    const asignadoSinEspacios = asignado.trim();
    return asignadoSinEspacios.length > minAsignado && reglaAsignado.test(asignadoSinEspacios);
}

function validarDescripcion(descripcion) {
    const numeroCaracteres = descripcion.trim().length;
    if (numeroCaracteres <= minDescripcion) {
        return false; // descripcion demasiado corta
    }

    else if (numeroCaracteres > maxDescripcion) {
        return false; // descripcion demasiado larga

    } else {
        return true;
    }
}

function validarEstado(estado) { // hace que el estado sea valido si es escoge algo distinto al estado vacío
    return estado !== "";
}

function validarFecha(fecha) {
    return fecha.trim() !== "";
}

/* traigo los elementos del DOM */

const entradaTarea = document.getElementById("dato-nombre");
const entradaDescripcion = document.getElementById("dato-descripcion");
const entradaAsignado = document.getElementById("dato-asignado");
const entradaEstado = document.getElementById("dato-estado");
const entradaFecha = document.getElementById("dato-fecha");

entradaFecha.min = new Date().toLocaleDateString("en-CA"); // bloquea fechas anteriores a la actual

const listaTareas = document.getElementById("lista-tareas");

/* agrego los nuevos divs donde se muestran los mensajes */

const campoValidacionNombre = document.getElementById("validacion-nombre");
const campoValidacionAsignado = document.getElementById("validacion-asignado");
const campoValidacionDescripcion = document.getElementById("validacion-descripcion");
const campoValidacionEstado = document.getElementById("validacion-estado");
const campoValidacionFecha = document.getElementById("validacion-fecha");

// funcion para escribir el mensaje y marcar el input justo antes del div

function mostrarResultado(campo, esValido, mensajeValido, mensajeError) {
    const entrada = campo.previousElementSibling;
    entrada.classList.toggle("is-valid", esValido);
    entrada.classList.toggle("is-invalid", !esValido);
    campo.textContent = esValido ? mensajeValido : mensajeError;
}

/* validacion de campos */

function revisionNombre() {
    const nombreValido = validarNombre(entradaTarea.value);
    mostrarResultado(campoValidacionNombre, nombreValido, "Nombre Válido", "Nombre Inválido (no puede estar vacío y debe tener más de 8 caracteres)");
    return nombreValido;
}
entradaTarea.addEventListener("blur", revisionNombre)

function revisionAsignado() {
    const asignadoValido = validarAsignado(entradaAsignado.value);
    mostrarResultado(campoValidacionAsignado, asignadoValido, "Asignado Válido", "Asignado Inválido (solo letras y espacios, más de 8 caracteres)");
    return asignadoValido;
}
entradaAsignado.addEventListener("blur", revisionAsignado); // valida el campo cuando se quita el cursor del mismo

function revisionDescripcion() {
    const descripcionValida = validarDescripcion(entradaDescripcion.value);
    mostrarResultado(campoValidacionDescripcion, descripcionValida, "Descripción Válida", "Descripción Inválida (debe tener más de 15 y máximo 100 caracteres)");
    return descripcionValida
}
entradaDescripcion.addEventListener("blur", revisionDescripcion); // valida el campo cuando se quita el cursor del mismo

function revisionEstado() {
    const estadoValido = validarEstado(entradaEstado.value);
    mostrarResultado(campoValidacionEstado, estadoValido, "Estado Válido", "Estado Inválido (Escoja 1 de los 3 estados)");
    return estadoValido
}
entradaEstado.addEventListener("blur", revisionEstado); // valida el campo cuando se quita el cursor del mismo

function revisionFecha() {
    const fechaValida = validarFecha(entradaFecha.value);
    mostrarResultado(campoValidacionFecha, fechaValida, "Fecha Válida", "Fecha Inválida (la fecha de entrega no puede estar vacía)");
    return fechaValida
}
entradaFecha.addEventListener("blur", revisionFecha); // valida el campo cuando se quita el cursor del mismo

// tarjetas de tareas // 

const colorEstado = {
    "Iniciada": "secondary",
    "En progreso": "warning text-dark",
    "Terminada": "success"
};

function crearTarjeta(tarea) {

    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6";

    const tarjeta = document.createElement("div");
    tarjeta.className = "card h-100";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body d-flex flex-column";

    const titulo = document.createElement("h5");
    titulo.className = "card-title";
    titulo.textContent = tarea.nombre;

    const estado = document.createElement("span");
    estado.className = `badge text-bg-${colorEstado[tarea.estado] || "secondary"} align-self-start mb-2`;
    estado.textContent = tarea.estado;

    const descripcion = document.createElement("p");
    descripcion.className = "card-text";
    descripcion.textContent = tarea.descripcion;

    const asignado = document.createElement("p");
    asignado.className = "card-text small text-muted mt-auto";
    asignado.textContent = `Asignada a: ${tarea.asignado}`

    const fecha = document.createElement("p");
    fecha.className = "card-text small text-muted mt-auto";
    fecha.textContent = `Fecha de entrega: ${tarea.fechaEntrega}`

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.className = "btn btn-sm btn-outline-danger align-self-start";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.dataset.id = tarea.id;  // con esto sabemos que tarea borrar al darle click

    cuerpo.append(titulo, estado, descripcion, asignado, fecha, botonEliminar);
    tarjeta.append(cuerpo);
    columna.append(tarjeta);
    return columna;
}

function renderizarTareas() {
    listaTareas.replaceChildren();  // vacía el contenedor
    const tareas = gestorTareas.obtenerTodas();



    tareas.forEach(tarea => listaTareas.append(crearTarjeta(tarea)));
}

// este listener maneja la funcionalidad de todos los botones para eliminar tareas

listaTareas.addEventListener("click", evento => {
    const boton = evento.target.closest("button[data-id]");
    if (!boton) return;

    gestorTareas.eliminar(boton.dataset.id);  // quita la tarea de la lista y del localStorage
    renderizarTareas();  // quita la tarea de la pantalla
})

const formulario = document.getElementById("formulario-tarea");
const botonEnviar = document.getElementById("boton-crear");
const mensajeEnviado = document.getElementById("mensaje-enviado")


// manejo del envio

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (validateTaskForm()) {
        gestorTareas.agregar({ // guarda la tarea antes de hacer el reset ya que este borra los valores
            nombre: entradaTarea.value.trim(),
            descripcion: entradaDescripcion.value.trim(),
            asignado: entradaAsignado.value.trim(),
            estado: entradaEstado.value,
            fechaEntrega: entradaFecha.value
        });

        renderizarTareas();  // refresca las tarjetas, las actualiza


        mensajeEnviado.textContent = "Tarea Creada Correctamente";
        formulario.reset();
        formulario.querySelectorAll(".is-valid, .is-invalid")
            .forEach(campo => campo.classList.remove("is-valid", "is-invalid"));

    }else {
        mensajeEnviado.textContent = "Corrija los errores del formulario";
    }
});

renderizarTareas();  // pinta las tarjetas que ya han sido guardadas al recargar la página