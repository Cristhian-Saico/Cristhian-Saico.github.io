// ====================================================================
// NOSOTROS-CONTENT.JS v1.0 – Inserción modular del contenido "Nosotros"
// ====================================================================

export async function loadNosotrosContent(
  selector = 'main',
  url = '/components/nosotros-content.html'
) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const mainEl = document.querySelector(selector);

    if (!mainEl) throw new Error(`No se encontró el selector ${selector}`);
    mainEl.innerHTML = html;
  } catch (err) {
    console.error('No se pudo cargar el contenido de Nosotros:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => loadNosotrosContent());
