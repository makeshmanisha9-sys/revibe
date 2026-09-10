import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AIAssistantModal } from '@/components/AIAssistantModal';

export const metadata: Metadata = {
  title: 'ReVIBE – AI-Powered Waste-to-Wealth Platform',
  description: 'Recycle Waste. Create Value. Inspire Change. Transform reusable waste into products, opportunities, and impact.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#fbfbf9] text-[#181f1c] antialiased selection:bg-emerald-200 selection:text-emerald-900">
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <AIAssistantModal />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
