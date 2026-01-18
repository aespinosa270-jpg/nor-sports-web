import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validamos que sea una notificación de pago
        const type = body.type || body.topic;

        if (type === 'payment') {
            const paymentId = body.data?.id || body.resource?.split('/').pop();

            if (!paymentId) {
                return NextResponse.json({ message: "ID no encontrado" }, { status: 400 });
            }

            // 1. Consultar detalles a Mercado Pago
            const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                console.error('Error fetching payment from MP');
                return NextResponse.json({ error: "Error MP API" }, { status: 500 });
            }

            const paymentData = await response.json();

            // 2. Si está aprobado, enviamos el reporte
            if (paymentData.status === 'approved') {
                const orderId = paymentData.external_reference || "S/N";
                const { additional_info, transaction_amount, shipping_amount, fee_details, transaction_details } = paymentData;

                const shippingCost = shipping_amount || 0;
                const shippingType = shippingCost > 0 ? "ESTÁNDAR (PAGADO)" : "GRATUITO (INCLUIDO)";

                const address = additional_info?.shipment?.receiver_address;
                const fullAddress = address
                    ? `${address.street_name || ''} ${address.street_number || ''}, ${address.zip_code || ''}, ${address.city_name || ''}`
                    : "Dirección no proporcionada";

                // --- AQUÍ ESTÁ EL AJUSTE CLAVE ---
                await resend.emails.send({
                    // 1. Enviamos desde el subdominio 'send' (el que verificamos en Resend)
                    from: 'NØR Systems <notificaciones@send.nor.com.mx>',

                    // 2. Enviamos el correo a TU bandeja de Zoho
                    to: ['ventas@nor.com.mx'],

                    // 3. Si le das "Responder" al correo, irá a tu Zoho
                    reply_to: 'ventas@nor.com.mx',

                    subject: `⚠️ NUEVA VENTA: $${transaction_amount} - Ref: ${orderId}`,
                    html: `
                        <div style="font-family: 'Courier New', monospace; background: #f4f4f4; padding: 20px; color: #000;">
                            <div style="background: #fff; border: 1px solid #000; padding: 20px; max-width: 600px; margin: 0 auto;">
                                
                                <h2 style="margin: 0 0 20px 0; border-bottom: 4px solid #000; padding-bottom: 10px; font-weight: 900; letter-spacing: 2px;">
                                    REPORTE_VENTA // ${orderId}
                                </h2>

                                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>ESTADO MP:</strong></td>
                                        <td style="color: green; font-weight: bold;">APROBADO (${paymentData.status_detail})</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>ID TRANSACCIÓN:</strong></td>
                                        <td>${paymentData.id}</td>
                                    </tr>
                                </table>

                                <div style="background: #000; color: #fff; padding: 5px 10px; font-weight: bold; margin-bottom: 10px;">
                                    1. DATOS DEL CLIENTE
                                </div>
                                <p style="margin: 5px 0;"><strong>NOMBRE:</strong> ${additional_info?.payer?.first_name || 'N/A'} ${additional_info?.payer?.last_name || ''}</p>
                                <p style="margin: 5px 0;"><strong>TELÉFONO:</strong> ${additional_info?.payer?.phone?.number || 'N/A'}</p>
                                <p style="margin: 5px 0;"><strong>DIRECCIÓN:</strong><br/>${fullAddress}</p>

                                <div style="background: #000; color: #fff; padding: 5px 10px; font-weight: bold; margin: 20px 0 10px 0;">
                                    2. LOGÍSTICA
                                </div>
                                <p style="margin: 5px 0;"><strong>TIPO:</strong> ${shippingType}</p>
                                <p style="margin: 5px 0;"><strong>COSTO ENVÍO:</strong> $${shippingCost} MXN</p>

                                <div style="background: #000; color: #fff; padding: 5px 10px; font-weight: bold; margin: 20px 0 10px 0;">
                                    3. DESGLOSE FINANCIERO
                                </div>
                                <table style="width: 100%; font-size: 14px;">
                                    <tr>
                                        <td>Total Pagado:</td>
                                        <td style="text-align: right;"><strong>$${transaction_amount} MXN</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Comisión MP:</td>
                                        <td style="text-align: right; color: red;">-$${fee_details?.[0]?.amount || 0} MXN</td>
                                    </tr>
                                    <tr style="border-top: 1px solid #000;">
                                        <td style="padding-top: 10px;"><strong>NETO RECIBIDO:</strong></td>
                                        <td style="text-align: right; padding-top: 10px; font-size: 16px;"><strong>$${transaction_details?.net_received_amount} MXN</strong></td>
                                    </tr>
                                </table>
                                
                                <p style="margin-top: 30px; font-size: 10px; text-align: center; color: #666;">
                                    SISTEMA AUTO-MAIL NØR v1.0
                                </p>
                            </div>
                        </div>
                    `
                });

                console.log(`✅ Correo enviado para orden ${orderId}`);
            }
        }

        return NextResponse.json({ received: true }, { status: 200 });

    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}