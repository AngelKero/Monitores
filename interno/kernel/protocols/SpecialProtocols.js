import { BaseProtocol } from './BaseProtocol.js';

export class GodModeProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'GOD_MODE'; }
    matches(stats) {
        if (this.kernel.activeEmotion === 'hyperfocus' && stats.dopamina > 80 && stats.cucharas > 80) return true;
        if (stats.dopamina >= 98 && stats.cucharas >= 95 && stats.cargaSensorial <= 5 && stats.necesidadesBio <= 5 && stats.ansiedadSocial <= 5) return true;
        return false;
    }
    execute(stats) {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-fixed transition-colors duration-1000";
        document.body.className = `bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 text-yellow-100 ${baseClasses}`;
        this.log(">> PROTOCOLO: REALITY BENDING (GOD MODE).", 'success');
        this.log("   Sincronización absoluta de recursos.", 'info');
        this.log("   1. APROVECHA: Escribe, programa, diseña SIN PARAR.", 'action');
        this.log("   2. REGISTRA: Graba notas de voz si escribes lento.", 'action');
        this.log("   3. PELIGRO: No olvides comer ni dormir.", 'action');
        this.kernel.updateStatusDisplay("OMNIPOTENTE", "CREATIVO", {});
        this.kernel.updateProtocolDisplay("GOD_MODE");
        this.kernel.trafficLight.update(null, null, null, this.id, this.kernel.activeEmotion);
    }
}

export class MagicHourProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'MAGIC_HOUR'; }
    matches(stats) {
        // Between 12:30 and 6:00 AM && stats.dopamina >= 80 && stats.cucharas >= 50
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeInMinutes = hours * 60 + minutes;
        const startTime = 0 * 60 + 30; // 12:30 AM
        const endTime = 6 * 60 + 0; // 6:00 AM
        if (timeInMinutes >= startTime && timeInMinutes <= endTime) {
            if (stats.dopamina >= 80 && stats.cucharas >= 50) return true;
        }
        return false;
    }
    execute(stats) {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-fixed transition-colors duration-1000";
        document.body.className = `bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-purple-100 ${baseClasses}`;
        this.log(">> PROTOCOLO: 3:00 AM POWER (Magic Hour).", 'success');
        this.log("   El mundo duerme, tú creas.", 'info');
        this.log("   1. SILENCIO: Disfruta la falta de notificaciones.", 'action');
        this.log("   2. CREACIÓN: Es el mejor momento para arte/código.", 'action');
        this.log("   3. LÍMITE: Pon alarma para dormir al menos 4h.", 'action');
        this.kernel.updateStatusDisplay("NOCTURNO", "INSPIRADO", {});
        this.kernel.updateProtocolDisplay("MAGIC_HOUR");
        this.kernel.trafficLight.update(null, null, null, this.id, this.kernel.activeEmotion);
    }
}

export class WikiHoleProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'WIKI_HOLE'; }
    matches(stats) {
        if (this.kernel.activeEmotion === 'curiosity' && stats.dopamina > 60 && stats.cucharas > 30) return true;
        return false;
    }
    execute(stats) {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-fixed transition-colors duration-1000";
        document.body.className = `bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-cyan-100 ${baseClasses}`;
        this.log(">> PROTOCOLO: WIKI HOLE (Conejera).", 'warning');
        this.log("   Absorbiendo datos irrelevantes a alta velocidad.", 'info');
        this.log("   1. CONSCIENCIA: ¿Esto es útil o solo interesante?", 'action');
        this.log("   2. SALIDA: Cierra pestañas con 'Ctrl+W' sin mirar.", 'action');
        this.log("   3. ANCLA: Vuelve a tu tarea principal en 3, 2, 1...", 'action');
        this.kernel.updateStatusDisplay("HIPER-LINK", "CURIOSO", {});
        this.kernel.updateProtocolDisplay("WIKI_HOLE");
        this.kernel.trafficLight.update(null, null, null, this.id, this.kernel.activeEmotion);
    }
}

