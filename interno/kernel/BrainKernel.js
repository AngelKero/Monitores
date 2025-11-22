import { KernelLogComponent } from '../components/output/KernelLogComponent.js';
import { AudioManager } from '../audio/AudioManager.js';
import { VisualEngine } from '../visuals/VisualEngine.js';
import { TrafficLightController } from '../components/output/TrafficLight.js';
import { ModalGuideComponent } from '../components/output/ModalGuide.js';
import { SystemStatusComponent } from '../components/output/SystemStatusComponent.js';
import { ProtocolManager } from './ProtocolManager.js';
import { emotions } from '../config/emotions.js';
import { NivelEstimulacion, EstadoEjecutivo } from '../config/states.js';
import { protocolGuides } from '../config/protocols.js';

import {
    WikiHoleProtocol, JusticeModeProtocol, DoomscrollingProtocol, MagicHourProtocol,
    MeltdownProtocol, ZombieModeProtocol, GhostModeProtocol, GodModeProtocol,
    EpiphanyProtocol, VoidModeProtocol
} from './protocols/SpecialProtocols.js';

import {
    SocialEvacuationProtocol, ForcedLandingProtocol, EmergencyFoodProtocol,
    BioMaintenanceProtocol, SocialShieldProtocol, ThawProtocol, SquirrelModeProtocol,
    BioMaintenanceFlowProtocol, RecoveryModeProtocol, BunkerModeProtocol,
    NoiseReductionProtocol, JumpstartProtocol, EnergyConservationProtocol
} from './protocols/StandardProtocols.js';

/**
 * BrainKernel
 * Núcleo lógico del sistema. Coordina diagnósticos, estados y protocolos.
 */
export class BrainKernel {
    constructor() {
        this.logger = new KernelLogComponent();
        this.specialMode = null;
        this.activeEmotion = null; // Moved from global
        this.manualOverride = false; // Flag for forced modes
        this.sound = new AudioManager();
        this.visuals = new VisualEngine();
        this.trafficLight = new TrafficLightController();
        this.modalGuide = new ModalGuideComponent();
        this.systemStatus = new SystemStatusComponent();

        // Optimization Sta|te
        this.lastState = {};
        this.lastProtocol = "";

        // Protocol Manager
        this.protocolManager = new ProtocolManager(this);

        // Register Special Protocols
        this.protocolManager.registerSpecial(new WikiHoleProtocol(this));
        this.protocolManager.registerSpecial(new JusticeModeProtocol(this));
        this.protocolManager.registerSpecial(new DoomscrollingProtocol(this));
        this.protocolManager.registerSpecial(new MagicHourProtocol(this));
        this.protocolManager.registerSpecial(new MeltdownProtocol(this));
        this.protocolManager.registerSpecial(new ZombieModeProtocol(this));
        this.protocolManager.registerSpecial(new GhostModeProtocol(this));
        this.protocolManager.registerSpecial(new GodModeProtocol(this));
        this.protocolManager.registerSpecial(new EpiphanyProtocol(this));
        this.protocolManager.registerSpecial(new VoidModeProtocol(this));

        // Register Standard Protocols (Priority Order)
        this.protocolManager.registerStandard(new SocialEvacuationProtocol(this));
        this.protocolManager.registerStandard(new ForcedLandingProtocol(this));
        this.protocolManager.registerStandard(new EmergencyFoodProtocol(this));
        this.protocolManager.registerStandard(new BioMaintenanceProtocol(this));
        this.protocolManager.registerStandard(new SocialShieldProtocol(this));
        this.protocolManager.registerStandard(new ThawProtocol(this));
        this.protocolManager.registerStandard(new SquirrelModeProtocol(this));
        this.protocolManager.registerStandard(new BioMaintenanceFlowProtocol(this));
        this.protocolManager.registerStandard(new RecoveryModeProtocol(this));
        this.protocolManager.registerStandard(new BunkerModeProtocol(this));
        this.protocolManager.registerStandard(new NoiseReductionProtocol(this));
        this.protocolManager.registerStandard(new JumpstartProtocol(this));
        this.protocolManager.registerStandard(new EnergyConservationProtocol(this));
    }

    log(message, type = 'info') {
        this.logger.add(message, type);
    }

    clearLogs() {
        this.logger.clear();
    }

