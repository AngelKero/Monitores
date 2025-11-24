/**
 * System Status Component
 * Maneja la visualización de los estados de Estimulación y Ejecutivo en la UI.
 */
export class SystemStatusComponent {
    constructor() {
        this.elEst = document.getElementById('estado-estimulacion');
        this.elEje = document.getElementById('estado-ejecutivo');
        this.elEffectsContainer = document.getElementById('system-effects-container');
        this.elEffectsList = document.getElementById('active-effects-list');

        this.effectsMap = {
            // Stimulation
            'OPTIMO_FLOW': [{ text: '+20 Focus', type: 'buff' }, { text: '+10 Mood', type: 'buff' }],
            'HIPO_ESTIMULADO': [{ text: '-30 Focus', type: 'debuff' }, { text: 'Buscando Estímulos', type: 'debuff' }],
            'ALERTA_SENSORIAL': [{ text: '-10 HP/sec', type: 'debuff' }, { text: 'Agitado', type: 'debuff' }],
            'SOBRE_ESTIMULADO': [{ text: 'Debuff Silencio', type: 'debuff' }, { text: 'Instinto Huida', type: 'debuff' }],
            'SHUTDOWN': [{ text: 'SYSTEM HALT', type: 'critical' }],
            
            // Executive
            'OPERATIVO': [{ text: 'Ops Normales', type: 'neutral' }],
            'DISPERSO': [{ text: '+50 Velocidad', type: 'buff' }, { text: '-40 Precisión', type: 'debuff' }],
            'FATIGA': [{ text: '-50% Movimiento', type: 'debuff' }],
            'BURNOUT': [{ text: 'Habilidades Bloqueadas', type: 'critical' }],
            'PARALISIS': [{ text: 'Aturdido', type: 'debuff' }],

            // Emotions
            'joy': [{ text: '+10 Creatividad', type: 'buff' }],
            'sadness': [{ text: '-Velocidad', type: 'debuff' }],
            'anger': [{ text: '+50 Fuerza', type: 'buff' }, { text: '-20 Control', type: 'debuff' }],
            'fear': [{ text: 'Alerta Aumentada', type: 'debuff' }],
            'disgust': [{ text: 'Resistencia Veneno', type: 'buff' }],
            'anxiety': [{ text: 'Debuff Pánico', type: 'debuff' }],
            'curiosity': [{ text: '+30 Inteligencia', type: 'buff' }],
            'ennui': [{ text: 'Drenaje Maná', type: 'debuff' }],
            'embarrassment': [{ text: 'Carisma -50', type: 'debuff' }],
            'nostalgia': [{ text: 'Dilatación Temporal', type: 'debuff' }],
            'overwhelm': [{ text: 'Sobrecalentamiento', type: 'critical' }],
            'paralysis': [{ text: 'Velocidad 0', type: 'critical' }],
            'masking': [{ text: 'Sigilo +100', type: 'buff' }, { text: 'Drenaje Resistencia', type: 'debuff' }],
            'burnout': [{ text: 'Fallo Crítico', type: 'critical' }],
            'justice': [{ text: 'Furia Justiciera', type: 'buff' }],
            'stimming': [{ text: 'Regen +5/sec', type: 'buff' }],
            'rsd': [{ text: 'Daño x2', type: 'debuff' }],
            'hyperfocus': [{ text: 'Foco +200', type: 'buff' }, { text: 'Hambre -100', type: 'debuff' }],

            // Protocols
            'SISTEMA NOMINAL': [{ text: 'Estabilidad +100', type: 'buff' }],
            'EVACUACIÓN SOCIAL': [{ text: 'Coste: 10 Crédito Social', type: 'debuff' }],
            'ATERRIZAJE FORZOSO': [{ text: 'Enfriamiento: 8h', type: 'debuff' }],
            'ALIMENTACIÓN EMERGENCIA': [{ text: 'Efecto: Restaurar HP', type: 'buff' }],
            'MANTENIMIENTO BIO': [{ text: 'Prioridad: Crítica', type: 'critical' }],
            'ESCUDO SOCIAL': [{ text: 'Buff: Armadura Social +50', type: 'buff' }],
            'DESCONGELAMIENTO': [{ text: 'Coste: Tiempo', type: 'debuff' }],
            'SQUIRREL MODE': [{ text: 'Multitarea +20', type: 'buff' }, { text: 'Foco -50', type: 'debuff' }],
            'MODO RECUPERACIÓN': [{ text: 'Regen: +10 HP/h', type: 'buff' }],
            'TRAMPA HIPERFOCO': [{ text: 'Debuff: Hambre -100', type: 'debuff' }],
            'WIRED BUT TIRED': [{ text: 'Estado: Sueño Bloqueado', type: 'debuff' }],
            'BUNKER MODE': [{ text: 'Buff: Escudo Sensorial +100', type: 'buff' }],
            'REDUCCIÓN DE RUIDO': [{ text: 'Efecto: Carga -30', type: 'buff' }],
            'CONSERVACIÓN DE ENERGÍA': [{ text: 'Coste: 0', type: 'buff' }],
            'JUMPSTART': [{ text: 'Coste: 20 Energía', type: 'debuff' }],

            // Special Modes (Ultimates) - Ordered by Light/Darkness
            // 🌟 Concentración absoluta (GOD_MODE) - High Positive
            'GOD_MODE': [
                { text: 'Flujo Absoluto', type: 'buff' }, 
                { text: 'Omnipotencia Creativa', type: 'buff' }, 
                { text: 'Límites Desactivados', type: 'buff' },
                { text: 'Velocidad +200%', type: 'buff' },
                { text: 'Resistencia Cansancio', type: 'buff' },
                { text: 'Inspiración Divina', type: 'buff' },
                { text: 'Conexión Universal', type: 'buff' }
            ],
            
            // 🧩 Epifanía (EPIPHANY) - Positive
            'EPIPHANY': [
                { text: 'Claridad Absoluta', type: 'buff' }, 
                { text: 'Conexión Total', type: 'buff' }, 
                { text: 'Solución Instantánea', type: 'buff' },
                { text: 'Visión de Conjunto', type: 'buff' },
                { text: 'Patrones Revelados', type: 'buff' }
            ],

            // 🦉 La Hora Mágica (MAGIC_HOUR) - Positive
            'MAGIC_HOUR': [
                { text: 'Mundo Dormido', type: 'buff' }, 
                { text: 'Cerebro Despierto', type: 'buff' },
                { text: 'Silencio +50', type: 'buff' },
                { text: 'Sin Interrupciones', type: 'buff' },
                { text: 'Fatiga Aumentada', type: 'debuff' },
            ],

            // 🌀 Wiki Hole (WIKI_HOLE) - Neutral/Mixed
            'WIKI_HOLE': [
                { text: 'Espiral de Datos', type: 'neutral' }, 
                { text: 'Hiperfoco Irrelevante', type: 'debuff' }, 
                { text: 'Absorción de Info', type: 'buff' },
                { text: 'Curiosidad Infinita', type: 'buff' }
            ],

            // ⚖️ Furia Justiciera (JUSTICE_MODE) - Neutral/Mixed
            'JUSTICE_MODE': [
                { text: 'Furia Justiciera', type: 'buff' }, 
                { text: 'Sensibilidad Moral', type: 'neutral' }, 
                { text: 'Necesidad de Corregir', type: 'debuff' },
                { text: 'Elocuencia +50', type: 'buff' }
            ],

            // 👻 Ghost Mode (GHOST_MODE) - Negative/Protective
            'GHOST_MODE': [
                { text: 'Invisibilidad Activa', type: 'buff' }, 
                { text: 'Modo Observador', type: 'neutral' }, 
                { text: 'Recargando Social', type: 'buff' }
            ],

            // 😶 Disociación (VOID_MODE) - Negative
            'VOID_MODE': [
                { text: 'Desconexión Segura', type: 'neutral' }, 
                { text: 'Reiniciando Sentimientos', type: 'neutral' }, 
                { text: 'Anclaje Requerido', type: 'debuff' }
            ],

            // 🕸️ Doomscrolling (DOOMSCROLLING) - Negative
            'DOOMSCROLLING': [
                { text: 'Atrapado en Bucle', type: 'debuff' }, 
                { text: 'Drenaje Dopamina', type: 'debuff' }, 
                { text: '¡Suelta el Móvil!', type: 'critical' }
            ],

            // 🧟 Zombie Mode (ZOMBIE_MODE) - Negative
            'ZOMBIE_MODE': [
                { text: 'Cerebro Apagado', type: 'debuff' }, 
                { text: 'Solo Funciones Vitales', type: 'neutral' }, 
                { text: 'Ve a Dormir', type: 'critical' }
            ],

            // 💥 Meltdown Nuclear (MELTDOWN) - Critical
            'MELTDOWN': [
                { text: 'SISTEMA CRÍTICO', type: 'critical' }, 
                { text: 'Sobrecarga Masiva', type: 'critical' }, 
                { text: 'Protocolo: EVACUAR', type: 'critical' }
            ]
        };
    }

