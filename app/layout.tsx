// app/layout.tsx
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import './globals.css';
import { Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GlobalProviders } from './global-providers'; // Import the new global providers

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
});

export const metadata = {
  title: 'LegacyPrints',
  description:
    'A modern print-on-demand platform for custom designs and templates.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.className} antialiased`}>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
        <GlobalProviders>
          {' '}
          {/* Wrap the content that needs providers */}
          <Navbar />
          <main className="flex-grow w-full">{children}</main>
          <Footer />
        </GlobalProviders>
        <Analytics />{' '}
        {/* Vercel Analytics is correctly placed here at the end of the html, or just before </body> */}
      </body>
    </html>
  );
}
