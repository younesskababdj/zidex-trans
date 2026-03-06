import { useEffect } from 'react';

export function useRecaptcha() {
  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const executeRecaptcha = async (action: string = 'submit'): Promise<string> => {
    if (typeof window === 'undefined' || !window.grecaptcha) {
      console.error('reCAPTCHA not loaded');
      return '';
    }

    try {
      const token = await window.grecaptcha.execute('YOUR_RECAPTCHA_V3_SITE_KEY', {
        action: action,
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
    grecaptcha: any;
  }
}