export class JusticeModeProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'JUSTICE_MODE'; }
    matches(stats) {
        if ((this.kernel.activeEmotion === 'anger' || this.kernel.activeEmotion === 'justice') && stats.cucharas > 40) return true;
        return false;
    }
    execute(stats) {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-fixed transition-colors duration-1000";
        document.body.className = `bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-orange-100 ${baseClasses}`;
        this.log(">> PROTOCOLO: FURIA JUSTICIERA.", 'error');
        this.log("   Detectada incorrección en internet.", 'info');
        this.log("   1. PAUSA: ¿Vale la pena tu paz mental?", 'action');
        this.log("   2. ESCRIBE: Escribe la respuesta en Notas y BÓRRALA.", 'action');
        this.log("   3. BLOQUEA: No alimentes al troll.", 'action');
        this.kernel.updateStatusDisplay("COMBATE", "ENFOCADO", {});
        this.kernel.updateProtocolDisplay("JUSTICE_MODE");
        this.kernel.trafficLight.update(null, null, null, this.id, this.kernel.activeEmotion);
    }
}

export class EpiphanyProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'EPIPHANY'; }
    matches(stats) {
        if (this.kernel.activeEmotion === 'joy' && stats.dopamina > 80 && stats.cucharas > 70) return true;
        if (stats.dopamina >= 90 && stats.cucharas >= 80 && stats.cargaSensorial <= 20 && stats.necesidadesBio <= 20 && stats.ansiedadSocial <= 10) return true;
        return false;
    }
    execute(stats) {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-fixed transition-colors duration-1000";
        document.body.className = `bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 text-white ${baseClasses}`;
        this.log(">> PROTOCOLO: EPIFANÍA (Claridad).", 'success');
        this.log("   Todo conecta. La matriz es visible.", 'info');
        this.log("   1. CAPTURA: Escribe/Graba la idea INMEDIATAMENTE.", 'action');
        this.log("   2. MAPA: Haz un diagrama rápido de las conexiones.", 'action');
        this.log("   3. ACCIÓN: Define el primer paso real.", 'action');
        this.kernel.updateStatusDisplay("CLARIDAD", "ABSOLUTA", {});
        this.kernel.updateProtocolDisplay("EPIPHANY");
        this.kernel.trafficLight.update(null, null, null, this.id, this.kernel.activeEmotion);
    }
}

export class VoidModeProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'VOID_MODE'; }
    matches(stats) {
        if ((this.kernel.activeEmotion === 'sadness' || this.kernel.activeEmotion === 'shutdown') && stats.cucharas < 20) return true;
        if (stats.dopamina <= 5 && stats.cucharas <= 5 && stats.cargaSensorial <= 5 && stats.necesidadesBio <= 5 && stats.ansiedadSocial <= 5) return true;
        return false;
    }
    execute(stats) {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-slate-950 text-slate-600 grayscale";
        document.body.className = baseClasses;
        this.log(">> PROTOCOLO: DISOCIACIÓN (The Void).", 'error');
        this.log("   Conexión con el servidor perdida.", 'info');
        this.log("   1. ANCLAJE: Nombra 5 cosas que veas ahora mismo.", 'action');
        this.log("   2. TACTO: Toca algo frío o rugoso.", 'action');
        this.log("   3. ESPERA: No intentes 'volver' a la fuerza.", 'action');
        this.kernel.updateStatusDisplay("NULL", "NULL", {});
        this.kernel.updateProtocolDisplay("VOID_MODE");
        this.kernel.trafficLight.update(null, null, null, this.id, this.kernel.activeEmotion);
    }
}

export class GhostModeProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'GHOST_MODE'; }
    matches(stats) {
        if ((this.kernel.activeEmotion === 'fear' || this.kernel.activeEmotion === 'embarrassment') && stats.ansiedadSocial > 60) return true;
        if (stats.ansiedadSocial >= 98 && stats.cucharas <= 30) return true;
        return false;
    }
    execute(stats) {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-slate-900 text-slate-500 opacity-80";
        document.body.className = baseClasses;
        this.log(">> PROTOCOLO: MODO FANTASMA.", 'warning');
        this.log("   Reduciendo firma de calor social.", 'info');
        this.log("   1. INVISIBILIDAD: No respondas a nadie.", 'action');
        this.log("   2. OBSERVACIÓN: Mira sin interactuar.", 'action');
        this.log("   3. RECARGA: Estás aquí para observar, no para actuar.", 'action');
        this.kernel.updateStatusDisplay("OCULTO", "SIGILO", {});
        this.kernel.updateProtocolDisplay("GHOST_MODE");
        this.kernel.trafficLight.update(null, null, null, this.id, this.kernel.activeEmotion);
    }
}

