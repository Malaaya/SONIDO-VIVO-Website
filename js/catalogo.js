document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos");
  const tituloHeader = document.getElementById("titulo-categoria");

  if (!contenedor) return;

  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("cat");
  const busquedaParam = urlParams.get("buscar");

  const productosLista = JSON.parse(localStorage.getItem("sonido_vivo_productos")) || (typeof productosDB !== "undefined" ? productosDB : []);
  let productosAMostrar = productosLista;

if (catParam) {
    productosAMostrar = productosLista.filter(p => p.catSlug === catParam.toLowerCase());
    if (productosAMostrar.length > 0) {
      tituloHeader.textContent = productosAMostrar[0].categoria;
    }
  } else if (busquedaParam) {
    const q = busquedaParam.toLowerCase();
    productosAMostrar = productosLista.filter(p => 
      p.nombre.toLowerCase().includes(q) || 
      p.marca.toLowerCase().includes(q) || 
      (p.categoria && p.categoria.toLowerCase().includes(q))
    );
    tituloHeader.textContent = `Resultados para: "${busquedaParam}"`;
  }

  if (productosAMostrar.length === 0) {
    contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 3rem;">No se encontraron productos disponibles.</p>`;
    return;
  }

  contenedor.innerHTML = productosAMostrar.map(p => `
    <article class="shelf-product-card">
      <img src="${p.imagen}" alt="${p.nombre}" class="shelf-product-img">
      <div class="shelf-product-body">
        <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">${p.codigo} | ${p.categoria}</span>
        <h3 class="shelf-product-title" style="font-weight: 700; color: #000000 !important; margin: 0.3rem 0;">${p.nombre}</h3>
        <span style="font-size: 0.85rem; color: #e91e63; font-weight: 600; margin-bottom: 0.5rem;">${p.marca} ${p.modelo}</span>
        <p style="font-size: 0.85rem; color: #475569; line-height: 1.4; margin-bottom: 1rem; flex-grow: 1;">${p.descripcion}</p>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 0.8rem; border-top: 1px solid #f1f5f9;">
          <span class="shelf-product-price">$${p.precio.toLocaleString('es-CL')}</span>
          <button class="btn-slide-cta" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; border: none; cursor: pointer;" onclick="agregarAlCarrito('${p.codigo}')">Agregar</button>
        </div>
      </div>
    </article>
  `).join('');
});