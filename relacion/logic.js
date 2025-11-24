const Semaforo = {
    VERDE: "VERDE",
    AMARILLO: "AMARILLO",
    ROJO: "ROJO"
};

function quickFillContext(text) {
    document.getElementById('contexto').value = text;
}

function analizar() {
    const entrada = {
        tiempoRespuesta: document.getElementById('tiempoRespuesta').value,
        tono: document.getElementById('tono').value,
        lenguajeCorporal: document.getElementById('lenguajeCorporal').value,
        contexto: document.getElementById('contexto').value
    };

    const estado = analizarPatrones(entrada);
    actualizarSemaforo(estado);
    ejecutarProtocolo(estado, entrada);
}

function analizarPatrones(entrada) {
    // Caso ROJO
    if (
        entrada.lenguajeCorporal === 'RECHAZO' ||
        entrada.tono === 'ENOJADO' ||
        entrada.tiempoRespuesta === 'GHOSTING'
    ) {
        return Semaforo.ROJO;
    }

    // Caso AMARILLO
    if (
        entrada.tiempoRespuesta === 'DEMORADO' ||
        entrada.tono === 'CORTANTE' ||
        entrada.lenguajeCorporal === 'EVASIVO' ||
        entrada.tono === 'TRISTE'
    ) {
        return Semaforo.AMARILLO;
    }

    // Caso VERDE
    return Semaforo.VERDE;
}

function actualizarSemaforo(estado) {
    const red = document.getElementById('light-red');
    const yellow = document.getElementById('light-yellow');
    const green = document.getElementById('light-green');
    const text = document.getElementById('status-text');

    // Reset
    const baseClass = "w-16 h-16 rounded-full transition-all duration-300 shadow-lg opacity-40 scale-100";
    red.className = `${baseClass} bg-red-900`;
    yellow.className = `${baseClass} bg-yellow-900`;
    green.className = `${baseClass} bg-green-900`;

    if (estado === Semaforo.ROJO) {
        red.className = "w-16 h-16 rounded-full bg-red-500 transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.8)] opacity-100 scale-110";
        text.className = "mt-6 text-xl font-bold text-red-500";
        text.textContent = "ERROR CRÍTICO";
    } else if (estado === Semaforo.AMARILLO) {
        yellow.className = "w-16 h-16 rounded-full bg-yellow-400 transition-all duration-300 shadow-[0_0_30px_rgba(250,204,21,0.8)] opacity-100 scale-110";
        text.className = "mt-6 text-xl font-bold text-yellow-400";
        text.textContent = "ADVERTENCIA";
    } else {
        green.className = "w-16 h-16 rounded-full bg-green-500 transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.8)] opacity-100 scale-110";
        text.className = "mt-6 text-xl font-bold text-green-500";
        text.textContent = "SISTEMA NOMINAL";
    }
}

function ejecutarProtocolo(estado, entrada) {
    const container = document.getElementById('protocolo-container');
    const log = document.getElementById('protocolo-log');
    
    container.classList.remove('hidden');
    log.innerHTML = '';

    if (estado === Semaforo.VERDE) {
        addLog(">> ACCIÓN: Continuar().", "text-green-400 font-bold");
        addLog("   Seguir mandando memes y platicando chido.", "text-slate-300");
    } 
    else if (estado === Semaforo.AMARILLO) {
        addLog(">> ADVERTENCIA: Anomalía detectada.", "text-yellow-400 font-bold");
        addLog("   Iniciando Consulta de Validación...", "text-slate-400");
        
        const pregunta = construirPregunta(entrada);
        addLog(`>> TU DIÁLOGO SUGERIDO:`, "text-blue-300 mt-2");
        addLog(`   "${pregunta}"`, "text-white italic");
        addLog(">> ESPERAR RESPUESTA... (No presionar)", "text-slate-500 mt-2");
    } 
    else if (estado === Semaforo.ROJO) {
        addLog(">> CRITICO: Pausa Total.", "text-red-500 font-bold");
        addLog("   Abortar argumentos lógicos.", "text-red-400");
        addLog(">> PROTOCOLO DE EMERGENCIA:", "text-slate-300 mt-2 border-b border-slate-800 pb-1");
        addLog("   1. CALLARSE (Dejar de hablar inmediatamente)", "text-slate-300");
        addLog("   2. Ofrecer Menú de Soporte: ¿Oído, Consejo o Apapacho?", "text-slate-300");
        addLog("   3. Si hay rechazo físico: Traer agua/pañuelos y dar espacio.", "text-slate-300");
    }
}

function construirPregunta(entrada) {
    let observacion = "";

    if (entrada.tono === 'CORTANTE') observacion = "te siento un poco cortante al hablar";
    else if (entrada.tiempoRespuesta === 'DEMORADO') observacion = "estás muy callada hoy";
    else if (entrada.lenguajeCorporal === 'EVASIVO') observacion = "no me estás volteando a ver";
    else if (entrada.tono === 'TRISTE') observacion = "te noto bajoneada";
    else observacion = "siento algo raro en el ambiente";

    return `Amor, ${observacion}. ¿Todo bien o necesitas un ratito para ti?`;
}

function addLog(text, classes) {
    const p = document.createElement('p');
    p.className = classes;
    p.textContent = text;
    document.getElementById('protocolo-log').appendChild(p);
}