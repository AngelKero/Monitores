import { VisualStrategies } from './strategies.js';

const DEFAULT_VISUAL_SETTINGS = {
    theme: 'void',
    shaderIntensity: 45,
    particleSpeed: 30,
    parallaxReactive: true,
    heartSync: false
};

const VisualThemes = {
    void: {
        label: 'Void Static',
        background: `radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.15), rgba(15, 23, 42, 0)),
            radial-gradient(circle at 80% 0%, rgba(248, 250, 252, 0.08), transparent 50%),
            linear-gradient(180deg, #020617 0%, #0f172a 65%, #020617 100%)`,
        particleColor: 'rgba(148, 163, 184, 0.8)',
        particleShape: 'dot',
        parallaxRange: 14,
        heartColor: 'rgba(59, 130, 246, 0.35)'
    },
    aurora: {
        label: 'Aurora Boreal',
        background: `linear-gradient(120deg, #0f172a 0%, #312e81 30%, #0ea5e9 60%, #f472b6 100%),
            radial-gradient(circle at 10% 90%, rgba(16, 185, 129, 0.3), transparent 60%)`,
        particleColor: 'rgba(94, 234, 212, 0.7)',
        particleShape: 'dot',
        parallaxRange: 22,
        heartColor: 'rgba(94, 234, 212, 0.35)'
    },
    neon: {
        label: 'Neon Tokyo',
        background: `linear-gradient(130deg, #020617 0%, #581c87 25%, #be123c 45%, #ec4899 70%, #22d3ee 100%)`,
        particleColor: 'rgba(236, 72, 153, 0.85)',
        particleShape: 'shard',
        parallaxRange: 18,
        heartColor: 'rgba(236, 72, 153, 0.4)'
    },
    forest: {
        label: 'Bosque Sensorial',
        background: `linear-gradient(150deg, #022c22 0%, #064e3b 40%, #0d9488 85%),
            radial-gradient(circle at 15% 30%, rgba(190, 242, 100, 0.35), transparent 60%)`,
        particleColor: 'rgba(167, 243, 208, 0.75)',
        particleShape: 'dot',
        parallaxRange: 20,
        heartColor: 'rgba(167, 243, 208, 0.4)'
    }
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

class ParticleField {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.speedMultiplier = 1;
        this.options = { color: 'rgba(255,255,255,0.4)', shape: 'dot' };
        this.bounds = { width: window.innerWidth, height: window.innerHeight };
        this.step = this.step.bind(this);
        this.resizeHandler = () => this.syncBounds();
        window.addEventListener('resize', this.resizeHandler);
        this.initParticles(36);
        this.animationId = null;
        this.start();
    }

    initParticles(count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle());
        }
        this.updateAppearance(this.options);
    }

    createParticle() {
        const node = document.createElement('span');
        node.className = 'visual-particle';
        this.container.appendChild(node);

        return {
            node,
            x: Math.random() * this.bounds.width,
            y: Math.random() * this.bounds.height,
            depth: Math.random(),
            driftX: (Math.random() - 0.5) * 0.35,
            driftY: (Math.random() - 0.5) * 0.35,
            size: 2 + Math.random() * 4
        };
    }

    updateAppearance(options = {}) {
        this.options = { ...this.options, ...options };
        this.particles.forEach(p => {
            p.node.style.background = this.options.color;
            p.node.style.boxShadow = `0 0 12px ${this.options.color}`;
            p.node.style.borderRadius = this.options.shape === 'shard' ? '2px' : '999px';
        });
    }

    setSpeed(multiplier) {
        this.speedMultiplier = multiplier;
    }

    start() {
        if (this.animationId) return;
        this.animationId = requestAnimationFrame(this.step);
    }

    step() {
        this.particles.forEach(p => {
            p.x += p.driftX * this.speedMultiplier;
            p.y -= (0.1 + p.depth * 0.9) * this.speedMultiplier;

            if (p.x < -20) p.x = this.bounds.width + 20;
            if (p.x > this.bounds.width + 20) p.x = -20;
            if (p.y < -20) p.y = this.bounds.height + 20;

            p.node.style.transform = `translate(${p.x}px, ${p.y}px)`;
            const sizeY = this.options.shape === 'shard' ? p.size * 4 : p.size;
            p.node.style.width = `${p.size}px`;
            p.node.style.height = `${sizeY}px`;
            p.node.style.opacity = 0.25 + p.depth * 0.45;
        });

        this.animationId = requestAnimationFrame(this.step);
    }

    syncBounds() {
        this.bounds = { width: window.innerWidth, height: window.innerHeight };
    }
}

