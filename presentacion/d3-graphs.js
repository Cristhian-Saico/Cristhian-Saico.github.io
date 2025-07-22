/* =============================================================
   d3-graphs.js – Visualizaciones de apoyo (D3 v7 ESM)
   ============================================================= */

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/**** Utilidades de gráficos responsivos ****/
const margin = { top: 40, right: 28, bottom: 46, left: 58 };
const height = 320; // alto fijo para todos los charts

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

/**** 1. Artículo 1 – Barras de edición ****/
const art1Data = [
  { organo: "Hígado", value: 37 },
  { organo: "Pulmón", value: 16 }
];

function drawArt1Editing() {
  const el = document.querySelector("#graph-art1-editing");
  if (!el) return;
  clear(el);
  const width = el.clientWidth || 600;

  const svg = d3
    .select(el)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3
    .scaleBand()
    .domain(art1Data.map((d) => d.organo))
    .range([margin.left, width - margin.right])
    .padding(0.35);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(art1Data, (d) => d.value) + 5])
    .nice()
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .attr("fill", "var(--accent)")
    .selectAll("rect")
    .data(art1Data)
    .join("rect")
    .attr("x", (d) => x(d.organo))
    .attr("y", (d) => y(d.value))
    .attr("height", (d) => y(0) - y(d.value))
    .attr("width", x.bandwidth())
    .append("title")
    .text((d) => `${d.value} %`);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("font-size", "0.9rem");

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d}%`))
    .selectAll("text")
    .style("font-size", "0.8rem");
}

/**** 2. Artículo 2 – ΔT vs tiempo ****/
const art2Temp = [
  { t: 0, T: 25 },
  { t: 1, T: 35 },
  { t: 2, T: 42 },
  { t: 3, T: 48 },
  { t: 4, T: 53 },
  { t: 5, T: 55 }
];

function drawArt2DeltaT() {
  const el = document.querySelector("#graph-art2-deltaT");
  if (!el) return;
  clear(el);
  const width = el.clientWidth || 600;

  const svg = d3
    .select(el)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(art2Temp, (d) => d.t)])
    .range([margin.left, width - margin.right]);
  const y = d3
    .scaleLinear()
    .domain([25, 60])
    .range([height - margin.bottom, margin.top]);

  const line = d3
    .line()
    .x((d) => x(d.t))
    .y((d) => y(d.T))
    .curve(d3.curveMonotoneX);

  svg
    .append("path")
    .datum(art2Temp)
    .attr("fill", "none")
    .attr("stroke", "var(--accent)")
    .attr("stroke-width", 3)
    .attr("d", line);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat((d) => `${d} min`));

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(6).tickFormat((d) => `${d} °C`));
}

/**** 3. Artículo 2 – Volumen tumoral ****/
const art2Tumor = [
  { day: 0, vol: 100 },
  { day: 4, vol: 70 },
  { day: 8, vol: 50 },
  { day: 12, vol: 30 },
  { day: 16, vol: 15 },
  { day: 18, vol: 10 }
];

function drawArt2Tumor() {
  const el = document.querySelector("#graph-art2-tumor");
  if (!el) return;
  clear(el);
  const width = el.clientWidth || 600;

  const svg = d3
    .select(el)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(art2Tumor, (d) => d.day)])
    .range([margin.left, width - margin.right]);
  const y = d3
    .scaleLinear()
    .domain([0, 110])
    .range([height - margin.bottom, margin.top]);

  const area = d3
    .area()
    .x((d) => x(d.day))
    .y0(height - margin.bottom)
    .y1((d) => y(d.vol))
    .curve(d3.curveMonotoneX);

  svg
    .append("path")
    .datum(art2Tumor)
    .attr("fill", "var(--accent-light)")
    .attr("d", area);

  svg
    .append("path")
    .datum(art2Tumor)
    .attr("fill", "none")
    .attr("stroke", "var(--accent-dark)")
    .attr("stroke-width", 2)
    .attr("d", d3.line().x((d) => x(d.day)).y((d) => y(d.vol)).curve(d3.curveMonotoneX));

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat((d) => `D${d}`));

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d}%`));
}

