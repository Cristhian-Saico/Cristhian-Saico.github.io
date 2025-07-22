// ===================================================================
// REGISTRARME.JS v1.0 – Inserta el formulario de registro en <main>
// ===================================================================

export async function loadRegistro(
  selector = 'main',
  url = '/components/registrarme-content.html'
) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    document.querySelector(selector).innerHTML = await res.text();
  } catch (err) {
    console.error('No se pudo cargar el formulario de registro:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => loadRegistro());
