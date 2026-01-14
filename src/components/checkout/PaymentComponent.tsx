'use client';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import { useRouter } from 'next/navigation';

// Inicializamos con la Public Key
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);

export const PaymentComponent = ({ amount, description, email }: { amount: number, description: string, email: string }) => {
    const router = useRouter();

    const initialization = {
        amount: amount,
        payer: { email: email }, // Pre-llenamos el email del formulario anterior
    };

    const onSubmit = async (formData: any) => {
        // 1. Enviamos los datos cifrados a NUESTRO backend
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        // 2. Si se aprueba, redirigimos a la página de éxito
        if (result.status === 'approved') {
            router.push(`/checkout/success?payment_id=${result.id}`);
        } else {
            alert("El pago no fue aprobado: " + (result.detail || "Intente con otra tarjeta"));
        }
    };

    return (
        <div className="payment-brick-container bg-white p-4 border border-gray-200">
            <CardPayment
                initialization={initialization}
                onSubmit={onSubmit}
                customization={{
                    visual: {
                        style: {
                            theme: 'default', // Puedes usar 'flat' o 'bootstrap'
                        }
                    }
                }}
            />
        </div>
    );
};