/**
 * ------------------------------------------------------------------
 * 🧠 Angel's KERNEL: SISTEMA OPERATIVO UNICO v3.0 (JS Port)
 * ------------------------------------------------------------------
 */

// 1. ENUMS DE ESTADOS (Simulados como objetos)
let activeEmotion = null;

const NivelEstimulacion = {
    HIPO_ESTIMULADO: "HIPO",   // "Boredom Pain"
    OPTIMO_FLOW: "FLOW",       // Hyperfocus
    SOBRE_ESTIMULADO: "OVER",  // Demasiado ruido
    SHUTDOWN: "CRASH",         // Pantallazo azul
    ALERTA_SENSORIAL: "NOISE"  // Nuevo: Mucho ruido pero manejable
};

const EstadoEjecutivo = {
    OPERATIVO: "ONLINE",
    PARALISIS: "FROZEN",       // "Quiero hacer X pero no me puedo mover"
    DISPERSO: "SQUIRREL",      // 20 pestañas abiertas
    BURNOUT: "OFFLINE",        // Sin cucharas
    FATIGA: "TIRED"            // Nuevo: Batería baja
};

// --- GUÍA PARA TERCEROS (Diccionario) ---
const protocolGuides = {
    "EVACUACIÓN SOCIAL": {
        desc: "Angel está en niveles críticos de ansiedad. Su sistema nervioso está en modo 'huida'.",
        tips: ["No le hables ni le preguntes 'qué tienes'.", "Déjalo irse a un lugar privado inmediatamente.", "No te lo tomes personal, es biológico."],
        selfHelp: ["Sal de ahí AHORA. No pidas permiso.", "Ve al baño o a tu coche.", "Respira en caja (4-4-4-4)."],
        icon: "🚨"
    },
    "ESCUDO SOCIAL": {
        desc: "La batería social está baja. Angel puede interactuar, pero con esfuerzo limitado.",
        tips: ["Evita temas profundos o conflictivos.", "Dale espacio físico.", "Si se queda callado, es normal."],
        selfHelp: ["Ponte en modo 'observador'.", "Limita tus respuestas a lo necesario.", "Planea tu salida en 30 min."],
        icon: "🛡️"
    },
    "BUNKER MODE": {
        desc: "Sobrecarga sensorial extrema. El cerebro está bloqueando inputs para no colapsar.",
        tips: ["Baja la voz y apaga luces fuertes.", "No esperes respuestas rápidas.", "Déjalo usar audífonos o irse a un cuarto oscuro."],
        selfHelp: ["Ponte audífonos con cancelación de ruido.", "Apaga la luz o usa lentes oscuros.", "Métete bajo una manta pesada."],
        icon: "☢️"
    },
    "REDUCCIÓN DE RUIDO": {
        desc: "El entorno es demasiado ruidoso o brillante. Irritabilidad en aumento.",
        tips: ["Si tiene audífonos puestos, NO le hables.", "Baja el volumen de la música/TV.", "Usa mensajería en lugar de hablar."],
        selfHelp: ["Reduce inputs: Audífonos ON.", "Baja el brillo de tus pantallas.", "Aléjate de fuentes de olor fuerte."],
        icon: "🔇"
    },
    "JUMPSTART": {
        desc: "Parálisis por falta de dopamina. Quiere hacer cosas pero no puede empezar.",
        tips: ["Pon música animada.", "Ofrécele un café o algo dulce.", "Haz 'Body Doubling': siéntate a su lado trabajando en lo tuyo."],
        selfHelp: ["Pon tu canción favorita a todo volumen.", "Haz algo ridículamente pequeño (ej. abrir un archivo).", "Come algo dulce."],
        icon: "⚡"
    },
    "AHORRO DE ENERGÍA": {
        desc: "Batería baja. Funciona en modo 'Solo Lectura'.",
        tips: ["No le pidas decisiones complejas.", "Cancela planes que requieran mucha energía.", "Déjalo descansar sin culpa."],
        selfHelp: ["Di 'NO' a todo lo nuevo.", "Cancela reuniones no vitales.", "Haz tareas mecánicas que no requieran pensar."],
        icon: "🪫"
    },
    "DESCONGELAMIENTO": {
        desc: "Parálisis por ansiedad ante un evento futuro (Waiting Mode).",
        tips: ["Recuérdale la hora exacta del evento.", "Ayúdale a hacer una tarea pequeña y estúpida para romper el hielo.", "No le añadas más presión."],
        selfHelp: ["Pon una alarma 15 min antes del evento.", "Haz algo que puedas dejar a medias.", "Valida que la hora es correcta."],
        icon: "🧊"
    },
    "MANTENIMIENTO BIO": {
        desc: "Hiperfoco intenso pero descuidando necesidades básicas.",
        tips: ["Ponle un vaso de agua en el escritorio sin decir nada.", "No le hables, solo déjale snacks.", "No rompas su concentración."],
        selfHelp: ["Bebe agua AHORA.", "Estira las piernas 30 segundos.", "Lleva snacks al escritorio."],
        icon: "🚽"
    },
    "ALIMENTACIÓN EMERGENCIA": {
        desc: "Malhumor extremo por hambre (Hanger). Peligro.",
        tips: ["NO DISCUTAS.", "Dale comida (azúcar/carbohidratos) inmediatamente.", "Espera 15 min después de comer para hablar."],
        selfHelp: ["COME ALGO YA. No importa qué.", "No tomes decisiones hasta comer.", "Avisa: 'Estoy hangry, dame 10 min'."],
        icon: "🍔"
    },
    "MODO RECUPERACIÓN": {
        desc: "El sistema se reinició después de un colapso. Fragilidad alta.",
        tips: ["Tráele una manta y agua.", "Pon su serie favorita.", "Silencio absoluto y cero exigencias."],
        selfHelp: ["Acuéstate.", "Hidrátate mucho.", "Pon tu serie de confort (la que has visto 10 veces)."],
        icon: "🛌"
    },
    "ATERRIZAJE FORZOSO": {
        desc: "Cansado pero acelerado (Wired but Tired).",
        tips: ["Ayúdale a 'bajar revoluciones'.", "No le des nuevas ideas o proyectos.", "Sugiérele ir a dormir suavemente."],
        selfHelp: ["Deja las pantallas.", "Ducha caliente.", "Escribe todo lo que tienes en la cabeza para vaciarla."],
        icon: "🛬"
    },
    "SQUIRREL MODE": {
        desc: "Alta energía y alta dispersión. Saltando de tema en tema.",
        tips: ["Ayúdale a anotar sus ideas para que no se pierdan.", "Recuérdale suavemente qué estaba haciendo.", "No te rías si cambia de tema 5 veces."],
        selfHelp: ["Escribe tus ideas en post-its.", "Cierra pestañas del navegador.", "Usa un timer visual."],
        icon: "🐿️"
    },
    "SISTEMA NOMINAL": {
        desc: "Todo funciona correctamente. Angel está operativo y feliz.",
        tips: ["Aprovecha para hablar o colaborar.", "Disfruta el momento.", "Invítale un café."],
        selfHelp: ["Disfruta tu cerebro funcional.", "Avanza en tus proyectos importantes.", "No olvides tomar agua."],
        icon: "✅"
    },
    "GOD_MODE": {
        desc: "Estado de flujo absoluto. Los límites biológicos parecen desaparecer temporalmente.",
        tips: ["No lo interrumpas bajo ninguna circunstancia.", "Si le hablas, probablemente no te escuche.", "Déjale comida cerca y aléjate lentamente."],
        selfHelp: ["Crea, construye, resuelve.", "Anota tus ideas geniales.", "Pon una alarma para comer, en serio."],
        icon: "🌟"
    },
    "MAGIC_HOUR": {
        desc: "La hora de las brujas. El mundo duerme y tu cerebro despierta.",
        tips: ["No esperes que te conteste mensajes ahora.", "Déjalo en su mundo nocturno.", "Mañana estará cansado, ten paciencia."],
        selfHelp: ["Escribe sin filtro.", "Disfruta el silencio.", "Prepárate para estar zombie mañana."],
        icon: "🦉"
    },
    "WIKI_HOLE": {
        desc: "Has caído en una espiral de información infinita. Sabes mucho sobre nada útil ahora mismo.",
        tips: ["Prepárate para escuchar datos random sobre el Imperio Romano.", "Finge interés o huye discretamente.", "No intentes cambiar el tema, es imposible."],
        selfHelp: ["Cierra el navegador.", "Levántate de la silla.", "Pregúntate: '¿Esto me sirve para algo?'"],
        icon: "🌀"
    },
    "JUSTICE_MODE": {
        desc: "Sensibilidad a la injusticia activada al 200%. No puedes descansar hasta que la verdad salga a la luz.",
        tips: ["POR FAVOR no le digas 'cálmate'.", "Escucha su monólogo sin debatir.", "Espera a que se le agote la batería de la ira."],
        selfHelp: ["Escribe el rant en notas, no lo publiques.", "Aléjate de Twitter/X.", "Haz ejercicio intenso para quemar la rabia."],
        icon: "⚖️"
    },
    "EPIPHANY": {
        desc: "Reconocimiento de patrones completado. Todo tiene sentido. La solución ha llegado sola.",
        tips: ["Pásale una libreta o algo para escribir.", "No le hables, está 'descargando' información del universo.", "Si te mira raro, no eres tú, es la idea."],
        selfHelp: ["¡ANÓTALO YA!", "Graba una nota de voz.", "No dejes que se escape."],
        icon: "🧩"
    },
    "VOID_MODE": {
        desc: "El sistema se ha desconectado de la realidad. No hay dolor, pero tampoco hay 'tú'.",
        tips: ["No está enojado, está reiniciando.", "No le exijas contacto visual.", "Su cuerpo está ahí, pero Angel no."],
        selfHelp: ["No luches contra la niebla.", "Toca algo frío o rugoso.", "Espera a que pase."],
        icon: "😶"
    },
    "GHOST_MODE": {
        desc: "Deseo extremo de ser invisible. La percepción social es una amenaza.",
        tips: ["Haz como que no lo ves.", "No lo saludes efusivamente.", "Si se esconde, no lo busques."],
        selfHelp: ["Desaparece un rato.", "No contestes mensajes.", "Hazte bolita."],
        icon: "👻"
    },
    "MELTDOWN": {
        desc: "Fallo catastrófico de contención. La agresividad se redirige hacia el propio hardware para evitar dañar a otros.",
        tips: ["Mantén la distancia de seguridad.", "Retira objetos peligrosos del alcance.", "Silencio absoluto. No toques."],
        selfHelp: ["Vete a un lugar seguro.", "Protege tu cabeza.", "No intentes hablar."],
        icon: "⚠️"
    },
    "ZOMBIE_MODE": {
        desc: "El hardware está sufriendo daños por falta de mantenimiento. Alucinaciones leves posibles.",
        tips: ["Mándalo a dormir imperativamente.", "No le creas nada de lo que diga.", "Es inofensivo pero inútil."],
        selfHelp: ["VE A DORMIR.", "No operes maquinaria pesada.", "No mandes mensajes."],
        icon: "🧟"
    },
    "DOOMSCROLLING": {
        desc: "Atrapado en un bucle de información negativa. Parálisis del terror a las 3 AM.",
        tips: ["Quítale el celular suavemente.", "Ofrécele una distracción física (comida/abrazo).", "No le preguntes qué está viendo."],
        selfHelp: ["Tira el celular lejos.", "Cierra los ojos fuerte.", "Respira."],
        icon: "🕸️"
    },
    "FEEDING PROTOCOL": {
        desc: "Irritabilidad por hambre (Hanger). El cerebro no tiene glucosa.",
        tips: ["No preguntes 'qué quieres comer', solo trae comida.", "Algo crujiente o dulce ayuda rápido.", "No discutas hasta que haya comido."],
        selfHelp: ["Come algo dulce YA.", "No hables con nadie.", "Pide perdón luego."],
        icon: "🍔"
    }
};

