export class ConfigComponent {
    constructor(kernel) {
        this.kernel = kernel;
        this.settings = this.loadSettings();
        this.renderButton();
        this.renderModal();
        this.applySettings();
    }

    loadSettings() {
        const saved = localStorage.getItem('angel_kernel_config');
        return saved ? JSON.parse(saved) : {
            audioSource: 'default' // 'default', 'hollow_knight', 'silent'
        };
    }

    saveSettings() {
        localStorage.setItem('angel_kernel_config', JSON.stringify(this.settings));
        this.applySettings();
    }

    applySettings() {
        if (this.kernel.sound && this.kernel.sound.setSource) {
            this.kernel.sound.setSource(this.settings.audioSource);
        }
    }

    renderButton() {
        // Create a fixed button in the top-right corner
        const btn = document.createElement('button');
        btn.innerHTML = '⚙️';
        btn.className = 'fixed top-4 right-4 z-50 text-3xl p-2 bg-slate-800/80 backdrop-blur rounded-full hover:rotate-90 transition-all duration-500 cursor-pointer shadow-lg border border-slate-600 hover:bg-slate-700';
        btn.title = 'Configuración';
        btn.onclick = () => this.openModal();
        
        document.body.appendChild(btn);
    }

    renderModal() {
        const modal = document.createElement('div');
        modal.id = 'config-modal';
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm hidden flex items-center justify-center z-50 p-4 opacity-0 transition-opacity duration-300';
        
        modal.innerHTML = `
            <div class="bg-slate-800 border border-slate-600 rounded-2xl max-w-md w-full shadow-2xl transform scale-95 transition-transform duration-300">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold text-white flex items-center gap-2">
                            <span>⚙️</span> Configuración
                        </h3>
                        <button class="text-slate-400 hover:text-white text-2xl leading-none" onclick="document.getElementById('config-modal').classList.add('hidden'); document.getElementById('config-modal').classList.remove('opacity-100');">&times;</button>
                    </div>

                    <div class="space-y-6">
                        <!-- Audio Settings -->
                        <div class="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <h4 class="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">🔊 Audio Source</h4>
                            <div class="space-y-2">
                                <label class="flex items-center gap-3 p-2 rounded hover:bg-slate-800 cursor-pointer transition-colors">
                                    <input type="radio" name="audioSource" value="default" class="accent-purple-500 w-4 h-4">
                                    <span class="text-slate-300">Generativo (Default)</span>
                                </label>
                                <label class="flex items-center gap-3 p-2 rounded hover:bg-slate-800 cursor-pointer transition-colors">
                                    <input type="radio" name="audioSource" value="hollow_knight" class="accent-blue-500 w-4 h-4">
                                    <span class="text-slate-300">Hollow Knight OST</span>
                                </label>
                                <label class="flex items-center gap-3 p-2 rounded hover:bg-slate-800 cursor-pointer transition-colors">
                                    <input type="radio" name="audioSource" value="silent" class="accent-red-500 w-4 h-4">
                                    <span class="text-slate-300">Silencio (Desactivado)</span>
                                </label>
                            </div>
                        </div>

                        <!-- Links -->
                        <div class="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <h4 class="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">📚 Documentación</h4>
                            <a href="guide.html" class="flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition-colors text-blue-400 hover:text-blue-300">
                                <span>📖</span>
                                <span>Ver Manual de Estados</span>
                                <span class="ml-auto text-xs">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-900/50 p-4 rounded-b-2xl border-t border-slate-700 text-right">
                    <button id="btn-save-config" class="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-900/20">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event Listeners
        const saveBtn = modal.querySelector('#btn-save-config');
        saveBtn.onclick = () => {
            const selected = modal.querySelector('input[name="audioSource"]:checked');
            if (selected) {
                this.settings.audioSource = selected.value;
                this.saveSettings();
                this.closeModal();
            }
        };
    }

    openModal() {
        const modal = document.getElementById('config-modal');
        const inputs = modal.querySelectorAll('input[name="audioSource"]');
        inputs.forEach(input => {
            input.checked = input.value === this.settings.audioSource;
        });

        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            modal.classList.add('opacity-100');
            modal.querySelector('div').classList.remove('scale-95');
            modal.querySelector('div').classList.add('scale-100');
        }, 10);
    }

    closeModal() {
        const modal = document.getElementById('config-modal');
        modal.classList.remove('opacity-100');
        modal.querySelector('div').classList.remove('scale-100');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}
