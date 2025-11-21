/**
 * Estrategias de Efectos Visuales
 * Define el comportamiento visual para cada modo especial.
 */

const VisualStrategies = {
    GOD_MODE: {
        mount(overlay, canvas) {
            const interval = setInterval(() => {
                const p = document.createElement('div');
                const symbols = ['✨', '⚡️', '🧿', '🪶', '🕸️', '💠'];
                p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                p.className = 'effect-particle text-2xl absolute opacity-0';
                p.style.left = Math.random() * 100 + 'vw';
                p.style.animation = `floatUp ${3 + Math.random() * 2}s linear forwards`;
                p.style.color = Math.random() > 0.5 ? '#facc15' : '#ffffff'; // Yellow or White
                p.style.textShadow = '0 0 15px rgba(250,204,21,0.8)';
                overlay.appendChild(p);

                // Cleanup particle
                setTimeout(() => p.remove(), 5000);
            }, 200);

            return () => clearInterval(interval);
        }
    },

    MELTDOWN: {
        mount(overlay, canvas) {
            overlay.classList.add('flash-screen');
            document.body.classList.add('shake-screen');

            const interval = setInterval(() => {
                // Random Warning Text
                const w = document.createElement('div');
                const warnings = ['⚠️ ERROR', 'CRITICAL', 'FAIL', '🔥', '☢️', 'MELTDOWN', 'SYSTEM HALT'];
                w.textContent = warnings[Math.floor(Math.random() * warnings.length)];
                w.className = 'effect-particle font-black text-red-500 absolute';
                w.style.fontSize = (20 + Math.random() * 60) + 'px';
                w.style.left = Math.random() * 90 + 'vw';
                w.style.top = Math.random() * 90 + 'vh';
                w.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
                w.style.opacity = '0.8';
                w.style.textShadow = '0 0 10px red';
                overlay.appendChild(w);

                // Explosion
                const exp = document.createElement('div');
                exp.textContent = '💥';
                exp.className = 'effect-particle text-6xl absolute';
                exp.style.left = Math.random() * 90 + 'vw';
                exp.style.top = Math.random() * 90 + 'vh';
                exp.style.animation = 'explode 0.5s ease-out forwards';
                overlay.appendChild(exp);

                setTimeout(() => { w.remove(); exp.remove(); }, 800);
            }, 150);

            return () => {
                clearInterval(interval);
                overlay.classList.remove('flash-screen');
                document.body.classList.remove('shake-screen');
            };
        }
    },

    VOID_MODE: {
        mount(overlay, canvas) {
            // Create Static Layer
            const staticLayer = document.createElement('div');
            staticLayer.className = "absolute inset-0 tv-static";
            overlay.appendChild(staticLayer);

            // Create CRT Layer
            const crtLayer = document.createElement('div');
            crtLayer.className = "absolute inset-0 crt-overlay";
            overlay.appendChild(crtLayer);

            // Text
            const txt = document.createElement('div');
            txt.className = "absolute inset-0 flex items-center justify-center text-4xl font-mono font-bold text-slate-500 opacity-50 tracking-widest";
            txt.innerText = "NO SIGNAL";
            overlay.appendChild(txt);

            return () => {}; // No interval to clear, DOM is cleared by Engine
        }
    },

    WIKI_HOLE: {
        mount(overlay, canvas) {
            return startMatrixRain(canvas, '#06b6d4'); // Cyan
        }
    },

    ZOMBIE_MODE: {
        mount(overlay, canvas) {
            return startFog(canvas, '#3f6212'); // Lime/Green
        }
    },

    DOOMSCROLLING: {
        mount(overlay, canvas) {
            const v = document.createElement('div');
            v.className = "absolute inset-0 doom-vignette";
            overlay.appendChild(v);
            return () => {};
        }
    },

    EPIPHANY: {
        mount(overlay, canvas) {
            const glow = document.createElement('div');
            glow.className = "absolute inset-0 epiphany-glow";
            overlay.appendChild(glow);
            return startLightRays(canvas);
        }
    },

    MAGIC_HOUR: {
        mount(overlay, canvas) {
            return startFireflies(canvas);
        }
    },

    JUSTICE_MODE: {
        mount(overlay, canvas) {
            return startEmbers(canvas);
        }
    },

    GHOST_MODE: {
        mount(overlay, canvas) {
            return startMist(canvas);
        }
    }
};

// --- CANVAS HELPERS ---

function startLightRays(canvas) {
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let angle = 0;
    let animationFrame;
    
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        
        // Draw rays
        const gradient = ctx.createRadialGradient(0, 0, 50, 0, 0, Math.max(canvas.width, canvas.height));
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        
        for(let i=0; i<8; i++) {
            ctx.rotate(Math.PI / 4);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(100, -1000); // Wide ray
            ctx.lineTo(-100, -1000);
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.restore();
        angle += 0.002;
        animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animationFrame);
}

function startFireflies(canvas) {
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for(let i=0; i<30; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random(),
            fadeSpeed: 0.01 + Math.random() * 0.02
        });
    }

    let animationFrame;
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.opacity += p.fadeSpeed;
            if (p.opacity > 1 || p.opacity < 0) p.fadeSpeed *= -1;
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Wrap around
            if(p.x < 0) p.x = canvas.width;
            if(p.x > canvas.width) p.x = 0;
            if(p.y < 0) p.y = canvas.height;
            if(p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168, 85, 247, ${Math.abs(p.opacity)})`; // Purple
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#a855f7';
            ctx.fill();
        });
        
        animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animationFrame);
}

function startEmbers(canvas) {
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const createParticle = () => ({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 4 + 1,
        speedY: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 2,
        life: 1
    });

    for(let i=0; i<50; i++) particles.push(createParticle());

    let animationFrame;
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            p.y -= p.speedY;
            p.x += p.speedX;
            p.life -= 0.01;
            
            if (p.life <= 0) particles[i] = createParticle();

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(234, 88, 12, ${p.life})`; // Orange
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ea580c';
            ctx.fill();
        });
        
        animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animationFrame);
}

function startMist(canvas) {
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for(let i=0; i<20; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 100 + 50,
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2
        });
    }

    let animationFrame;
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            ctx.beginPath();
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
            g.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
            g.addColorStop(1, 'transparent');
            ctx.fillStyle = g;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.dx;
            p.y += p.dy;
            
            if(p.x < -100) p.x = canvas.width + 100;
            if(p.x > canvas.width + 100) p.x = -100;
            if(p.y < -100) p.y = canvas.height + 100;
            if(p.y > canvas.height + 100) p.y = -100;
        });
        
        animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animationFrame);
}

function startMatrixRain(canvas, color) {
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    let animationFrame;
    const draw = () => {
        // Use destination-out to fade existing pixels to transparent
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Fade speed
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        
        ctx.fillStyle = color;
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animationFrame);
}

function startFog(canvas, color) {
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for(let i=0; i<50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 50 + 20,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        });
    }

    let animationFrame;
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            ctx.beginPath();
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
            g.addColorStop(0, color + '40'); // Transparent hex
            g.addColorStop(1, 'transparent');
            ctx.fillStyle = g;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.dx;
            p.y += p.dy;
            
            if(p.x < -50) p.x = canvas.width + 50;
            if(p.x > canvas.width + 50) p.x = -50;
            if(p.y < -50) p.y = canvas.height + 50;
            if(p.y > canvas.height + 50) p.y = -50;
        });
        
        animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animationFrame);
}