// --- SOUND ENGINE (Web Audio API) ---
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.activeOscillators = [];
        this.activeIntervals = [];
        this.currentSoundMode = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.3; // Increased Volume
            this.masterGain.connect(this.ctx.destination);
            this.initialized = true;
        } catch (e) {
            console.error("Web Audio API no soportada");
        }
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    stopAll() {
        // Stop oscillators
        this.activeOscillators.forEach(node => {
            try {
                if(node.stop) node.stop();
                node.disconnect();
            } catch(e) {}
        });
        this.activeOscillators = [];

        // Clear intervals
        this.activeIntervals.forEach(i => clearInterval(i));
        this.activeIntervals = [];
        
        this.currentSoundMode = null;
    }

    // --- GENERATORS ---

    playTone(freq, type = 'sine', duration = 0.5, vol = 0.1) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playNoise(duration = 1, type = 'white', vol = 0.2) {
        if (!this.ctx) return;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        let localLastOut = 0; // Use local variable for pink noise generation

        for (let i = 0; i < bufferSize; i++) {
            if (type === 'white') {
                data[i] = Math.random() * 2 - 1;
            } else {
                // Pink noise approx
                const white = Math.random() * 2 - 1;
                data[i] = (localLastOut + (0.02 * white)) / 1.02;
                localLastOut = data[i];
                data[i] *= 3.5; 
            }
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.value = vol; 
        
        noise.connect(gain);
        gain.connect(this.masterGain);
        noise.start();
    }

    // --- MODES ---

    setMode(mode) {
        if (this.currentSoundMode === mode) return;
        this.stopAll();
        this.currentSoundMode = mode;
        this.resume();

        switch(mode) {
            case 'GOD_MODE':
                this.startDrone(432, 'sine', 0.3);
                this.startDrone(648, 'sine', 0.15); // 5th
                break;
            case 'MAGIC_HOUR':
                this.startDrone(110, 'sine', 0.3); // Low A
                this.startDrone(330, 'sine', 0.1); // E (Harmonic)
                break;
            case 'WIKI_HOLE':
                this.startDataStream();
                break;
            case 'JUSTICE_MODE':
                this.startDrone(150, 'sawtooth', 0.15); // Aggressive
                break;
            case 'EPIPHANY':
                this.playTone(880, 'sine', 2, 0.3);
                this.startDrone(528, 'sine', 0.2);
                break;
            case 'VOID_MODE':
                this.startStatic();
                break;
            case 'GHOST_MODE':
                this.startGhostAmbience();
                break;
            case 'MELTDOWN':
                this.startSiren();
                break;
            case 'ZOMBIE_MODE':
                this.startDrone(60, 'sawtooth', 0.2); // Low rumble
                break;
            case 'DOOMSCROLLING':
                this.startDrone(40, 'sine', 0.4); // Sub-bass
                this.startStatic(); // + Static
                break;
            case 'CRITICAL':
                this.startBeep();
                break;
        }
    }

    startDataStream() {
        if (!this.ctx) return;
        const interval = setInterval(() => {
            const freq = 800 + Math.random() * 800;
            this.playTone(freq, 'square', 0.05, 0.1);
        }, 100);
        this.activeIntervals.push(interval);
    }

    startGhostAmbience() {
        if (!this.ctx) return;
        // Continuous low pink noise loop
        const interval = setInterval(() => {
            this.playNoise(2.0, 'pink', 0.05); // Very quiet, overlapping
        }, 1500);
        this.activeIntervals.push(interval);
        // Initial start
        this.playNoise(2.0, 'pink', 0.05);
    }

    startDrone(freq, type, vol) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.value = freq;
        
        gain.gain.value = 0;
        gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.5); // Faster Fade in
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        
        this.activeOscillators.push(osc);
        this.activeOscillators.push(gain);
    }

    startSiren() {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.value = 440;
        
        gain.gain.value = 0.2; // Increased Siren Volume
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        
        this.activeOscillators.push(osc);
        
        // LFO for siren pitch
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 2; // 2Hz cycle
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 200; // +/- 200Hz
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        
        this.activeOscillators.push(lfo);
        this.activeOscillators.push(lfoGain);
    }

    startStatic() {
        if (!this.ctx) return;
        // Loop noise buffer
        const interval = setInterval(() => {
            this.playNoise(0.5, 'white');
        }, 400);
        this.activeIntervals.push(interval);
    }

    startBeep() {
        if (!this.ctx) return;
        const interval = setInterval(() => {
            this.playTone(880, 'square', 0.1, 0.2);
        }, 1000);
        this.activeIntervals.push(interval);
    }
}

let lastOut = 0; // For pink noise

// 2. CLASE PRINCIPAL (Lógica del Kernel)
class BrainKernel {
    constructor() {
        this.logs = [];
        this.specialMode = null;
        this.manualOverride = false; // Flag for forced modes
        this.sound = new SoundEngine();
    }

    log(message, type = 'info') {
        this.logs.push({ message, type });
    }

    clearLogs() {
        this.logs = [];
    }

    diagnosticarSistema(stats) {
        this.clearLogs();

        if (activeEmotion) {
            this.log(`>> EMOTIONAL OVERRIDE: ${emotions[activeEmotion].name.toUpperCase()}`, 'info');
        }

        // --- AUTO-DETECTION OF SPECIAL MODES (EXTREMES) ---
        // Only run auto-detect if not manually forced
        if (!this.manualOverride) {
            const autoMode = this.detectSpecialMode(stats);
            const autoTypes = ['MELTDOWN', 'ZOMBIE_MODE', 'GHOST_MODE', 'GOD_MODE', 'VOID_MODE', 'MAGIC_HOUR', 'EPIPHANY', 'WIKI_HOLE', 'JUSTICE_MODE', 'DOOMSCROLLING'];

            if (autoMode) {
                // If detected mode is different, switch to it
                if (this.specialMode !== autoMode) {
                    this.specialMode = autoMode;
                    // Force sound engine reset for new mode
                    if (this.sound) this.sound.stopAll();
                }
            } else {
                // If we were in an auto-mode but conditions are gone, release it
                // BUT keep it if it's sustained by activeEmotion (handled by detectSpecialMode returning it)
                if (autoTypes.includes(this.specialMode)) {
                    this.specialMode = null;
                    if (this.sound) this.sound.stopAll();
                }
            }
        }

        // --- SPECIAL MODES OVERRIDE ---
        if (this.specialMode) {
            this.handleSpecialMode();
            this.updateSound(null, null, stats);
            return;
        }

        // Reset Background (Standard)
        document.body.className = "bg-slate-900 text-slate-200 font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words";

        this.log("[SYSTEM DIAGNOSTIC] Corriendo análisis...", 'system');

        // Paso 0: Chequeo de BIOS (Log only, don't return early so protocols can activate)
        if (stats.necesidadesBio > 80) {
            this.log(">> ALERTA BIO: ¡Wey, ve al baño o come algo! (Interocepción crítica)", 'error');
            this.log("   Action: Pause process -> Eat/Drink/Pee.", 'action');
            this.updateStatusDisplay("CRITICAL", "BIO_HAZARD", stats);
        }

        // Paso 1: Determinar Estados
        this.estadoEstimulacion = this.calcularEstimulacion(stats);
        this.estadoEjecutivo = this.calcularEjecucion(stats);

        // Paso 2: Ejecutar Estrategia Combinada
        this.resolverConflicto(this.estadoEstimulacion, this.estadoEjecutivo, stats);
        
        this.renderLogs();
        // Update status display again at the end to ensure correct colors/text
        if (stats.necesidadesBio <= 80) {
             this.updateStatusDisplay(this.estadoEstimulacion, this.estadoEjecutivo, stats);
        }
    }

    detectSpecialMode(stats) {
        // 0. EMOTIONAL OVERRIDES (Conditional Logic)
        if (activeEmotion) {
            // WIKI_HOLE: Curiosity + Dispersed Attention + Energy
            if (activeEmotion === 'curiosity' && stats.dopamina > 60 && stats.cucharas > 30) return 'WIKI_HOLE';
            
            // EPIPHANY: Joy + High Clarity (Dopamine/Energy)
            if (activeEmotion === 'joy' && stats.dopamina > 80 && stats.cucharas > 70) return 'EPIPHANY';
            
            // VOID_MODE: Sadness/Shutdown + Low Energy
            if ((activeEmotion === 'sadness' || activeEmotion === 'shutdown') && stats.cucharas < 20) return 'VOID_MODE';
            
            // JUSTICE_MODE: Anger/Justice + Energy to fight
            if ((activeEmotion === 'anger' || activeEmotion === 'justice') && stats.cucharas > 40) return 'JUSTICE_MODE';
            
            // GHOST_MODE: Fear/Embarrassment + Social Anxiety
            if ((activeEmotion === 'fear' || activeEmotion === 'embarrassment') && stats.ansiedadSocial > 60) return 'GHOST_MODE';
            
            // DOOMSCROLLING: Anxiety + Low Energy (Stuck)
            if (activeEmotion === 'anxiety' && stats.cucharas < 30) return 'DOOMSCROLLING';
            
            // ZOMBIE_MODE: Ennui/Paralysis/Burnout + Critical Energy
            if ((activeEmotion === 'ennui' || activeEmotion === 'paralysis' || activeEmotion === 'burnout') && stats.cucharas < 15) return 'ZOMBIE_MODE';
            
            // MAGIC_HOUR: Nostalgia + Low Sensory Load
            if (activeEmotion === 'nostalgia' && stats.cargaSensorial < 30) return 'MAGIC_HOUR';
            
            // MELTDOWN: Overwhelm/RSD/Meltdown + High Stress
            if ((activeEmotion === 'overwhelm' || activeEmotion === 'rsd' || activeEmotion === 'meltdown') && (stats.cargaSensorial > 80 || stats.ansiedadSocial > 80)) return 'MELTDOWN';
            
            // GOD_MODE: Hyperfocus + Peak Stats
            if (activeEmotion === 'hyperfocus' && stats.dopamina > 80 && stats.cucharas > 80) return 'GOD_MODE';
        }

        // MAGIC_HOUR: Late night (1AM-6AM) + High Focus + Decent Energy
        const hour = new Date().getHours();
        if (hour >= 1 && hour < 6) {
            if (stats.dopamina >= 80 && stats.cucharas >= 50) return 'MAGIC_HOUR';
        }

        // MELTDOWN: Extreme Sensory Overload + No Energy (Almost impossible to avoid)
        if (stats.cargaSensorial >= 98 && stats.cucharas <= 5) return 'MELTDOWN';
        
        // ZOMBIE: Extreme Bio Needs + Exhaustion + Low Dopamine (System shutdown imminent)
        if (stats.necesidadesBio >= 98 && stats.cucharas <= 5 && stats.dopamina <= 10) return 'ZOMBIE_MODE';
        
        // GHOST: Extreme Social Anxiety + Low Energy (Total withdrawal)
        if (stats.ansiedadSocial >= 98 && stats.cucharas <= 30) return 'GHOST_MODE';
        
        // GOD_MODE: Perfect Flow (Statistical anomaly)
        if (stats.dopamina >= 98 && stats.cucharas >= 95 && stats.cargaSensorial <= 5 && stats.necesidadesBio <= 5 && stats.ansiedadSocial <= 5) return 'GOD_MODE';
        
        // EPIPHANY: High Clarity (Less intense than God Mode)
        if (stats.dopamina >= 90 && stats.cucharas >= 80 && stats.cargaSensorial <= 20 && stats.necesidadesBio <= 20 && stats.ansiedadSocial <= 10) return 'EPIPHANY';

        // VOID: Disassociation (Total emptiness)
        if (stats.dopamina <= 5 && stats.cucharas <= 5 && stats.cargaSensorial <= 5 && stats.necesidadesBio <= 5 && stats.ansiedadSocial <= 5) return 'VOID_MODE';

        return null;
    }

