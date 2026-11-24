import { renderHeader } from "./componentes/header.js";
import { renderFooter } from "./componentes/footer.js";
import { TaskManager } from "./componentes/taskManager.js";
import {
    validateTaskForm,
    entradaTarea,
    entradaDescripcion,
    entradaAsignado,
    entradaEstado,
    entradaFecha
} from "./componentes/validacion.js";

renderHeader('#app-header');
renderFooter('#app-footer');

const listaTareas = document.getElementById("lista-tareas");

const gestorTareas = new TaskManager("tareas", listaTareas); // la lista de tareas vive en el gestor de tareas

// cargo lo guardado, después renderizo

gestorTareas.cargar();
gestorTareas.renderizar();

// este listener maneja la funcionalidad de todos los botones para eliminar tareas

listaTareas.addEventListener("click", evento => {
    const boton = evento.target.closest("button.boton-eliminar");
    if (!boton) return;

    gestorTareas.eliminar(boton.dataset.id);  // quita la tarea de la lista, del localStorage y de la pantalla
    gestorTareas.guardar();

})

const formulario = document.getElementById("formulario-tarea");
const botonEnviar = document.getElementById("boton-crear");
const mensajeEnviado = document.getElementById("mensaje-enviado")


// manejo del envio

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (validateTaskForm()) {
        gestorTareas.agregar({ // guarda la tarea y refresca las tarjetas
            nombre: entradaTarea.value.trim(),
            descripcion: entradaDescripcion.value.trim(),
            asignado: entradaAsignado.value.trim(),
            estado: entradaEstado.value,
            fechaEntrega: entradaFecha.value
        });

        gestorTareas.guardar();  // guarda después de agregar y renderizar

        mensajeEnviado.textContent = "Tarea Creada Correctamente";
        formulario.reset();
        formulario.querySelectorAll(".is-valid, .is-invalid")
            .forEach(campo => campo.classList.remove("is-valid", "is-invalid"));

    }else {
        mensajeEnviado.textContent = "Corrija los errores del formulario";
    }
});

// ACTUALIZAR TAREA

const listaDeTareas = document.querySelector("#lista-tareas");

listaDeTareas.addEventListener("click", evento => {

    if (evento.target.classList.contains("marcar-hecha")) {

        const elementoTarea = evento.target.parentElement.parentElement;
        const id = Number(elementoTarea.dataset.tareaId);
        const tarea = gestorTareas.buscarTarea(id);

        tarea.estado = "Terminada";
        gestorTareas.renderizar();
        gestorTareas.guardar();  // guarda después de cambiar el estado y renderizar
    }
});