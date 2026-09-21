import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Ad, e-posta ve mesaj alanları zorunludur." },
        { status: 400 },
      );
    }

    const c = getContent();
    const ownerEmail = c.site.email;

    if (!ownerEmail) {
      return NextResponse.json(
        { error: "İletişim e-postası yapılandırılmamış." },
        { status: 500 },
      );
    }

    // Use Resend if API key is available, otherwise log
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Site İletişim Formu <onboarding@resend.dev>",
          to: ownerEmail,
          reply_to: email,
          subject: subject
            ? `İletişim Formu: ${subject}`
            : `İletişim Formu: ${name} tarafından`,
          html: `
            <h2>Yeni İletişim Formu Mesajı</h2>
            <p><strong>Ad Soyad:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            ${subject ? `<p><strong>Konu:</strong> ${subject}</p>` : ""}
            <hr />
            <p>${message.replace(/\n/g, "<br />")}</p>
          `,
        }),
      });

      if (!res.ok) {
        console.error("Resend API error:", await res.text());
        return NextResponse.json(
          { error: "E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin." },
          { status: 500 },
        );
      }
    } else {
      // Fallback: log to console when no email service is configured
      console.log("=== İLETİŞİM FORMU ===");
      console.log(`Hedef: ${ownerEmail}`);
      console.log(`Ad: ${name}`);
      console.log(`E-posta: ${email}`);
      console.log(`Konu: ${subject || "-"}`);
      console.log(`Mesaj: ${message}`);
      console.log("======================");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Beklenmeyen bir hata oluştu." },
      { status: 500 },
    );
  }
}
