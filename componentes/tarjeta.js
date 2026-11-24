// tarjetas de tareas // 

const colorEstado = {
    "Iniciada": "secondary",
    "En progreso": "warning text-dark",
    "Terminada": "success"
};

export function crearTarjeta(tarea) {

    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6";

    // el id de la tarea queda en el atributo  del contenedor de la tarea

    columna.innerHTML = `
        <div class="card h-100" data-tarea-id="${tarea.id}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${tarea.nombre}</h5>
                <span class="badge text-bg-${colorEstado[tarea.estado] || "secondary"} align-self-start mb-2">${tarea.estado}</span>
                <p class="card-text">${tarea.descripcion}</p>
                <p class="card-text small text-muted mt-auto">Asignada a: ${tarea.asignado}</p>
                <p class="card-text small text-muted mt-auto">Fecha de entrega: ${tarea.fechaEntrega}</p>
                <button type="button" class="btn btn-sm btn-outline-success align-self-start mb-2 marcar-hecha">Marcar como hecha</button>
                <button type="button" class="btn btn-sm btn-outline-danger align-self-start boton-eliminar" data-id="${tarea.id}">Eliminar</button>
            </div>
        </div>
    `;

    return columna;
}