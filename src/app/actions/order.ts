'use server'

import { supabaseAdmin } from '@/lib/supabase-admin';
import { getQuote } from '@/app/actions/shipping';

export async function createOrder(formData: any, cartItems: any[], shippingServiceId: string) {
    try {
        const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const quoteRes = await getQuote(
            process.env.NEXT_PUBLIC_ORIGIN_ZIP || "06600",
            formData.zipCode,
            1
        );

        let shippingCost = 0;
        let selectedService = "Standard";

        if (quoteRes.success) {
            const service = quoteRes.services.find((s: any) => s.serviceTypeId === shippingServiceId);
            if (service) {
                shippingCost = service.totalAmount;
                selectedService = service.serviceDescription;
            }
        }

        const total = subtotal + shippingCost;

        // 3. Guardar en Supabase
        const { data, error } = await supabaseAdmin
            .from('orders')
            .insert({
                customer_email: formData.email,
                customer_name: `${formData.firstName} ${formData.lastName}`,
                phone: formData.phone,
                shipping_address: {
                    street: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zipCode,
                    country: 'MX'
                },
                items: cartItems,
                subtotal,
                shipping_cost: shippingCost,
                total,
                status: 'pending_payment', // Aquí cambiaría a 'paid' si integras Stripe directo
                payment_method: 'manual_transfer' // O el que uses
            })
            .select()
            .single();

        if (error) throw new Error(error.message);

        return { success: true, orderId: data.id };

    } catch (error: any) {
        console.error("ORDER_ERROR:", error);
        return { success: false, error: error.message };
    }
}