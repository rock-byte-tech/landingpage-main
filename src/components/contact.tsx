import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const copy = {
  eyebrow: "Contacto directo",
  title: "Impulsa tu producto con Rock Byte Tech",
  body:
    "Somos tu aliado en desarrollo web, automatización y software a la medida. Cuéntanos el reto y armamos una propuesta clara y ejecutable.",
  emailAria: "Enviar correo a Rock Byte Tech",
  brandAria: "Abrir el sitio de Rock Byte Tech",
  brandLabel: "rock-byte-tech.com.co",
  responseNote: "Respuesta en menos de 24 horas hábiles.",
  nameLabel: "Nombre",
  namePlaceholder: "Tu nombre completo",
  emailLabel: "Correo",
  emailPlaceholder: "tu@correo.com",
  messageLabel: "Mensaje",
  messagePlaceholder: "Cuéntanos sobre tu proyecto y objetivos",
  formAria: "Formulario de contacto",
  submit: "Enviar mensaje",
  submitting: "Enviando...",
  successMessage: "Gracias por escribir a Rock Byte Tech. Te responderemos muy pronto.",
  submitError: "No pudimos enviar tu mensaje. Intenta nuevamente.",
  submitErrorFallback: "Ocurrió un error inesperado. Intenta nuevamente.",
  errors: {
    nameRequired: "El nombre es obligatorio.",
    emailInvalid: "Ingresa un correo válido.",
    messageRequired: "El mensaje es obligatorio."
  }
};

export default function ContactSection() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate() {
    const errs: { [key: string]: string } = {};
    if (!form.nombre.trim()) errs.nombre = copy.errors.nameRequired;
    if (
      !form.email.trim() ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)
    ) {
      errs.email = copy.errors.emailInvalid;
    }
    if (!form.mensaje.trim()) errs.mensaje = copy.errors.messageRequired;
    return errs;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const resp = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form })
        });
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(data?.error || copy.submitError);
        }
        setSubmitted(true);
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : copy.submitErrorFallback
        );
      } finally {
        setSubmitting(false);
      }
    }
  }

  return (
    <section
      className="relative py-20 md:py-28 bg-gradient-to-br from-[#0b0b0b] via-[#111] to-[#1a1a1a] border-t border-white/5"
      id="contacto"
      aria-labelledby="contact-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,198,0.08),_transparent_45%)]"></div>
      <div className="relative max-w-5xl mx-auto px-4" data-aos="fade-up">
        <div className="rounded-2xl border border-white/10 bg-black/50 p-8 md:p-10 shadow-[0_0_35px_rgba(0,255,198,0.12)] grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00FFC6]/80">
              {copy.eyebrow}
            </p>
            <h2 id="contact-title" className="text-2xl md:text-3xl font-bold text-white">
              {copy.title}
            </h2>
            <p className="text-gray-300">{copy.body}</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#00FFC6]" aria-hidden="true"></span>
                Respuesta clara en menos de 24 horas hábiles.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#00FFC6]" aria-hidden="true"></span>
                Propuesta con alcance, tiempos y tecnología recomendada.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#00FFC6]" aria-hidden="true"></span>
                Acompañamiento técnico durante la ejecución.
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://wa.me/573196440848?text=Estoy%20interesad%40%20en%20adquirir%20uno%20de%20sus%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 rounded-full border border-[#00FFC6]/60 text-[#00FFC6] hover:bg-[#00FFC6] hover:text-black transition"
                aria-label="Escribir por WhatsApp"
              >
                Hablar por WhatsApp
              </a>
              <a
                href="https://calendly.com/devops-rbt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 rounded-full border border-white/30 text-white hover:border-[#00FFC6] hover:text-[#00FFC6] transition"
                aria-label="Agendar en Calendly"
              >
                Agendar en Calendly
              </a>
            </div>
          </div>

          <div>
            {submitted ? (
              <div
                className="bg-emerald-900/40 border border-emerald-600 text-emerald-200 px-4 py-3 rounded text-center"
                role="status"
                aria-live="polite"
              >
                {copy.successMessage}
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-label={copy.formAria}>
                <div>
                  <label className="block text-gray-200 font-medium mb-1" htmlFor="nombre">
                    {copy.nameLabel}
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    required
                    className="w-full border border-white/10 bg-black/40 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FFC6]"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder={copy.namePlaceholder}
                  />
                  {errors.nombre && (
                    <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-200 font-medium mb-1" htmlFor="email">
                    {copy.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full border border-white/10 bg-black/40 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FFC6]"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={copy.emailPlaceholder}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-200 font-medium mb-1" htmlFor="mensaje">
                    {copy.messageLabel}
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    required
                    className="w-full border border-white/10 bg-black/40 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FFC6]"
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder={copy.messagePlaceholder}
                  ></textarea>
                  {errors.mensaje && (
                    <p className="text-red-400 text-sm mt-1">{errors.mensaje}</p>
                  )}
                </div>
                {submitError && (
                  <p className="text-red-400 text-sm">{submitError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#00FFC6] text-black font-bold py-3 rounded-lg hover:bg-white hover:shadow-[0_0_18px_rgba(0,255,198,0.7)] transition"
                  role="button"
                  aria-label={copy.submit}
                  disabled={submitting}
                >
                  {submitting ? copy.submitting : copy.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
