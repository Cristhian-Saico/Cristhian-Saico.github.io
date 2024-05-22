document.getElementById('loadingHeartContainer').addEventListener('click', function() {
    const fillElement = document.querySelector('.fill');
    fillElement.style.animation = 'fillHeart 2s linear forwards';
    
    setTimeout(function() {
        fillElement.addEventListener('animationend', function() {
            window.location.href = "aniversario.html"; // Cambia a la página de destino
        });
    }, 2000);
});

function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    for (let i = 0; i < 30; i++) {
        let heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        heartsContainer.appendChild(heart);
    }
}

// Llama a createHearts() si es necesario en la página de aniversario
if (document.getElementById('hearts')) {
    createHearts();
}