/**
 * Motor de Efectos Visuales
 * Gestiona la aplicación de temas beta y estrategias visuales especiales.
 */
export class VisualEngine {
    constructor() {
        this.currentCleanup = null;
        this.overlay = document.getElementById('visual-effects-overlay');
        this.canvas = document.getElementById('effect-canvas');
        this.backgroundRoot = null;

        this.baseThemeLayer = null;
        this.particleLayer = null;
        this.heartLayer = null;
        this.particleField = null;
        this.heartBeatInterval = null;
        this.heartBeatDuration = 900;
        this.parallaxCache = { base: 'translate3d(0,0,0)', particles: 'translate3d(0,0,0)' };

        this.themeSettings = { ...DEFAULT_VISUAL_SETTINGS };
        this.themeSuspended = false;
        this.latestStats = null;

        this.ensureBackgroundRoot();
        this.ensureBaseLayers();
        this.applyUserSettings(this.themeSettings);
    }

    ensureBackgroundRoot() {
        this.backgroundRoot = document.getElementById('visual-background-root');
        if (this.backgroundRoot) return;

        const root = document.createElement('div');
        root.id = 'visual-background-root';
        root.className = 'visual-background-root';
        root.setAttribute('aria-hidden', 'true');
        if (document.body.firstChild) document.body.insertBefore(root, document.body.firstChild);
        else document.body.appendChild(root);
        this.backgroundRoot = root;
    }

    ensureBaseLayers() {
        this.ensureBackgroundRoot();

        if (this.overlay && !this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'effect-canvas';
            this.overlay.appendChild(this.canvas);
        }

        if (!this.baseThemeLayer) {
            this.baseThemeLayer = document.createElement('div');
            this.baseThemeLayer.className = 'visual-base-layer absolute inset-0 pointer-events-none';
            this.baseThemeLayer.dataset.visualPersistent = 'true';
            this.backgroundRoot.appendChild(this.baseThemeLayer);
        }

        if (!this.particleLayer) {
            this.particleLayer = document.createElement('div');
            this.particleLayer.className = 'visual-particle-layer absolute inset-0 pointer-events-none';
            this.particleLayer.dataset.visualPersistent = 'true';
            this.backgroundRoot.appendChild(this.particleLayer);
        }

        if (!this.heartLayer) {
            this.heartLayer = document.createElement('div');
            this.heartLayer.className = 'visual-heart-layer absolute inset-0 pointer-events-none';
            this.heartLayer.dataset.visualPersistent = 'true';
            this.backgroundRoot.appendChild(this.heartLayer);
        }

        if (!this.particleField && this.particleLayer) {
            this.particleField = new ParticleField(this.particleLayer);
        }
    }

    setThemeSuspended(flag) {
        if (this.themeSuspended === flag) return;
        this.themeSuspended = flag;
        this.ensureBackgroundRoot();
        if (this.backgroundRoot) {
            this.backgroundRoot.style.display = flag ? 'none' : 'block';
        }

        if (flag) {
            this.stopHeartSync();
        } else {
            // Reapply theme layers and resume telemetry sync
            this.applyUserSettings(this.themeSettings);
            if (this.latestStats) {
                this.updateUserVisuals(this.latestStats);
            }
        }
    }

    applyUserSettings(settings = {}) {
        const merged = {
            ...this.themeSettings,
            ...settings
        };

        merged.shaderIntensity = clamp(parseInt(merged.shaderIntensity, 10) || 0, 0, 100);
        merged.particleSpeed = clamp(parseInt(merged.particleSpeed, 10) || 0, 0, 100);

        this.themeSettings = merged;
        this.ensureBaseLayers();
        this.applyBaseTheme();
        this.updateParticleSystem();
        this.updateOverlayVisibility();
        this.applyGlassEffect(merged.glassEnabled);

        if (!merged.heartSync) {
            this.stopHeartSync();
        }
    }

