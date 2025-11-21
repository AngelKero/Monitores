const emotions = {
    // Inside Out 1
    "joy": { label: "☀️", name: "Alegría", advice: "Disfruta el impulso. Es buen momento para crear.", active: "bg-yellow-400 text-yellow-900 border-yellow-400", inactive: "bg-yellow-400/10 text-yellow-200 border-yellow-400/20 hover:bg-yellow-400/20" },
    "sadness": { label: "🌧️", name: "Tristeza", advice: "Permítete sentirlo. No te fuerces a ser productivo.", active: "bg-blue-500 text-white border-blue-500", inactive: "bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20" },
    "anger": { label: "🔥", name: "Furia", advice: "Canaliza la energía en ejercicio o escritura (sin enviar).", active: "bg-red-600 text-white border-red-600", inactive: "bg-red-600/10 text-red-300 border-red-600/20 hover:bg-red-600/20" },
    "fear": { label: "⚡️", name: "Temor", advice: "Identifica la amenaza. ¿Es real o es ansiedad?", active: "bg-purple-600 text-white border-purple-600", inactive: "bg-purple-600/10 text-purple-300 border-purple-600/20 hover:bg-purple-600/20" },
    "disgust": { label: "🥦", name: "Desagrado", advice: "Algo en el entorno molesta. Revisa olores, texturas o luces.", active: "bg-green-600 text-white border-green-600", inactive: "bg-green-600/10 text-green-300 border-green-600/20 hover:bg-green-600/20" },
    
    // Inside Out 2
    "anxiety": { label: "🌪️", name: "Ansiedad", advice: "Respira. 4-7-8. Esto es temporal.", active: "bg-orange-500 text-white border-orange-500", inactive: "bg-orange-500/10 text-orange-300 border-orange-500/20 hover:bg-orange-500/20" },
    "curiosity": { label: "🔍", name: "Curiosidad", advice: "Sigue el hilo, pero pon un timer.", active: "bg-sky-500 text-white border-sky-500", inactive: "bg-sky-500/10 text-sky-300 border-sky-500/20 hover:bg-sky-500/20" },
    "ennui": { label: "(– _ –)ᶻ 𝗓 𐰁", name: "Ennui", advice: "El aburrimiento es señal de falta de dopamina. Busca novedad pequeña.", active: "bg-indigo-900 text-indigo-200 border-indigo-900", inactive: "bg-indigo-900/30 text-indigo-300 border-indigo-900/40 hover:bg-indigo-900/50" },
    "embarrassment": { label: "(◞‸◟ㆀ)", name: "Vergüenza", advice: "Nadie se acuerda tanto como tú. Sé amable contigo.", active: "bg-pink-400 text-pink-900 border-pink-400", inactive: "bg-pink-400/10 text-pink-300 border-pink-400/20 hover:bg-pink-400/20" },
    "nostalgia": { label: "🧸", name: "Nostalgia", advice: "Conecta con el recuerdo positivo, pero no te quedes a vivir ahí.", active: "bg-amber-200 text-amber-900 border-amber-200", inactive: "bg-amber-200/10 text-amber-200 border-amber-200/20 hover:bg-amber-200/20" },

    // Special unique AACC + TDAH + TEA emotions
    "overwhelm": { label: "🤯", name: "Sobrecarga", advice: "Reduce inputs sensoriales YA. Audífonos y menos luz.", active: "bg-red-500 text-white border-red-500", inactive: "bg-red-500/10 text-red-300 border-red-500/20 hover:bg-red-500/20" },
    "paralysis": { label: "🧊", name: "Parálisis", advice: "Mueve un dedo. Solo uno. Luego la mano.", active: "bg-cyan-200 text-cyan-900 border-cyan-200", inactive: "bg-cyan-200/10 text-cyan-200 border-cyan-200/20 hover:bg-cyan-200/20" },
    "masking": { label: "🎭", name: "Masking", advice: "Es agotador. Busca un momento a solas para soltar la máscara.", active: "bg-slate-400 text-slate-900 border-slate-400", inactive: "bg-slate-400/10 text-slate-300 border-slate-400/20 hover:bg-slate-400/20" },
    "burnout": { label: "🕯️", name: "Burnout", advice: "Descanso radical. No hay otra cura.", active: "bg-stone-600 text-stone-200 border-stone-600", inactive: "bg-stone-600/30 text-stone-400 border-stone-600/40 hover:bg-stone-600/50" },
    "justice": { label: "⚖️", name: "Justicia", advice: "El mundo no se arregla hoy. Cuida tu hígado.", active: "bg-orange-600 text-white border-orange-600", inactive: "bg-orange-600/10 text-orange-300 border-orange-600/20 hover:bg-orange-600/20" },
    "stimming": { label: "🌀", name: "Stimming", advice: "Hazlo. Tu sistema nervioso se está regulando.", active: "bg-lime-400 text-lime-900 border-lime-400", inactive: "bg-lime-400/10 text-lime-200 border-lime-400/20 hover:bg-lime-400/20" },
    "rsd": { label: "💔", name: "Disforia (RSD)", advice: "Es una percepción distorsionada por el dolor. Espera a que pase.", active: "bg-rose-700 text-white border-rose-700", inactive: "bg-rose-700/10 text-rose-300 border-rose-700/20 hover:bg-rose-700/20" },
    "hyperfocus": { label: "🔭", name: "Hiperfoco", advice: "Aprovecha la ola, pero pon una alarma para comer.", active: "bg-violet-500 text-white border-violet-500", inactive: "bg-violet-500/10 text-violet-300 border-violet-500/20 hover:bg-violet-500/20" }
};
