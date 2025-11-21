/**
 * ------------------------------------------------------------------
 * 👥 GESTOR DE AMIGOS Y FAMILIA (CO-OP MODE)
 * ------------------------------------------------------------------
 * Lógica: Detección de patrones simplificada.
 * Aquí SÍ nos importa el contexto, pero no analizamos cada pixel como con Lunita.
 */

type TonoAmigo = 'DESMADRE' | 'SERIO' | 'CONFUSO' | 'DRAMA';

interface InteraccionAmigo {
    nombre: string;
    mensaje: string;
    tonoDetectado: TonoAmigo;
}

class GestorAmigos {

    public procesarInteraccion(input: InteraccionAmigo): void {
        console.log(`\n[CO-OP] Mensaje de ${input.nombre}: "${input.mensaje}"`);

        // Aquí usamos lógica condicional basada en patrones conocidos
        if (input.tonoDetectado === 'CONFUSO') {
            this.manejarAmbiguedad();
        }
        else if (input.tonoDetectado === 'DRAMA' || input.mensaje.includes("tenemos que hablar")) {
            this.manejarConflicto();
        }
        else if (input.tonoDetectado === 'DESMADRE') {
            console.log(">> ACCIÓN: Seguir el juego. Mandar sticker de :v o meme random.");
        }
        else {
            console.log(">> ACCIÓN: Respuesta estándar. Escucha activa.");
        }
    }

    // AMARILLO: No entendí si es broma o no
    private manejarAmbiguedad(): void {
        console.warn(">> ALERTA AMARILLA: Patrón confuso detectado.");
        console.log("   Estrategia: Debugging Directo.");
        console.log("   Say: 'Oye we, ¿es coto (broma) o es neta? No caché el sarcasmo xd'");
    }

    // ROJO: Posible pleito o problema serio
    private manejarConflicto(): void {
        console.error(">> ALERTA ROJA: Posible conflicto.");
        console.log("   Estrategia: Pausa y Verificación.");
        console.log("   1. No contestar caliente.");
        console.log("   2. Preguntar: '¿Hice algo que te molestara o pasó algo más?'");
    }
}

// TEST
const misAmigos = new GestorAmigos();
misAmigos.procesarInteraccion({
    nombre: "El Kevin",
    mensaje: "Te pasaste de lanza ayer...",
    tonoDetectado: 'CONFUSO' // ¿Enojado o bromeando? -> Activa Ambigüedad
});