    applyBaseTheme() {
        if (!this.baseThemeLayer) return;
        const theme = VisualThemes[this.themeSettings.theme] || VisualThemes.void;
        const intensity = (this.themeSettings.shaderIntensity ?? 0) / 100;

        this.baseThemeLayer.style.backgroundImage = theme.background;
        this.baseThemeLayer.style.opacity = (0.35 + intensity * 0.55).toFixed(2);
        this.baseThemeLayer.style.filter = `saturate(${1 + intensity * 0.5}) brightness(${0.85 + intensity * 0.3}) contrast(${1 + intensity * 0.2}) blur(${(intensity * 3).toFixed(2)}px)`;
        this.baseThemeLayer.style.mixBlendMode = theme.mixBlendMode || 'screen';

        if (this.heartLayer) {
            this.heartLayer.style.background = `radial-gradient(circle at 50% 50%, ${theme.heartColor || 'rgba(255,255,255,0.35)'} 0%, transparent 65%)`;
            this.heartLayer.style.opacity = 0.25 + intensity * 0.35;
        }
    }

    updateParticleSystem() {
        if (!this.particleField) return;
        const theme = VisualThemes[this.themeSettings.theme] || VisualThemes.void;
        this.particleField.updateAppearance({
            color: theme.particleColor,
            shape: theme.particleShape
        });

        // Slider 0-100 -> sensible multiplier between 0.2x y 3x
        const multiplier = 0.2 + (this.themeSettings.particleSpeed / 100) * 2.8;
        this.particleField.setSpeed(multiplier);
    }

    setMode(mode) {
        this.stopAll();
        this.setThemeSuspended(!!mode);
        this.applyTheme(mode);

        if (mode && VisualStrategies[mode]) {
            if (this.overlay) this.overlay.classList.remove('hidden');
            this.currentCleanup = VisualStrategies[mode].mount(this.overlay, this.canvas);
        } else {
            this.updateOverlayVisibility();
        }
    }

