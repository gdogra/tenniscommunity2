// src/app/layout.tsx
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/hooks/useAuth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tennis Community',
  description: 'Track and compete in your local tennis league',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
