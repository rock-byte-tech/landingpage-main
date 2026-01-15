import type { APIRoute } from "astro";

export const prerender = false;

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.BREVO_API_KEY;
  const senderEmail = import.meta.env.BREVO_SENDER ?? "noreply@rock-byte-tech.com.co";
  const senderName = import.meta.env.BREVO_SENDER_NAME ?? "Rock Byte Tech";
  const destination = import.meta.env.BREVO_DESTINATION ?? "freelancer.santiago.a@gmail.com";

  let body: { nombre?: string; email?: string; mensaje?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Solicitud invalida." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const nombre = body?.nombre?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const mensaje = body?.mensaje?.trim() ?? "";

  if (!nombre || !email || !mensaje || !emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: "Datos de contacto invalidos." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Falta configuración del API key." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const payload = {
    sender: { email: senderEmail, name: senderName },
    to: [{ email: destination, name: "Rock Byte Tech" }],
    replyTo: { email, name: nombre },
    subject: `Nuevo contacto - ${nombre}`,
    htmlContent: `
      <h3>Nuevo contacto</h3>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje}</p>
    `
  };

  try {
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!brevoResponse.ok) {
      const errText = await brevoResponse.text();
      return new Response(JSON.stringify({ error: "No se pudo enviar el correo.", detail: errText }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
