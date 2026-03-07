import { useEffect } from 'react';

export function useRecaptcha() {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

  useEffect(() => {
    if (!siteKey) return;
    if (document.querySelector('script[data-recaptcha="true"]')) return;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-recaptcha', 'true');
    document.head.appendChild(script);
  }, []);

  const executeRecaptcha = async (action: string = 'submit'): Promise<string> => {
    if (!siteKey || typeof window === 'undefined') {
      return '';
    }

    if (!window.grecaptcha) {
      console.error('reCAPTCHA not loaded');
      return '';
    }

    try {
      await window.grecaptcha.ready(() => undefined);
      const token = await window.grecaptcha.execute(siteKey, {
        action,
      });
      return token;
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      return '';
    }
  };

  return { executeRecaptcha };
}

// Extend Window interface
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}
