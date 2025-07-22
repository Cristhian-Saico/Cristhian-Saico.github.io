// ====================================================================
// FOOTER.JS v1.0 – Inserción modular del footer
// ====================================================================

export async function loadFooter(
  selector = 'footer',
  url = '/components/footer.html'
) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const footerEl = document.querySelector(selector);

    if (!footerEl) throw new Error(`No se encontró el selector ${selector}`);
    footerEl.innerHTML = html;
  } catch (err) {
    console.error('No se pudo cargar el footer:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => loadFooter());
