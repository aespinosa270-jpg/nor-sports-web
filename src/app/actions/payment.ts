'use server'

import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabaseAdmin } from '@/lib/db';
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function createPaymentPreference(orderId: string) {
    try {
        const { data: order, error } = await supabaseAdmin
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (error || !order) throw new Error("Orden no encontrada");

        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: orderId,
                        title: `Orden NØR #${orderId.slice(0, 8)}`,
                        quantity: 1,
                        unit_price: Number(order.total),
                        currency_id: 'MXN'
                    }
                ],
                payer: {
                    email: order.customer_email,
                    name: order.customer_name
                },
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('.supabase.co', '') || 'http://localhost:3000'}/checkout/success?orderId=${orderId}`,
                    failure: `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('.supabase.co', '') || 'http://localhost:3000'}/checkout/failure`,
                    pending: `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('.supabase.co', '') || 'http://localhost:3000'}/checkout/pending`
                },
                auto_return: 'approved',
                external_reference: orderId,
                statement_descriptor: "NOR SYSTEMS"
            }
        });

        return { success: true, url: result.init_point };

    } catch (error: any) {
        console.error("MP ERROR:", error);
        return { success: false, error: error.message };
    }
}