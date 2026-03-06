# Deploy On Vercel

## 1) Push project to GitHub
- Create a GitHub repo
- Push this project

## 2) Import into Vercel
- Go to Vercel dashboard
- `Add New` -> `Project`
- Select your GitHub repository

Vercel will use:
- Build command: `npm run build`
- Output directory: `dist/public`

`vercel.json` is already included for SPA routing and API.

## 3) Add environment variables in Vercel
In `Project Settings` -> `Environment Variables`, add:

- `VITE_COMPANY_EMAIL`
- `VITE_FORM_RECIPIENT_EMAIL`
- `VITE_COMPANY_PHONE`
- `VITE_WHATSAPP_PHONE`
- `VITE_COMPANY_LOCATION`
- `VITE_MAPS_EMBED_URL`

- `COMPANY_NAME`
- `COMPANY_LOGO_URL`
- `COMPANY_LOGO_PATH` (optional on Vercel, prefer `COMPANY_LOGO_URL`)

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `CONTACT_RECEIVER_EMAIL`

For Gmail:
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USER=<your-gmail>`
- `SMTP_PASS=<gmail app password>`

## 4) Redeploy
- After adding env vars, trigger `Redeploy`

## 5) Test
- Open your site
- Send test form from Contact section
- Check mailbox `CONTACT_RECEIVER_EMAIL`
