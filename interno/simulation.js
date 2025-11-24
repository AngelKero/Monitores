import { BrainKernel } from './kernel/BrainKernel.js';
import { PresetsComponent } from './components/input/PresetsComponent.js';
import { PhysicalStatesComponent } from './components/input/PhysicalStatesComponent.js';
import { EasterEggsComponent } from './components/input/EasterEggsComponent.js';
import { EmotionsComponent } from './components/input/EmotionsComponent.js';
import { ResponsiveController } from './components/input/ResponsiveController.js';
import { ConfigComponent } from './components/input/ConfigComponent.js';
import { InputBehaviorComponent } from './components/input/InputBehaviorComponent.js';
import { UserSetupComponent } from './components/input/UserSetupComponent.js';
import { TutorialComponent } from './components/input/TutorialComponent.js';
import { AlexithymiaModal } from './components/output/AlexithymiaModal.js';
import { inputs } from './config/constants.js';

const kernel = new BrainKernel();
window.kernel = kernel; // Expose for debug and modal access

// Initialize Modal Helper
const alexithymiaModal = new AlexithymiaModal();

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
new PresetsComponent(kernel);
new PhysicalStatesComponent(kernel);
new EasterEggsComponent(kernel);
window.emotionsComponent = new EmotionsComponent(kernel); // Expose for external updates
new ConfigComponent(kernel);
new UserSetupComponent(kernel);
new TutorialComponent();
new InputBehaviorComponent();
new ResponsiveController();

// Attach Calibration Listeners
const btnCalibration = document.getElementById('btn-calibration-help');
if (btnCalibration) {
    btnCalibration.onclick = (e) => {
        e.preventDefault();
        alexithymiaModal.open('yellow');
    };
}

const cardStatus = document.getElementById('card-status-general');
if (cardStatus) {
    cardStatus.style.cursor = 'pointer';
    cardStatus.onclick = () => alexithymiaModal.open('yellow');
}

// Run initial loop
gameLoop();

