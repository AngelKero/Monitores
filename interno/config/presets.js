export const presets = {
  "🟢 Nominal (Reset)": {
    dopamina: 50,
    cucharas: 80,
    cargaSensorial: 20,
    necesidadesBio: 20,
    ansiedadSocial: 10,
  },
  "🔴 Ansiedad Crítica": {
    dopamina: 50,
    cucharas: 50,
    cargaSensorial: 50,
    necesidadesBio: 50,
    ansiedadSocial: 90,
  },
  "🟡 Ansiedad Moderada": {
    dopamina: 50,
    cucharas: 50,
    cargaSensorial: 50,
    necesidadesBio: 50,
    ansiedadSocial: 60,
  },
  "🔴 Shutdown": {
    dopamina: 20,
    cucharas: 10,
    cargaSensorial: 90,
    necesidadesBio: 50,
    ansiedadSocial: 20,
  },
  "🟡 Alerta Sensorial": {
    dopamina: 50,
    cucharas: 50,
    cargaSensorial: 60,
    necesidadesBio: 20,
    ansiedadSocial: 20,
  },
  "❄️ Parálisis TDAH": {
    dopamina: 10,
    cucharas: 50,
    cargaSensorial: 20,
    necesidadesBio: 20,
    ansiedadSocial: 20,
  },
  "🔋 Fatiga": {
    dopamina: 50,
    cucharas: 30,
    cargaSensorial: 20,
    necesidadesBio: 20,
    ansiedadSocial: 20,
  },
  "⚡ Wired but Tired": {
    dopamina: 80,
    cucharas: 20,
    cargaSensorial: 50,
    necesidadesBio: 20,
    ansiedadSocial: 20,
  },
  "🐿️ Modo Ardilla": {
    dopamina: 90,
    cucharas: 80,
    cargaSensorial: 40,
    necesidadesBio: 20,
    ansiedadSocial: 10,
  },
  "⏳ Waiting Mode": {
    dopamina: 30,
    cucharas: 50,
    cargaSensorial: 20,
    necesidadesBio: 20,
    ansiedadSocial: 40,
  },
  "🚽 Trampa Hiperfoco": {
    dopamina: 50,
    cucharas: 60,
    cargaSensorial: 40,
    necesidadesBio: 70,
    ansiedadSocial: 10,
  },
  "🍔 Hanger": {
    dopamina: 30,
    cucharas: 20,
    cargaSensorial: 40,
    necesidadesBio: 85,
    ansiedadSocial: 20,
  },
  "🛌 Resaca Sensorial": {
    dopamina: 20,
    cucharas: 10,
    cargaSensorial: 10,
    necesidadesBio: 20,
    ansiedadSocial: 10,
  },
  "🚽 Bio Alert": {
    dopamina: 50,
    cucharas: 50,
    cargaSensorial: 20,
    necesidadesBio: 90,
    ansiedadSocial: 10,
  },
};

export const physicalStates = {
  // RED (Críticos)
  "🤕 Dolor de Cabeza": {
    values: {
      dopamina: 40,
      cucharas: 30,
      cargaSensorial: 80,
      necesidadesBio: 40,
      ansiedadSocial: 20,
    },
    color: "red",
  },
  "🤢 Náuseas": {
    values: {
      dopamina: 30,
      cucharas: 35,
      cargaSensorial: 60,
      necesidadesBio: 90,
      ansiedadSocial: 10,
    },
    color: "red",
  },
  "🤧 Gripe/Enfermo": {
    values: {
      dopamina: 20,
      cucharas: 10,
      cargaSensorial: 20,
      necesidadesBio: 60,
      ansiedadSocial: 10,
    },
    color: "red",
  },
  "😵 Mareo": {
    values: {
      dopamina: 30,
      cucharas: 30,
      cargaSensorial: 75,
      necesidadesBio: 60,
      ansiedadSocial: 10,
    },
    color: "red",
  },

  // YELLOW (Molestos/Advertencia)
  "🥴 Hambre/Sed": {
    values: {
      dopamina: 40,
      cucharas: 40,
      cargaSensorial: 50,
      necesidadesBio: 90,
      ansiedadSocial: 20,
    },
    color: "yellow",
  },
  "🥱 Sueño Ligero": {
    values: {
      dopamina: 40,
      cucharas: 30,
      cargaSensorial: 40,
      necesidadesBio: 30,
      ansiedadSocial: 10,
    },
    color: "yellow",
  },
  "🤕 Tensión Muscular": {
    values: {
      dopamina: 30,
      cucharas: 40,
      cargaSensorial: 40,
      necesidadesBio: 60,
      ansiedadSocial: 10,
    },
    color: "yellow",
  },
  "🤧 Alergia Leve": {
    values: {
      dopamina: 40,
      cucharas: 40,
      cargaSensorial: 55,
      necesidadesBio: 40,
      ansiedadSocial: 10,
    },
    color: "yellow",
  },
  "🧠 Brain Fog": {
    values: {
      dopamina: 30,
      cucharas: 20,
      cargaSensorial: 40,
      necesidadesBio: 20,
      ansiedadSocial: 10,
    },
    color: "yellow",
  },

  // GREEN (Óptimos)
  "💪 Fresco/Descansado": {
    values: {
      dopamina: 60,
      cucharas: 90,
      cargaSensorial: 10,
      necesidadesBio: 10,
      ansiedadSocial: 10,
    },
    color: "green",
  },
  "🧘 Recién Bañado": {
    values: {
      dopamina: 60,
      cucharas: 70,
      cargaSensorial: 5,
      necesidadesBio: 10,
      ansiedadSocial: 10,
    },
    color: "green",
  },
  "🏃 Post-Ejercicio": {
    values: {
      dopamina: 60,
      cucharas: 50,
      cargaSensorial: 30,
      necesidadesBio: 60,
      ansiedadSocial: 10,
    },
    color: "green",
  },
  "😌 Relajado": {
    values: {
      dopamina: 50,
      cucharas: 80,
      cargaSensorial: 10,
      necesidadesBio: 10,
      ansiedadSocial: 0,
    },
    color: "green",
  },
};