export class MeltdownProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'MELTDOWN'; }
    matches(stats) {
        if ((this.kernel.activeEmotion === 'overwhelm' || this.kernel.activeEmotion === 'rsd' || this.kernel.activeEmotion === 'meltdown') && (stats.cargaSensorial > 80 || stats.ansiedadSocial > 80)) return true;
        if (stats.cargaSensorial >= 98 && stats.cucharas <= 5) return true;
        return false;
    }
    execute(stats) {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-red-950 text-red-200 animate-pulse";
        document.body.className = baseClasses;
        this.log(">> PROTOCOLO: MELTDOWN NUCLEAR.", 'error');
        this.log("   ¡EVACUAR INMEDIATAMENTE!", 'error');
        this.log("   1. SALIDA: Vete al lugar seguro más cercano.", 'action');
        this.log("   2. COMUNICACIÓN: 'No puedo hablar ahora'.", 'action');
        this.log("   3. SEGURIDAD: No conduzcas ni operes maquinaria.", 'action');
        this.kernel.updateStatusDisplay("EXPLOSIÓN", "CRÍTICO", {});
        this.kernel.updateProtocolDisplay("MELTDOWN");
        this.kernel.trafficLight.update(null, null, null, this.id, this.kernel.activeEmotion);
    }
}

export class ZombieModeProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'ZOMBIE_MODE'; }
    matches(stats) {
        if ((this.kernel.activeEmotion === 'ennui' || this.kernel.activeEmotion === 'paralysis' || this.kernel.activeEmotion === 'burnout') && stats.cucharas < 15) return true;
        if (stats.necesidadesBio >= 98 && stats.cucharas <= 5 && stats.dopamina <= 10) return true;
        return false;
    }
    execute(stats) {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-lime-950 text-lime-200 blur-[0.5px]";
        document.body.className = baseClasses;
        this.log(">> PROTOCOLO: ZOMBIE MODE.", 'error');
        this.log("   Cerebro no encontrado. Buscando...", 'info');
        this.log("   1. AUTOMÁTICO: Haz tareas que no requieran pensar.", 'action');
        this.log("   2. COMIDA: Come algo, probablemente se te olvidó.", 'action');
        this.log("   3. DORMIR: Tu cerebro ya se apagó, apaga el cuerpo.", 'action');
        this.kernel.updateStatusDisplay("INFECTADO", "SIN SEÑAL", {});
        this.kernel.updateProtocolDisplay("ZOMBIE_MODE");
        this.kernel.trafficLight.update(null, null, null, this.id, this.kernel.activeEmotion);
    }
}

export class DoomscrollingProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'DOOMSCROLLING'; }
    matches(stats) {
        if (this.kernel.activeEmotion === 'anxiety' && stats.cucharas < 30) return true;
        return false;
    }
    execute(stats) {
        const baseClasses = "font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words bg-black text-red-900";
        document.body.className = baseClasses;
        this.log(">> PROTOCOLO: DOOMSCROLLING.", 'error');
        this.log("   El abismo te devuelve la mirada.", 'info');
        this.log("   1. ROMPE EL BUCLE: Tira el teléfono al sofá (literal).", 'action');
        this.log("   2. CAMBIO FÍSICO: Levántate y camina a otra habitación.", 'action');
        this.log("   3. REALIDAD: Mira por la ventana o toca una planta.", 'action');
        this.kernel.updateStatusDisplay("ATRAPADO", "BUCLE", {});
        this.kernel.updateProtocolDisplay("DOOMSCROLLING");
        this.kernel.trafficLight.update(null, null, null, this.id, this.kernel.activeEmotion);
    }
}
