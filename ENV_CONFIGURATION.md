# Configuration Environnement - ZIDEX Trans

Ce fichier explique comment configurer les variables d'environnement pour que l'application fonctionne correctement.

## 📋 Variables d'Environnement Requises

### 1. Configuration Email (FormSubmit.co)

**Service:** https://formsubmit.co (gratuit et sans configuration backend)

```
VITE_EMAIL_SERVICE=formsubmit
VITE_EMAIL_RECIPIENT=contact@zidextrans.com
```

**Instructions:**
1. Accédez à https://formsubmit.co
2. Remplacez `contact@zidextrans.com` par votre adresse email réelle
3. Lors du premier envoi, vous recevrez un email de confirmation
4. Confirmez l'adresse et les formulaires fonctionneront

**Alternative:** Vous pouvez aussi utiliser:
- **Formspree** (https://formspree.io) - Plus de fonctionnalités
- **EmailJS** (https://www.emailjs.com) - Directement depuis le navigateur
- **Votre propre backend** - Pour plus de contrôle

---

### 2. Configuration WhatsApp

```
VITE_WHATSAPP_NUMBER=212612345678
VITE_WHATSAPP_MESSAGE_TEMPLATE=Bonjour ZIDEX Trans, j'aimerais obtenir un devis pour mon déménagement.
```

**Instructions:**
1. Remplacez `212612345678` par votre numéro WhatsApp (sans le +)
2. Format: Code pays (212 pour Maroc) + numéro sans le 0
3. Exemple: +212 6 12 34 56 78 → 212612345678

---

### 3. Configuration Téléphone Direct

```
VITE_PHONE_NUMBER=+212612345678
```

**Instructions:**
1. Remplacez par votre numéro de téléphone réel
2. Format international avec le +

---

### 4. Configuration reCAPTCHA v3 (Optionnel)

```
VITE_RECAPTCHA_SITE_KEY=YOUR_RECAPTCHA_SITE_KEY_HERE
RECAPTCHA_SECRET_KEY=YOUR_RECAPTCHA_SECRET_KEY_HERE
```

**Instructions:**
1. Accédez à https://www.google.com/recaptcha/admin
2. Créez un nouveau site avec reCAPTCHA v3
3. Copiez la "Site Key" et la "Secret Key"
4. Remplacez les valeurs ci-dessus

**Note:** reCAPTCHA est optionnel. Le formulaire fonctionne sans.

---

### 5. Configuration Google Maps (Optionnel)

```
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```

**Instructions:**
1. Accédez à https://console.cloud.google.com/
2. Créez un nouveau projet
3. Activez l'API Google Maps JavaScript
4. Créez une clé API
5. Remplacez la valeur ci-dessus

**Note:** Google Maps est déjà intégré via iframe. Cette clé est pour les fonctionnalités avancées.

---

### 6. Configuration Entreprise

```
VITE_COMPANY_NAME=ZIDEX Trans
VITE_COMPANY_ADDRESS=Casablanca, Maroc
VITE_COMPANY_LAT=33.9716
VITE_COMPANY_LNG=-6.8498
VITE_COMPANY_YEAR=2010
```

**Instructions:**
1. Remplacez avec les informations réelles de votre entreprise
2. Les coordonnées GPS sont utilisées pour Google Maps
3. L'année est affichée dans le footer

---

### 7. Configuration Analytique (Umami)

```
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

**Instructions:**
1. Optionnel - Pour suivre les visites du site
2. Inscrivez-vous sur https://umami.is
3. Remplacez avec vos identifiants

---

### 8. Configuration Développeur

```
VITE_DEVELOPER_NAME=Youness Kabbadj
```

**Instructions:**
1. Ce nom s'affiche en footer du site
2. Remplacez avec le nom du développeur

---

## 🚀 Comment Configurer

### Méthode 1: Fichier .env Local (Développement)

1. À la racine du projet, créez un fichier `.env`
2. Copiez les variables ci-dessus
3. Remplissez vos valeurs réelles
4. Redémarrez le serveur de développement

```bash
# Exemple de fichier .env
VITE_EMAIL_RECIPIENT=mon-email@example.com
VITE_WHATSAPP_NUMBER=212612345678
VITE_PHONE_NUMBER=+212612345678
```

### Méthode 2: Variables d'Environnement du Système (Production)

Sur votre serveur de production (Vercel, Netlify, etc.):

1. Allez dans les paramètres d'environnement
2. Ajoutez chaque variable
3. Déployez le site

---

## 🔒 Sécurité

**⚠️ IMPORTANT:**
- Ne commitez JAMAIS le fichier `.env` sur Git
- Gardez les clés secrètes (reCAPTCHA Secret, etc.) confidentielles
- Utilisez `.env.local` pour le développement local
- Utilisez les variables d'environnement du serveur pour la production

---

## ✅ Vérification

Après configuration, testez:

1. **Email:** Remplissez le formulaire et vérifiez que vous recevez l'email
2. **WhatsApp:** Cliquez sur le bouton WhatsApp flottant
3. **Téléphone:** Cliquez sur le bouton d'appel
4. **Maps:** Vérifiez que la carte s'affiche correctement

---

## 📞 Support

Pour plus d'aide:
- FormSubmit: https://formsubmit.co/docs
- Google Maps: https://developers.google.com/maps/documentation
- reCAPTCHA: https://developers.google.com/recaptcha/docs/v3
- Umami: https://umami.is/docs

---

## 📝 Template Complet

Voici un template complet à copier:

```
# Configuration Email
VITE_EMAIL_SERVICE=formsubmit
VITE_EMAIL_RECIPIENT=votre-email@example.com

# Configuration WhatsApp
VITE_WHATSAPP_NUMBER=212612345678
VITE_WHATSAPP_MESSAGE_TEMPLATE=Bonjour ZIDEX Trans, j'aimerais obtenir un devis pour mon déménagement.

# Configuration Téléphone
VITE_PHONE_NUMBER=+212612345678

# Configuration reCAPTCHA (optionnel)
VITE_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Configuration Google Maps (optionnel)
VITE_GOOGLE_MAPS_API_KEY=

# Configuration Entreprise
VITE_COMPANY_NAME=ZIDEX Trans
VITE_COMPANY_ADDRESS=Casablanca, Maroc
VITE_COMPANY_LAT=33.9716
VITE_COMPANY_LNG=-6.8498
VITE_COMPANY_YEAR=2010

# Configuration Analytique (optionnel)
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=

# Configuration Développeur
VITE_DEVELOPER_NAME=Youness Kabbadj

# Mode
NODE_ENV=production
VITE_ENV=production
```

Remplissez les valeurs vides et vous êtes prêt! 🎉
