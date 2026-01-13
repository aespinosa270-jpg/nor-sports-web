'use server';

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
    const email = formData.get('email');

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return { success: false, message: 'EMAIL INVÁLIDO' };
    }

    try {

        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log(`Nuevo suscriptor registrado: ${email}`);

        return { success: true, message: 'BIENVENIDO AL LABORATORIO.' };
    } catch (error) {
        return { success: false, message: 'ERROR DEL SISTEMA. INTENTA DE NUEVO.' };
    }
}