import { emotions } from '../../config/emotions.js';
import { NivelEstimulacion, EstadoEjecutivo } from '../../config/states.js';
import { AlexithymiaModal } from './AlexithymiaModal.js';

/**
 * Traffic Light Component
 * Implementa el patrón Chain of Responsibility para determinar el estado visual del semáforo.
 */

// --- 1. VIEW (Presentación) ---
class TrafficLightView {
    constructor() {
        this.red = document.getElementById('light-red');
        this.yellow = document.getElementById('light-yellow');
        this.green = document.getElementById('light-green');
        this.text = document.getElementById('status-text');
    }

    render(state) {
        if (!this.red || !this.yellow || !this.green || !this.text) return;

        this.red.className = state.redClass;
        this.yellow.className = state.yellowClass;
        this.green.className = state.greenClass;
        
        this.text.className = state.textClass;
        this.text.textContent = state.textContent;
    }
}

// --- 2. HANDLERS (Lógica de Negocio) ---

class BaseHandler {
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    handle(context) {
        if (this.nextHandler) {
            return this.nextHandler.handle(context);
        }
        return null;
    }
}

class SpecialModeHandler extends BaseHandler {
    handle(ctx) {
        if (!ctx.specialMode) return super.handle(ctx);

        const mode = ctx.specialMode;
        const baseClass = "w-12 h-12 rounded-full transition-all duration-500 opacity-30 scale-90"; // Fallback

        // Helper for common styles
        const createStyle = (commonClass, textClass, textContent) => ({
            redClass: commonClass,
            yellowClass: commonClass,
            greenClass: commonClass,
            textClass: textClass,
            textContent: textContent
        });

        switch (mode) {
            case 'GOD_MODE':
                const godClass = "w-12 h-12 rounded-full bg-yellow-300 transition-all duration-300 shadow-[0_0_60px_rgba(253,224,71,1)] opacity-100 scale-125 border-4 border-white animate-pulse";
                return createStyle(
                    godClass,
                    "mt-4 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(250,204,21,1)] animate-pulse",
                    "⚡️ ABSOLUTE FLOW ⚡️"
                );

            case 'MAGIC_HOUR':
                const magicClass = "w-12 h-12 rounded-full bg-purple-500 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.8)] opacity-100 scale-110 border-2 border-purple-300";
                return createStyle(
                    magicClass,
                    "mt-4 text-lg font-bold text-purple-400 tracking-widest",
                    "🦉 3:00 AM POWER 🦉"
                );

            case 'WIKI_HOLE':
                const wikiClass = "w-12 h-12 rounded-full bg-cyan-500 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.8)] opacity-100 scale-110 border-2 border-cyan-300";
                return createStyle(
                    wikiClass,
                    "mt-4 text-lg font-bold text-cyan-400 tracking-widest",
                    "🌀 DATA STREAM 🌀"
                );

            case 'JUSTICE_MODE':
                const justiceClass = "w-12 h-12 rounded-full bg-orange-600 transition-all duration-300 shadow-[0_0_30px_rgba(234,88,12,0.8)] opacity-100 scale-110 border-2 border-orange-400";
                return createStyle(
                    justiceClass,
                    "mt-4 text-lg font-bold text-orange-500 tracking-widest",
                    "⚖️ FURIA ACTIVA ⚖️"
                );

            case 'EPIPHANY':
                const epiClass = "w-12 h-12 rounded-full bg-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.8)] opacity-100 scale-110 border-2 border-slate-300";
                return createStyle(
                    epiClass,
                    "mt-4 text-lg font-bold text-white tracking-widest",
                    "🧩 CLARIDAD TOTAL 🧩"
                );

            case 'VOID_MODE':
                const voidClass = "w-12 h-12 rounded-full bg-slate-600 transition-all duration-300 opacity-50 scale-90 grayscale";
                return createStyle(
                    voidClass,
                    "mt-4 text-lg font-bold text-slate-500 tracking-widest blur-[1px]",
                    "😶 S E Ñ A L   P E R D I D A 😶"
                );

            case 'GHOST_MODE':
                const ghostClass = "w-12 h-12 rounded-full border-2 border-slate-500 bg-transparent transition-all duration-300 opacity-30 scale-95";
                return createStyle(
                    ghostClass,
                    "mt-4 text-lg font-bold text-slate-600 tracking-widest opacity-50",
                    "👻 INVISIBLE 👻"
                );

            case 'MELTDOWN':
                const meltClass = "w-12 h-12 rounded-full bg-red-600 transition-all duration-100 shadow-[0_0_50px_rgba(220,38,38,1)] opacity-100 scale-125 animate-pulse";
                return createStyle(
                    meltClass,
                    "mt-4 text-xl font-black text-red-500 tracking-widest animate-bounce",
                    "⚠️ CRITICAL FAILURE ⚠️"
                );

            case 'ZOMBIE_MODE':
                const zombieClass = "w-12 h-12 rounded-full bg-lime-900 transition-all duration-1000 shadow-[0_0_20px_rgba(101,163,13,0.5)] opacity-80 scale-100 blur-[1px]";
                return createStyle(
                    zombieClass,
                    "mt-4 text-lg font-bold text-lime-700 tracking-widest blur-[1px]",
                    "🧟 BRAINS... 🧟"
                );

            case 'DOOMSCROLLING':
                const doomClass = "w-12 h-12 rounded-full bg-black border border-red-900 transition-all duration-300 shadow-inner opacity-100 scale-90";
                return createStyle(
                    doomClass,
                    "mt-4 text-lg font-bold text-red-900 tracking-widest",
                    "🕸️ NO ESCAPE 🕸️"
                );
            
            default:
                return super.handle(ctx);
        }
    }
}

