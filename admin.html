<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de Administración | SONIDO VIVO</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%23d00000'/><text x='32' y='36' font-family='Arial, sans-serif' font-style='italic' font-weight='bold' font-size='38' fill='%23ffffff' text-anchor='middle' dominant-baseline='central' letter-spacing='-4'>sv</text></svg>">
  <link rel="stylesheet" href="css/main.css">
  <style>
    .admin-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .admin-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 2rem;
      margin-bottom: 2.5rem;
    }

    .admin-card {
      background: #ffffff;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      height: fit-content;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .admin-card h3 {
      color: var(--bg-dark);
      margin-bottom: 1rem;
      border-bottom: 2px solid var(--accent-yellow);
      padding-bottom: 0.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      font-size: 0.85rem;
      font-weight: bold;
      color: #334155;
      margin-bottom: 0.3rem;
    }

    .form-group input {
      width: 100%;
      padding: 0.55rem;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .btn-save {
      background-color: var(--accent-yellow);
      color: #000;
      border: none;
      padding: 0.75rem;
      width: 100%;
      font-weight: bold;
      cursor: pointer;
      border-radius: 4px;
      margin-top: 0.5rem;
    }

    .btn-save:hover {
      background-color: #d9a200;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0.5rem;
    }

    .admin-table th, .admin-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 0.8rem 0.5rem;
      text-align: left;
      font-size: 0.9rem;
    }

    .admin-table th {
      background-color: #f8fafc;
      color: #475569;
    }

    .btn-delete-item {
      background: none;
      border: 1px solid #ef4444;
      color: #ef4444;
      border-radius: 4px;
      padding: 0.3rem 0.6rem;
      cursor: pointer;
      font-weight: bold;
      font-size: 0.8rem;
      transition: all 0.2s;
    }

    .btn-delete-item:hover {
      background-color: #ef4444;
      color: #ffffff;
    }

    .stats-bar {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-pill {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .stat-pill span {
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 600;
    }

    .stat-pill strong {
      font-size: 1.6rem;
      color: #0f172a;
    }

    @media (max-width: 850px) {
      .admin-grid {
        grid-template-columns: 1fr;
      }
      .stats-bar {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>

  <!-- Header Admin -->
  <header class="site-header">
    <div class="top-bar" style="display: flex; align-items: center; justify-content: space-between;">
      <div class="brand-logo">
        <a href="index.html">SONIDO <span>VIVO</span> (PANEL ADMIN)</a>
      </div>
      <div class="user-actions" style="display: flex; gap: 1rem; align-items: center;">
        <a href="productos.html" class="btn-catalog-link">← Ver Tienda</a>
        <button id="btn-logout-admin" style="background-color: #ef4444; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.88rem; font-weight: 600; cursor: pointer;">Cerrar Sesión</button>
      </div>
    </div>
  </header>

  <main class="admin-container">
    <h2 style="font-size: 1.8rem; color: #0f172a; margin-bottom: 1rem;">Panel de Control y Operaciones</h2>
    
    <!-- Barra de Estadísticas -->
    <div class="stats-bar">
      <div class="stat-pill">
        <span>Productos en Catálogo</span>
        <strong id="stat-productos">0</strong>
      </div>
      <div class="stat-pill">
        <span>Clientes Registrados</span>
        <strong id="stat-usuarios">0</strong>
      </div>
      <div class="stat-pill">
        <span>Total Ventas Realizadas</span>
        <strong id="stat-ventas">0</strong>
      </div>
    </div>

    <!-- Inventario de productos -->
    <div class="admin-grid">
      <section class="admin-card">
        <h3>Agregar Producto</h3>
        <form id="form-admin-producto">
          <div class="form-group">
            <label>Código (SKU)</label>
            <input type="text" id="admin-prod-codigo" required placeholder="Ej: GUIT-001">
          </div>
          <div class="form-group">
            <label>Nombre del Producto</label>
            <input type="text" id="admin-prod-nombre" required placeholder="Ej: Guitarra Eléctrica">
          </div>
          <div class="form-group">
            <label>Marca</label>
            <input type="text" id="admin-prod-marca" required placeholder="Ej: Fender">
          </div>
          <div class="form-group">
            <label>Precio ($ CLP)</label>
            <input type="number" id="admin-prod-precio" min="0" required placeholder="199990">
          </div>
          <div class="form-group">
            <label>Stock Disponible</label>
            <input type="number" id="admin-prod-stock" min="1" required placeholder="5">
          </div>
          <div class="form-group">
            <label>URL de Imagen</label>
            <input type="url" id="admin-prod-imagen" required placeholder="https://ejemplo.com/foto.jpg">
          </div>
          <button type="submit" class="btn-save">➕ Guardar en Inventario</button>
        </form>
      </section>

      <section class="admin-card">
        <h3>Productos Registrados</h3>
        <div style="overflow-x: auto; max-height: 480px;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody id="admin-tabla-body">
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- Historial de compras -->
    <section class="admin-card" style="margin-top: 2rem; grid-column: 1 / -1;">
      <h3>Historial General de Ventas y Pedidos</h3>
      <div style="overflow-x: auto; max-height: 400px;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente / RUN</th>
              <th>Fecha y Hora</th>
              <th>Artículos Comprados</th>
              <th>Total Pagado</th>
            </tr>
          </thead>
          <tbody id="admin-compras-body">
            <!-- Render dinámico de ventas -->
          </tbody>
        </table>
      </div>
    </section>

    <!-- Gestion de clientes -->
    <section class="admin-card" style="margin-top: 2rem; grid-column: 1 / -1;">
      <h3>Clientes y Cuentas Registradas</h3>
      <div style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre Completo</th>
              <th>Correo Electrónico</th>
              <th>Teléfono</th>
              <th style="text-align: center;">Acción</th>
            </tr>
          </thead>
          <tbody id="admin-usuarios-body">
            <!-- Render dinámico de usuarios -->
          </tbody>
        </table>
      </div>
    </section>

  </main>

  <!-- Scripts -->
  <script src="js/datos.js"></script>
  <script src="js/admin.js"></script>
</body>
</html>