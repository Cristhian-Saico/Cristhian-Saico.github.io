export async function loadHeader(
  selector = 'header',
  url = '/components/header.html'
) {
  try {
    const res  = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
  } catch (err) {
    console.error('No se pudo cargar el header:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => loadHeader());
