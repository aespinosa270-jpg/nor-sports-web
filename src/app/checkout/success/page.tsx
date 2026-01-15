import Link from "next/link";

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ payment_id: string }>;
}) {
    const { payment_id } = await searchParams;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <div className="mb-6">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Orden Recibida!</h1>
                <p className="text-gray-600 mb-6">
                    Tu pago ha sido procesado correctamente.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
                    <p className="text-sm text-gray-500 mb-1">ID de transacción:</p>
                    <p className="font-mono text-sm font-medium text-gray-900">{payment_id}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
                    <p className="text-blue-800 text-sm">
                        📧 Si elegiste <strong>OXXO</strong>, revisa tu correo electrónico.
                        Te hemos enviado el ticket con las instrucciones para pagar.
                    </p>
                </div>

                <Link
                    href="/"
                    className="block w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Volver a la tienda
                </Link>
            </div>
        </div>
    );
}