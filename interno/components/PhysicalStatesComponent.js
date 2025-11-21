/**
 * Physical States Component
 * Maneja la renderización y lógica de los botones de "Estados Físicos".
 */
class PhysicalStatesComponent {
    constructor() {
        this.states = window.physicalStates || {};
        this.container = document.getElementById('physical-presets-container');
        this.mobileContainer = document.getElementById('mobile-physical-container');
        
        this.init();
    }

    init() {
        if (this.container) {
            this.container.innerHTML = '';
            Object.keys(this.states).forEach(key => this.createButton(key, this.container));
        }
        if (this.mobileContainer) {
            this.mobileContainer.innerHTML = '';
            Object.keys(this.states).forEach(key => this.createButton(key, this.mobileContainer));
        }
    }

    createButton(key, container) {
        const state = this.states[key];
        const btn = document.createElement('button');
        btn.textContent = key;
        
        let borderColor = "border-slate-500";
        if (state.color === "red") borderColor = "border-red-500";
        if (state.color === "yellow") borderColor = "border-yellow-500";
        if (state.color === "green") borderColor = "border-emerald-500";

        btn.className = `px-3 py-2 bg-slate-700 hover:bg-slate-600 text-xs text-slate-200 rounded transition-colors text-left truncate border-l-4 ${borderColor}`;
        
        btn.onclick = () => this.applyState(state);
        
        container.appendChild(btn);
    }

    applyState(state) {
        const settings = state.values;
        Object.keys(settings).forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.value = settings[id];
                // Trigger input event manually to update UI
                el.dispatchEvent(new Event('input'));
            }
        });

        if (typeof closeMobileMenu === 'function') {
            closeMobileMenu('physical');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
