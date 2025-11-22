import { decisionGraph } from '../../config/alexithymia.js';
import { emotions } from '../../config/emotions.js';
import { presets } from '../../config/presets.js';
import { easterEggs } from '../../config/easterEggs.js';

export class AlexithymiaModal {
    constructor() {
        this.modal = null;
        this.content = null;
        this.currentColor = null;
        this.currentNode = null;
        this.createModal();
    }

    createModal() {
        // Crear estructura del modal si no existe
        if (document.getElementById('alexithymia-modal')) return;

        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'alexithymia-modal';
        modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-80 z-50 hidden flex items-center justify-center backdrop-blur-sm';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all scale-100';
        
        // Header
        const header = document.createElement('div');
        header.className = 'flex justify-between items-center mb-4';
        
        const title = document.createElement('h3');
        title.id = 'alexithymia-title';
        title.className = 'text-xl font-bold text-white';
        title.textContent = 'Calibración de Sensores';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'text-slate-400 hover:text-white text-2xl font-bold focus:outline-none';
        closeBtn.onclick = () => this.close();

        header.appendChild(title);
        header.appendChild(closeBtn);

        // Body
        const body = document.createElement('div');
        body.id = 'alexithymia-body';
        body.className = 'space-y-4';

        modalContent.appendChild(header);
        modalContent.appendChild(body);
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);

        this.modal = modalOverlay;
        this.content = body;
        this.title = title;
    }

    open(color) {
        // Ya no dependemos del color para la estructura, solo para el estilo inicial
        this.currentColor = color;
        this.modal.classList.remove('hidden');
        
        // Estilos según color (opcional, solo para el título)
        const colorMap = {
            red: 'text-red-400',
            yellow: 'text-yellow-400',
            green: 'text-green-400'
        };
        this.title.className = `text-xl font-bold ${colorMap[color] || 'text-white'}`;
        
        // Siempre iniciamos en el hub principal
        this.renderNode('start');
    }

    close() {
        this.modal.classList.add('hidden');
        this.currentColor = null;
        this.currentNode = null;
    }

    findNode(nodeKey) {
        // Buscar el nodo en cualquier sección del grafo (entry, scan, etc.)
        for (const sectionKey in decisionGraph) {
            if (decisionGraph[sectionKey][nodeKey]) {
                return decisionGraph[sectionKey][nodeKey];
            }
        }
        return null;
    }

    renderNode(nodeKey) {
        const node = this.findNode(nodeKey);
        
        if (!node) {
            console.warn(`[Alexithymia] Nodo no encontrado: ${nodeKey}`);
            this.close();
            return;
        }

        this.content.innerHTML = '';

        // Pregunta
        const questionEl = document.createElement('p');
        questionEl.className = 'text-lg text-slate-200 mb-6 font-medium';
        questionEl.textContent = node.question;
        this.content.appendChild(questionEl);

        // Opciones
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'grid gap-3';

        node.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'w-full p-3 text-left bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors text-slate-300 hover:text-white';
            btn.textContent = option.text;
            btn.onclick = () => this.handleOption(option);
            optionsContainer.appendChild(btn);
        });

        this.content.appendChild(optionsContainer);
    }

    handleOption(option) {
        // 1. Aplicar efectos a sensores si existen
        if (option.effects) {
            this.applyEffects(option.effects);
        }

        // 2. Navegación o Finalización
        if (option.emotion) {
            try {
                this.activateEmotion(option.emotion);
            } catch (e) {
                console.error("[Alexithymia] Error activating emotion:", e);
            }
            this.close();
        } else if (option.next) {
            this.renderNode(option.next);
        } else {
            // Finalización sin emoción (Solo calibración)
            if (window.kernel && window.kernel.logger) {
                 window.kernel.logger.add(`✅ Sensores calibrados. Sin emoción específica.`, 'success');
            }
            this.close();
        }
    }

    applyEffects(effects) {
        let changed = false;

        Object.entries(effects).forEach(([sensorId, delta]) => {
            const input = document.getElementById(sensorId);
            if (input) {
                let currentVal = parseInt(input.value) || 0;
                let newVal = Math.max(0, Math.min(100, currentVal + delta));
                
                if (currentVal !== newVal) {
                    input.value = newVal;
                    // Actualizar label visual si existe
                    const label = document.getElementById(`val-${sensorId}`);
                    if (label) label.textContent = newVal;
                    changed = true;
                }
            }
        });

        if (changed && window.updateSimulation) {
            window.updateSimulation();
        }
    }

    activateEmotion(key) {
        console.log(`[Alexithymia] Procesando resultado: ${key}`);
        
        if (!window.kernel) return;

        // 1. Check Emotions
        if (emotions[key]) {
            console.log(`[Alexithymia] Es una emoción: ${key}`);
            window.kernel.activeEmotion = key;
            window.kernel.manualOverride = true;
            if (window.kernel.logger) {
                window.kernel.logger.add(`🔍 Diagnóstico: ${emotions[key].name}`, 'success');
            }
        } 
        // 2. Check Presets
        else if (presets[key]) {
             console.log(`[Alexithymia] Es un preset: ${key}`);
             this.applyPreset(presets[key]);
             if (window.kernel.logger) {
                window.kernel.logger.add(`🔄 Preset aplicado: ${key}`, 'info');
            }
        }
        // 3. Check Easter Eggs
        else if (easterEggs[key]) {
             console.log(`[Alexithymia] Es un Easter Egg: ${key}`);
             this.applyPreset(easterEggs[key].values);
             if (window.kernel.logger) {
                window.kernel.logger.add(`🥚 Easter Egg desbloqueado: ${key}`, 'warning');
            }
        }
        else {
            console.warn(`[Alexithymia] Clave desconocida: ${key}`);
            if (window.kernel.logger) {
                window.kernel.logger.add(`⚠️ Resultado desconocido: ${key}`, 'error');
            }
        }

        // Update everything
        if (window.updateSimulation) window.updateSimulation();
        if (window.emotionsComponent) window.emotionsComponent.updateButtons();
    }

    applyPreset(values) {
        Object.entries(values).forEach(([sensorId, val]) => {
            const input = document.getElementById(sensorId);
            if (input) {
                input.value = val;
                const label = document.getElementById(`val-${sensorId}`);
                if (label) label.textContent = val;
            }
        });
    }
}
