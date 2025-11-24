const sanitize = (value) => {
    if (value === null || value === undefined) return '—';
    const str = typeof value === 'string' ? value : JSON.stringify(value);
    return str.replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char] || char));
};

class StatusReportDB {
    constructor() {
        this.dbPromise = this.init();
    }

    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('brainkernel_reports', 1);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('reports')) {
                    const store = db.createObjectStore('reports', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async transaction(mode, handler) {
        const db = await this.dbPromise;
        return new Promise((resolve, reject) => {
            const tx = db.transaction('reports', mode);
            const store = tx.objectStore('reports');
            const request = handler(store);
            tx.oncomplete = () => resolve(request?.result ?? true);
            tx.onerror = () => reject(tx.error);
        });
    }

    save(report) {
        return this.transaction('readwrite', (store) => store.add(report));
    }

    getAll() {
        return this.transaction('readonly', (store) => store.getAll())
            .then((records) => (records || []).sort((a, b) => b.timestamp - a.timestamp));
    }

    clear() {
        return this.transaction('readwrite', (store) => store.clear());
    }
}

class StatusReportModal {
    constructor() {
        this.modal = null;
        this.listEl = null;
        this.badgeEl = null;
        this.emptyEl = null;
        this.clearBtn = null;
        this.ensureModal();
    }

    ensureModal() {
        if (this.modal) return;

        const container = document.createElement('div');
        container.id = 'status-report-modal';
        container.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300 z-[70] flex items-center justify-center p-4';
        container.innerHTML = `
            <div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full shadow-2xl relative overflow-hidden">
                <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
                    <div>
                        <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Historial</p>
                        <h3 class="text-xl font-bold text-white flex items-center gap-2">
                            <span>🗂️</span> Reportes del Kernel <span id="report-count" class="text-sm text-slate-400"></span>
                        </h3>
                    </div>
                    <div class="flex items-center gap-3">
                        <button id="btn-clear-reports" class="text-xs px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">Limpiar historial</button>
                        <button data-report-close class="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
                    </div>
                </div>
                <div class="px-6 py-4 text-xs text-slate-400 border-b border-slate-800 bg-slate-900/50">
                    Los reportes viven en IndexedDB dentro de tu navegador. Esta vista es una preview y aún no exporta datos.
                </div>
                <div class="max-h-[70vh] overflow-y-auto p-6 space-y-4" id="status-report-list">
                </div>
            </div>
        `;

        document.body.appendChild(container);
        this.modal = container;
        this.listEl = container.querySelector('#status-report-list');
        this.badgeEl = container.querySelector('#report-count');
        this.clearBtn = container.querySelector('#btn-clear-reports');
        const closeBtn = container.querySelector('[data-report-close]');

        closeBtn.addEventListener('click', () => this.close());
        container.addEventListener('click', (event) => {
            if (event.target === container) this.close();
        });
    }

    open() {
        this.modal.classList.remove('hidden');
        requestAnimationFrame(() => this.modal.classList.add('opacity-100'));
    }

    close() {
        if (!this.modal || this.modal.classList.contains('hidden')) return;
        this.modal.classList.remove('opacity-100');
        setTimeout(() => this.modal.classList.add('hidden'), 200);
    }

    renderReports(reports) {
        if (!this.listEl) return;
        if (!reports || !reports.length) {
            this.listEl.innerHTML = `
                <div class="bg-slate-900/60 border border-dashed border-slate-700 rounded-xl p-6 text-center text-slate-500">
                    <p class="text-sm">Aún no hay reportes guardados.</p>
                    <p class="text-xs mt-1">Usa "Guardar Reporte" desde el semáforo para crear uno.</p>
                </div>
            `;
            this.badgeEl.textContent = '(0)';
            return;
        }

        this.badgeEl.textContent = `(${reports.length})`;
        this.listEl.innerHTML = reports.map((report) => this.renderCard(report)).join('');
    }

    renderCard(report) {
        const date = new Date(report.timestamp || Date.now()).toLocaleString();
        const est = sanitize(report.estimulacion) || '—';
        const eje = sanitize(report.ejecutivo) || '—';
        const protocol = sanitize(report.protocolo || 'S/N');
        const special = sanitize(report.specialMode || 'N/A');
        const emotion = sanitize(report.activeEmotion || 'N/A');
        const statusText = sanitize(report.statusText || '---');
        const protocolText = sanitize(report.protocolText || '---');
        const statsEntries = Object.entries(report.stats || {});
        const statsGrid = statsEntries.map(([key, value]) => `
            <div class="flex justify-between text-[11px]">
                <span class="uppercase tracking-widest text-slate-500">${sanitize(key)}</span>
                <span class="text-slate-300 font-semibold">${sanitize(value)}</span>
            </div>
        `).join('');

        return `
            <div class="bg-slate-900/70 border border-slate-800 rounded-xl p-4 shadow-inner shadow-black/40">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-slate-400">
                    <span>${sanitize(date)}</span>
                    <span class="text-slate-200 font-semibold">${statusText}</span>
                </div>
                <div class="grid md:grid-cols-2 gap-2 text-sm text-slate-200 mt-3">
                    <p><span class="text-slate-500 text-xs uppercase tracking-wider">Estímulo:</span> ${est}</p>
                    <p><span class="text-slate-500 text-xs uppercase tracking-wider">Ejecutivo:</span> ${eje}</p>
                    <p><span class="text-slate-500 text-xs uppercase tracking-wider">Protocolo:</span> ${protocol}</p>
                    <p><span class="text-slate-500 text-xs uppercase tracking-wider">Modo Especial:</span> ${special}</p>
                    <p><span class="text-slate-500 text-xs uppercase tracking-wider">Emoción:</span> ${emotion}</p>
                    <p><span class="text-slate-500 text-xs uppercase tracking-wider">Kernel:</span> ${sanitize(report.user?.name || 'Usuario')}</p>
                </div>
                <p class="text-xs text-slate-400 mt-2">${protocolText}</p>
                <details class="mt-3 bg-slate-900/50 border border-slate-800 rounded-lg">
                    <summary class="cursor-pointer text-xs text-slate-300 px-3 py-2 select-none">Ver sensores registrados</summary>
                    <div class="p-3 space-y-1">${statsGrid}</div>
                </details>
            </div>
        `;
    }

    bindClearHandler(handler) {
        if (!this.clearBtn) return;
        this.clearBtn.onclick = handler;
    }
}

export class StatusReportModule {
    constructor(kernel) {
        this.kernel = kernel;
        this.feedbackEl = document.getElementById('report-feedback');
        this.saveBtn = document.getElementById('btn-save-report');
        this.defaultSaveLabel = this.saveBtn?.innerHTML ?? '';
        this.viewBtn = document.getElementById('btn-view-reports');
        this.isSaving = false;
        this.isSupported = typeof indexedDB !== 'undefined';

        if (!this.isSupported) {
            this.disableFeature('IndexedDB no está disponible en este navegador.');
            return;
        }

        this.db = new StatusReportDB();
        this.modal = new StatusReportModal();
        this.attachEvents();
    }

    attachEvents() {
        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                this.handleSave();
            });
        }
        if (this.viewBtn) {
            this.viewBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                this.openModal();
            });
        }
        this.modal.bindClearHandler(() => this.handleClear());
    }

    disableFeature(message) {
        if (this.saveBtn) {
            this.saveBtn.disabled = true;
            this.saveBtn.classList.add('opacity-60');
        }
        if (this.viewBtn) {
            this.viewBtn.disabled = true;
            this.viewBtn.classList.add('opacity-60');
        }
        this.showFeedback(message, true);
    }

    async handleSave() {
        if (this.isSaving) return;
        this.isSaving = true;
        this.toggleSaveButton(true);
        try {
            const snapshot = this.kernel?.getStatusReportSnapshot?.();
            if (!snapshot) {
                this.showFeedback('Aún no hay datos para guardar', true);
                return;
            }
            const statusText = document.getElementById('status-text')?.textContent?.trim() || '---';
            const protocolText = document.getElementById('protocol-text')?.textContent?.trim() || '---';
            const payload = {
                ...snapshot,
                statusText,
                protocolText
            };
            await this.db.save(payload);
            this.showFeedback('Reporte guardado ✓');
        } catch (error) {
            console.error('[StatusReportModule] Error guardando reporte', error);
            this.showFeedback('Error al guardar el reporte', true);
        } finally {
            this.toggleSaveButton(false);
            this.isSaving = false;
        }
    }

    async openModal() {
        try {
            const reports = await this.db.getAll();
            this.modal.renderReports(reports);
            this.modal.open();
        } catch (error) {
            console.error('[StatusReportModule] Error leyendo reportes', error);
            this.showFeedback('No se pudo cargar el historial', true);
        }
    }

    async handleClear() {
        if (!confirm('¿Eliminar todos los reportes guardados?')) return;
        try {
            await this.db.clear();
            this.modal.renderReports([]);
            this.showFeedback('Historial limpiado');
        } catch (error) {
            console.error('[StatusReportModule] Error limpiando historial', error);
            this.showFeedback('No se pudo limpiar el historial', true);
        }
    }

    toggleSaveButton(disabled) {
        if (!this.saveBtn) return;
        this.saveBtn.disabled = disabled;
        this.saveBtn.classList.toggle('opacity-70', disabled);
        if (disabled) {
            this.saveBtn.innerHTML = '<span class="animate-spin">⏳</span> Guardando…';
        } else {
            this.saveBtn.innerHTML = this.defaultSaveLabel;
        }
    }

    showFeedback(message, isError = false) {
        if (!this.feedbackEl) return;
        this.feedbackEl.textContent = message;
        this.feedbackEl.className = `text-[11px] mt-2 ${isError ? 'text-rose-400' : 'text-slate-400'}`;
        clearTimeout(this.feedbackTimeout);
        this.feedbackTimeout = setTimeout(() => {
            this.feedbackEl.textContent = 'Los reportes se almacenan localmente (IndexedDB).';
            this.feedbackEl.className = 'text-[11px] text-slate-500 mt-2';
        }, 3200);
    }
}
