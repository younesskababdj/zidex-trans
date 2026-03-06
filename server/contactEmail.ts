import nodemailer from "nodemailer";
import fs from "node:fs";
import path from "node:path";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getMailerConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP configuration is missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.");
  }

  return { host, port, user, pass };
}

function createEmailHtml(payload: ContactPayload) {
  const companyName = process.env.COMPANY_NAME || "ZIDEX Trans";
  const logoUrl = process.env.COMPANY_LOGO_URL || "";
  const phone = process.env.VITE_COMPANY_PHONE || "";
  const location = process.env.VITE_COMPANY_LOCATION || "";
  const services = payload.services.map((service) => `<li>${escapeHtml(service)}</li>`).join("");

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nouveau devis - ${escapeHtml(companyName)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:#111827;padding:20px 24px;color:#ffffff;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="vertical-align:middle;">
                      ${
                        logoUrl
                          ? `<img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(companyName)}" style="height:44px;width:auto;display:block;margin-bottom:10px;" />`
                          : `<img src="cid:company-logo" alt="${escapeHtml(companyName)}" style="height:44px;width:auto;display:block;margin-bottom:10px;" />`
                      }
                      <div style="font-size:20px;font-weight:700;line-height:1.2;">${escapeHtml(companyName)}</div>
                      <div style="font-size:13px;opacity:0.85;">Nouvelle demande de devis</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px;">
                <h2 style="margin:0 0 14px 0;font-size:18px;color:#111827;">Informations du client</h2>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px;border:1px solid #e5e7eb;background:#f9fafb;width:180px;font-weight:700;">Nom</td>
                    <td style="padding:10px;border:1px solid #e5e7eb;">${escapeHtml(payload.name)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:700;">Email</td>
                    <td style="padding:10px;border:1px solid #e5e7eb;">${escapeHtml(payload.email)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:700;">Téléphone</td>
                    <td style="padding:10px;border:1px solid #e5e7eb;">${escapeHtml(payload.phone)}</td>
                  </tr>
                </table>

                <h3 style="margin:20px 0 10px 0;font-size:16px;color:#111827;">Services demandés</h3>
                <ul style="margin:0 0 18px 18px;padding:0;color:#1f2937;">
                  ${services || "<li>Aucun service sélectionné</li>"}
                </ul>

                <h3 style="margin:0 0 10px 0;font-size:16px;color:#111827;">Message</h3>
                <div style="padding:14px;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb;white-space:pre-wrap;line-height:1.6;">
                  ${escapeHtml(payload.message)}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#4b5563;font-size:12px;">
                ${escapeHtml(companyName)} ${phone ? ` | Tél: ${escapeHtml(phone)}` : ""}${location ? ` | ${escapeHtml(location)}` : ""}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendContactEmail(payload: ContactPayload) {
  const { host, port, user, pass } = getMailerConfig();
  const to = process.env.CONTACT_RECEIVER_EMAIL || process.env.VITE_FORM_RECIPIENT_EMAIL || process.env.VITE_COMPANY_EMAIL || user;
  const companyName = process.env.COMPANY_NAME || "ZIDEX Trans";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const html = createEmailHtml(payload);
  const logoPath = process.env.COMPANY_LOGO_PATH;
  const resolvedLogoPath = logoPath ? path.resolve(process.cwd(), logoPath) : "";
  const hasLocalLogo = resolvedLogoPath ? fs.existsSync(resolvedLogoPath) : false;
  const text = [
    `Nouveau devis - ${companyName}`,
    `Nom: ${payload.name}`,
    `Email: ${payload.email}`,
    `Téléphone: ${payload.phone}`,
    `Services: ${payload.services.join(", ")}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  await transporter.sendMail({
    from: process.env.MAIL_FROM || `${companyName} <${user}>`,
    to,
    replyTo: payload.email,
    subject: `Nouveau devis - ${payload.name}`,
    text,
    html,
    attachments:
      hasLocalLogo && !process.env.COMPANY_LOGO_URL
        ? [
            {
              filename: path.basename(resolvedLogoPath),
              path: resolvedLogoPath,
              cid: "company-logo",
            },
          ]
        : undefined,
  });
}
