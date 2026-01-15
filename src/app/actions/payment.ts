'use server'

import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabaseAdmin } from '@/lib/db';
// Inicializamos el cliente con tu Token
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function createPaymentPreference(orderId: string) {
    try {
        // 1. Buscamos la orden en Supabase para asegurar que el monto sea real
        // (No confiamos en lo que mande el frontend, confiamos en la base de datos)
        const { data: order, error } = await supabaseAdmin
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (error || !order) throw new Error("Orden no encontrada");

        // 2. Creamos la preferencia de pago en Mercado Pago
        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: orderId,
                        title: `Orden NØR #${orderId.slice(0, 8)}`, // Ej: Orden NØR #a1b2c3d4
                        quantity: 1,
                        unit_price: Number(order.total), // El total que calculaste (incluye envío)
                        currency_id: 'MXN'
                    }
                ],
                payer: {
                    email: order.customer_email, // Pre-llenamos el email del cliente
                    name: order.customer_name
                },
                back_urls: {
                    // A dónde regresa el usuario después de pagar
                    success: `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('.supabase.co', '') || 'http://localhost:3000'}/checkout/success?orderId=${orderId}`,
                    failure: `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('.supabase.co', '') || 'http://localhost:3000'}/checkout/failure`,
                    pending: `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('.supabase.co', '') || 'http://localhost:3000'}/checkout/pending`
                },
                auto_return: 'approved', // Regresa automático si se aprueba
                external_reference: orderId, // Para conciliar después
                statement_descriptor: "NOR SYSTEMS" // Lo que sale en el estado de cuenta
            }
        });

        return { success: true, url: result.init_point }; // init_point es la URL de pago

    } catch (error: any) {
        console.error("MP ERROR:", error);
        return { success: false, error: error.message };
    }
}