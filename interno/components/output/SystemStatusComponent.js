/**
 * System Status Component
 * Maneja la visualización de los estados de Estimulación y Ejecutivo en la UI.
 */
export class SystemStatusComponent {
    constructor() {
        this.elEst = document.getElementById('estado-estimulacion');
        this.elEje = document.getElementById('estado-ejecutivo');
    }

    update(est, eje) {
        if (this.elEst) {
            this.elEst.textContent = est;
            this.elEst.className = `text-base md:text-lg font-bold break-words ${this.getColorForState(est)}`;
        }
        if (this.elEje) {
            this.elEje.textContent = eje;
            this.elEje.className = `text-base md:text-lg font-bold break-words ${this.getColorForState(eje)}`;
        }
    }

    getColorForState(state) {
        const colors = {
            'HIPO': 'text-blue-400',
            'FLOW': 'text-emerald-400',
            'OVER': 'text-orange-400',
            'CRASH': 'text-red-500',
            'NOISE': 'text-yellow-400',
            'ONLINE': 'text-emerald-400',
            'FROZEN': 'text-blue-400',
            'SQUIRREL': 'text-yellow-400',
            'OFFLINE': 'text-red-500',
            'TIRED': 'text-yellow-400',
            'CRITICAL': 'text-red-600',
            'BIO_HAZARD': 'text-red-600'
        };
        return colors[state] || 'text-white';
    }
}
