/**
 * Kernel Log Component
 * Maneja la visualización de la consola de logs del sistema.
 */
export class KernelLogComponent {
    constructor() {
        this.logs = [];
        this.lastLogsHash = "";
        this.containerId = 'console-output';
    }

    /**
     * Agrega un mensaje al log
     * @param {string} message - El mensaje a mostrar
     * @param {string} type - Tipo de mensaje: 'info', 'error', 'warning', 'success', 'action', 'status', 'system'
     */
    add(message, type = 'info') {
        this.logs.push({ message, type });
    }

    /**
     * Limpia todos los logs
     */
    clear() {
        this.logs = [];
    }

    /**
     * Renderiza los logs en el DOM si han cambiado
     */
    render() {
        // Optimization: Only render if logs changed
        const currentHash = JSON.stringify(this.logs);
        if (this.lastLogsHash === currentHash) return;
        this.lastLogsHash = currentHash;

        const consoleEl = document.getElementById(this.containerId);
        if (!consoleEl) return;

        consoleEl.innerHTML = '';

        this.logs.forEach(log => {
            const p = document.createElement('p');
            let classes = "mb-1 ";
            
            switch(log.type) {
                case 'error': classes += "text-red-400 font-bold"; break;
                case 'warning': classes += "text-yellow-400 font-bold"; break;
                case 'success': classes += "text-emerald-400 font-bold"; break;
                case 'action': classes += "text-slate-300 pl-4"; break;
                case 'status': classes += "text-blue-300 border-b border-slate-800 pb-1 mb-2"; break;
                case 'system': classes += "text-slate-500 text-xs"; break;
                default: classes += "text-slate-400";
            }
            
            p.className = classes;
            p.textContent = log.message;
            consoleEl.appendChild(p);
        });
        
        // Auto scroll
        if (consoleEl.parentElement) {
            consoleEl.parentElement.scrollTop = consoleEl.parentElement.scrollHeight;
        }
    }
}
