/**
 * ------------------------------------------------------------------
 * 🧠 Angel's KERNEL: SISTEMA OPERATIVO UNICO v3.0 (JS Port)
 * ------------------------------------------------------------------
 */

// 1. ENUMS DE ESTADOS (Simulados como objetos)
// let activeEmotion = null; // Moved to BrainKernel

let lastOut = 0; // For pink noise

// 2. CLASE PRINCIPAL (Lógica del Kernel)
class BrainKernel {
    constructor() {
        this.logs = [];
        this.specialMode = null;
        this.activeEmotion = null; // Moved from global
        this.manualOverride = false; // Flag for forced modes
        this.sound = new SoundEngine();
        this.visuals = new VisualEngine();
        this.trafficLight = new TrafficLightController();
        this.modalGuide = new ModalGuideComponent();
    }

    log(message, type = 'info') {
        this.logs.push({ message, type });
    }

    clearLogs() {
        this.logs = [];
    }

    diagnosticarSistema(stats) {
        this.clearLogs();

        if (this.activeEmotion) {
            this.log(`>> EMOTIONAL OVERRIDE: ${emotions[this.activeEmotion].name.toUpperCase()}`, 'info');
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
                    if (this.visuals) this.visuals.setMode(this.specialMode);
                }
            } else {
                // If we were in an auto-mode but conditions are gone, release it
                // BUT keep it if it's sustained by activeEmotion (handled by detectSpecialMode returning it)
                if (autoTypes.includes(this.specialMode)) {
                    this.specialMode = null;
                    if (this.sound) this.sound.stopAll();
                    if (this.visuals) this.visuals.setMode(null);
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
        if (this.activeEmotion) {
            // WIKI_HOLE: Curiosity + Dispersed Attention + Energy
            if (this.activeEmotion === 'curiosity' && stats.dopamina > 60 && stats.cucharas > 30) return 'WIKI_HOLE';
            
            // EPIPHANY: Joy + High Clarity (Dopamine/Energy)
            if (this.activeEmotion === 'joy' && stats.dopamina > 80 && stats.cucharas > 70) return 'EPIPHANY';
            
            // VOID_MODE: Sadness/Shutdown + Low Energy
            if ((this.activeEmotion === 'sadness' || this.activeEmotion === 'shutdown') && stats.cucharas < 20) return 'VOID_MODE';
            
            // JUSTICE_MODE: Anger/Justice + Energy to fight
            if ((this.activeEmotion === 'anger' || this.activeEmotion === 'justice') && stats.cucharas > 40) return 'JUSTICE_MODE';
            
            // GHOST_MODE: Fear/Embarrassment + Social Anxiety
            if ((this.activeEmotion === 'fear' || this.activeEmotion === 'embarrassment') && stats.ansiedadSocial > 60) return 'GHOST_MODE';
            
            // DOOMSCROLLING: Anxiety + Low Energy (Stuck)
            if (this.activeEmotion === 'anxiety' && stats.cucharas < 30) return 'DOOMSCROLLING';
            
            // ZOMBIE_MODE: Ennui/Paralysis/Burnout + Critical Energy
            if ((this.activeEmotion === 'ennui' || this.activeEmotion === 'paralysis' || this.activeEmotion === 'burnout') && stats.cucharas < 15) return 'ZOMBIE_MODE';
            
            // MAGIC_HOUR: Nostalgia + Low Sensory Load
            if (this.activeEmotion === 'nostalgia' && stats.cargaSensorial < 30) return 'MAGIC_HOUR';
            
            // MELTDOWN: Overwhelm/RSD/Meltdown + High Stress
            if ((this.activeEmotion === 'overwhelm' || this.activeEmotion === 'rsd' || this.activeEmotion === 'meltdown') && (stats.cargaSensorial > 80 || stats.ansiedadSocial > 80)) return 'MELTDOWN';
            
            // GOD_MODE: Hyperfocus + Peak Stats
            if (this.activeEmotion === 'hyperfocus' && stats.dopamina > 80 && stats.cucharas > 80) return 'GOD_MODE';
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
            this.trafficLight.update(null, null, null, this.specialMode, this.activeEmotion);
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
            this.trafficLight.update(null, null, null, this.specialMode, this.activeEmotion);
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
            this.trafficLight.update(null, null, null, this.specialMode, this.activeEmotion);
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
            this.trafficLight.update(null, null, null, this.specialMode, this.activeEmotion);
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
            this.trafficLight.update(null, null, null, this.specialMode, this.activeEmotion);
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
            this.trafficLight.update(null, null, null, this.specialMode, this.activeEmotion);
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
            this.trafficLight.update(null, null, null, this.specialMode, this.activeEmotion);
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
            this.trafficLight.update(null, null, null, this.specialMode, this.activeEmotion);
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

        // CASO 4: ZONA DE FLOW (Default)
        else {
            if (this.activeEmotion && emotions[this.activeEmotion]) {
                const emo = emotions[this.activeEmotion];
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
        this.trafficLight.update(est, eje, stats, this.specialMode, this.activeEmotion);
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

        // Update Modal Data via Component
        const guide = protocolGuides[protocol] || protocolGuides["SISTEMA NOMINAL"];
        if (this.modalGuide) {
            this.modalGuide.updateContent(protocol, guide);
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

        this.trafficLight.update(est, eje, stats, this.specialMode, this.activeEmotion);
    }

    getColorForState(state) {
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

function updateSimulation() {
    // Reset special mode on manual input
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

// --- EMOTIONS SYSTEM (Inside Out) ---
// Handled by EmotionsComponent

// --- EASTER EGGS SYSTEM ---
// Handled by EasterEggsComponent

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

// Initialize UI Components
const presetsComponent = new PresetsComponent();
const physicalStatesComponent = new PhysicalStatesComponent();
const easterEggsComponent = new EasterEggsComponent(kernel);
const emotionsComponent = new EmotionsComponent(kernel);

// Run initial
updateSimulation();
