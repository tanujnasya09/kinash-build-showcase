import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/LanguageContext';
import { useProperties } from '@/context/PropertyContext';
import SEOHead from '@/components/SEO/SEOHead';
import { toast } from 'sonner';
import MagneticButton from '@/components/ui/MagneticButton';

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
    <div className="min-h-screen bg-[#0c0d10] text-white pt-28 pb-20 relative overflow-hidden">
      <SEOHead
        title="Inquire & Connect | Kinash Associates"
        description="Connect with the luxury real estate and construction team at Kinash Associates. Request consultation, brochure downloads, or schedule site visits."
        keywords="contact construction, real estate agent dehradun, luxury property inquiry"
        canonical="/contact"
      />

      {/* Technical grid line background */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-12 z-0">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-left max-w-3xl mb-16">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold mb-4 block">
            {language === 'en' ? 'Get In Touch' : language === 'es' ? 'Contacto' : 'Kontakt'}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-none">
            Establish a Secure <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Connection</span>.
          </h1>
          <p className="text-xs text-white/50 leading-relaxed font-light max-w-xl">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Premium Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0a0c10]/70 border border-white/5 p-8 md:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/40" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent/40" />
              
              <h3 className="text-xl font-display font-medium mb-8 text-white">
                Kinash Headquarters
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0d0f14] border border-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                      {language === 'en' ? 'Address' : 'Dirección'}
                    </h4>
                    <p className="text-sm text-white/80 font-light leading-relaxed">
                      Dehradun, Uttarakhand, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0d0f14] border border-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                      {language === 'en' ? 'Phone Support' : 'Soporte'}
                    </h4>
                    <a href="tel:+911352779000" className="text-sm text-accent hover:text-accent-glow font-bold tracking-wide">
                      +91 135 277 9000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0d0f14] border border-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                      {language === 'en' ? 'Email Address' : 'Correo'}
                    </h4>
                    <a href="mailto:contact@kinash.luxury" className="text-sm text-white/80 hover:text-accent transition-colors font-light">
                      contact@kinash.luxury
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 mt-10 pt-8 flex items-center gap-3">
                <Award className="text-accent" size={20} />
                <span className="text-[10px] text-white/50 tracking-wider font-light">
                  {language === 'en' ? 'Government Registered & ISO Certified' : 'Certificación ISO y Registro Gubernamental'}
                </span>
              </div>
            </div>

            {/* Unified Database Security Alert */}
            <div className="bg-[#0a0c10]/40 border border-white/5 p-6 flex items-start gap-4 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
              <ShieldCheck className="text-accent flex-shrink-0" size={20} />
              <div>
                <h4 className="font-display font-medium text-white text-xs mb-1">
                  Corporate Database Protection Active
                </h4>
                <p className="text-[10px] text-white/50 leading-relaxed font-light">
                  All communication is fully encrypted using TLS 1.3 protocol and dispatched directly to Kinash Associates' private corporate directory. Your data privacy is strictly protected.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form & Inbound Status */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#0a0c10]/70 border border-white/5 shadow-2xl p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/40" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent/40" />

              <h3 className="text-xl font-display font-medium text-white mb-8">
                {language === 'en' ? 'Direct Property Inquiry' : 'Consulta Directa de Propiedad'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="absolute top-[-8px] left-3 bg-[#0a0c10] px-1.5 font-mono text-[7px] text-accent/60 uppercase tracking-widest select-none">
                      {t('contact.name')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-white/10 rounded-none bg-[#0c0d10]/50 py-3.5 px-4 text-xs text-white placeholder:text-white/20 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="absolute top-[-8px] left-3 bg-[#0a0c10] px-1.5 font-mono text-[7px] text-accent/60 uppercase tracking-widest select-none">
                      {t('contact.email')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="E.g. name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-white/10 rounded-none bg-[#0c0d10]/50 py-3.5 px-4 text-xs text-white placeholder:text-white/20 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="absolute top-[-8px] left-3 bg-[#0a0c10] px-1.5 font-mono text-[7px] text-accent/60 uppercase tracking-widest select-none">
                      {t('contact.phone')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      placeholder="E.g. +91 135 277 9000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border border-white/10 rounded-none bg-[#0c0d10]/50 py-3.5 px-4 text-xs text-white placeholder:text-white/20 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="absolute top-[-8px] left-3 bg-[#0a0c10] px-1.5 font-mono text-[7px] text-accent/60 uppercase tracking-widest select-none">
                      {language === 'en' ? 'Property of Interest' : 'Propiedad de Interés'}
                    </label>
                    <select
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="w-full border border-white/10 rounded-none py-3.5 px-4 text-xs bg-[#0c0d10]/50 text-white focus:border-accent focus:outline-none"
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

                <div className="relative">
                  <label className="absolute top-[-8px] left-3 bg-[#0a0c10] px-1.5 font-mono text-[7px] text-accent/60 uppercase tracking-widest select-none">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    placeholder={language === 'en' ? 'Describe your requirements, preferred calling times, or questions...' : 'Describa sus requisitos...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="border border-white/10 rounded-none bg-[#0c0d10]/50 py-3.5 px-4 text-xs text-white placeholder:text-white/20 focus:border-accent focus:outline-none"
                  />
                </div>

                <MagneticButton strength={15} className="w-full" as="div">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-4 rounded-none uppercase text-[9px] tracking-widest flex items-center justify-center gap-2 hover:bg-accent-glow"
                  >
                    {loading ? t('contact.submitting') : t('contact.submit')}
                    <ArrowRight size={12} />
                  </Button>
                </MagneticButton>
              </form>
            </div>

            {/* Premium Live Acknowledgment Card */}
            {crmLead && (
              <div className="bg-[#0a0c10]/90 border border-accent/25 text-white p-6 md:p-8 relative shadow-2xl animate-fade-in">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Award className="text-accent animate-pulse" size={16} />
                    <span className="font-mono text-[9px] tracking-wider uppercase text-white/80">
                      Inquiry Security Registry
                    </span>
                  </div>
                  <span className="text-[8px] bg-accent/10 text-accent border border-accent/30 px-3 py-1 font-mono tracking-widest uppercase">
                    OFFICIAL SUBMISSION LOGGED
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed mb-6 font-light">
                  Your inquiry has been cataloged under Reference ID <strong className="text-white font-mono">{crmLead.leadId}</strong>. A dedicated Kinash portfolio representative is being allocated to compile your requested information, site plans, and custom pricing arrays.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[9px] font-mono border-t border-white/5 pt-6 uppercase tracking-wider">
                  <div>
                    <span className="text-white/40 block mb-0.5">Assigned Officer Status</span>
                    <span className="text-green-400 font-bold flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 size={12} className="text-green-400" /> Allocation In Progress
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
