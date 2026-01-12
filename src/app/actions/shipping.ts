'use server'
import { estafetaRequest } from '@/lib/estafeta';
import { supabaseAdmin } from '@/lib/supabase-admin';


export async function createLabel(
    serviceId: string,
    addressData: any,
    priceInfo: { cost: number, price: number },
    userEmail: string = 'guest'
) {
    try {
        const payload = {
            serviceTypeId: serviceId,
            origin: {
                customerNumber: process.env.ESTAFETA_CUSTOMER_NUMBER
            },
            destination: { /* addressData.dest... */ },
            contentDescription: "NØR SYSTEMS LOGISTICS",
            reference: "NOR-WEB"
        };

        const response = await estafetaRequest('/v1/waybills', 'POST', payload);

        const { error: dbError } = await supabaseAdmin
            .from('shipping_labels')
            .insert({
                tracking_number: response.waybill,
                pdf_url: response.labelUrl,
                service_type: serviceId,
                origin_zip: addressData.originZip,
                dest_zip: addressData.destZip,
                status: 'created',
                cost_provider: priceInfo.cost,
                price_charged: priceInfo.price,
            });

        if (dbError) {
            console.error('DATABASE ERROR (CRITICAL):', dbError);
        }

        return {
            success: true,
            pdfUrl: response.labelUrl,
            trackingNumber: response.waybill
        };

    } catch (error: any) {
        return { success: false, error: error.message };
    }
}