export class UserSetupComponent {
    constructor(kernel) {
        this.kernel = kernel;
        this.storageKey = 'brainkernel_user_data';
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
        
        modal.innerHTML = `
            <div class="bg-slate-900 border border-purple-500/50 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(168,85,247,0.2)] transform scale-95 transition-transform duration-500">
                <div class="p-8">
                    <div class="text-center mb-8">
                        <div class="text-5xl mb-4">🧠</div>
                        <h2 class="text-2xl font-bold text-white mb-2">Bienvenido al Kernel</h2>
                        <p class="text-slate-400">Configuración Inicial del Sistema</p>
                    </div>

                    <form id="setup-form" class="space-y-6">
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

                        <button type="submit" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.02]">
                            Inicializar Sistema 🚀
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animation In
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('div').classList.remove('scale-95');
            modal.querySelector('div').classList.add('scale-100');
        });

        // Handle Submit
        const form = modal.querySelector('#setup-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('input-name').value.trim();
            const role = document.getElementById('input-role').value;

            if (name) {
                const userData = { name, role };
                localStorage.setItem(this.storageKey, JSON.stringify(userData));
                this.kernel.setUserData(userData);
                this.closeModal(modal);
                
                // Dispatch event for tutorial
                window.dispatchEvent(new CustomEvent('brainkernel-setup-complete'));
            }
        });
    }

    closeModal(modal) {
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.remove('scale-100');
        modal.querySelector('div').classList.add('scale-95');
        
        setTimeout(() => {
            modal.remove();
        }, 500);
    }
}
