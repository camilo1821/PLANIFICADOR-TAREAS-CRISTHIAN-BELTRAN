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

export const entradaTarea = document.getElementById("dato-nombre");
export const entradaDescripcion = document.getElementById("dato-descripcion");
export const entradaAsignado = document.getElementById("dato-asignado");
export const entradaEstado = document.getElementById("dato-estado");
export const entradaFecha = document.getElementById("dato-fecha");

entradaFecha.min = new Date().toLocaleDateString("en-CA"); // bloquea fechas anteriores a la actual

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

export function validateTaskForm() {
    const nombreValido = revisionNombre();
    const descripcionValida = revisionDescripcion();
    const asignadoValido = revisionAsignado();
    const estadoValido = revisionEstado();
    const fechaValida = revisionFecha();
    return nombreValido && descripcionValida && asignadoValido && estadoValido && fechaValida;
}