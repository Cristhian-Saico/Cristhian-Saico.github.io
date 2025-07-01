/* -----------------------------------------------------------
   Radar / Spider chart de habilidades
   Autor: Tú :) · Framework: D3 v7
----------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  /* 1 · Datos (puedes añadir, eliminar o reordenar) */
  const data = [
    { skill: 'HTML/CSS', value: 90 },
    { skill: 'JavaScript', value: 85 },
    { skill: 'D3.js', value: 70 },
    { skill: 'React', value: 75 },
    { skill: 'UX/UI', value: 80 },
    { skill: 'Testing', value: 65 }        // sexto eje → hexágono perfecto
  ];

  /* 2 · Configuración básica */
  const size   = 460;                       // lienzo cuadrado
  const margin = 70;                        // espacio para etiquetas
  const levels = 5;                         // círculos de referencia
  const maxVal = 100;                       // dominio de valores

  const radius = (size / 2) - margin;
  const angle  = 2 * Math.PI / data.length; // ángulo por eje

  /* 3 · SVG centrado */
  const svg = d3.select('#skills-chart')
    .attr('width',  size)
    .attr('height', size)
    .append('g')
      .attr('transform', `translate(${size / 2},${size / 2})`);

  /* 4 · Escala radial */
  const rScale = d3.scaleLinear()
    .domain([0, maxVal])
    .range([0, radius]);

  /* 5 · Círculos concéntricos de referencia */
  for (let lvl = 1; lvl <= levels; lvl++) {
    svg.append('circle')
       .attr('r', rScale(maxVal * lvl / levels))
       .attr('fill', 'none')
       .attr('stroke', 'var(--bg-alt)')
       .attr('stroke-dasharray', '2,4');
  }

  /* 6 · Ejes radiales y etiquetas */
  data.forEach((d, i) => {
    const x = rScale(maxVal) * Math.sin(i * angle);
    const y = -rScale(maxVal) * Math.cos(i * angle);

    // línea del eje
    svg.append('line')
       .attr('x1', 0).attr('y1', 0)
       .attr('x2', x).attr('y2', y)
       .attr('stroke', 'var(--bg-alt)')
       .attr('stroke-width', 1);

    // etiqueta
    svg.append('text')
       .attr('x', x * 1.08)                // separo un poco
       .attr('y', y * 1.08)
       .attr('dy', '0.35em')
       .attr('text-anchor', 'middle')
       .attr('fill', 'var(--fg)')
       .attr('font-size', 12)
       .text(d.skill);
  });

  /* 7 · Polígono de habilidades */
  const line = d3.lineRadial()
    .radius(d => rScale(d.value))
    .angle((d, i) => i * angle)
    .curve(d3.curveCardinalClosed);         // vértices suavizados

  // fondo semitransparente
  svg.append('path')
     .datum(data)
     .attr('d', line)
     .attr('fill', 'var(--accent)')
     .attr('opacity', 0.2);

  // contorno
  const path = svg.append('path')
     .datum(data)
     .attr('d', line)
     .attr('fill', 'none')
     .attr('stroke', 'var(--accent)')
     .attr('stroke-width', 3)
     .attr('stroke-dasharray', function() {
       const length = this.getTotalLength();
       return `${length} ${length}`;
     })
     .attr('stroke-dashoffset', function() {
       return this.getTotalLength();
     });

  /* 8 · Animación de trazo */
  path.transition()
      .duration(1200)
      .ease(d3.easeCubicOut)
      .attr('stroke-dashoffset', 0);

  /* 9 · Vértices (círculos) */
  svg.selectAll('.dot')
     .data(data)
     .enter()
     .append('circle')
       .attr('class', 'dot')
       .attr('cx', d => rScale(d.value) * Math.sin(data.indexOf(d) * angle))
       .attr('cy', d => -rScale(d.value) * Math.cos(data.indexOf(d) * angle))
       .attr('r', 4)
       .attr('fill', 'var(--accent)')
       .attr('opacity', 0)
     .transition()
       .delay(1200)
       .attr('opacity', 1);
});
