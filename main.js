/* ------------------- UTILIDADES BÁSICAS ------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Año dinámico en footer
  document.getElementById('year').textContent = new Date().getFullYear();
});
