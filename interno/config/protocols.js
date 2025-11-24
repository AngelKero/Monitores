export const protocolGuides = {
    "EVACUACIÓN SOCIAL": {
        desc: "El usuario está en niveles críticos de ansiedad. Su sistema nervioso está en modo 'huida'.",
        tips: ["No le hables ni le preguntes 'qué tienes'.", "Déjalo irse a un lugar privado inmediatamente.", "No te lo tomes personal, es biológico."],
        selfHelp: ["Sal de ahí AHORA. No pidas permiso.", "Ve al baño o a tu coche.", "Respira en caja (4-4-4-4)."],
        icon: "🚨"
    },
    "ESCUDO SOCIAL": {
        desc: "La batería social está baja. El usuario puede interactuar, pero con esfuerzo limitado.",
        tips: ["Evita temas profundos o conflictivos.", "Dale espacio físico.", "Si se queda callado, es normal."],
        selfHelp: ["Ponte en modo 'observador'.", "Limita tus respuestas a lo necesario.", "Planea tu salida en 30 min."],
        icon: "🛡️"
    },
    "BUNKER MODE": {
        desc: "Sobrecarga sensorial extrema. El cerebro está bloqueando inputs para no colapsar.",
        tips: ["Baja la voz y apaga luces fuertes.", "No esperes respuestas rápidas.", "Déjalo usar audífonos o irse a un cuarto oscuro."],
        selfHelp: ["Ponte audífonos con cancelación de ruido.", "Apaga la luz o usa lentes oscuros.", "Métete bajo una manta pesada."],
        icon: "☢️"
    },
    "REDUCCIÓN DE RUIDO": {
        desc: "El entorno es demasiado ruidoso o brillante. Irritabilidad en aumento.",
        tips: ["Si tiene audífonos puestos, NO le hables.", "Baja el volumen de la música/TV.", "Usa mensajería en lugar de hablar."],
        selfHelp: ["Reduce inputs: Audífonos ON.", "Baja el brillo de tus pantallas.", "Aléjate de fuentes de olor fuerte."],
        icon: "🔇"
    },
    "JUMPSTART": {
        desc: "Parálisis por falta de dopamina. Quiere hacer cosas pero no puede empezar.",
        tips: ["Pon música animada.", "Ofrécele un café o algo dulce.", "Haz 'Body Doubling': siéntate a su lado trabajando en lo tuyo."],
        selfHelp: ["Pon tu canción favorita a todo volumen.", "Haz algo ridículamente pequeño (ej. abrir un archivo).", "Come algo dulce."],
        icon: "⚡"
    },
    "AHORRO DE ENERGÍA": {
        desc: "Batería baja. Funciona en modo 'Solo Lectura'.",
        tips: ["No le pidas decisiones complejas.", "Cancela planes que requieran mucha energía.", "Déjalo descansar sin culpa."],
        selfHelp: ["Di 'NO' a todo lo nuevo.", "Cancela reuniones no vitales.", "Haz tareas mecánicas que no requieran pensar."],
        icon: "🪫"
    },
    "DESCONGELAMIENTO": {
        desc: "Parálisis por ansiedad ante un evento futuro (Waiting Mode).",
        tips: ["Recuérdale la hora exacta del evento.", "Ayúdale a hacer una tarea pequeña y estúpida para romper el hielo.", "No le añadas más presión."],
        selfHelp: ["Pon una alarma 15 min antes del evento.", "Haz algo que puedas dejar a medias.", "Valida que la hora es correcta."],
        icon: "🧊"
    },
    "MANTENIMIENTO BIO": {
        desc: "Hiperfoco intenso pero descuidando necesidades básicas.",
        tips: ["Ponle un vaso de agua en el escritorio sin decir nada.", "No le hables, solo déjale snacks.", "No rompas su concentración."],
        selfHelp: ["Bebe agua AHORA.", "Estira las piernas 30 segundos.", "Lleva snacks al escritorio."],
        icon: "🚽"
    },
    "ALIMENTACIÓN EMERGENCIA": {
        desc: "Malhumor extremo por hambre (Hanger). Peligro.",
        tips: ["NO DISCUTAS.", "Dale comida (azúcar/carbohidratos) inmediatamente.", "Espera 15 min después de comer para hablar."],
        selfHelp: ["COME ALGO YA. No importa qué.", "No tomes decisiones hasta comer.", "Avisa: 'Estoy hangry, dame 10 min'."],
        icon: "🍔"
    },
    "MODO RECUPERACIÓN": {
        desc: "El sistema se reinició después de un colapso. Fragilidad alta.",
        tips: ["Tráele una manta y agua.", "Pon su serie favorita.", "Silencio absoluto y cero exigencias."],
        selfHelp: ["Acuéstate.", "Hidrátate mucho.", "Pon tu serie de confort (la que has visto 10 veces)."],
        icon: "🛌"
    },
    "ATERRIZAJE FORZOSO": {
        desc: "Cansado pero acelerado (Wired but Tired).",
        tips: ["Ayúdale a 'bajar revoluciones'.", "No le des nuevas ideas o proyectos.", "Sugiérele ir a dormir suavemente."],
        selfHelp: ["Deja las pantallas.", "Ducha caliente.", "Escribe todo lo que tienes en la cabeza para vaciarla."],
        icon: "🛬"
    },
    "SQUIRREL MODE": {
        desc: "Alta energía y alta dispersión. Saltando de tema en tema.",
        tips: ["Ayúdale a anotar sus ideas para que no se pierdan.", "Recuérdale suavemente qué estaba haciendo.", "No te rías si cambia de tema 5 veces."],
        selfHelp: ["Escribe tus ideas en post-its.", "Cierra pestañas del navegador.", "Usa un timer visual."],
        icon: "🐿️"
    },
    "SISTEMA NOMINAL": {
        desc: "Todo funciona correctamente. El sistema está operativo y feliz.",
        tips: ["Aprovecha para hablar o colaborar.", "Disfruta el momento.", "Invítale un café."],
        selfHelp: ["Disfruta tu cerebro funcional.", "Avanza en tus proyectos importantes.", "No olvides tomar agua."],
        icon: "✅"
    },
    "GOD_MODE": {
        desc: "ESTADO DE RESONANCIA COGNITIVA ABSOLUTA. La latencia entre el pensamiento y la ejecución se reduce a cero. El cerebro deja de procesar información linealmente y accede a un reconocimiento de patrones instantáneo y multivariable. Se experimenta una disolución de los límites del cuerpo y una conexión directa con la lógica subyacente de la realidad. Las epifanías no ocurren; fluyen constantemente.",
        tips: [
            "COMUNICACIÓN ASÍNCRONA OBLIGATORIA: No le hables. Envíale un mensaje de texto. Hablar fuerza un 'Context Switch' que cuesta 25 minutos de recuperación. Leer un mensaje no.",
            "ROL DE FIREWALL: Tu trabajo no es interactuar, es interceptar. Si alguien más intenta interrumpirlo, tú eres la barrera de seguridad.",
            "DROP & GO (Entrega Pasiva): Deja suministros (café/snacks) en su visión periférica y retírate en silencio. No esperes un 'gracias' inmediato; el módulo de cortesía social está apagado para ahorrar energía.",
            "EFECTO DEL OBSERVADOR: Evita el contacto visual directo. Sentirse observado puede colapsar el estado de flujo por autoconciencia."
        ],
        selfHelp: [
            "VOLCADO DE MEMORIA (RAM a DISCO): Estás operando en RAM volátil. Si te duermes o te interrumpen, perderás los datos. Externaliza (Escribe/Graba) cada idea inmediatamente.",
            "GESTIÓN TÉRMICA: Tus sensores físicos están silenciados por el software. Bebe agua mecánicamente cada 30 min aunque no sientas sed, o tendrás dolor de cabeza post-procesamiento.",
            "APAGADO CONTROLADO (Graceful Shutdown): No intentes dormir inmediatamente después de salir del estado. Tu cerebro sigue girando a 10,000 RPM. Necesitas 1 hora de 'enfriamiento' (música, oscuridad, stimming) para no quemar fusibles."
        ],
        icon: "🌟"
    },
    "MAGIC_HOUR": {
        desc: "La hora de las brujas. El mundo duerme y tu cerebro despierta.",
        tips: ["No esperes que te conteste mensajes ahora.", "Déjalo en su mundo nocturno.", "Mañana estará cansado, ten paciencia."],
        selfHelp: ["Escribe sin filtro.", "Disfruta el silencio.", "Prepárate para estar zombie mañana."],
        icon: "🦉"
    },
    "WIKI_HOLE": {
        desc: "Has caído en una espiral de información infinita. Sabes mucho sobre nada útil ahora mismo.",
        tips: ["Prepárate para escuchar datos random sobre el Imperio Romano.", "Finge interés o huye discretamente.", "No intentes cambiar el tema, es imposible."],
        selfHelp: ["Cierra el navegador.", "Levántate de la silla.", "Pregúntate: '¿Esto me sirve para algo?'"],
        icon: "🌀"
    },
    "JUSTICE_MODE": {
        desc: "Sensibilidad a la injusticia activada al 200%. No puedes descansar hasta que la verdad salga a la luz.",
        tips: ["POR FAVOR no le digas 'cálmate'.", "Escucha su monólogo sin debatir.", "Espera a que se le agote la batería de la ira."],
        selfHelp: ["Escribe el rant en notas, no lo publiques.", "Aléjate de Twitter/X.", "Haz ejercicio intenso para quemar la rabia."],
        icon: "⚖️"
    },
    "EPIPHANY": {
        desc: "Reconocimiento de patrones completado. Todo tiene sentido. La solución ha llegado sola.",
        tips: ["Pásale una libreta o algo para escribir.", "No le hables, está 'descargando' información del universo.", "Si te mira raro, no eres tú, es la idea."],
        selfHelp: ["¡ANÓTALO YA!", "Graba una nota de voz.", "No dejes que se escape."],
        icon: "🧩"
    },
    "VOID_MODE": {
        desc: "El sistema se ha desconectado de la realidad. No hay dolor, pero tampoco hay 'tú'.",
        tips: ["No está enojado, está reiniciando.", "No le exijas contacto visual.", "Su cuerpo está ahí, pero la mente no."],
        selfHelp: ["No luches contra la niebla.", "Toca algo frío o rugoso.", "Espera a que pase."],
        icon: "😶"
    },
    "GHOST_MODE": {
        desc: "Deseo extremo de ser invisible. La percepción social es una amenaza.",
        tips: ["Haz como que no lo ves.", "No lo saludes efusivamente.", "Si se esconde, no lo busques."],
        selfHelp: ["Desaparece un rato.", "No contestes mensajes.", "Hazte bolita."],
        icon: "👻"
    },
    "MELTDOWN": {
        desc: "Fallo catastrófico de contención. La agresividad se redirige hacia el propio hardware para evitar dañar a otros.",
        tips: ["Mantén la distancia de seguridad.", "Retira objetos peligrosos del alcance.", "Silencio absoluto. No toques."],
        selfHelp: ["Vete a un lugar seguro.", "Protege tu cabeza.", "No intentes hablar."],
        icon: "⚠️"
    },
    "ZOMBIE_MODE": {
        desc: "El hardware está sufriendo daños por falta de mantenimiento. Alucinaciones leves posibles.",
        tips: ["Mándalo a dormir imperativamente.", "No le creas nada de lo que diga.", "Es inofensivo pero inútil."],
        selfHelp: ["VE A DORMIR.", "No operes maquinaria pesada.", "No mandes mensajes."],
        icon: "🧟"
    },
    "DOOMSCROLLING": {
        desc: "Atrapado en un bucle de información negativa. Parálisis del terror a las 3 AM.",
        tips: ["Quítale el celular suavemente.", "Ofrécele una distracción física (comida/abrazo).", "No le preguntes qué está viendo."],
        selfHelp: ["Tira el celular lejos.", "Cierra los ojos fuerte.", "Respira."],
        icon: "🕸️"
    },
    "FEEDING PROTOCOL": {
        desc: "Irritabilidad por hambre (Hanger). El cerebro no tiene glucosa.",
        tips: ["No preguntes 'qué quieres comer', solo trae comida.", "Algo crujiente o dulce ayuda rápido.", "No discutas hasta que haya comido."],
        selfHelp: ["Come algo dulce YA.", "No hables con nadie.", "Pide perdón luego."],
        icon: "🍔"
    }
};
