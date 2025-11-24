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

const csvEscape = (value) => {
    const str = `${value ?? ''}`.replace(/"/g, '""');
    if (str.search(/([",\n])/g) >= 0) {
        return `"${str}"`;
    }
    return str;
};

const getTrafficState = (statusText = '') => {
    const text = statusText.toUpperCase();
    if (text.includes('CRIT') || text.includes('FAIL') || text.includes('MELTDOWN')) return 'critical';
    if (text.includes('PRECA') || text.includes('ALERTA') || text.includes('WARNING')) return 'warning';
    return 'nominal';
};

const renderTrafficLight = (state) => {
    const base = 'w-3 h-3 rounded-full transition-all duration-300';
    const styles = {
        critical: ['bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] opacity-100', 'bg-rose-900/40 opacity-40', 'bg-rose-900/40 opacity-40'],
        warning: ['bg-amber-900/40 opacity-40', 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] opacity-100', 'bg-amber-900/40 opacity-40'],
        nominal: ['bg-emerald-900/40 opacity-40', 'bg-emerald-900/40 opacity-40', 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)] opacity-100']
    };
    const [red, yellow, green] = styles[state] || styles.nominal;
    return `
        <div class="flex gap-1 items-center">
            <span class="${base} ${red}"></span>
            <span class="${base} ${yellow}"></span>
            <span class="${base} ${green}"></span>
        </div>
    `;
};

const statColorClass = (value) => {
    const num = Number(value);
    if (Number.isNaN(num)) return 'bg-slate-900/60 text-slate-200';
    if (num >= 70) return 'bg-rose-500/20 text-rose-200 border border-rose-500/30';
    if (num >= 40) return 'bg-amber-500/10 text-amber-200 border border-amber-400/30';
    return 'bg-emerald-500/10 text-emerald-200 border border-emerald-400/30';
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
        this.exportBtn = null;
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
                            <button id="btn-export-reports-modal" class="text-xs px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-200 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors">Exportar CSV</button>
                        <button id="btn-clear-reports" class="text-xs px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">Limpiar historial</button>
                        <button data-report-close class="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
                    </div>
                </div>
                <div class="px-6 py-4 text-xs text-slate-400 border-b border-slate-800 bg-slate-900/50">
                        Los reportes viven en IndexedDB dentro de tu navegador. Puedes exportarlos a CSV para compartir con profesionales.
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
        this.exportBtn = container.querySelector('#btn-export-reports-modal');
        this.toggleExportAvailability(false);
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
            this.toggleExportAvailability(false);
            this.listEl.innerHTML = `
                <div class="bg-slate-900/60 border border-dashed border-slate-700 rounded-xl p-6 text-center text-slate-500">
                    <p class="text-sm">Aún no hay reportes guardados.</p>
                    <p class="text-xs mt-1">Usa "Guardar Reporte" desde el semáforo para crear uno.</p>
                </div>
            `;
            this.badgeEl.textContent = '(0)';
            return;
        }

        this.toggleExportAvailability(true);
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
        const trafficState = getTrafficState(report.statusText);
        const statusChipClass = trafficState === 'critical'
            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            : trafficState === 'warning'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30';
        const statsEntries = Object.entries(report.stats || {});
        const statsGrid = statsEntries.map(([key, value]) => `
            <div class="rounded-lg px-3 py-2 text-xs ${statColorClass(value)}">
                <p class="uppercase tracking-[0.2em] text-[10px] text-slate-400">${sanitize(key)}</p>
                <p class="text-sm font-semibold">${sanitize(value)}</p>
            </div>
        `).join('');

        return `
            <div class="bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p class="text-[11px] uppercase tracking-[0.3em] text-slate-500">${sanitize(date)}</p>
                        <h4 class="text-lg font-bold text-white flex items-center gap-3">${statusText} ${renderTrafficLight(trafficState)}</h4>
                        <p class="text-xs text-slate-400 mt-1">${protocolText}</p>
                    </div>
                    <div class="flex flex-col items-start md:items-end gap-2 text-xs">
                        <span class="px-3 py-1 rounded-full ${statusChipClass}">Semáforo: ${trafficState.toUpperCase()}</span>
                        <span class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Kernel: ${sanitize(report.user?.name || 'Usuario')}</span>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-3 text-sm text-white mt-4">
                    <div class="bg-slate-900/60 rounded-xl p-3 border border-slate-800">
                        <p class="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">Estímulo</p>
                        <p class="text-lg font-semibold text-emerald-300">${est}</p>
                    </div>
                    <div class="bg-slate-900/60 rounded-xl p-3 border border-slate-800">
                        <p class="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">Ejecutivo</p>
                        <p class="text-lg font-semibold text-sky-300">${eje}</p>
                    </div>
                    <div class="bg-slate-900/60 rounded-xl p-3 border border-slate-800">
                        <p class="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">Protocolo</p>
                        <p class="text-base font-semibold text-purple-200">${protocol}</p>
                    </div>
                    <div class="bg-slate-900/60 rounded-xl p-3 border border-slate-800">
                        <p class="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">Modo Especial / Emoción</p>
                        <p class="text-base font-semibold text-pink-200">${special} · ${emotion}</p>
                    </div>
                </div>

                <div class="mt-5">
                    <p class="text-[11px] uppercase tracking-[0.4em] text-slate-500 mb-2">Sensores registrados</p>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">${statsGrid}</div>
                </div>
            </div>
        `;
    }

    bindClearHandler(handler) {
        if (!this.clearBtn) return;
        this.clearBtn.onclick = handler;
    }

    bindExportHandler(handler) {
        if (!this.exportBtn) return;
        this.exportBtn.onclick = (event) => {
            event.stopPropagation();
            handler(event);
        };
    }

    toggleExportAvailability(enabled) {
        if (!this.exportBtn) return;
        this.exportBtn.disabled = !enabled;
        this.exportBtn.classList.toggle('opacity-60', !enabled);
    }
}

export class StatusReportModule {
    constructor(kernel) {
        this.kernel = kernel;
        this.feedbackEl = document.getElementById('report-feedback');
        this.saveBtn = document.getElementById('btn-save-report');
        this.defaultSaveLabel = this.saveBtn?.innerHTML ?? '';
        this.viewBtn = document.getElementById('btn-view-reports');
        this.modal = new StatusReportModal();
        this.isSaving = false;
        this.isSupported = typeof indexedDB !== 'undefined';

        if (!this.isSupported) {
            this.disableFeature('IndexedDB no está disponible en este navegador.');
            return;
        }

        this.db = new StatusReportDB();
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
        this.modal.bindExportHandler(() => this.exportReports());
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
        this.modal.toggleExportAvailability(false);
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

    async exportReports() {
        try {
            const reports = await this.db.getAll();
            if (!reports.length) {
                this.showFeedback('No hay reportes para exportar', true);
                return;
            }
            const headers = [
                'Fecha Registro',
                'Nivel Estímulo',
                'Nivel Ejecutivo',
                'Protocolo Activo',
                'Modo Especial',
                'Crisis Detectada',
                'Emoción Activa',
                'Estado Semáforo',
                'Descripción Estado',
                'Descripción Técnica',
                'Usuario',
            ];

            const sensorKeys = Object.keys(reports[0].stats || {});
            const allSensorKeys = new Set(sensorKeys);
            reports.forEach(r => Object.keys(r.stats || {}).forEach(k => allSensorKeys.add(k)));
            const sensorList = Array.from(allSensorKeys);
            const fullHeaders = headers.concat(sensorList.map(key => `Sensor: ${key}`));

            const rows = reports.map(report => {
                const trafficState = getTrafficState(report.statusText);
                const crisis = this.getCrisisAnnotation(report.specialMode, trafficState);
                const base = [
                    new Date(report.timestamp || Date.now()).toISOString(),
                    report.estimulacion || '—',
                    report.ejecutivo || '—',
                    report.protocolo || 'S/N',
                    report.specialMode || 'N/A',
                    crisis,
                    report.activeEmotion || 'N/A',
                    trafficState.toUpperCase(),
                    report.statusText || '---',
                    report.protocolText || '---',
                    report.user?.name || 'Usuario'
                ];

                const sensorValues = sensorList.map(key => (report.stats?.[key] ?? '')); 
                return base.concat(sensorValues).map(csvEscape);
            });

            const csvContent = [fullHeaders.map(csvEscape).join(','), ...rows.map(row => row.join(','))].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const date = new Date().toISOString().split('T')[0];
            link.href = url;
            link.download = `kernel_reports_${date}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            this.showFeedback('Exportación lista (CSV compatible con Excel)');
        } catch (error) {
            console.error('[StatusReportModule] Error exportando reportes', error);
            this.showFeedback('No se pudo exportar el historial', true);
        }
    }

    getCrisisAnnotation(specialMode = '', trafficState = 'nominal') {
        const mode = (specialMode || '').toUpperCase();
        const meltdownModes = ['MELTDOWN', 'DOOMSCROLLING', 'BUNKER_MODE'];
        const dissociationModes = ['VOID_MODE', 'GHOST_MODE', 'ZOMBIE_MODE'];
        if (meltdownModes.includes(mode)) return 'Meltdown / Crisis Abierta';
        if (dissociationModes.includes(mode)) return 'Disociación / Apagón';
        if (trafficState === 'critical') return 'Riesgo Alto (Bio o Ansiedad)';
        if (trafficState === 'warning') return 'Estado Inestable';
        return 'Sin crisis registrada';
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
