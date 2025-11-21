// --- SOUND ENGINE (Web Audio API) ---
export class SoundEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.activeOscillators = [];
        this.activeIntervals = [];
        this.currentSoundMode = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.3; // Increased Volume
            this.masterGain.connect(this.ctx.destination);
            this.initialized = true;
        } catch (e) {
            console.error("Web Audio API no soportada");
        }
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    stopAll() {
        // Stop oscillators
        this.activeOscillators.forEach(node => {
            try {
                if(node.stop) node.stop();
                node.disconnect();
            } catch(e) {}
        });
        this.activeOscillators = [];

        // Clear intervals
        this.activeIntervals.forEach(i => clearInterval(i));
        this.activeIntervals = [];
        
        this.currentSoundMode = null;
    }

    // --- GENERATORS ---

    playTone(freq, type = 'sine', duration = 0.5, vol = 0.1) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playNoise(duration = 1, type = 'white', vol = 0.2) {
        if (!this.ctx) return;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        let localLastOut = 0; // Use local variable for pink noise generation

        for (let i = 0; i < bufferSize; i++) {
            if (type === 'white') {
                data[i] = Math.random() * 2 - 1;
            } else {
                // Pink noise approx
                const white = Math.random() * 2 - 1;
                data[i] = (localLastOut + (0.02 * white)) / 1.02;
                localLastOut = data[i];
                data[i] *= 3.5; 
            }
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.value = vol; 
        
        noise.connect(gain);
        gain.connect(this.masterGain);
        noise.start();
    }

    // --- MODES ---

    setMode(mode) {
        if (this.currentSoundMode === mode) return;
        this.stopAll();
        this.currentSoundMode = mode;
        this.resume();

        switch(mode) {
            case 'GOD_MODE':
                this.startDrone(432, 'sine', 0.3);
                this.startDrone(648, 'sine', 0.15); // 5th
                break;
            case 'MAGIC_HOUR':
                this.startDrone(110, 'sine', 0.3); // Low A
                this.startDrone(330, 'sine', 0.1); // E (Harmonic)
                break;
            case 'WIKI_HOLE':
                this.startDataStream();
                break;
            case 'JUSTICE_MODE':
                this.startDrone(150, 'sawtooth', 0.15); // Aggressive
                break;
            case 'EPIPHANY':
                this.playTone(880, 'sine', 2, 0.3);
                this.startDrone(528, 'sine', 0.2);
                break;
            case 'VOID_MODE':
                this.startStatic();
                break;
            case 'GHOST_MODE':
                this.startGhostAmbience();
                break;
            case 'MELTDOWN':
                this.startSiren();
                break;
            case 'ZOMBIE_MODE':
                this.startDrone(60, 'sawtooth', 0.2); // Low rumble
                break;
            case 'DOOMSCROLLING':
                this.startDrone(40, 'sine', 0.4); // Sub-bass
                this.startStatic(); // + Static
                break;
            case 'CRITICAL':
                this.startBeep();
                break;
        }
    }

    startDataStream() {
        if (!this.ctx) return;
        const interval = setInterval(() => {
            const freq = 800 + Math.random() * 800;
            this.playTone(freq, 'square', 0.05, 0.1);
        }, 100);
        this.activeIntervals.push(interval);
    }

    startGhostAmbience() {
        if (!this.ctx) return;
        // Continuous low pink noise loop
        const interval = setInterval(() => {
            this.playNoise(2.0, 'pink', 0.05); // Very quiet, overlapping
        }, 1500);
        this.activeIntervals.push(interval);
        // Initial start
        this.playNoise(2.0, 'pink', 0.05);
    }

    startDrone(freq, type, vol) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.value = freq;
        
        gain.gain.value = 0;
        gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.5); // Faster Fade in
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        
        this.activeOscillators.push(osc);
        this.activeOscillators.push(gain);
    }

    startSiren() {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.value = 440;
        
        gain.gain.value = 0.2; // Increased Siren Volume
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        
        this.activeOscillators.push(osc);
        
        // LFO for siren pitch
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 2; // 2Hz cycle
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 200; // +/- 200Hz
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        
        this.activeOscillators.push(lfo);
        this.activeOscillators.push(lfoGain);
    }

    startStatic() {
        if (!this.ctx) return;
        // Loop noise buffer
        const interval = setInterval(() => {
            this.playNoise(0.5, 'white');
        }, 400);
        this.activeIntervals.push(interval);
    }

    startBeep() {
        if (!this.ctx) return;
        const interval = setInterval(() => {
            this.playTone(880, 'square', 0.1, 0.2);
        }, 1000);
        this.activeIntervals.push(interval);
    }
}
