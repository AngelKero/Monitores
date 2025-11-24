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
                this.startGodModeAmbience();
                break;
            case 'MAGIC_HOUR':
                this.startMagicHourAmbience();
                break;
            case 'WIKI_HOLE':
                this.startWikiHoleAmbience();
                break;
            case 'JUSTICE_MODE':
                this.startJusticeModeAmbience();
                break;
            case 'EPIPHANY':
                this.startEpiphanyAmbience();
                break;
            case 'VOID_MODE':
                this.startVoidModeAmbience();
                break;
            case 'GHOST_MODE':
                this.startGhostModeAmbience();
                break;
            case 'MELTDOWN':
                this.startMeltdownAmbience();
                break;
            case 'ZOMBIE_MODE':
                this.startZombieModeAmbience();
                break;
            case 'DOOMSCROLLING':
                this.startDoomscrollingAmbience();
                break;
            case 'CRITICAL':
                this.startBeep();
                break;
        }
    }

    startGodModeAmbience() {
        if (!this.ctx) return;

        // 1. Deep Bass Drone (The Power) - A1 (55Hz)
        this.startDrone(55, 'triangle', 0.4);
        this.startDrone(110, 'sine', 0.3); // Octave up for reinforcement

        // 2. The "Choir" (Mystical Chords) - A Major Add9
        // A3 (220), C#4 (277), E4 (330), B4 (493)
        const chord = [220, 277.18, 329.63, 493.88]; 
        chord.forEach(freq => {
            // Main note
            this.startDrone(freq, 'sine', 0.1);
            // Detuned slightly for "chorus" effect
            this.startDrone(freq * 1.01, 'sine', 0.05);
        });

        // 3. Slow "War Drum" / Heartbeat of the Universe
        const drumInterval = setInterval(() => {
            this.playTone(45, 'square', 0.3, 0.4); // Punchy low
            // Simulate a "boom" with a second lower tone
            setTimeout(() => this.playTone(35, 'sine', 0.8, 0.5), 50);
        }, 4000); // Every 4 seconds
        this.activeIntervals.push(drumInterval);

        // 4. Random "Divine Sparks" (Arpeggios)
        // A Lydian Scale (Mystical): A, B, C#, D#, E, F#, G#
        const scale = [880, 987.77, 1108.73, 1244.51, 1318.51, 1479.98, 1661.22];
        const arpInterval = setInterval(() => {
            if (Math.random() > 0.4) { // 60% chance to play
                const note = scale[Math.floor(Math.random() * scale.length)];
                // Play with long release for "echo" feel
                this.playTone(note, 'sine', 1.5, 0.08);
                // Play a harmonic
                this.playTone(note * 2, 'sine', 1.5, 0.02);
            }
        }, 250); // Fast checks
        this.activeIntervals.push(arpInterval);
    }

    startMagicHourAmbience() {
        if (!this.ctx) return;
        // Warm, nostalgic, lo-fi. Major 7th chords.
        // C Major 7: C (261), E (329), G (392), B (493)
        const chord = [261.63, 329.63, 392.00, 493.88];
        chord.forEach(freq => {
            this.startDrone(freq, 'sine', 0.15);
            // Slight detune for warmth
            this.startDrone(freq * 1.005, 'sine', 0.05);
        });
        // Gentle "wind" or tape hiss
        const hissInterval = setInterval(() => {
            this.playNoise(1.0, 'pink', 0.02);
        }, 900);
        this.activeIntervals.push(hissInterval);
    }

    startWikiHoleAmbience() {
        if (!this.ctx) return;
        // Data stream, glitchy, fast arpeggios.
        // Computer thinking sounds.
        const baseFreqs = [440, 880, 1760];
        const interval = setInterval(() => {
            const freq = baseFreqs[Math.floor(Math.random() * baseFreqs.length)] * (1 + Math.random() * 0.5);
            this.playTone(freq, 'square', 0.05, 0.05);
            if (Math.random() > 0.7) {
                this.playTone(freq * 2, 'sawtooth', 0.02, 0.03); // Glitch
            }
        }, 80); // Very fast
        this.activeIntervals.push(interval);
        // Underlying hum
        this.startDrone(110, 'square', 0.05);
    }

    startJusticeModeAmbience() {
        if (!this.ctx) return;
        // Aggressive, heroic, brass-like synths.
        // D Minor: D (146), F (174), A (220)
        this.startDrone(73.42, 'sawtooth', 0.3); // Low D Bass
        this.startDrone(146.83, 'sawtooth', 0.2); // D
        this.startDrone(220.00, 'sawtooth', 0.15); // A (Power chord feel)
        
        // Rhythmic pulse
        const pulseInterval = setInterval(() => {
            this.playTone(73.42, 'sawtooth', 0.2, 0.3);
        }, 500); // Driving beat
        this.activeIntervals.push(pulseInterval);
    }

    startEpiphanyAmbience() {
        if (!this.ctx) return;
        // Angelic, high-pitched, shimmering.
        // E Major: E (329), G# (415), B (493)
        const chord = [659.25, 830.61, 987.77]; // High octave
        chord.forEach(freq => {
            this.startDrone(freq, 'sine', 0.1);
            this.startDrone(freq * 1.002, 'sine', 0.1); // Shimmer
        });
        // Rising tones
        const riseInterval = setInterval(() => {
            this.playTone(1318.51 + Math.random() * 500, 'sine', 1.0, 0.05);
        }, 2000);
        this.activeIntervals.push(riseInterval);
    }

    startVoidModeAmbience() {
        if (!this.ctx) return;
        // Empty, wind, deep sub-bass.
        this.startDrone(30, 'sine', 0.5); // Deep sub
        // Wind gusts
        const windInterval = setInterval(() => {
            this.playNoise(3.0, 'pink', 0.05 + Math.random() * 0.05);
        }, 2500);
        this.activeIntervals.push(windInterval);
        this.playNoise(3.0, 'pink', 0.05);
    }

    startGhostModeAmbience() {
        if (!this.ctx) return;
        // Eerie, dissonant, whispering.
        // Diminished intervals
        this.startDrone(200, 'sine', 0.1);
        this.startDrone(290, 'sine', 0.1); // Tritone-ish
        
        // Random whispers
        const whisperInterval = setInterval(() => {
            this.playNoise(0.5, 'white', 0.03);
            if(Math.random() > 0.5) {
                this.playTone(800 + Math.random() * 200, 'sine', 0.5, 0.02); // Eerie whistle
            }
        }, 1200);
        this.activeIntervals.push(whisperInterval);
    }

    startMeltdownAmbience() {
        if (!this.ctx) return;
        // Chaotic, siren-like, dissonant.
        this.startSiren(); // Keep the siren
        // Add chaotic noise bursts
        const chaosInterval = setInterval(() => {
            this.playNoise(0.2, 'white', 0.1);
            this.playTone(100 + Math.random() * 1000, 'sawtooth', 0.1, 0.1);
        }, 300);
        this.activeIntervals.push(chaosInterval);
    }

    startZombieModeAmbience() {
        if (!this.ctx) return;
        // Sluggish, low frequency, detuned.
        this.startDrone(50, 'sawtooth', 0.2);
        this.startDrone(52, 'sawtooth', 0.2); // Heavy beating/detune
        
        // Slow groans
        const groanInterval = setInterval(() => {
            this.playTone(40 + Math.random() * 10, 'triangle', 1.0, 0.2);
        }, 3000);
        this.activeIntervals.push(groanInterval);
    }

    startDoomscrollingAmbience() {
        if (!this.ctx) return;
        // Anxiety-inducing, repetitive.
        this.startDrone(40, 'sine', 0.4); // Sub-bass
        // Repetitive high ping
        const pingInterval = setInterval(() => {
            this.playTone(2000, 'sine', 0.1, 0.05); // Notification sound-ish
        }, 800);
        this.activeIntervals.push(pingInterval);
        // Static
        this.startStatic();
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
