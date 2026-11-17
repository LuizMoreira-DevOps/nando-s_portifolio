/**
 *  Canal oficial de atendimento comercial.
 *
 *  Formato: código do país + DDD + número.
 *  Exemplo de formato brasileiro: 55 + 41 + número.
 *
 *  Não utilize espaços, parênteses, traços ou o sinal +.
 */

// O número comercial é público e incorporado ao build.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function getWhatsAppUrl(message: string): string | null {
    if (!/^[1-9]\d{9,14}$/.test(WHATSAPP_NUMBER)) {
        return null;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
