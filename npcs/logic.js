function handleEnter(e) {
    if (e.key === 'Enter') {
        procesar();
    }
}

function quickFill(text) {
    document.getElementById('mensajeNPC').value = text;
    procesar();
}

function procesar() {
    const inputEl = document.getElementById('mensajeNPC');
    const msg = inputEl.value.trim();
    
    if (!msg) return;

    // Add User Message
    addMessage(msg, 'user');
    inputEl.value = '';

    // Generate Response
    const respuesta = generarScript(msg.toLowerCase());

    // Simulate "thinking" delay slightly
    setTimeout(() => {
        addMessage(respuesta, 'bot');
    }, 300);
}

function generarScript(msg) {
    // Script 1: Saludos
    if (msg.match(/hola|buenos|tardes|días/)) {
        return "Buenas tardes. (Sonrisa genérica #3)";
    }

    // Script 2: Gratitud
    if (msg.match(/gracias|amable/)) {
        return "De nada, buen día. (Asentir cabeza)";
    }

    // Script 3: Ventas / Solicitudes en la calle
    if (msg.match(/quiere|gusta|promoción|moneda|regala|apoya/)) {
        return "No gracias, ando con prisa. (No hacer contacto visual y seguir caminando)";
    }

    // Script 4: Preguntas random (Hora, dirección)
    if (msg.match(/hora|dónde|sabes|conoces/)) {
        return "Híjole, te fallo, no soy de por aquí / no traigo reloj. (Disculpa rápida)";
    }

    // Default (Catch-all)
    return "Simón / Ah órale / Gracias. (Respuesta monosílaba neutral)";
}

function addMessage(text, sender) {
    const container = document.getElementById('chat-container');
    
    // Remove placeholder if exists
    if (container.children.length === 1 && container.children[0].classList.contains('text-center')) {
        container.innerHTML = '';
    }

    const div = document.createElement('div');
    const bubble = document.createElement('div');
    
    if (sender === 'user') {
        div.className = "flex justify-end mb-4";
        bubble.className = "bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tr-none max-w-[80%]";
        bubble.textContent = `"${text}"`;
    } else {
        div.className = "flex justify-start mb-4";
        bubble.className = "bg-blue-900 text-blue-100 p-3 rounded-2xl rounded-tl-none max-w-[80%] border border-blue-700";
        bubble.innerHTML = `<span class="font-bold text-xs block text-blue-300 mb-1">>> OUTPUT AUTOMÁTICO</span>${text}`;
    }

    div.appendChild(bubble);
    container.insertBefore(div, container.firstChild);
}