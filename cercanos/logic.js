let selectedTone = null;

function selectTone(tone) {
    selectedTone = tone;
    
    // Reset styles
    document.querySelectorAll('.tone-btn').forEach(btn => {
        btn.classList.remove('bg-yellow-500', 'text-black', 'border-yellow-500');
        btn.classList.add('border-slate-700');
    });

    // Highlight selected
    const btn = document.getElementById(`btn-${tone}`);
    btn.classList.remove('border-slate-700');
    btn.classList.add('bg-yellow-500', 'text-black', 'border-yellow-500');
}

function analizar() {
    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;
    const output = document.getElementById('output-log');
    const resultDiv = document.getElementById('resultado');

    if (!nombre || !mensaje || !selectedTone) {
        alert("Por favor completa todos los campos");
        return;
    }

    resultDiv.classList.remove('hidden');
    output.innerHTML = ''; // Clear previous

    // Log logic
    addLog(`[CO-OP] Mensaje de ${nombre}: "${mensaje}"`, 'text-slate-400');

    if (selectedTone === 'CONFUSO') {
        addLog(">> ALERTA AMARILLA: Patrón confuso detectado.", 'text-yellow-400 font-bold');
        addLog("   Estrategia: Debugging Directo.", 'text-slate-300');
        addLog("   Say: 'Oye we, ¿es coto (broma) o es neta? No caché el sarcasmo xd'", 'text-green-400');
    }
    else if (selectedTone === 'DRAMA' || mensaje.toLowerCase().includes("tenemos que hablar")) {
        addLog(">> ALERTA ROJA: Posible conflicto.", 'text-red-500 font-bold');
        addLog("   Estrategia: Pausa y Verificación.", 'text-slate-300');
        addLog("   1. No contestar caliente.", 'text-slate-300 ml-4');
        addLog("   2. Preguntar: '¿Hice algo que te molestara o pasó algo más?'", 'text-green-400 ml-4');
    }
    else if (selectedTone === 'DESMADRE') {
        addLog(">> ACCIÓN: Seguir el juego.", 'text-blue-400 font-bold');
        addLog("   Mandar sticker de :v o meme random.", 'text-green-400');
    }
    else {
        addLog(">> ACCIÓN: Respuesta estándar.", 'text-blue-400 font-bold');
        addLog("   Escucha activa.", 'text-green-400');
    }
}

function addLog(text, classes) {
    const p = document.createElement('p');
    p.className = classes;
    p.textContent = text;
    document.getElementById('output-log').appendChild(p);
}