// ===================================================================
// EVENTOS-DATA.JS – Catálogo centralizado de ediciones de eventos
// ===================================================================

export const EVENT_DETAILS = {
  explorando: {
    /* ----- AÑADE MÁS AÑOS SI LO NECESITAS ----- */
    2024: {
      title: 'Explorando Ciencias 2024',
      subtitle: 'Inteligencia Artificial y su impacto en la salud',
      date: '15 de junio de 2024 · Lima, Perú',
      banner: '/assets/images/ec-banner.jpg',
      about: `“Explorando Ciencias” es nuestro encuentro anual para descubrir
              tendencias científicas emergentes. La edición 2024 reúne a expertos
              que aplican IA en diagnóstico, pronóstico y optimización de tratamientos médicos.`,
      objectives: [
        'Difundir avances de IA en salud y su potencial en Latinoamérica.',
        'Conectar estudiantes con investigadores líderes del área.',
        'Impulsar proyectos colaborativos interdisciplinarios.',
      ],
      speakers: [
        { name:'Dra Rosa Salazar', role:'MIT · Machine Learning for Health', img:'/assets/images/speaker1.jpg' },
        { name:'Dr Luis Quispe',   role:'U. de Chile · Bioinformática',      img:'/assets/images/speaker2.jpg' },
        { name:'Ing. María Cáceres', role:'Google Health · IA responsable',  img:'/assets/images/speaker3.jpg' },
      ],
      gallery: [
        '/assets/images/gal1.jpg',
        '/assets/images/gal2.jpg',
        '/assets/images/gal3.jpg',
        '/assets/images/gal4.jpg',
      ],
    },

    2022: {
      title: 'Explorando Ciencias 2022',
      subtitle: 'Nanotecnología aplicada a la energía',
      date: '21 de julio de 2022 · Santiago, Chile',
      banner: '/assets/images/ec22-banner.jpg',
      about: 'La edición 2022 exploró nanomateriales para baterías y captura de CO₂…',
      objectives: [
        'Presentar avances en nanomateriales energéticos.',
        'Fomentar colaboraciones transfronterizas de investigación.',
      ],
      speakers: [
        { name:'Dra Juana Silva', role:'U. Nacional MX · Nano-energía', img:'/assets/images/ec22-sp1.jpg' },
        { name:'Dr Pedro López', role:'Arg. NanoTech Lab',             img:'/assets/images/ec22-sp2.jpg' },
      ],
      gallery: [
        '/assets/images/ec22-g1.jpg',
        '/assets/images/ec22-g2.jpg',
      ],
    },
  },

  lazos: {
    2023: {
      title: 'Generando Lazos 2023',
      subtitle: 'Sinergias universidad–industria para la innovación',
      date: '3 de septiembre de 2023 · Bogotá, Colombia',
      banner: '/assets/images/gl-banner.jpg',
      about: `“Generando Lazos” crea puentes sólidos entre la academia
              y el sector productivo. La edición 2023 reunió a startups,
              corporaciones y universidades…`,
      objectives: [
        'Casos de éxito de alianzas universidad–empresa.',
        'Facilitar networking para convenios de investigación aplicada.',
        'Inspirar emprendimientos científicos sostenibles.',
      ],
      speakers: [
        { name:'Ing. Diego Herrera', img:'/assets/images/gl-speaker1.jpg', role:'CEO · BioTech Latam' },
        { name:'Dra. Laura Méndez',  img:'/assets/images/gl-speaker2.jpg', role:'U. Nacional · Transferencia tecnológica' },
        { name:'MSc. José Ríos',     img:'/assets/images/gl-speaker3.jpg', role:'Microsoft Research · IA para pymes' },
      ],
      gallery: [
        '/assets/images/gl-gal1.jpg',
        '/assets/images/gl-gal2.jpg',
        '/assets/images/gl-gal3.jpg',
        '/assets/images/gl-gal4.jpg',
      ],
    },
    /* ----- más años… ----- */
  },
};
