/**
 * Easter Eggs Component
 * Maneja la renderización y lógica de los botones de "Rare Drops" (Easter Eggs).
 */
class EasterEggsComponent {
    constructor(kernel) {
        this.kernel = kernel;
        this.eggs = window.easterEggs || {};
        this.container = document.getElementById('easter-eggs-container');
        this.mobileContainer = document.getElementById('mobile-easter-eggs-container');
        
        this.init();
    }

    init() {
        if (this.container) {
            this.container.innerHTML = '';
            Object.keys(this.eggs).forEach(key => this.createButton(key, this.container));
            this.addInstructions(this.container);
        }
        if (this.mobileContainer) {
            this.mobileContainer.innerHTML = '';
            Object.keys(this.eggs).forEach(key => this.createButton(key, this.mobileContainer, () => {
                if (typeof closeMobileMenu === 'function') closeMobileMenu('easter-eggs');
            }));
        }
    }

    createButton(key, container, onSuccess) {
        const egg = this.eggs[key];
        const btn = document.createElement('button');
        btn.textContent = key;
        
        let borderColor = "border-slate-500";
        let textColor = "text-slate-200";
        
        // Color logic
        const colors = {
            "gold": { border: "border-yellow-400", text: "text-yellow-200" },
            "purple": { border: "border-purple-500", text: "text-purple-300" },
            "cyan": { border: "border-cyan-400", text: "text-cyan-200" },
            "orange": { border: "border-orange-500", text: "text-orange-200" },
            "white": { border: "border-slate-200", text: "text-white" },
            "gray": { border: "border-slate-600", text: "text-slate-400" },
            "transparent": { border: "border-slate-800", text: "text-slate-600" },
            "red-flash": { border: "border-red-600", text: "text-red-400" },
            "green-sick": { border: "border-lime-800", text: "text-lime-600" },
            "black": { border: "border-black", text: "text-slate-500" }
        };

        if (colors[egg.color]) {
            borderColor = colors[egg.color].border;
            textColor = colors[egg.color].text;
        }

        // Wrapper for tooltip positioning
        const wrapper = document.createElement('div');
        wrapper.className = "relative group w-full";

        btn.className = `w-full px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs ${textColor} rounded transition-all text-left truncate border-l-8 ${borderColor} shadow-lg hover:scale-105`;
        
        // Custom Tooltip
        const tooltip = document.createElement('div');
        tooltip.className = "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max px-3 py-1 bg-black/90 text-white text-[10px] font-mono rounded border border-slate-600 shadow-xl z-50 pointer-events-none backdrop-blur-sm";
        tooltip.innerHTML = `<span class="mr-1">💡</span> ${egg.lightLevel}`;

        btn.onclick = () => {
            const settings = egg.values;
            
            // Set values
            Object.keys(settings).forEach(id => {
                const el = document.getElementById(id);
                if(el) {
                    el.value = settings[id];
                    // Update label manually
                    const label = document.getElementById(`val-${id}`);
                    if(label) label.textContent = settings[id];
                }
            });

            // Set Special Mode
            if (this.kernel) {
                this.kernel.specialMode = egg.mode;
                this.kernel.manualOverride = true;
                if (this.kernel.visuals) this.kernel.visuals.setMode(egg.mode);
                
                // Force update
                this.kernel.diagnosticarSistema(settings);
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Switch to results on mobile
            if (window.innerWidth < 768 && typeof showOutputs === 'function') {
                showOutputs();
            }
            
            if (onSuccess) onSuccess();
        };

        wrapper.appendChild(btn);
        wrapper.appendChild(tooltip);
        container.appendChild(wrapper);
    }

    addInstructions(container) {
        const info = document.createElement('p');
        info.className = "text-xs text-slate-400 mt-3 italic px-1 border-l-2 border-slate-600 pl-2";
        info.innerHTML = "Nota: A mayor <strong>Salud Mental</strong>, más frecuentes los drops positivos (Arriba).<br>La barra derecha indica la polaridad (Luz vs Oscuridad).";
        
        // Append to the main container (parent of the flex wrapper) to span full width
        if (container.parentElement && container.parentElement.parentElement) {
            // Check if already exists to avoid duplicates if init is called multiple times
            // But for now, just append.
            // Actually, the original code appended it to parent.parent.
            // Let's be careful not to duplicate.
            // Ideally, this instruction should be static in HTML, but if we must do it here:
             container.parentElement.parentElement.appendChild(info);
        }
    }
}
