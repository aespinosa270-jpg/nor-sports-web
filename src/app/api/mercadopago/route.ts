import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const type = body.type || body.topic;

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

                // --- Variables extra para el Diseño Premium ---
                // Formato de fecha legible (ej: "Lunes, 18 de Enero...")
                const dateApproved = new Date(paymentData.date_approved).toLocaleDateString('es-MX', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                });

                // Comisión de MP
                const mpFee = fee_details?.[0]?.amount || 0;

                const shippingCost = shipping_amount || 0;
                const shippingType = shippingCost > 0 ? "ESTÁNDAR (PAGADO)" : "GRATUITO";

                const address = additional_info?.shipment?.receiver_address;
                const fullAddress = address
                    ? `${address.street_name || ''} ${address.street_number || ''}, ${address.zip_code || ''}, ${address.city_name || ''}`
                    : "Dirección no registrada";

                // Ganancia Neta
                const netReceived = transaction_details?.net_received_amount || 0;

                // 3. Enviar correo con DISEÑO INDUSTRIAL
                await resend.emails.send({
                    from: 'NØR Systems <notificaciones@send.nor.com.mx>',
                    to: ['ventas@nor.com.mx'],

                    // ✅ TU CORRECCIÓN (Correcta)
                    replyTo: 'ventas@nor.com.mx',

                    subject: `● NUEVA ORDEN: ${orderId} | $${transaction_amount}`,
                    html: `
                    <!DOCTYPE html>
                    <html>
                    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Courier New', Courier, monospace;">
                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center" style="padding: 20px 0;">
                                    
                                    <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #000000; box-shadow: 10px 10px 0px #cccccc;">
                                        
                                        <tr>
                                            <td style="background-color: #000000; padding: 20px; color: #ffffff; text-align: left;">
                                                <h1 style="margin: 0; font-size: 24px; letter-spacing: 4px; font-weight: bold;">NØR_SYSTEMS</h1>
                                                <p style="margin: 5px 0 0 0; font-size: 10px; opacity: 0.7;">REPORTE DE TRANSACCIÓN APROBADA</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding: 20px; border-bottom: 2px dashed #000000;">
                                                <table width="100%">
                                                    <tr>
                                                        <td style="font-size: 12px; color: #666;">REFERENCIA</td>
                                                        <td style="text-align: right; font-weight: bold; font-size: 14px;">#${orderId}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: 12px; color: #666;">FECHA</td>
                                                        <td style="text-align: right; font-weight: bold; font-size: 10px; text-transform: uppercase;">${dateApproved}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: 12px; color: #666;">ID MP</td>
                                                        <td style="text-align: right; font-family: monospace; font-size: 12px;">${paymentData.id}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding: 30px 20px; background-color: #fafafa; border-bottom: 1px solid #eeeeee;">
                                                <p style="margin: 0 0 10px 0; font-size: 10px; letter-spacing: 2px; font-weight: bold; color: #888;">BALANCE FINAL</p>
                                                <table width="100%">
                                                    <tr>
                                                        <td style="font-size: 16px;">Total Pagado</td>
                                                        <td style="text-align: right; font-size: 16px;">$${transaction_amount}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: 12px; color: #cc0000;">(-) Comisión Mercado Pago</td>
                                                        <td style="text-align: right; font-size: 12px; color: #cc0000;">-$${mpFee}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: 12px; color: #cc0000;">(-) Costo de Envío</td>
                                                        <td style="text-align: right; font-size: 12px; color: #cc0000;">-$${shippingCost}</td>
                                                    </tr>
                                                    <tr><td colspan="2" style="padding: 10px 0;"><div style="border-top: 1px solid #000;"></div></td></tr>
                                                    <tr>
                                                        <td style="font-size: 18px; font-weight: 900;">NETO A RECIBIR</td>
                                                        <td style="text-align: right; font-size: 24px; font-weight: 900; background-color: #000; color: #fff; padding: 5px;">$${netReceived}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding: 0;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td width="50%" valign="top" style="padding: 20px; border-right: 1px solid #eeeeee;">
                                                            <p style="margin: 0 0 10px 0; font-size: 10px; font-weight: bold; background: #000; color: #fff; display: inline-block; padding: 2px 6px;">01. CLIENTE</p>
                                                            <p style="margin: 0 0 5px 0; font-weight: bold;">${additional_info?.payer?.first_name || ''} ${additional_info?.payer?.last_name || ''}</p>
                                                            <p style="margin: 0; font-size: 12px; color: #666;">${additional_info?.payer?.phone?.number || 'Sin teléfono'}</p>
                                                        </td>
                                                        
                                                        <td width="50%" valign="top" style="padding: 20px;">
                                                            <p style="margin: 0 0 10px 0; font-size: 10px; font-weight: bold; background: #000; color: #fff; display: inline-block; padding: 2px 6px;">02. ENTREGA</p>
                                                            <p style="margin: 0 0 5px 0; font-size: 11px; line-height: 1.4;">${fullAddress}</p>
                                                            <p style="margin: 5px 0 0 0; font-size: 9px; color: #666; text-transform: uppercase;">MÉTODO: ${shippingType}</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding: 20px; background-color: #000000; color: #666666; font-size: 10px; text-align: center;">
                                                <p style="margin: 0;">SYSTEM GENERATED REPORT v2.0</p>
                                                <p style="margin: 5px 0 0 0;">NØR SPORTSWEAR // MEXICO</p>
                                            </td>
                                        </tr>

                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
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