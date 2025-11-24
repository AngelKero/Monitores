export class TutorialComponent {
    constructor() {
        this.storageKey = 'brainkernel_tutorial_seen';
        this.steps = [
            {
                target: 'sensor-dopamina',
                title: 'Dopamina (Interés)',
                desc: 'El combustible de tu atención.<br><br><strong>✨ Óptimo (Flow):</strong> Inmersión total y natural en lo que haces.<br><br><strong>📉 Bajo (Aburrido):</strong> Búsqueda desesperada de estímulos (doloroso).<br><strong>📈 Alto (Disperso):</strong> "Modo Ardilla", saltando entre tareas sin terminar nada.'
            },
            {
                target: 'sensor-cucharas',
                title: 'Cucharas (Energía)',
                desc: 'Tu batería diaria (Teoría de las Cucharas).<br><br><strong>✨ Óptimo:</strong> Tienes energía de reserva para hobbies.<br><br><strong>📉 Bajo (Fatiga):</strong> Solo puedes hacer lo esencial.<br><strong>💀 Crítico (Burnout):</strong> Deuda de energía. Mañana pagarás el doble.'
            },
            {
                target: 'sensor-carga',
                title: 'Carga Sensorial',
                desc: 'Ruido, luces, texturas.<br><br><strong>✨ Óptimo (Calma):</strong> Filtras el fondo sin esfuerzo.<br><br><strong>📈 Alto (Sobrecarga):</strong> El mundo duele. Riesgo de Shutdown (apagado) o Meltdown (explosión).'
            },
            {
                target: 'sensor-bio',
                title: 'Necesidades Bio',
                desc: 'Hambre, sed, baño.<br><br><strong>✨ Óptimo:</strong> "Cuerpo Invisible" (no sientes molestias).<br><br><strong>📉 Bajo (Hanger):</strong> Mal humor por hambre/sed. El cerebro olvida que tiene cuerpo.'
            },
            {
                target: 'sensor-social',
                title: 'Ansiedad Social',
                desc: 'Costo de interacción.<br><br><strong>✨ Óptimo (Sociable):</strong> Conectas sin "actuar".<br><br><strong>📈 Alto (Masking):</strong> Fingir normalidad cuesta el doble de energía. Riesgo de aislamiento.'
            },
            {
                target: 'sensor-emociones',
                title: 'Modificadores Emocionales',
                desc: 'Estados temporales que alteran las reglas.<br><br>Ejemplo: La <strong>Tristeza</strong> reduce tu velocidad pero aumenta la introspección. La <strong>Furia</strong> da energía pero reduce el control.'
            },
            {
                target: 'card-status-general',
                title: 'Status General (Semáforo)',
                desc: 'Tu nivel de funcionalidad actual.<br><br>🟢 <strong>Nominal:</strong> Todo en orden.<br>🟡 <strong>Alerta:</strong> Algo falla (Hambre, Ruido). Atiende la necesidad.<br>🔴 <strong>Crítico:</strong> Fallo del sistema.'
            },
            {
                target: 'card-status-general',
                title: 'Asistente de Calibración',
                desc: '¿No sabes cómo te sientes? <strong>Haz click en el semáforo</strong>.<br><br>El sistema te guiará para ajustar tus sensores y encontrar emociones ocultas que podrían estar afectándote.'
            },
            {
                target: 'btn-info-terceros',
                title: 'Ayuda para Terceros',
                desc: 'Si estás en crisis (🔴 Crítico) y no puedes hablar, pulsa este botón y muestra la pantalla a alguien de confianza. Les dará instrucciones claras sobre cómo ayudarte.'
            },
            {
                target: 'card-system-state',
                title: 'Estado del Sistema',
                desc: 'Monitor de procesos cognitivos. Te dice qué está pasando "bajo el capó" de tu cerebro.'
            },
            {
                target: 'container-estimulacion',
                title: 'Nivel de Estimulación',
                desc: '¿Cuánto input estás recibiendo?<br><br>📉 <strong>Hipo:</strong> Falta de estímulo. El cerebro se apaga o busca problemas.<br>📈 <strong>Hiper:</strong> Demasiado estímulo. Riesgo de sobrecarga.'
            },
            {
                target: 'container-ejecutivo',
                title: 'Función Ejecutiva',
                desc: 'Tu capacidad de planificar y decidir.<br><br>✅ <strong>ONLINE:</strong> Puedes tomar decisiones complejas.<br>❌ <strong>OFFLINE:</strong> Solo puedes reaccionar. No intentes cocinar ni organizar tu semana ahora.'
            },
            {
                target: 'card-kernel-log',
                title: 'Kernel Log',
                desc: 'La "caja negra" de tu cerebro.<br><br>Muestra diagnósticos en tiempo real y explica <em>por qué</em> cambió el semáforo (ej. "Detectada caída de Dopamina"). Úsalo para validar lo que sientes.'
            },
            {
                target: 'card-presets',
                title: 'Simular Casos',
                desc: 'Botones de configuración rápida.<br><br>Ajusta todos los sensores instantáneamente para simular situaciones comunes (ej. "Modo Trabajo", "Crisis Sensorial"). Útil para ver cómo reacciona el sistema. <br> Es util si ya eres experto en el manejo de tu cerebro y como funciona. Util si quieres experimentar con diferentes estados sin tener que ajustar cada sensor manualmente.'
            },
            {
                target: 'card-physical',
                title: 'Estados Físicos',
                desc: 'Calibra los sensores según tu condición actual.<br><br>¿Estás enfermo, con sueño o estas relajado? No pierdas tiempo ajustando cada sensor individualmente; usa estos modificadores para reflejar tu estado físico general rápidamente.'
            },
            {
                target: 'section-easter-eggs',
                title: 'Easter Eggs (Rare Drops)',
                desc: 'Eventos aleatorios o especiales.<br><br>A veces el cerebro hace cosas raras. Aquí aparecerán estados únicos desbloqueables (como <strong>Hiperfoco</strong> o <strong>Epifanía</strong>) o eventos de baja probabilidad que cambian la interfaz.'
            },
            {
                target: 'app-title',
                title: '¡Tutorial Completado!',
                desc: 'Has recorrido todos los sistemas.<br><br>Si quieres profundizar en la teoría de los estados y emociones, consulta la <a href="guide.html" class="text-blue-400 underline font-bold hover:text-blue-300">Guía del Usuario</a>.<br><br>¡Disfruta de BrainKernel!'
            }
        ];
        
        this.currentStep = 0;
        this.highlightClasses = [
            'tutorial-highlight', 
            'relative', 
            'z-[70]', 
            'bg-slate-800', 
            'rounded-xl', 
            'shadow-[0_0_60px_rgba(59,130,246,0.6)]', // Strong blue glow
            'ring-2', 
            'ring-blue-400',
            'scale-[1.02]', // Slight pop
            'transition-all',
            'duration-300'
        ];
        this.init();
    }

    init() {
        // Listen for setup completion (first time user)
        window.addEventListener('brainkernel-setup-complete', () => {
            this.startTutorial();
        });

        // Check if we should run it now (returning user who hasn't seen it, or just finished setup before listener was ready?)
        // Actually, if setup is needed, UserSetupComponent runs first.
        // If setup is NOT needed (user exists), we check if tutorial was seen.
        const userExists = localStorage.getItem('brainkernel_user_data');
        const tutorialSeen = localStorage.getItem(this.storageKey);

        if (userExists && !tutorialSeen) {
            // Small delay to ensure UI is ready
            setTimeout(() => this.startTutorial(), 1000);
        }
    }

    startTutorial() {
        // Removed scroll lock to fix scrolling bugs and remove modal behavior
        this.renderOverlay();
        this.showStep(0);
    }

    renderOverlay() {
        // Removed backdrop for non-modal experience
        
        this.tooltip = document.createElement('div');
        // Changed to absolute positioning so it scrolls with the page
        this.tooltip.className = 'absolute z-[80] bg-slate-800 border border-blue-500 text-white p-6 rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.3)] max-w-sm w-full transition-all duration-300 opacity-0';
        
        document.body.appendChild(this.tooltip);

        // Fade in
        requestAnimationFrame(() => {
            this.tooltip.classList.remove('opacity-0');
        });
    }

    showStep(index) {
        if (index >= this.steps.length) {
            this.endTutorial();
            return;
        }

        this.currentStep = index;
        const step = this.steps[index];
        const targetEl = document.getElementById(step.target);

        if (!targetEl) {
            console.warn(`Tutorial target ${step.target} not found, skipping.`);
            this.showStep(index + 1);
            return;
        }

        // Highlight Target
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove(...this.highlightClasses);
        });

        targetEl.classList.add(...this.highlightClasses);
        
        // Smooth scroll to element
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Render Content first to get dimensions
        this.tooltip.innerHTML = `
            <div id="tutorial-arrow" class="absolute w-4 h-4 bg-slate-800 transform rotate-45"></div>
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-bold text-blue-400">${step.title}</h3>
                <span class="text-xs text-slate-500">${index + 1}/${this.steps.length}</span>
            </div>
            <p class="text-slate-300 text-sm mb-6 leading-relaxed">${step.desc}</p>
            <div class="flex justify-end gap-3">
                <button id="btn-skip-tutorial" class="text-slate-500 hover:text-white text-sm px-3 py-1">Saltar</button>
                <button id="btn-next-tutorial" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg">
                    ${index === this.steps.length - 1 ? 'Finalizar' : 'Siguiente →'}
                </button>
            </div>
        `;

        // --- SMART POSITIONING LOGIC ---
        // 1. Constrain Width based on screen
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const maxTooltipWidth = Math.min(380, viewportWidth - 20);
        this.tooltip.style.maxWidth = `${maxTooltipWidth}px`;
        this.tooltip.style.width = '100%';

        // 2. Get Dimensions
        const rect = targetEl.getBoundingClientRect(); // Viewport relative
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const gap = 15; // Space between target and tooltip

        // 3. Determine best side
        // Order of preference: Bottom, Top, Right, Left
        let placement = 'bottom';
        
        // Check if bottom fits
        if (rect.bottom + tooltipRect.height + gap > viewportHeight) {
            // Bottom doesn't fit well. Check Top.
            if (rect.top - tooltipRect.height - gap > 0) {
                placement = 'top';
            } else {
                // Neither fits perfectly vertically. Check sides if desktop?
                if (viewportWidth > 768) {
                     if (rect.right + tooltipRect.width + gap < viewportWidth) placement = 'right';
                     else if (rect.left - tooltipRect.width - gap > 0) placement = 'left';
                }
                // Fallback: whichever vertical side has more space
                const spaceBottom = viewportHeight - rect.bottom;
                const spaceTop = rect.top;
                if (spaceTop > spaceBottom) placement = 'top';
            }
        }

        // 4. Calculate Coordinates
        let top, left;
        const targetCenterX = rect.left + (rect.width / 2);
        const targetCenterY = rect.top + (rect.height / 2);

        if (placement === 'bottom') {
            top = rect.bottom + gap;
            left = targetCenterX - (tooltipRect.width / 2);
        } else if (placement === 'top') {
            top = rect.top - tooltipRect.height - gap;
            left = targetCenterX - (tooltipRect.width / 2);
        } else if (placement === 'right') {
            top = targetCenterY - (tooltipRect.height / 2);
            left = rect.right + gap;
        } else if (placement === 'left') {
            top = targetCenterY - (tooltipRect.height / 2);
            left = rect.left - tooltipRect.width - gap;
        }

        // 5. Clamp to Viewport (Horizontal)
        if (placement === 'top' || placement === 'bottom') {
            const padding = 10;
            if (left < padding) left = padding;
            if (left + tooltipRect.width > viewportWidth - padding) {
                left = viewportWidth - tooltipRect.width - padding;
            }
        }
        
        // 6. Clamp to Viewport (Vertical - for side placements)
        if (placement === 'left' || placement === 'right') {
            const padding = 10;
            if (top < padding) top = padding;
            if (top + tooltipRect.height > viewportHeight - padding) {
                top = viewportHeight - tooltipRect.height - padding;
            }
        }

        // Apply absolute position (add scroll)
        this.tooltip.style.top = `${top + scrollY}px`;
        this.tooltip.style.left = `${left + scrollX}px`;

        // 7. Position Arrow
        const arrow = this.tooltip.querySelector('#tutorial-arrow');
        // Reset styles
        arrow.style = ''; 
        arrow.className = 'absolute w-4 h-4 bg-slate-800 transform rotate-45 border-blue-500'; // Base classes
        
        if (placement === 'bottom') {
            arrow.style.top = '-9px';
            let arrowLeft = targetCenterX - left;
            // Clamp arrow
            if (arrowLeft < 12) arrowLeft = 12;
            if (arrowLeft > tooltipRect.width - 12) arrowLeft = tooltipRect.width - 12;
            arrow.style.left = `${arrowLeft}px`;
            
            // Borders: Top and Left visible (rotated 45deg -> points up)
            arrow.style.borderLeft = '1px solid rgb(59 130 246)';
            arrow.style.borderTop = '1px solid rgb(59 130 246)';
        } else if (placement === 'top') {
            arrow.style.bottom = '-9px';
            let arrowLeft = targetCenterX - left;
            if (arrowLeft < 12) arrowLeft = 12;
            if (arrowLeft > tooltipRect.width - 12) arrowLeft = tooltipRect.width - 12;
            arrow.style.left = `${arrowLeft}px`;

            // Borders: Bottom and Right visible (rotated 45deg -> points down)
            arrow.style.borderRight = '1px solid rgb(59 130 246)';
            arrow.style.borderBottom = '1px solid rgb(59 130 246)';
        } else if (placement === 'right') {
            arrow.style.left = '-9px';
            let arrowTop = targetCenterY - top;
            if (arrowTop < 12) arrowTop = 12;
            if (arrowTop > tooltipRect.height - 12) arrowTop = tooltipRect.height - 12;
            arrow.style.top = `${arrowTop}px`;

            // Borders: Bottom and Left visible (rotated 45deg -> points left)
            arrow.style.borderBottom = '1px solid rgb(59 130 246)';
            arrow.style.borderLeft = '1px solid rgb(59 130 246)';
        } else if (placement === 'left') {
            arrow.style.right = '-9px';
            let arrowTop = targetCenterY - top;
            if (arrowTop < 12) arrowTop = 12;
            if (arrowTop > tooltipRect.height - 12) arrowTop = tooltipRect.height - 12;
            arrow.style.top = `${arrowTop}px`;

            // Borders: Top and Right visible (rotated 45deg -> points right)
            arrow.style.borderTop = '1px solid rgb(59 130 246)';
            arrow.style.borderRight = '1px solid rgb(59 130 246)';
        }

        this.tooltip.classList.remove('opacity-0');

        // Listeners
        document.getElementById('btn-next-tutorial').onclick = () => this.showStep(this.currentStep + 1);
        document.getElementById('btn-skip-tutorial').onclick = () => this.endTutorial();
    }

    endTutorial() {
        // Cleanup
        if (this.tooltip) this.tooltip.remove();
        
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove(...this.highlightClasses);
        });

        // Save state
        localStorage.setItem(this.storageKey, 'true');
    }
}
