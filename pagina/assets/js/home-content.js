// /assets/js/home-content.js
export async function loadHomeContent(
  selector = 'main',
  url = '/components/home-content.html'
) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
  } catch (err) {
    console.error('No se pudo cargar el contenido principal:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => loadHomeContent());
