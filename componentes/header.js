export function renderHeader(selector = "#app-header") {
    const contenedor = document.querySelector(selector);
    if (!contenedor) return;

    contenedor.innerHTML = `
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand bitcount-ink-titulo" href="#">
                    <img id="logo" src="./assets/12178616.png" alt="Logo" width="30" height="24"
                        class="d-inline-block align-text-top">
                    PLANIFICADOR DE TAREAS
                </a>
            </div>
        </nav>
    `;
}