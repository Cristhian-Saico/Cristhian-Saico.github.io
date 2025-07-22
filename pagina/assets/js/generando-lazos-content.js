// ===================================================================
// GENERANDO-LAZOS-CONTENT.JS v1.1 – Render dinámico por año
// ===================================================================

import { EVENT_DETAILS } from './eventos-data.js';

export async function loadGLContent(
  selector = 'main',
  url = '/components/generando-lazos-content.html'
) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    document.querySelector(selector).innerHTML = await res.text();

    const queryYear = new URLSearchParams(location.search).get('year');
    const years     = Object.keys(EVENT_DETAILS.lazos).sort().reverse();
    const year      =
      queryYear && EVENT_DETAILS.lazos[queryYear] ? queryYear : years[0];

    renderLazos(EVENT_DETAILS.lazos[year], year);
  } catch (err) {
    console.error('GL:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => loadGLContent());

/* ---------------- render ---------------- */
function renderLazos(data, year) {
  const root = document.getElementById('eventRoot');

  root.innerHTML = `
    <section class="gl-hero section-full" style="background-image:url('${data.banner}')">
      <div class="gl-hero__content container">
        <h1 class="gl-title">${data.title}</h1>
        <p class="gl-subtitle">${data.subtitle}</p>
        <p class="gl-date">${data.date}</p>
        <a class="btn btn--primary" href="#inscripcion">Inscribirme</a>
      </div>
    </section>

    <section class="gl-about section-pad">
      <div class="container narrow">
        <h2 class="section-title">Información del evento</h2>
        <p>${data.about}</p>
      </div>
    </section>

    <section class="gl-objectives section-pad">
      <div class="container narrow">
        <h2 class="section-title">Objetivos</h2>
        <ul class="gl-list">
          ${data.objectives.map((o) => `<li>${o}</li>`).join('')}
        </ul>
      </div>
    </section>

    <section class="gl-speakers section-pad">
      <div class="container">
        <h2 class="section-title">Ponentes destacados</h2>
        <div class="speaker-grid">
          ${data.speakers.map(speakerCard).join('')}
        </div>
      </div>
    </section>

    <section class="gl-gallery section-pad">
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

    <section class="gl-register section-pad" id="inscripcion">
      <div class="container narrow">
        <h2 class="section-title">Inscríbete ahora</h2>
        <form class="gl-form" action="https://formspree.io/f/tu-endpoint" method="POST">
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

/* ---------- Carrusel --------------------------------------------- */
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
