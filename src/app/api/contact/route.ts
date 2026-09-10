import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message || !String(body.email).includes("@")) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (process.env.RESEND_API_KEY) {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? "VivaFoot <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? "esraaelmorshedy2@gmail.com"],
        reply_to: body.email,
        subject: `VivaFoot inquiry from ${body.name}`,
        text: `${body.message}\n\nOrganization: ${body.organization ?? "Not provided"}\nInquiry type: ${body.type ?? "General"}`,
      }),
    });
    if (!delivery.ok) return NextResponse.json({ error: "Unable to deliver inquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, message: "Inquiry accepted for handling." });
}