    update(est, eje, protocol, emotion) {
        if (this.elEst) {
            this.elEst.textContent = est;
            this.elEst.className = `text-base md:text-lg font-bold break-words ${this.getColorForState(est)}`;
        }
        if (this.elEje) {
            this.elEje.textContent = eje;
            this.elEje.className = `text-base md:text-lg font-bold break-words ${this.getColorForState(eje)}`;
        }

        this.renderEffects(est, eje, protocol, emotion);
    }

    renderEffects(est, eje, protocol, emotion) {
        if (!this.elEffectsList || !this.elEffectsContainer) return;

        const activeEffects = [];
        
        // Collect effects
        if (this.effectsMap[est]) activeEffects.push(...this.effectsMap[est]);
        if (this.effectsMap[eje]) activeEffects.push(...this.effectsMap[eje]);
        if (protocol && this.effectsMap[protocol]) activeEffects.push(...this.effectsMap[protocol]);
        if (emotion && this.effectsMap[emotion]) activeEffects.push(...this.effectsMap[emotion]);

        // Filter duplicates
        const uniqueEffects = [...new Set(activeEffects.map(e => JSON.stringify(e)))].map(e => JSON.parse(e));

        if (uniqueEffects.length === 0) {
            this.elEffectsContainer.classList.add('hidden');
            return;
        }

        this.elEffectsContainer.classList.remove('hidden');
        this.elEffectsList.innerHTML = '';

        uniqueEffects.forEach(effect => {
            const div = document.createElement('div');
            div.className = `text-xs font-mono px-2 py-1 rounded border flex justify-between items-center ${this.getEffectStyle(effect.type)}`;
            div.innerHTML = `<span>${effect.text}</span>`;
            this.elEffectsList.appendChild(div);
        });
    }

    getEffectStyle(type) {
        switch(type) {
            case 'buff': return 'bg-emerald-900/30 border-emerald-800 text-emerald-300';
            case 'debuff': return 'bg-red-900/30 border-red-800 text-red-300';
            case 'critical': return 'bg-red-950 border-red-600 text-red-500 font-bold animate-pulse';
            case 'neutral': return 'bg-slate-800 border-slate-700 text-slate-400';
            default: return 'bg-slate-800 border-slate-700 text-slate-400';
        }
    }

    getColorForState(state) {
        const colors = {
            'HIPO': 'text-blue-400',
            'FLOW': 'text-emerald-400',
            'OVER': 'text-orange-400',
            'CRASH': 'text-red-500',
            'NOISE': 'text-yellow-400',
            'ONLINE': 'text-emerald-400',
            'FROZEN': 'text-blue-400',
            'SQUIRREL': 'text-yellow-400',
            'OFFLINE': 'text-red-500',
            'TIRED': 'text-yellow-400',
            'CRITICAL': 'text-red-600',
            'BIO_HAZARD': 'text-red-600'
        };
        return colors[state] || 'text-white';
    }
}
