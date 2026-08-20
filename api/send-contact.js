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
      tipoProyecto,
      mensaje,
      turnstileToken
    } = req.body

    if (
      !nombre?.trim() ||
      !email?.trim() ||
      !mensaje?.trim() ||
      !turnstileToken
    ) {
      return res.status(400).json({
        message: 'Completá todos los campos obligatorios'
      })
    }

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
        message: 'La validación de seguridad falló'
      })
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      subject: `Nueva consulta web - ${nombre}`,
      replyTo: email,
      text: `
NUEVA CONSULTA WEB
================================

CLIENTE

Nombre:
${nombre}

Email:
${email}


PROYECTO

Tipo de proyecto:
${tipoProyecto || 'No especificado'}


MENSAJE

${mensaje}


================================
Consulta enviada desde el formulario de contacto.
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
    console.error('ERROR SEND CONTACT:', error)

    return res.status(500).json({
      message: 'Error interno del servidor'
    })
  }
}