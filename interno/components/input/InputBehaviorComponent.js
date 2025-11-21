export class InputBehaviorComponent {
    constructor() {
        this.init();
    }

    init() {
        const ranges = document.querySelectorAll('input[type="range"]');
        ranges.forEach(range => {
            // Mejorar comportamiento de scroll permitiendo pan vertical
            range.style.touchAction = 'pan-y';

            // Prevenir saltos al tocar el track en móviles
            range.addEventListener('touchstart', (e) => {
                const rect = range.getBoundingClientRect();
                const touchX = e.touches[0].clientX;
                
                // Parámetros del thumb (basados en CSS)
                const thumbWidth = 20; 
                const hitArea = 30; // Área de tolerancia un poco mayor al thumb

                // Calcular posición actual del thumb
                const min = parseFloat(range.min) || 0;
                const max = parseFloat(range.max) || 100;
                const val = parseFloat(range.value);
                
                // Fórmula estándar para posición de thumb en Webkit/Blink
                // Posición relativa (0 a 1)
                const ratio = (val - min) / (max - min);
                
                // El centro del thumb se mueve desde (thumbWidth/2) hasta (width - thumbWidth/2)
                // O más precisamente: el track disponible es (width - thumbWidth)
                // Left offset = ratio * (width - thumbWidth)
                // Center = Left offset + thumbWidth/2
                
                const trackWidth = rect.width - thumbWidth;
                const thumbOffset = ratio * trackWidth;
                const thumbCenterX = rect.left + thumbOffset + (thumbWidth / 2);

                const distance = Math.abs(touchX - thumbCenterX);

                // Si el toque está lejos del thumb, prevenir la acción por defecto (cambio de valor)
                if (distance > hitArea) {
                    // Esto evita que el slider salte a la nueva posición
                    // Y permite que si el gesto es vertical, el navegador maneje el scroll (gracias a touch-action: pan-y)
                    // O si es tap, simplemente no hace nada.
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                }
            }, { passive: false }); // passive: false es necesario para usar preventDefault
        });
    }
}
