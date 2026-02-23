document.addEventListener('DOMContentLoaded', () => {
    // Año automático en el footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Datos de Habilidades
    const data = [
        { name: "Python", val: 90 },
        { name: "SQL", val: 75 },
        { name: "R", val: 70 },
        { name: "ML/AI", val: 80 },
        { name: "PowerBI", val: 65 }
    ];

    const container = d3.select("#skills-chart");
    const width = container.node().getBoundingClientRect().width;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 80 };

    const svg = container.append("svg")
        .attr("width", "100%")
        .attr("height", height);

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([margin.top, height - margin.bottom])
        .padding(0.3);

    // Ejes
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d => d + "%"))
        .style("color", "#94a3b8");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .style("color", "#f1f5f9")
        .selectAll("text")
        .style("font-size", "12px");

    // Barras con animación
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", margin.left)
        .attr("y", d => y(d.name))
        .attr("width", 0) // Empieza en 0 para la animación
        .attr("height", y.bandwidth())
        .attr("fill", "#38bdf8")
        .transition()
        .duration(1000)
        .attr("width", d => x(d.val) - margin.left);
});