// FUNCIÓN PARA INSERTAR DIVS HTML DE UN ARCHIVO TEMPORAL/PROVISIONAL AL ARCHIVO HTML FINAL

// Dirección de este archivo (components.js). Va arriba, antes de todo

const direccionDeEsteArchivo = document.currentScript.src;

async function cargar(id, archivo) {
  const contenedor = document.getElementById(id);  // Busca el div de destino

  if (!contenedor) return;                         // Busca el div de destino   

  const direccion = new URL(archivo, direccionDeEsteArchivo);  // Construye la ruta completa del archivo

  try {
    const respuesta = await fetch(direccion);      // Descarga el HTML y lo inserta

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const html = await respuesta.text();           // Descarga el HTML y lo inserta

    contenedor.innerHTML = html;                   // Descarga el HTML y lo inserta

      } catch (error) {
    console.error(`No se pudo cargar el componente "${id}":`, error);

    }
}

// LLAMAR: LE PASA LOS DATOS A LA FUNCIÓN CARGAR

cargar("footer", "./footer.html");
