import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { sendOrderConfirmation } from '@/lib/notifications';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Inicializamos el objeto de pago
        const payment = new Payment(client);

        // 2. Procesamos el cobro con los datos que manda el Frontend (Brick)
        const paymentResponse = await payment.create({
            body: {
                transaction_amount: body.transaction_amount,
                token: body.token, // Token seguro de la tarjeta
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

        // 3. SI EL PAGO ES APROBADO -> ENVIAMOS EL CORREO INMEDIATAMENTE
        if (paymentResponse.status === 'approved') {
            // Enviamos el correo en segundo plano (no bloqueamos la respuesta)
            sendOrderConfirmation(paymentResponse).catch(console.error);
        }

        // 4. Respondemos al Frontend
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