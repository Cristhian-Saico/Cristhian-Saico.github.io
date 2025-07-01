/* Render y filtrado del grid de proyectos */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const filter = document.getElementById('filter');

  // poblar select
  [...new Set(portfolioData.map(p => p.category))]
    .forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat; opt.textContent = cat;
      filter.appendChild(opt);
    });

  const render = items => {
    grid.innerHTML = '';
    items.forEach(({title, desc, img, url, category}) => {
      grid.insertAdjacentHTML('beforeend', `
        <article class="card">
          <img class="thumb" src="${img}" alt="Miniatura de ${title}">
          <h3>${title}</h3>
          <p>${desc}</p>
          <span class="tag">${category}</span>
          <a class="btn-cta btn" href="${url}" target="_blank" rel="noopener">Ver proyecto →</a>
        </article>
      `);
    });
  };

  // filtro
  filter.addEventListener('change', e => {
    const val = e.target.value;
    const items = val === 'all' ? portfolioData
                                : portfolioData.filter(p => p.category === val);
    render(items);
  });

  render(portfolioData);
});
