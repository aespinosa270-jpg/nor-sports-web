'use server'

// Eliminamos todas las importaciones de APIs externas (Estafeta/Envia)
// Solo necesitamos devolver precios fijos.

// --- COTIZACIÓN (Simulada / Tarifa Fija) ---
export async function getQuote(zipOrigin: string, zipDest: string, weight: number = 1) {
    // Simulamos un pequeño delay para que la UI se sienta "pensando"
    await new Promise(resolve => setTimeout(resolve, 600));

    // AQUÍ CONFIGURAS TUS PRECIOS DE VENTA
    // Como usas guías pre-pagadas, tú decides cuánto cobrar.
    const services = [
        {
            serviceTypeId: 'standard',
            serviceDescription: 'ENVÍO ESTÁNDAR (ESTAFETA/FEDEX)',
            deliveryType: '3-5 Días Hábiles',
            totalAmount: 180.00, // <--- Ajusta este precio a lo que quieras cobrar
            estimatedDelivery: '3-5 días'
        },
        {
            serviceTypeId: 'express',
            serviceDescription: 'ENVÍO EXPRESS (DÍA SIGUIENTE)',
            deliveryType: 'Día Siguiente',
            totalAmount: 290.00, // <--- Precio premium
            estimatedDelivery: '24-48 hrs'
        }
    ];

    return { success: true, services };
}

// --- GENERACIÓN DE GUÍA (Placeholder) ---
export async function createLabel(serviceId: string, addressData: any, priceInfo: any, userEmail: string = 'guest') {
    // Como la guía es pre-comprada, no la generamos aquí.
    // Retornamos un estado "Pendiente de Asignación" para que la orden se guarde en Supabase.

    return {
        success: true,
        pdfUrl: null, // No hay PDF automático, tú lo pegas en la caja
        trackingNumber: 'PENDIENTE' // Esto le indica al sistema que falta asignar guía
    };
}