    handleSpecialMode() {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-fixed transition-colors duration-1000";
        
        if (this.specialMode === 'GOD_MODE') {
            document.body.className = `bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 text-yellow-100 ${baseClasses}`;
            this.log(">> PROTOCOLO: REALITY BENDING (GOD MODE).", 'success');
            this.log("   Sincronización absoluta de recursos.", 'info');
            this.log("   1. APROVECHA: Escribe, programa, diseña SIN PARAR.", 'action');
            this.log("   2. REGISTRA: Graba notas de voz si escribes lento.", 'action');
            this.log("   3. PELIGRO: No olvides comer ni dormir.", 'action');
            this.updateStatusDisplay("OMNIPOTENTE", "CREATIVO", {});
            this.updateProtocolDisplay("GOD_MODE");
            this.updateTrafficLight(null, null, null); // Traffic light handles specialMode check internally
        }
        else if (this.specialMode === 'MAGIC_HOUR') {
            document.body.className = `bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-purple-100 ${baseClasses}`;
            this.log(">> PROTOCOLO: 3:00 AM POWER (Magic Hour).", 'success');
            this.log("   El mundo duerme, tú creas.", 'info');
            this.log("   1. SILENCIO: Disfruta la falta de notificaciones.", 'action');
            this.log("   2. CREACIÓN: Es el mejor momento para arte/código.", 'action');
            this.log("   3. LÍMITE: Pon alarma para dormir al menos 4h.", 'action');
            this.updateStatusDisplay("NOCTURNO", "INSPIRADO", {});
            this.updateProtocolDisplay("MAGIC_HOUR");
            this.updateTrafficLight(null, null, null);
        }
        else if (this.specialMode === 'WIKI_HOLE') {
            document.body.className = `bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-cyan-100 ${baseClasses}`;
            this.log(">> PROTOCOLO: WIKI HOLE (Conejera).", 'warning');
            this.log("   Absorbiendo datos irrelevantes a alta velocidad.", 'info');
            this.log("   1. CONSCIENCIA: ¿Esto es útil o solo interesante?", 'action');
            this.log("   2. SALIDA: Cierra pestañas con 'Ctrl+W' sin mirar.", 'action');
            this.log("   3. ANCLA: Vuelve a tu tarea principal en 3, 2, 1...", 'action');
            this.updateStatusDisplay("HIPER-LINK", "CURIOSO", {});
            this.updateProtocolDisplay("WIKI_HOLE");
            this.updateTrafficLight(null, null, null);
        }
        else if (this.specialMode === 'JUSTICE_MODE') {
            document.body.className = `bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-orange-100 ${baseClasses}`;
            this.log(">> PROTOCOLO: FURIA JUSTICIERA.", 'error');
            this.log("   Detectada incorrección en internet.", 'info');
            this.log("   1. PAUSA: ¿Vale la pena tu paz mental?", 'action');
            this.log("   2. ESCRIBE: Escribe la respuesta en Notas y BÓRRALA.", 'action');
            this.log("   3. BLOQUEA: No alimentes al troll.", 'action');
            this.updateStatusDisplay("COMBATE", "ENFOCADO", {});
            this.updateProtocolDisplay("JUSTICE_MODE");
            this.updateTrafficLight(null, null, null);
        }
        else if (this.specialMode === 'EPIPHANY') {
            document.body.className = `bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 text-white ${baseClasses}`;
            this.log(">> PROTOCOLO: EPIFANÍA (Claridad).", 'success');
            this.log("   Todo conecta. La matriz es visible.", 'info');
            this.log("   1. CAPTURA: Escribe/Graba la idea INMEDIATAMENTE.", 'action');
            this.log("   2. MAPA: Haz un diagrama rápido de las conexiones.", 'action');
            this.log("   3. ACCIÓN: Define el primer paso real.", 'action');
            this.updateStatusDisplay("CLARIDAD", "ABSOLUTA", {});
            this.updateProtocolDisplay("EPIPHANY");
            this.updateTrafficLight(null, null, null);
        }
        else if (this.specialMode === 'VOID_MODE') {
            document.body.className = `bg-slate-950 text-slate-600 grayscale ${baseClasses}`;
            this.log(">> PROTOCOLO: DISOCIACIÓN (The Void).", 'error');
            this.log("   Conexión con el servidor perdida.", 'info');
            this.log("   1. ANCLAJE: Nombra 5 cosas que veas ahora mismo.", 'action');
            this.log("   2. TACTO: Toca algo frío o rugoso.", 'action');
            this.log("   3. ESPERA: No intentes 'volver' a la fuerza.", 'action');
            this.updateStatusDisplay("NULL", "NULL", {});
            this.updateProtocolDisplay("VOID_MODE");
            this.updateTrafficLight(null, null, null);
        }
        else if (this.specialMode === 'GHOST_MODE') {
            document.body.className = `bg-slate-900 text-slate-500 opacity-80 ${baseClasses}`;
            this.log(">> PROTOCOLO: MODO FANTASMA.", 'warning');
            this.log("   Reduciendo firma de calor social.", 'info');
            this.log("   1. INVISIBILIDAD: No respondas a nadie.", 'action');
            this.log("   2. OBSERVACIÓN: Mira sin interactuar.", 'action');
            this.log("   3. RECARGA: Estás aquí para observar, no para actuar.", 'action');
            this.updateStatusDisplay("OCULTO", "SIGILO", {});
            this.updateProtocolDisplay("GHOST_MODE");
            this.updateTrafficLight(null, null, null);
        }
        else if (this.specialMode === 'MELTDOWN') {
            document.body.className = `bg-red-950 text-red-200 animate-pulse ${baseClasses}`;
            this.log(">> PROTOCOLO: MELTDOWN NUCLEAR.", 'error');
            this.log("   ¡EVACUAR INMEDIATAMENTE!", 'error');
            this.log("   1. SALIDA: Vete al lugar seguro más cercano.", 'action');
            this.log("   2. COMUNICACIÓN: 'No puedo hablar ahora'.", 'action');
            this.log("   3. SEGURIDAD: No conduzcas ni operes maquinaria.", 'action');
            this.updateStatusDisplay("EXPLOSIÓN", "CRÍTICO", {});
            this.updateProtocolDisplay("MELTDOWN");
            this.updateTrafficLight(null, null, null);
        }
        else if (this.specialMode === 'ZOMBIE_MODE') {
            document.body.className = `bg-lime-950 text-lime-200 blur-[0.5px] ${baseClasses}`;
            this.log(">> PROTOCOLO: ZOMBIE MODE.", 'error');
            this.log("   Cerebro no encontrado. Buscando...", 'info');
            this.log("   1. AUTOMÁTICO: Haz tareas que no requieran pensar.", 'action');
            this.log("   2. COMIDA: Come algo, probablemente se te olvidó.", 'action');
            this.log("   3. DORMIR: Tu cerebro ya se apagó, apaga el cuerpo.", 'action');
            this.updateStatusDisplay("INFECTADO", "SIN SEÑAL", {});
            this.updateProtocolDisplay("ZOMBIE_MODE");
            this.updateTrafficLight(null, null, null);
        }
        else if (this.specialMode === 'DOOMSCROLLING') {
            document.body.className = `bg-black text-red-900 ${baseClasses}`;
            this.log(">> PROTOCOLO: DOOMSCROLLING.", 'error');
            this.log("   El abismo te devuelve la mirada.", 'info');
            this.log("   1. ROMPE EL BUCLE: Tira el teléfono al sofá (literal).", 'action');
            this.log("   2. CAMBIO FÍSICO: Levántate y camina a otra habitación.", 'action');
            this.log("   3. REALIDAD: Mira por la ventana o toca una planta.", 'action');
            this.updateStatusDisplay("ATRAPADO", "BUCLE", {});
            this.updateProtocolDisplay("DOOMSCROLLING");
            this.updateTrafficLight(null, null, null);
        }
        this.renderLogs();
    }

    calcularEstimulacion(stats) {
        if (stats.ansiedadSocial > 80) return NivelEstimulacion.SOBRE_ESTIMULADO;
        if (stats.cargaSensorial > 65) return NivelEstimulacion.SHUTDOWN;
        if (stats.ansiedadSocial > 50) return NivelEstimulacion.ALERTA_SENSORIAL;
        if (stats.cargaSensorial > 45) return NivelEstimulacion.ALERTA_SENSORIAL; // Nuevo estado intermedio
        if (stats.dopamina < 40 && stats.cargaSensorial < 30) return NivelEstimulacion.HIPO_ESTIMULADO;
        return NivelEstimulacion.OPTIMO_FLOW;
    }

    calcularEjecucion(stats) {
        if (stats.ansiedadSocial > 80) return EstadoEjecutivo.PARALISIS;
        if (stats.cucharas < 25) return EstadoEjecutivo.BURNOUT;
        if (stats.cucharas < 40) return EstadoEjecutivo.FATIGA; // Nuevo estado intermedio
        if (stats.ansiedadSocial > 50) return EstadoEjecutivo.DISPERSO;
        if (stats.dopamina < 40 && stats.cucharas >= 25) return EstadoEjecutivo.PARALISIS;
        if (stats.dopamina > 65) return EstadoEjecutivo.DISPERSO;
        return EstadoEjecutivo.OPERATIVO;
    }

