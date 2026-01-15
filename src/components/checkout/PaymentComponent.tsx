'use client';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useRouter } from 'next/navigation';

// Inicializamos Mercado Pago
initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!, {
    locale: 'es-MX'
});

export const PaymentComponent = ({ amount, description, email }: { amount: number, description: string, email: string }) => {
    const router = useRouter();

    const initialization = {
        amount: amount,
        payer: { email: email },
    };

    // 🔴 CORRECCIÓN AQUÍ: Agregamos ": any" para que TypeScript no marque error
    // con los textos 'all' o 'default'.
    const customization: any = {
        paymentMethods: {
            ticket: "all",         // Activa OXXO, 7Eleven, PayCash
            bankTransfer: "all",   // Activa SPEI
            creditCard: "all",     // Tarjetas Crédito
            debitCard: "all",      // Tarjetas Débito
            mercadoPago: "all",    // Billetera Mercado Pago
        },
        visual: {
            style: {
                theme: 'default', // 'default' | 'dark' | 'bootstrap' | 'flat'
            }
        }
    };

    const onSubmit = async ({ formData }: any) => {
        // Envia los datos a tu backend
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        // Manejo de estados 'pending' (para OXXO/SPEI)
        if (result.status === 'approved' || result.status === 'in_process' || result.status === 'pending') {
            router.push(`/checkout/success?payment_id=${result.id}`);
        } else {
            alert("Error al procesar el pago: " + (result.detail || "Intenta nuevamente"));
        }
    };

    const onError = async (error: any) => {
        console.log("Error en brick:", error);
    };

    const onReady = async () => {
        console.log("Brick listo");
    };

    return (
        <div className="payment-brick-container bg-white p-4 border border-gray-200 rounded-lg">
            <Payment
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
            />
        </div>
    );
};