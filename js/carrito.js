// Obtener el carrito actual desde LocalStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("sonido_vivo_carrito")) || [];
}

// Guardar el carrito actualizado en LocalStorage
function guardarCarrito(carrito) {
  localStorage.setItem("sonido_vivo_carrito", JSON.stringify(carrito));
  actualizarContadorHeader();
}

// Actualizar la burbuja con el número de items en el header
function actualizarContadorHeader() {
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
  }
}

// Función global para agregar productos desde cualquier página
function agregarAlCarrito(codigo) {
  const productos = JSON.parse(localStorage.getItem("sonido_vivo_productos")) || (typeof productosDB !== "undefined" ? productosDB : []);
  const productoEncontrado = productos.find(p => p.codigo === codigo);

  if (!productoEncontrado) {
    alert("Producto no encontrado.");
    return;
  }

  let carrito = obtenerCarrito();
  const index = carrito.findIndex(p => p.codigo === codigo);

  if (index !== -1) {
    if (carrito[index].cantidad < productoEncontrado.stock) {
      carrito[index].cantidad += 1;
    } else {
      alert(`Stock máximo disponible (${productoEncontrado.stock} unidades).`);
      return;
    }
  } else {
    carrito.push({
      codigo: productoEncontrado.codigo,
      nombre: productoEncontrado.nombre,
      precio: productoEncontrado.precio,
      imagen: productoEncontrado.imagen,
      marca: productoEncontrado.marca,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  alert(`¡${productoEncontrado.nombre} agregado al carrito!`);
}

// Renderizado de la tabla en carrito.html
function renderizarCarrito() {
  const contenedorTabla = document.getElementById("tabla-carrito-body");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");

  if (!contenedorTabla) return;

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedorTabla.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 3rem; color: #64748b;">
          Tu carrito está vacío. <br><br>
          <a href="productos.html" style="color: #0f172a; font-weight: bold;">Explorar el catálogo</a>
        </td>
      </tr>`;
    if (subtotalEl) subtotalEl.textContent = "$0";
    if (totalEl) totalEl.textContent = "$0";
    return;
  }

  let subtotal = 0;

  contenedorTabla.innerHTML = carrito.map(item => {
    const totalItem = item.precio * item.cantidad;
    subtotal += totalItem;

    return `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 1rem; display: flex; align-items: center; gap: 1rem;">
          <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
          <div>
            <strong style="color: #000000; display: block; font-size: 0.95rem;">${item.nombre}</strong>
            <span style="color: #e91e63; font-size: 0.8rem; font-weight: 600;">${item.marca}</span>
          </div>
        </td>
        <td style="padding: 1rem; color: #000000; font-weight: 600;">$${item.precio.toLocaleString("es-CL")}</td>
        <td style="padding: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button onclick="cambiarCantidad('${item.codigo}', -1)" style="padding: 0.2rem 0.6rem; cursor: pointer;">-</button>
            <span style="font-weight: 700; color: #000000;">${item.cantidad}</span>
            <button onclick="cambiarCantidad('${item.codigo}', 1)" style="padding: 0.2rem 0.6rem; cursor: pointer;">+</button>
          </div>
        </td>
        <td style="padding: 1rem; color: #000000; font-weight: 800;">$${totalItem.toLocaleString("es-CL")}</td>
        <td style="padding: 1rem; text-align: center;">
          <button onclick="eliminarDelCarrito('${item.codigo}')" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.2rem;" title="Eliminar">🗑️</button>
        </td>
      </tr>`;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString("es-CL")}`;
  if (totalEl) totalEl.textContent = `$${subtotal.toLocaleString("es-CL")}`;
}

// Modificar cantidades (+ / -)
function cambiarCantidad(codigo, delta) {
  let carrito = obtenerCarrito();
  const item = carrito.find(p => p.codigo === codigo);

  if (item) {
    item.cantidad += delta;
    if (item.cantidad <= 0) {
      carrito = carrito.filter(p => p.codigo !== codigo);
    }
    guardarCarrito(carrito);
    renderizarCarrito();
  }
}

// Eliminar un producto completo
function eliminarDelCarrito(codigo) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(p => p.codigo !== codigo);
  guardarCarrito(carrito);
  renderizarCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
  if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
    localStorage.removeItem("sonido_vivo_carrito");
    guardarCarrito([]);
    renderizarCarrito();
  }
}
// Procesar compra y registrarla en el historial del usuario
function procesarPago() {
  const sesion = JSON.parse(localStorage.getItem("sonido_vivo_sesion"));
  const carrito = obtenerCarrito();

  // 1. Validar que exista una sesión activa
  if (!sesion) {
    alert("Debes iniciar sesión para realizar una compra.");
    window.location.href = "login.html";
    return;
  }

  // 2. Validar que el carrito tenga productos
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // 3. Obtener o inicializar el historial del usuario (usando su RUN como identificador)
  const claveHistorial = `historial_${sesion.run}`;
  const historialPrevio = JSON.parse(localStorage.getItem(claveHistorial)) || [];

  // Calcular total de la compra
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  // Crear la nueva orden de compra
  const nuevaCompra = {
    id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    fecha: new Date().toLocaleDateString("es-CL"),
    hora: new Date().toLocaleTimeString("es-CL", { hour: '2-digit', minute: '2-digit' }),
    items: carrito,
    total: total
  };

  // 4. Guardar la compra en LocalStorage
  historialPrevio.unshift(nuevaCompra); // Queda la más reciente al principio
  localStorage.setItem(claveHistorial, JSON.stringify(historialPrevio));

  // 5. Vaciar el carrito de compras
  localStorage.removeItem("sonido_vivo_carrito");
  guardarCarrito([]);

  alert("¡Compra procesada con éxito! Redirigiendo a tu perfil...");
  window.location.href = "perfil.html";
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorHeader();
  renderizarCarrito();

  // Asignar el evento al botón de pagar si existe en el DOM
  const btnPagar = document.querySelector(".btn-checkout-pay, #btn-pagar, button[onclick*='Webpay']");
  
  // O bien asignarle el evento a cualquier botón de pago directamente:
  const botonesPago = document.querySelectorAll("button");
  botonesPago.forEach(btn => {
    if (btn.textContent.includes("Pagar con Webpay")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        procesarPago();
      });
    }
  });
});

// Detectar sesión activa y cambiar el botón "Acceder / Registro" por el nombre del usuario
document.addEventListener("DOMContentLoaded", () => {
  const sesion = JSON.parse(localStorage.getItem("sonido_vivo_sesion"));
  
  // Busca el botón por la clase 'btn-auth-pill' o 'btn-auth'
  const btnAuth = document.querySelector(".btn-auth-pill") || document.querySelector(".btn-auth");

  if (btnAuth && sesion) {
    const primerNombre = sesion.nombre.split(" ")[0];
    btnAuth.textContent = `Hola, ${primerNombre}`;
    btnAuth.href = "#";

    btnAuth.onclick = (e) => {
      e.preventDefault();
      if (confirm("¿Deseas cerrar la sesión activa?")) {
        localStorage.removeItem("sonido_vivo_sesion");
        window.location.reload();
      }
    };
  }
});