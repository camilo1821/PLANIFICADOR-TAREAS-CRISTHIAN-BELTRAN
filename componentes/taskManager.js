export class TaskManager {
    #tareas = [];
    #clave;

    constructor (clave = "tareas"){
        this.#clave = clave;
        this.#cargar();
    }

    // leer las tarjetas guardadas

    #cargar() {
        try {
            this.#tareas = JSON.parse(localStorage.getItem(this.#clave)) || [];
        } catch {
            this.#tareas = [];
        }
    }

    #guardar() {
        localStorage.setItem(this.#clave, JSON.stringify(this.#tareas));
    }

    agregar(datos) {
        const tarea = {id: Date.now(), ...datos} // ID de la tarea mas los datos del formulario
        this.#tareas.push(tarea);
        this.#guardar();
        return tarea;
    }

    eliminar(id) {
        this.#tareas = this.#tareas.filter(tarea => tarea.id !== Number(id));
        this.#guardar();
    }

    obtenerTodas() {
        return [...this.#tareas] // es una copia para que nadie modifique la lista desde afuera
    }
}