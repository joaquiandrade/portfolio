import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Método no permitido'
    })
  }

  try {
    const {
      nombre,
      email,
      project,
      features,
      services,
      total,
      monthlyTotal,
      turnstileToken
    } = req.body

    if (!nombre || !email || !turnstileToken) {
      return res.status(400).json({
        message: 'Faltan datos obligatorios'
      })
    }

    // ==============================
    // VALIDAR CLOUDFLARE TURNSTILE
    // ==============================

    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken
        })
      }
    )

    const turnstileResult = await turnstileResponse.json()

if (!turnstileResult.success) {
  console.error('TURNSTILE ERROR:', turnstileResult)

  return res.status(400).json({
    message: 'La validación de seguridad falló',
    details: turnstileResult
  })
}

    const featuresText =
      features?.length > 0
        ? features.map(feature => `• ${feature.name} — $${feature.price.toLocaleString('es-AR')}`).join('\n')
        : 'Ninguna'

    const servicesText =
      services?.length > 0
        ? services.map(service => {
            const monthly = service.isMonthly ? ' / mes' : ''
            return `• ${service.name} — $${service.price.toLocaleString('es-AR')}${monthly}`
          }).join('\n')
        : 'Ninguno'

    // ENVIAR EMAIL

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      subject: `Nueva cotización web - ${nombre}`,
      replyTo: email,
      text: `
NUEVA COTIZACIÓN WEB
================================

CLIENTE

Nombre:
${nombre}

Email:
${email}


PROYECTO

${project?.name || 'No seleccionado'}

Precio base:
$${(project?.basePrice || 0).toLocaleString('es-AR')}


FUNCIONALIDADES

${featuresText}


SERVICIOS

${servicesText}


RESUMEN

Total estimado:
$${Number(total).toLocaleString('es-AR')}

Mantenimiento:
$${Number(monthlyTotal).toLocaleString('es-AR')} / mes


================================
Solicitud generada desde el Cotizador Web.
      `
    })

  if (error) {
    console.error('ERROR RESEND:', error)

    return res.status(500).json({
      message: error.message || 'No se pudo enviar el email'
    })
  }

    return res.status(200).json({
      success: true,
      id: data?.id
    })

  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Error interno del servidor'
    })
  }
}