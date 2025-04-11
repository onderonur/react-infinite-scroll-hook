import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '../components/header';
import { Layout } from '../components/layout';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'react-infinite-scroll-hook',
  description: 'Demo app to showcase react-infinite-scroll-hook usage',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Layout>
          <Header />
          <div>{children}</div>
        </Layout>
      </body>
    </html>
  );
}
