import { BaseProtocol } from './BaseProtocol.js';
import { NivelEstimulacion, EstadoEjecutivo } from '../../config/states.js';

export class SocialEvacuationProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'EVACUACIÓN SOCIAL'; }
    matches(stats, est, eje) { return stats.ansiedadSocial > 85; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: EVACUACIÓN SOCIAL.", 'error');
        this.log("   Niveles de ansiedad insostenibles.", 'info');
        this.log("   1. ESCAPE: Busca un baño, coche o salida de emergencia.", 'action');
        this.log("   2. RESPIRACIÓN: Inhala 4s, Retén 7s, Exhala 8s.", 'action');
        this.log("   3. SALIDA: 'Me siento mal' es una excusa válida.", 'action');
        this.log("   4. REFUGIO: Vete a casa y apaga el teléfono.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
    }
}

export class ForcedLandingProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'ATERRIZAJE FORZOSO'; }
    matches(stats, est, eje) { return (stats.dopamina > 60 || stats.ansiedadSocial > 40) && stats.cucharas < 30; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: ATERRIZAJE FORZOSO.", 'warning');
        this.log("   Tu RAM está llena pero tu batería está muerta.", 'info');
        this.log("   1. BRAIN DUMP: Vuelca todo tu cerebro en papel/notas YA.", 'action');
        this.log("   2. INPUT PASIVO: Pon esa serie que has visto 10 veces.", 'action');
        this.log("   3. SENSORIAL: Luz cálida, pijama suave, peso encima.", 'action');
        this.log("   4. PROHIBIDO: Redes sociales o noticias.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class EmergencyFoodProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'ALIMENTACIÓN EMERGENCIA'; }
    matches(stats, est, eje) { return stats.necesidadesBio > 70 && stats.cucharas < 30; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: ALIMENTACIÓN DE EMERGENCIA.", 'error');
        this.log("   Peligro de irritabilidad extrema.", 'info');
        this.log("   1. INGESTA INMEDIATA: Jugo, fruta, dulce (Glucosa rápida).", 'action');
        this.log("   2. AISLAMIENTO: No hables con nadie hasta comer.", 'action');
        this.log("   3. COMIDA REAL: Pide delivery si no puedes cocinar.", 'action');
        this.log("   4. ADVERTENCIA: Tus emociones actuales NO son reales.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class BioMaintenanceProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'MANTENIMIENTO BIO'; }
    matches(stats, est, eje) { return stats.necesidadesBio > 80; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: URGENCIA BIOLÓGICA.", 'error');
        this.log("   Necesidades básicas en niveles críticos.", 'info');
        this.log("   1. Atender cuerpo inmediatamente (Baño/Agua/Comida).", 'action');
        this.log("   2. Pausar cualquier actividad mental.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class SocialShieldProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'ESCUDO SOCIAL'; }
    matches(stats, est, eje) { return stats.ansiedadSocial > 50; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: ESCUDO SOCIAL.", 'warning');
        this.log("   La batería social se está drenando rápido.", 'info');
        this.log("   1. RETIRADA TÁCTICA: Ve al baño o sal a tomar aire 5 min.", 'action');
        this.log("   2. MODO OBSERVADOR: Deja de hablar, solo asiente y sonríe.", 'action');
        this.log("   3. AUDÍFONOS: Si es posible, úsalos (aunque sea sin música).", 'action');
        this.log("   4. LÍMITES: 'Estoy un poco cansado, me iré temprano'.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class ThawProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'DESCONGELAMIENTO'; }
    matches(stats, est, eje) { return stats.ansiedadSocial > 30 && eje !== EstadoEjecutivo.OPERATIVO; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: DESCONGELAMIENTO (Waiting Mode).", 'warning');
        this.log("   Estás paralizado esperando un evento futuro.", 'info');
        this.log("   1. EXTERNALIZA EL TIEMPO: Pon una alarma 15 min antes.", 'action');
        this.log("   2. ROMPE LA ESPERA: Juega algo, lee, lava platos.", 'action');
        this.log("   3. PERMISO: Tienes permiso de hacer cosas mientras esperas.", 'action');
        this.log("   4. CHECK: Revisa la hora del evento una vez más.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class SquirrelModeProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'SQUIRREL MODE'; }
    matches(stats, est, eje) { return eje === EstadoEjecutivo.DISPERSO; }
    execute(stats, est, eje) {
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
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class BioMaintenanceFlowProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'MANTENIMIENTO BIO'; }
    matches(stats, est, eje) { return est === NivelEstimulacion.OPTIMO_FLOW && stats.necesidadesBio > 60; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: MANTENIMIENTO BIOLÓGICO.", 'warning');
        this.log("   Estás en la zona, pero tu cuerpo está sufriendo.", 'info');
        this.log("   1. NO CORTES EL FLOW: Mantén la música/contexto.", 'action');
        this.log("   2. SUMINISTROS: Trae la botella de agua y snacks AQUÍ.", 'action');
        this.log("   3. MICRO-PAUSA: Estira el cuello y espalda 30s.", 'action');
        this.log("   4. BAÑO: Si tienes que ir, CORRE y vuelve.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class RecoveryModeProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'MODO RECUPERACIÓN'; }
    matches(stats, est, eje) { return stats.cucharas < 20 && stats.cargaSensorial < 30; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: MODO RECUPERACIÓN.", 'status');
        this.log("   El sistema se está reiniciando.", 'info');
        this.log("   1. HORIZONTALIDAD: Cama o sofá YA.", 'action');
        this.log("   2. HIDRATACIÓN: Bebe un vaso de agua entero.", 'action');
        this.log("   3. CONFORT: Manta pesada, peluche, ropa suave.", 'action');
        this.log("   4. PASIVO: ASMR, Lofi, o silencio total.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class BunkerModeProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'BUNKER MODE'; }
    matches(stats, est, eje) { return est === NivelEstimulacion.SOBRE_ESTIMULADO || est === NivelEstimulacion.SHUTDOWN; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: BUNKER MODE (Emergencia).", 'error');
        this.log("   1. ABORTAR MISIÓN: Sal de donde estés o enciérrate.", 'action');
        this.log("   2. BLACKOUT SENSORIAL: Oscuridad, silencio, antifaz.", 'action');
        this.log("   3. PRESIÓN PROFUNDA: Manta pesada o aprieta una almohada.", 'action');
        this.log("   4. STIMMING: Balanceo, aleteo, lo que el cuerpo pida.", 'action');
        this.log("   5. NO HABLAR: Comunícate por texto o señas.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class NoiseReductionProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'REDUCCIÓN DE RUIDO'; }
    matches(stats, est, eje) { return est === NivelEstimulacion.ALERTA_SENSORIAL; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: REDUCCIÓN DE RUIDO.", 'warning');
        this.log("   El entorno se está poniendo hostil.", 'info');
        this.log("   1. AUDÍFONOS ON: Noise Cancelling o Ruido Marrón.", 'action');
        this.log("   2. VISUAL: Baja el brillo, usa modo oscuro o lentes de sol.", 'action');
        this.log("   3. ROPA: ¿Algo te aprieta o pica? Arréglalo.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class JumpstartProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'JUMPSTART'; }
    matches(stats, est, eje) { return est === NivelEstimulacion.HIPO_ESTIMULADO || eje === EstadoEjecutivo.PARALISIS; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: JUMPSTART (Dopamina Kick).", 'warning');
        this.log("   El cerebro necesita dopamina 'barata' para arrancar.", 'info');
        this.log("   1. MÚSICA ÉPICA: Pon tu canción favorita A TOPE.", 'action');
        this.log("   2. MOVIMIENTO: Salta, baila o haz 10 sentadillas.", 'action');
        this.log("   3. NOVEDAD: Cambia de lugar o de silla.", 'action');
        this.log("   4. GAMIFICACIÓN: 'Si hago esto en 5 min, gano un dulce'.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}

export class EnergyConservationProtocol extends BaseProtocol {
    constructor(kernel) { super(kernel); this.id = 'CONSERVACIÓN DE ENERGÍA'; }
    matches(stats, est, eje) { return eje === EstadoEjecutivo.FATIGA || eje === EstadoEjecutivo.BURNOUT; }
    execute(stats, est, eje) {
        this.log(">> PROTOCOLO: CONSERVACIÓN DE ENERGÍA.", 'warning');
        this.log("   Batería baja. Entrando en modo ahorro.", 'info');
        this.log("   1. MODO AVIÓN SOCIAL: No contestes mensajes hoy.", 'action');
        this.log("   2. LEY DEL MÍNIMO ESFUERZO: Haz solo lo vital.", 'action');
        this.log("   3. ALIMENTACIÓN FÁCIL: Sándwich, cereal o delivery.", 'action');
        this.log("   4. CULPA CERO: Descansar es productivo.", 'action');
        this.kernel.updateProtocolDisplay(this.id);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }
}
