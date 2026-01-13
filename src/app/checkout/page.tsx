'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { getQuote } from '@/app/actions/shipping';
import { createOrder } from '@/app/actions/order';
import { createPaymentPreference } from '@/app/actions/payment';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiChevronRight, FiTag, FiCheckCircle } from 'react-icons/fi';
import { SiMercadopago } from 'react-icons/si';

// --- INPUT TÉCNICO NØR ---
const InputField = ({ label, name, type = "text", value, onChange, placeholder, className = "" }: any) => (
    <div className={`relative group ${className}`}>
        <label className="block text-[10px] font-bold text-nor-black uppercase tracking-widest mb-2 font-syncopate">
            {label}
        </label>
        <input
            required
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-white border-2 border-nor-black px-4 py-3 text-sm text-nor-black outline-none focus:bg-gray-50 transition-all font-medium placeholder:text-gray-400 font-mono"
        />
    </div>
);

// --- LOGOS REALES (Corregido: American Express) ---
const PaymentLogos = ({ grayscale = false }: { grayscale?: boolean }) => (
    <div className={`flex justify-center items-center gap-6 py-4 ${grayscale ? 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all' : ''}`}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 w-auto object-contain" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-auto object-contain" />
        {/* Aquí la corrección explícita en el alt */}
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg" alt="American Express" className="h-4 w-auto object-contain" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/66/Oxxo_Logo.svg" alt="OXXO" className="h-6 w-auto object-contain" />
    </div>
);

