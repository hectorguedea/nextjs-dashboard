import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Mr. PopUp Dashboard',
    default: 'Mr. PopUp Dashboard',
  },
  description: 'The official Mr. PopUp Dashboard',
  metadataBase: new URL('https://nextjs-dashboard-one-wheat-88.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
