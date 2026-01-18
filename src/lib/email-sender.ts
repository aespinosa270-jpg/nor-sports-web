import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/db';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const sendOrderConfirmation = async (paymentData: any) => {
    if (!resend) {
        console.error("⚠️ Falta RESEND_API_KEY");
        return;
    }

    const orderId = paymentData.external_reference;
    if (!orderId || orderId === "S/N") {
        console.error("❌ Error: Pago sin referencia a Supabase");
        return;
    }

    const { data: order, error } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

    if (error || !order) {
        console.error("❌ Orden no encontrada en Supabase:", error?.message);
        return;
    }

    const customerName = order.customer_name;
    const customerEmail = order.customer_email;
    const phone = order.phone;

    const addr = order.shipping_address || {};
    const fullAddressString = `${addr.street || ''}, ${addr.city || ''}, ${addr.state || ''}, CP ${addr.zip || ''}`;

    const shippingCost = order.shipping_cost || 0;
    const shippingService = shippingCost > 0 ? "Envío Estándar" : "Envío Gratuito";

    const cartItems = order.items || [];

    const itemsHtmlRows = cartItems.map((item: any) => `
        <tr>
            <td style="padding: 5px 0; border-bottom: 1px dotted #ccc;">
                <span style="font-weight: bold;">${item.quantity}x</span> ${item.name || item.title || 'Producto'}
            </td>
            <td style="text-align: right; padding: 5px 0; border-bottom: 1px dotted #ccc;">
                $${item.price}
            </td>
        </tr>
    `).join('');

    const { transaction_amount, fee_details, transaction_details, date_approved, payment_method_id } = paymentData;
    const netReceived = transaction_details?.net_received_amount || 0;
    const mpFee = fee_details?.[0]?.amount || 0;

    const dateFormatted = new Date(date_approved).toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    try {

        await resend.emails.send({
            from: 'NØR Systems <notificaciones@send.nor.com.mx>',
            to: ['ventas@nor.com.mx'],
            replyTo: 'ventas@nor.com.mx',
            subject: `● NUEVA ORDEN: ${customerName} (${cartItems.length} items)`,
            html: `
            <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Courier New', Courier, monospace;">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #000000; box-shadow: 10px 10px 0px #cccccc;">
                                
                                <tr>
                                    <td style="background-color: #000000; padding: 20px; color: #ffffff;">
                                        <h1 style="margin: 0; font-size: 24px; letter-spacing: 4px;">NØR_SYSTEMS</h1>
                                        <p style="margin: 5px 0 0 0; font-size: 10px; opacity: 0.7;">ORDEN DE EMPAQUETADO</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 20px; border-bottom: 2px dashed #000;">
                                        <table width="100%">
                                            <tr><td><strong>DB ID:</strong></td><td style="text-align: right; font-size: 12px;">${orderId}</td></tr>
                                            <tr><td><strong>FECHA:</strong></td><td style="text-align: right; font-size: 10px;">${dateFormatted}</td></tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 20px; background-color: #f9f9f9; border-bottom: 1px solid #eee;">
                                        <p style="background: #000; color: #fff; display: inline-block; padding: 2px 5px; font-size: 10px; font-weight: bold;">01. CLIENTE & ENVÍO</p>
                                        <p style="margin: 5px 0; font-weight: bold;">${customerName}</p>
                                        <p style="margin: 0; font-size: 12px;">${customerEmail} | ${phone}</p>
                                        <p style="margin: 10px 0 0 0; font-size: 12px; border: 1px solid #ddd; background: #fff; padding: 5px;">
                                            ${fullAddressString}
                                        </p>
                                        <p style="margin: 5px 0 0 0; font-size: 10px; color: #666;">${shippingService}</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 20px; border-bottom: 1px solid #eee;">
                                        <p style="background: #000; color: #fff; display: inline-block; padding: 2px 5px; font-size: 10px; font-weight: bold;">02. ARTÍCULOS A EMPACAR</p>
                                        <table width="100%" style="font-size: 14px; margin-top: 10px; border-collapse: collapse;">
                                            ${itemsHtmlRows}
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 20px; background-color: #fafafa;">
                                        <p style="background: #000; color: #fff; display: inline-block; padding: 2px 5px; font-size: 10px; font-weight: bold;">03. BALANCE</p>
                                        <table width="100%" style="margin-top: 10px;">
                                            <tr><td>Subtotal Prod:</td><td style="text-align: right;">$${order.subtotal}</td></tr>
                                            <tr><td>Envío Cobrado:</td><td style="text-align: right;">$${shippingCost}</td></tr>
                                            <tr><td colspan="2"><hr/></td></tr>
                                            <tr><td><strong>TOTAL PAGADO:</strong></td><td style="text-align: right;"><strong>$${transaction_amount}</strong></td></tr>
                                            <tr><td style="color:red; font-size:10px;">Comisión MP (${payment_method_id}):</td><td style="text-align: right; color:red; font-size:10px;">-$${mpFee}</td></tr>
                                            <tr><td style="font-weight:900; font-size:16px;">NETO:</td><td style="text-align: right; font-weight:900; font-size:16px; background:#000; color:#fff;">$${netReceived}</td></tr>
                                        </table>
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
        console.log(`✅ Reporte de Inventario enviado a Ventas`);


        if (customerEmail) {
            await resend.emails.send({
                from: 'NØR SPORTSWEAR <hola@send.nor.com.mx>',
                to: [customerEmail],
                subject: `Tu pedido #${orderId.slice(0, 8)} está confirmado`,
                html: `
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #fff; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                        <h1 style="letter-spacing: 5px; margin-bottom: 20px;">NØR</h1>
                        <p>GRACIAS, ${customerName.toUpperCase()}.</p>
                        <p style="color:#666; font-size: 14px;">Hemos recibido tu pago y estamos preparando tus artículos:</p>
                        
                        <div style="text-align: left; background-color: #f9f9f9; padding: 20px; margin: 20px 0; border: 1px solid #eee;">
                            <table width="100%" style="font-size: 14px;">
                                ${itemsHtmlRows}
                                <tr>
                                    <td style="padding-top:10px; font-weight:bold;">Envío</td>
                                    <td style="text-align:right; padding-top:10px;">$${shippingCost}</td>
                                </tr>
                                <tr>
                                    <td style="padding-top:10px; font-weight:bold; border-top:1px solid #ddd;">TOTAL</td>
                                    <td style="text-align:right; padding-top:10px; font-weight:bold; border-top:1px solid #ddd;">$${transaction_amount}</td>
                                </tr>
                            </table>
                        </div>

                        <p style="font-size: 12px; color: #888;">Enviando a:</p>
                        <p style="font-size: 14px;">${fullAddressString}</p>
                        
                        <br/>
                        <a href="https://nor.com.mx" style="color: #000; text-decoration: underline; font-size: 12px;">Ir a la tienda</a>
                    </div>
                </body>
                </html>
                `
            });
            console.log(`✅ Confirmación enviada al cliente`);
        }

    } catch (error) {
        console.error("❌ Error enviando correos:", error);
    }
};