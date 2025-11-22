export const decisionGraph = {
    // ==========================================================================================
    // 1. ENTRY POINT: EL HUB PRINCIPAL
    // ==========================================================================================
    entry: {
        start: {
            question: "Hola. Calibrando sensores... ¿Cuál es tu estado general ahora mismo?",
            options: [
                {
                    text: "🚨 ESTOY EN CRISIS (Zona Roja - Urgente)",
                    next: "red_start",
                    effects: { cargaSensorial: +20, cucharas: -10 }
                },
                {
                    text: "✅ ME SIENTO BIEN (Zona Verde - Optimizar)",
                    next: "green_start",
                    effects: { dopamina: +10, cucharas: +5 }
                },
                {
                    text: "🔍 Quiero analizar a fondo qué siento (Escaneo)",
                    next: "scan_start",
                    effects: {}
                },
                {
                    text: "⚡ Revisión rápida / Mantenimiento (Zona Amarilla)",
                    next: "yellow_start",
                    effects: {}
                }
            ]
        },

        // ==========================================================================================
        // 2. MODO CRISIS (ROJO) - TRIAGE DE EMERGENCIA
        // ==========================================================================================
        red_start: {
            question: "⚠️ ZONA CRÍTICA ⚠️ Respira. ¿Qué sistema está fallando más?",
            options: [
                {
                    text: "BIOLÓGICO: Mi cuerpo está colapsando (Dolor, debilidad, hambre extrema)",
                    next: "red_bio_path",
                    effects: { necesidadesBio: -30 }
                },
                {
                    text: "SENSORIAL: El entorno me está agrediendo (Ruido, luz, caos)",
                    next: "red_sensory_path",
                    effects: { cargaSensorial: +40 }
                },
                {
                    text: "EMOCIONAL/SOCIAL: Pánico, ira o desesperación incontrolable",
                    next: "red_social_path",
                    effects: { bateriaSocial: -40 }
                }
            ]
        },

        // --- RAMA ROJA: BIOLÓGICA (HP CRITICAL) ---
        red_bio_path: {
            question: "¿Cuál es el síntoma físico principal que te impide funcionar?",
            options: [
                {
                    text: "Furia irracional + Estómago vacío",
                    emotion: null, // Preset: Hanger
                    next: null,
                    effects: { necesidadesBio: -80, cucharas: -20, ansiedadSocial: +20 }
                },
                {
                    text: "Agotamiento total, me siento un cascarón vacío",
                    emotion: null, // Preset: Zombie Mode
                    next: null,
                    effects: { cucharas: -100, dopamina: -40 }
                },
                {
                    text: "Dolor de cabeza punzante o migraña",
                    emotion: null, // Physical State
                    next: null,
                    effects: { cargaSensorial: +70, necesidadesBio: -40 }
                },
                {
                    text: "Náuseas, mareo o ganas de vomitar",
                    emotion: null, // Physical State
                    next: null,
                    effects: { necesidadesBio: -90 }
                },
                {
                    text: "Sensación de gripe, cuerpo cortado o fiebre",
                    emotion: null, // Physical State
                    next: null,
                    effects: { necesidadesBio: -60, cucharas: -50 }
                }
            ]
        },

        // --- RAMA ROJA: SENSORIAL (HEAT CRITICAL) ---
        red_sensory_path: {
            question: "¿Tu sistema nervioso quiere explotar (hacia fuera) o apagarse (hacia dentro)?",
            options: [
                {
                    text: "EXPLOTAR: Gritos, llanto, ganas de romper cosas (Meltdown)",
                    next: "red_meltdown_check",
                    effects: { cargaSensorial: +50, bateriaSocial: -20 }
                },
                {
                    text: "APAGARSE: No puedo hablar, moverme ni pensar (Shutdown)",
                    next: "red_shutdown_check",
                    effects: { cargaSensorial: +50, dopamina: -30 }
                },
                {
                    text: "HUIR: Solo necesito oscuridad y silencio YA",
                    emotion: null, // Preset: Alerta Sensorial
                    next: null,
                    effects: { cargaSensorial: +60 }
                }
            ]
        },
        red_meltdown_check: {
            question: "Estás en Meltdown. ¿La causa es una sobrecarga acumulada?",
            options: [
                {
                    text: "Sí, todo se sumó hasta que estallé",
                    emotion: "overwhelm", // Corresponde a 'overwhelm' en emotions.js
                    next: null,
                    effects: { cargaSensorial: +100, ansiedadSocial: +50, necesidadesBio: -20 }
                },
                {
                    text: "No, fue un evento específico de injusticia",
                    emotion: "justice", // Corresponde a 'justice' en emotions.js
                    next: null,
                    effects: { dopamina: +50, ansiedadSocial: +40, cargaSensorial: +30 }
                }
            ]
        },
        red_shutdown_check: {
            question: "Estás en Shutdown. ¿Te sientes disociado de la realidad?",
            options: [
                {
                    text: "Sí, soy un fantasma, no existo",
                    emotion: null, // Preset: Ghost Mode
                    next: null,
                    effects: { ansiedadSocial: +100, dopamina: -20, cargaSensorial: -10 }
                },
                {
                    text: "No, estoy aquí pero mis procesadores se quemaron",
                    emotion: "burnout", // Corresponde a 'burnout'
                    next: null,
                    effects: { cargaSensorial: +90, cucharas: -20 }
                }
            ]
        },

        // --- RAMA ROJA: SOCIAL/EMOCIONAL (SHIELD CRITICAL) ---
        red_social_path: {
            question: "¿Cuál es la emoción dominante que te está desbordando?",
            options: [
                {
                    text: "Pánico absoluto / Sensación de muerte inminente",
                    emotion: "anxiety", // Mapeado a ansiedad crítica
                    next: null,
                    effects: { ansiedadSocial: +90, necesidadesBio: -20 }
                },
                {
                    text: "Rabia destructiva contra el sistema o alguien",
                    emotion: "justice", // Mapeado a justicia
                    next: null,
                    effects: { dopamina: +50, ansiedadSocial: +40, cargaSensorial: +30 }
                },
                {
                    text: "Vergüenza tóxica / Deseo de desaparecer",
                    emotion: "embarrassment", // Mapeado a vergüenza
                    next: null,
                    effects: { ansiedadSocial: +100, dopamina: -30 }
                }
            ]
        },

        // ==========================================================================================
        // 3. ZONA VERDE (OPTIMIZACIÓN) - EASTER EGGS POSITIVOS 🌟
        // ==========================================================================================
        green_start: {
            question: "¡Excelente! Tienes recursos disponibles. ¿Cómo se siente tu mente ahora mismo?",
            options: [
                {
                    text: "ENFOQUE LÁSER: El tiempo desaparece, soy uno con la tarea",
                    next: "green_flow_state",
                    effects: { dopamina: +20 }
                },
                {
                    text: "CURIOSIDAD EXPLOSIVA: Tengo mil pestañas mentales abiertas",
                    next: "green_curiosity_path",
                    effects: { dopamina: +15 }
                },
                {
                    text: "PAZ TOTAL: Me siento limpio, fresco y tranquilo",
                    next: "green_peace_path",
                    effects: { cargaSensorial: -20, cucharas: +10 }
                }
            ]
        },

        // --- RAMA VERDE: FLOW & GOD MODE ---
        green_flow_state: {
            question: "¿Sientes que estás ejecutando a máxima potencia sin esfuerzo?",
            options: [
                {
                    text: "Sí, nada me detiene. Soy imparable.",
                    emotion: "hyperfocus", // Corresponde a 'hyperfocus'
                    next: null,
                    effects: { dopamina: +100, cucharas: +20, ansiedadSocial: -10, cargaSensorial: -10 }
                },
                {
                    text: "Sí, acabo de tener una revelación increíble (Eureka)",
                    emotion: null, // Easter Egg: Epifanía
                    next: null,
                    effects: { dopamina: +100, necesidadesBio: -10, cucharas: +10 }
                },
                {
                    text: "Sí, pero estoy ignorando mis necesidades físicas...",
                    next: "green_hyperfocus_trap",
                    effects: { necesidadesBio: -20 }
                }
            ]
        },
        green_hyperfocus_trap: {
            question: "⚠️ Cuidado: ¿Tienes ganas de ir al baño o hambre y no vas?",
            options: [
                {
                    text: "Sí, me estoy aguantando para no perder el hilo",
                    emotion: "hyperfocus", // Sigue siendo hiperfoco, aunque tramposo
                    next: null,
                    effects: { necesidadesBio: -50, cucharas: -10, dopamina: +50 }
                },
                {
                    text: "No, tengo mi agua y snacks aquí. Todo bien.",
                    emotion: "hyperfocus", // La hora mágica es un tipo de hiperfoco
                    next: null,
                    effects: { dopamina: +100, cucharas: -10, necesidadesBio: +10 }
                }
            ]
        },

        // --- RAMA VERDE: CURIOSIDAD & ARDILLA ---
        green_curiosity_path: {
            question: "¿Esa curiosidad te lleva a crear o a consumir?",
            options: [
                {
                    text: "A saltar de tema en tema (Wikipedia, Videos, etc.)",
                    emotion: "curiosity", // Corresponde a 'curiosity'
                    next: null,
                    effects: { dopamina: +80, cucharas: -20, necesidadesBio: -30 }
                },
                {
                    text: "A iniciar 5 proyectos a la vez con mucha energía física",
                    emotion: null, // Preset: Modo Ardilla
                    next: null,
                    effects: { dopamina: +90, cargaSensorial: +40, cucharas: -10 }
                },
                {
                    text: "A resolver un problema complejo con claridad",
                    emotion: "curiosity",
                    next: null,
                    effects: { dopamina: +100, cucharas: +10 }
                }
            ]
        },

        // --- RAMA VERDE: PAZ & RECARGA ---
        green_peace_path: {
            question: "¿Qué actividad te llevó a este estado?",
            options: [
                {
                    text: "Hice ejercicio y las endorfinas pegaron",
                    emotion: null, // Preset: Post-Ejercicio
                    next: null,
                    effects: { dopamina: +60, cucharas: +50, necesidadesBio: -20 }
                },
                {
                    text: "Me bañé, me puse ropa cómoda o hice skincare",
                    emotion: null, // Preset: Recién Bañado
                    next: null,
                    effects: { cargaSensorial: -50, dopamina: +60 }
                },
                {
                    text: "Simplemente descansé bien y no tengo pendientes",
                    emotion: null, // Preset: Fresco/Descansado
                    next: null,
                    effects: { cucharas: +100, dopamina: +60 }
                },
                {
                    text: "Estoy relajado, sin más",
                    emotion: "joy", // Corresponde a 'joy' (paz/felicidad)
                    next: null,
                    effects: { dopamina: +50, ansiedadSocial: 0 }
                }
            ]
        },

        // ==========================================================================================
        // 4. ZONA AMARILLA (MANTENIMIENTO / PRESETS COTIDIANOS) 😐
        // ==========================================================================================
        yellow_start: {
            question: "Revisión de rutina. ¿Qué obstáculo estás enfrentando?",
            options: [
                {
                    text: "BLOQUEO: Quiero hacer cosas pero no arranco",
                    next: "yellow_block_path",
                    effects: { dopamina: -20 }
                },
                {
                    text: "ENERGÍA RARA: Cansado pero eléctrico",
                    next: "yellow_wired_path",
                    effects: { cargaSensorial: +20 }
                },
                {
                    text: "MENTE NUBLADA: Me siento lento o tonto",
                    next: "yellow_fog_path",
                    effects: { dopamina: -10 }
                },
                {
                    text: "MOLESTIA FÍSICA LEVE: Algo incomoda",
                    next: "yellow_physical_path",
                    effects: { necesidadesBio: -10 }
                }
            ]
        },

        // --- RAMA AMARILLA: BLOQUEO ---
        yellow_block_path: {
            question: "¿Hay algún evento o cita programada para más tarde?",
            options: [
                {
                    text: "Sí, y no puedo relajarme hasta que pase",
                    emotion: "anxiety", // Waiting mode es una forma de ansiedad
                    next: null,
                    effects: { ansiedadSocial: +40, dopamina: -10 }
                },
                {
                    text: "No, estoy scrolleando en el celular sin parar y me siento mal",
                    emotion: "ennui", // Doomscrolling es aburrimiento tóxico
                    next: null,
                    effects: { dopamina: -30, cargaSensorial: +30, ansiedadSocial: +20 }
                },
                {
                    text: "No, simplemente estoy paralizado frente a la tarea",
                    emotion: "paralysis", // Corresponde a 'paralysis'
                    next: null,
                    effects: { dopamina: -40, cucharas: +10, ansiedadSocial: +20 }
                }
            ]
        },

        // --- RAMA AMARILLA: WIRED / FOG ---
        yellow_wired_path: {
            question: "¿Sientes sueño físico pero tu mente va a mil por hora?",
            options: [
                {
                    text: "Sí, exacto. Estoy 'Wired but Tired'.",
                    emotion: null, // Preset
                    next: null,
                    effects: { dopamina: +80, cucharas: -50, cargaSensorial: +50 }
                },
                {
                    text: "No, es más bien ansiedad social leve",
                    emotion: "anxiety", // Corresponde a 'anxiety'
                    next: null,
                    effects: { ansiedadSocial: +60 }
                }
            ]
        },
        yellow_fog_path: {
            question: "¿Sientes que procesas la información muy lento?",
            options: [
                {
                    text: "Sí, como si tuviera algodón en el cerebro",
                    emotion: null, // Preset: Brain Fog
                    next: null,
                    effects: { dopamina: -30, cucharas: -20 }
                },
                {
                    text: "Sí, y además estoy irritable por hambre/sed",
                    emotion: null, // Preset: Hambre/Sed
                    next: null,
                    effects: { necesidadesBio: -60, dopamina: -10 }
                }
            ]
        },

        // --- RAMA AMARILLA: FÍSICA ---
        yellow_physical_path: {
            question: "¿Qué tipo de molestia es?",
            options: [
                {
                    text: "Tensión en hombros, mandíbula o espalda",
                    emotion: null, // Preset: Tensión Muscular
                    next: null,
                    effects: { cargaSensorial: +40, cucharas: -10 }
                },
                {
                    text: "Estornudos, ojos llorosos, picazón",
                    emotion: null, // Preset: Alergia
                    next: null,
                    effects: { necesidadesBio: -30, cargaSensorial: +55 }
                },
                {
                    text: "Me pesa los párpados, bostezo mucho",
                    emotion: null, // Preset: Sueño Ligero
                    next: null,
                    effects: { cucharas: -40, necesidadesBio: -20 }
                }
            ]
        },

        // ==========================================================================================
        // 5. MODO ANÁLISIS (SCAN PROFUNDO) 🔍
        // ==========================================================================================
        scan_start: {
            question: "Iniciando diagnóstico completo. Fase 1: INTEROCEPCIÓN (Cuerpo). Cierra los ojos. ¿Qué sientes?",
            options: [
                {
                    text: "Cabeza: Dolor, presión o ruido",
                    next: "scan_head",
                    effects: { cucharas: -5 }
                },
                {
                    text: "Pecho/Respiración: Opresión, vacío o agitación",
                    next: "scan_chest",
                    effects: { bateriaSocial: -5 }
                },
                {
                    text: "Estómago: Nudo, ardor o vacío",
                    next: "scan_stomach",
                    effects: { necesidadesBio: -10 }
                },
                {
                    text: "Extremidades: Inquietud, pesadez o tensión",
                    next: "scan_limbs",
                    effects: { cargaSensorial: +5 }
                },
                {
                    text: "Todo se siente irreal (Desconexión)",
                    next: "scan_dissoc_check",
                    effects: { dopamina: -10 }
                }
            ]
        },

        // --- SCAN: CABEZA ---
        scan_head: {
            question: "Detalla la sensación en la cabeza:",
            options: [
                {
                    text: "Dolor pulsátil (Posible migraña o deshidratación)",
                    emotion: null, // Physical State
                    next: null,
                    effects: { necesidadesBio: -40, cargaSensorial: +80 }
                },
                {
                    text: "Mareo o sensación de vértigo",
                    emotion: null, // Physical State
                    next: null,
                    effects: { necesidadesBio: -60, cargaSensorial: +75 }
                },
                {
                    text: "Niebla mental espesa (Brain Fog)",
                    emotion: null, // Preset
                    next: null,
                    effects: { dopamina: -30, cucharas: -20 }
                }
            ]
        },

        // --- SCAN: PECHO ---
        scan_chest: {
            question: "¿La sensación en el pecho es emocional o física?",
            options: [
                {
                    text: "Opresión física por angustia",
                    emotion: "anxiety", // Corresponde a 'anxiety'
                    next: null,
                    effects: { ansiedadSocial: +60 }
                },
                {
                    text: "Vacío profundo (Tristeza/Soledad)",
                    next: "scan_sadness_check",
                    effects: { dopamina: -30 }
                },
                {
                    text: "Falta de aire (Posible ansiedad o fatiga)",
                    emotion: null, // Preset: Fatiga
                    next: null,
                    effects: { cucharas: -50 }
                }
            ]
        },
        scan_sadness_check: {
            question: "¿Ese vacío viene de una interacción social reciente?",
            options: [
                {
                    text: "Sí, siento rechazo (RSD)",
                    emotion: "rsd", // Corresponde a 'rsd'
                    next: null,
                    effects: { ansiedadSocial: +80, dopamina: -40 }
                },
                {
                    text: "No, es un bajón general",
                    emotion: null, // Preset: Resaca Sensorial
                    next: null,
                    effects: { cucharas: -60, cargaSensorial: +20 }
                }
            ]
        },

        // --- SCAN: ESTÓMAGO ---
        scan_stomach: {
            question: "¿Podría ser hambre real?",
            options: [
                {
                    text: "Sí, hace mucho que no como (Hanger)",
                    emotion: null, // Preset: Hanger
                    next: null,
                    effects: { necesidadesBio: -85, cucharas: -20 }
                },
                {
                    text: "No, son náuseas o asco",
                    emotion: null, // Physical State
                    next: null,
                    effects: { necesidadesBio: -90 }
                },
                {
                    text: "Son 'mariposas' de ansiedad (Nudo)",
                    emotion: "anxiety", // Corresponde a 'anxiety'
                    next: null,
                    effects: { ansiedadSocial: +50 }
                }
            ]
        },

        // --- SCAN: EXTREMIDADES ---
        scan_limbs: {
            question: "¿Necesitas moverte o estás demasiado pesado?",
            options: [
                {
                    text: "Necesito moverme (Stimming/Inquietud)",
                    next: "scan_stimming_check",
                    effects: { cargaSensorial: -10 }
                },
                {
                    text: "Estoy demasiado pesado, me cuesta levantarme",
                    emotion: null, // Preset: Fatiga
                    next: null,
                    effects: { cucharas: -70 }
                },
                {
                    text: "Tengo los músculos tensos/rígidos",
                    emotion: null, // Preset: Tensión Muscular
                    next: null,
                    effects: { cargaSensorial: +40 }
                }
            ]
        },
        scan_stimming_check: {
            question: "¿El movimiento es para calmarte o por exceso de energía?",
            options: [
                {
                    text: "Para calmarme (Regulación)",
                    emotion: "stimming", // Corresponde a 'stimming'
                    next: null,
                    effects: { cargaSensorial: -20 }
                },
                {
                    text: "Por exceso de energía (Hiperactividad)",
                    emotion: null, // Preset: Modo Ardilla
                    next: null,
                    effects: { dopamina: +90, cargaSensorial: +40 }
                }
            ]
        },

        // --- SCAN: DISOCIACIÓN ---
        scan_dissoc_check: {
            question: "Fase 2: EXTEROCEPCIÓN. ¿Qué tan real se siente el mundo?",
            options: [
                {
                    text: "Nada real, estoy en el vacío",
                    emotion: null, // Preset: Disociación
                    next: null,
                    effects: { dopamina: 0, cucharas: 10 }
                },
                {
                    text: "Demasiado real e intenso (Luces/Ruidos duelen)",
                    emotion: null, // Preset: Alerta Sensorial
                    next: null,
                    effects: { cargaSensorial: +60 }
                },
                {
                    text: "Normal, pero yo estoy cansado",
                    emotion: null, // Preset: Nominal
                    next: null,
                    effects: { cucharas: 80 }
                }
            ]
        },

        // ==========================================================================================
        // 6. CHECKS FINALES Y RUTAS DE SALIDA
        // ==========================================================================================
        check_bio_maintenance: {
            question: "Check final de mantenimiento: ¿Necesidad biológica urgente?",
            options: [
                {
                    text: "Baño urgente",
                    emotion: null, // Preset: Bio Alert
                    next: null,
                    effects: { necesidadesBio: -90 }
                },
                {
                    text: "Sed intensa",
                    emotion: null, // Preset: Hambre/Sed
                    next: null,
                    effects: { necesidadesBio: -60 }
                },
                {
                    text: "Todo bien",
                    emotion: null, // Preset: Nominal
                    next: null,
                    effects: { necesidadesBio: +10 }
                }
            ]
        }
    }
};
