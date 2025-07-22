// ===================================================================
// EVENTOS-CONTENT.JS v1.2 – Slider + filtro + links con ?year=AAAA
// ===================================================================

export async function loadEventosContent(
  selector = 'main',
  url = '/components/eventos-content.html'
) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    document.querySelector(selector).innerHTML = await res.text();

    initSlider();
    initPastEvents();
  } catch (err) {
    console.error('No se pudo cargar el contenido de Eventos:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => loadEventosContent());

/* ---------- Slider ------------------------------------------------ */
function initSlider() {
  const track   = document.querySelector('.slider__track');
  const slides  = track.querySelectorAll('.slide');
  const total   = slides.length;
  let index     = 0;

  const move = () =>
    (track.style.transform = `translateX(-${index * 100}%)`);

  /* Flechas */
  document
    .querySelector('.slider__arrow--left')
    .addEventListener('click', () => {
      index = (index - 1 + total) % total;
      move();
    });

  document
    .querySelector('.slider__arrow--right')
    .addEventListener('click', () => {
      index = (index + 1) % total;
      move();
    });

  /* Autoplay */
  setInterval(() => {
    index = (index + 1) % total;
    move();
  }, 7000);
}


/* ---------- Datos simulados -------------------------------------- */
const EVENTS = [
  {
    year: 2024,
    type: 'explorando',
    title: 'Explorando Ciencias 2024',
    img: '/assets/images/e24.jpg',
    desc: 'Inteligencia Artificial y su impacto en la salud.',
    date: '15-06-2024'
  },
  {
    year: 2023,
    type: 'lazos',
    title: 'Generando Lazos 2023',
    img: '/assets/images/gl23.jpg',
    desc: 'Sinergias universidad-industria.',
    date: '03-09-2023'
  },
  {
    year: 2022,
    type: 'explorando',
    title: 'Explorando Ciencias 2022',
    img: '/assets/images/e22.jpg',
    desc: 'Nanotecnología aplicada a la energía.',
    date: '21-07-2022'
  },
  {
    year: 2021,
    type: 'lazos',
    title: 'Generando Lazos 2021',
    img: '/assets/images/gl21.jpg',
    desc: 'Bio-emprendimientos sustentables.',
    date: '12-08-2021'
  },
  {
    year: 2020,
    type: 'explorando',
    title: 'Explorando Ciencias 2020',
    img: '/assets/images/e20.jpg',
    desc: 'Iniciación a la divulgación científica.',
    date: '18-11-2020'
  }
  
];

/* ---------- Filtro & render -------------------------------------- */
function initPastEvents() {
  const grid   = document.getElementById('eventsGrid');
  const yearEl = document.getElementById('yearSelect');
  const tagBtns = document.querySelectorAll('.tag-btn');

  const render = () => {
    const yearFilter = yearEl.value; // 'all' o año
    const tagActive =
      [...tagBtns].find((b) => b.classList.contains('active'))?.dataset.type ||
      'all';

    grid.innerHTML = EVENTS
      .filter(
        (e) =>
          (yearFilter === 'all' || e.year == yearFilter) &&
          (tagActive === 'all' || e.type === tagActive)
      )
      .map(cardTemplate)
      .join('');
  };

  /* select año */
  yearEl.addEventListener('change', render);

  /* toggle de botones */
  tagBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
      const wasActive = btn.classList.contains('active');
      tagBtns.forEach((b) => b.classList.remove('active'));
      if (!wasActive) btn.classList.add('active');
      render();
    })
  );

  render(); // estado inicial
}

/* ---------- plantilla de tarjeta --------------------------------- */
function cardTemplate(e) {
  const url =
    e.type === 'explorando'
      ? `/explorando-ciencias.html?year=${e.year}`
      : `/generando-lazos.html?year=${e.year}`;

  return `
    <article class="event-card">
      <img src="${e.img}" alt="${e.title}">
      <div class="event-card__body">
        <h3>${e.title}</h3>
        <p class="event-card__meta">${e.date}</p>
        <p>${e.desc}</p>
        <a class="btn btn--primary" href="${url}">Ver</a>
      </div>
    </article>`;
}
