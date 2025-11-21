import { presets } from '../../config/presets.js';

/**
 * Presets Component
 * Maneja la renderización y lógica de los botones de "Simular Casos".
 */
export class PresetsComponent {
    constructor(kernel) {
        this.kernel = kernel;
        this.presets = presets || {};
        this.container = document.getElementById('presets-container');
        this.mobileContainer = document.getElementById('mobile-presets-container');
        
        this.init();
    }

    init() {
        if (this.container) {
            this.container.innerHTML = ''; // Clean previous
            Object.keys(this.presets).forEach(key => this.createButton(key, this.container));
        }
        if (this.mobileContainer) {
            this.mobileContainer.innerHTML = ''; // Clean previous
            Object.keys(this.presets).forEach(key => this.createButton(key, this.mobileContainer));
        }
    }

    createButton(key, container) {
        const btn = document.createElement('button');
        btn.textContent = key;
        btn.className = "px-3 py-2 bg-slate-700 hover:bg-slate-600 text-xs text-slate-200 rounded transition-colors text-left truncate";
        
        btn.onclick = () => this.applyPreset(key);
        
        container.appendChild(btn);
    }

    applyPreset(key) {
        const settings = this.presets[key];
        if (!settings) return;

        Object.keys(settings).forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.value = settings[id];
                // Trigger input event manually to update UI
                el.dispatchEvent(new Event('input'));
            }
        });

        // Close mobile menu via event
        window.dispatchEvent(new CustomEvent('request-close-mobile-menu', { detail: { menu: 'presets' } }));

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
