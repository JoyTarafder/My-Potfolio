import { Poppins, DM_Sans } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

export const metadata = {
  title: 'Joy Tarafder | Frontend Developer — React, JavaScript, UI/UX',
  description:
    'I build clean, responsive, and user-friendly web interfaces with a strong focus on performance and usability.',
  keywords: [
    'Joy Tarafder', 'Frontend Developer', 'React Developer', 'JavaScript', 'UI/UX', 'Portfolio', 'Web Developer',
  ],
  authors: [{ name: 'Joy Tarafder' }],
  openGraph: {
    title: 'Joy Tarafder | Frontend Developer',
    description: 'I build clean, responsive, and user-friendly web interfaces.',
    url: 'https://joytarafder.dev',
    siteName: 'Joy Tarafder Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joy Tarafder | Frontend Developer',
    description: 'I build clean, responsive, and user-friendly web interfaces.',
  },
  robots: { index: true, follow: true },
};

export default function PublicLayout({ children }) {
  return (
    <ThemeProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}
