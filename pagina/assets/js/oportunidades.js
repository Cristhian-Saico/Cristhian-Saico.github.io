// ===================================================================
// OPORTUNIDADES.JS v1.0 – filtros múltiples + render tarjetas
// ===================================================================

export async function loadOportunidades(
  selector = 'main',
  url = '/components/oportunidades-content.html'
) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    document.querySelector(selector).innerHTML = await res.text();
    initOpps();
  } catch (err) {
    console.error('No se pudo cargar Oportunidades:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => loadOportunidades());

/* ---------- Datos simulados -------------------------------------- */
const OPPS = [
  { year:2025, type:'becas', title:'Beca Doctoral CONCYT',
    img:'/assets/images/opp1.jpg',
    desc:'Financia estudios de doctorado en áreas STEM.',
    start:'01-02-2025', end:'30-04-2025', country:'Perú',
    url: 'https://concyt.gob.pe/beca-doctoral-2025'
  },
  { year:2024, type:'congresos', title:'Congreso Joven Ciencia',
    img:'/assets/images/opp2.jpg',
    desc:'Convoca trabajos de investigación para presentar en Lima.',
    start:'10-05-2024', end:'10-07-2024', country:'Perú',
    url: 'https://concyt.gob.pe/beca-doctoral-2025'
  },
  { year:2024, type:'financiamientos',title:'Fondo Innovar 2024',
    img:'/assets/images/opp3.jpg',
    desc:'Capital semilla para proyectos de impacto social.',
    start:'15-03-2024', end:'31-05-2024', country:'Chile',
    url: 'https://concyt.gob.pe/beca-doctoral-2025' 
  },
  { year:2023, type:'traslados', title:'Pasantías en NanoTech Lab',
    img:'/assets/images/opp4.jpg',
    desc:'Programa de movilidad de 6 meses.',
    start:'01-09-2023', end:'31-10-2023', country:'México',
    url: 'https://concyt.gob.pe/beca-doctoral-2025'
  },
  { year:2023, type:'becas', title:'Beca de Investigación OEA',
    img:'/assets/images/opp5.jpg',
    desc:'Apoyo económico para tesis de maestría.',
    start:'05-01-2023', end:'28-02-2023', country:'Colombia',
    url: 'https://concyt.gob.pe/beca-doctoral-2025'
  },
  /* ... añade más si deseas ... */
];

/* ---------- Inicialización de filtros ---------------------------- */
function initOpps() {
  const grid   = document.getElementById('oppGrid');
  const yearEl = document.getElementById('oppYear');
  const tagEls = document.querySelectorAll('.tag');

  /* Estado de filtros */
  const activeTags = new Set();

  /* Render según filtros */
  const render = () => {
    const y = yearEl.value;
    grid.innerHTML = OPPS
      .filter(o =>
        (y === 'all' || o.year == y) &&
        (activeTags.size === 0 || activeTags.has(o.type))
      )
      .map(cardTpl).join('');
  };

  /* Listener select año */
  yearEl.addEventListener('change', render);

  /* Listener tags multitoggle */
  tagEls.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      if (activeTags.has(type)) {
        activeTags.delete(type);
        btn.classList.remove('active');
      } else {
        activeTags.add(type);
        btn.classList.add('active');
      }
      render();
    });
  });

  render(); // primera vez
}

/* ---------- plantilla de tarjeta --------------------------------- */
function cardTpl(o){
  return `
    <article class="card">
      <img src="${o.img}" alt="${o.title}">
      <div class="card__body">
        <span class="badge ${o.type}">${capitalize(o.type)}</span>
        <h3>${o.title}</h3>
        <p class="card__meta">${o.start} – ${o.end} · ${o.country}</p>
        <p>${o.desc}</p>
        <a class="btn btn--primary" href="${o.url}" target="_blank" rel="noopener">Postular</a>
      </div>
    </article>`;
}

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
