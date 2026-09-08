document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos");
  const tituloHeader = document.getElementById("titulo-categoria");

  if (!contenedor) return;

  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("cat");
  const busquedaParam = urlParams.get("buscar");

  const productosLista = JSON.parse(localStorage.getItem("sonido_vivo_productos")) || (typeof PRODUCTOS_INICIALES !== "undefined" ? PRODUCTOS_INICIALES : (typeof productosDB !== "undefined" ? productosDB : []));
  let productosAMostrar = productosLista;

  // Filtro por categoría
  if (catParam) {
    productosAMostrar = productosLista.filter(p => p.catSlug === catParam.toLowerCase());
    if (productosAMostrar.length > 0 && tituloHeader) {
      tituloHeader.textContent = productosAMostrar[0].categoria;
    }
  } 
  // Filtro por búsqueda
  else if (busquedaParam) {
    const q = busquedaParam.toLowerCase();
    productosAMostrar = productosLista.filter(p => 
      p.nombre.toLowerCase().includes(q) || 
      p.marca.toLowerCase().includes(q) || 
      (p.categoria && p.categoria.toLowerCase().includes(q))
    );
    if (tituloHeader) {
      tituloHeader.textContent = `Resultados para: "${busquedaParam}"`;
    }
  }

  if (productosAMostrar.length === 0) {
    contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #64748b;">No se encontraron productos disponibles en esta sección.</p>`;
    return;
  }

  // Lista de los 4 códigos oficiales en oferta de la portada
  const codigosEnOferta = ["GA001", "GA002", "GA003", "GA004"];

  contenedor.innerHTML = productosAMostrar.map(p => {
    const esOferta = codigosEnOferta.includes(p.codigo);
    const precioOriginal = Math.round(p.precio * 1.15);

    return `
      <article class="shelf-product-card">
        ${esOferta ? '<span class="badge-offer">¡OFERTA!</span>' : ''}
        <img src="${p.imagen}" alt="${p.nombre}" class="shelf-product-img" loading="lazy">
        <div class="shelf-product-body" style="display: flex; flex-direction: column; height: 100%;">
          <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">${p.codigo} | ${p.categoria || 'Audio & Cuerdas'}</span>
          <h3 class="shelf-product-title" style="font-weight: 700; color: #000000 !important; margin: 0.3rem 0;">${p.nombre}</h3>
          <span style="font-size: 0.85rem; color: #e91e63; font-weight: 600; margin-bottom: 0.4rem;">${p.marca} ${p.modelo || ''}</span>
          <p style="font-size: 0.85rem; color: #475569; line-height: 1.4; margin-bottom: 0.8rem; flex-grow: 1;">${p.descripcion}</p>
          
          <div style="margin-bottom: 0.8rem;">
            ${esOferta ? `
              <p class="shelf-product-old-price" style="margin: 0; text-decoration: line-through; color: #94a3b8; font-size: 0.85rem;">
                $${precioOriginal.toLocaleString('es-CL')}
              </p>
            ` : ''}
            <p class="shelf-product-price" style="color: #0b0f19; font-weight: 800; font-size: 1.25rem; margin: 0;">
              $${p.precio.toLocaleString('es-CL')}
            </p>
          </div>

          <div style="margin-top: auto; padding-top: 0.6rem; border-top: 1px solid #f1f5f9;">
            <button class="btn-slide-cta" style="width: 100%; padding: 0.6rem; font-size: 0.9rem; border: none; cursor: pointer; text-align: center; background: #ffc107; color: #000; font-weight: bold; border-radius: 6px;" onclick="agregarAlCarrito('${p.codigo}')">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
});