    resolverConflicto(est, eje, stats) {
        this.log(`[STATUS] Estímulo: ${est} | Ejecutivo: ${eje}`, 'status');
        let activeProtocol = "SISTEMA NOMINAL";

        // --- PRIORIDAD 1: OVERRIDES CRÍTICOS ---

        // CASO 0: ANSIEDAD SOCIAL CRÍTICA (Override)
        if (stats.ansiedadSocial > 85) {
            this.log(">> PROTOCOLO: EVACUACIÓN SOCIAL.", 'error');
            this.log("   Niveles de ansiedad insostenibles.", 'info');
            this.log("   1. ESCAPE: Busca un baño, coche o salida de emergencia.", 'action');
            this.log("   2. RESPIRACIÓN: Inhala 4s, Retén 7s, Exhala 8s.", 'action');
            this.log("   3. SALIDA: 'Me siento mal' es una excusa válida.", 'action');
            this.log("   4. REFUGIO: Vete a casa y apaga el teléfono.", 'action');
            this.updateProtocolDisplay("EVACUACIÓN SOCIAL");
            return;
        }

        // --- PRIORIDAD 2: EDGE CASES (Combinaciones Específicas) ---
        // Estos deben ir ANTES de los casos generales para no ser ocultados

        // CASO 7: EL "WIRED BUT TIRED" (Alta Dopamina/Ansiedad + Baja Energía)
        // Modificado: Usamos stats directos porque 'eje' puede ser FATIGA/BURNOUT ocultando el estado 'wired'
        if ((stats.dopamina > 60 || stats.ansiedadSocial > 40) && stats.cucharas < 30) {
            activeProtocol = "ATERRIZAJE FORZOSO";
            this.log(">> PROTOCOLO: ATERRIZAJE FORZOSO.", 'warning');
            this.log("   Tu RAM está llena pero tu batería está muerta.", 'info');
            this.log("   1. BRAIN DUMP: Vuelca todo tu cerebro en papel/notas YA.", 'action');
            this.log("   2. INPUT PASIVO: Pon esa serie que has visto 10 veces.", 'action');
            this.log("   3. SENSORIAL: Luz cálida, pijama suave, peso encima.", 'action');
            this.log("   4. PROHIBIDO: Redes sociales o noticias.", 'action');
        }

        // CASO 5: HANGER (Hambre + Cucharas bajas)
        else if (stats.necesidadesBio > 70 && stats.cucharas < 30) {
            activeProtocol = "ALIMENTACIÓN EMERGENCIA";
            this.log(">> PROTOCOLO: ALIMENTACIÓN DE EMERGENCIA.", 'error');
            this.log("   Peligro de irritabilidad extrema.", 'info');
            this.log("   1. INGESTA INMEDIATA: Jugo, fruta, dulce (Glucosa rápida).", 'action');
            this.log("   2. AISLAMIENTO: No hables con nadie hasta comer.", 'action');
            this.log("   3. COMIDA REAL: Pide delivery si no puedes cocinar.", 'action');
            this.log("   4. ADVERTENCIA: Tus emociones actuales NO son reales.", 'action');
        }

        // CASO 5.5: URGENCIA BIOLÓGICA (Si no es Hanger)
        else if (stats.necesidadesBio > 80) {
            activeProtocol = "MANTENIMIENTO BIO";
            this.log(">> PROTOCOLO: URGENCIA BIOLÓGICA.", 'error');
            this.log("   Necesidades básicas en niveles críticos.", 'info');
            this.log("   1. Atender cuerpo inmediatamente (Baño/Agua/Comida).", 'action');
            this.log("   2. Pausar cualquier actividad mental.", 'action');
        }

        // CASO 0.5: ANSIEDAD SOCIAL MODERADA (Prioridad sobre Descongelamiento)
        else if (stats.ansiedadSocial > 50) {
            activeProtocol = "ESCUDO SOCIAL";
            this.log(">> PROTOCOLO: ESCUDO SOCIAL.", 'warning');
            this.log("   La batería social se está drenando rápido.", 'info');
            this.log("   1. RETIRADA TÁCTICA: Ve al baño o sal a tomar aire 5 min.", 'action');
            this.log("   2. MODO OBSERVADOR: Deja de hablar, solo asiente y sonríe.", 'action');
            this.log("   3. AUDÍFONOS: Si es posible, úsalos (aunque sea sin música).", 'action');
            this.log("   4. LÍMITES: 'Estoy un poco cansado, me iré temprano'.", 'action');
        }

        // CASO 3: WAITING MODE (Ansiedad leve + Parálisis)
        // Modificado: Chequeamos ansiedad y si el ejecutivo NO es operativo (Parálisis o Disperso)
        else if (stats.ansiedadSocial > 30 && eje !== EstadoEjecutivo.OPERATIVO) {
            activeProtocol = "DESCONGELAMIENTO";
            this.log(">> PROTOCOLO: DESCONGELAMIENTO (Waiting Mode).", 'warning');
            this.log("   Estás paralizado esperando un evento futuro.", 'info');
            this.log("   1. EXTERNALIZA EL TIEMPO: Pon una alarma 15 min antes.", 'action');
            this.log("   2. ROMPE LA ESPERA: Juega algo, lee, lava platos.", 'action');
            this.log("   3. PERMISO: Tienes permiso de hacer cosas mientras esperas.", 'action');
            this.log("   4. CHECK: Revisa la hora del evento una vez más.", 'action');
        }

        // CASO 3.5: MODO ARDILLA (Alta Dopamina + Energía Decente)
        // MOVIDO ANTES DE HIPERFOCO para priorizar la dispersión sobre el mantenimiento bio leve
        else if (eje === EstadoEjecutivo.DISPERSO) {
            activeProtocol = "SQUIRREL MODE";
            this.log(">> PROTOCOLO: ENFOQUE LÁSER (SQUIRREL MODE).", 'warning');
            this.log("   Tienes energía pero estás saltando de rama en rama.", 'info');
            this.log("   1. Cierra las 20 pestañas del navegador.", 'action');
            this.log("   2. Escribe UNA sola meta en un post-it.", 'action');
            this.log("   3. Usa Pomodoro estricto (25/5).", 'action');
            this.log("   4. PROHIBIDO iniciar proyectos nuevos.", 'action');
            this.log("   5. Si tienes una idea genial, anótala y SIGUE.", 'action');
            this.log("   6. Usa ruido marrón o música repetitiva.", 'action');
            
            if (stats.necesidadesBio > 50) {
                this.log("   ⚠️ ALERTA: Tu cuerpo necesita mantenimiento.", 'error');
                this.log("   -> Come/Bebe algo mientras trabajas.", 'action');
            }
        }

        // CASO 4: TRAMPA DE HIPERFOCO (Flow + Bio Needs)
        else if (est === NivelEstimulacion.OPTIMO_FLOW && stats.necesidadesBio > 60) {
            activeProtocol = "MANTENIMIENTO BIO";
            this.log(">> PROTOCOLO: MANTENIMIENTO BIOLÓGICO.", 'warning');
            this.log("   Estás en la zona, pero tu cuerpo está sufriendo.", 'info');
            this.log("   1. NO CORTES EL FLOW: Mantén la música/contexto.", 'action');
            this.log("   2. SUMINISTROS: Trae la botella de agua y snacks AQUÍ.", 'action');
            this.log("   3. MICRO-PAUSA: Estira el cuello y espalda 30s.", 'action');
            this.log("   4. BAÑO: Si tienes que ir, CORRE y vuelve.", 'action');
        }

        // CASO 6: RESACA SENSORIAL (Cucharas bajas + Baja carga)
        else if (stats.cucharas < 20 && stats.cargaSensorial < 30) {
            activeProtocol = "MODO RECUPERACIÓN";
            this.log(">> PROTOCOLO: MODO RECUPERACIÓN.", 'status');
            this.log("   El sistema se está reiniciando.", 'info');
            this.log("   1. HORIZONTALIDAD: Cama o sofá YA.", 'action');
            this.log("   2. HIDRATACIÓN: Bebe un vaso de agua entero.", 'action');
            this.log("   3. CONFORT: Manta pesada, peluche, ropa suave.", 'action');
            this.log("   4. PASIVO: ASMR, Lofi, o silencio total.", 'action');
        }

        // --- PRIORIDAD 3: CASOS GENERALES (Single Variable) ---

        // CASO 1: MELTDOWN INMINENTE
        else if (est === NivelEstimulacion.SOBRE_ESTIMULADO || est === NivelEstimulacion.SHUTDOWN) {
            activeProtocol = "BUNKER MODE";
            this.log(">> PROTOCOLO: BUNKER MODE (Emergencia).", 'error');
            this.log("   1. ABORTAR MISIÓN: Sal de donde estés o enciérrate.", 'action');
            this.log("   2. BLACKOUT SENSORIAL: Oscuridad, silencio, antifaz.", 'action');
            this.log("   3. PRESIÓN PROFUNDA: Manta pesada o aprieta una almohada.", 'action');
            this.log("   4. STIMMING: Balanceo, aleteo, lo que el cuerpo pida.", 'action');
            this.log("   5. NO HABLAR: Comunícate por texto o señas.", 'action');
        }
        // CASO 1.5: ALERTA SENSORIAL
        else if (est === NivelEstimulacion.ALERTA_SENSORIAL) {
            activeProtocol = "REDUCCIÓN DE RUIDO";
            this.log(">> PROTOCOLO: REDUCCIÓN DE RUIDO.", 'warning');
            this.log("   El entorno se está poniendo hostil.", 'info');
            this.log("   1. AUDÍFONOS ON: Noise Cancelling o Ruido Marrón.", 'action');
            this.log("   2. VISUAL: Baja el brillo, usa modo oscuro o lentes de sol.", 'action');
            this.log("   3. ROPA: ¿Algo te aprieta o pica? Arréglalo.", 'action');
        }
        // CASO 2: PARÁLISIS POR TDAH
        else if (est === NivelEstimulacion.HIPO_ESTIMULADO || eje === EstadoEjecutivo.PARALISIS) {
            activeProtocol = "JUMPSTART";
            this.log(">> PROTOCOLO: JUMPSTART (Dopamina Kick).", 'warning');
            this.log("   El cerebro necesita dopamina 'barata' para arrancar.", 'info');
            this.log("   1. MÚSICA ÉPICA: Pon tu canción favorita A TOPE.", 'action');
            this.log("   2. MOVIMIENTO: Salta, baila o haz 10 sentadillas.", 'action');
            this.log("   3. NOVEDAD: Cambia de lugar o de silla.", 'action');
            this.log("   4. GAMIFICACIÓN: 'Si hago esto en 5 min, gano un dulce'.", 'action');
        }
        // CASO 2.5: FATIGA
        else if (eje === EstadoEjecutivo.FATIGA || eje === EstadoEjecutivo.BURNOUT) {
            activeProtocol = "CONSERVACIÓN DE ENERGÍA";
            this.log(">> PROTOCOLO: CONSERVACIÓN DE ENERGÍA.", 'warning');
            this.log("   Batería baja. Entrando en modo ahorro.", 'info');
            this.log("   1. MODO AVIÓN SOCIAL: No contestes mensajes hoy.", 'action');
            this.log("   2. LEY DEL MÍNIMO ESFUERZO: Haz solo lo vital.", 'action');
            this.log("   3. ALIMENTACIÓN FÁCIL: Sándwich, cereal o delivery.", 'action');
            this.log("   4. CULPA CERO: Descansar es productivo.", 'action');
        }
        
        // CASO 0.5: ANSIEDAD SOCIAL MODERADA (Fallback Warning)
        // Eliminado de aquí porque ya se maneja con mayor prioridad arriba
        /*
        else if (stats.ansiedadSocial > 50) {
            activeProtocol = "ESCUDO SOCIAL";
            this.log(">> PROTOCOLO: ESCUDO SOCIAL.", 'warning');
            this.log("   La batería social se está drenando rápido.", 'info');
            this.log("   1. Toma un 'break' de 5 minutos (baño/aire).", 'action');
            this.log("   2. Evita conversaciones profundas.", 'action');
            this.log("   3. Ponte en modo 'observador'.", 'action');
        }
        */

        // CASO 4: ZONA DE FLOW (Default)
        else {
            if (activeEmotion && emotions[activeEmotion]) {
                const emo = emotions[activeEmotion];
                this.log(`>> ESTADO EMOCIONAL: ${emo.name.toUpperCase()}`, 'info');
                this.log(`   ℹ️ ¿Qué hago si veo esto?`, 'info');
                this.log(`   ${emo.advice}`, 'action');
                activeProtocol = "PROCESANDO EMOCIÓN";
            } else {
                this.log(">> SISTEMA NOMINAL: GOD MODE.", 'success');
                this.log("   Estás en la zona. Aprovecha para codear.", 'info');
                this.log("   Recordatorio: Pon una alarma para tomar agua.", 'action');
            }
        }

        this.updateProtocolDisplay(activeProtocol);
        this.updateSound(est, eje, stats);
    }

    updateSound(est, eje, stats) {
        // Initialize on first run if needed (handled by user interaction usually)
        this.sound.init();

        if (this.specialMode) {
            this.sound.setMode(this.specialMode);
            return;
        }

        // Normal Logic
        if (est === NivelEstimulacion.SHUTDOWN || 
            eje === EstadoEjecutivo.BURNOUT || 
            stats.necesidadesBio > 80 ||
            stats.ansiedadSocial > 80) {
            
            this.sound.setMode('CRITICAL');
        } else {
            this.sound.stopAll();
        }
    }

