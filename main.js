document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Datos para D3.js ---
    const skillsData = [
        { name: "Python", value: 70 },
        { name: "R", value: 60 },
        { name: "C++", value: 50 },
        { name: "Machine Learning", value: 50 }
    ];

    let chartDrawn = false;

    // --- 2. Función para dibujar el gráfico ---
    const drawChart = () => {
        if (chartDrawn) return; // Evitar que se dibuje múltiples veces
        
        const container = d3.select("#skills-chart");
        container.html(""); // Limpiar
        
        // Obtener ancho dinámico del contenedor de Bento
        const node = container.node();
        const width = node.getBoundingClientRect().width;
        const height = 200;
        const margin = { top: 10, right: 30, bottom: 20, left: 100 };

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height);

        const x = d3.scaleLinear()
            .domain([0, 100])
            .range([margin.left, width - margin.right]);

        const y = d3.scaleBand()
            .domain(skillsData.map(d => d.name))
            .range([margin.top, height - margin.bottom])
            .padding(0.4);

        // Barras de fondo (Track)
        svg.selectAll(".bg-bar")
            .data(skillsData)
            .enter().append("rect")
            .attr("class", "bg-bar")
            .attr("x", margin.left)
            .attr("y", d => y(d.name))
            .attr("width", width - margin.left - margin.right)
            .attr("height", y.bandwidth())
            .attr("fill", "rgba(255,255,255,0.05)")
            .attr("rx", 4);

        // Barras de progreso (Fill animado)
        svg.selectAll(".fill-bar")
            .data(skillsData)
            .enter().append("rect")
            .attr("class", "fill-bar")
            .attr("x", margin.left)
            .attr("y", d => y(d.name))
            .attr("width", 0) // Inicia en 0
            .attr("height", y.bandwidth())
            .attr("fill", "url(#barGradient)") // Usa gradiente
            .attr("rx", 4)
            .transition()
            .duration(1200)
            .ease(d3.easeCubicOut)
            .attr("width", d => x(d.value) - margin.left);

        // Etiquetas Eje Y
        svg.selectAll(".label")
            .data(skillsData)
            .enter().append("text")
            .attr("x", margin.left - 5)
            .attr("y", d => y(d.name) + y.bandwidth() / 1.5)
            .attr("text-anchor", "end")
            .text(d => d.name)
            .style("fill", "#94a3b8")
            .style("font-size", "13px")
            .style("font-family", "Inter");

        // Definir Gradiente SVG
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "barGradient")
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", "100%").attr("y2", "0%");
        gradient.append("stop").attr("offset", "0%").style("stop-color", "#3b82f6");
        gradient.append("stop").attr("offset", "100%").style("stop-color", "#8b5cf6");

        chartDrawn = true;
    };

    // --- 3. Intersection Observer (Mejora UX/Rendimiento) ---
    // Detecta qué sección está en pantalla
    const sections = document.querySelectorAll('.snap-section');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: document.querySelector('.snap-container'),
        threshold: 0.5 // Se activa cuando la sección está al 50% visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Actualizar el menú de navegación activo
                const currentId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    }
                });

                // 2. Disparar el gráfico si llegamos a "about"
                if (currentId === 'about') {
                    drawChart();
                }
            }
        });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));

    // Refrescar el gráfico si se cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        if (chartDrawn && document.querySelector('#about').getBoundingClientRect().top < window.innerHeight) {
            chartDrawn = false;
            drawChart();
        }
    });
});