class EmotionHandler extends BaseHandler {
    handle(ctx) {
        if (!ctx.activeEmotion) return super.handle(ctx);

        const emoKey = ctx.activeEmotion;
        const baseClass = "w-12 h-12 rounded-full transition-all duration-500 opacity-30 scale-90";

        // Specific Overrides
        if (emoKey === 'disgust') {
            return {
                redClass: baseClass + " bg-red-900",
                yellowClass: "w-12 h-12 rounded-full bg-yellow-500 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.8)] opacity-100 scale-110 border-2 border-green-600",
                greenClass: baseClass + " bg-green-900",
                textClass: "mt-4 text-lg font-bold text-green-500 tracking-widest",
                textContent: "🤢 RECHAZO SENSORIAL 🤢"
            };
        }
        if (emoKey === 'masking') {
            return {
                redClass: baseClass + " bg-red-900",
                yellowClass: "w-12 h-12 rounded-full bg-slate-400 transition-all duration-300 shadow-[0_0_20px_rgba(148,163,184,0.8)] opacity-100 scale-100 border-2 border-slate-300",
                greenClass: baseClass + " bg-green-900",
                textClass: "mt-4 text-lg font-bold text-slate-400 tracking-widest",
                textContent: "🎭 MASKING ACTIVO 🎭"
            };
        }
        if (emoKey === 'stimming') {
            return {
                redClass: baseClass + " bg-red-900",
                yellowClass: baseClass + " bg-yellow-900",
                greenClass: "w-12 h-12 rounded-full bg-lime-500 transition-all duration-300 shadow-[0_0_20px_rgba(132,204,22,0.8)] opacity-100 scale-110 border-2 border-lime-300",
                textClass: "mt-4 text-lg font-bold text-lime-400 tracking-widest",
                textContent: "🌀 REGULANDO... 🌀"
            };
        }

        // Generic Emotion Fallback
        const emo = emotions[emoKey];
        if (emo) {
            let colorClass = "bg-slate-500";
            let borderColor = "border-slate-400";
            let shadowColor = "rgba(100,116,139,0.8)";
            
            // Extract color from config (simplified mapping)
            if (emo.active.includes("bg-yellow")) { colorClass = "bg-yellow-500"; borderColor = "border-yellow-300"; shadowColor = "rgba(234,179,8,0.8)"; }
            else if (emo.active.includes("bg-blue")) { colorClass = "bg-blue-500"; borderColor = "border-blue-300"; shadowColor = "rgba(59,130,246,0.8)"; }
            else if (emo.active.includes("bg-red")) { colorClass = "bg-red-600"; borderColor = "border-red-400"; shadowColor = "rgba(220,38,38,0.8)"; }
            else if (emo.active.includes("bg-purple")) { colorClass = "bg-purple-600"; borderColor = "border-purple-400"; shadowColor = "rgba(147,51,234,0.8)"; }
            else if (emo.active.includes("bg-green")) { colorClass = "bg-green-600"; borderColor = "border-green-400"; shadowColor = "rgba(22,163,74,0.8)"; }
            else if (emo.active.includes("bg-orange")) { colorClass = "bg-orange-500"; borderColor = "border-orange-300"; shadowColor = "rgba(249,115,22,0.8)"; }
            else if (emo.active.includes("bg-sky")) { colorClass = "bg-sky-500"; borderColor = "border-sky-300"; shadowColor = "rgba(14,165,233,0.8)"; }
            else if (emo.active.includes("bg-indigo")) { colorClass = "bg-indigo-600"; borderColor = "border-indigo-400"; shadowColor = "rgba(79,70,229,0.8)"; }
            else if (emo.active.includes("bg-pink")) { colorClass = "bg-pink-500"; borderColor = "border-pink-300"; shadowColor = "rgba(236,72,153,0.8)"; }
            else if (emo.active.includes("bg-amber")) { colorClass = "bg-amber-500"; borderColor = "border-amber-300"; shadowColor = "rgba(245,158,11,0.8)"; }
            else if (emo.active.includes("bg-cyan")) { colorClass = "bg-cyan-500"; borderColor = "border-cyan-300"; shadowColor = "rgba(6,182,212,0.8)"; }
            else if (emo.active.includes("bg-lime")) { colorClass = "bg-lime-500"; borderColor = "border-lime-300"; shadowColor = "rgba(132,204,22,0.8)"; }
            else if (emo.active.includes("bg-rose")) { colorClass = "bg-rose-600"; borderColor = "border-rose-400"; shadowColor = "rgba(225,29,72,0.8)"; }
            else if (emo.active.includes("bg-violet")) { colorClass = "bg-violet-600"; borderColor = "border-violet-400"; shadowColor = "rgba(124,58,237,0.8)"; }

            const genericClass = `w-12 h-12 rounded-full ${colorClass} transition-all duration-300 shadow-[0_0_20px_${shadowColor}] opacity-100 scale-110 border-2 ${borderColor}`;
            const textColor = colorClass.replace('bg-', 'text-');

            return {
                redClass: genericClass,
                yellowClass: genericClass,
                greenClass: genericClass,
                textClass: `mt-4 text-lg font-bold ${textColor} tracking-widest`,
                textContent: `${emo.label} ${emo.name.toUpperCase()} ${emo.label}`
            };
        }

        return super.handle(ctx);
    }
}