    updateProtocolDisplay(protocol) {
        const el = document.getElementById('protocol-text');
        if(el) el.textContent = protocol;

        // Update Modal Data
        const guide = protocolGuides[protocol] || protocolGuides["SISTEMA NOMINAL"];
        const modalTitle = document.getElementById('modal-protocol-name');
        const modalDesc = document.getElementById('modal-description');
        const modalTips = document.getElementById('modal-tips');
        const modalSelfHelp = document.getElementById('modal-self-help');
        const modalIcon = document.getElementById('modal-icon');

        if(modalTitle) {
            modalTitle.textContent = protocol;
            modalTitle.className = `text-lg font-bold ${protocol === "SISTEMA NOMINAL" ? "text-green-400" : "text-yellow-400"}`;
        }
        if(modalDesc) modalDesc.textContent = guide.desc;
        if(modalIcon) modalIcon.textContent = guide.icon;
        
        if(modalTips) {
            modalTips.innerHTML = '';
            guide.tips.forEach(tip => {
                const li = document.createElement('li');
                li.textContent = tip;
                modalTips.appendChild(li);
            });
        }

        if(modalSelfHelp) {
            modalSelfHelp.innerHTML = '';
            if (guide.selfHelp) {
                guide.selfHelp.forEach(tip => {
                    const li = document.createElement('li');
                    li.textContent = tip;
                    modalSelfHelp.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = "Sigue tu intuición.";
                modalSelfHelp.appendChild(li);
            }
        }
    }

    updateStatusDisplay(est, eje, stats) {
        const elEst = document.getElementById('estado-estimulacion');
        const elEje = document.getElementById('estado-ejecutivo');

        elEst.textContent = est;
        elEje.textContent = eje;

        // Color coding simple
        elEst.className = `text-base md:text-lg font-bold break-words ${this.getColorForState(est)}`;
        elEje.className = `text-base md:text-lg font-bold break-words ${this.getColorForState(eje)}`;

        this.updateTrafficLight(est, eje, stats);
        this.updateTheme();
    }

    updateTheme() {
        this.renderEffects();

        const cards = document.querySelectorAll('.kernel-card');
        
        cards.forEach(card => {
            // Initialize original bg if not set
            if (!card.dataset.originalBg) {
                if (card.classList.contains('bg-slate-800')) card.dataset.originalBg = 'bg-slate-800';
                else if (card.classList.contains('bg-black')) card.dataset.originalBg = 'bg-black';
                else card.dataset.originalBg = 'bg-slate-800';
            }

            // RESET TO DEFAULT
            // Remove special backgrounds and effects
            card.classList.remove('bg-slate-900/60', 'bg-red-950/90', 'bg-lime-950/90', 'bg-slate-950', 'backdrop-blur-md');
            
            // Remove special borders
            card.classList.remove('border-yellow-400/50', 'border-purple-500/50', 'border-cyan-500/50', 'border-orange-500/50', 'border-white/50', 'border-red-500', 'border-lime-700', 'border-slate-800');
            
            // Restore original BG
            if (!card.classList.contains(card.dataset.originalBg)) {
                card.classList.add(card.dataset.originalBg);
            }
            
            // Restore original Border
            if (!card.classList.contains('border-slate-700')) {
                card.classList.add('border-slate-700');
            }
        });

        if (!this.specialMode) return;

        // Helper to apply theme
        const apply = (bgClass, borderClass) => {
            cards.forEach(card => {
                card.classList.remove(card.dataset.originalBg);
                card.classList.remove('border-slate-700');
                
                card.classList.add(...bgClass.split(' '));
                card.classList.add(borderClass);
                
                if (bgClass.includes('/')) {
                    card.classList.add('backdrop-blur-md');
                }
            });
        };

        switch (this.specialMode) {
            case 'GOD_MODE':
                apply('bg-slate-900/60', 'border-yellow-400/50');
                break;
            case 'MAGIC_HOUR':
                apply('bg-slate-900/60', 'border-purple-500/50');
                break;
            case 'WIKI_HOLE':
                apply('bg-slate-900/60', 'border-cyan-500/50');
                break;
            case 'JUSTICE_MODE':
                apply('bg-slate-900/60', 'border-orange-500/50');
                break;
            case 'EPIPHANY':
                apply('bg-slate-900/60', 'border-white/50');
                break;
            case 'MELTDOWN':
                apply('bg-red-950/90', 'border-red-500');
                break;
            case 'ZOMBIE_MODE':
                apply('bg-lime-950/90', 'border-lime-700');
                break;
            case 'DOOMSCROLLING':
                apply('bg-black', 'border-slate-800');
                break;
            case 'VOID_MODE':
                apply('bg-slate-950', 'border-slate-800');
                break;
        }
    }

    renderEffects() {
        const overlay = document.getElementById('visual-effects-overlay');
        if (!overlay) return;

        // Clear previous effects
        // Restore canvas structure if it was wiped
        if (!overlay.querySelector('canvas')) {
            overlay.innerHTML = '<canvas id="effect-canvas"></canvas>';
        } else {
            // Remove other children but keep canvas
            Array.from(overlay.children).forEach(child => {
                if (child.tagName !== 'CANVAS') child.remove();
            });
        }
        
        const canvas = document.getElementById('effect-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        overlay.className = 'fixed inset-0 pointer-events-none z-40 overflow-hidden hidden';
        document.body.classList.remove('shake-screen');
        
        if (this.effectsInterval) {
            clearInterval(this.effectsInterval);
            this.effectsInterval = null;
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        if (!this.specialMode) return;

        overlay.classList.remove('hidden');

        if (this.specialMode === 'GOD_MODE') {
            // Dreamcatcher / Divine Particles
            this.effectsInterval = setInterval(() => {
                const p = document.createElement('div');
                const symbols = ['✨', '⚡️', '🧿', '🪶', '🕸️', '💠'];
                p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                p.className = 'effect-particle text-2xl absolute opacity-0';
                p.style.left = Math.random() * 100 + 'vw';
                p.style.animation = `floatUp ${3 + Math.random() * 2}s linear forwards`;
                p.style.color = Math.random() > 0.5 ? '#facc15' : '#ffffff'; // Yellow or White
                p.style.textShadow = '0 0 15px rgba(250,204,21,0.8)';
                overlay.appendChild(p);

                // Cleanup particle
                setTimeout(() => p.remove(), 5000);
            }, 200);
        }
        else if (this.specialMode === 'MELTDOWN') {
            // Chaos
            overlay.classList.add('flash-screen');
            document.body.classList.add('shake-screen');

            this.effectsInterval = setInterval(() => {
                // Random Warning Text
                const w = document.createElement('div');
                const warnings = ['⚠️ ERROR', 'CRITICAL', 'FAIL', '🔥', '☢️', 'MELTDOWN', 'SYSTEM HALT'];
                w.textContent = warnings[Math.floor(Math.random() * warnings.length)];
                w.className = 'effect-particle font-black text-red-500 absolute';
                w.style.fontSize = (20 + Math.random() * 60) + 'px';
                w.style.left = Math.random() * 90 + 'vw';
                w.style.top = Math.random() * 90 + 'vh';
                w.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
                w.style.opacity = '0.8';
                w.style.textShadow = '0 0 10px red';
                overlay.appendChild(w);

                // Explosion
                const exp = document.createElement('div');
                exp.textContent = '💥';
                exp.className = 'effect-particle text-6xl absolute';
                exp.style.left = Math.random() * 90 + 'vw';
                exp.style.top = Math.random() * 90 + 'vh';
                exp.style.animation = 'explode 0.5s ease-out forwards';
                overlay.appendChild(exp);

                setTimeout(() => { w.remove(); exp.remove(); }, 800);
            }, 150);
        }
        else if (this.specialMode === 'VOID_MODE') {
            // Create Static Layer
            const staticLayer = document.createElement('div');
            staticLayer.className = "absolute inset-0 tv-static";
            overlay.appendChild(staticLayer);

            // Create CRT Layer
            const crtLayer = document.createElement('div');
            crtLayer.className = "absolute inset-0 crt-overlay";
            overlay.appendChild(crtLayer);

            // Text
            const txt = document.createElement('div');
            txt.className = "absolute inset-0 flex items-center justify-center text-4xl font-mono font-bold text-slate-500 opacity-50 tracking-widest";
            txt.innerText = "NO SIGNAL";
            overlay.appendChild(txt);
        }
        else if (this.specialMode === 'WIKI_HOLE') {
            this.startMatrixRain(canvas, '#06b6d4'); // Cyan
        }
        else if (this.specialMode === 'ZOMBIE_MODE') {
            this.startFog(canvas, '#3f6212'); // Lime/Green
        }
        else if (this.specialMode === 'DOOMSCROLLING') {
            const v = document.createElement('div');
            v.className = "absolute inset-0 doom-vignette";
            overlay.appendChild(v);
        }
        else if (this.specialMode === 'EPIPHANY') {
            const glow = document.createElement('div');
            glow.className = "absolute inset-0 epiphany-glow";
            overlay.appendChild(glow);
            this.startLightRays(canvas);
        }
        else if (this.specialMode === 'MAGIC_HOUR') {
            this.startFireflies(canvas);
        }
        else if (this.specialMode === 'JUSTICE_MODE') {
            this.startEmbers(canvas);
        }
        else if (this.specialMode === 'GHOST_MODE') {
            this.startMist(canvas);
        }
    }

    startLightRays(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let angle = 0;
        
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            
            // Draw rays
            const gradient = ctx.createRadialGradient(0, 0, 50, 0, 0, Math.max(canvas.width, canvas.height));
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            
            for(let i=0; i<8; i++) {
                ctx.rotate(Math.PI / 4);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(100, -1000); // Wide ray
                ctx.lineTo(-100, -1000);
                ctx.closePath();
                ctx.fill();
            }
            
            ctx.restore();
            angle += 0.002;
            this.animationFrame = requestAnimationFrame(draw);
        };
        draw();
    }

    startFireflies(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        for(let i=0; i<30; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random(),
                fadeSpeed: 0.01 + Math.random() * 0.02
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.opacity += p.fadeSpeed;
                if (p.opacity > 1 || p.opacity < 0) p.fadeSpeed *= -1;
                
                p.x += p.speedX;
                p.y += p.speedY;
                
                // Wrap around
                if(p.x < 0) p.x = canvas.width;
                if(p.x > canvas.width) p.x = 0;
                if(p.y < 0) p.y = canvas.height;
                if(p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(168, 85, 247, ${Math.abs(p.opacity)})`; // Purple
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#a855f7';
                ctx.fill();
            });
            
            this.animationFrame = requestAnimationFrame(draw);
        };
        draw();
    }

    startEmbers(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const createParticle = () => ({
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            size: Math.random() * 4 + 1,
            speedY: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 2,
            life: 1
        });

        for(let i=0; i<50; i++) particles.push(createParticle());

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((p, i) => {
                p.y -= p.speedY;
                p.x += p.speedX;
                p.life -= 0.01;
                
                if (p.life <= 0) particles[i] = createParticle();

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(234, 88, 12, ${p.life})`; // Orange
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ea580c';
                ctx.fill();
            });
            
            this.animationFrame = requestAnimationFrame(draw);
        };
        draw();
    }

    startMist(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        for(let i=0; i<20; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 100 + 50,
                dx: (Math.random() - 0.5) * 0.2,
                dy: (Math.random() - 0.5) * 0.2
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                ctx.beginPath();
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
                g.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
                g.addColorStop(1, 'transparent');
                ctx.fillStyle = g;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                
                p.x += p.dx;
                p.y += p.dy;
                
                if(p.x < -100) p.x = canvas.width + 100;
                if(p.x > canvas.width + 100) p.x = -100;
                if(p.y < -100) p.y = canvas.height + 100;
                if(p.y > canvas.height + 100) p.y = -100;
            });
            
            this.animationFrame = requestAnimationFrame(draw);
        };
        draw();
    }

