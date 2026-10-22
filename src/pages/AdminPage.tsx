import React, { useState } from 'react';
import { useProperties, Property } from '@/context/PropertyContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Trash2, Edit3, Settings, ShieldAlert, Code2, Youtube, MapPin, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { toast } from 'sonner';
import siteConfig from '@/config/site';
import { formatPrice, formatCurrency } from '@/lib/currency';

export default function AdminPage() {
  const { properties, addProperty, updateProperty, deleteProperty, resetProperties } = useProperties();
  const { t, currency } = useLanguage();
  
  // State for form
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Available');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [imagesText, setImagesText] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [type, setType] = useState('Residential Plot');
  const [sizesText, setSizesText] = useState('');
  const [possession, setPossession] = useState('Immediate');
  const [facing, setFacing] = useState('East');
  const [latitude, setLatitude] = useState('30.3475');
  const [longitude, setLongitude] = useState('78.0772');

  const fillForm = (p: Property) => {
    setEditingId(p.id);
    setTitle(p.title);
    setSlug(p.slug);
    setPrice(p.price);
    setStatus(p.status);
    setLocation(p.location);
    setDescription(p.description);
    setVideoLink(p.videoLink || '');
    setImagesText(p.images.join('\n'));
    setFeaturesText(p.features.join('\n'));
    setType(p.specs.type);
    setSizesText(p.specs.sizes.join(', '));
    setPossession(p.specs.possession);
    setFacing(p.specs.facing);
    setLatitude(p.coordinates[0].toString());
    setLongitude(p.coordinates[1].toString());
  };

  const clearForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setPrice('');
    setStatus('Available');
    setLocation('');
    setDescription('');
    setVideoLink('');
    setImagesText('');
    setFeaturesText('');
    setType('Residential Plot');
    setSizesText('');
    setPossession('Immediate');
    setFacing('East');
    setLatitude('30.3475');
    setLongitude('78.0772');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !price || !location) {
      toast.error('Please fill in required fields (Title, Slug, Price, Location).');
      return;
    }

    const imagesArray = imagesText
      .split('\n')
      .map(i => i.trim())
      .filter(i => i !== '');

    const featuresArray = featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f !== '');

    const sizesArray = sizesText
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '');

    const coords: [number, number] = [
      parseFloat(latitude) || 30.3475,
      parseFloat(longitude) || 78.0772
    ];

    const propData = {
      title,
      slug: slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      price,
      status,
      location,
      description,
      videoLink: videoLink || undefined,
      images: imagesArray.length > 0 ? imagesArray : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'],
      features: featuresArray.length > 0 ? featuresArray : ['Premium Road Access', 'Electricity Connected'],
      specs: {
        type,
        sizes: sizesArray.length > 0 ? sizesArray : ['100 Gaj', '150 Gaj'],
        possession,
        facing,
        parking: 'Available',
        area: sizesArray[0] || '1500 Sq Ft'
      },
      coordinates: coords,
      contact: siteConfig.contact.phoneFormatted
    };

    if (editingId) {
      updateProperty({ ...propData, id: editingId });
      toast.success(t('admin.toast.updated'));
    } else {
      addProperty(propData);
      toast.success(t('admin.toast.created'));
    }

    clearForm();
  };

  const handleDelete = (id: number) => {
    if (confirm(t('admin.toast.deleteConfirm'))) {
      deleteProperty(id);
      toast.success(t('admin.toast.deleted'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {t('admin.eyebrow')}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6">
            {t('admin.heading')}
          </h1>
          <p className="text-lg text-white/60 leading-relaxed font-light">
            {t('admin.intro')}
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#0a0c10] border shadow-medium rounded-2xl p-1.5 gap-2 h-auto flex-wrap">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl py-3 px-6 font-semibold"
              >
                <Layers size={16} className="mr-2" />
                {t('admin.tab.manage')}
              </TabsTrigger>
              <TabsTrigger
                value="form"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl py-3 px-6 font-semibold"
              >
                <PlusCircle size={16} className="mr-2" />
                {editingId ? t('admin.tab.edit') : t('admin.tab.add')}
              </TabsTrigger>
              <TabsTrigger
                value="sanity"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl py-3 px-6 font-semibold"
              >
                <Code2 size={16} className="mr-2" />
                {t('admin.tab.sanity')}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab 1: Dashboard Listings Grid */}
          <TabsContent value="dashboard" className="outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((p) => (
                <Card key={p.id} className="overflow-hidden border border-border shadow-large rounded-3xl bg-[#0a0c10] hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 bg-white/5">
                    <img loading="lazy" decoding="async" src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                      {p.specs.type}
                    </div>
                    {p.videoLink && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg">
                        <Youtube size={14} />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-xs text-white/60 mb-2">
                      <MapPin size={12} className="mr-1 text-accent" />
                      <span>{p.location}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 line-clamp-1">
                      {p.title}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-white">{formatPrice(p.price, currency.code)}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                        p.status.toLowerCase().includes('sold') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <div className="border-t border-white/10 pt-4 flex gap-3">
                      <Button
                        onClick={() => {
                          fillForm(p);
                          // Select the form tab manually via trigger or state if React allows
                          toast.info(t('admin.action.loaded'));
                        }}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-2.5 rounded-xl border"
                      >
                        <Edit3 size={14} className="mr-1.5" />
                        {t('admin.action.edit')}
                      </Button>
                      <Button
                        onClick={() => handleDelete(p.id)}
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl px-4"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab 2: Visual Creation Form */}
          <TabsContent value="form" className="outline-none">
            <div className="max-w-4xl mx-auto bg-[#0a0c10] border border-border shadow-large rounded-3xl p-8 md:p-10">
              <div className="flex items-center justify-between border-b pb-6 mb-8">
                <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-accent" />
                  {editingId ? t('admin.form.editHeading', { id: editingId }) : t('admin.form.addHeading')}
                </h3>
                {editingId && (
                  <Button
                    onClick={clearForm}
                    variant="outline"
                    className="rounded-xl border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-accent/40 transition-all"
                  >
                    {t('admin.action.cancelEditing')}
                  </Button>
                )}
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.title')}
                    </label>
                    <Input
                      required
                      placeholder="e.g. Imperial Villas, Sahastradhara"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border-2 border-white/10 focus:border-accent rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.slug')}
                    </label>
                    <Input
                      required
                      placeholder="e.g. imperial-villas-sahastradhara"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="border-2 border-white/10 focus:border-accent rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.pricing', { currency: currency.code })}
                    </label>
                    <Input
                      required
                      placeholder={`e.g. ${formatCurrency(4500000, currency.code)}`}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="border-2 border-white/10 focus:border-accent rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.status')}
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full border-2 border-white/10 focus:border-accent rounded-xl py-3 px-4 text-sm bg-background"
                    >
                      <option value="Available">{t('admin.status.available')}</option>
                      <option value="Under Construction">{t('admin.status.underConstruction')}</option>
                      <option value="SOLD">{t('admin.status.sold')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.type')}
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full border-2 border-white/10 focus:border-accent rounded-xl py-3 px-4 text-sm bg-background"
                    >
                      <option value="Residential Plot">{t('admin.type.residentialPlot')}</option>
                      <option value="Commercial Plot">{t('admin.type.commercialPlot')}</option>
                      <option value="Luxury Villa">{t('admin.type.luxuryVilla')}</option>
                      <option value="Luxury Apartment">{t('admin.type.luxuryApartment')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.location')}
                    </label>
                    <Input
                      required
                      placeholder="e.g. Sahastradhara Road, Dehradun"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="border-2 border-white/10 focus:border-accent rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block font-display flex items-center gap-1 text-red-400">
                      <Youtube size={14} /> {t('admin.form.video')}
                    </label>
                    <Input
                      placeholder="e.g. https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      className="border-2 border-white/10 focus:border-accent rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.sizes')}
                    </label>
                    <Input
                      placeholder="e.g. 100 Gaj, 150 Gaj, 250 Gaj"
                      value={sizesText}
                      onChange={(e) => setSizesText(e.target.value)}
                      className="border-2 border-white/10 focus:border-accent rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.possession')}
                    </label>
                    <Input
                      placeholder="e.g. Immediate, Dec 2026"
                      value={possession}
                      onChange={(e) => setPossession(e.target.value)}
                      className="border-2 border-white/10 focus:border-accent rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.facing')}
                    </label>
                    <Input
                      placeholder="e.g. East, North-East"
                      value={facing}
                      onChange={(e) => setFacing(e.target.value)}
                      className="border-2 border-white/10 focus:border-accent rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-white/60 tracking-wide uppercase mb-2 block">
                        {t('admin.form.latitude')}
                      </label>
                      <Input
                        placeholder="30.3475"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="border-2 border-white/10 focus:border-accent rounded-xl px-2"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-white/60 tracking-wide uppercase mb-2 block">
                        {t('admin.form.longitude')}
                      </label>
                      <Input
                        placeholder="78.0772"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="border-2 border-white/10 focus:border-accent rounded-xl px-2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                    {t('admin.form.description')}
                  </label>
                  <Textarea
                    placeholder={t('admin.form.descriptionPlaceholder')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="border-2 border-white/10 focus:border-accent rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.images')}
                    </label>
                    <Textarea
                      placeholder="e.g. https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
                      value={imagesText}
                      onChange={(e) => setImagesText(e.target.value)}
                      rows={4}
                      className="border-2 border-white/10 focus:border-accent rounded-xl font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/60 tracking-wide uppercase mb-2 block">
                      {t('admin.form.features')}
                    </label>
                    <Textarea
                      placeholder="e.g. Electricity Ingress&#10;Automatic Lifts&#10;Secure Guard Room"
                      value={featuresText}
                      onChange={(e) => setFeaturesText(e.target.value)}
                      rows={4}
                      className="border-2 border-white/10 focus:border-accent rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-glow text-white py-4 rounded-xl font-bold shadow-medium"
                  >
                    {editingId ? t('admin.action.save') : t('admin.action.create')}
                  </Button>
                  <Button
                    type="button"
                    onClick={clearForm}
                    className="bg-white/5 hover:bg-white/10 text-white border font-semibold py-4 rounded-xl px-6"
                  >
                    {t('admin.action.clear')}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          {/* Tab 3: Sanity CMS Blueprint Map */}
          <TabsContent value="sanity" className="outline-none">
            <div className="max-w-4xl mx-auto bg-slate-900 text-slate-100 rounded-3xl p-8 md:p-10 shadow-elegant relative overflow-hidden border border-slate-800">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/15 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-8">
                <Settings className="text-accent" size={28} />
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Sanity CMS Blueprint Schema
                  </h3>
                  <p className="text-xs text-white/60">
                    How our Local Persisted Schema translates directly to Sanity CMS
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                When you are ready to migrate from `localStorage` to your headless Sanity CMS dashboard, you do not need to rewrite any code in the frontend! Our components are already configured to handle the exact document fields. You will only need to declare the Sanity document type and execute standard GROQ queries.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-3 font-mono">
                    1. Sanity Schema Definition (property.ts)
                  </h4>
                  <pre className="bg-slate-950 p-4 rounded-xl text-[11px] font-mono overflow-x-auto text-green-400 border border-slate-800 leading-relaxed">
{`export default {
  name: 'property',
  title: 'Property Listings',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'price', title: 'Price String', type: 'string' },
    { name: 'status', title: 'Status', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'videoLink', title: 'YouTube Walkthrough', type: 'url' },
    { name: 'images', title: 'Images Gallery', type: 'array', of: [{ type: 'image' }] },
    { name: 'features', title: 'Amenities', type: 'array', of: [{ type: 'string' }] },
    { name: 'coordinates', title: 'Map GeoPoint', type: 'geopoint' },
    {
      name: 'specs',
      title: 'Specifications',
      type: 'object',
      fields: [
        { name: 'type', type: 'string' },
        { name: 'possession', type: 'string' },
        { name: 'facing', type: 'string' }
      ]
    }
  ]
}`}
                  </pre>
                </div>

                <div className="pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-3 font-mono">
                    2. Query Ingestion hook (useSanityProperties.ts)
                  </h4>
                  <pre className="bg-slate-950 p-4 rounded-xl text-[11px] font-mono overflow-x-auto text-green-400 border border-slate-800 leading-relaxed">
{`import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'yourProjectId',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-05-19',
});

// Replace initialProperties array inside PropertyContext with:
export const fetchPropertiesFromSanity = async () => {
  const query = \`*[_type == "property"] {
    id, title, "slug": slug.current, price, status, location, description,
    videoLink, "images": images[].asset->url, features, coordinates, specs
  }\`;
  return await client.fetch(query);
};`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
