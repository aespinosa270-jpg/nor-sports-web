'use server'

export async function getQuote(zipOrigin: string, zipDest: string, weight: number = 1) {
    await new Promise(resolve => setTimeout(resolve, 600));

    const services = [
        {
            serviceTypeId: 'standard',
            serviceDescription: 'ENVÍO ESTÁNDAR (ESTAFETA/FEDEX)',
            deliveryType: '3-5 Días Hábiles',
            totalAmount: 180.00,
            estimatedDelivery: '3-5 días'
        },
        {
            serviceTypeId: 'express',
            serviceDescription: 'ENVÍO EXPRESS (DÍA SIGUIENTE)',
            deliveryType: 'Día Siguiente',
            totalAmount: 290.00,
            estimatedDelivery: '24-48 hrs'
        }
    ];

    return { success: true, services };
}

export async function createLabel(serviceId: string, addressData: any, priceInfo: any, userEmail: string = 'guest') {

    return {
        success: true,
        pdfUrl: null,
        trackingNumber: 'PENDIENTE'
    };
}