    startMatrixRain(canvas, color) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        const draw = () => {
            // Use destination-out to fade existing pixels to transparent
            // This prevents the black background accumulation
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Fade speed
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
            
            ctx.fillStyle = color;
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(0x30A0 + Math.random() * 96);
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            this.animationFrame = requestAnimationFrame(draw);
        };
        draw();
    }

    startFog(canvas, color) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        for(let i=0; i<50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 50 + 20,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                ctx.beginPath();
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
                g.addColorStop(0, color + '40'); // Transparent hex
                g.addColorStop(1, 'transparent');
                ctx.fillStyle = g;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                
                p.x += p.dx;
                p.y += p.dy;
                
                if(p.x < -50) p.x = canvas.width + 50;
                if(p.x > canvas.width + 50) p.x = -50;
                if(p.y < -50) p.y = canvas.height + 50;
                if(p.y > canvas.height + 50) p.y = -50;
            });
            
            this.animationFrame = requestAnimationFrame(draw);
        };
        draw();
    }

    updateTrafficLight(est, eje, stats) {
        const red = document.getElementById('light-red');
        const yellow = document.getElementById('light-yellow');
        const green = document.getElementById('light-green');
        const text = document.getElementById('status-text');
        
        // Reset base classes
        const baseClass = "w-12 h-12 rounded-full transition-all duration-500 opacity-30 scale-90";
        red.className = `${baseClass} bg-red-900`;
        yellow.className = `${baseClass} bg-yellow-900`;
        green.className = `${baseClass} bg-green-900`;

        // --- EASTER EGG OVERRIDES ---
        if (this.specialMode === 'GOD_MODE') {
            // Triple Gold + Divine Glow + Pulse
            const godClass = "w-12 h-12 rounded-full bg-yellow-300 transition-all duration-300 shadow-[0_0_60px_rgba(253,224,71,1)] opacity-100 scale-125 border-4 border-white animate-pulse";
            red.className = godClass;
            yellow.className = godClass;
            green.className = godClass;
            text.className = "mt-4 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(250,204,21,1)] animate-pulse";
            text.textContent = "⚡️ ABSOLUTE FLOW ⚡️";
            return;
        }

        if (this.specialMode === 'MAGIC_HOUR') {
            // Triple Purple + Mystic Glow
            const magicClass = "w-12 h-12 rounded-full bg-purple-500 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.8)] opacity-100 scale-110 border-2 border-purple-300";
            red.className = magicClass;
            yellow.className = magicClass;
            green.className = magicClass;
            text.className = "mt-4 text-lg font-bold text-purple-400 tracking-widest";
            text.textContent = "🦉 3:00 AM POWER 🦉";
            return;
        }

        if (this.specialMode === 'WIKI_HOLE') {
            // Triple Cyan + Data Glow
            const wikiClass = "w-12 h-12 rounded-full bg-cyan-500 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.8)] opacity-100 scale-110 border-2 border-cyan-300";
            red.className = wikiClass;
            yellow.className = wikiClass;
            green.className = wikiClass;
            text.className = "mt-4 text-lg font-bold text-cyan-400 tracking-widest";
            text.textContent = "🌀 DATA STREAM 🌀";
            return;
        }

        if (this.specialMode === 'JUSTICE_MODE') {
            // Triple Orange + Fire Glow
            const justiceClass = "w-12 h-12 rounded-full bg-orange-600 transition-all duration-300 shadow-[0_0_30px_rgba(234,88,12,0.8)] opacity-100 scale-110 border-2 border-orange-400";
            red.className = justiceClass;
            yellow.className = justiceClass;
            green.className = justiceClass;
            text.className = "mt-4 text-lg font-bold text-orange-500 tracking-widest";
            text.textContent = "⚖️ FURIA ACTIVA ⚖️";
            return;
        }

        if (this.specialMode === 'EPIPHANY') {
            // Triple White + Clean Glow
            const epiClass = "w-12 h-12 rounded-full bg-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.8)] opacity-100 scale-110 border-2 border-slate-300";
            red.className = epiClass;
            yellow.className = epiClass;
            green.className = epiClass;
            text.className = "mt-4 text-lg font-bold text-white tracking-widest";
            text.textContent = "🧩 CLARIDAD TOTAL 🧩";
            return;
        }

        if (this.specialMode === 'VOID_MODE') {
            // Triple Gray + No Glow (Dead)
            const voidClass = "w-12 h-12 rounded-full bg-slate-600 transition-all duration-300 opacity-50 scale-90 grayscale";
            red.className = voidClass;
            yellow.className = voidClass;
            green.className = voidClass;
            text.className = "mt-4 text-lg font-bold text-slate-500 tracking-widest blur-[1px]";
            text.textContent = "😶 S E Ñ A L   P E R D I D A 😶";
            return;
        }

        if (this.specialMode === 'GHOST_MODE') {
            // Transparent + Outline
            const ghostClass = "w-12 h-12 rounded-full border-2 border-slate-500 bg-transparent transition-all duration-300 opacity-30 scale-95";
            red.className = ghostClass;
            yellow.className = ghostClass;
            green.className = ghostClass;
            text.className = "mt-4 text-lg font-bold text-slate-600 tracking-widest opacity-50";
            text.textContent = "👻 INVISIBLE 👻";
            return;
        }

        if (this.specialMode === 'MELTDOWN') {
            // Red Flash
            const meltClass = "w-12 h-12 rounded-full bg-red-600 transition-all duration-100 shadow-[0_0_50px_rgba(220,38,38,1)] opacity-100 scale-125 animate-pulse";
            red.className = meltClass;
            yellow.className = meltClass;
            green.className = meltClass;
            text.className = "mt-4 text-xl font-black text-red-500 tracking-widest animate-bounce";
            text.textContent = "⚠️ CRITICAL FAILURE ⚠️";
            return;
        }

        if (this.specialMode === 'ZOMBIE_MODE') {
            // Sick Green
            const zombieClass = "w-12 h-12 rounded-full bg-lime-900 transition-all duration-1000 shadow-[0_0_20px_rgba(101,163,13,0.5)] opacity-80 scale-100 blur-[1px]";
            red.className = zombieClass;
            yellow.className = zombieClass;
            green.className = zombieClass;
            text.className = "mt-4 text-lg font-bold text-lime-700 tracking-widest blur-[1px]";
            text.textContent = "🧟 BRAINS... 🧟";
            return;
        }

        if (this.specialMode === 'DOOMSCROLLING') {
            // Black Hole
            const doomClass = "w-12 h-12 rounded-full bg-black border border-red-900 transition-all duration-300 shadow-inner opacity-100 scale-90";
            red.className = doomClass;
            yellow.className = doomClass;
            green.className = doomClass;
            text.className = "mt-4 text-lg font-bold text-red-900 tracking-widest";
            text.textContent = "🕸️ NO ESCAPE 🕸️";
            return;
        }

        // --- EMOTION TRAFFIC LIGHT OVERRIDE (Non-Special Modes) ---
        if (activeEmotion && !this.specialMode) {
             // Specific Overrides
             if (activeEmotion === 'disgust') {
                 yellow.className = "w-12 h-12 rounded-full bg-yellow-500 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.8)] opacity-100 scale-110 border-2 border-green-600";
                 text.textContent = "🤢 RECHAZO SENSORIAL 🤢";
                 text.className = "mt-4 text-lg font-bold text-green-500 tracking-widest";
                 return;
             }
             if (activeEmotion === 'masking') {
                 yellow.className = "w-12 h-12 rounded-full bg-slate-400 transition-all duration-300 shadow-[0_0_20px_rgba(148,163,184,0.8)] opacity-100 scale-100 border-2 border-slate-300";
                 text.textContent = "🎭 MASKING ACTIVO 🎭";
                 text.className = "mt-4 text-lg font-bold text-slate-400 tracking-widest";
                 return;
             }
             if (activeEmotion === 'stimming') {
                 green.className = "w-12 h-12 rounded-full bg-lime-500 transition-all duration-300 shadow-[0_0_20px_rgba(132,204,22,0.8)] opacity-100 scale-110 border-2 border-lime-300";
                 text.textContent = "🌀 REGULANDO... 🌀";
                 text.className = "mt-4 text-lg font-bold text-lime-400 tracking-widest";
                 return;
             }

             // Generic Fallback for any other emotion
             const emo = emotions[activeEmotion];
             if (emo) {
                 let colorClass = "bg-slate-500";
                 let borderColor = "border-slate-400";
                 let shadowColor = "rgba(100,116,139,0.8)";
                 
                 if (emo.active.includes("bg-yellow")) { colorClass = "bg-yellow-500"; borderColor = "border-yellow-300"; shadowColor = "rgba(234,179,8,0.8)"; }
                 else if (emo.active.includes("bg-blue")) { colorClass = "bg-blue-500"; borderColor = "border-blue-300"; shadowColor = "rgba(59,130,246,0.8)"; }
                 else if (emo.active.includes("bg-red")) { colorClass = "bg-red-600"; borderColor = "border-red-400"; shadowColor = "rgba(220,38,38,0.8)"; }
                 else if (emo.active.includes("bg-purple")) { colorClass = "bg-purple-600"; borderColor = "border-purple-400"; shadowColor = "rgba(147,51,234,0.8)"; }
                 else if (emo.active.includes("bg-green")) { colorClass = "bg-green-600"; borderColor = "border-green-400"; shadowColor = "rgba(22,163,74,0.8)"; }
                 else if (emo.active.includes("bg-orange")) { colorClass = "bg-orange-500"; borderColor = "border-orange-300"; shadowColor = "rgba(249,115,22,0.8)"; }
                 else if (emo.active.includes("bg-sky")) { colorClass = "bg-sky-500"; borderColor = "border-sky-300"; shadowColor = "rgba(14,165,233,0.8)"; }
                 else if (emo.active.includes("bg-indigo")) { colorClass = "bg-indigo-600"; borderColor = "border-indigo-400"; shadowColor = "rgba(79,70,229,0.8)"; }
                 else if (emo.active.includes("bg-pink")) { colorClass = "bg-pink-500"; borderColor = "border-pink-300"; shadowColor = "rgba(236,72,153,0.8)"; }
                 else if (emo.active.includes("bg-amber")) { colorClass = "bg-amber-500"; borderColor = "border-amber-300"; shadowColor = "rgba(245,158,11,0.8)"; }
                 else if (emo.active.includes("bg-cyan")) { colorClass = "bg-cyan-500"; borderColor = "border-cyan-300"; shadowColor = "rgba(6,182,212,0.8)"; }
                 else if (emo.active.includes("bg-slate")) { colorClass = "bg-slate-500"; borderColor = "border-slate-300"; shadowColor = "rgba(100,116,139,0.8)"; }
                 else if (emo.active.includes("bg-stone")) { colorClass = "bg-stone-500"; borderColor = "border-stone-300"; shadowColor = "rgba(120,113,108,0.8)"; }
                 else if (emo.active.includes("bg-lime")) { colorClass = "bg-lime-500"; borderColor = "border-lime-300"; shadowColor = "rgba(132,204,22,0.8)"; }
                 else if (emo.active.includes("bg-rose")) { colorClass = "bg-rose-600"; borderColor = "border-rose-400"; shadowColor = "rgba(225,29,72,0.8)"; }
                 else if (emo.active.includes("bg-violet")) { colorClass = "bg-violet-600"; borderColor = "border-violet-400"; shadowColor = "rgba(124,58,237,0.8)"; }

                 const genericClass = `w-12 h-12 rounded-full ${colorClass} transition-all duration-300 shadow-[0_0_20px_${shadowColor}] opacity-100 scale-110 border-2 ${borderColor}`;
                 
                 red.className = genericClass;
                 yellow.className = genericClass;
                 green.className = genericClass;
                 
                 text.textContent = `${emo.label} ${emo.name.toUpperCase()} ${emo.label}`;
                 const textColor = colorClass.replace('bg-', 'text-');
                 text.className = `mt-4 text-lg font-bold ${textColor} tracking-widest`;
                 return;
             }
        }

        // --- STANDARD LOGIC ---
        let statusMsg = "SISTEMA ESTABLE";
        
        // RED CONDITIONS
        if (est === NivelEstimulacion.SHUTDOWN || 
            eje === EstadoEjecutivo.BURNOUT || 
            stats.necesidadesBio > 80 ||
            stats.ansiedadSocial > 80) {
            
            red.className = "w-12 h-12 rounded-full bg-red-500 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.8)] opacity-100 scale-110";
            text.className = "mt-4 text-lg font-bold text-red-500";
            statusMsg = "SISTEMA CRÍTICO";
        } 
        // YELLOW CONDITIONS
        else if (est === NivelEstimulacion.SOBRE_ESTIMULADO || 
                 est === NivelEstimulacion.HIPO_ESTIMULADO ||
                 eje === EstadoEjecutivo.PARALISIS ||
                 eje === EstadoEjecutivo.DISPERSO ||
                 eje === EstadoEjecutivo.FATIGA ||
                 stats.ansiedadSocial > 50) {
            
            yellow.className = "w-12 h-12 rounded-full bg-yellow-400 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.8)] opacity-100 scale-110";
            text.className = "mt-4 text-lg font-bold text-yellow-400";
            statusMsg = "PRECAUCIÓN";
        } 
        // GREEN CONDITIONS
        else {
            green.className = "w-12 h-12 rounded-full bg-green-500 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.8)] opacity-100 scale-110";
            text.className = "mt-4 text-lg font-bold text-green-500";
            statusMsg = "OPTIMAL";
        }
        
        text.textContent = statusMsg;
    }    getColorForState(state) {
        const colors = {
            'HIPO': 'text-blue-400',
            'FLOW': 'text-emerald-400',
            'OVER': 'text-orange-400',
            'CRASH': 'text-red-500',
            'NOISE': 'text-yellow-400', // Nuevo
            'ONLINE': 'text-emerald-400',
            'FROZEN': 'text-blue-400',
            'SQUIRREL': 'text-yellow-400',
            'OFFLINE': 'text-red-500',
            'TIRED': 'text-yellow-400', // Nuevo
            'CRITICAL': 'text-red-600',
            'BIO_HAZARD': 'text-red-600'
        };
        return colors[state] || 'text-white';
    }

    renderLogs() {
        const consoleEl = document.getElementById('console-output');
        consoleEl.innerHTML = '';

        this.logs.forEach(log => {
            const p = document.createElement('p');
            let classes = "mb-1 ";
            
            switch(log.type) {
                case 'error': classes += "text-red-400 font-bold"; break;
                case 'warning': classes += "text-yellow-400 font-bold"; break;
                case 'success': classes += "text-emerald-400 font-bold"; break;
                case 'action': classes += "text-slate-300 pl-4"; break;
                case 'status': classes += "text-blue-300 border-b border-slate-800 pb-1 mb-2"; break;
                case 'system': classes += "text-slate-500 text-xs"; break;
                default: classes += "text-slate-400";
            }
            
            p.className = classes;
            p.textContent = log.message;
            consoleEl.appendChild(p);
        });
        
        // Auto scroll
        consoleEl.parentElement.scrollTop = consoleEl.parentElement.scrollHeight;
    }
}

