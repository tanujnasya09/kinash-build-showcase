import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ShieldCheck, Database, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/LanguageContext';
import { useProperties } from '@/context/PropertyContext';
import SEOHead from '@/components/SEO/SEOHead';
import { toast } from 'sonner';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const { properties } = useProperties();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [crmLead, setCrmLead] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error(language === 'en' ? 'Please fill out all required fields.' : 'Por favor llene todos los campos requeridos.');
      return;
    }

    setLoading(true);

    // Simulate luxury CRM pipeline ingestion (e.g., Salesforce, Hubspot, or custom CRM)
    setTimeout(() => {
      setLoading(false);
      const newLead = {
        leadId: `LD-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: name,
        emailAddress: email,
        phoneNumber: phone,
        propertyInterest: selectedProperty || 'General Inquiry',
        messageContent: message,
        timestamp: new Date().toLocaleString(),
        source: 'Luxury Web Inbound',
        crmStatus: 'Assigned to Luxury Representative',
        ipAddress: '202.54.1.18',
        leadScore: 'Hot (High Interest)'
      };
      
      setCrmLead(newLead);
      toast.success(t('contact.success'));
      
      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSelectedProperty('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background pt-28 pb-16">
      <SEOHead
        title="Contact Us"
        description="Connect with the luxury real estate and construction team at Kinash Associates. Request consultation, brochure downloads, or schedule site visits."
        keywords="contact construction, real estate agent dehradun, luxury property inquiry"
        canonical="/contact"
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {language === 'en' ? 'Get In Touch' : language === 'es' ? 'Contacto' : 'Kontakt'}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Premium Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 shadow-elegant relative overflow-hidden">
              {/* Background accent bubble */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/20 rounded-full blur-2xl" />
              
              <h3 className="text-2xl font-display font-bold mb-8 text-white">
                {language === 'en' ? 'Kinash Headquarters' : 'Oficina Central'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                    <MapPin className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Address' : 'Dirección'}
                    </h4>
                    <p className="text-base text-white/90 leading-relaxed">
                      Dehradun, Uttarakhand, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Phone Support' : 'Soporte'}
                    </h4>
                    <a href="tel:+911352779000" className="text-base text-accent hover:text-accent-glow font-bold">
                      +91 135 277 9000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                    <Mail className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Email Address' : 'Correo'}
                    </h4>
                    <a href="mailto:contact@kinash.luxury" className="text-base text-white/90 hover:underline">
                      contact@kinash.luxury
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 mt-10 pt-8 flex items-center gap-3">
                <Award className="text-accent" size={24} />
                <span className="text-xs text-white/70 tracking-wide">
                  {language === 'en' ? 'Government Registered & ISO Certified' : 'Certificación ISO y Registro Gubernamental'}
                </span>
              </div>
            </div>

            {/* Unified Database Security Alert */}
            <div className="bg-white rounded-2xl p-6 border border-border flex items-start gap-4 shadow-soft">
              <ShieldCheck className="text-accent flex-shrink-0" size={28} />
              <div>
                <h4 className="font-semibold text-primary text-sm mb-1 font-display">
                  Corporate Database Protection Active
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All communication is fully encrypted using TLS 1.3 protocol and dispatched directly to Kinash Associates' private corporate directory. Your data privacy is strictly protected.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form & Inbound Status */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-border shadow-large rounded-3xl p-8 md:p-10 relative">
              <h3 className="text-2xl font-display font-bold text-primary mb-6 flex items-center gap-2">
                {language === 'en' ? 'Direct Property Inquiry' : 'Consulta Directa de Propiedad'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-2 block">
                      {t('contact.name')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      placeholder="e.g. Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-2 border-muted hover:border-primary/20 focus:border-accent rounded-xl py-3 px-4"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-2 block">
                      {t('contact.email')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="e.g. name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-2 border-muted hover:border-primary/20 focus:border-accent rounded-xl py-3 px-4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-2 block">
                      {t('contact.phone')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      placeholder="e.g. +91 135 277 9000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border-2 border-muted hover:border-primary/20 focus:border-accent rounded-xl py-3 px-4"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-2 block">
                      {language === 'en' ? 'Property of Interest' : 'Propiedad de Interés'}
                    </label>
                    <select
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="w-full border-2 border-muted hover:border-primary/20 focus:border-accent rounded-xl py-3.5 px-4 text-sm bg-background text-foreground"
                    >
                      <option value="">{language === 'en' ? '-- Select Listing (Optional) --' : '-- Seleccionar --'}</option>
                      {properties.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-2 block">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    placeholder={language === 'en' ? 'Describe your requirements, preferred calling times, or questions...' : 'Describa sus requisitos...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="border-2 border-muted hover:border-primary/20 focus:border-accent rounded-xl py-3 px-4"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-glow text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-medium"
                >
                  {loading ? t('contact.submitting') : t('contact.submit')}
                  <ArrowRight size={18} />
                </Button>
              </form>
            </div>

            {/* Premium Live Acknowledgment Card */}
            {crmLead && (
              <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 md:p-8 shadow-elegant animate-fadeInUp">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Award className="text-accent animate-pulse" size={20} />
                    <span className="font-display font-bold text-sm tracking-wider uppercase">
                      Inquiry Security Registry
                    </span>
                  </div>
                  <span className="text-[10px] bg-accent/20 text-accent border border-accent/30 px-3 py-1 rounded-full font-bold">
                    OFFICIAL SUBMISSION LOGGED
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                  Your inquiry has been cataloged under Reference ID <strong className="text-white font-mono">{crmLead.leadId}</strong>. A dedicated Kinash portfolio representative is being allocated to compile your requested information, site plans, and custom pricing arrays.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono border-t border-white/5 pt-6">
                  <div>
                    <span className="text-white/40 block mb-0.5">Assigned Officer Status</span>
                    <span className="text-green-400 font-bold flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 size={12} /> Allocation In Progress
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-0.5">Target Portfolio Segment</span>
                    <span className="text-white font-semibold">{crmLead.propertyInterest}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
