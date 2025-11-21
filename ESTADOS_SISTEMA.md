# 🧠 Documentación de Estados del Sistema: Angel's Kernel

Este documento detalla todos los estados posibles dentro de la simulación, sus condiciones de activación lógica y su significado fenomenológico.

---

## 1. Estados Base (Automáticos)

Estos estados se calculan en cada ciclo basándose en los niveles de los sensores.

### A. Nivel de Estimulación (Input)

| Estado | Probabilidad | Condición Lógica | Significado |
| :--- | :---: | :--- | :--- |
| **OPTIMO_FLOW** | 40% | *Default* (Si no se cumplen otros) | Equilibrio sensorial. Capacidad de procesar información sin dolor ni aburrimiento. |
| **HIPO_ESTIMULADO** | 15% | `Dopamina < 40` Y `Carga Sensorial < 30` | "Boredom Pain". El cerebro busca estímulos desesperadamente. Dolor físico por aburrimiento. |
| **ALERTA_SENSORIAL** | 25% | `Ansiedad Social > 50` O `Carga Sensorial > 45` | El entorno es hostil. Las luces brillan más, los ruidos molestan. Irritabilidad leve. |
| **SOBRE_ESTIMULADO** | 15% | `Ansiedad Social > 80` | "Too much people". Deseo de huida inmediata. El procesamiento verbal empieza a fallar. |
| **SHUTDOWN** | 5% | `Carga Sensorial > 65` | Pantallazo azul. El cerebro deja de procesar inputs para protegerse. Desconexión. |

### B. Estado Ejecutivo (Output)

| Estado | Probabilidad | Condición Lógica | Significado |
| :--- | :---: | :--- | :--- |
| **OPERATIVO** | 35% | *Default* | Capacidad de iniciar, mantener y terminar tareas voluntariamente. |
| **DISPERSO** | 30% | `Ansiedad Social > 50` O `Dopamina > 65` | "Squirrel Mode". Alta energía pero sin dirección. Saltando entre 20 pestañas mentales. |
| **FATIGA** | 20% | `Cucharas < 40` | Batería baja. Funciona en modo "Ahorro de Energía". Lentitud cognitiva. |
| **BURNOUT** | 10% | `Cucharas < 25` | Batería agotada. Incapacidad física/mental para realizar tareas complejas. |
| **PARALISIS** | 5% | `Ansiedad Social > 80` O (`Dopamina < 40` Y `Cucharas >= 25`) | "Quiero hacerlo pero no puedo moverme". El cuerpo no obedece a la orden ejecutiva. |

---

## 2. Modos Especiales (Easter Eggs / Extremos)

Estos modos anulan el funcionamiento normal del sistema. Pueden activarse por **condiciones extremas automáticas** o por **detonantes emocionales específicos**.

### 🌟 GOD_MODE (Absolute Flow)
*   **Significado:** Estado de flujo absoluto. Los límites biológicos parecen desaparecer. Omnipotencia creativa temporal.
*   **Probabilidad:** <1% (Muy Raro)
*   **Activación Automática:** `Dopamina ≥ 98` + `Cucharas ≥ 95` + (Resto bajo).
*   **Activación Emocional:** Emoción **Hiperfoco** + `Dopamina > 80` + `Cucharas > 80`.

### ⚠️ MELTDOWN (Fallo Crítico)
*   **Significado:** Colapso del sistema. Explosión de energía desregulada (llanto, gritos, agresividad) por sobrecarga.
*   **Probabilidad:** 5%
*   **Activación Automática:** `Carga Sensorial ≥ 98` + `Cucharas ≤ 5`.
*   **Activación Emocional:** Emoción **Sobrecarga**, **RSD** o **Meltdown** + (`Carga > 80` O `Ansiedad > 80`).

### 🧟 ZOMBIE_MODE (Supervivencia)
*   **Significado:** El cerebro superior se apaga. Solo funciones básicas (comer, dormir, scrollear). Niebla mental densa.
*   **Probabilidad:** 10%
*   **Activación Automática:** `Necesidades Bio ≥ 98` + `Cucharas ≤ 5` + `Dopamina ≤ 10`.
*   **Activación Emocional:** Emoción **Ennui**, **Parálisis** o **Burnout** + `Cucharas < 15`.