export default function CheckoutPage() {
    const router = useRouter();
    const { items, clearCart } = useCartStore();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [shippingOptions, setShippingOptions] = useState<any[]>([]);
    const [selectedShipping, setSelectedShipping] = useState<any>(null);
    const [promoCode, setPromoCode] = useState('');

    const [form, setForm] = useState({
        email: '', firstName: '', lastName: '', address: '',
        colonia: '', city: '', state: '', zipCode: '', phone: ''
    });

    // --- CÁLCULOS MATEMÁTICOS (IVA 16%) ---
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxRate = 0.16;
    const taxAmount = subtotal * taxRate;
    const shippingCost = selectedShipping?.totalAmount || 0;

    // Total Final = Subtotal + IVA + Envío
    const grandTotal = subtotal + taxAmount + shippingCost;

    useEffect(() => {
        if (items.length === 0) router.push('/shop');
    }, [items, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCalculateShipping = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 600));

        const res = await getQuote("06600", form.zipCode, 1);
        if (res.success) {
            setShippingOptions(res.services);
            setStep(2);
        } else {
            alert("No encontramos cobertura para este Código Postal.");
        }
        setLoading(false);
    };

    const handlePlaceOrder = async () => {
        if (!selectedShipping) return;
        setLoading(true);

        try {
            const orderRes = await createOrder(form, items, selectedShipping?.serviceTypeId || 'standard');

            if (!orderRes.success) throw new Error(orderRes.error);

            const paymentRes = await createPaymentPreference(orderRes.orderId);

            if (paymentRes.success && paymentRes.url) {
                clearCart();
                window.location.href = paymentRes.url;
            } else {
                throw new Error("Error generando link de pago.");
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message);
            setLoading(false);
        }
    };

    if (items.length === 0) return null;

    return (
        <div className="min-h-screen bg-white text-nor-black font-sans selection:bg-nor-black selection:text-white pt-24 pb-20">

            {/* HEADER TÉCNICO */}
            <div className="fixed top-0 left-0 w-full bg-white z-40 border-b-2 border-nor-black h-16 flex items-center justify-between px-6 md:px-12">
                <div className="font-bold tracking-[0.2em] text-sm flex items-center gap-2 font-syncopate">
                    NØR // CHECKOUT
                </div>
                <div className="flex items-center gap-2 text-[10px] text-nor-black font-mono uppercase bg-nor-black text-white px-3 py-1">
                    <FiLock size={10} /> SISTEMA SEGURO
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-4 md:px-8 mt-8">

                {/* === COLUMNA IZQUIERDA (FORMULARIOS) === */}
                <div className="lg:col-span-7 space-y-8">

                    <AnimatePresence mode="wait">

                        {/* PASO 1: DATOS DE ENVÍO */}
                        <div className={`transition-all duration-500 ${step === 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                            <div className="border-2 border-nor-black p-6 md:p-8">
                                <div className="flex justify-between items-baseline mb-8 border-b-2 border-nor-black pb-4 font-syncopate">
                                    <h2 className="text-xl font-bold tracking-tighter flex items-center gap-3">
                                        <span className="text-nor-black">01 //</span> DATOS DE ENVÍO
                                    </h2>
                                    {step > 1 && <button onClick={() => setStep(1)} className="text-[10px] font-bold underline uppercase tracking-widest hover:text-nor-accent font-mono">Editar</button>}
                                </div>

                                {step === 1 && (
                                    <motion.form
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        onSubmit={handleCalculateShipping}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                    >
                                        <InputField label="Correo Electrónico" name="email" type="email" value={form.email} onChange={handleChange} className="md:col-span-2" placeholder="ejemplo@email.com" />

                                        <InputField label="Nombre(s)" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Tu Nombre" />
                                        <InputField label="Apellidos" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Tus Apellidos" />

                                        <InputField label="Calle y Número" name="address" value={form.address} onChange={handleChange} className="md:col-span-2" placeholder="Av. Principal #123" />

                                        <InputField label="Colonia" name="colonia" value={form.colonia} onChange={handleChange} placeholder="Colonia Centro" />
                                        <InputField label="Código Postal" name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="00000" />

                                        <InputField label="Ciudad" name="city" value={form.city} onChange={handleChange} placeholder="Ciudad" />
                                        <InputField label="Estado" name="state" value={form.state} onChange={handleChange} placeholder="Estado" />

                                        <InputField label="Teléfono" name="phone" value={form.phone} onChange={handleChange} className="md:col-span-2" placeholder="10 dígitos" />

                                        <div className="md:col-span-2 pt-6">
                                            <button
                                                disabled={loading}
                                                type="submit"
                                                className="w-full bg-nor-black text-white h-14 text-sm font-bold uppercase tracking-[0.2em] hover:bg-nor-accent transition-colors flex items-center justify-center gap-3 font-syncopate"
                                            >
                                                {loading ? "VERIFICANDO..." : <>CONTINUAR A LOGÍSTICA <FiChevronRight /></>}
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </div>
                        </div>

                        {/* PASO 2: MÉTODO DE ENVÍO */}
                        <div className={`transition-all duration-500 ${step === 2 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                            <div className="border-2 border-nor-black p-6 md:p-8 mt-8">
                                <div className="flex justify-between items-baseline mb-8 border-b-2 border-nor-black pb-4 font-syncopate">
                                    <h2 className="text-xl font-bold tracking-tighter flex items-center gap-3">
                                        <span className="text-nor-black">02 //</span> LOGÍSTICA
                                    </h2>
                                    {step > 2 && <button onClick={() => setStep(2)} className="text-[10px] font-bold underline uppercase tracking-widest hover:text-nor-accent font-mono">Editar</button>}
                                </div>

                                {step === 2 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                        {shippingOptions.map((opt) => (
                                            <div
                                                key={opt.serviceTypeId}
                                                onClick={() => setSelectedShipping(opt)}
                                                className={`p-6 border-2 cursor-pointer flex justify-between items-center transition-all group font-mono ${selectedShipping?.serviceTypeId === opt.serviceTypeId
                                                    ? 'border-nor-black bg-nor-black text-white'
                                                    : 'border-nor-black hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedShipping?.serviceTypeId === opt.serviceTypeId ? 'border-white' : 'border-nor-black'}`}>
                                                        {selectedShipping?.serviceTypeId === opt.serviceTypeId && <div className="w-3 h-3 bg-white rounded-full" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm uppercase tracking-wider">{opt.serviceDescription}</div>
                                                        <div className={`text-xs mt-1 font-medium ${selectedShipping?.serviceTypeId === opt.serviceTypeId ? 'text-gray-300' : 'text-gray-500'}`}>{opt.deliveryType}</div>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-bold">${opt.totalAmount} MXN</div>
                                            </div>
                                        ))}

                                        <div className="pt-6 flex gap-4 font-syncopate">
                                            <button onClick={() => setStep(1)} className="w-1/3 border-2 border-nor-black text-sm font-bold uppercase tracking-widest hover:bg-gray-50">
                                                Atrás
                                            </button>
                                            <button
                                                disabled={!selectedShipping}
                                                onClick={() => setStep(3)}
                                                className="w-2/3 bg-nor-black text-white h-14 text-sm font-bold uppercase tracking-[0.2em] hover:bg-nor-accent transition-colors disabled:opacity-50"
                                            >
                                                Ir al Pago
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* PASO 3: PAGO */}
                        <div className={`transition-all duration-500 ${step === 3 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                            <div className="border-2 border-nor-black p-6 md:p-8 mt-8">
                                <div className="flex justify-between items-baseline mb-8 border-b-2 border-nor-black pb-4 font-syncopate">
                                    <h2 className="text-xl font-bold tracking-tighter flex items-center gap-3">
                                        <span className="text-nor-black">03 //</span> PASARELA DE PAGO
                                    </h2>
                                </div>

                                {step === 3 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                                        <div className="bg-nor-black text-white p-6 mb-6 flex items-start gap-4 border-2 border-nor-black font-mono">
                                            <div className="p-2 bg-white text-nor-black rounded-none">
                                                <SiMercadopago size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold uppercase text-sm">Procesado por Mercado Pago</h4>
                                                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                                                    Serás redirigido para completar tu compra de forma segura.
                                                    Aceptamos tarjetas, SPEI y efectivo (OXXO).
                                                </p>
                                            </div>
                                        </div>

                                        <PaymentLogos />

                                        <div className="space-y-4 font-syncopate mt-6">
                                            <button
                                                onClick={handlePlaceOrder}
                                                disabled={loading}
                                                className="w-full bg-nor-black text-white h-16 text-sm font-bold uppercase tracking-[0.2em] hover:bg-nor-accent transition-all flex items-center justify-center gap-3 border-2 border-nor-black"
                                            >
                                                {loading ? "CONECTANDO..." : `PAGAR $${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} MXN`} <SiMercadopago />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                    </AnimatePresence>
                </div>

                {/* === COLUMNA DERECHA (TICKET SUMMARY) === */}
                <div className="hidden lg:block lg:col-span-5">
                    <div className="sticky top-28">
                        <div className="bg-white border-2 border-nor-black p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <div className="bg-nor-black text-white p-4 text-left border-b-2 border-white">
                                <h3 className="text-lg font-bold uppercase tracking-tighter font-syncopate">RESUMEN DEL PEDIDO</h3>
                            </div>

                            <div className="p-8 font-mono">
                                {/* Items List */}
                                <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar border-b-2 border-nor-black pb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-5 items-start">
                                            <div className="w-16 h-20 bg-nor-black border-2 border-nor-black relative shrink-0">
                                                <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">ITEM</div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <p className="font-bold text-sm uppercase tracking-wide leading-tight">{item.name}</p>
                                                    <p className="text-[10px] text-gray-500 mt-1 uppercase bg-gray-100 inline-block px-2 py-0.5 border border-nor-black">{item.size} / {item.color}</p>
                                                </div>
                                                <div className="flex justify-between items-end mt-2">
                                                    <p className="text-[10px] font-bold">x{item.quantity}</p>
                                                    <p className="font-bold text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desglose de Totales (CON IVA) */}
                                <div className="space-y-3 text-sm mb-6">
                                    <div className="flex justify-between">
                                        <span className="uppercase font-bold">Subtotal</span>
                                        <span className="font-bold">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>

                                    {/* IVA DESGLOSADO */}
                                    <div className="flex justify-between text-nor-black/70">
                                        <span className="uppercase font-bold">IVA (16%)</span>
                                        <span className="font-bold">${taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="uppercase font-bold">Envío</span>
                                        <span className="font-bold">
                                            {selectedShipping ? `$${selectedShipping.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '--'}
                                        </span>
                                    </div>
                                </div>

                                {/* Promo Input */}
                                <div className="mb-6">
                                    <div className="flex border-2 border-nor-black">
                                        <div className="bg-nor-black flex items-center justify-center px-3 text-white">
                                            <FiTag />
                                        </div>
                                        <input
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="CÓDIGO DE PROMOCIÓN"
                                            className="flex-1 bg-white py-3 px-3 text-xs uppercase tracking-widest outline-none font-bold placeholder:text-gray-400 font-mono"
                                        />
                                        <button className="bg-nor-black text-white h-auto px-4 text-[10px] font-bold uppercase hover:bg-nor-accent transition-colors">
                                            Aplicar
                                        </button>
                                    </div>
                                </div>

                                {/* Total Final */}
                                <div className="flex justify-between items-end border-t-2 border-nor-black pt-6 mt-6">
                                    <span className="font-syncopate font-bold text-xl tracking-tighter uppercase">TOTAL</span>
                                    <div className="text-right text-nor-accent">
                                        <span className="font-syncopate font-black text-3xl tracking-tighter">${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                        <span className="text-[10px] text-nor-black block -mt-1 font-mono text-right uppercase">MXN</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Garantía Footer */}
                        <div className="mt-6 flex gap-3 text-xs text-nor-black items-center px-4 font-mono border-2 border-nor-black p-4 bg-white">
                            <FiCheckCircle className="shrink-0 text-nor-accent" size={20} />
                            <p className="leading-tight text-[10px] uppercase font-bold">
                                ¡Muy bien! Pedido seguro. Aplican términos y condiciones.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}