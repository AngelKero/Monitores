import { emotions } from '../config/emotions.js';

export class ProtocolManager {
    constructor(kernel) {
        this.kernel = kernel;
        this.specialProtocols = [];
        this.standardProtocols = [];
    }

    registerSpecial(protocol) {
        this.specialProtocols.push(protocol);
    }

    registerStandard(protocol) {
        this.standardProtocols.push(protocol);
    }

    detectSpecialMode(stats) {
        for (const protocol of this.specialProtocols) {
            if (protocol.matches(stats)) {
                return protocol.id;
            }
        }
        return null;
    }

    executeSpecialMode(modeId, stats) {
        const protocol = this.specialProtocols.find(p => p.id === modeId);
        if (protocol) {
            protocol.execute(stats);
        }
    }

    resolveConflict(est, eje, stats) {
        let handled = false;
        for (const protocol of this.standardProtocols) {
            if (protocol.matches(stats, est, eje)) {
                protocol.execute(stats, est, eje);
                handled = true;
                break; // First match wins (Priority system)
            }
        }
        
        if (!handled) {
            this.handleDefault(est, eje, stats);
        } else {
            // Ensure sound and lights are updated for matched protocols too
            this.kernel.updateSound(est, eje, stats);
            this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
        }
    }

    handleDefault(est, eje, stats) {
        let activeProtocol = "SISTEMA NOMINAL";
        if (this.kernel.activeEmotion && emotions[this.kernel.activeEmotion]) {
            const emo = emotions[this.kernel.activeEmotion];
            this.kernel.log(`>> ESTADO EMOCIONAL: ${emo.name.toUpperCase()}`, 'info');
            this.kernel.log(`   ℹ️ ¿Qué hago si veo esto?`, 'info');
            this.kernel.log(`   ${emo.advice}`, 'action');
            activeProtocol = "PROCESANDO EMOCIÓN";
        } else {
            this.kernel.log(">> SISTEMA NOMINAL: GOD MODE.", 'success');
            this.kernel.log("   Estás en la zona. Aprovecha para codear.", 'info');
            this.kernel.log("   Recordatorio: Pon una alarma para tomar agua.", 'action');
        }

        this.kernel.updateProtocolDisplay(activeProtocol);
        this.kernel.updateSound(est, eje, stats);
        this.kernel.trafficLight.update(est, eje, stats, this.kernel.specialMode, this.kernel.activeEmotion);
    }

    getSpecialModeIds() {
        return this.specialProtocols.map(p => p.id);
    }
}