### 👻 GHOST_MODE (Invisibilidad)
*   **Significado:** Deseo extremo de desaparecer. Percepción de ser observado como amenaza. Retirada social total.
*   **Probabilidad:** 10%
*   **Activación Automática:** `Ansiedad Social ≥ 98` + `Cucharas ≤ 30`.
*   **Activación Emocional:** Emoción **Miedo** o **Vergüenza** + `Ansiedad Social > 60`.

### 🦉 MAGIC_HOUR (Creatividad Nocturna)
*   **Significado:** 3:00 AM. El mundo duerme, el ruido baja y el cerebro despierta. Claridad nocturna.
*   **Probabilidad:** 5% (Depende de la hora real).
*   **Activación Automática:** Hora real (01:00 - 06:00) + `Dopamina ≥ 80` + `Cucharas ≥ 50`.
*   **Activación Emocional:** Emoción **Nostalgia** + `Carga Sensorial < 30`.

### 🌀 WIKI_HOLE (Espiral de Datos)
*   **Significado:** Hiperfoco en información irrelevante. Leer 50 artículos de Wikipedia seguidos.
*   **Probabilidad:** 15%
*   **Activación Emocional:** Emoción **Curiosidad** + `Dopamina > 60` + `Cucharas > 30`.

### 🧩 EPIPHANY (Claridad)
*   **Significado:** Todo conecta. Reconocimiento de patrones instantáneo. La solución aparece sola.
*   **Probabilidad:** 5%
*   **Activación Automática:** `Dopamina ≥ 90` + `Cucharas ≥ 80` + (Resto bajo).
*   **Activación Emocional:** Emoción **Alegría** + `Dopamina > 80` + `Cucharas > 70`.

### ⚖️ JUSTICE_MODE (Furia Justiciera)
*   **Significado:** Sensibilidad extrema a la injusticia. Necesidad imperiosa de corregir algo incorrecto (usualmente en internet).
*   **Probabilidad:** 10%
*   **Activación Emocional:** Emoción **Furia** o **Justicia** + `Cucharas > 40`.

### 🕸️ DOOMSCROLLING (Bucle de Ansiedad)
*   **Significado:** Parálisis del terror consumiendo contenido negativo. Incapacidad de dejar el teléfono.
*   **Probabilidad:** 15%
*   **Activación Emocional:** Emoción **Ansiedad** + `Cucharas < 30`.

### 😶 VOID_MODE (Disociación)
*   **Significado:** Ausencia de emoción y sensación. "No soy real". Desconexión del cuerpo.
*   **Probabilidad:** 5%
*   **Activación Automática:** Todos los stats ≤ 5.
*   **Activación Emocional:** Emoción **Tristeza** o **Shutdown** + `Cucharas < 20`.

---

## 3. Catálogo de Emociones (Triggers)

Estas emociones actúan como modificadores del sistema. Si se cumplen las condiciones, activan un Modo Especial. Si no, solo colorean el semáforo.

### Inside Out 1
*   **☀️ Alegría:** Trigger de *Epiphany*.
*   **🌧️ Tristeza:** Trigger de *Void Mode*.
*   **🔥 Furia:** Trigger de *Justice Mode*.
*   **⚡️ Temor:** Trigger de *Ghost Mode*.
*   **🥦 Desagrado:** Sin modo especial. Activa "Rechazo Sensorial" (Semáforo Amarillo/Verde).

### Inside Out 2
*   **🌪️ Ansiedad:** Trigger de *Doomscrolling*.
*   **🔍 Curiosidad:** Trigger de *Wiki Hole*.
*   **📱 Ennui:** Trigger de *Zombie Mode*.
*   **🙈 Vergüenza:** Trigger de *Ghost Mode*.
*   **🧸 Nostalgia:** Trigger de *Magic Hour*.

### Neurodivergentes (Special Pack)
*   **🤯 Sobrecarga:** Trigger de *Meltdown*.
*   **🧊 Parálisis:** Trigger de *Zombie Mode*.
*   **🎭 Masking:** Sin modo especial. Activa "Masking Activo" (Semáforo Gris/Amarillo).
*   **🕯️ Burnout:** Trigger de *Zombie Mode*.
*   **⚖️ Justicia:** Trigger de *Justice Mode*.
*   **🌀 Stimming:** Sin modo especial. Activa "Regulando..." (Semáforo Verde Lima).
*   **💔 Disforia (RSD):** Trigger de *Meltdown*.
*   **🔭 Hiperfoco:** Trigger de *God Mode*.
