/**
 * ------------------------------------------------------------------
 * 🧠 Angel's KERNEL: SISTEMA OPERATIVO UNICO v3.0
 * ------------------------------------------------------------------
 * Autor: Ángel (Full Stack Dev)
 * Arquitectura: Híbrida
 * Objetivo: Gestión de recursos limitados (Cucharas & Dopamina)
 * y prevención de condiciones de carrera (Over/Under-stimulation).
 */

// 1. ENUMS DE ESTADOS (La complejidad del espectro)
// ------------------------------------------------------------------

enum NivelEstimulacion {
    HIPO_ESTIMULADO = "HIPO",   // "Boredom Pain": El cerebro busca problemas para entretenerse
    OPTIMO_FLOW = "FLOW",       // El Hyperfocus divino (Coding mode)
    SOBRE_ESTIMULADO = "OVER",  // Demasiado ruido/luz/gente
    SHUTDOWN = "CRASH"          // Pantallazo azul
}

enum EstadoEjecutivo {
    OPERATIVO = "ONLINE",
    PARALISIS = "FROZEN",       // "Quiero hacer X pero no me puedo mover"
    DISPERSO = "SQUIRREL",      // 20 pestañas abiertas, ninguna terminada
    BURNOUT = "OFFLINE"         // Sin cucharas disponibles
}

// 2. INPUTS DEL SISTEMA (Tus sensores)
// ------------------------------------------------------------------

interface MetricasInternas {
    dopamina: number;        // 0-100 (Interés/Motivación)
    cucharas: number;        // 0-100 (Energía Ejecutiva Diaria)
    cargaSensorial: number;  // 0-100 (Ruido, Texturas, Luz)
    necesidadesBio: number;  // 0-100 (Hambre, Sed, Baño - La interocepción falla a veces)
    ansiedadSocial: number;  // 0-100
}

// 3. EL KERNEL (Lógica de Negocio)
// ------------------------------------------------------------------

class BrainKernel {
    private estadoEstimulacion: NivelEstimulacion = NivelEstimulacion.OPTIMO_FLOW;
    private estadoEjecutivo: EstadoEjecutivo = EstadoEjecutivo.OPERATIVO;

    public diagnosticarSistema(stats: MetricasInternas): void {
        console.log("\n[SYSTEM DIAGNOSTIC] Corriendo análisis...");

        // Paso 0: Chequeo de BIOS (Necesidades Fisiológicas)
        if (stats.necesidadesBio > 80) {
            console.error(">> ALERTA BIO: ¡Wey, ve al baño o come algo! (Interocepción crítica)");
            console.log("   Action: Pause process -> Eat/Drink/Pee.");
            return; // Bloquea todo lo demás hasta que se arregle el hardware
        }

        // Paso 1: Determinar Estados
        this.estadoEstimulacion = this.calcularEstimulacion(stats);
        this.estadoEjecutivo = this.calcularEjecucion(stats);

        // Paso 2: Ejecutar Estrategia Combinada
        this.resolverConflicto(this.estadoEstimulacion, this.estadoEjecutivo, stats);
    }

    // Lógica para saber si te falta o te sobra "ruido"
    private calcularEstimulacion(stats: MetricasInternas): NivelEstimulacion {
        if (stats.cargaSensorial > 85) return NivelEstimulacion.SHUTDOWN;
        if (stats.cargaSensorial > 60 && stats.dopamina < 30) return NivelEstimulacion.SOBRE_ESTIMULADO; // Irritable
        if (stats.dopamina < 20 && stats.cargaSensorial < 30) return NivelEstimulacion.HIPO_ESTIMULADO; // Dopamine seeking
        return NivelEstimulacion.OPTIMO_FLOW;
    }

    // Lógica para saber si puedes "hacer cosas"
    private calcularEjecucion(stats: MetricasInternas): EstadoEjecutivo {
        if (stats.cucharas < 10) return EstadoEjecutivo.BURNOUT;
        if (stats.dopamina < 15 && stats.cucharas > 20) return EstadoEjecutivo.PARALISIS; // Hay energía, no hay arranque
        if (stats.dopamina > 90) return EstadoEjecutivo.DISPERSO; // Demasiada energía, cero foco
        return EstadoEjecutivo.OPERATIVO;
    }