    diagnosticarSistema(stats) {
        this.clearLogs();

        if (this.activeEmotion) {
            if (emotions[this.activeEmotion]) {
                this.log(`>> EMOTIONAL OVERRIDE: ${emotions[this.activeEmotion].name.toUpperCase()}`, 'info');
            } else {
                console.warn(`[BrainKernel] Active emotion '${this.activeEmotion}' not found in config.`);
                this.log(`>> EMOTIONAL OVERRIDE: ${this.activeEmotion} (Unknown)`, 'warning');
            }
        }

        // --- AUTO-DETECTION OF SPECIAL MODES (EXTREMES) ---
        // Only run auto-detect if not manually forced
        if (!this.manualOverride) {
            const autoMode = this.detectSpecialMode(stats);
            const autoTypes = this.protocolManager.getSpecialModeIds();

            if (autoMode) {
                // If detected mode is different, switch to it
                if (this.specialMode !== autoMode) {
                    this.specialMode = autoMode;
                    // Force sound engine reset for new mode
                    if (this.sound) this.sound.stopAll();
                    if (this.visuals) this.visuals.setMode(this.specialMode);
                }
            } else {
                // If we were in an auto-mode but conditions are gone, release it
                // BUT keep it if it's sustained by activeEmotion (handled by detectSpecialMode returning it)
                if (autoTypes.includes(this.specialMode)) {
                    this.specialMode = null;
                    if (this.sound) this.sound.stopAll();
                    if (this.visuals) this.visuals.setMode(null);
                }
            }
        }

        // --- SPECIAL MODES OVERRIDE ---
        if (this.specialMode) {
            this.handleSpecialMode();
            this.updateSound(null, null, stats);
            return;
        }

        // Reset Background (Standard)
        document.body.className = "bg-slate-900 text-slate-200 font-sans min-h-screen p-4 md:p-8 pb-32 md:pb-32 text-sm md:text-base break-words";

        this.log("[SYSTEM DIAGNOSTIC] Corriendo análisis...", 'system');

        // Paso 0: Chequeo de BIOS (Log only, don't return early so protocols can activate)
        if (stats.necesidadesBio > 80) {
            this.log(">> ALERTA BIO: ¡Wey, ve al baño o come algo! (Interocepción crítica)", 'error');
            this.log("   Action: Pause process -> Eat/Drink/Pee.", 'action');
            this.updateStatusDisplay("CRITICAL", "BIO_HAZARD", stats);
        }

        // Paso 1: Determinar Estados
        this.estadoEstimulacion = this.calcularEstimulacion(stats);
        this.estadoEjecutivo = this.calcularEjecucion(stats);

        // Paso 2: Ejecutar Estrategia Combinada
        this.resolverConflicto(this.estadoEstimulacion, this.estadoEjecutivo, stats);
        
        this.logger.render();
        // Update status display again at the end to ensure correct colors/text
        if (stats.necesidadesBio <= 80) {
             this.updateStatusDisplay(this.estadoEstimulacion, this.estadoEjecutivo, stats);
        }
    }

    detectSpecialMode(stats) {
        return this.protocolManager.detectSpecialMode(stats);
    }

    handleSpecialMode() {
        this.protocolManager.executeSpecialMode(this.specialMode, {});
        this.logger.render();
    }

    calcularEstimulacion(stats) {
        if (stats.ansiedadSocial > 80) return NivelEstimulacion.SOBRE_ESTIMULADO;
        if (stats.cargaSensorial > 65) return NivelEstimulacion.SHUTDOWN;
        if (stats.ansiedadSocial > 50) return NivelEstimulacion.ALERTA_SENSORIAL;
        if (stats.cargaSensorial > 45) return NivelEstimulacion.ALERTA_SENSORIAL; // Nuevo estado intermedio
        if (stats.dopamina < 40 && stats.cargaSensorial < 30) return NivelEstimulacion.HIPO_ESTIMULADO;
        return NivelEstimulacion.OPTIMO_FLOW;
    }

    calcularEjecucion(stats) {
        if (stats.ansiedadSocial > 80) return EstadoEjecutivo.PARALISIS;
        if (stats.cucharas < 25) return EstadoEjecutivo.BURNOUT;
        if (stats.cucharas < 40) return EstadoEjecutivo.FATIGA; // Nuevo estado intermedio
        if (stats.ansiedadSocial > 50) return EstadoEjecutivo.DISPERSO;
        if (stats.dopamina < 40 && stats.cucharas >= 25) return EstadoEjecutivo.PARALISIS;
        if (stats.dopamina > 65) return EstadoEjecutivo.DISPERSO;
        return EstadoEjecutivo.OPERATIVO;
    }

    resolverConflicto(est, eje, stats) {
        this.log(`[STATUS] Estímulo: ${est} | Ejecutivo: ${eje}`, 'status');
        this.protocolManager.resolveConflict(est, eje, stats);
    }

    updateSound(est, eje, stats) {
        // Initialize on first run if needed (handled by user interaction usually)
        this.sound.init();

        if (this.specialMode) {
            this.sound.setMode(this.specialMode);
            return;
        }

        // Normal Logic
        if (est === NivelEstimulacion.SHUTDOWN || 
            eje === EstadoEjecutivo.BURNOUT || 
            stats.necesidadesBio > 80 ||
            stats.ansiedadSocial > 80) {
            
            this.sound.stopAll();
        } else {
            this.sound.setMode('DEFAULT');
        }
    }

    updateProtocolDisplay(protocol) {
        if (this.lastProtocol === protocol) return;
        this.lastProtocol = protocol;

        const el = document.getElementById('protocol-text');
        if(el) el.textContent = protocol;

        // Update Modal Data via Component
        const guide = protocolGuides[protocol] || protocolGuides["SISTEMA NOMINAL"];
        if (this.modalGuide) {
            this.modalGuide.updateContent(protocol, guide);
        }
    }

    updateStatusDisplay(est, eje, stats) {
        // Check if state changed (simple shallow comparison of key props)
        const newState = { est, eje, specialMode: this.specialMode, activeEmotion: this.activeEmotion };
        if (JSON.stringify(this.lastState) === JSON.stringify(newState)) {
            // Even if state is same, traffic light might need animation update? 
            // TrafficLightController usually handles its own optimization or needs continuous update?
            // If TrafficLight has animations, it might need a separate update method called every frame.
            // But here we are updating the DOM text.
            this.trafficLight.update(est, eje, stats, this.specialMode, this.activeEmotion);
            return;
        }
        this.lastState = newState;

        if (this.systemStatus) {
            this.systemStatus.update(est, eje);
        }

        this.trafficLight.update(est, eje, stats, this.specialMode, this.activeEmotion);
    }
}
