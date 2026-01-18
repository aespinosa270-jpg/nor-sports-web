'use client';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useRouter } from 'next/navigation';

initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!, {
    locale: 'es-MX'
});

export const PaymentComponent = ({ amount, description, email }: { amount: number, description: string, email: string }) => {
    const router = useRouter();
    const norRed = '#cc0000';

    const initialization = {
        amount: amount,
        payer: { email: email },
    };

    const customization: any = {
        paymentMethods: {
            ticket: "all",
            bankTransfer: "all",
            creditCard: "all",
            debitCard: "all",
            mercadoPago: "all",
        },
        visual: {
            style: {
                theme: 'default',
                customVariables: {
                    borderRadius: '0px',
                    borderRadiusSmall: '0px',
                    borderRadiusMedium: '0px',
                    borderRadiusLarge: '0px',

                    formBackgroundColor: '#ffffff',
                    baseColor: '#000000',

                    inputBackgroundColor: '#ffffff',
                    inputBorderColor: '#000000',
                    inputFocusedBorderColor: norRed,
                    outlinePrimaryColor: norRed,

                    errorColor: norRed,
                    successColor: '#000000',

                    primaryColor: '#000000',
                    textPrimaryColor: '#000000',
                    textSecondaryColor: '#666666',
                }
            },
            hidePaymentButton: false,
            texts: {
                formSubmit: `AUTORIZAR CARGO $${amount}`,
            }
        }
    };

    const onSubmit = async ({ formData }: any) => {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.status === 'approved' || result.status === 'in_process' || result.status === 'pending') {
            router.push(`/checkout/success?payment_id=${result.id}`);
        } else {
            alert("Error de procesamiento: " + (result.detail || "Intenta nuevamente"));
        }
    };

    const onError = async (error: any) => {
        console.log("Error en terminal:", error);
    };

    const onReady = async () => {
        console.log("Terminal lista");
    };

    return (
        <div className="w-full max-w-2xl mx-auto font-mono my-8">

            <div className="bg-black text-white p-4 flex justify-between items-end mb-0 border-b-4 border-[#cc0000]">
                <div>
                    <h2 className="text-xl font-bold tracking-[0.2em] uppercase">03 // TERMINAL_PAGO</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-[#cc0000] rounded-full animate-pulse"></span>
                        <p className="text-[10px] text-[#cc0000]">SISTEMA_EN_LINEA :: ENCRIPTADO_TLS</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">TOTAL A PROCESAR</p>
                    <p className="text-2xl font-bold tracking-tighter text-white">${amount} MXN</p>
                </div>
            </div>

            <div className="border-x-2 border-b-2 border-black bg-white p-6 relative shadow-xl">

                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#cc0000] -translate-x-[2px] -translate-y-[2px]"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#cc0000] translate-x-[2px] -translate-y-[2px]"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#cc0000] -translate-x-[2px] translate-y-[2px]"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#cc0000] translate-x-[2px] translate-y-[2px]"></div>

                <div className="nor-mp-wrapper relative z-10">
                    <Payment
                        initialization={initialization}
                        customization={customization}
                        onSubmit={onSubmit}
                        onReady={onReady}
                        onError={onError}
                    />
                </div>

                <div className="mt-8 pt-4 border-t border-dashed border-gray-300 flex justify-between text-[10px] text-gray-400 uppercase">
                    <span>ID_SESIÓN: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    <span>PROTOCOLO_SEGURO_NOR_V2</span>
                </div>
            </div>
        </div>
    );
};