class StandardHandler extends BaseHandler {
    handle(ctx) {
        const { est, eje, stats } = ctx;
        const baseClass = "w-12 h-12 rounded-full transition-all duration-500 opacity-30 scale-90";
        
        // RED CONDITIONS
        if (est === NivelEstimulacion.SHUTDOWN || 
            eje === EstadoEjecutivo.BURNOUT || 
            stats.necesidadesBio > 80 ||
            stats.ansiedadSocial > 80) {
            
            return {
                redClass: "w-12 h-12 rounded-full bg-red-500 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.8)] opacity-100 scale-110",
                yellowClass: baseClass + " bg-yellow-900",
                greenClass: baseClass + " bg-green-900",
                textClass: "mt-4 text-lg font-bold text-red-500",
                textContent: "SISTEMA CRÍTICO"
            };
        } 
        // YELLOW CONDITIONS
        else if (est === NivelEstimulacion.SOBRE_ESTIMULADO || 
                 est === NivelEstimulacion.HIPO_ESTIMULADO ||
                 eje === EstadoEjecutivo.PARALISIS ||
                 eje === EstadoEjecutivo.DISPERSO ||
                 eje === EstadoEjecutivo.FATIGA ||
                 stats.ansiedadSocial > 50) {
            
            return {
                redClass: baseClass + " bg-red-900",
                yellowClass: "w-12 h-12 rounded-full bg-yellow-400 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.8)] opacity-100 scale-110",
                greenClass: baseClass + " bg-green-900",
                textClass: "mt-4 text-lg font-bold text-yellow-400",
                textContent: "PRECAUCIÓN"
            };
        } 
        // GREEN CONDITIONS
        else {
            return {
                redClass: baseClass + " bg-red-900",
                yellowClass: baseClass + " bg-yellow-900",
                greenClass: "w-12 h-12 rounded-full bg-green-500 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.8)] opacity-100 scale-110",
                textClass: "mt-4 text-lg font-bold text-green-500",
                textContent: "OPTIMAL"
            };
        }
    }
}

// --- 3. CONTROLLER (Punto de Entrada) ---

export class TrafficLightController {
    constructor() {
        this.view = new TrafficLightView();
        this.modal = new AlexithymiaModal();

        // Bind clicks for Alexithymia check
        if (this.view.red) {
            this.view.red.style.cursor = 'pointer';
            this.view.red.onclick = () => this.modal.open('red');
        }
        if (this.view.yellow) {
            this.view.yellow.style.cursor = 'pointer';
            this.view.yellow.onclick = () => this.modal.open('yellow');
        }
        if (this.view.green) {
            this.view.green.style.cursor = 'pointer';
            this.view.green.onclick = () => this.modal.open('green');
        }
        
        // Configurar Chain of Responsibility
        this.chain = new SpecialModeHandler();
        const emotionHandler = new EmotionHandler();
        const standardHandler = new StandardHandler();

        this.chain.setNext(emotionHandler).setNext(standardHandler);
    }

    update(est, eje, stats, specialMode, activeEmotion) {
        const context = { est, eje, stats, specialMode, activeEmotion };
        const result = this.chain.handle(context);
        
        if (result) {
            this.view.render(result);
        }
    }
}
