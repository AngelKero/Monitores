/**
 * Responsive Controller
 * Maneja la lógica de navegación móvil y menús laterales.
 */
export class ResponsiveController {
    constructor() {
        this.initListeners();
        this.initGlobalListeners();
    }

    initListeners() {
        // Mobile Nav Buttons
        this.bindClick('btn-mobile-presets', () => this.openMenu('presets'));
        this.bindClick('btn-mobile-physical', () => this.openMenu('physical'));
        this.bindClick('btn-mobile-easter-eggs', () => this.openMenu('easter-eggs'));

        // Navigation Buttons
        this.bindClick('btn-mobile-show-outputs', () => this.showOutputs());
        this.bindClick('btn-mobile-show-inputs', () => this.showInputs());

        // Close Buttons & Backdrops
        ['presets', 'physical', 'easter-eggs'].forEach(menu => {
            this.bindClick(`btn-close-mobile-${menu}`, () => this.closeMenu(menu));
            this.bindClick(`backdrop-mobile-${menu}`, () => this.closeMenu(menu));
        });
    }

    initGlobalListeners() {
        // Listen for events from other components
        window.addEventListener('request-close-mobile-menu', (e) => {
            if (e.detail && e.detail.menu) {
                this.closeMenu(e.detail.menu);
            }
        });
        
        window.addEventListener('request-show-outputs', () => {
            this.showOutputs();
        });
    }

    bindClick(id, handler) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', handler);
        }
    }

    showOutputs() {
        const inputs = document.getElementById('panel-inputs');
        const outputs = document.getElementById('panel-outputs');
        
        if (inputs) inputs.classList.add('hidden');
        if (outputs) outputs.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    showInputs() {
        const inputs = document.getElementById('panel-inputs');
        const outputs = document.getElementById('panel-outputs');
        
        if (outputs) outputs.classList.add('hidden');
        if (inputs) inputs.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    openMenu(menuName) {
        const menu = document.getElementById(`mobile-menu-${menuName}`);
        const content = document.getElementById(`mobile-menu-${menuName}-content`);
        if (menu && content) {
            menu.classList.remove('hidden');
            setTimeout(() => {
                content.classList.remove('-translate-x-full');
            }, 10);
        }
    }

    closeMenu(menuName) {
        const menu = document.getElementById(`mobile-menu-${menuName}`);
        const content = document.getElementById(`mobile-menu-${menuName}-content`);
        if (menu && content) {
            content.classList.add('-translate-x-full');
            setTimeout(() => {
                menu.classList.add('hidden');
            }, 300);
        }
    }
}
