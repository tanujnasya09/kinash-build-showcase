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
import siteConfig from '@/config/site';
import { interpolate } from '@/i18n';
import ArchitecturalGrid from '@/components/ui/ArchitecturalGrid';

export default function ContactPage() {
  const { t, language, content } = useLanguage();
  const copy = content.contact;
  const { properties } = useProperties();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [crmLead, setCrmLead] = useState<{
    leadId: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    propertyInterest: string;
    messageContent: string;
    timestamp: string;
    source: string;
    crmStatus: string;
    ipAddress: string;
    leadScore: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error(t('contact.required'));
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
        propertyInterest: selectedProperty || copy.generalInquiry,
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
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white pt-28 sm:pt-32 pb-14 relative overflow-hidden">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/contact"
      />

      {/* Architectural Drafting Blueprint Grid */}
      <ArchitecturalGrid columns={5} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-left max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-6 sm:w-8 h-[2px] bg-accent inline-block" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold">
              {copy.eyebrow}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium text-foreground dark:text-white mb-3 sm:mb-4 leading-[1.1] sm:leading-none">
            <span className="block">{copy.headline}</span>
            <span className="block text-accent italic font-light">{copy.headlineAccent}</span>
          </h1>
          <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 leading-relaxed font-light max-w-xl">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Premium Contact Details */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-[#0a0c10]/70 border border-black/10 dark:border-white/5 p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-md dark:shadow-2xl">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/40" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent/40" />
              
              <h3 className="text-xl font-display font-medium mb-6 sm:mb-8 text-foreground dark:text-white">
                {copy.headquarters}
              </h3>
              
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#f8f7f4] dark:bg-[#0d0f14] border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-accent shadow-xs">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-mono text-foreground/50 dark:text-white/40 uppercase tracking-widest mb-1">
                      {copy.addressLabel}
                    </h4>
                    <p className="text-xs sm:text-sm text-foreground/80 dark:text-white/80 font-light leading-relaxed">
                      {siteConfig.contact.address}, {siteConfig.contact.city}, {siteConfig.contact.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#f8f7f4] dark:bg-[#0d0f14] border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-accent shadow-xs">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-mono text-foreground/50 dark:text-white/40 uppercase tracking-widest mb-1">
                      {copy.phoneLabel}
                    </h4>
                    <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-xs sm:text-sm text-accent hover:text-accent-glow font-bold tracking-wide">
                      {siteConfig.contact.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#f8f7f4] dark:bg-[#0d0f14] border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-accent shadow-xs">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-mono text-foreground/50 dark:text-white/40 uppercase tracking-widest mb-1">
                      {copy.emailLabel}
                    </h4>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-xs sm:text-sm text-foreground/80 dark:text-white/80 hover:text-accent transition-colors font-light">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/10 dark:border-white/5 mt-8 sm:mt-10 pt-6 sm:pt-8 flex items-center gap-3">
                <Award className="text-accent" size={20} />
                <span className="text-[10px] text-foreground/60 dark:text-white/50 tracking-wider font-light">
                  {copy.certification}
                </span>
              </div>
            </div>

            {/* Unified Database Security Alert */}
            <div className="bg-white dark:bg-[#0a0c10]/40 border border-black/10 dark:border-white/5 p-5 sm:p-6 flex items-start gap-4 shadow-md dark:shadow-2xl relative">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
              <ShieldCheck className="text-accent flex-shrink-0" size={20} />
              <div>
                <h4 className="font-display font-medium text-foreground dark:text-white text-xs mb-1">
                  {copy.securityTitle}
                </h4>
                <p className="text-[10px] text-foreground/60 dark:text-white/50 leading-relaxed font-light">
                  {copy.securityBody}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form & Inbound Status */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-[#0a0c10]/70 border border-black/10 dark:border-white/5 shadow-md dark:shadow-2xl p-6 sm:p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/40" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent/40" />

              <h3 className="text-xl font-display font-medium text-foreground dark:text-white mb-6 sm:mb-8">
                {copy.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div className="relative">
                    <label className="absolute top-[-8px] left-3 bg-white dark:bg-[#0a0c10] px-1.5 font-mono text-[7px] text-accent font-bold uppercase tracking-widest select-none z-10">
                      {t('contact.name')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      placeholder={copy.placeholderName}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-black/15 dark:border-white/10 rounded-none bg-[#f8f7f4] dark:bg-[#0c0d10]/50 py-3.5 px-4 text-xs text-foreground dark:text-white placeholder:text-foreground/30 dark:placeholder:text-white/20 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="absolute top-[-8px] left-3 bg-white dark:bg-[#0a0c10] px-1.5 font-mono text-[7px] text-accent font-bold uppercase tracking-widest select-none z-10">
                      {t('contact.email')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder={copy.placeholderEmail}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-black/15 dark:border-white/10 rounded-none bg-[#f8f7f4] dark:bg-[#0c0d10]/50 py-3.5 px-4 text-xs text-foreground dark:text-white placeholder:text-foreground/30 dark:placeholder:text-white/20 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div className="relative">
                    <label className="absolute top-[-8px] left-3 bg-white dark:bg-[#0a0c10] px-1.5 font-mono text-[7px] text-accent font-bold uppercase tracking-widest select-none z-10">
                      {t('contact.phone')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      placeholder={copy.placeholderPhone}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border border-black/15 dark:border-white/10 rounded-none bg-[#f8f7f4] dark:bg-[#0c0d10]/50 py-3.5 px-4 text-xs text-foreground dark:text-white placeholder:text-foreground/30 dark:placeholder:text-white/20 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="absolute top-[-8px] left-3 bg-white dark:bg-[#0a0c10] px-1.5 font-mono text-[7px] text-accent font-bold uppercase tracking-widest select-none z-10">
                      {copy.propertyInterest}
                    </label>
                    <select
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="w-full border border-black/15 dark:border-white/10 rounded-none py-3.5 px-4 text-xs bg-[#f8f7f4] dark:bg-[#0c0d10]/50 text-foreground dark:text-white focus:border-accent focus:outline-none"
                    >
                      <option value="">{copy.selectPlaceholder}</option>
                      {properties.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="absolute top-[-8px] left-3 bg-white dark:bg-[#0a0c10] px-1.5 font-mono text-[7px] text-accent font-bold uppercase tracking-widest select-none z-10">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    placeholder={copy.placeholderMessage}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="border border-black/15 dark:border-white/10 rounded-none bg-[#f8f7f4] dark:bg-[#0c0d10]/50 py-3.5 px-4 text-xs text-foreground dark:text-white placeholder:text-foreground/30 dark:placeholder:text-white/20 focus:border-accent focus:outline-none"
                  />
                </div>

                <MagneticButton strength={15} className="w-full" as="div">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 sm:h-13 bg-accent text-[#0c0d10] hover:bg-accent-glow border border-accent hover:border-accent-glow font-display font-black text-xs uppercase tracking-[0.2em] rounded-none flex items-center justify-center gap-2 group transition-all shadow-[0_10px_30px_rgba(223,186,72,0.25)] cursor-pointer"
                  >
                    <span>{loading ? t('contact.submitting') : t('contact.submit')}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </MagneticButton>
              </form>
            </div>

            {/* Premium Live Acknowledgment Card */}
            {crmLead && (
              <div className="bg-white dark:bg-[#0a0c10]/90 border border-accent/40 text-foreground dark:text-white p-6 md:p-8 relative shadow-xl dark:shadow-2xl animate-fade-in">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/60" />
                
                <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Award className="text-accent animate-pulse" size={16} />
                    <span className="font-mono text-[9px] tracking-wider uppercase text-foreground/80 dark:text-white/80 font-bold">
                      {copy.registryTitle}
                    </span>
                  </div>
                  <span className="text-[8px] bg-accent/15 text-accent border border-accent/40 px-3 py-1 font-mono tracking-widest uppercase font-bold">
                    {copy.registryBadge}
                  </span>
                </div>

                <p className="text-xs text-foreground/75 dark:text-white/70 leading-relaxed mb-6 font-light">
                  {interpolate(copy.registryBody, { id: crmLead.leadId })}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[9px] font-mono border-t border-black/10 dark:border-white/5 pt-6 uppercase tracking-wider">
                  <div>
                    <span className="text-foreground/50 dark:text-white/40 block mb-0.5">{copy.officerLabel}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" /> {copy.officerStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-foreground/50 dark:text-white/40 block mb-0.5">{copy.segmentLabel}</span>
                    <span className="text-foreground dark:text-white font-semibold">{crmLead.propertyInterest}</span>
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
