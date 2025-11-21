/**
 * ------------------------------------------------------------------
 * 🤖 GESTOR DE NPCs (STRANGERS / DESCONOCIDOS)
 * ------------------------------------------------------------------
 * Lógica: CERO PATRONES. Stateless.
 * Objetivo: Eficiencia máxima, gastar 0% de RAM emocional.
 * Scripts pre-renderizados (Hardcoded responses).
 */

class GestorNPCs {

    public procesarInput(mensajeNPC: string): void {
        console.log(`\n[NPC INPUT] "${mensajeNPC}"`);

        const respuesta = this.generarScript(mensajeNPC.toLowerCase());

        console.log(`>> OUTPUT AUTOMÁTICO: "${respuesta}"`);
        console.log(">> ESTADO: Interacción cerrada. Liberando recursos.");
    }

    private generarScript(msg: string): string {
        // Script 1: Saludos
        if (msg.match(/hola|buenos|tardes/)) {
            return "Buenas tardes. (Sonrisa genérica #3)";
        }

        // Script 2: Gratitud
        if (msg.match(/gracias|amable/)) {
            return "De nada, buen día. (Asentir cabeza)";
        }

        // Script 3: Ventas / Solicitudes en la calle
        if (msg.match(/quiere|gusta|promoción|moneda/)) {
            return "No gracias, ando prisa. (No hacer contacto visual y seguir caminando)";
        }

        // Script 4: Preguntas random (Hora, dirección)
        if (msg.match(/hora|dónde|sabes/)) {
            return "Híjole, te fallo, no soy de por aquí / no traigo reloj. (Disculpa rápida)";
        }

        // Default (Catch-all)
        return "Simón / Ah órale / Gracias. (Respuesta monosílaba neutral)";
    }
}

// TEST
const sistemaNPC = new GestorNPCs();
sistemaNPC.procesarInput("Oiga joven, ¿me regala una moneda?");
sistemaNPC.procesarInput("¡Buenos días!");
sistemaNPC.procesarInput("Muchas gracias por su ayuda.");
sistemaNPC.procesarInput("¿Me podría decir la hora?");
sistemaNPC.procesarInput("¿Le interesa una promoción especial?");
