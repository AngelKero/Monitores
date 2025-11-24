export class ConfigComponent {
    constructor(kernel) {
        this.kernel = kernel;
        this.userDataKey = 'brainkernel_user_data';
        this.settings = this.loadSettings();
        this.userData = this.loadUserData();
        this.renderButton();
        this.renderModal();
        this.applySettings();
    }

    loadSettings() {
        const saved = localStorage.getItem('brainkernel_config');
        return saved ? JSON.parse(saved) : {
            audioSource: 'default' // 'default', 'hollow_knight', 'silent'
        };
    }

    saveSettings() {
        localStorage.setItem('brainkernel_config', JSON.stringify(this.settings));
        this.applySettings();
    }

    loadUserData() {
        const saved = localStorage.getItem(this.userDataKey);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (err) {
                console.warn('[ConfigComponent] No se pudo leer brainkernel_user_data. Usando defaults.', err);
            }
        }

        const fallback = this.kernel?.userData || {};
        return {
            name: fallback.name || 'Usuario',
            role: fallback.role || 'Admin',
            spoonCapacity: fallback.spoonCapacity || 12,
            spoonLabel: fallback.spoonLabel || 'Cucharas'
        };
    }

    saveUserData(data) {
        this.userData = { ...this.userData, ...data };
        localStorage.setItem(this.userDataKey, JSON.stringify(this.userData));
        if (this.kernel?.setUserData) {
            this.kernel.setUserData(this.userData);
        }
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
            <div class="bg-slate-800 border border-slate-600 rounded-2xl max-w-4xl w-full shadow-2xl transform scale-95 transition-transform duration-300">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold text-white flex items-center gap-2">
                            <span>⚙️</span> Configuración
                        </h3>
                        <button class="text-slate-400 hover:text-white text-2xl leading-none" onclick="document.getElementById('config-modal').classList.add('hidden'); document.getElementById('config-modal').classList.remove('opacity-100');">&times;</button>
                    </div>

                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="md:w-1/3 bg-slate-900/60 border border-slate-700 rounded-xl p-4 space-y-4">
                            <div>
                                <p class="text-xs uppercase tracking-[0.25em] text-slate-500 mb-3">Paneles</p>
                                <div class="space-y-2">
                                    <button data-tab-target="kernel" class="tab-button w-full flex items-center gap-3 px-3 py-3 rounded-lg border text-left text-sm font-semibold transition-all duration-200">
                                        <span class="text-base">🧠</span>
                                        <div>
                                            <p>Kernel Setup</p>
                                            <p class="text-xs text-slate-300">Perfil principal</p>
                                        </div>
                                        <span class="ml-auto text-[10px] uppercase tracking-widest text-emerald-300">Live</span>
                                    </button>
                                    <button data-tab-target="audio" class="tab-button w-full flex items-center gap-3 px-3 py-3 rounded-lg border text-left text-sm font-semibold transition-all duration-200">
                                        <span class="text-base">🎛️</span>
                                        <div>
                                            <p>Audio Engine</p>
                                            <p class="text-xs text-slate-300">Dinámicas sonoras</p>
                                        </div>
                                        <span class="ml-auto text-[10px] uppercase tracking-widest text-amber-300">Preview</span>
                                    </button>
                                    <button data-tab-target="visual" class="tab-button w-full flex items-center gap-3 px-3 py-3 rounded-lg border text-left text-sm font-semibold transition-all duration-200">
                                        <span class="text-base">🌈</span>
                                        <div>
                                            <p>Visual Modes</p>
                                            <p class="text-xs text-slate-300">Shaders & fondos</p>
                                        </div>
                                        <span class="ml-auto text-[10px] uppercase tracking-widest text-amber-300">Preview</span>
                                    </button>
                                    <button data-tab-target="integrations" class="tab-button w-full flex items-center gap-3 px-3 py-3 rounded-lg border text-left text-sm font-semibold transition-all duration-200">
                                        <span class="text-base">🤝</span>
                                        <div>
                                            <p>Integraciones</p>
                                            <p class="text-xs text-slate-300">APIs y hooks</p>
                                        </div>
                                        <span class="ml-auto text-[10px] uppercase tracking-widest text-amber-300">Preview</span>
                                    </button>
                                    <button data-tab-target="protocols" class="tab-button w-full flex items-center gap-3 px-3 py-3 rounded-lg border text-left text-sm font-semibold transition-all duration-200">
                                        <span class="text-base">🧩</span>
                                        <div>
                                            <p>Protocolos</p>
                                            <p class="text-xs text-slate-300">Prioridades</p>
                                        </div>
                                        <span class="ml-auto text-[10px] uppercase tracking-widest text-amber-300">Preview</span>
                                    </button>
                                </div>
                            </div>

                            <div class="text-xs text-slate-500 bg-slate-900/30 border border-slate-800 rounded-lg p-3">
                                <p class="font-semibold text-slate-300 mb-1">Modo Preview</p>
                                <p>Los paneles con etiqueta Preview aún no alteran el kernel. Solo almacenan ideas y copy.</p>
                            </div>
                        </div>

                        <div class="flex-1 space-y-6">
                            <div data-tab-panel="kernel" class="space-y-6">
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

                                <!-- User Setup Settings -->
                                <div class="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                    <div class="flex items-center justify-between mb-4">
                                        <h4 class="text-sm font-bold text-slate-300 uppercase tracking-wider">🧬 Configuración Inicial</h4>
                                        <span class="text-xs text-slate-500">Perfil del Kernel</span>
                                    </div>
                                    <div class="space-y-4">
                                        <div>
                                            <label for="config-name" class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Nombre</label>
                                            <input id="config-name" type="text" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" placeholder="Ej: Angel" maxlength="32">
                                        </div>
                                        <div>
                                            <label for="config-role" class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Rol / Clase</label>
                                            <select id="config-role" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-all">
                                                <option value="Neuro-Hacker">Neuro-Hacker</option>
                                                <option value="Admin">Administrador</option>
                                                <option value="Piloto">Piloto</option>
                                                <option value="Explorador">Explorador</option>
                                                <option value="Arquitecto">Arquitecto</option>
                                            </select>
                                        </div>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="config-spoons" class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Capacidad de Cucharas</label>
                                                <input id="config-spoons" type="number" min="1" max="100" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-all" placeholder="12">
                                            </div>
                                            <div>
                                                <label for="config-label" class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Etiqueta Personalizada</label>
                                                <input id="config-label" type="text" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-all" placeholder="Cucharas" maxlength="32">
                                            </div>
                                        </div>
                                        <p class="text-xs text-slate-500">Estos campos replican la configuración inicial para que puedas actualizar tu identidad sin reiniciar el tutorial.</p>
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

                            <div data-tab-panel="audio" class="space-y-6 hidden">
                                <div class="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-sm font-bold text-slate-300 uppercase tracking-wider">🎧 Motor de Audio Dinámico</h4>
                                        <span class="text-[10px] text-amber-300 uppercase tracking-widest">Preview</span>
                                    </div>
                                    <p class="text-xs text-slate-400 mb-4">Prototipo sin persistencia. Los valores solo se usan para planear la UX.</p>
                                    <div class="space-y-4">
                                        <div>
                                            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Velocidad de Crossfade</label>
                                            <input id="preview-crossfade" type="range" min="0" max="10" value="5" class="w-full accent-purple-500">
                                            <p class="text-[11px] text-slate-500 mt-1">Controla cuántos segundos tarda en mezclarse una pista con otra.</p>
                                        </div>
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Volumen Base</label>
                                                <input type="number" min="0" max="100" value="65" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white">
                                            </div>
                                            <div>
                                                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Factor Reactivo</label>
                                                <select class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white">
                                                    <option value="dopamina">Dopamina</option>
                                                    <option value="carga">Carga sensorial</option>
                                                    <option value="ansiedad">Ansiedad social</option>
                                                </select>
                                            </div>
                                        </div>
                                        <label class="flex items-center gap-3 text-sm text-slate-300">
                                            <input type="checkbox" class="accent-emerald-500 w-4 h-4" checked>
                                            Activar capas binaurales experimentales
                                        </label>
                                        <label class="flex items-center gap-3 text-sm text-slate-300">
                                            <input type="checkbox" class="accent-purple-500 w-4 h-4">
                                            Autoajustar al modo especial detectado
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div data-tab-panel="visual" class="space-y-6 hidden">
                                <div class="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-sm font-bold text-slate-300 uppercase tracking-wider">🌌 Visual Engine</h4>
                                        <span class="text-[10px] text-amber-300 uppercase tracking-widest">Preview</span>
                                    </div>
                                    <p class="text-xs text-slate-400 mb-4">Explora temas y shaders que podríamos habilitar en futuras versiones.</p>
                                    <div class="space-y-4">
                                        <div>
                                            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Tema Base</label>
                                            <select class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white">
                                                <option value="void">Void Static</option>
                                                <option value="aurora">Aurora Boreal</option>
                                                <option value="neon">Neon Tokyo</option>
                                                <option value="forest">Bosque Sensorial</option>
                                            </select>
                                        </div>
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Intensidad Shader</label>
                                                <input type="range" min="0" max="100" value="45" class="w-full accent-blue-500">
                                            </div>
                                            <div>
                                                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Velocidad de Partículas</label>
                                                <input type="range" min="0" max="100" value="30" class="w-full accent-pink-500">
                                            </div>
                                        </div>
                                        <label class="flex items-center gap-3 text-sm text-slate-300">
                                            <input type="checkbox" class="accent-cyan-500 w-4 h-4" checked>
                                            Habilitar parallax según carga sensorial
                                        </label>
                                        <label class="flex items-center gap-3 text-sm text-slate-300">
                                            <input type="checkbox" class="accent-indigo-500 w-4 h-4">
                                            Sincronizar con ritmo cardíaco (mock)
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div data-tab-panel="integrations" class="space-y-6 hidden">
                                <div class="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-sm font-bold text-slate-300 uppercase tracking-wider">🔗 Integraciones & Hooks</h4>
                                        <span class="text-[10px] text-amber-300 uppercase tracking-widest">Preview</span>
                                    </div>
                                    <p class="text-xs text-slate-400 mb-4">Campos de ejemplo para mapear APIs externas (Notion, Obsidian, sensores, etc.).</p>
                                    <div class="space-y-4">
                                        <div>
                                            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Webhook Principal</label>
                                            <input type="url" placeholder="https://tu-servicio.dev/hook" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white">
                                        </div>
                                        <div>
                                            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">API Key (encriptada)</label>
                                            <input type="password" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white" placeholder="••••••••">
                                        </div>
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Proveedor</label>
                                                <select class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white">
                                                    <option value="notion">Notion</option>
                                                    <option value="obsidian">Obsidian</option>
                                                    <option value="home">Home Assistant</option>
                                                    <option value="custom">Custom REST</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Modo Sync</label>
                                                <select class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white">
                                                    <option value="read">Solo lectura</option>
                                                    <option value="write">Lectura / Escritura</option>
                                                    <option value="push">Push Events</option>
                                                </select>
                                            </div>
                                        </div>
                                        <label class="flex items-center gap-3 text-sm text-slate-300">
                                            <input type="checkbox" class="accent-rose-500 w-4 h-4">
                                            Autorizar protocolos para publicar reportes automáticos
                                        </label>
                                        <label class="flex items-center gap-3 text-sm text-slate-300">
                                            <input type="checkbox" class="accent-emerald-500 w-4 h-4" checked>
                                            Escuchar eventos de sensores físicos
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div data-tab-panel="protocols" class="space-y-6 hidden">
                                <div class="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-sm font-bold text-slate-300 uppercase tracking-wider">🧠 Roadmap de Protocolos</h4>
                                        <span class="text-[10px] text-amber-300 uppercase tracking-widest">Preview</span>
                                    </div>
                                    <p class="text-xs text-slate-400 mb-4">Define prioridades imaginarias para saber qué flujo deberíamos construir después.</p>
                                    <div class="space-y-4">
                                        <div>
                                            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Protocolos clave</label>
                                            <textarea rows="3" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white" placeholder="Ej: WikiHole + Integraciones HomeAssistant"></textarea>
                                        </div>
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <label class="flex items-center gap-3 bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-sm text-slate-200">
                                                <input type="checkbox" class="accent-purple-500 w-4 h-4" checked>
                                                Priorizar modos sociales (Shield, Evacuation)
                                            </label>
                                            <label class="flex items-center gap-3 bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-sm text-slate-200">
                                                <input type="checkbox" class="accent-purple-500 w-4 h-4">
                                                Desarrollar protocolos creativos (Epiphany)
                                            </label>
                                            <label class="flex items-center gap-3 bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-sm text-slate-200">
                                                <input type="checkbox" class="accent-purple-500 w-4 h-4">
                                                Integrar métricas biométricas reales
                                            </label>
                                            <label class="flex items-center gap-3 bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-sm text-slate-200">
                                                <input type="checkbox" class="accent-purple-500 w-4 h-4" checked>
                                                Agregar protocolos de recuperación rápida
                                            </label>
                                        </div>
                                        <div>
                                            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Notas</label>
                                            <input type="text" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white" placeholder="Idea rápida, link, referencia...">
                                        </div>
                                    </div>
                                </div>
                            </div>
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

        const tabButtons = modal.querySelectorAll('[data-tab-target]');
        const tabPanels = modal.querySelectorAll('[data-tab-panel]');
        const activeClasses = ['bg-gradient-to-r', 'from-purple-600/70', 'to-blue-600/40', 'text-white', 'shadow-inner', 'shadow-purple-900/20', 'border-transparent', 'opacity-100'];
        const inactiveClasses = ['bg-slate-900/30', 'text-slate-300', 'border-slate-700', 'opacity-70'];

        const setActiveTab = (targetId) => {
            modal.dataset.activeTab = targetId;
            tabButtons.forEach(btn => {
                const isActive = btn.dataset.tabTarget === targetId;
                btn.classList.remove(...(isActive ? inactiveClasses : activeClasses));
                btn.classList.add(...(isActive ? activeClasses : inactiveClasses));
                btn.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
            tabPanels.forEach(panel => {
                panel.classList.toggle('hidden', panel.dataset.tabPanel !== targetId);
            });
        };

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => setActiveTab(btn.dataset.tabTarget));
        });

        setActiveTab('kernel');

        // Event Listeners
        const saveBtn = modal.querySelector('#btn-save-config');
        saveBtn.onclick = () => {
            const selected = modal.querySelector('input[name="audioSource"]:checked');
            if (selected) {
                this.settings.audioSource = selected.value;
                this.saveSettings();
            }

            const name = modal.querySelector('#config-name').value.trim() || 'Usuario';
            const role = modal.querySelector('#config-role').value;
            const spoonCapacity = Math.min(100, Math.max(1, parseInt(modal.querySelector('#config-spoons').value, 10) || 12));
            const spoonLabel = modal.querySelector('#config-label').value.trim() || 'Cucharas';

            this.saveUserData({ name, role, spoonCapacity, spoonLabel });
            this.closeModal();
        };
    }

    openModal() {
        const modal = document.getElementById('config-modal');
        this.userData = this.loadUserData();
        const inputs = modal.querySelectorAll('input[name="audioSource"]');
        inputs.forEach(input => {
            input.checked = input.value === this.settings.audioSource;
        });

        modal.querySelector('#config-name').value = this.userData.name || '';
        modal.querySelector('#config-role').value = this.userData.role || 'Neuro-Hacker';
        modal.querySelector('#config-spoons').value = this.userData.spoonCapacity || 12;
        modal.querySelector('#config-label').value = this.userData.spoonLabel || 'Cucharas';

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
