import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
}

export function useFormSubmit() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const submitForm = async (data: FormData) => {
    const whatsappNumber = (
      import.meta.env.VITE_WHATSAPP_PHONE ||
      import.meta.env.VITE_COMPANY_PHONE ||
      '212612345678'
    ).replace(/\D/g, '');

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const whatsappMessage = encodeURIComponent(
        `Bonjour,\n\nNom: ${data.name}\nEmail: ${data.email}\nTéléphone: ${data.phone}\nServices: ${data.services.join(', ')}\n\nMessage:\n${data.message}`
      );
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      const emailResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!emailResponse.ok) {
        throw new Error('Email submission failed');
      }

      setSuccess(true);
      window.open(whatsappUrl, '_blank');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitForm, loading, success, error };
}
