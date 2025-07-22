// ===================================================================
// EXPLORANDO-CIENCIAS-CONTENT.JS v1.1 – Render dinámico por año
// ===================================================================

import { EVENT_DETAILS } from './eventos-data.js';

export async function loadECContent(
  selector = 'main',
  url = '/components/explorando-ciencias-content.html'
) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    document.querySelector(selector).innerHTML = await res.text();

    const queryYear = new URLSearchParams(location.search).get('year');
    const years     = Object.keys(EVENT_DETAILS.explorando).sort().reverse();
    const year      =
      queryYear && EVENT_DETAILS.explorando[queryYear] ? queryYear : years[0];

    renderExplorando(EVENT_DETAILS.explorando[year], year);
  } catch (err) {
    console.error('EC:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => loadECContent());

/* ---------------- render ---------------- */
function renderExplorando(data, year) {
  const root = document.getElementById('eventRoot');

  root.innerHTML = `
    <section class="ec-hero section-full" style="background-image:url('${data.banner}')">
      <div class="ec-hero__content container">
        <h1 class="ec-title">${data.title}</h1>
        <p class="ec-subtitle">${data.subtitle}</p>
        <p class="ec-date">${data.date}</p>
        <a class="btn btn--primary" href="#inscripcion">Inscribirme</a>
      </div>
    </section>

    <section class="ec-about section-pad">
      <div class="container narrow">
        <h2 class="section-title">Información del evento</h2>
        <p>${data.about}</p>
      </div>
    </section>

    <section class="ec-objectives section-pad">
      <div class="container narrow">
        <h2 class="section-title">Objetivos</h2>
        <ul class="ec-list">
          ${data.objectives.map((o) => `<li>${o}</li>`).join('')}
        </ul>
      </div>
    </section>

    <section class="ec-speakers section-pad">
      <div class="container">
        <h2 class="section-title">Ponentes principales</h2>
        <div class="speaker-grid">
          ${data.speakers.map(speakerCard).join('')}
        </div>
      </div>
    </section>

    <section class="ec-gallery section-pad">
      <div class="container">
        <h2 class="section-title">Galería ${+year - 1}</h2>
        <div class="gallery-wrapper">
          <button class="gal-arrow gal-arrow--left" aria-label="Anterior"></button>
          <div class="gallery-track">
            ${data.gallery.map((g) => `<img src="${g}" alt="">`).join('')}
          </div>
          <button class="gal-arrow gal-arrow--right" aria-label="Siguiente"></button>
        </div>
      </div>
    </section>

    <section class="ec-register section-pad" id="inscripcion">
      <div class="container narrow">
        <h2 class="section-title">Inscríbete ahora</h2>
        <form class="ec-form" action="https://formspree.io/f/tu-endpoint" method="POST">
          <input type="text"  name="nombre" placeholder="Nombre completo" required />
          <input type="email" name="email"  placeholder="Correo electrónico" required />
          <button class="btn btn--primary" type="submit">Enviar</button>
        </form>
      </div>
    </section>
  `;

  initGallery();
}

function speakerCard(sp) {
  return `
    <article class="speaker-card">
      <img src="${sp.img}" alt="${sp.name}">
      <h3>${sp.name}</h3>
      <p>${sp.role}</p>
    </article>`;
}

/* ---------- Carrusel de galería --------------------------------- */
function initGallery() {
  const track = document.querySelector('.gallery-track');
  const imgs  = track.querySelectorAll('img');
  let index = 0;

  const move = () => {
    const offset = index * (imgs[0].clientWidth + 16);
    track.style.transform = `translateX(-${offset}px)`;
  };

  document
    .querySelector('.gal-arrow--left')
    .addEventListener('click', () => {
      index = (index - 1 + imgs.length) % imgs.length;
      move();
    });

  document
    .querySelector('.gal-arrow--right')
    .addEventListener('click', () => {
      index = (index + 1) % imgs.length;
      move();
    });

  window.addEventListener('resize', move);
}
