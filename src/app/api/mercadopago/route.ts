import { NextResponse } from 'next/server';
import { sendOrderConfirmation } from '@/lib/email-sender';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const type = body.type || body.topic;

        if (type === 'payment') {
            const paymentId = body.data?.id || body.resource?.split('/').pop();

            if (!paymentId) return NextResponse.json({ message: "ID Missing" }, { status: 400 });

            const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) return NextResponse.json({ error: "Error MP" }, { status: 500 });

            const paymentData = await response.json();

            if (paymentData.status === 'approved') {
                console.log(`Procesando orden ${paymentData.id}...`);

                await sendOrderConfirmation(paymentData);
            }
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}