    stopAll() {
        if (this.currentCleanup) {
            this.currentCleanup();
            this.currentCleanup = null;
        }
        
        if (this.overlay) {
            Array.from(this.overlay.children).forEach(child => {
                if (child === this.canvas) return;
                if (child.dataset?.visualPersistent === 'true') return;
                child.remove();
            });
        }

        if (this.canvas) {
            const ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.updateOverlayVisibility();
    }

    updateOverlayVisibility() {
        if (!this.overlay) return;
        const shouldShow = !!this.currentCleanup;
        if (shouldShow) this.overlay.classList.remove('hidden');
        else this.overlay.classList.add('hidden');
    }

    applyTheme(mode) {
        const cards = document.querySelectorAll('.kernel-card');
        
        cards.forEach(card => {
            if (!card.dataset.originalBg) {
                if (card.classList.contains('bg-slate-800')) card.dataset.originalBg = 'bg-slate-800';
                else if (card.classList.contains('bg-black')) card.dataset.originalBg = 'bg-black';
                else card.dataset.originalBg = 'bg-slate-800';
            }

            card.classList.remove('bg-slate-900/60', 'bg-red-950/90', 'bg-lime-950/90', 'bg-slate-950', 'backdrop-blur-md');
            card.classList.remove('border-yellow-400/50', 'border-purple-500/50', 'border-cyan-500/50', 'border-orange-500/50', 'border-white/50', 'border-red-500', 'border-lime-700', 'border-slate-800');

            if (!card.classList.contains(card.dataset.originalBg)) {
                card.classList.add(card.dataset.originalBg);
            }

            if (!card.classList.contains('border-slate-700')) {
                card.classList.add('border-slate-700');
            }
        });

        if (!mode) return;

        const apply = (bgClass, borderClass) => {
            cards.forEach(card => {
                card.classList.remove(card.dataset.originalBg);
                card.classList.remove('border-slate-700');
                
                card.classList.add(...bgClass.split(' '));
                card.classList.add(borderClass);
                
                if (bgClass.includes('/')) {
                    card.classList.add('backdrop-blur-md');
                }
            });
        };

        switch (mode) {
            case 'GOD_MODE':
                apply('bg-slate-900/60', 'border-yellow-400/50');
                break;
            case 'MAGIC_HOUR':
                apply('bg-slate-900/60', 'border-purple-500/50');
                break;
            case 'WIKI_HOLE':
                apply('bg-slate-900/60', 'border-cyan-500/50');
                break;
            case 'JUSTICE_MODE':
                apply('bg-slate-900/60', 'border-orange-500/50');
                break;
            case 'EPIPHANY':
                apply('bg-slate-900/60', 'border-white/50');
                break;
            case 'MELTDOWN':
                apply('bg-red-950/90', 'border-red-500');
                break;
            case 'ZOMBIE_MODE':
                apply('bg-lime-950/90', 'border-lime-700');
                break;
            case 'DOOMSCROLLING':
                apply('bg-black', 'border-slate-800');
                break;
            case 'VOID_MODE':
                apply('bg-slate-950', 'border-slate-800');
                break;
        }
    }

    updateUserVisuals(stats = {}) {
        this.latestStats = { ...stats };
        if (this.themeSuspended) return;
        if (!this.baseThemeLayer || !this.particleLayer) return;
        if (this.themeSettings.parallaxReactive) {
            this.applyParallax(stats.cargaSensorial ?? 0);
        } else {
            this.resetParallax();
        }

        if (this.themeSettings.heartSync) {
            this.applyHeartSync(stats);
        }
    }

    applyParallax(value = 0) {
        if (!this.baseThemeLayer || !this.particleLayer) return;
        const theme = VisualThemes[this.themeSettings.theme] || VisualThemes.void;
        const maxShift = theme.parallaxRange || 12;
        const factor = (value / 100) - 0.5;
        const baseShift = maxShift * factor;
        const particleShift = baseShift * -1.5;

        this.baseThemeLayer.style.transform = `translate3d(${baseShift}px, ${baseShift * -0.5}px, 0)`;
        this.particleLayer.style.transform = `translate3d(${particleShift}px, ${particleShift * -0.3}px, 0)`;
    }

    resetParallax() {
        if (!this.baseThemeLayer || !this.particleLayer) return;
        this.baseThemeLayer.style.transform = 'translate3d(0,0,0)';
        this.particleLayer.style.transform = 'translate3d(0,0,0)';
    }

    applyGlassEffect(enabled) {
        const body = document.body;
        if (!body) return;
        body.classList.toggle('glass-enabled', !!enabled);
    }

    reapplyGlassEffect() {
        this.applyGlassEffect(this.themeSettings.glassEnabled);
    }

    applyHeartSync(stats = {}) {
        const carga = clamp(stats.cargaSensorial ?? 40, 0, 100);
        const dopamina = clamp(stats.dopamina ?? 50, 0, 100);
        const bpm = clamp(62 + (dopamina - 50) * 0.2 + carga * 0.25, 55, 120);
        const duration = Math.round(60000 / bpm);

        if (!this.heartBeatInterval || this.heartBeatDuration !== duration) {
            this.startHeartBeat(duration);
        }
    }

    startHeartBeat(duration) {
        this.stopHeartSync();
        this.heartBeatDuration = duration;
        this.triggerHeartBeat();
        this.heartBeatInterval = setInterval(() => this.triggerHeartBeat(), duration);
    }

    triggerHeartBeat() {
        if (!this.heartLayer) return;
        const maxScale = 1.02 + (this.themeSettings.shaderIntensity / 100) * 0.03;
        this.heartLayer.animate([
            { opacity: this.heartLayer.style.opacity || 0.25, transform: 'scale(1)' },
            { opacity: 0.8, transform: `scale(${maxScale})` },
            { opacity: this.heartLayer.style.opacity || 0.25, transform: 'scale(1)' }
        ], {
            duration: this.heartBeatDuration || 800,
            easing: 'ease-in-out'
        });
    }

    stopHeartSync() {
        if (this.heartBeatInterval) {
            clearInterval(this.heartBeatInterval);
            this.heartBeatInterval = null;
        }
    }
}
