/**
 * ------------------------------------------------------------------
 * 🤖 ALGORITMO DE DETECCIÓN EMOCIONAL v2.1 (Edición Español)
 * ------------------------------------------------------------------
 * Autor: Ángel (Dev) & Gemini (Co-pilot)
 * Descripción: Sistema de monitoreo de patrones de comportamiento
 * para detección de anomalías afectivas en la pareja (Lunita).
 * * Dependencias: ModuloEmpatia, CorePaciencia
 */

// 1. DEFINICIONES DE TIPOS (El "Modelo de Dominio")
// ------------------------------------------------------------------

// El semáforo emocional
enum Semaforo {
    VERDE = "VERDE",       // Sistema Nominal
    AMARILLO = "AMARILLO", // Advertencia / Warning
    ROJO = "ROJO"          // Error Crítico / Pausa Total
}

// Interfaz para el input sensorial (lo que observas)
interface EntradaComportamiento {
    tiempoRespuesta: 'INSTANTANEO' | 'DEMORADO' | 'GHOSTING'; // Latencia
    tono: 'FELIZ' | 'NEUTRAL' | 'CORTANTE' | 'ENOJADO' | 'TRISTE';
    lenguajeCorporal: 'ABIERTO' | 'CERRADO' | 'EVASIVO' | 'RECHAZO';
    contexto: string; // Ejemplo: "Viendo memes", "Cenando"
}

// 2. LA LÓGICA DE NEGOCIO (El Controlador)
// ------------------------------------------------------------------
class GestorRelacion {
    private readonly nombrePareja: string = "Lunita";
    private semaforoActual: Semaforo = Semaforo.VERDE;

    constructor() {
        console.log(`[INIT] Sistema de Detección Emocional iniciado para: ${this.nombrePareja}`);
    }

    /**
     * Bucle principal: Recibe datos sensoriales y decide el estado.
     */
    public procesarInteraccion(entrada: EntradaComportamiento): void {
        console.log(`\n[SCAN] Analizando comportamiento actual...`);

        this.semaforoActual = this.analizarPatrones(entrada);
        this.ejecutarProtocolo(this.semaforoActual, entrada);
    }

    /**
     * Lógica difusa para determinar el color del semáforo.
     * Aquí comparamos el input actual vs la "Base de Datos Histórica" (tu experiencia).
     */
    private analizarPatrones(entrada: EntradaComportamiento): Semaforo {
        // Caso ROJO: Señales críticas
        if (
            entrada.lenguajeCorporal === 'RECHAZO' ||
            entrada.tono === 'ENOJADO' ||
            entrada.tiempoRespuesta === 'GHOSTING'
        ) {
            return Semaforo.ROJO;
        }

        // Caso AMARILLO: Anomalías leves (latencia alta, tono cortante)
        if (
            entrada.tiempoRespuesta === 'DEMORADO' ||
            entrada.tono === 'CORTANTE' ||
            entrada.lenguajeCorporal === 'EVASIVO'
        ) {
            return Semaforo.AMARILLO;
        }

        // Caso VERDE: Todo nominal
        return Semaforo.VERDE;
    }

    /**
     * Router de acciones según el estado.
     */
    private ejecutarProtocolo(estado: Semaforo, contexto: EntradaComportamiento): void {
        console.log(`[STATUS] Estado Detectado: ${estado}`);

        switch (estado) {
            case Semaforo.VERDE:
                this.manejarEstadoVerde();
                break;
            case Semaforo.AMARILLO:
                this.manejarEstadoAmarillo(contexto);
                break;
            case Semaforo.ROJO:
                this.manejarEstadoRojo();
                break;
        }
    }

    // 3. MANEJADORES DE ESTADO (Las Acciones)
    // ------------------------------------------------------------------

    private manejarEstadoVerde(): void {
        console.log(">> ACCIÓN: Continuar(). Seguir mandando memes y platicando chido.");
        // No requiere intervención.
    }

    private manejarEstadoAmarillo(entrada: EntradaComportamiento): void {
        console.warn(">> ADVERTENCIA: Anomalía detectada. Iniciando Consulta de Validación...");

        // Generador de preguntas basado en la observación (No adivinar)
        const pregunta = this.construirPregunta(entrada);
        console.log(`>> TU DIÁLOGO SUGERIDO: "${pregunta}"`);

        console.log(">> ESPERAR RESPUESTA... (No presionar)");
    }

    private manejarEstadoRojo(): void {
        console.error(">> CRITICO: Pausa Total. Abortar argumentos lógicos.");

        const acciones = [
            "1. CALLARSE (Dejar de hablar inmediatamente)",
            "2. Ofrecer Menú de Soporte: ¿Oído, Consejo o Apapacho?",
            "3. Si hay rechazo físico: Traer agua/pañuelos y dar espacio (Presencia pasiva)"
        ];

        console.log(">> PROTOCOLO DE EMERGENCIA:");
        acciones.forEach(accion => console.log(`   ${accion}`));
    }

    /**
     * Helper para construir la frase "Noté X, ¿pasa algo?"
     */
    private construirPregunta(entrada: EntradaComportamiento): string {
        let observacion = "";

        if (entrada.tono === 'CORTANTE') observacion = "te siento un poco cortante al hablar";
        else if (entrada.tiempoRespuesta === 'DEMORADO') observacion = "estás muy callada hoy";
        else if (entrada.lenguajeCorporal === 'EVASIVO') observacion = "no me estás volteando a ver";

        return `Amor, ${observacion} (Validación del Hecho). ¿Todo bien o necesitas un ratito para ti? (Pregunta Binaria)`;
    }
}

// 4. SIMULACIÓN (Prueba Unitaria)
// ------------------------------------------------------------------

const miSistema = new GestorRelacion();
console.log("\n\n\n");

// Escenario 1: Todo bien
console.log("--- SIMULANDO ESCENARIO NORMAL ---");
miSistema.procesarInteraccion({ 
    tiempoRespuesta: 'INSTANTANEO', 
    tono: 'FELIZ', 
    lenguajeCorporal: 'ABIERTO', 
    contexto: "Cenando tacos" 
});
console.log("\n\n\n");

// Escenario 2: Alerta Amarilla (La prueba de fuego)
console.log("--- SIMULANDO ESCENARIO DE PRUEBA ---");
miSistema.procesarInteraccion({
    tiempoRespuesta: 'DEMORADO',
    tono: 'CORTANTE',
    lenguajeCorporal: 'EVASIVO',
    contexto: "Viendo una serie"
});
console.log("\n\n\n");

// Escenario 3: Alerta Roja
console.log("--- SIMULANDO ESCENARIO CRÍTICO ---");
miSistema.procesarInteraccion({
    tiempoRespuesta: 'GHOSTING',
    tono: 'ENOJADO',
    lenguajeCorporal: 'RECHAZO',
    contexto: "Discusión previa"
});
