// src/pages/api/enviar.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  
  // 1. Extraemos EXACTAMENTE los campos que tiene tu formulario
  const nombre = data.get('nombre');
  const email = data.get('email');
  const whatsapp = data.get('whatsapp');
  const empresa = data.get('empresa');

  // 2. Validación: Ahora exigimos nombre, email y whatsapp (ya no "mensaje")
  if (!nombre || !email || !whatsapp) {
    return new Response(
      JSON.stringify({ message: "Faltan campos obligatorios" }),
      { status: 400 }
    );
  }

  try {
    const { data: resData, error } = await resend.emails.send({
      // Resend exige que el correo de salida sea este en modo prueba:
      from: 'Web B2B <onboarding@resend.dev>', 
      // IMPORTANTE: Cambia esto por TU correo real de Gmail/Outlook donde quieres leer a tus clientes:
      to: ['cotosgino@gmail.com'], 
      subject: `🔥 Nuevo Lead B2B: ${nombre} de ${empresa}`,
      html: `
        <div style="font-family: sans-serif; color: #1F2937; max-w: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0F172A; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Nueva Solicitud de Diagnóstico</h2>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="margin-bottom: 10px;"><strong>👤 Nombre:</strong> ${nombre}</p>
            <p style="margin-bottom: 10px;"><strong>🏢 Empresa:</strong> ${empresa}</p>
            <p style="margin-bottom: 10px;"><strong>📱 WhatsApp:</strong> ${whatsapp}</p>
            <p style="margin-bottom: 20px;"><strong>✉️ Email:</strong> ${email}</p>
            
            <a href="https://wa.me/${String(whatsapp).replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      `
    });

    if (error) {
      console.error("Error de Resend:", error);
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "¡Correo enviado con éxito!" }), { status: 200 });

  } catch (error) {
    console.error("Error del servidor:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
};