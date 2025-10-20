/**
 * BuilderBot Cloud API integration for sending WhatsApp messages
 */

export interface BuilderBotMessagePayload {
  messages: {
    content: string;
    mediaUrl?: string;
  };
  number: string;
  checkIfExists?: boolean;
}

export interface BuilderBotResponse {
  ok?: boolean;
  status?: number;
  error?: string;
}

/**
 * Send a WhatsApp message through BuilderBot Cloud API
 * @param numero - WhatsApp number (e.g., "584124779301")
 * @param mensaje - Message content to send
 * @returns Promise with response from BuilderBot API
 */
export async function enviarMensajeBuilderBot(
  numero: string,
  mensaje: string
): Promise<BuilderBotResponse> {
  const botId = process.env.BUILDERBOT_BOT_ID;
  const apiKey = process.env.BUILDERBOT_API_KEY;

  if (!botId || !apiKey) {
    console.error(
      "BuilderBot credentials not configured in environment variables"
    );
    return {
      ok: false,
      error: "BuilderBot credentials not configured",
    };
  }

  const payload: BuilderBotMessagePayload = {
    messages: {
      content: mensaje,
    },
    number: numero,
    checkIfExists: false,
  };

  try {
    const response = await fetch(
      `https://app.builderbot.cloud/api/v2/${botId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-builderbot": apiKey,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `BuilderBot API error: ${response.status} - ${errorText}`
      );
      return {
        ok: false,
        status: response.status,
        error: errorText,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error("Error sending message to BuilderBot:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Generate WhatsApp message for "en camino" status
 */
export function getMensajeEnCamino(nombre: string): string {
  return `🚴‍♂️ ¡Hola ${nombre}! Tu pedido ya va en camino. Gracias por tu compra 🍔`;
}

/**
 * Generate WhatsApp message for "entregado" status
 */
export function getMensajeEntregado(nombre: string): string {
  return `🎉 ¡Tu pedido ha sido entregado! Esperamos que lo hayas disfrutado 🍟`;
}
