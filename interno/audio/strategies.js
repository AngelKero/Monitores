export class SilentAudioStrategy {
    init() {}
    resume() {}
    stopAll() {}
    setMode(mode) {}
}

export class HollowKnightAudioStrategy {
    constructor() {
        this.currentAudio = null;
        this.currentMode = null;
        this.basePath = './audio/Hollow Knight/';
        this.tracks = {
            'GOD_MODE': '25 - Radiance.opus',
            'MAGIC_HOUR': '02 - Dirtmouth.opus',
            'WIKI_HOLE': '07 - Reflection.opus',
            'JUSTICE_MODE': '08 - Mantis Lords.opus',
            'EPIPHANY': '17 - The White Lady.opus',
            'VOID_MODE': '26 - Hollow Knight.opus',
            'GHOST_MODE': '15 - Resting Grounds.opus',
            'MELTDOWN': '04 - False Knight.opus',
            'ZOMBIE_MODE': '10 - Dung Defender.opus',
            'DOOMSCROLLING': '23 - White Palace.opus',
            'CRITICAL': '13 - Decisive Battle.opus',
            'DEFAULT': '01 - Enter Hallownest.opus'
        };
        this.fadeTime = 1000; // 1 second fade
    }

    init() {
        // Preload or setup if needed
    }

    resume() {
        if (this.currentAudio) {
            this.currentAudio.play().catch(e => console.log("Audio play failed", e));
        }
    }

    stopAll() {
        if (this.currentAudio) {
            this.fadeOutAndStop(this.currentAudio);
            this.currentAudio = null;
        }
        this.currentMode = null;
    }

    setMode(mode) {
        if (this.currentMode === mode) return;

        // Map mode to track, fallback to default if not found, or keep silence if intended
        let trackFile = this.tracks[mode];
        if (!trackFile) {
            trackFile = this.tracks['DEFAULT'];
        }

        // If the track is the same as playing (e.g. mapping to same file), don't restart
        if (this.currentAudio && this.currentAudio.src.includes(encodeURIComponent(trackFile))) {
            this.currentMode = mode;
            return;
        }

        this.stopAll();
        this.currentMode = mode;

        if (trackFile) {
            this.playTrack(trackFile);
        }
    }

    playTrack(filename) {
        const audio = new Audio(this.basePath + filename);
        audio.loop = true;
        audio.volume = 0;
        
        audio.play().then(() => {
            this.fadeIn(audio);
        }).catch(e => console.error("Error playing HK track:", e));

        this.currentAudio = audio;
    }

    fadeIn(audio) {
        let vol = 0;
        const interval = setInterval(() => {
            if (!audio || audio.paused) {
                clearInterval(interval);
                return;
            }
            vol += 0.05;
            if (vol >= 0.5) { // Max volume 0.5
                vol = 0.5;
                clearInterval(interval);
            }
            audio.volume = vol;
        }, 50);
    }

    fadeOutAndStop(audio) {
        if (!audio) return;
        let vol = audio.volume;
        const interval = setInterval(() => {
            vol -= 0.05;
            if (vol <= 0) {
                vol = 0;
                audio.pause();
                audio.currentTime = 0;
                clearInterval(interval);
            } else {
                audio.volume = vol;
            }
        }, 50);
    }
}
