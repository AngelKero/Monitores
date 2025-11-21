import { SoundEngine } from './audio.js';
import { HollowKnightAudioStrategy, SilentAudioStrategy } from './strategies.js';

export class AudioManager {
    constructor() {
        this.strategies = {
            'default': new SoundEngine(),
            'hollow_knight': new HollowKnightAudioStrategy(),
            'silent': new SilentAudioStrategy()
        };
        this.currentStrategy = this.strategies['default'];
        this.currentMode = null;
    }

    init() {
        Object.values(this.strategies).forEach(s => {
            if (s.init) s.init();
        });
    }

    setSource(sourceKey) {
        if (!this.strategies[sourceKey]) {
            console.warn(`Audio source '${sourceKey}' not found.`);
            return;
        }

        // Stop current strategy
        this.currentStrategy.stopAll();

        // Switch strategy
        this.currentStrategy = this.strategies[sourceKey];

        // Resume/Apply current mode to new strategy
        if (this.currentMode) {
            this.currentStrategy.setMode(this.currentMode);
        }
    }

    // Proxy methods to current strategy
    resume() {
        this.currentStrategy.resume();
    }

    stopAll() {
        this.currentStrategy.stopAll();
    }

    setMode(mode) {
        this.currentMode = mode;
        this.currentStrategy.setMode(mode);
    }
}
