document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtener la sesión activa
  const sesion = JSON.parse(localStorage.getItem("sonido_vivo_sesion"));

  // Si no hay sesión, redirigir al login
  if (!sesion) {
    alert("Debes iniciar sesión para acceder a tu perfil.");
    window.location.href = "login.html";
    return;
  }

  // 2. Cargar los datos del perfil
  document.getElementById("user-nombre").textContent = sesion.nombre || "No especificado";
  document.getElementById("user-run").textContent = sesion.run || "No especificado";
  document.getElementById("user-email").textContent = sesion.email || "No especificado";
  document.getElementById("user-telefono").textContent = sesion.telefono || "No especificado";

  // 3. Cargar el historial de compras
  const claveHistorial = `historial_${sesion.run}`;
  const historial = JSON.parse(localStorage.getItem(claveHistorial)) || [];
  const contenedorHistorial = document.getElementById("contenedor-historial");

  if (historial.length === 0) {
    contenedorHistorial.innerHTML = `
      <p style="color: #64748b; text-align: center; padding: 2rem 0;">
        Aún no has realizado ninguna compra en Sonido Vivo.<br><br>
        <a href="productos.html" style="color: var(--accent-pink); font-weight: bold; text-decoration: none;">¡Explora nuestro catálogo!</a>
      </p>`;
  } else {
    contenedorHistorial.innerHTML = historial.map(orden => {
      const itemsHTML = orden.items.map(item => `
        <li>
          <span>${item.cantidad}x ${item.nombre}</span>
          <strong>$${(item.precio * item.cantidad).toLocaleString("es-CL")}</strong>
        </li>
      `).join('');

      return `
        <div class="order-card">
          <div class="order-header">
            <span class="order-id">Orden #${orden.id}</span>
            <span class="order-date">📅 ${orden.fecha} - ${orden.hora}</span>
          </div>
          <ul class="order-items">
            ${itemsHTML}
          </ul>
          <div class="order-total">
            Total: $${orden.total.toLocaleString("es-CL")}
          </div>
        </div>
      `;
    }).join('');
  }

  // 4. Botón de cerrar sesión
  const btnLogout = document.getElementById("btn-cerrar-sesion");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        localStorage.removeItem("sonido_vivo_sesion");
        window.location.href = "index.html";
      }
    });
  }
});