export class UserSetupComponent {
    constructor(kernel) {
        this.kernel = kernel;
        this.storageKey = 'brainkernel_user_data';
        this.tempData = {};
        this.init();
    }

    init() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.kernel.setUserData(data);
            } catch (e) {
                console.error("Error parsing user data", e);
                this.renderModal();
            }
        } else {
            this.renderModal();
        }
    }

    renderModal() {
        const modal = document.createElement('div');
        modal.id = 'user-setup-modal';
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[60] p-4 opacity-0 transition-opacity duration-500';
        
        // Container for dynamic content
        modal.innerHTML = `
            <div id="setup-content" class="bg-slate-900 border border-purple-500/50 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(168,85,247,0.2)] transform scale-95 transition-transform duration-500 overflow-hidden relative">
                <!-- Content injected by JS -->
            </div>
        `;

        document.body.appendChild(modal);

        // Animation In
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('#setup-content').classList.remove('scale-95');
            modal.querySelector('#setup-content').classList.add('scale-100');
        });

        this.renderStep1(modal);
    }

    renderStep1(modal) {
        const container = modal.querySelector('#setup-content');
        container.innerHTML = `
            <div class="p-8 animate-fade-in">
                <div class="text-center mb-8">
                    <div class="text-5xl mb-4">🧠</div>
                    <h2 class="text-2xl font-bold text-white mb-2">Bienvenido al Kernel</h2>
                    <p class="text-slate-400">Configuración Inicial del Sistema (1/2)</p>
                </div>

                <form id="step1-form" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-purple-300 mb-2">Nombre del Usuario</label>
                        <input type="text" id="input-name" required placeholder="Ej: Angel, Alex, Viajero..." 
                            class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-blue-300 mb-2">Rol / Clase</label>
                        <select id="input-role" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-all">
                            <option value="Neuro-Hacker">Neuro-Hacker</option>
                            <option value="Admin">Administrador</option>
                            <option value="Piloto">Piloto</option>
                            <option value="Explorador">Explorador</option>
                            <option value="Arquitecto">Arquitecto</option>
                        </select>
                    </div>

                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg transition-all transform hover:scale-[1.02]">
                        Siguiente ➡️
                    </button>
                </form>
            </div>
        `;

        const form = container.querySelector('#step1-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('input-name').value.trim();
            const role = document.getElementById('input-role').value;

            if (name) {
                this.tempData = { ...this.tempData, name, role };
                this.renderStep2(modal);
            }
        });
    }

    renderStep2(modal) {
        const container = modal.querySelector('#setup-content');
        // Simple fade transition effect could be added here
        container.innerHTML = `
            <div class="p-8 animate-fade-in">
                <div class="text-center mb-6">
                    <div class="text-4xl mb-2">🥄</div>
                    <h2 class="text-xl font-bold text-yellow-400 mb-1">Teoría de las Cucharas</h2>
                    <p class="text-slate-500 text-xs uppercase tracking-widest">Gestión de Energía (2/2)</p>
                </div>

                <div class="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-6 text-sm text-slate-300 leading-relaxed">
                    <p class="mb-2">
                        La <strong>Teoría de las Cucharas</strong> explica que las personas neurodivergentes o con condiciones crónicas tienen una cantidad limitada de energía ("cucharas") diaria.
                    </p>
                    <p>
                        Cada acción (bañarse, trabajar, socializar) cuesta una cuchara. Cuando se acaban, entras en <em>Burnout</em>.
                        No todas las cucharas son iguales; algunas actividades cuestan más que otras.
                    </p>
                    <p class="mt-4">
                        En este paso, define cuántas cucharas tienes normalmente y cómo te gustaría llamarlas.
                    </p>
                </div>

                <form id="step2-form" class="space-y-5">
                    <div>
                        <label class="block text-sm font-medium text-yellow-300 mb-2">¿Cuántas cucharas tienes hoy?</label>
                        <div class="flex items-center gap-4">
                            <input type="number" id="input-capacity" required min="1" max="100" value="12" 
                                class="w-24 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-center font-bold focus:outline-none focus:border-yellow-500 transition-all">
                            <span class="text-slate-400 text-sm">Unidades totales</span>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-2">Renombrar unidad (Opcional)</label>
                        <input type="text" id="input-label" placeholder="Ej: Mana, Batería, HP..." value="Cucharas"
                            class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-all">
                        <p class="text-xs text-slate-500 mt-1">Si prefieres usar otro término para tu energía.</p>
                    </div>

                    <div class="flex gap-3 pt-2">
                        <button type="button" id="btn-back" class="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-3 rounded-lg transition-colors">
                            ⬅️ Volver
                        </button>
                        <button type="submit" class="flex-[2] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.02]">
                            Inicializar Sistema 🚀
                        </button>
                    </div>
                </form>
            </div>
        `;

        const form = container.querySelector('#step2-form');
        const btnBack = container.querySelector('#btn-back');

        btnBack.addEventListener('click', () => {
            this.renderStep1(modal);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const capacity = parseInt(document.getElementById('input-capacity').value) || 12;
            const label = document.getElementById('input-label').value.trim() || "Cucharas";

            this.tempData = { 
                ...this.tempData, 
                spoonCapacity: capacity,
                spoonLabel: label 
            };

            this.finishSetup(modal);
        });
    }

    finishSetup(modal) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tempData));
        this.kernel.setUserData(this.tempData);
        this.closeModal(modal);
        
        // Dispatch event for tutorial
        window.dispatchEvent(new CustomEvent('brainkernel-setup-complete'));
    }

    closeModal(modal) {
        modal.classList.add('opacity-0');
        modal.querySelector('#setup-content').classList.remove('scale-100');
        modal.querySelector('#setup-content').classList.add('scale-95');
        
        setTimeout(() => {
            modal.remove();
        }, 500);
    }
}
