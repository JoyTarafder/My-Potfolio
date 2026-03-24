import { Poppins, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    'I build clean, responsive, and user-friendly web interfaces with a strong focus on performance and usability. Explore my portfolio to see featured projects, skills, and experience.',
  keywords: [
    'Joy Tarafder',
    'Frontend Developer',
    'React Developer',
    'JavaScript',
    'UI/UX',
    'Portfolio',
    'Web Developer',
  ],
  authors: [{ name: 'Joy Tarafder' }],
  openGraph: {
    title: 'Joy Tarafder | Frontend Developer',
    description:
      'I build clean, responsive, and user-friendly web interfaces with a strong focus on performance and usability.',
    url: 'https://joytarafder.dev',
    siteName: 'Joy Tarafder Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joy Tarafder | Frontend Developer',
    description:
      'I build clean, responsive, and user-friendly web interfaces.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSans.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
