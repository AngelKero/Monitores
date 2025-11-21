import { BrainKernel } from './kernel/BrainKernel.js';
import { PresetsComponent } from './components/input/PresetsComponent.js';
import { PhysicalStatesComponent } from './components/input/PhysicalStatesComponent.js';
import { EasterEggsComponent } from './components/input/EasterEggsComponent.js';
import { EmotionsComponent } from './components/input/EmotionsComponent.js';
import { ResponsiveController } from './components/input/ResponsiveController.js';
import { inputs } from './config/constants.js';

const kernel = new BrainKernel();

// Game Loop for 60fps updates
function gameLoop() {
    updateSimulation();
    requestAnimationFrame(gameLoop);
}

// Export updateSimulation or attach to window for components that need it
window.updateSimulation = function() {
    // Note: kernel.manualOverride reset is now handled by input listeners

    const stats = {};
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const val = parseInt(el.value);
        stats[id] = val;
        
        // Update label value (Optimized: only if changed)
        const label = document.getElementById(`val-${id}`);
        if (label && label.textContent != val) {
            label.textContent = val;
        }
    });

    kernel.diagnosticarSistema(stats);
}

// Add listeners to detect manual interaction
inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', () => {
            kernel.manualOverride = false;
        });
    }
});

// Initialize UI Components
const presetsComponent = new PresetsComponent(kernel);
const physicalStatesComponent = new PhysicalStatesComponent(kernel);
const easterEggsComponent = new EasterEggsComponent(kernel);
const emotionsComponent = new EmotionsComponent(kernel);
const responsiveController = new ResponsiveController();

// Run initial loop
gameLoop();