    // 4. EL SOLUCIONADOR (The Fixer)
    // Aquí es donde manejamos las contradicciones
    private resolverConflicto(est: NivelEstimulacion, eje: EstadoEjecutivo, stats: MetricasInternas): void {
        console.log(`[STATUS] Estímulo: ${est} | Ejecutivo: ${eje}`);

        // CASO 1: MELTDOWN INMINENTE (Mucho ruido + Poca energía)
        if (est === NivelEstimulacion.SOBRE_ESTIMULADO || est === NivelEstimulacion.SHUTDOWN) {
            console.error(">> PROTOCOLO: BUNKER MODE.");
            console.log("   1. Cancelar todo input social (Modo Avión).");
            console.log("   2. Entorno controlado: Oscuridad, silencio o ruido blanco.");
            console.log("   3. Stimming regulatorio (balancearse, fidgeting, 'Happy Hands').");
            console.log("   4. No tomar decisiones importantes.");
        }

        // CASO 2: PARÁLISIS POR TDAH (Hipo-estimulado + Parálisis)
        // El cerebro quiere hacer algo pero "no arranca".
        else if (est === NivelEstimulacion.HIPO_ESTIMULADO || eje === EstadoEjecutivo.PARALISIS) {
            console.warn(">> PROTOCOLO: JUMPSTART (Arrancar el motor).");
            console.log("   El cerebro necesita dopamina 'barata' para arrancar, pero CUIDADO con el doomscrolling.");
            console.log("   1. Música a todo volumen (Metal/Electrónica/Lo que te prenda).");
            console.log("   2. 'Body Doubling': Llama a un compa o ponte un video de 'Study with me'.");
            console.log("   3. Regla de los 2 minutos: Haz algo estúpidamente pequeño (lavar 1 plato).");
            console.log("   4. Ingesta de glucosa/cafeína (con moderación).");
        }

        // CASO 3: EL "WIRED BUT TIRED" (Disperso + Cucharas bajas)
        // Quieres hacer mil cosas pero tu cuerpo no da más. Peligroso antes de dormir.
        else if (eje === EstadoEjecutivo.DISPERSO && stats.cucharas < 30) {
            console.warn(">> PROTOCOLO: ATERRIZAJE FORZOSO.");
            console.log("   Tu RAM está llena pero tu batería está muerta.");
            console.log("   1. Dump Mental: Escribe todo en un .txt para sacarlo de la cabeza.");
            console.log("   2. Input pasivo: Ver una serie que ya viste 1000 veces (confort).");
            console.log("   3. Melatonina o rutina de sueño estricta.");
        }

        // CASO 4: ZONA DE FLOW (El Santo Grial)
        else {
            console.log(">> SISTEMA NOMINAL: GOD MODE.");
            console.log("   Estás en la zona. Aprovecha para codear ese feature complejo.");
            console.log("   Recordatorio: Pon una alarma para tomar agua en 1 hora.");
        }
    }
}

// --- UNIT TESTS (Casos de la Vida Real) ---

const miAngel = new BrainKernel();

// Escenario A: Llegas de la uni, mucho ruido en el camión, no comiste bien.
console.log("--- ESCENARIO: Tarde de Perros ---");
miAngel.diagnosticarSistema({
    dopamina: 10,      // Agotado
    cucharas: 5,       // Sin energía
    cargaSensorial: 95,// Ruido al tope
    necesidadesBio: 39,// Hambre/Baño
    ansiedadSocial: 50
});

// Escenario B: Domingo en la mañana, aburrido, quieres programar pero no te levantas.
console.log("\n--- ESCENARIO: Parálisis de Domingo ---");
miAngel.diagnosticarSistema({
    dopamina: 5,       // Aburrido a morir
    cucharas: 80,      // Tienes energía física
    cargaSensorial: 10,// Silencio total
    necesidadesBio: 20,
    ansiedadSocial: 0
});


console.log("\n--- ESCENARIO: Ahorita ---");
miAngel.diagnosticarSistema({
    dopamina: 34,
    cucharas: 25,
    cargaSensorial: 89,
    necesidadesBio: 36,
    ansiedadSocial: 70
});
