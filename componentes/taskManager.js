import { crearTarjeta } from "./tarjeta.js";

export class TaskManager {
    #tareas = [];
    #clave;
    #contenedor;
    #idActual = 0;  // contador de ids: la próxima tarea usa este número
    #claveId;

    constructor (clave = "tareas", contenedor, claveId = "ultimoId"){
        this.#clave = clave;
        this.#contenedor = contenedor; // el div donde se pintan las tarjetas
        this.#claveId = claveId;
    }

    // guardar tareas y contador de ids en localStorag

    guardar() {
        localStorage.setItem(this.#clave, JSON.stringify(this.#tareas));
        localStorage.setItem(this.#claveId, String(this.#idActual));
    }
   
    // leer las tarjetas guardadas

    cargar() {
        const tareasGuardadas = localStorage.getItem(this.#clave);
        if (tareasGuardadas) {
            this.#tareas = JSON.parse(tareasGuardadas);
        }

        const idGuardado = localStorage.getItem(this.#claveId);
        if (idGuardado) {
            this.#idActual = Number(idGuardado);
        }
    }

    // vuelve a dibujar todas las tarjetas a partir de la lista de tareas

    renderizar() {
        this.#contenedor.replaceChildren();  // vacía el contenedor para no duplicar tarjetas
        this.#tareas.forEach(tarea => this.#contenedor.append(crearTarjeta(tarea)));
    }

    agregar(datos) {
        const tarea = {id: this.#idActual, ...datos};
        this.#idActual++;  // el siguiente id es único
        this.#tareas.push(tarea);
        this.renderizar();
        return tarea;
    }

    eliminar(id) {
        this.#tareas = this.#tareas.filter(tarea => tarea.id !== Number(id));
        this.renderizar();
    }

    obtenerTodas() {
        return [...this.#tareas] // es una copia para que nadie modifique la lista desde afuera
    }

    // recibe un id y devuelve la tarea que le corresponde

    buscarTarea(id) {
        let tareaEncontrada;
        for (const tarea of this.#tareas) {
            if (tarea.id === id) {
                tareaEncontrada = tarea;
            }
        }
        return tareaEncontrada;
    }
}

