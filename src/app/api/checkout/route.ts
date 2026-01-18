import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { sendOrderConfirmation } from '@/lib/notifications';
import { supabaseAdmin } from '@/lib/db';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const payment = new Payment(client);

        const paymentResponse = await payment.create({
            body: {
                transaction_amount: body.transaction_amount,
                token: body.token,
                description: body.description,
                installments: body.installments,
                payment_method_id: body.payment_method_id,
                issuer_id: body.issuer_id,
                payer: {
                    email: body.payer.email,
                    identification: body.payer.identification
                }
            }
        });

        if (paymentResponse.id) {
            const { error } = await supabaseAdmin.from('orders').insert({
                payment_id: paymentResponse.id!.toString(),

                customer_email: body.payer.email,
                customer_name: body.payer.first_name || "Cliente Web",

                total: paymentResponse.transaction_amount,
                status: paymentResponse.status,
                payment_method: 'mercadopago',

                items: body.items || [],
                shipping_address: body.shipping_address || {},

                description: body.description || "Compra en línea"
            });

            if (error) {
                console.error("⚠️ Error guardando orden en Supabase:", error);
            } else {
                console.log("✅ Orden guardada exitosamente en Supabase");
            }
        }

        if (paymentResponse.status === 'approved') {
            sendOrderConfirmation(paymentResponse).catch(console.error);
        }

        return NextResponse.json({
            status: paymentResponse.status,
            id: paymentResponse.id,
            detail: paymentResponse.status_detail
        });

    } catch (error: any) {
        console.error("Error Checkout API:", error);
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}
