export function renderFooter(selector = "#app-footer") {
    const contenedor = document.querySelector(selector);
    if (!contenedor) return;

    contenedor.innerHTML = `
        <footer class="bg-dark text-white pt-0 pb-3 fixed-bottom">
            <div class="container text-center text-md-start">
                <div class="row text-center">
                    <div class="col-md-8 col-lg-8 col-xl-8 mx-auto mt-2">
                        <h5 class="grechen-fuemen-regular text-uppercase mb-0 font-weight-bold text-white">
                            CRISTHIAN CAMILO BELTRAN RAMIREZ ®
                        </h5>
                    </div>
                </div>
            </div>
        </footer>
    `;
}