// 3. INICIALIZACIÓN Y EVENTOS
const kernel = new BrainKernel();

const inputs = ['dopamina', 'cucharas', 'cargaSensorial', 'necesidadesBio', 'ansiedadSocial'];

function updateSimulation() {
    // Reset special mode on manual input
    kernel.specialMode = null;
    kernel.manualOverride = false;

    const stats = {};
    inputs.forEach(id => {
        const val = parseInt(document.getElementById(id).value);
        stats[id] = val;
        // Update label value
        document.getElementById(`val-${id}`).textContent = val;
    });

    kernel.diagnosticarSistema(stats);
}

// Add listeners
inputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateSimulation);
});

// --- MODAL LOGIC ---
const modal = document.getElementById('modal-info');
const btnOpen = document.getElementById('btn-info-terceros');
const btnClose = document.getElementById('btn-close-modal');
const btnCloseAction = document.getElementById('btn-close-modal-action');

function openModal() {
    if(modal) {
        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            const content = document.getElementById('modal-content');
            if(content) content.classList.remove('scale-95');
        }, 10);
    }
}

function closeModal() {
    if(modal) {
        modal.classList.add('opacity-0');
        const content = document.getElementById('modal-content');
        if(content) content.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

if(btnOpen) btnOpen.addEventListener('click', openModal);
if(btnClose) btnClose.addEventListener('click', closeModal);
if(btnCloseAction) btnCloseAction.addEventListener('click', closeModal);

// Close on click outside
if(modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// --- PRESETS SYSTEM ---
const presets = {
    "🟢 Nominal (Reset)": { dopamina: 50, cucharas: 80, cargaSensorial: 20, necesidadesBio: 20, ansiedadSocial: 10 },
    "🔴 Ansiedad Crítica": { dopamina: 50, cucharas: 50, cargaSensorial: 50, necesidadesBio: 50, ansiedadSocial: 90 },
    "🟡 Ansiedad Moderada": { dopamina: 50, cucharas: 50, cargaSensorial: 50, necesidadesBio: 50, ansiedadSocial: 60 },
    "🔴 Shutdown": { dopamina: 20, cucharas: 10, cargaSensorial: 90, necesidadesBio: 50, ansiedadSocial: 20 },
    "🟡 Alerta Sensorial": { dopamina: 50, cucharas: 50, cargaSensorial: 60, necesidadesBio: 20, ansiedadSocial: 20 },
    "❄️ Parálisis TDAH": { dopamina: 10, cucharas: 50, cargaSensorial: 20, necesidadesBio: 20, ansiedadSocial: 20 },
    "🔋 Fatiga": { dopamina: 50, cucharas: 30, cargaSensorial: 20, necesidadesBio: 20, ansiedadSocial: 20 },
    "⚡ Wired but Tired": { dopamina: 80, cucharas: 20, cargaSensorial: 50, necesidadesBio: 20, ansiedadSocial: 20 },
    "🐿️ Modo Ardilla": { dopamina: 90, cucharas: 80, cargaSensorial: 40, necesidadesBio: 20, ansiedadSocial: 10 },
    "⏳ Waiting Mode": { dopamina: 30, cucharas: 50, cargaSensorial: 20, necesidadesBio: 20, ansiedadSocial: 40 },
    "🚽 Trampa Hiperfoco": { dopamina: 50, cucharas: 60, cargaSensorial: 40, necesidadesBio: 70, ansiedadSocial: 10 },
    "🍔 Hanger": { dopamina: 30, cucharas: 20, cargaSensorial: 40, necesidadesBio: 85, ansiedadSocial: 20 },
    "🛌 Resaca Sensorial": { dopamina: 20, cucharas: 10, cargaSensorial: 10, necesidadesBio: 20, ansiedadSocial: 10 },
    "🚽 Bio Alert": { dopamina: 50, cucharas: 50, cargaSensorial: 20, necesidadesBio: 90, ansiedadSocial: 10 }
};

function createPresetButton(key, container) {
    const btn = document.createElement('button');
    btn.textContent = key;
    btn.className = "px-3 py-2 bg-slate-700 hover:bg-slate-600 text-xs text-slate-200 rounded transition-colors text-left truncate";
    btn.onclick = () => {
        const settings = presets[key];
        Object.keys(settings).forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.value = settings[id];
                // Trigger input event manually to update UI
                el.dispatchEvent(new Event('input'));
            }
        });
        // If on mobile, close menu after selection
        closeMobileMenu('presets');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    container.appendChild(btn);
}

const presetsContainer = document.getElementById('presets-container');
const mobilePresetsContainer = document.getElementById('mobile-presets-container');

if (presetsContainer) {
    Object.keys(presets).forEach(key => createPresetButton(key, presetsContainer));
}
if (mobilePresetsContainer) {
    Object.keys(presets).forEach(key => createPresetButton(key, mobilePresetsContainer));
}

// --- PHYSICAL STATES SYSTEM ---
const physicalStates = {
    // RED (Críticos)
    "🤕 Dolor de Cabeza": { values: { dopamina: 40, cucharas: 30, cargaSensorial: 80, necesidadesBio: 40, ansiedadSocial: 20 }, color: "red" },
    "🤢 Náuseas": { values: { dopamina: 30, cucharas: 35, cargaSensorial: 60, necesidadesBio: 90, ansiedadSocial: 10 }, color: "red" },
    "🤧 Gripe/Enfermo": { values: { dopamina: 20, cucharas: 10, cargaSensorial: 20, necesidadesBio: 60, ansiedadSocial: 10 }, color: "red" },
    "😵 Mareo": { values: { dopamina: 30, cucharas: 30, cargaSensorial: 75, necesidadesBio: 60, ansiedadSocial: 10 }, color: "red" },
    
    // YELLOW (Molestos/Advertencia)
    "🥴 Hambre/Sed": { values: { dopamina: 40, cucharas: 40, cargaSensorial: 50, necesidadesBio: 90, ansiedadSocial: 20 }, color: "yellow" },
    "🥱 Sueño Ligero": { values: { dopamina: 40, cucharas: 30, cargaSensorial: 40, necesidadesBio: 30, ansiedadSocial: 10 }, color: "yellow" },
    "🤕 Tensión Muscular": { values: { dopamina: 30, cucharas: 40, cargaSensorial: 40, necesidadesBio: 60, ansiedadSocial: 10 }, color: "yellow" },
    "🤧 Alergia Leve": { values: { dopamina: 40, cucharas: 40, cargaSensorial: 55, necesidadesBio: 40, ansiedadSocial: 10 }, color: "yellow" },
    "🧠 Brain Fog": { values: { dopamina: 30, cucharas: 20, cargaSensorial: 40, necesidadesBio: 20, ansiedadSocial: 10 }, color: "yellow" },

    // GREEN (Óptimos)
    "💪 Fresco/Descansado": { values: { dopamina: 60, cucharas: 90, cargaSensorial: 10, necesidadesBio: 10, ansiedadSocial: 10 }, color: "green" },
    "🧘 Recién Bañado": { values: { dopamina: 60, cucharas: 70, cargaSensorial: 5, necesidadesBio: 10, ansiedadSocial: 10 }, color: "green" },
    "🏃 Post-Ejercicio": { values: { dopamina: 60, cucharas: 50, cargaSensorial: 30, necesidadesBio: 60, ansiedadSocial: 10 }, color: "green" },
    "😌 Relajado": { values: { dopamina: 50, cucharas: 80, cargaSensorial: 10, necesidadesBio: 10, ansiedadSocial: 0 }, color: "green" }
};

function createPhysicalButton(key, container) {
    const state = physicalStates[key];
    const btn = document.createElement('button');
    btn.textContent = key;
    
    let borderColor = "border-slate-500";
    if (state.color === "red") borderColor = "border-red-500";
    if (state.color === "yellow") borderColor = "border-yellow-500";
    if (state.color === "green") borderColor = "border-emerald-500";

    btn.className = `px-3 py-2 bg-slate-700 hover:bg-slate-600 text-xs text-slate-200 rounded transition-colors text-left truncate border-l-4 ${borderColor}`;
    
    btn.onclick = () => {
        const settings = state.values;
        Object.keys(settings).forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.value = settings[id];
                // Trigger input event manually to update UI
                el.dispatchEvent(new Event('input'));
            }
        });
        // If on mobile, close menu after selection
        closeMobileMenu('physical');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    container.appendChild(btn);
}

const physicalContainer = document.getElementById('physical-presets-container');
const mobilePhysicalContainer = document.getElementById('mobile-physical-container');

if (physicalContainer) {
    Object.keys(physicalStates).forEach(key => createPhysicalButton(key, physicalContainer));
}
if (mobilePhysicalContainer) {
    Object.keys(physicalStates).forEach(key => createPhysicalButton(key, mobilePhysicalContainer));
}