/**** 4. Artículo 3 – ΔT rGO vs rGO+AuNP ****/
const art3Delta = [
  { t: 0, base: 25, comp: 25 },
  { t: 1, base: 30, comp: 33 },
  { t: 2, base: 32, comp: 38 },
  { t: 3, base: 33, comp: 41 },
  { t: 4, base: 34, comp: 44 },
  { t: 5, base: 34.5, comp: 45 }
];

function drawArt3DeltaT() {
  const el = document.querySelector("#graph-art3-deltaT");
  if (!el) return;
  clear(el);
  const width = el.clientWidth || 600;

  const svg = d3
    .select(el)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(art3Delta, (d) => d.t)])
    .range([margin.left, width - margin.right]);
  const y = d3
    .scaleLinear()
    .domain([25, 50])
    .range([height - margin.bottom, margin.top]);

  const lineBase = d3
    .line()
    .x((d) => x(d.t))
    .y((d) => y(d.base))
    .curve(d3.curveMonotoneX);
  const lineComp = d3
    .line()
    .x((d) => x(d.t))
    .y((d) => y(d.comp))
    .curve(d3.curveMonotoneX);

  svg
    .append("path")
    .datum(art3Delta)
    .attr("fill", "none")
    .attr("stroke", "var(--accent-light)")
    .attr("stroke-width", 2.5)
    .attr("d", lineBase)
    .attr("stroke-dasharray", "4 4")
    .append("title")
    .text("rGO solo");

  svg
    .append("path")
    .datum(art3Delta)
    .attr("fill", "none")
    .attr("stroke", "var(--accent-dark)")
    .attr("stroke-width", 3)
    .attr("d", lineComp)
    .append("title")
    .text("rGO + AuNP");

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat((d) => `${d} min`));
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d} °C`));
}

/**** 5. Artículo 3 – Linealidad miR‑21 ****/
const art3Lin = [
  { conc: 5, resp: 0.05 },
  { conc: 10, resp: 0.11 },
  { conc: 20, resp: 0.21 },
  { conc: 40, resp: 0.41 },
  { conc: 80, resp: 0.82 },
  { conc: 100, resp: 1.03 }
];

function drawArt3Linearity() {
  const el = document.querySelector("#graph-art3-linearity");
  if (!el) return;
  clear(el);
  const width = el.clientWidth || 600;

  const svg = d3
    .select(el)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3
    .scaleLinear()
    .domain([0, 110])
    .range([margin.left, width - margin.right]);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(art3Lin, (d) => d.resp) + 0.1])
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .selectAll("circle")
    .data(art3Lin)
    .join("circle")
    .attr("cx", (d) => x(d.conc))
    .attr("cy", (d) => y(d.resp))
    .attr("r", 5)
    .attr("fill", "var(--accent)")
    .append("title")
    .text((d) => `${d.conc} fM → ${d.resp}`);

  const line = d3
    .line()
    .x((d) => x(d.conc))
    .y((d) => y(d.resp))
    .curve(d3.curveLinear);

  svg
    .append("path")
    .datum(art3Lin)
    .attr("fill", "none")
    .attr("stroke", "var(--accent-dark)")
    .attr("stroke-width", 2)
    .attr("d", line);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat((d) => `${d} fM`));
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5));
}

/**** Inicializar todos los gráficos ****/
function renderAll() {
  drawArt1Editing();
  drawArt2DeltaT();
  drawArt2Tumor();
  drawArt3DeltaT();
  drawArt3Linearity();
}

// Render al cargar y al redimensionar
window.addEventListener("DOMContentLoaded", renderAll);
window.addEventListener("resize", () => {
  // Pequeño debounce
  clearTimeout(window.__resizeTimer);
  window.__resizeTimer = setTimeout(renderAll, 250);
});
