import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const body = await request.json();

    // Mercado Pago envía notificaciones de tipo 'payment'
    if (body.type === 'payment') {
        const paymentId = body.data.id;

        // 1. Consultar el estado del pago a la API de Mercado Pago
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: {
                Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
        });
        const paymentData = await response.json();

        // 2. Si el pago está aprobado, enviamos el correo real
        if (paymentData.status === 'approved') {
            const orderId = paymentData.external_reference; // El ID que pasaste al crear la preferencia

            // ENVIAR CORREO AL ADMINISTRADOR (A TI)
            await resend.emails.send({
                from: 'NØR Systems <ventas@tu-dominio.com>',
                to: ['tu-correo@gmail.com'], // El correo donde quieres recibir la confirmación
                subject: `NØR: NUEVA VENTA CONFIRMADA #${orderId}`,
                html: `
                    <div style="font-family: monospace; background: #000; color: #fff; padding: 30px;">
                        <h1 style="border-bottom: 2px solid #fff; padding-bottom: 10px;">VENTA_CONFIRMADA</h1>
                        <p><strong>ORDEN ID:</strong> ${orderId}</p>
                        <p><strong>MONTO TOTAL:</strong> $${paymentData.transaction_amount} MXN</p>
                        <hr/>
                        <h3>DATOS DE ENVÍO:</h3>
                        <p><strong>CLIENTE:</strong> ${paymentData.additional_info.payer.first_name} ${paymentData.additional_info.payer.last_name}</p>
                        <p><strong>EMAIL:</strong> ${paymentData.payer.email}</p>
                        <p><strong>TELÉFONO:</strong> ${paymentData.additional_info.payer.phone.number}</p>
                        <hr/>
                        <p style="font-size: 10px; color: #555;">SISTEMA_NOR_2026 // STATUS: OK</p>
                    </div>
                `
            });
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}