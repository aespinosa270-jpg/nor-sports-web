import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const sendOrderConfirmation = async (paymentData: any) => {
  if (!resend) return;

  try {
    const { id, transaction_amount, payer, description } = paymentData;

    await resend.emails.send({
      from: 'NØR SYSTEMS <ventas@huup.com.mx>', // TU DOMINIO VERIFICADO
      to: ['tu-correo-admin@gmail.com', payer.email], // Se lo mandamos al admin y al cliente
      subject: `NØR: CONFIRMACIÓN DE PEDIDO #${id}`,
      html: `
        <div style="font-family: monospace; background: #000; color: #fff; padding: 20px;">
          <h2 style="border-bottom: 1px solid #fff;">PAGO APROBADO</h2>
          <p><strong>ID PAGO:</strong> ${id}</p>
          <p><strong>TOTAL:</strong> $${transaction_amount} MXN</p>
          <p><strong>CONCEPTO:</strong> ${description}</p>
          <br/>
          <p style="color: #888;">NØR SYSTEMS // 2026</p>
        </div>
      `
    });
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};