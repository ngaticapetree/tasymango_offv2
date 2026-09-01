import { NextResponse } from "next/server"

// Who gets emailed when someone submits the Contact form.
// Add more addresses to this array if needed — e.g. a bandmate's email.
const NOTIFICATION_RECIPIENTS = [
  "ngaticapetree@gmail.com",
  "castioniaurele@gmail.com",
  "el.deandres@ikmail.com",
  "raphael.bollengier@icloud.com",
]

// The address the notification email is sent FROM. Must eventually match
// a domain authenticated in Brevo (Settings → Senders, Domains) for best
// deliverability.
const SENDER_EMAIL = "contact@tastymango.ch"
const SENDER_NAME = "Tasty Mango — Site web"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set")
    return NextResponse.json({ error: "Configuration serveur manquante." }, { status: 500 })
  }

  let name = ""
  let email = ""
  let subject = ""
  let message = ""

  try {
    const body = await request.json()
    name = typeof body.name === "string" ? body.name.trim() : ""
    email = typeof body.email === "string" ? body.email.trim() : ""
    subject = typeof body.subject === "string" ? body.subject.trim() : ""
    message = typeof body.message === "string" ? body.message.trim() : ""
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
  }

  if (!name || !email || !email.includes("@") || !message) {
    return NextResponse.json({ error: "Merci de remplir tous les champs obligatoires." }, { status: 400 })
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "api-key": apiKey,
  }

  // 1. Save the person as a contact/lead in Brevo (not added to any
  // mailing list — just kept as a record in your CRM).
  const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({ email, updateEnabled: true }),
  })

  if (!contactRes.ok && contactRes.status !== 204) {
    const errorBody = await contactRes.json().catch(() => null)
    console.error("Brevo contact save error:", errorBody)
    // Don't block sending the notification email just because saving the
    // lead failed — the message itself is the important part.
  }

  // 2. Email the notification to the band.
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br>")

  const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers,
    body: JSON.stringify({
      sender: { email: SENDER_EMAIL, name: SENDER_NAME },
      to: NOTIFICATION_RECIPIENTS.map((address) => ({ email: address })),
      replyTo: { email, name },
      subject: subject ? `[Contact] ${subject}` : `[Contact] Nouveau message de ${name}`,
      htmlContent: `
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        ${subject ? `<p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>` : ""}
        <p><strong>Message :</strong></p>
        <p>${escapedMessage}</p>
      `,
    }),
  })

  if (!emailRes.ok) {
    const errorBody = await emailRes.json().catch(() => null)
    console.error("Brevo notification email error:", errorBody)
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
