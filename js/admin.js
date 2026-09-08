document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Control de acceso: Verificar permisos de Administrador
  const sesion = JSON.parse(localStorage.getItem("sonido_vivo_sesion"));

  if (!sesion || sesion.rol !== "admin") {
    alert("Acceso denegado: Se requieren credenciales de Administrador.");
    window.location.href = "index.html";
    return;
  }

  // 2. Funciones para Productos
  function obtenerProductosAdmin() {
    return JSON.parse(localStorage.getItem("sonido_vivo_productos")) || (typeof productosDB !== "undefined" ? productosDB : []);
  }

  function guardarProductosAdmin(lista) {
    localStorage.setItem("sonido_vivo_productos", JSON.stringify(lista));
    renderizarTablaAdmin();
    actualizarMetricas();
  }

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
          <button onclick="eliminarProductoAdmin('${prod.codigo}')" class="btn-delete-prod" style="background: none; border: 1px solid #ef4444; color: #ef4444; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer; font-weight: bold;">🗑️ Eliminar</button>
        </td>
      </tr>
    `).join('');
  }

  // 3. Funciones para Usuarios
  function obtenerUsuariosAdmin() {
    return JSON.parse(localStorage.getItem("sonido_vivo_usuarios")) || [];
  }

  function renderizarUsuariosAdmin() {
    const tbodyUsers = document.getElementById("admin-usuarios-body");
    if (!tbodyUsers) return;

    const usuarios = obtenerUsuariosAdmin();

    if (usuarios.length === 0) {
      tbodyUsers.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b; padding: 2rem;">No hay clientes registrados en el sistema.</td></tr>`;
      return;
    }

    tbodyUsers.innerHTML = usuarios.map(u => `
      <tr>
        <td><strong>${u.run}</strong></td>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td>${u.telefono || 'Sin teléfono'}</td>
        <td style="text-align: center;">
          <button onclick="eliminarUsuarioAdmin('${u.run}')" style="background: none; border: 1px solid #ef4444; color: #ef4444; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer; font-weight: bold;">🗑️ Borrar Cuenta</button>
        </td>
      </tr>
    `).join('');
  }

  // Funciones para Compras
  function obtenerTodasLasCompras() {
    const usuarios = obtenerUsuariosAdmin();
    let todasLasCompras = [];

    usuarios.forEach(u => {
      const historialCliente = JSON.parse(localStorage.getItem(`historial_${u.run}`)) || [];
      historialCliente.forEach(compra => {
        todasLasCompras.push({
          ...compra,
          clienteNombre: u.nombre,
          clienteRun: u.run
        });
      });
    });

    return todasLasCompras;
  }

  function renderizarHistorialComprasAdmin() {
    const tbodyCompras = document.getElementById("admin-compras-body");
    if (!tbodyCompras) return;

    const compras = obtenerTodasLasCompras();

    if (compras.length === 0) {
      tbodyCompras.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b; padding: 2rem;">Aún no se han registrado compras en la tienda.</td></tr>`;
      return;
    }

    tbodyCompras.innerHTML = compras.map(c => {
      const resumenItems = c.items.map(item => `${item.cantidad}x ${item.nombre}`).join('<br>');

      return `
        <tr>
          <td><strong style="color: #0f172a;">#${c.id}</strong></td>
          <td>
            <strong>${c.clienteNombre}</strong><br>
            <small style="color: #64748b;">${c.clienteRun}</small>
          </td>
          <td>${c.fecha} - ${c.hora}</td>
          <td style="font-size: 0.85rem; color: #334155;">${resumenItems}</td>
          <td><strong style="color: #059669; font-size: 1rem;">$${c.total.toLocaleString("es-CL")}</strong></td>
        </tr>
      `;
    }).join('');
  }

  // Funciones para Métricas
  function actualizarMetricas() {
    const productos = obtenerProductosAdmin();
    const usuarios = obtenerUsuariosAdmin();
    const compras = obtenerTodasLasCompras();

    const statProd = document.getElementById("stat-productos");
    const statUser = document.getElementById("stat-usuarios");
    const statVentas = document.getElementById("stat-ventas");

    if (statProd) statProd.textContent = productos.length;
    if (statUser) statUser.textContent = usuarios.length;
    if (statVentas) statVentas.textContent = compras.length;
  }

  // 4. Formulario Agregar Producto
  const form = document.getElementById("form-admin-producto");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nuevoCodigo = document.getElementById("admin-prod-codigo").value.trim().toUpperCase();
      let productos = obtenerProductosAdmin();

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

  // 5. Borrado Global de Producto
  window.eliminarProductoAdmin = function(codigo) {
    if (confirm(`¿Estás seguro de que deseas eliminar el producto ${codigo}?`)) {
      let productos = obtenerProductosAdmin().filter(p => p.codigo !== codigo);
      guardarProductosAdmin(productos);
    }
  };

  // 6. Borrado Global de Usuario
  window.eliminarUsuarioAdmin = function(run) {
    if (confirm(`¿Estás seguro de que deseas eliminar la cuenta con RUN ${run}?`)) {
      let usuarios = obtenerUsuariosAdmin().filter(u => u.run !== run);
      localStorage.setItem("sonido_vivo_usuarios", JSON.stringify(usuarios));

      // Limpiar también el historial de compras de ese RUN
      localStorage.removeItem(`historial_${run}`);

      renderizarUsuariosAdmin();
      renderizarHistorialComprasAdmin();
      actualizarMetricas();
      alert("Usuario eliminado correctamente.");
    }
  };

  // Carga inicial de ambas tablas
  renderizarTablaAdmin();
  renderizarUsuariosAdmin();
  renderizarHistorialComprasAdmin();
  actualizarMetricas();
});

// Botón de Logout Admin
const btnLogoutAdmin = document.getElementById("btn-logout-admin");
if (btnLogoutAdmin) {
  btnLogoutAdmin.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas cerrar la sesión de administrador?")) {
      localStorage.removeItem("sonido_vivo_sesion");
      window.location.href = "index.html";
    }
  });
}