// --- EMOTIONS SYSTEM (Inside Out) ---
const emotions = {
    // Inside Out 1
    "joy": { label: "☀️", name: "Alegría", advice: "Disfruta el impulso. Es buen momento para crear.", active: "bg-yellow-400 text-yellow-900 border-yellow-400", inactive: "bg-yellow-400/10 text-yellow-200 border-yellow-400/20 hover:bg-yellow-400/20" },
    "sadness": { label: "🌧️", name: "Tristeza", advice: "Permítete sentirlo. No te fuerces a ser productivo.", active: "bg-blue-500 text-white border-blue-500", inactive: "bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20" },
    "anger": { label: "🔥", name: "Furia", advice: "Canaliza la energía en ejercicio o escritura (sin enviar).", active: "bg-red-600 text-white border-red-600", inactive: "bg-red-600/10 text-red-300 border-red-600/20 hover:bg-red-600/20" },
    "fear": { label: "⚡️", name: "Temor", advice: "Identifica la amenaza. ¿Es real o es ansiedad?", active: "bg-purple-600 text-white border-purple-600", inactive: "bg-purple-600/10 text-purple-300 border-purple-600/20 hover:bg-purple-600/20" },
    "disgust": { label: "🥦", name: "Desagrado", advice: "Algo en el entorno molesta. Revisa olores, texturas o luces.", active: "bg-green-600 text-white border-green-600", inactive: "bg-green-600/10 text-green-300 border-green-600/20 hover:bg-green-600/20" },
    
    // Inside Out 2
    "anxiety": { label: "🌪️", name: "Ansiedad", advice: "Respira. 4-7-8. Esto es temporal.", active: "bg-orange-500 text-white border-orange-500", inactive: "bg-orange-500/10 text-orange-300 border-orange-500/20 hover:bg-orange-500/20" },
    "curiosity": { label: "🔍", name: "Curiosidad", advice: "Sigue el hilo, pero pon un timer.", active: "bg-sky-500 text-white border-sky-500", inactive: "bg-sky-500/10 text-sky-300 border-sky-500/20 hover:bg-sky-500/20" },
    "ennui": { label: "(– _ –)ᶻ 𝗓 𐰁", name: "Ennui", advice: "El aburrimiento es señal de falta de dopamina. Busca novedad pequeña.", active: "bg-indigo-900 text-indigo-200 border-indigo-900", inactive: "bg-indigo-900/30 text-indigo-300 border-indigo-900/40 hover:bg-indigo-900/50" },
    "embarrassment": { label: "(◞‸◟ㆀ)", name: "Vergüenza", advice: "Nadie se acuerda tanto como tú. Sé amable contigo.", active: "bg-pink-400 text-pink-900 border-pink-400", inactive: "bg-pink-400/10 text-pink-300 border-pink-400/20 hover:bg-pink-400/20" },
    "nostalgia": { label: "🧸", name: "Nostalgia", advice: "Conecta con el recuerdo positivo, pero no te quedes a vivir ahí.", active: "bg-amber-200 text-amber-900 border-amber-200", inactive: "bg-amber-200/10 text-amber-200 border-amber-200/20 hover:bg-amber-200/20" },

    // Special unique AACC + TDAH + TEA emotions
    "overwhelm": { label: "🤯", name: "Sobrecarga", advice: "Reduce inputs sensoriales YA. Audífonos y menos luz.", active: "bg-red-500 text-white border-red-500", inactive: "bg-red-500/10 text-red-300 border-red-500/20 hover:bg-red-500/20" },
    "paralysis": { label: "🧊", name: "Parálisis", advice: "Mueve un dedo. Solo uno. Luego la mano.", active: "bg-cyan-200 text-cyan-900 border-cyan-200", inactive: "bg-cyan-200/10 text-cyan-200 border-cyan-200/20 hover:bg-cyan-200/20" },
    "masking": { label: "🎭", name: "Masking", advice: "Es agotador. Busca un momento a solas para soltar la máscara.", active: "bg-slate-400 text-slate-900 border-slate-400", inactive: "bg-slate-400/10 text-slate-300 border-slate-400/20 hover:bg-slate-400/20" },
    "burnout": { label: "🕯️", name: "Burnout", advice: "Descanso radical. No hay otra cura.", active: "bg-stone-600 text-stone-200 border-stone-600", inactive: "bg-stone-600/30 text-stone-400 border-stone-600/40 hover:bg-stone-600/50" },
    "justice": { label: "⚖️", name: "Justicia", advice: "El mundo no se arregla hoy. Cuida tu hígado.", active: "bg-orange-600 text-white border-orange-600", inactive: "bg-orange-600/10 text-orange-300 border-orange-600/20 hover:bg-orange-600/20" },
    "stimming": { label: "🌀", name: "Stimming", advice: "Hazlo. Tu sistema nervioso se está regulando.", active: "bg-lime-400 text-lime-900 border-lime-400", inactive: "bg-lime-400/10 text-lime-200 border-lime-400/20 hover:bg-lime-400/20" },
    "rsd": { label: "💔", name: "Disforia (RSD)", advice: "Es una percepción distorsionada por el dolor. Espera a que pase.", active: "bg-rose-700 text-white border-rose-700", inactive: "bg-rose-700/10 text-rose-300 border-rose-700/20 hover:bg-rose-700/20" },
    "hyperfocus": { label: "🔭", name: "Hiperfoco", advice: "Aprovecha la ola, pero pon una alarma para comer.", active: "bg-violet-500 text-white border-violet-500", inactive: "bg-violet-500/10 text-violet-300 border-violet-500/20 hover:bg-violet-500/20" }
};

function createEmotionButton(key, container) {
    const emo = emotions[key];
    const btn = document.createElement('button');
    
    // Initial State (Inactive)
    btn.className = `flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2 ${emo.inactive}`;
    btn.innerHTML = `<span>${emo.label}</span> <span>${emo.name}</span>`;
    btn.dataset.key = key;
    
    btn.onclick = () => {
        // Toggle logic
        if (activeEmotion === key) {
            activeEmotion = null;
        } else {
            activeEmotion = key;
        }
        updateEmotionButtons();
        updateSimulation();
    };
    container.appendChild(btn);
}

function updateEmotionButtons() {
    const container = document.getElementById('emotions-container');
    if (!container) return;
    
    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
        const key = btn.dataset.key;
        const emo = emotions[key];
        
        if (key === activeEmotion) {
            // Active State
            btn.className = `flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2 scale-105 shadow-lg ${emo.active}`;
        } else {
            // Inactive State
            btn.className = `flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2 opacity-70 hover:opacity-100 ${emo.inactive}`;
        }
    });
}

const emotionsContainer = document.getElementById('emotions-container');
if (emotionsContainer) {
    Object.keys(emotions).forEach(key => createEmotionButton(key, emotionsContainer));
}

// --- EASTER EGGS SYSTEM ---
const easterEggs = {
    // POSITIVOS (Requieren Salud Mental Alta)
    "🌟 Concentración absoluta": { 
        values: { dopamina: 100, cucharas: 100, cargaSensorial: 0, necesidadesBio: 0, ansiedadSocial: 0 }, 
        mode: "GOD_MODE",
        color: "gold",
        lightLevel: "Luz Radiante"
    },
    "🧩 Epifanía": {
        values: { dopamina: 100, cucharas: 80, cargaSensorial: 0, necesidadesBio: 10, ansiedadSocial: 0 },
        mode: "EPIPHANY",
        color: "white",
        lightLevel: "Luz Clara"
    },
    "🦉 La Hora Mágica": { 
        values: { dopamina: 100, cucharas: 50, cargaSensorial: 0, necesidadesBio: 20, ansiedadSocial: 0 }, 
        mode: "MAGIC_HOUR",
        color: "purple",
        lightLevel: "Luz Lunar"
    },
    "🌀 Wiki Hole": {
        values: { dopamina: 80, cucharas: 20, cargaSensorial: 10, necesidadesBio: 60, ansiedadSocial: 0 },
        mode: "WIKI_HOLE",
        color: "cyan",
        lightLevel: "Luz Artificial"
    },
    
    // NEUTRALES / MIXTOS
    "⚖️ Furia Justiciera": {
        values: { dopamina: 90, cucharas: 40, cargaSensorial: 50, necesidadesBio: 20, ansiedadSocial: 80 },
        mode: "JUSTICE_MODE",
        color: "orange",
        lightLevel: "Penumbra Ardiente"
    },
    "👻 Ghost Mode": {
        values: { dopamina: 40, cucharas: 40, cargaSensorial: 10, necesidadesBio: 20, ansiedadSocial: 100 },
        mode: "GHOST_MODE",
        color: "transparent",
        lightLevel: "Penumbra Fría"
    },

    // NEGATIVOS (Ocurren con Salud Mental Baja)
    "😶 Disociación": {
        values: { dopamina: 0, cucharas: 10, cargaSensorial: 0, necesidadesBio: 0, ansiedadSocial: 0 },
        mode: "VOID_MODE",
        color: "gray",
        lightLevel: "Oscuridad Vacía"
    },
    "🕸️ Doomscrolling": {
        values: { dopamina: 10, cucharas: 5, cargaSensorial: 60, necesidadesBio: 40, ansiedadSocial: 90 },
        mode: "DOOMSCROLLING",
        color: "black",
        lightLevel: "Oscuridad Absorbente"
    },
    "🧟 Zombie Mode": {
        values: { dopamina: 10, cucharas: 0, cargaSensorial: 80, necesidadesBio: 100, ansiedadSocial: 10 },
        mode: "ZOMBIE_MODE",
        color: "green-sick",
        lightLevel: "Oscuridad Tóxica"
    },
    "💥 Meltdown Nuclear": {
        values: { dopamina: 100, cucharas: 0, cargaSensorial: 100, necesidadesBio: 50, ansiedadSocial: 100 },
        mode: "MELTDOWN",
        color: "red-flash",
        lightLevel: "Oscuridad Explosiva"
    }
};

function createEasterEggButton(key, container, onSuccess) {
    const egg = easterEggs[key];
    const btn = document.createElement('button');
    btn.textContent = key;
    
    let borderColor = "border-slate-500";
    let textColor = "text-slate-200";
    
    if (egg.color === "gold") {
        borderColor = "border-yellow-400";
        textColor = "text-yellow-200";
    }
    else if (egg.color === "purple") {
        borderColor = "border-purple-500";
        textColor = "text-purple-300";
    }
    else if (egg.color === "cyan") {
        borderColor = "border-cyan-400";
        textColor = "text-cyan-200";
    }
    else if (egg.color === "orange") {
        borderColor = "border-orange-500";
        textColor = "text-orange-200";
    }
    else if (egg.color === "white") {
        borderColor = "border-slate-200";
        textColor = "text-white";
    }
    else if (egg.color === "gray") {
        borderColor = "border-slate-600";
        textColor = "text-slate-400";
    }
    else if (egg.color === "transparent") {
        borderColor = "border-slate-800";
        textColor = "text-slate-600";
    }
    else if (egg.color === "red-flash") {
        borderColor = "border-red-600";
        textColor = "text-red-400";
    }
    else if (egg.color === "green-sick") {
        borderColor = "border-lime-800";
        textColor = "text-lime-600";
    }
    else if (egg.color === "black") {
        borderColor = "border-black";
        textColor = "text-slate-500";
    }

    // Wrapper for tooltip positioning
    const wrapper = document.createElement('div');
    wrapper.className = "relative group w-full";

    btn.className = `w-full px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs ${textColor} rounded transition-all text-left truncate border-l-8 ${borderColor} shadow-lg hover:scale-105`;
    
    // Custom Tooltip
    const tooltip = document.createElement('div');
    tooltip.className = "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max px-3 py-1 bg-black/90 text-white text-[10px] font-mono rounded border border-slate-600 shadow-xl z-50 pointer-events-none backdrop-blur-sm";
    tooltip.innerHTML = `<span class="mr-1">💡</span> ${egg.lightLevel}`;

    btn.onclick = () => {
        const settings = egg.values;
        
        // Set values
        Object.keys(settings).forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.value = settings[id];
                // Update label manually
                document.getElementById(`val-${id}`).textContent = settings[id];
            }
        });

        // Set Special Mode
        kernel.specialMode = egg.mode;
        kernel.manualOverride = true;
        
        // Force update
        kernel.diagnosticarSistema(settings);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Switch to results on mobile
        if (window.innerWidth < 768 && typeof showOutputs === 'function') {
            showOutputs();
        }
        
        if (onSuccess) onSuccess();
    };

    wrapper.appendChild(btn);
    wrapper.appendChild(tooltip);
    container.appendChild(wrapper);
}

const easterContainer = document.getElementById('easter-eggs-container');
if (easterContainer) {
    Object.keys(easterEggs).forEach(key => createEasterEggButton(key, easterContainer));

    // Add instructions at the bottom
    const info = document.createElement('p');
    info.className = "text-xs text-slate-400 mt-3 italic px-1 border-l-2 border-slate-600 pl-2";
    info.innerHTML = "Nota: A mayor <strong>Salud Mental</strong>, más frecuentes los drops positivos (Arriba).<br>La barra derecha indica la polaridad (Luz vs Oscuridad).";
    
    // Append to the main container (parent of the flex wrapper) to span full width
    if (easterContainer.parentElement && easterContainer.parentElement.parentElement) {
        easterContainer.parentElement.parentElement.appendChild(info);
    }
}

const mobileEasterContainer = document.getElementById('mobile-easter-eggs-container');
if (mobileEasterContainer) {
    Object.keys(easterEggs).forEach(key => createEasterEggButton(key, mobileEasterContainer, () => closeMobileMenu('easter-eggs')));
}

// --- MOBILE NAVIGATION LOGIC ---
function showOutputs() {
    document.getElementById('panel-inputs').classList.add('hidden');
    document.getElementById('panel-outputs').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showInputs() {
    document.getElementById('panel-outputs').classList.add('hidden');
    document.getElementById('panel-inputs').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function openMobileMenu(menuName) {
    const menu = document.getElementById(`mobile-menu-${menuName}`);
    const content = document.getElementById(`mobile-menu-${menuName}-content`);
    if (menu && content) {
        menu.classList.remove('hidden');
        // Small delay for transition
        setTimeout(() => {
            content.classList.remove('-translate-x-full');
        }, 10);
    }
}

function closeMobileMenu(menuName) {
    const menu = document.getElementById(`mobile-menu-${menuName}`);
    const content = document.getElementById(`mobile-menu-${menuName}-content`);
    if (menu && content) {
        content.classList.add('-translate-x-full');
        setTimeout(() => {
            menu.classList.add('hidden');
        }, 300);
    }
}

// Run initial
updateSimulation();