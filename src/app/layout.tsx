import type { Metadata, Viewport } from 'next';
import '../index.css';
import { Providers } from './providers';
import siteConfig from '@/config/site';

export const viewport: Viewport = {
  themeColor: '#0c0d10',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.shortName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.shortName }],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.shortName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.shortName} — ${siteConfig.tagline}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.shortName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('apex_theme')||'dark';if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light')}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}}catch(e){}`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0c0d10] text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
