import React, { useEffect, useState } from 'react';
import { ChevronDown, Mail, MapPin, Menu, Phone, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';

export default function Home() {
  type FormErrors = {
    name?: string;
    email?: string;
    phone?: string;
    services?: string;
    message?: string;
  };

  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', services: [] as string[] });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const companyEmail = import.meta.env.VITE_COMPANY_EMAIL || 'contact@zidextrans.com';
  const companyPhone = import.meta.env.VITE_COMPANY_PHONE || '+212612345678';
  const companyWhatsapp = (import.meta.env.VITE_WHATSAPP_PHONE || companyPhone).replace(/\D/g, '');
  const companyLocation = import.meta.env.VITE_COMPANY_LOCATION || 'Casablanca, Maroc';
  const mapsEmbedUrl =
    import.meta.env.VITE_MAPS_EMBED_URL ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5551999999998!2d-6.8498!3d33.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sZIDEX%20Trans!5e0!3m2!1sfr!2sma!4v1234567890';

  const { submitForm, loading, success, error } = useFormSubmit();
  const servicesRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  const galleryRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();
  const faqRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const translations = {
    fr: {
      nav: {
        home: 'Accueil',
        services: 'Services',
        about: 'À Propos',
        gallery: 'Galerie',
        faq: 'FAQ',
        contact: 'Contact',
      },
      hero: {
        title: 'Transport & Déménagement de Confiance',
        subtitle: 'Votre partenaire fiable partout au Maroc, avec un prix imbattable et un service professionnel rapide.',
        cta: 'Demander un devis',
        call: 'Appeler maintenant',
      },
      services: {
        title: 'Nos Services',
        transport: {
          name: 'Transport partout au Maroc',
          desc: 'Transport sécurisé dans toutes les villes du Maroc, à un prix imbattable.',
        },
        packaging: {
          name: 'Emballage',
          desc: 'Emballage professionnel et rapide pour protéger vos meubles et objets fragiles.',
        },
        handling: {
          name: 'Manutention (déménagement)',
          desc: 'Manutention rapide et soignée par une équipe pro, du chargement à l’installation.',
        },
        parcel: {
          name: 'Colis et messagerie',
          desc: 'Envoi et livraison rapides de colis et documents avec suivi fiable.',
        },
      },
      about: {
        title: 'Qui Sommes-Nous ?',
        description:
          'ZIDEX Trans accompagne particuliers et entreprises avec un service sérieux, ponctuel et transparent pour tous les déménagements.',
        highlights: {
          experienceTitle: "15+ ans d'expérience",
          experienceDesc: 'Des centaines de déménagements réussis.',
          teamTitle: 'Équipe spécialisée',
          teamDesc: 'Interventions rapides et organisées.',
          coverageTitle: 'Couverture nationale',
          coverageDesc: 'Service disponible partout au Maroc.',
        },
      },
      testimonials: {
        title: 'Avis Clients',
        reviews: [
          { name: 'Ahmed M.', text: 'Service excellent et équipe très professionnelle !', rating: 5 },
          { name: 'Fatima B.', text: 'Déménagement sans stress, tout s\'est bien passé.', rating: 5 },
          { name: 'Hassan K.', text: 'Ponctuels, organisés et très efficaces.', rating: 5 },
        ],
      },
      faq: {
        title: 'Questions Fréquentes',
        items: [
          { q: 'Intervenez-vous partout au Maroc ?', a: 'Oui, nous assurons le transport et le déménagement dans toutes les régions du Maroc.' },
          { q: 'Faites-vous l\'emballage ?', a: 'Oui, nous proposons un service complet d\'emballage et de protection des biens.' },
          { q: 'Comment demander un devis ?', a: 'Vous pouvez remplir le formulaire de contact ou nous appeler directement.' },
        ],
      },
      contact: {
        title: 'Contactez-Nous',
        form: {
          name: 'Nom',
          email: 'Email',
          phone: 'Téléphone',
          services: 'Services souhaités',
          servicesHelp: 'Vous pouvez sélectionner plusieurs services',
          message: 'Message',
          submit: 'Envoyer',
        },
      },
      footer: {
        developed: 'Développé par Youness Kabbadj',
      },
      common: {
        galleryTitle: 'Galerie Photos',
        phone: 'Téléphone',
        email: 'Email',
        address: 'Adresse',
      },
    },
    ar: {
      nav: {
        home: 'الرئيسية',
        services: 'الخدمات',
        about: 'من نحن',
        gallery: 'المعرض',
        faq: 'الأسئلة الشائعة',
        contact: 'اتصل بنا',
      },
      hero: {
        title: 'النقل وخدمات الانتقال بثقة',
        subtitle: 'شريككم الموثوق في جميع مدن المغرب، بسعر لا يقبل المنافسة وخدمة احترافية سريعة.',
        cta: 'اطلب عرض سعر',
        call: 'اتصل الآن',
      },
      services: {
        title: 'خدماتنا',
        transport: {
          name: 'النقل في جميع أنحاء المغرب',
          desc: 'نقل آمن إلى جميع مدن المغرب بسعر لا يقبل المنافسة.',
        },
        packaging: {
          name: 'التغليف',
          desc: 'تغليف احترافي وسريع لحماية الأثاث والأغراض الحساسة.',
        },
        handling: {
          name: 'المناولة (الانتقال)',
          desc: 'مناولة سريعة ودقيقة بواسطة فريق محترف من التحميل إلى التركيب.',
        },
        parcel: {
          name: 'الطرود والمراسلات',
          desc: 'إرسال وتسليم سريع للطرود والوثائق مع تتبع موثوق.',
        },
      },
      about: {
        title: 'من نحن؟',
        description:
          'شركة ZIDEX Trans متخصصة في النقل والانتقال داخل جميع مدن المغرب، ونوفر خدمة احترافية سريعة بأسعار مناسبة وجودة عالية مع احترام المواعيد.',
        highlights: {
          experienceTitle: 'أكثر من 15 سنة من الخبرة',
          experienceDesc: 'مئات عمليات الانتقال الناجحة.',
          teamTitle: 'فريق متخصص',
          teamDesc: 'تدخلات سريعة ومنظمة.',
          coverageTitle: 'تغطية وطنية',
          coverageDesc: 'الخدمة متوفرة في جميع أنحاء المغرب.',
        },
      },
      testimonials: {
        title: 'آراء العملاء',
        reviews: [
          { name: 'أحمد م.', text: 'خدمة ممتازة وفريق محترف جداً!', rating: 5 },
          { name: 'فاطمة ب.', text: 'انتقال بدون توتر وكل شيء كان منظماً.', rating: 5 },
          { name: 'حسن ك.', text: 'الالتزام بالمواعيد والعمل باحترافية.', rating: 5 },
        ],
      },
      faq: {
        title: 'الأسئلة الشائعة',
        items: [
          { q: 'هل تعملون في جميع أنحاء المغرب؟', a: 'نعم، نقدم خدمات النقل والانتقال في جميع مناطق المغرب.' },
          { q: 'هل تقدمون خدمة التغليف؟', a: 'نعم، نقدم خدمة تغليف كاملة مع حماية الأغراض.' },
          { q: 'كيف أطلب عرض سعر؟', a: 'يمكنك ملء استمارة التواصل أو الاتصال بنا مباشرة.' },
        ],
      },
      contact: {
        title: 'تواصل معنا',
        form: {
          name: 'الاسم',
          email: 'البريد الإلكتروني',
          phone: 'الهاتف',
          services: 'الخدمات المطلوبة',
          servicesHelp: 'يمكنك اختيار أكثر من خدمة',
          message: 'الرسالة',
          submit: 'إرسال',
        },
      },
      footer: {
        developed: 'تم التطوير بواسطة Youness Kabbadj',
      },
      common: {
        galleryTitle: 'معرض الصور',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        address: 'العنوان',
      },
    },
  };

  const t = translations[language];

  const trackMeta = (event: string, params?: Record<string, unknown>) => {
    const fbq = (window as any).fbq;
    if (typeof fbq === 'function') {
      if (params) fbq('track', event, params);
      else fbq('track', event);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    trackMeta('InitiateCheckout', { source: 'hero_cta' });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+\d][\d\s()-]{7,}$/;
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = language === 'fr' ? 'Le nom est obligatoire.' : 'الاسم مطلوب.';
    }
    if (!formData.email.trim()) {
      errors.email = language === 'fr' ? "L'email est obligatoire." : 'البريد الإلكتروني مطلوب.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = language === 'fr' ? "Format d'email invalide." : 'صيغة البريد الإلكتروني غير صحيحة.';
    }
    if (!formData.phone.trim()) {
      errors.phone = language === 'fr' ? 'Le téléphone est obligatoire.' : 'رقم الهاتف مطلوب.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      errors.phone = language === 'fr' ? 'Numéro de téléphone invalide.' : 'رقم الهاتف غير صحيح.';
    }
    if (formData.services.length === 0) {
      errors.services = language === 'fr' ? 'Sélectionnez au moins un service.' : 'اختر خدمة واحدة على الأقل.';
    }
    if (!formData.message.trim()) {
      errors.message = language === 'fr' ? 'Le message est obligatoire.' : 'الرسالة مطلوبة.';
    } else if (formData.message.trim().length < 10) {
      errors.message = language === 'fr' ? 'Le message doit contenir au moins 10 caractères.' : 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل.';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error(language === 'fr' ? 'Merci de corriger les erreurs du formulaire.' : 'يرجى تصحيح أخطاء النموذج.');
      return;
    }

    const ok = await submitForm(formData);
    if (ok) {
      trackMeta('Lead', {
        source: 'contact_form',
        language,
        services_count: formData.services.length,
        service_selected: formData.services.join(', '),
      });
      toast.success(language === 'fr' ? 'Message envoyé avec succès !' : 'تم إرسال الرسالة بنجاح!');
      setFormData({ name: '', email: '', phone: '', message: '', services: [] });
      setFormErrors({});
    }
  };

  const galleryImages = ['/1.jpeg', '/3.jpeg', '/4.jpeg', '/5.jpeg', '/6.jpeg', '/7.jpeg'];

  const services = [
    { icon: '🚚', ...t.services.transport },
    { icon: '📦', ...t.services.packaging },
    { icon: '🏗️', ...t.services.handling },
    { icon: '✉️', ...t.services.parcel },
  ];

  return (
    <div className={language === 'ar' ? 'rtl' : 'ltr'} style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/favicon.ico" alt="ZIDEX Trans Logo" className="h-12 w-auto" />
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            {Object.entries(t.nav).map(([key, label]) => (
              <a key={key} href={`#${key}`} className="text-gray-700 hover:text-yellow-500 transition">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-3 py-2 rounded-lg border transition text-sm font-semibold flex items-center gap-2 ${
                language === 'fr' ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
              }`}
              aria-label="Français"
            >
              <img src="https://flagcdn.com/w40/fr.png" alt="Drapeau France" className="w-5 h-4 object-cover rounded-sm" />
              FR
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-3 py-2 rounded-lg border transition text-sm font-semibold flex items-center gap-2 ${
                language === 'ar' ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
              }`}
              aria-label="العربية"
            >
              <img src="https://flagcdn.com/w40/ma.png" alt="Drapeau Maroc" className="w-5 h-4 object-cover rounded-sm" />
              AR
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col gap-4 p-4">
              {Object.entries(t.nav).map(([key, label]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-gray-700 hover:text-yellow-500 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 scroll-reveal is-visible">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">{t.hero.title}</h1>
            <p className="text-xl text-gray-600">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={scrollToContact} className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 px-8 py-6 text-lg">
                {t.hero.cta}
              </Button>
              <Button asChild variant="outline" className="px-8 py-6 text-lg">
                <a
                  href={`tel:${companyPhone.replace(/\s+/g, '')}`}
                  onClick={() => trackMeta('Contact', { contact_method: 'phone', source: 'hero_call' })}
                >
                  {t.hero.call}
                </a>
              </Button>
            </div>
          </div>
          <div className="relative scroll-reveal is-visible scroll-reveal-delay-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030934861/d8hvAJPXkftamGXtSj5vSg/hero-transport-9VUFDoxqicLwfksDio2mBs.webp"
              alt="Transport"
              className="w-full h-auto rounded-lg shadow-lg"
              style={{ transform: `translateY(${scrollPosition * 0.08}px)` }}
            />
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <a
            href={`https://wa.me/${companyWhatsapp}?text=Bonjour%20ZIDEX%20Trans`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMeta('Contact', { contact_method: 'whatsapp', source: 'pre_services_cta' })}
            className="w-full max-w-[700px] mx-auto flex items-center justify-center gap-2 md:gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-base sm:text-lg md:text-2xl font-bold rounded-xl md:rounded-2xl py-4 sm:py-5 md:py-6 px-4 sm:px-6 shadow-lg transition"
          >
            <img src="/whatsapp.svg" alt="WhatsApp" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            {language === 'fr' ? 'Contactez-nous sur WhatsApp' : 'تواصل معنا عبر واتساب'}
          </a>
        </div>
      </section>

      <section id="services" ref={servicesRef as React.RefObject<HTMLElement>} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">{t.services.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className={`w-full h-full p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-all hover:bg-yellow-50 group scroll-reveal-delay-${Math.min(idx + 1, 3)}`}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef as React.RefObject<HTMLElement>} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030934861/d8hvAJPXkftamGXtSj5vSg/about-warehouse-5oa89FzqQimhD4auwAFsgi.webp"
            alt="À Propos"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">{t.about.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t.about.description}</p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center text-xl">✓</div>
                <div>
                  <h3 className="font-bold text-gray-900">{t.about.highlights.experienceTitle}</h3>
                  <p className="text-gray-600">{t.about.highlights.experienceDesc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center text-xl">✓</div>
                <div>
                  <h3 className="font-bold text-gray-900">{t.about.highlights.teamTitle}</h3>
                  <p className="text-gray-600">{t.about.highlights.teamDesc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center text-xl">✓</div>
                <div>
                  <h3 className="font-bold text-gray-900">{t.about.highlights.coverageTitle}</h3>
                  <p className="text-gray-600">{t.about.highlights.coverageDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={testimonialsRef as React.RefObject<HTMLElement>} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">{t.testimonials.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.reviews.map((review, idx) => (
              <div key={idx} className="p-8 bg-gray-50 rounded-lg hover:shadow-md transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-gray-900">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" ref={galleryRef as React.RefObject<HTMLElement>} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">{t.common.galleryTitle}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} onClick={() => setSelectedImage(img)} className="relative overflow-hidden rounded-lg cursor-pointer group h-64">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition">🔍</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" ref={faqRef as React.RefObject<HTMLElement>} className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">{t.faq.title}</h2>
          <div className="space-y-4">
            {t.faq.items.map((item, idx) => (
              <details key={idx} className="p-6 bg-gray-50 rounded-lg cursor-pointer hover:bg-yellow-50 transition group">
                <summary className="font-bold text-gray-900 flex justify-between items-center">
                  {item.q}
                  <ChevronDown size={20} className="group-open:rotate-180 transition" />
                </summary>
                <p className="text-gray-600 mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" ref={contactRef as React.RefObject<HTMLElement>} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">{t.contact.title}</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <form onSubmit={handleFormSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder={t.contact.form.name}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yellow-400 ${
                    formErrors.name ? 'border-red-400 bg-red-50/40' : 'border-gray-300'
                  }`}
                />
                <input
                  type="email"
                  placeholder={t.contact.form.email}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yellow-400 ${
                    formErrors.email ? 'border-red-400 bg-red-50/40' : 'border-gray-300'
                  }`}
                />
              </div>
              {(formErrors.name || formErrors.email) && (
                <div className="grid md:grid-cols-2 gap-6 -mt-2">
                  <div className="text-sm text-red-600 min-h-5">{formErrors.name || ''}</div>
                  <div className="text-sm text-red-600 min-h-5">{formErrors.email || ''}</div>
                </div>
              )}
              <input
                type="tel"
                placeholder={t.contact.form.phone}
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yellow-400 ${
                  formErrors.phone ? 'border-red-400 bg-red-50/40' : 'border-gray-300'
                } ${language === 'ar' ? 'text-right' : 'text-left'
                }`}
              />
              {formErrors.phone && <p className="text-sm text-red-600 -mt-2">{formErrors.phone}</p>}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900">{t.contact.form.services}</p>
                <p className="text-xs text-gray-500">{t.contact.form.servicesHelp}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((service) => {
                    const checked = formData.services.includes(service.name);
                    return (
                      <label
                        key={service.name}
                        className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:border-yellow-400 transition"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, services: [...formData.services, service.name] });
                            } else {
                              setFormData({
                                ...formData,
                                services: formData.services.filter((item) => item !== service.name),
                              });
                            }
                            if (formErrors.services) setFormErrors({ ...formErrors, services: undefined });
                          }}
                          className="accent-yellow-500"
                        />
                        <span className="text-sm text-gray-700">{service.name}</span>
                      </label>
                    );
                  })}
                </div>
                {formErrors.services && <p className="text-sm text-red-600">{formErrors.services}</p>}
              </div>
              <textarea
                placeholder={t.contact.form.message}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (formErrors.message) setFormErrors({ ...formErrors, message: undefined });
                }}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yellow-400 ${
                  formErrors.message ? 'border-red-400 bg-red-50/40' : 'border-gray-300'
                }`}
              />
              {formErrors.message && <p className="text-sm text-red-600 -mt-2">{formErrors.message}</p>}
              {success && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                  {language === 'fr'
                    ? 'Message envoyé avec succès! Nous vous contacterons bientôt.'
                    : 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.'}
                </div>
              )}
              {error && <div className="p-4 bg-red-100 text-red-800 rounded-lg">Erreur: {error}</div>}
              <Button type="submit" disabled={loading} className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 py-6 text-lg disabled:opacity-50">
                {loading ? 'Envoi...' : t.contact.form.submit}
              </Button>
            </form>

            <div className="space-y-6">
              <iframe
                width="100%"
                height="400"
                src={mapsEmbedUrl}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="ZIDEX Trans Map"
              />

              <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                <div className="flex gap-4">
                  <Phone className="text-yellow-500 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900">{t.common.phone}</h3>
                    <p className="text-gray-600">{companyPhone}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-yellow-500 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900">{t.common.email}</h3>
                    <p className="text-gray-600">{companyEmail}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="text-yellow-500 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900">{t.common.address}</h3>
                    <p className="text-gray-600">{companyLocation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Gallery" className="w-full h-auto rounded-lg" />
            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100">
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        <a
          href={`tel:${companyPhone.replace(/\s+/g, '')}`}
          onClick={() => trackMeta('Contact', { contact_method: 'phone', source: 'floating_button' })}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 hover:scale-110 transition shadow-lg hover-lift"
          title="Appel Direct"
        >
          <Phone size={24} />
        </a>
        <a
          href={`https://wa.me/${companyWhatsapp}?text=Bonjour%20ZIDEX%20Trans`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMeta('Contact', { contact_method: 'whatsapp', source: 'floating_button' })}
          className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 hover:scale-110 transition shadow-lg hover-lift"
          title="WhatsApp"
        >
          <img src="/whatsapp.svg" alt="WhatsApp" className="w-7 h-7" />
        </a>
        <a
          href={`mailto:${companyEmail}`}
          onClick={() => trackMeta('Contact', { contact_method: 'email', source: 'floating_button' })}
          className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition shadow-lg hover-lift"
          title="Email"
        >
          <Mail size={24} />
        </a>
      </div>

      <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white pt-12 pb-8 mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-b border-white/10">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 mb-4">
                <img src="/favicon.ico" alt="ZIDEX Trans Logo" className="h-10 w-10 rounded-md bg-white p-1" />
                <div>
                  <p className="font-bold text-lg">ZIDEX Trans</p>
                  <p className="text-xs text-gray-300">Transport & Déménagement</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 max-w-xs mx-auto md:mx-0">
                Service professionnel, rapide et au meilleur prix partout au Maroc.
              </p>
            </div>

            <div className="text-center">
              <p className="font-semibold text-yellow-400 mb-4">Menu</p>
              <nav className="flex flex-col gap-2">
                {(['home', 'services', 'about', 'gallery', 'faq', 'contact'] as const).map((key) => (
                  <a key={key} href={`#${key}`} className="text-gray-300 hover:text-white transition">
                    {t.nav[key]}
                  </a>
                ))}
              </nav>
            </div>

            <div className="text-center md:text-right">
              <p className="font-semibold text-yellow-400 mb-4">{t.contact.title}</p>
              <div className="space-y-2 text-sm text-gray-300">
                <p>{companyPhone}</p>
                <p>{companyEmail}</p>
                <p>{companyLocation}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 text-center">
            <p className="mb-2">© 2026 ZIDEX Trans. Tous droits réservés.</p>
            <p className="text-gray-400">{t.footer.developed}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
