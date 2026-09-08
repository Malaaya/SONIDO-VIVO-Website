document.addEventListener("DOMContentLoaded", () => {
  // 1. Control de acceso: Verificar permisos de Administrador
  const sesion = JSON.parse(localStorage.getItem("sonido_vivo_sesion"));

  if (!sesion || sesion.rol !== "admin") {
    alert("Acceso denegado: Se requieren credenciales de Administrador.");
    window.location.href = "index.html";
    return;
  }

  // 2. Obtener lista actual de productos
  function obtenerProductosAdmin() {
    return JSON.parse(localStorage.getItem("sonido_vivo_productos")) || (typeof productosDB !== "undefined" ? productosDB : []);
  }

  function guardarProductosAdmin(lista) {
    localStorage.setItem("sonido_vivo_productos", JSON.stringify(lista));
    renderizarTablaAdmin();
  }

  // 3. Mostrar la lista de productos en la tabla
  function renderizarTablaAdmin() {
    const tbody = document.getElementById("admin-tabla-body");
    if (!tbody) return;

    const productos = obtenerProductosAdmin();

    if (productos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b;">No hay productos en inventario.</td></tr>`;
      return;
    }

    tbody.innerHTML = productos.map(prod => `
      <tr>
        <td><strong>${prod.codigo}</strong></td>
        <td>
          <div><strong>${prod.nombre}</strong></div>
          <small style="color: #e91e63;">${prod.marca}</small>
        </td>
        <td>$${prod.precio.toLocaleString("es-CL")}</td>
        <td>${prod.stock} u.</td>
        <td>
          <button onclick="eliminarProductoAdmin('${prod.codigo}')" class="btn-delete-prod" title="Eliminar del catálogo">🗑️ Eliminar</button>
        </td>
      </tr>
    `).join('');
  }

  // 4. Registrar un nuevo producto
  const form = document.getElementById("form-admin-producto");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nuevoCodigo = document.getElementById("admin-prod-codigo").value.trim().toUpperCase();
      let productos = obtenerProductosAdmin();

      // Validar que el SKU no se repita
      if (productos.some(p => p.codigo.toUpperCase() === nuevoCodigo)) {
        alert("El código SKU ingresado ya existe.");
        return;
      }

      const nuevoProducto = {
        codigo: nuevoCodigo,
        nombre: document.getElementById("admin-prod-nombre").value.trim(),
        marca: document.getElementById("admin-prod-marca").value.trim(),
        precio: parseInt(document.getElementById("admin-prod-precio").value),
        stock: parseInt(document.getElementById("admin-prod-stock").value),
        imagen: document.getElementById("admin-prod-imagen").value.trim()
      };

      productos.push(nuevoProducto);
      guardarProductosAdmin(productos);

      form.reset();
      alert(`Producto "${nuevoProducto.nombre}" agregado con éxito.`);
    });
  }

  // 5. Función para eliminar productos del sistema
  window.eliminarProductoAdmin = function(codigo) {
    if (confirm(`¿Estás seguro de que deseas eliminar el producto ${codigo}?`)) {
      let productos = obtenerProductosAdmin();
      productos = productos.filter(p => p.codigo !== codigo);
      guardarProductosAdmin(productos);
    }
  };

  // Carga inicial
  renderizarTablaAdmin();
});
const btnLogoutAdmin = document.getElementById("btn-logout-admin");
if (btnLogoutAdmin) {
  btnLogoutAdmin.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas cerrar la sesión de administrador?")) {
      localStorage.removeItem("sonido_vivo_sesion");
      window.location.href = "index.html";
    }
  });
}