// --- Lógica de Acessibilidade (Critério 5) ---
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

function toggleDyslexia() {
    document.body.classList.toggle('dyslexia-font');
    localStorage.setItem('dyslexiaFont', document.body.classList.contains('dyslexia-font'));
}

let currentFontSize = 100;
function changeFontSize(direction) {
    currentFontSize += direction * 10;
    if (currentFontSize < 80) currentFontSize = 80;
    if (currentFontSize > 150) currentFontSize = 150;
    document.body.style.fontSize = currentFontSize + '%';
}

// Carregar preferências salvas
window.onload = () => {
    if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
    if (localStorage.getItem('dyslexiaFont') === 'true') document.body.classList.add('dyslexia-font');
};

// --- Lógica do Simulador (Critério 4) ---
function calcularRadiacao() {
    const cor = document.getElementById('corSuperficie')?.value;
    const cob = document.getElementById('cobertura')?.value;
    
    if (!cor || !cob) return; // Segurança caso o elemento não exista na página

    let absorcao, reflexao, ganho;

    if (cor === 'preta') { absorcao = 90; reflexao = 10; ganho = 4.5; }
    else if (cor === 'azul') { absorcao = 70; reflexao = 30; ganho = 3.0; }
    else { absorcao = 30; reflexao = 70; ganho = 1.0; }

    if (cob === 'transparente') {
        ganho += 2.5; // Efeito estufa seletivo + redução de evaporação
        absorcao = Math.min(100, absorcao + 5);
        reflexao = 100 - absorcao;
    }

    const resultados = document.getElementById('resultados');
    if (resultados) {
        resultados.style.display = 'block';
        document.getElementById('valAbs').innerText = absorcao;
        document.getElementById('barAbs').style.width = absorcao + '%';
        document.getElementById('barAbs').innerText = absorcao + '%';
        
        document.getElementById('valRef').innerText = reflexao;
        document.getElementById('barRef').style.width = reflexao + '%';
        document.getElementById('barRef').innerText = reflexao + '%';

        document.getElementById('ganhoTemp').innerText = '+' + ganho.toFixed(1);
    }
}
