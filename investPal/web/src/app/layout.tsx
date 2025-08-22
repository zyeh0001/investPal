import './global.css';
import '@investPal/designSystem/styles';
import { ClientLayout } from './client-layout';

export const metadata = {
  title: 'InvestPal - Stock Analysis Platform',
  description: 'Analyze stocks and ETFs with AI-powered insights and real-time data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
