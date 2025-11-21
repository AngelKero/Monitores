import { emotions } from '../../config/emotions.js';

/**
 * Emotions Component
 * Maneja la renderización y lógica de los botones de emociones (Inside Out).
 */
export class EmotionsComponent {
    constructor(kernel) {
        this.kernel = kernel;
        this.emotions = emotions || {};
        this.container = document.getElementById('emotions-container');
        
        this.init();
    }

    init() {
        if (this.container) {
            this.container.innerHTML = '';
            Object.keys(this.emotions).forEach(key => this.createButton(key));
        }
    }

    createButton(key) {
        const emo = this.emotions[key];
        const btn = document.createElement('button');
        
        // Initial State (Inactive)
        btn.className = `flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2 ${emo.inactive}`;
        btn.innerHTML = `<span>${emo.label}</span> <span>${emo.name}</span>`;
        btn.dataset.key = key;
        
        btn.onclick = () => this.toggleEmotion(key);
        
        this.container.appendChild(btn);
    }

    toggleEmotion(key) {
        if (this.kernel.activeEmotion === key) {
            this.kernel.activeEmotion = null;
        } else {
            this.kernel.activeEmotion = key;
        }
        
        this.updateButtons();
        
        // Trigger simulation update
        if (typeof updateSimulation === 'function') {
            updateSimulation();
        }
    }

    updateButtons() {
        if (!this.container) return;
        
        const buttons = this.container.querySelectorAll('button');
        buttons.forEach(btn => {
            const key = btn.dataset.key;
            const emo = this.emotions[key];
            
            if (key === this.kernel.activeEmotion) {
                // Active State
                btn.className = `flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2 scale-105 shadow-lg ${emo.active}`;
            } else {
                // Inactive State
                btn.className = `flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2 opacity-70 hover:opacity-100 ${emo.inactive}`;
            }
        });
    }
}
