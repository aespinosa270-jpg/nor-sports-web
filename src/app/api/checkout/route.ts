import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { sendOrderConfirmation } from '@/lib/notifications';
import { supabaseAdmin } from '@/lib/supabaseAdmin'; // 👈 IMPORTANTE: Importamos el cliente admin

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Inicializamos el objeto de pago
        const payment = new Payment(client);

        // 2. Procesamos el cobro con Mercado Pago
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

        // 3. GUARDAR EN SUPABASE (Nueva lógica) 🗄️
        if (paymentResponse.id) {
            // Insertamos la orden en la tabla 'orders' usando la llave maestra
            const { error } = await supabaseAdmin.from('orders').insert({
                payment_id: paymentResponse.id!.toString(), // ID único de Mercado Pago

                // Datos del cliente
                customer_email: body.payer.email,
                customer_name: body.payer.first_name || "Cliente Web", // A veces el Brick no manda el nombre, ponemos default

                // Montos y Estado
                total: paymentResponse.transaction_amount,
                status: paymentResponse.status, // 'approved', 'pending', etc.
                payment_method: 'mercadopago',

                // Datos extra (Si el frontend no los manda aún, se guardan vacíos por seguridad)
                items: body.items || [],
                shipping_address: body.shipping_address || {},

                description: body.description || "Compra en línea"
            });

            if (error) {
                console.error("⚠️ Error guardando orden en Supabase:", error);
                // No lanzamos error para no romper la respuesta al usuario, pero lo registramos
            } else {
                console.log("✅ Orden guardada exitosamente en Supabase");
            }
        }

        // 4. SI EL PAGO ES APROBADO -> ENVIAR CORREO
        if (paymentResponse.status === 'approved') {
            sendOrderConfirmation(paymentResponse).catch(console.error);
        }

        // 5. Responder al Frontend
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
