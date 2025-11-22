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
        const baseClass = "w-12 h-12 rounded-full transition-all duration-500 opacity-20 scale-90 grayscale";
        
        // Helper to build classes
        const build = (r, y, g, txtColor, label) => ({
            redClass: r || baseClass,
            yellowClass: y || baseClass,
            greenClass: g || baseClass,
            textClass: `mt-4 text-lg font-bold ${txtColor} tracking-widest`,
            textContent: label
        });

        // Common styles
        const pulse = "animate-pulse";
        const bounce = "animate-bounce";
        const spin = "animate-spin"; // Might look weird on a circle but ok
        
        // --- EMOTION PATTERNS ---

        // 1. HIGH ENERGY / POSITIVE
        if (emoKey === 'joy') {
            // Top & Bottom bright, Middle off
            return build(
                "w-12 h-12 rounded-full bg-yellow-400 shadow-[0_0_30px_gold] scale-110 animate-bounce",
                null,
                "w-12 h-12 rounded-full bg-orange-400 shadow-[0_0_30px_orange] scale-110 animate-bounce delay-100",
                "text-yellow-400",
                "☀️ ALEGRÍA ☀️"
            );
        }
        if (emoKey === 'curiosity') {
            // Middle light scanning (Sky Blue)
            return build(
                null,
                "w-12 h-12 rounded-full bg-sky-400 shadow-[0_0_40px_cyan] scale-125 border-4 border-white",
                null,
                "text-sky-400",
                "🔍 CURIOSIDAD 🔍"
            );
        }
        if (emoKey === 'hyperfocus') {
            // Laser focus: Middle Violet, others very dim
            return build(
                "w-12 h-12 rounded-full bg-violet-900 opacity-50 scale-75",
                "w-12 h-12 rounded-full bg-violet-500 shadow-[0_0_50px_violet] scale-110 border-2 border-white",
                "w-12 h-12 rounded-full bg-violet-900 opacity-50 scale-75",
                "text-violet-400",
                "🔭 HIPERFOCO 🔭"
            );
        }

        // 2. LOW ENERGY / NEGATIVE
        if (emoKey === 'sadness') {
            // Only Bottom Blue light, dim
            return build(
                null,
                null,
                "w-12 h-12 rounded-full bg-blue-600 shadow-[0_0_20px_blue] opacity-80 scale-95",
                "text-blue-400",
                "🌧️ TRISTEZA 🌧️"
            );
        }
        if (emoKey === 'ennui' || emoKey === 'burnout') {
            // All gray/dim
            return build(
                "w-12 h-12 rounded-full bg-slate-700 opacity-40",
                "w-12 h-12 rounded-full bg-slate-600 opacity-40",
                "w-12 h-12 rounded-full bg-slate-700 opacity-40",
                "text-slate-500",
                emoKey === 'burnout' ? "🕯️ BURNOUT 🕯️" : "😑 ENNUI 😑"
            );
        }

        // 3. HIGH AROUSAL / NEGATIVE
        if (emoKey === 'anger' || emoKey === 'justice') {
            // Top Red pulsing aggressively
            return build(
                "w-12 h-12 rounded-full bg-red-600 shadow-[0_0_40px_red] scale-110 animate-pulse",
                "w-12 h-12 rounded-full bg-orange-900 opacity-50",
                null,
                "text-red-500",
                emoKey === 'justice' ? "⚖️ JUSTICIA ⚖️" : "🔥 FURIA 🔥"
            );
        }
        if (emoKey === 'anxiety' || emoKey === 'fear') {
            // Chaotic: Red and Yellow fighting
            return build(
                "w-12 h-12 rounded-full bg-orange-500 shadow-[0_0_20px_orange] animate-pulse",
                "w-12 h-12 rounded-full bg-purple-500 shadow-[0_0_20px_purple] animate-pulse delay-75",
                null,
                "text-orange-400",
                emoKey === 'fear' ? "⚡️ MIEDO ⚡️" : "🌪️ ANSIEDAD 🌪️"
            );
        }
        if (emoKey === 'overwhelm') {
            // All lights ON and RED/WHITE flashing (simulated by border/bg mix)
            const flash = "w-12 h-12 rounded-full bg-red-500 border-4 border-white shadow-[0_0_30px_red] animate-pulse";
            return build(
                flash,
                flash,
                flash,
                "text-red-500 font-black",
                "🤯 SOBRECARGA 🤯"
            );
        }

        // 4. COMPLEX / NEURODIVERGENT
        if (emoKey === 'disgust') {
            // Green (Bottom) dominant but "sick" color
            return build(
                null,
                "w-12 h-12 rounded-full bg-green-900 opacity-50",
                "w-12 h-12 rounded-full bg-green-500 shadow-[0_0_20px_lime] border-4 border-green-800 scale-105",
                "text-green-500",
                "🤢 DESAGRADO 🤢"
            );
        }
        if (emoKey === 'masking') {
            // The Mask: Top Green (Face), Middle Gray (Strain), Bottom Hidden (Real)
            return build(
                "w-12 h-12 rounded-full bg-emerald-400 shadow-[0_0_20px_emerald] border-4 border-slate-700 z-10", // The Mask
                "w-12 h-12 rounded-full bg-slate-600 animate-pulse scale-75 opacity-50", // The Mechanism
                "w-12 h-12 rounded-full bg-rose-900 opacity-30 scale-50", // The Suppressed
                "text-emerald-400",
                "🎭 MASKING: ON 🎭"
            );
        }
        if (emoKey === 'paralysis') {
            // Frozen Blue/Cyan, no movement
            return build(
                "w-12 h-12 rounded-full bg-cyan-900 opacity-50",
                "w-12 h-12 rounded-full bg-cyan-500 shadow-[0_0_15px_cyan] opacity-80",
                "w-12 h-12 rounded-full bg-cyan-900 opacity-50",
                "text-cyan-400",
                "🧊 PARÁLISIS 🧊"
            );
        }
        if (emoKey === 'stimming') {
            // Rainbow-ish / Flowing
            return build(
                "w-12 h-12 rounded-full bg-pink-500 animate-bounce delay-0",
                "w-12 h-12 rounded-full bg-yellow-500 animate-bounce delay-100",
                "w-12 h-12 rounded-full bg-cyan-500 animate-bounce delay-200",
                "text-pink-400",
                "🌀 STIMMING 🌀"
            );
        }

        // 5. SPECIFIC EMOTIONAL STATES
        if (emoKey === 'nostalgia') {
            // Sepia tone, warm, fuzzy, "Old Photo" feel
            return build(
                "w-12 h-12 rounded-full bg-amber-900 opacity-40 blur-[1px]",
                "w-12 h-12 rounded-full bg-amber-200 shadow-[0_0_30px_orange] opacity-90 animate-pulse scale-105",
                "w-12 h-12 rounded-full bg-amber-900 opacity-40 blur-[1px]",
                "text-amber-300",
                "🧸 NOSTALGIA 🧸"
            );
        }

        if (emoKey === 'embarrassment') {
            // Hiding, small, blushing
            return build(
                null,
                "w-12 h-12 rounded-full bg-pink-400 shadow-[0_0_20px_pink] scale-75 animate-pulse border-4 border-pink-200",
                null,
                "text-pink-300",
                "😳 VERGÜENZA 😳"
            );
        }

        // Fallback for others (Nostalgia, Embarrassment, RSD)
        const emo = emotions[emoKey];
        if (emo) {
            // Extract color class
            const colorClass = emo.active.split(' ')[0] || "bg-gray-500";
            const shadowColor = colorClass.replace('bg-', ''); // e.g. "pink-400"
            
            // Default pattern: Middle light active with that color
            return build(
                null,
                `w-12 h-12 rounded-full ${colorClass} shadow-[0_0_25px_var(--tw-shadow-color)] shadow-${shadowColor} scale-110`,
                null,
                `text-${shadowColor}`,
                `${emo.label} ${emo.name.toUpperCase()} ${emo.label}`
            );
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
