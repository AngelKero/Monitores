/**
 * Motor de Efectos Visuales
 * Gestiona la aplicación de temas y estrategias visuales.
 */

class VisualEngine {
    constructor() {
        this.currentCleanup = null;
        this.overlay = document.getElementById('visual-effects-overlay');
        this.canvas = document.getElementById('effect-canvas');
    }

    setMode(mode) {
        this.stopAll();
        this.applyTheme(mode);

        if (mode && VisualStrategies[mode]) {
            if (this.overlay) this.overlay.classList.remove('hidden');
            this.currentCleanup = VisualStrategies[mode].mount(this.overlay, this.canvas);
        }
    }

    stopAll() {
        if (this.currentCleanup) {
            this.currentCleanup();
            this.currentCleanup = null;
        }
        
        // Clear overlay children except canvas
        if (this.overlay) {
            this.overlay.classList.add('hidden');
            // Keep canvas, remove others
            Array.from(this.overlay.children).forEach(child => {
                if (child.tagName !== 'CANVAS') child.remove();
            });
        }

        // Clear canvas
        if (this.canvas) {
            const ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // Reset body classes (handled by applyTheme(null) implicitly or explicitly)
        // We don't call applyTheme(null) here because stopAll is called inside setMode
        // But if called externally to clear everything, we might want to reset theme.
        // For now, setMode handles the theme reset.
    }

    applyTheme(mode) {
        const cards = document.querySelectorAll('.kernel-card');
        
        cards.forEach(card => {
            // Initialize original bg if not set
            if (!card.dataset.originalBg) {
                if (card.classList.contains('bg-slate-800')) card.dataset.originalBg = 'bg-slate-800';
                else if (card.classList.contains('bg-black')) card.dataset.originalBg = 'bg-black';
                else card.dataset.originalBg = 'bg-slate-800';
            }

            // RESET TO DEFAULT
            // Remove special backgrounds and effects
            card.classList.remove('bg-slate-900/60', 'bg-red-950/90', 'bg-lime-950/90', 'bg-slate-950', 'backdrop-blur-md');
            
            // Remove special borders
            card.classList.remove('border-yellow-400/50', 'border-purple-500/50', 'border-cyan-500/50', 'border-orange-500/50', 'border-white/50', 'border-red-500', 'border-lime-700', 'border-slate-800');
            
            // Restore original BG
            if (!card.classList.contains(card.dataset.originalBg)) {
                card.classList.add(card.dataset.originalBg);
            }
            
            // Restore original Border
            if (!card.classList.contains('border-slate-700')) {
                card.classList.add('border-slate-700');
            }
        });

        if (!mode) return;

        // Helper to apply theme
        const apply = (bgClass, borderClass) => {
            cards.forEach(card => {
                card.classList.remove(card.dataset.originalBg);
                card.classList.remove('border-slate-700');
                
                card.classList.add(...bgClass.split(' '));
                card.classList.add(borderClass);
                
                if (bgClass.includes('/')) {
                    card.classList.add('backdrop-blur-md');
                }
            });
        };

        switch (mode) {
            case 'GOD_MODE':
                apply('bg-slate-900/60', 'border-yellow-400/50');
                break;
            case 'MAGIC_HOUR':
                apply('bg-slate-900/60', 'border-purple-500/50');
                break;
            case 'WIKI_HOLE':
                apply('bg-slate-900/60', 'border-cyan-500/50');
                break;
            case 'JUSTICE_MODE':
                apply('bg-slate-900/60', 'border-orange-500/50');
                break;
            case 'EPIPHANY':
                apply('bg-slate-900/60', 'border-white/50');
                break;
            case 'MELTDOWN':
                apply('bg-red-950/90', 'border-red-500');
                break;
            case 'ZOMBIE_MODE':
                apply('bg-lime-950/90', 'border-lime-700');
                break;
            case 'DOOMSCROLLING':
                apply('bg-black', 'border-slate-800');
                break;
            case 'VOID_MODE':
                apply('bg-slate-950', 'border-slate-800');
                break;
        }
    }
}
