import { NextResponse } from "next/server"

// The Brevo list ID for "Newsletter" (Contacts → Lists in Brevo).
const BREVO_LIST_ID = 3

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set")
    return NextResponse.json({ error: "Configuration serveur manquante." }, { status: 500 })
  }

  let email = ""
  try {
    const body = await request.json()
    email = typeof body.email === "string" ? body.email.trim() : ""
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 })
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      listIds: [BREVO_LIST_ID],
      // Updates the contact (and re-adds them to the list) instead of
      // erroring out if they're already subscribed.
      updateEnabled: true,
    }),
  })

  if (res.ok || res.status === 204) {
    return NextResponse.json({ success: true })
  }

  const errorBody = await res.json().catch(() => null)
  console.error("Brevo newsletter signup error:", errorBody)
  return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 502 })
}
