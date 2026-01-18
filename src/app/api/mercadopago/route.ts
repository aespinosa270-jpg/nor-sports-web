import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Mercado Pago a veces envía 'topic' y a veces 'type'
        const type = body.type || body.topic;

        // Solo procesamos si es un pago (payment)
        if (type === 'payment') {
            const paymentId = body.data?.id || body.resource?.split('/').pop();

            if (!paymentId) {
                return NextResponse.json({ message: "ID no encontrado" }, { status: 400 });
            }

            // 1. Consultar a Mercado Pago
            const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                return NextResponse.json({ error: "Error MP API" }, { status: 500 });
            }

            const paymentData = await response.json();

            // 2. Si el pago está APROBADO, enviamos el correo
            if (paymentData.status === 'approved') {
                const orderId = paymentData.external_reference || "S/N";
                const { additional_info, transaction_amount, shipping_amount, fee_details, transaction_details } = paymentData;

                const shippingCost = shipping_amount || 0;
                const shippingType = shippingCost > 0 ? "ESTÁNDAR (PAGADO)" : "GRATUITO (INCLUIDO)";

                const address = additional_info?.shipment?.receiver_address;
                const fullAddress = address
                    ? `${address.street_name || ''} ${address.street_number || ''}, ${address.zip_code || ''}, ${address.city_name || ''}`
                    : "Dirección no registrada";

                // Ganancia Neta
                const netReceived = transaction_details?.net_received_amount || 0;

                // 3. Enviar correo CORREGIDO
                await resend.emails.send({
                    from: 'NØR Systems <notificaciones@send.nor.com.mx>',
                    to: ['ventas@nor.com.mx'],

                    // ✅ CORRECCIÓN AQUÍ: Es 'replyTo', no 'reply_to'
                    replyTo: 'ventas@nor.com.mx',

                    subject: `💰 NUEVA VENTA: $${transaction_amount} - Ref: ${orderId}`,
                    html: `
                        <div style="font-family: monospace; border: 1px solid #000; padding: 20px; max-width: 600px;">
                            <h2 style="border-bottom: 2px solid #000; padding-bottom: 10px;">VENTA CONFIRMADA // ${orderId}</h2>

                            <p><strong>ESTADO:</strong> ✅ APROBADO</p>
                            <p><strong>TOTAL:</strong> $${transaction_amount} MXN</p>
                            <p><strong>NETO RECIBIDO:</strong> $${netReceived} MXN</p>
                            
                            <hr style="border: 0; border-top: 1px dashed #ccc; margin: 20px 0;" />
                            
                            <h3 style="background: #000; color: #fff; display: inline-block; padding: 3px 8px;">1. CLIENTE</h3>
                            <p><strong>Nombre:</strong> ${additional_info?.payer?.first_name || 'N/A'} ${additional_info?.payer?.last_name || ''}</p>
                            <p><strong>Teléfono:</strong> ${additional_info?.payer?.phone?.number || 'N/A'}</p>
                            
                            <h3 style="background: #000; color: #fff; display: inline-block; padding: 3px 8px;">2. ENVÍO</h3>
                            <p><strong>Dirección:</strong> ${fullAddress}</p>
                            <p><strong>Tipo:</strong> ${shippingType}</p>
                            
                            <p style="font-size: 10px; color: #666; margin-top: 30px;">ID MP: ${paymentData.id}</p>
                        </div>
                    `
                });
            }
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}